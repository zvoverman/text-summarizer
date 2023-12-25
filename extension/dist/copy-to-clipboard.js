(() => {
  // src/sidebar/copy-to-clipboard.js
  document.addEventListener("DOMContentLoaded", function() {
    const copyButton = document.getElementById("copyButton");
    const summaryElement = document.getElementById("summary");
    copyButton.addEventListener("click", function() {
      console.log("Copy button clicked");
      copyTextToClipboard(summaryElement.innerText);
    });
    function copyTextToClipboard(text) {
      console.log("Copying text:", text);
      navigator.clipboard.writeText(text).then(function() {
        console.log("Text copied to clipboard!");
      }).catch(function(err) {
        console.error("Unable to copy to clipboard", err);
      });
    }
  });
})();
