import { HfInference } from '@huggingface/inference'

addEventListener("message", (event) => {

    handleMessage(event.data);

});

async function handleMessage(data) {
    const apiKey = data.key;

    try {
        // Create Hugging Face Inference instance
        const hf = new HfInference(apiKey);

        // Perform summarization using Hugging Face Inference API
        const summary = await hf.summarization({
            model: 'pszemraj/led-base-book-summary',
            inputs: [data.message],
            parameters: {
                do_sample: false,
                early_stopping: true,
            },
        });

        postMessage({ response: summary });

    } catch (error) {
        console.error(error.message);
        postMessage({ response: "error in background worker" })
    }
}