<template>
  <footer class="footer">
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
      <li><a href="#">Link 4</a></li>
    </ul>
    <ul>
      <li><a href="#">Link 5</a></li>
      <li><a href="#">Link 6</a></li>
      <li><a href="#">Link 7</a></li>
      <li><a href="#">Link 8</a></li>
    </ul>
    <div class="theme-selector">
        <select v-model="theme" @change="saveTheme">
          <option value="0">Theme 1</option>
          <option value="1">Theme 2</option>
          <option value="2">Theme 3</option>
        </select>
        <button>Manage Themes</button>
      </div>
  </footer>
</template>

<script lang="ts" setup>
const theme = inject('selectedTheme') as Ref<string>;

const saveTheme = () => {
  localStorage.setItem('theme', theme.value);
}
</script>

<style lang="sass">
.footer
  margin-top: auto
  width: 100%
  display: flex
  justify-content: space-around
  height: 200px
  background: #ddddddaa
  backdrop-filter: blur(10px)

ul
  list-style-type: none

a
  text-decoration: none
  color: black

.theme-selector
  display: flex
  flex-direction: column
  gap: 20px
  align-items: center
  //justify-content: center

ul
  list-style-type: none

a
  text-decoration: none
  color: black
</style>