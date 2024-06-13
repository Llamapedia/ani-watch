<template>
  <footer class="footer">
    <div class="theme-selector">
      <select v-model="themeIndex" @change="saveTheme">
        <option
          v-for="(themeInfo, index) in themes"
          :value="themeInfo.id"
          :key="index"
        >
          {{ themeInfo.name }}
        </option>
      </select>
      <button @click="navigateTo('/themes')">Manage Themes</button>
    </div>
    <p>
      We are not responsible for the content on this website. All rights belong
      to anilist and malsync.
    </p>
  </footer>
</template>

<script lang="ts" setup>
interface ThemeInfo {
  id?: string;
  name?: string;
  series?: string;
  description?: string;
  logo?: string;
  viginette?: string;
  nsfw?: boolean;
}

const themes = inject("themes") as Ref<Record<number, ThemeInfo>>;

const selectedTheme = inject("selectedTheme") as Ref<ThemeInfo>;

const themeIndex = ref<String>();

watch(selectedTheme, (newVal, oldVal) => {
  themeIndex.value = newVal.id;
});

const saveTheme = () => {
  for (const theme in themes.value) {
    if (themes.value[theme].id === themeIndex.value) {
      selectedTheme.value = themes.value[theme];
    }
  }
  localStorage.setItem("theme", selectedTheme.value.id);
};

onMounted(() => {
  themeIndex.value = localStorage.getItem("theme") || "default";
});
</script>

<style lang="sass">
.footer
  position: relative
  margin-top: auto
  width: 100%
  display: flex
  flex-shrink: 0
  flex-direction: column
  justify-content: center
  align-items: center
  height: 200px
  background: #ddddddaa
  backdrop-filter: blur(10px)

.theme-selector
  display: grid
  grid-template-columns: 70% 30%
  gap: 20px
  align-items: center
  justify-content: center
  width: calc( 100% - 40px )
  max-width: 400px

  select
    border: 3px solid #fff
    border-radius: 10px
    width: 100%
    font: inherit
    background: #0008
    color: #fff
    padding: 5px 10px
    cursor: pointer
    transition: background 0.3s ease-in-out

    &:hover
      background: #fff
      color: #000

  button
    border: 3px solid #fff
    width: 100%
    border-radius: 10px
    font: inherit
    background: #0008
    color: #fff
    padding: 5px 10px
    cursor: pointer
    transition: background 0.3s ease-in-out

    &:hover
      background: #fff
      color: #000
</style>
