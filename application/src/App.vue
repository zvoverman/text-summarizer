<template>
    <div class="container">
        <AppHeader title="Text Summarizer" />
        <AppSummarize />
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSummarize from './components/AppSummarize.vue'

export default {
    name: 'App',
    components: {
        AppHeader,
        AppSummarize
    }
}
</script>

<style>
/* Theme Color Variables */
:root {
    --primary-color: #00c56d;
    --dark-primary-color: #04a059;
    --light-primary-color: hsl(153, 64%, 60%);
    --secondary-color: #e9e6e7;
    --font-color: #0b090a;
    --bg-color: #ffffff;
}

[data-theme="dark"] {
    --primary-color: #00c56d;
    --dark-primary-color: #04a059;
    --light-primary-color: #59daa0;
    --secondary-color: #161a1d;
    --font-color: #fff;
    --bg-color: #0b090a;
}

#app {
    font-family: 'Merriweather', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: var(--bg-color);
    width: 100vh;
    height: 100vh;
}
</style>
