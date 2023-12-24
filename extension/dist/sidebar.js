(() => {
  // src/sidebar/sidebar.js
  document.addEventListener("DOMContentLoaded", function() {
    const summarizeBtn = document.getElementById("summarizeButton");
    summarizeBtn.addEventListener("click", function() {
      summarizeBtn.innerHTML = "Summarizing...";
      summarizeBtn.disabled = true;
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const tabId = tabs[0].id;
        browser.tabs.sendMessage(tabId, { action: "summarizeBtnClicked", timeStamp: Date.now() }).then((response) => {
          console.log(`content script sent a response: ${response.response}`);
        }).catch((error) => {
          console.error(error);
          document.getElementById("summary").innerHTML = error.message;
          document.getElementById("timeElapsedValue").textContent = "0.00 sec";
          summarizeBtn.innerHTML = "Summarize";
          summarizeBtn.disabled = false;
        });
        console.log("sidebar sent message to content script");
      }).catch((error) => {
        console.error(error);
      });
    });
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "summarizeResponse") {
        console.log("Popup received processed text from Background:", request.processedText);
        document.getElementById("summary").innerHTML = request.processedText;
        document.getElementById("timeElapsedValue").textContent = request.timeElapsed / 1e3 + " sec";
        summarizeBtn.innerHTML = "Summarize";
        summarizeBtn.disabled = false;
      } else if (request.action === "summarizeError") {
        console.error(request.error);
        document.getElementById("summary").textContent = "Summarization failed. \nHave you entered a valid API Key?\nHave you exceeded your number of API calls?\nSee documentation for help.";
        document.getElementById("timeElapsedValue").textContent = request.timeElapsed / 1e3 + " sec";
        summarizeBtn.innerHTML = "Summarize";
        summarizeBtn.disabled = false;
      }
    });
  });
})();
