<template>
    <!-- <input v-model="api_key" class="apiKeyInput"> -->
    <div class="textInput">
        <textarea v-model="text" class="input" placeholder="Enter text here!" rows="4" cols="50"></textarea>
        <button @click="onClick(text)" class="btn" id="summarize-button">Summarize</button>
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
        };
    },
    methods: {
        onClick(text) {
            if (this.error) {
                this.error = null;
            }
            console.log(`text: ${text}, key: ${this.api_key}`);
            bgSummarize.postMessage({ message: text, key: this.api_key });
        },
    },
    created() {
        bgSummarize.onmessage = (event) => {
            // if (event.data.key === "working") {
            //     this.$emit("loading", event.data.value)
            // } else {
            //     this[event.data.key] = event.data.value;
            // }

            this.summary = event.data.response.summary_text;
            console.log(event.data.response);
        };
    },
}
</script>

<style scoped>
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
    overflow: scroll;
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
    width: 90%;
}

.input:focus {
    outline: none;
    border-color: var(--dark-primary-color);
}

</style>