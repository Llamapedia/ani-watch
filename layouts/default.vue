<template>
  <PageNav />
    <slot />
  <PageFooter />
</template>

<script lang="ts" setup>
const selectedTheme = ref('0');
provide('selectedTheme', selectedTheme);

const themeFileName = ref('default');
provide('themeFileName', themeFileName);

watch(selectedTheme, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    themeFileName.value = themes[parseInt(newVal)];
  }
});

const themes = [
  'uraraka',
  'asui',
  'ashido',
];

useHead(() => ({
  link: [
    {
      rel: 'stylesheet',
      href: `/themes/${themeFileName.value}.css`
    }
  ]
}));

onMounted(() => {
  selectedTheme.value = localStorage.getItem('theme') || '0';
});
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&display=swap')

body, html
  margin: 0
  padding: 0
  display: flex
  flex-direction: column
  height: 100%
  width: 100%
  min-height: 100vh
  font-family: 'Kanit', sans-serif
  background: transparent
  position: relative
  overflow-x: hidden

</style>

