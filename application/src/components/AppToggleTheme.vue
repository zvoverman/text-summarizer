<template>
    <div class="theme-switch-wrapper">
        <p>Toggle Dark Mode</p>
        <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" @click="$emit('themeSwitch', this.checked)" v-model="checked">
            <span class="checkbox-custom"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: "AppToggleTheme",
    data() {
        return {
            checked: false,
        };
    }
}
</script>

<style scoped>
/* Theme Switch Checkbox */
.theme-switch-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.theme-switch {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.theme-switch input {
    display: none;
}

.checkbox-custom {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    border: 1px solid var(--primary-color);
    transition: background-color 0.3s ease;
}

.theme-switch input:checked+.checkbox-custom {
    background-color: var(--dark-primary-color);
}

.theme-switch-wrapper p {
    margin-right: 10px;
}
</style>