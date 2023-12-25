// Handle messages from the sidebar script
function handleMessage(request, sender, sendResponse) {
    if (request.action === 'summarizeBtnClicked') {

        const selectedText = window.getSelection().toString();

        // Ensure there is highlighted text before proceeding
        if (selectedText === '') {
            // Send the selected text for summarization to the background script
            browser.runtime.sendMessage({ 
                action: 'summarize', 
                text: selectedText, 
                timeStamp: request.timeStamp 
            });

            // Respond to the sidebar script with the selected text
            sendResponse({ response: selectedText });
            return true;
        }
    }
    return false;
}

// Listen for messages with the 'summarizeBtnClicked' action from the sidebar script
browser.runtime.onMessage.addListener(handleMessage);