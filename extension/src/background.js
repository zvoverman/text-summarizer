
import { HfInference } from '../node_modules/@huggingface/inference/dist/index.mjs';

browser.runtime.onMessage.addListener(handleMessage);

// background.js
async function handleMessage(request) {
    if (request.action === 'contentToBackground') {
        console.log('Background received message from Content:', request.text);

        // Process the highlighted text
        const processedText = await processText(request.text);
        console.log('Background processed text:', processedText);

        // Send the processed text to the popup
        browser.runtime.sendMessage({ action: 'backgroundToPopup', processedText: processedText });
    }
}

// Function to process the highlighted text
async function processText(text) {
    let apiKey;

    // Load API key from storage
    browser.storage.local.get(['apiKey'], (result) => {
        apiKey = result.apiKey;
        console.log('API key loaded:', apiKey);
    });

    // Create Hugging Face Inference instance
    const hf = new HfInference(apiKey);

    // Perform summarization using Hugging Face API
    const summary = await hf.summarization({
        model: 'pszemraj/led-base-book-summary',
        inputs: text,
        parameters: {
            do_sample: false,
            early_stopping: true,
        },
    });

    return summary.summary_text;
}


