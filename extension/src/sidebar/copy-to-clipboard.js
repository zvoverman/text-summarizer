document.addEventListener('DOMContentLoaded', function () {
    var copyButton = document.getElementById('copyButton');
    var summaryDiv = document.getElementById('summary');

    copyButton.addEventListener('click', function () {
        console.log('Copy button clicked');
        copyTextToClipboard(summaryDiv.innerText);
    });

    function copyTextToClipboard(text) {
        console.log('Copying text:', text);
        navigator.clipboard.writeText(text)
            .then(function () {
                // You can provide some visual feedback to the user, like a tooltip or message
                console.log('Text copied to clipboard!');
            })
            .catch(function (err) {
                console.error('Unable to copy to clipboard', err);
            });
    }
});
