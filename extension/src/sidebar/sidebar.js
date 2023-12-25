document.addEventListener('DOMContentLoaded', function () {
    const summarizeBtn = document.getElementById('summarizeButton');
    const summaryElement = document.getElementById('summary');
    const timeElapsedElement = document.getElementById('timeElapsedValue');

    // Event listener for the "Summarize" button
    summarizeBtn.addEventListener('click', async function () {
        try {
            // Disable the button and show a loading message
            summarizeBtn.innerHTML = "Summarizing...";
            summarizeBtn.disabled = true;

            // Get the active tab
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const tabId = tabs[0].id;

            // Send message to content script for summarization
            const response = await browser.tabs.sendMessage(tabId, { action: 'summarizeBtnClicked', timeStamp: Date.now() });

            // Log the response from the content script
            console.log(`Content script sent a response: ${response.response}`);
        } catch (error) {
            // Handle errors during the summarization process
            console.error(error);
            summarizeBtn.innerHTML = "Summarize";
            summarizeBtn.disabled = false;
            timeElapsedElement.textContent = "0.00 sec";
            summaryElement.textContent = error.message;
        }
    });

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'summarizeResponse') {
            // Handle successful summarization
            console.log('Popup received processed text from Background:', request.processedText);
            summarizeBtn.innerHTML = "Summarize";
            summarizeBtn.disabled = false;
            summaryElement.textContent = request.processedText;
            timeElapsedElement.textContent = (request.timeElapsed / 1000).toFixed(2) + " sec";
        } else if (request.action === 'summarizeError') {
            // Handle summarization errors
            console.error(request.error);
            summarizeBtn.innerHTML = "Summarize";
            summarizeBtn.disabled = false;
            timeElapsedElement.textContent = (request.timeElapsed / 1000).toFixed(2) + " sec";
            summaryElement.textContent = "Summarization failed. \nHave you entered a valid API Key?\nHave you exceeded your number of API calls?\nSee documentation for help.";
        }
    });
});