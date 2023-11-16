<template>
    <div class="theme-settings">
        <h1>Theme Settings</h1>
        <h2>Edit currently used domain here:</h2>
        <div>
            <input v-model="themeDomain" type="text" placeholder="https://www.example.com">
            <button @click="setThemeDomain">Save</button>
        </div>
    </div>
    <div v-if="themes">
        <h1>Themes available <span v-if="themeDomain"> from {{ themeDomain }}</span><span v-else>by default</span>:</h1>
    </div>
    <div v-if="themes" v-for="(theme, index) in themes" :key="index">
        <div class="theme">
            <h2>{{ theme?.name }}</h2>
            <h3 v-if="theme?.series">{{ theme?.series }}</h3>
            <p>{{ theme?.description }}</p>
            <!-- <button>Use this theme</button>
      <button>Install to local storage</button> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ThemeInfo {
    id?: string;
    name?: string;
    series?: string;
    description?: string;
    nsfw?: boolean;
}

const themes = inject('themes') as Ref<Record<number, ThemeInfo>>;

const themeDomain = inject('themeDomain') as Ref<string>;

const setThemeDomain = () => {
    localStorage.setItem('themeDomain', themeDomain.value);
    window.location.reload();
}
</script>

<style></style>

