(() => {
  // src/sidebar/sidebar.js
  document.addEventListener("DOMContentLoaded", function() {
    const summarizeBtn = document.getElementById("summarizeButton");
    summarizeBtn.addEventListener("click", function() {
      summarizeBtn.innerHTML = "Summarizing...";
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const tabId = tabs[0].id;
        browser.tabs.sendMessage(tabId, { action: "popupToContent", message: "Hello from Popup!" }).then(handleResponse, handleError);
        console.log("sidebar sent message to content script");
      }).catch((error) => {
        console.error(error);
      });
    });
    function handleResponse(message) {
      console.log(`content script sent a response: ${message.response}`);
    }
    function handleError(error) {
      console.log(`Error: ${error}`);
    }
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "backgroundToPopup") {
        summarizeBtn.innerHTML = "Summarize";
        console.log("Popup received processed text from Background:", request.processedText);
        document.getElementById("summary").innerHTML = request.processedText;
      }
    });
  });
})();
