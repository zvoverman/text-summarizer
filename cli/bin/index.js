#!/usr/bin/env node

// Import necessary modules
import 'dotenv/config';
import { program } from 'commander';
import fs from 'fs';
import { HfInference } from '@huggingface/inference';
import figlet from 'figlet';
import tty from 'tty';
import chalk from 'chalk';
import path from 'path';

// Create Hugging Face Inference instance
const hf = new HfInference(process.env.HF_API_KEY);

// Display Figlet header before all help text
program.addHelpText('beforeAll', figlet.textSync('smry', {
    font: 'Sub-Zero',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
}));

// Additional description before standard help text
program.addHelpText('before', chalk.bold('smry - commandline text summarizer\n'));

// Command line configuration
program
    .name('smry')
    .description("smry is a commandline interface that summarizes text files or input from stdin using the Huggingface Inference API. For full documentation, see https://github.com/zvoverman/text-summarizer/cli.")
    .usage("[options]\n\tcat /test.txt | smry");

program.showHelpAfterError('(add --help for additional information)');
program.showSuggestionAfterError(false);

// Help and version options
program
    .addOption(new program.Option('-h, --help', 'display help for command'))
    .version('1.0.0', '    --version', 'output the version number');

// Other command options
program
    .option('-f, --file <file-path>', 'file to read from')
    .option('-l, --length <number>', 'summarization max_length')
    .option('-o, --outputFile <file-path>', 'specify output file')
    .option('-v, --verbose', 'output more debugging logs')
    .option('    --JSON', 'output returned in JSON format')
    .action(async (options) => {
        try {
            // Display help if requested and exit immediately
            if (options.help) program.help();

            let input = '';

            // Read input from file or stdin
            if (options.file) {
                input = await fs.readFileSync(options.file, 'utf8');
            } else if (!tty.isatty(process.stdin.fd)) {
                for await (const chunk of process.stdin) input += chunk;
            } else {
                // Display help if not in interactive mode and no file provided
                program.help();
            }

            // Log input if --verbose
            if (options.verbose) {
                console.log(chalk.green('\nInput: ') + input);
            }

            // Parse options
            const length = options.length ? myParseInt(options.length) : 100;

            // Perform summarization using Hugging Face API
            const data = await hf.summarization({
                model: 'pszemraj/led-base-book-summary',
                inputs: input,
                parameters: {
                    max_length: length,
                    early_stopping: true,
                },
            });

            // Display summarized output
            console.log(chalk.green('\nOutput: ') + parseOutput(data, options.JSON) + "\n");

            // Write output to file if specified
            if (options.outputFile) {
                fs.writeFileSync(path.resolve(options.outputFile), parseOutput(data, options.JSON), (err) => {
                    if (err) {
                        console.error(err);
                    }
                    // Log successful file write if --verbose
                    if (options.verbose) console.log(chalk.green('File has been saved!'));
                });
            }

            // Exit successfully
            process.exit(0);
        } catch (error) {
            // Handle errors
            console.error(chalk.bgBlack('smry') + ' ' + chalk.bgBlack.red('ERR'), error);
            process.exit(1);
        }
    });

// Parse command line arguments
program.parse();

// Utility function to parse output based on JSON flag
function parseOutput(data, JSONflag) {
    if (JSONflag) {
        return JSON.stringify(data);
    } else {
        return data.summary_text;
    }
}

function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw new program.InvalidArgumentError('Invalid value for length.');
    }
    return parsedValue;
}
