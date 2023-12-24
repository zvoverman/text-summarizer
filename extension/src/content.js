browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeBtnClicked') {
        // Get highlighted text from the window
        const selectedText = window.getSelection().toString();

        if (selectedText === "") throw new Error("highlighted text cannot be obtained");

        console.log('Content received message from Popup. Selected Text:', selectedText);

        // Send the selected text to the background script
        browser.runtime.sendMessage({ action: 'summarize', text: selectedText, timeStamp: request.timeStamp });

        sendResponse({ response: selectedText });
        return true;
    }
    return false;
});
