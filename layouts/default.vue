<template>
  <div class="page">
    <PageNav />
    <div class="page-content">
      <slot />
    </div>
    <PageFooter />
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

const selectedTheme = ref<string>("0");
provide("selectedTheme", selectedTheme);

const themeFileName = ref<string | undefined>("default");
provide("themeFileName", themeFileName);

watch(selectedTheme, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const themeLocation = parseInt(newVal);
    console.warn("themeLocation", themeLocation, themes.value[themeLocation]);
    if (themes.value[themeLocation] !== undefined) {
      themeFileName.value = themes.value[themeLocation].id;
    }
  }
});

const themeDomain = ref<string>("1");
const themes = ref<Record<number, ThemeInfo>>({});

watch(themeDomain, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchThemes();
  }
});

watch(themes, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectedTheme.value = localStorage.getItem("theme") || "0";
  }
});

provide("themes", themes);
provide("themeDomain", themeDomain);

useHead(() => ({
  link: [
    {
      rel: "stylesheet",
      href: `${themeDomain.value}/themes/${themeFileName.value}.css`,
    },
  ],
}));

onBeforeMount(() => {
  themeDomain.value = localStorage.getItem("themeDomain") || "";
  fetchThemes();
});

const fetchThemes = async () => {
  fetch(`${themeDomain.value}/themes.json`)
    .then((res) => res.json())
    .then((data) => (themes.value = data))
    .catch((error) => console.error(error)); // Add a catch block to handle any errors
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&display=swap')

body, html
  margin: 0
  padding: 0
  font-family: 'Kanit', sans-serif
  background: transparent
  position: relative
  overflow-x: hidden

.page
  display: flex
  flex-direction: column
  min-height: 100vh
  width: 100%
  position: relative
</style>
