<template>
  <div
    class="reader"
    :class="isFullscreen ? 'reader-fullscreen' : ''"
    ref="pageElement"
  >
    <div class="reader-image-container">
      <div
        v-if="!isFullscreen"
        class="reader-maximize"
        @click="toggleFullscreen"
      >
        <img src="@/assets/svg/maximize.svg" alt="Maximize" />
      </div>
      <div v-else class="reader-minimize" @click="toggleFullscreen">
        <img src="@/assets/svg/minimize.svg" alt="Minimize" />
      </div>
      <div @click="prevPage" class="reader-nav left" />
      <div
        v-if="page === 0 && !isFullscreen"
        @click="nextPage"
        class="reader-nav right cover"
      >
        <span>Click here to read this comic!</span>
      </div>
      <div v-else @click="nextPage" class="reader-nav right" />
      <img
        :src="`/nabooru/${isFullscreen ? '' : 'low/'}${page}.jpg`"
        alt="Manga Page"
        class="reader-image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const pageElement = ref<HTMLElement | null>(null);
const page = ref<number>(0);
const preloadedPages = new Set<number>();
const isFullscreen = ref<boolean>(false);

const preloadPage = (page: number) => {
  if (!preloadedPages.has(page)) {
    const img = new Image();
    img.src = `/nabooru/${isFullscreen.value ? "" : "low/"}${page}.jpg`;
    preloadedPages.add(page);
  }
};

const preloadSurrondingPages = () => {
  for (let i = -3; i <= 3; i++) {
    let pageNum = page.value + i;
    if (pageNum < 0) pageNum = 66 + pageNum;
    if (pageNum > 65) pageNum = pageNum - 66;
    preloadPage(pageNum);
  }
};

const nextPage = () => {
  if (page.value === 65) page.value = 0;
  else if (page.value === 19 || page.value === 61) page.value += 2;
  else page.value++;
  preloadSurrondingPages();
};

const prevPage = () => {
  if (page.value === 0) page.value = 65;
  else if (page.value === 21 || page.value === 63) page.value -= 2;
  else page.value--;
  preloadSurrondingPages();
};

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await pageElement.value?.requestFullscreen();
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
  }
};

const updateFullscreenState = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener("fullscreenchange", updateFullscreenState);
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", updateFullscreenState);
});

watchEffect(() => {
  preloadSurrondingPages();
});
</script>

<style lang="sass">
.reader
    position: relative
    width: 100%

    .reader-image-container
        display: grid
        justify-content: center
        align-items: center

        .reader-nav
            position: absolute
            top: 0
            bottom: 0
            width: 50%
            cursor: pointer

        .left
            left: 0

        .right
            right: 0

        .cover
            background: linear-gradient(to right, transparent, #000a 50%, #000 100%)
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            font-size: 1.5rem
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 5px black
            font-weight: bold
            color: white
            cursor: pointer

        .reader-image
            max-width: 100%
            max-height: 70vh
            object-fit: contain

    .reader-maximize
        position: absolute
        right: 10px
        top: 10px
        display: flex
        justify-content: center
        align-items: center
        border-radius: 50%
        padding: 10px
        z-index: 1

        &:hover
          background: #000
          filter: invert(1)

    .reader-minimize
        position: absolute
        right: 10px
        top: 10px
        display: flex
        justify-content: center
        align-items: center
        border-radius: 50%
        padding: 10px
        z-index: 1

        &:hover
          background: #000
          filter: invert(1)

.reader-fullscreen
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    max-height: 100vh
    background: #000
    z-index: 1000
    display: flex
    justify-content: center
    align-items: center

    .reader-image
        width: 100vw !important
        height: 100vh !important
        max-width: 100vw !important
        max-height: 100vh !important
        object-fit: contain
</style>
