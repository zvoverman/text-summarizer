// content.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'popupToContent') {

        const selectedText = window.getSelection().toString();
        console.log('Content received message from Popup. Selected Text:', selectedText);

        // Send the selected text to the background script
        browser.runtime.sendMessage({ action: 'contentToBackground', text: selectedText });

    }
});
