<template>
  <div
    class="page"
    :style="`background: ${selectedTheme?.id == 'default' ? '#333' : ''}`"
  >
    <div class="page-bg" ref="pageBg" :style="brightnessStyle">
      <div class="page-bg-img" v-for="i in 9" :key="i">
        <img alt="Background" />
      </div>
    </div>
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
  logo?: string;
  viginette?: string;
  nsfw?: boolean;
}

const pageBg = ref<HTMLElement | null>(null);

const selectedTheme = ref<ThemeInfo>({ id: "default" });
provide("selectedTheme", selectedTheme);

const themeDomain = ref<string>("");
provide("themeDomain", themeDomain);

const themes = ref<Record<number, ThemeInfo>>({});

watch(themeDomain, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchThemes();
  }
});

watch(themes, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectedTheme.value.id = localStorage.getItem("theme") || "default";
    applyActiveBackgroundImage();
  }
});

watch(selectedTheme, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    applyActiveBackgroundImage();
  }
});

provide("themes", themes);
provide("themeDomain", themeDomain);

onBeforeMount(() => {
  themeDomain.value = localStorage.getItem("themeDomain") || "";
  fetchThemes();
});

onMounted(async () => {
  const page = ref<HTMLElement | null>(document.body);

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === page.value) {
        checkScrollability();
      }
    }
  });

  if (page.value) {
    resizeObserver.observe(page.value);
  }
  window.addEventListener("resize", checkScrollability);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkScrollability);
    if (page.value) {
      resizeObserver.unobserve(page.value);
    }
    resizeObserver.disconnect();
  });
});

const brightnessStyle = computed(() => {
  if (selectedTheme.value?.viginette === "light") {
    return {
      "--brightness": "1.5",
    };
  } else if (selectedTheme.value?.viginette === "none") {
    return {
      "--brightness": "1",
    };
  }
  return {
    "--brightness": "0.5",
  };
});

const checkScrollability = () => {
  const isScrollable =
    document.documentElement.scrollHeight > window.innerHeight;
  if (!isScrollable && pageBg.value) {
    setTimeout(() => {
      if (
        isScrollable ===
        document.documentElement.scrollHeight > window.innerHeight
      ) {
        pageBg.value.classList.add("page-bg-single");
      }
    }, 1000);
  } else if (pageBg.value) {
    pageBg.value.classList.remove("page-bg-single");
  }
};

const fetchThemes = async () => {
  fetch(`${themeDomain.value}/themes.json`)
    .then((res) => res.json())
    .then((data) => (themes.value = data))
    .catch((error) => console.error(error)); // Add a catch block to handle any errors
};

const applyActiveBackgroundImage = async () => {
  try {
    const imageUrl = `${themeDomain.value}/res/background/${selectedTheme.value.id}.png`;

    const cache = await caches.open("riju-cache-v1");
    const cachedResponse = await cache.match(imageUrl);

    if (cachedResponse) {
      console.log("Image retrieved from cache:", imageUrl);

      const blob = URL.createObjectURL(await cachedResponse.blob());

      const imageElements = pageBg.value?.querySelectorAll("img");
      if (imageElements) {
        imageElements.forEach(async (element) => {
          element.src = blob;
        });
      }
    } else {
      console.log("No cached image found, fetching from network...");
      console.log("Image URL:", imageUrl);
      const response = await fetch(imageUrl);
      if (response.ok) {
        const newCache = await caches.open("riju-cache-v1");
        const cachedRequests = await newCache.keys();

        for (const request of cachedRequests) {
          await newCache.delete(request);
        }

        newCache.put(imageUrl, response.clone());
        console.log("Image fetched from network and cached.");

        const blob = URL.createObjectURL(await response.blob());

        const imageElements = pageBg.value?.querySelectorAll("img");
        if (imageElements) {
          imageElements.forEach(async (element) => {
            element.src = blob;
          });
        }
      } else {
        console.error("Failed to fetch image:", response.status);
      }
    }
  } catch (error) {
    console.error("Error retrieving image from cache:", error);
  }
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&display=swap')

@font-face
  font-family: 'DharmaGothicC-Regular'
  src: url('~/assets/fonts/DharmaGothicC-Regular.woff2') format('woff2')

@font-face
  font-family: 'DharmaGothicC-HeavyItalic'
  src: url('~/assets/fonts/DharmaGothicC-HeavyItalic.woff2') format('woff2')

@font-face
  font-family: 'DharmaGothicC-Heavy'
  src: url('~/assets/fonts/DharmaGothicC-Heavy.woff2') format('woff2')

@font-face
  font-family: 'DharmaGothicE-ExBold'
  src: url('~/assets/fonts/DharmaGothicE-ExBold.woff2') format('woff2')

$gradient-start: 0%
$gradient-middle: 5%
$gradient-end: 15%

@mixin gradientBlur($direction)
  &::after
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    backdrop-filter: blur(5px)
    pointer-events: none
    mask-image: linear-gradient($direction, rgba(0,0,0,0.5) $gradient-start, rgba(0, 0, 0, 0.75) $gradient-middle, rgba(0,0,0,1) $gradient-end)

  &::before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    backdrop-filter: brightness(var(--brightness))
    pointer-events: none
    mask-image: linear-gradient($direction, rgba(0,0,0,0) $gradient-start, rgba(0, 0, 0, 0.5) $gradient-middle, rgba(0,0,0,1) $gradient-end)


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

.page-bg
  position: fixed
  top: 50%  //calc(50% - 75px)
  left: 50%
  transform: translate(-50%, -50%)
  z-index: -1
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(3, 1fr)
  gap: 0
  width: fit-content
  height: fit-content
  transition: all 0.5s ease-out
  margin: 0
  padding: 0

  .page-bg-img
    position: relative
    height: fit-content
    width: fit-content
    display: inline-block
    margin: -1px
    padding: 0
    box-sizing: border-box

    &:nth-child(1), &:nth-child(3), &:nth-child(7), &:nth-child(9)
      transform: scale(-1, -1)

    &:nth-child(2), &:nth-child(8)
      transform: scale(1, -1)

    &:nth-child(4), &:nth-child(6)
      transform: scale(-1, 1)

    &:nth-child(1)
      @include gradientBlur(135deg)

    &:nth-child(2)
      @include gradientBlur(180deg)

    &:nth-child(3)
      @include gradientBlur(225deg)

    &:nth-child(4)
      @include gradientBlur(90deg)

    &:nth-child(6)
      @include gradientBlur(270deg)

    &:nth-child(7)
      @include gradientBlur(45deg)

    &:nth-child(8)
      @include gradientBlur(0deg)

    &:nth-child(9)
      @include gradientBlur(315deg)


  img
      height: auto
      width: auto
      max-width: 100vw
      max-height: 100vh //calc(100vh - 250px)
      object-fit: contain
      display: block
      pointer-events: none

.page-bg-single
    top: calc(50% - 75px)

    img
        max-height: calc( 100vh - 250px )
</style>
