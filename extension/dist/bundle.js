(() => {
  // src/popup/popup.js
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sendMessageButton").addEventListener("click", function() {
      document.getElementById("sendMessageButton").innerHTML = "Summarizing...";
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const tabId = tabs[0].id;
        browser.tabs.sendMessage(tabId, { action: "popupToContent", message: "Hello from Popup!" });
        console.log("Popup send message to Content.js");
      }).catch((error) => {
        console.error(error);
      });
    });
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "backgroundToPopup") {
        document.getElementById("sendMessageButton").innerHTML = "Summarize";
        console.log("Popup received processed text from Background:", request.processedText);
        document.getElementById("output").innerHTML = request.processedText;
      }
    });
  });
})();
