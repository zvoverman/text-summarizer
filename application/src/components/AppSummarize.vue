<template>
    <div class="summary-container">
        <div class="api_key_wrapper">
            <p>Enter API key:</p>
            <input v-model="api_key" class="api_input">
        </div>

        <textarea v-model="text" class="input" placeholder="Enter text here!" rows="4" cols="50"></textarea>

        <button @click="onClick(text)" class="btn" id="summarize-button" :disabled="summary_disabled">
            {{ summary_btn_text }}</button>

    </div>

    <div class="summary">{{ summary }}</div>
</template>

<script>
const bgSummarize = new Worker(
    new URL('../background-worker.js', import.meta.url),
    { type: "module" },
);

export default {
    name: 'AppSummarize',
    data() {
        return {
            text: '',
            summary: '',
            api_key: '',
            summary_disabled: false,
            summary_btn_text: 'Summarize',
        };
    },
    methods: {
        onClick(text) {
            if (text && text != '') {
                console.log("text received.");
                bgSummarize.postMessage({ message: text, key: this.api_key });
                this.summary_disabled = true;
                this.summary_btn_text = "Summarizing..."
            } else {
                this.summary = "No text has been provided."
            }
        }
    },
    created() {
        bgSummarize.onmessage = (event) => {
            // TODO: implement better event messages and handling
            this.summary = event.data.response.summary_text;
            console.log(event.data.response);
            this.summary_disabled = false;
            this.summary_btn_text = "Summarize"
        };
    },
}
</script>

<style scoped>
.summary-container {
    background-color: var(--secondary-color);
    padding: 20px;
    border-radius: 3%;
}

.api_key_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.api_input {
    padding: 8px;
    border: 1px solid var(--primary-color);
    background-color: var(--bg-color);
    color: var(--font-color);
    border-radius: 4px;
    margin-right: 10px;
    margin-left: 10px;
}

/* Button Styles */
button {
    width: 33%;
    padding: 12px;
    text-align: center;
    background-color: var(--primary-color);
    color: var(--font-color);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 6px;
}

button:hover {
    background-color: var(--dark-primary-color);
}

#summarize-button[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    background-color: var(--dark-primary-color);
}

.summary {
    user-select: auto;
    padding: 5px;
    border: 5px solid var(--secondary-color);
    border-radius: 8px;
    background-color: var(--bg-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

.input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid var(--primary-color);
    background-color: var(--bg-color);
    color: var(--font-color);
    border-radius: 4px;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 20px;
    width: 90%;
}

.input:focus {
    outline: none;
    border-color: var(--dark-primary-color);
}
</style>