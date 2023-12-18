# smry

smry is a command-line tool that allows you to summarize text easily and efficiently. It is part of the Text Summarizer Multiformat project, providing a convenient way to obtain summaries from the command line.

## Features

- **Efficient Summarization:** Quickly summarize text without the need for a complex user interface.

- **Flexible Usage:** Suitable for integration into scripts, automation, or manual use in the terminal.

## Installation

Before using the smry CLI, make sure you have Node.js installed. Then, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/text-summarizer.git
    ```

2. Navigate to the command-line directory:

    ```bash
    cd text-summarizer/cli
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the CLI:

    ```bash
    npm run smry -f path/to/your/text/file.txt
    ```

## Usage Examples

**Summarize a text file:**

```bash
npm run smry -f path/to/your/text/file.txt
```

**Specify the summarization length:**

```bash
npm run smry -f path/to/your/text/file.txt -l 150
```

**Output summary in JSON format:**

```bash
npm run smry -f path/to/your/text/file.txt --JSON
```
    
## License

**This project is licensed under the MIT License.**

Feel free to customize the examples and license information as needed.