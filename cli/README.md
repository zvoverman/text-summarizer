# Text Summarizer CLI (smry) :leaves:

**smry** is a powerful command-line tool designed for quick and efficient text summarization. 

## Features

- **Efficiency:** Rapidly summarize text content without the need for a complex user interface.
  
- **Flexibility:** Easily integrate smry into scripts, automation workflows, or utilize it for manual text summarization in the terminal.

## Installation

Before using the smry CLI, make sure you have Node.js installed. Then, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/zvoverman/text-summarizer.git
    ```

2. Navigate to the command-line directory:

    ```bash
    cd text-summarizer/cli
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set API-token Environment Vairable:

    ```bash
    export HF_API_KEY="hf_YOUR-API-KEY"
    ```

4. Run the CLI:

    ```bash
    npm run smry
    ```

## Usage Examples

Summarize a text file:

```bash
npm run smry -f path/to/your/text/file.txt
```

Specify the summarization length:

```bash
npm run smry -f path/to/your/text/file.txt -l 150
```

Output summary in JSON format:

```bash
npm run smry -f path/to/your/text/file.txt --JSON
```

Output summary as a file:

```bash
npm run smry -f path/to/your/text/file.txt -o path/to/you/output/file.txt
```