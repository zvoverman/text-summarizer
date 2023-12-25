(() => {
  // src/sidebar/sidebar.js
  document.addEventListener("DOMContentLoaded", function() {
    const summarizeBtn = document.getElementById("summarizeButton");
    const summaryElement = document.getElementById("summary");
    const timeElapsedElement = document.getElementById("timeElapsedValue");
    summarizeBtn.addEventListener("click", async function() {
      try {
        summarizeBtn.innerHTML = "Summarizing...";
        summarizeBtn.disabled = true;
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const tabId = tabs[0].id;
        const response = await browser.tabs.sendMessage(tabId, { action: "summarizeBtnClicked", timeStamp: Date.now() });
        console.log(`Content script sent a response: ${response.response}`);
      } catch (error) {
        console.error(error);
        summarizeBtn.innerHTML = "Summarize";
        summarizeBtn.disabled = false;
        timeElapsedElement.textContent = "0.00 sec";
        summaryElement.textContent = error.message;
      }
    });
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "summarizeResponse") {
        console.log("Popup received processed text from Background:", request.processedText);
        summarizeBtn.innerHTML = "Summarize";
        summarizeBtn.disabled = false;
        summaryElement.textContent = request.processedText;
        timeElapsedElement.textContent = (request.timeElapsed / 1e3).toFixed(2) + " sec";
      } else if (request.action === "summarizeError") {
        console.error(request.error);
        summarizeBtn.innerHTML = "Summarize";
        summarizeBtn.disabled = false;
        timeElapsedElement.textContent = (request.timeElapsed / 1e3).toFixed(2) + " sec";
        summaryElement.textContent = "Summarization failed. \nHave you entered a valid API Key?\nHave you exceeded your number of API calls?\nSee documentation for help.";
      }
    });
  });
})();
