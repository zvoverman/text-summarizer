document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.getElementById('copyButton');
    const summaryElement = document.getElementById('summary');

    // Event listener for the "Copy" button
    copyButton.addEventListener('click', function () {
        console.log('Copy button clicked');
        copyTextToClipboard(summaryElement.innerText);
    });

    // Function to copy text to the clipboard
    function copyTextToClipboard(text) {
        console.log('Copying text:', text);
        // Use the Clipboard API to write the text to the clipboard
        navigator.clipboard.writeText(text)
            .then(function () {
                console.log('Text copied to clipboard!');
            })
            .catch(function (err) {
                console.error('Unable to copy to clipboard', err);
            });
    }
});
