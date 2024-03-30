<template>
  <div class="theme-settings">
    <h1>Theme Settings</h1>
    <div class="theme-domain-edit">
      <h2>Edit currently used domain here:</h2>
      <input
        v-model="themeDomain"
        type="text"
        placeholder="https://www.example.com"
      />
      <button @click="setThemeDomain">Save</button>
    </div>
  </div>
  <div v-if="themes" class="themes-list">
    <h1>
      Themes available <span v-if="themeDomain"> from {{ themeDomain }}</span
      ><span v-else>by default</span>:
    </h1>
    <div class="theme-preview">
      <label for="preview">Preview themes</label>
      <input
        type="checkbox"
        name="preview"
        id="preview"
        v-model="previewThemes"
      />
    </div>
    <div
      v-if="themes"
      v-for="(theme, index) in themes"
      :key="index"
      class="theme-item"
    >
      <div class="theme">
        <div v-if="previewThemes" class="theme-preview-images">
          <img
            :src="`${themeDomain}/themes/background-${theme.id}.png`"
            alt=""
            class="theme-preview-bg"
          />
          <img
            :src="`${themeDomain}/themes/logo-${theme.id}.png`"
            alt=""
            class="theme-preview-logo"
          />
        </div>
        <p v-if="theme?.nsfw" class="theme-nsfw">🔞</p>
        <div class="theme-title-bar">
          <h2>{{ theme?.name }}</h2>
          <button @click="setTheme(index)">Use this theme</button>
        </div>
        <h3 v-if="theme?.series">{{ theme?.series }}</h3>
        <p>{{ theme?.description }}</p>
        <!-- <button>Use this theme</button>
      <button>Install to local storage</button> -->
      </div>
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

const themes = inject("themes") as Ref<Record<number, ThemeInfo>>;

const themeDomain = inject("themeDomain") as Ref<string>;

const selectedTheme = inject("selectedTheme") as Ref<string>;

const previewThemes = ref(true);

const setThemeDomain = () => {
  localStorage.setItem("themeDomain", themeDomain.value);
  window.location.reload();
};

const setTheme = (themeId: number) => {
  console.log(themeId);
  selectedTheme.value = themeId.toString();
  localStorage.setItem("theme", themeId.toString());
};
</script>

<style lang="sass" scoped>
.theme-settings
    position: relative
    margin: 10px auto
    max-width: 800px
    color: #fff

    .theme-domain-edit
        padding: 10px
        background: #0008
        border-radius: 20px

        h2
            margin: 4px

        input
            margin-right: 10px
            width: 70%
            border: 3px solid #fff
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

        button
            border: 3px solid #fff
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

.themes-list
    margin: 10px auto
    max-width: 800px
    color: #fff

    h1
        margin: 4px
        font-size: 2em

    .theme-preview
        background: #0008
        padding: 10px
        border-radius: 10px
        width: fit-content

        label
            user-select: none

            &:hover
                cursor: pointer

        input:hover
            cursor: pointer

    .theme-item
        padding: 10px
        background: #0008
        border-radius: 20px
        margin: 10px 0
        position: relative

        .theme
            .theme-preview-images
                position: relative
                min-height: 80px

            .theme-preview-bg
                width: 100%
                border-radius: 10px

            .theme-preview-logo
                width: 20%
                position: absolute
                top: 0
                left: 0

            .theme-nsfw
                font-size: 1.5em
                position: absolute
                right: 10px
                user-select: none

            .theme-title-bar
                display: flex
                flex-direction: row
                gap: 10px
                align-items: center

                button
                    border: 3px solid #fff
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

            h2
                margin: 4px

            h3
                margin: 4px

            p
                margin: 4px
</style>
