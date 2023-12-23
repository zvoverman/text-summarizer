// Options
document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('saveButton');

    // Load API key from storage
    browser.storage.sync.get(['apiKey'], function (result) {
        const apiKey = result && result.apiKey || '';
        apiKeyInput.value = apiKey;
    });

    // Save API key to storage
    saveButton.addEventListener('click', function () {
        const apiKey = apiKeyInput.value;

        // Validate apiKey if needed

        // Save to storage
        browser.storage.local.set({ apiKey: apiKey }, function () {
            console.log('API key saved:', apiKey);
        });
    });
});