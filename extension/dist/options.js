(() => {
  // src/sidebar/options.js
  document.addEventListener("DOMContentLoaded", function() {
    const apiKeyInput = document.getElementById("apiKey");
    const saveButton = document.getElementById("saveButton");
    browser.storage.sync.get(["apiKey"], function(result) {
      const apiKey = result && result.apiKey || "";
      apiKeyInput.value = apiKey;
    });
    saveButton.addEventListener("click", function() {
      const apiKey = apiKeyInput.value;
      browser.storage.local.set({ apiKey }, function() {
        console.log("API key saved:", apiKey);
      });
    });
  });
})();
