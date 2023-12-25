// Hugging Face Inference API
import { HfInference } from '../node_modules/@huggingface/inference/dist/index.mjs'

// on highlighted text recieved, summarize text
async function handleMessage(request) {
    if (request.action === 'summarize') {
        try {
            // Load API key from storage
            const { apiKey } = await browser.storage.local.get(['apiKey']);
            console.log('API key loaded:', apiKey);

            // Create Hugging Face Inference instance
            const hf = new HfInference(apiKey);

            // Perform summarization using Hugging Face Inference API
            const summary = await hf.summarization({
                model: 'pszemraj/led-base-book-summary',
                inputs: request.text,
                parameters: {
                    do_sample: false,
                    early_stopping: true,
                },
            });

            // Send the processed text to the popup
            browser.runtime.sendMessage({ action: 'summarizeResponse', processedText: summary.summary_text, timeElapsed: Date.now() - request.timeStamp });
        } catch (error) {
            console.error('Error processing text in background:', error.message);
            browser.runtime.sendMessage({ action: 'summarizeError', error: error, timeElapsed: Date.now() - request.timeStamp});
        }
    }
}

// Listen for summarize action from content script
browser.runtime.onMessage.addListener(handleMessage);
