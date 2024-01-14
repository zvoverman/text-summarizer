# Command Line Interface (smry) :leaves:

**smry** is a powerful command-line tool designed for quick and efficient text summarization. 

<p align="center" width="100%">
    <img width="50%" src="https://i.postimg.cc/8kyfbZX7/cli-ss.png">
</p>

## Features

- **Efficiency:** Rapidly summarize text content without the need for a complex user interface.
  
- **Flexibility:** Easily integrate smry into scripts, automation workflows, or utilize it for manual text summarization in the terminal.

## Installation

Before using the smry CLI, make sure you have Node.js installed. Then, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/zvoverman/text-summarizer.git
    ```

2. Navigate to the command-line directory:

    ```sh
    cd text-summarizer/cli
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Set API-token Environment Vairable:

    ```sh
    export HF_API_KEY="hf_YOUR-API-KEY"
    ```

5. Run the CLI:

    ```sh
    npm run smry
    ```

## Usage Examples

Summarize a text file:

```sh
npm run smry -f path/to/your/text/file.txt
```

Specify the summarization length:

```sh
npm run smry -f path/to/your/text/file.txt -l 150
```

Output summary in JSON format:

```sh
npm run smry -f path/to/your/text/file.txt --JSON
```

Output summary as a file:

```sh
npm run smry -f path/to/your/text/file.txt -o path/to/you/output/file.txt
```