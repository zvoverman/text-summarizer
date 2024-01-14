<template>
    <div class="container">
        <AppHeader title="Text Summarizer" />
        <AppToggleTheme theme="light" @themeSwitch="checked => themeSwitch(checked)" />
        <AppSummarize />
        <AppCredits />
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSummarize from './components/AppSummarize.vue'
import AppToggleTheme from './components/AppToggleTheme.vue'
import AppCredits from './components/AppCredits.vue'

export default {
    name: 'App',
    components: {
        AppHeader,
        AppToggleTheme,
        AppSummarize,
        AppCredits,
    },
    methods: {
        themeSwitch(checked) {
            checked = !checked;

            if (checked) {
                document.documentElement.setAttribute('container', 'dark');
            } else {
                document.documentElement.setAttribute('container', 'light');
            }
        }
    }
}
</script>

<style>
/* Theme Color Variables */
:root {
    --primary-color: #00c56d;
    --dark-primary-color: #04a059;
    --light-primary-color: #59daa0;
    --secondary-color: #e9e6e7;
    --font-color: #0b090a;
    --bg-color: #ffffff;
}

[container="dark"] {
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
    color: var(--font-color);
    width: 100vw;
    height: 100vh;
}

body {
    margin: 0px;
    padding: 0px;
    overflow: 'hidden';
}
</style>
