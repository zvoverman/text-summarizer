# smry

**smry** is a powerful command-line tool designed for quick and efficient text summarization. As a key component of the Text Summarizer Multiformat project, it offers a seamless way to generate concise summaries directly from the command line.

## Features

- **Efficiency:** Rapidly summarize text content without the need for a complex user interface.
  
- **Flexibility:** Easily integrate smry into scripts, automation workflows, or utilize it for manual text summarization in the terminal.

**Note:** This project is primarily created for educational purposes, providing a hands-on experience with building a fully functional command-line interface (CLI). Despite its educational focus, smry incorporates all the essential functionality expected from any CLI tool.

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
    
## License

This project is licensed under the MIT License.