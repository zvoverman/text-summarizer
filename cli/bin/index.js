#!/usr/bin/env node

import 'dotenv/config';
import { program } from 'commander';
import fs from 'fs/promises';
import { HfInference } from '@huggingface/inference';
import figlet from 'figlet';
import tty from 'tty';
import chalk from 'chalk';

const hf = new HfInference(process.env.HF_API_KEY);

program.addHelpText('beforeAll', figlet.textSync('smry', {
    font: 'Sub-Zero',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
}));

// figlet Header
program.addHelpText('before', chalk.bold('smry - commandline text summarizer\n'));

program
    .name('smry')
    .description("smry is a commandline interface that summarizes text files or input from stdin using the Huggingface Inference API. For full documentation, see <github linmk>.")
    .usage("[options]\n\tcat /test.txt | smry");

program.showHelpAfterError('(add --help for additional information)')

program
    .addOption(new program.Option('-h, --help', 'display help for command'))
    .version('1.0.0', '--version', 'output the version number');

program
    .option('-f, --file <source-file>', 'file to read from')
    .option('-l, --length <number>', 'summarization max_length')
    .option('-v, --verbose', 'output more debugging logs')
    .action(async (options) => {
        try {
            if (options.help) program.help();

            let verboseFlag = false;
            if (options.verbose) verboseFlag = true;

            let input = '';

            // if a file option value 
            if (options.file) {
                input = await fs.readFile(options.file, 'utf8');
            } else if (!tty.isatty(process.stdin.fd)) {
                for await (const chunk of process.stdin) input += chunk;
            } else {
                program.help();
            }

            const length = options.length ? myParseInt(options.length) : 100;

            const summary = await hf.summarization({
                model: 'pszemraj/led-base-book-summary',
                inputs: input,
                parameters: {
                    max_length: length,
                    early_stopping: true,
                },
            });

            console.log(summary);
            process.exit(0);
        } catch (error) {
            console.error(chalk.bgBlack('smry') + ' ' + chalk.bgBlack.red('ERR'), error.message);
            process.exit(1);
        }
    });

program.parse();

function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new program.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
}
