<template>
    <div class="credits">
        <p>See <a href="https://github.com/zvoverman/text-summarizer/tree/main/application" target="_blank">documentation</a>
            for help.</p>
    </div>
</template>

<script>
export default {
    name: 'AppCredit',
}
</script>

<style scoped>
/* Credits */
.credits {
    width: 100%;
    background-color: var(--secondary-color);
    color: var(--font-color);
    text-align: left;
    font-size: 18px;
    position: absolute;
    bottom: 0px;
}

.credits p {
    margin: 4px;
}

.credits a {
    color: var(--primary-color);
    text-decoration: none;
}

.credits a:hover {
    text-decoration: underline;
}
</style>