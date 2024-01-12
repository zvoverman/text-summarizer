<template>
    <header>
        <div class="logo-container">
            <img src="../assets/monstera-leaf.svg" alt="monstera" width="80%">
        </div>
        <h1>{{ title }}</h1>
        <p>Enter text and hit "Summarize" to get started!</p>
    </header>
</template>

<script>
export default {
    name: 'AppHeader',
    props: {
        title: String,
    }
}
</script>

<style scoped>
header {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

header p {
    font-size: 18px;
}

/* Banner */
.logo-container {
    width: 60px;
    height: 60px;
    background-color: var(--light-primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>