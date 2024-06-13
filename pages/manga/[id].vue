<template>
  <div v-if="manga" class="manga-details">
    <div class="manga-banner">
      <img :src="manga.bannerImage" alt="" class="manga-banner-image" />
    </div>
    <h1 class="manga-title">
      {{
        manga.title.english
          ? manga.title.english
          : manga.title.romaji
          ? manga.title.romaji
          : manga.title.native
          ? manga.title.native
          : ""
      }}
    </h1>
    <div class="manga-info">
      <div class="manga-cover">
        <img
          :src="manga.coverImage.large"
          alt="Manga Cover Image"
          class="manga-cover-image"
        />
      </div>
      <div class="manga-text">
        <p
          class="manga-description"
          v-html="sanitizeHTML(manga.description)"
        ></p>
        <h3 class="manga-volumes">Volumes: {{ manga.volumes }}</h3>
      </div>
    </div>
  </div>
  <div v-if="completion && false" class="manga-completion">
    <select
      class="manga-status"
      v-model="completion.status"
      @change="checkMangaCompleted"
    >
      <option value="COMPLETED">Completed</option>
      <option value="PLANNING">Planning</option>
      <option value="CURRENT">Watching</option>
      <option value="REPEATING">Rewatching</option>
    </select>
    <h2 class="manga-progress">
      <span> You have read</span>
      <div class="manga-progress-modifier">
        <input
          type="number"
          v-model="completion.progress"
          min="0"
          :max="manga.episodes"
          :disabled="completion.status == 'COMPLETED'"
        />
        <div class="manga-progress-btn-container">
          <button class="btn-increase" @click="increaseProgress">
            &#9206;
          </button>
          <button class="btn-decrease" @click="decreaseProgress">
            &#9207;
          </button>
        </div>
      </div>
      <span>out of {{ manga.episodes }} Chapters.</span>
    </h2>
    <button
      class="manga-completion-save"
      @click="updateMangaCompletion"
      @touchend="updateMangaCompletion"
    >
      Save
    </button>
  </div>
  <div v-else-if="manga" class="manga-completion manga-completion-wip">
    <p>Work in progress...</p>
    <button
      class="manga-completion-save"
      @click="addMangaToList"
      @touchend="addMangaToList"
      disabled
    >
      Plan to watch
    </button>
  </div>
  <div v-if="streamingData" class="streaming-links">
    <h2 class="streaming-links-headline">Read this manga:</h2>
    <div
      v-for="(serviceData, serviceName) in streamingData"
      :key="serviceName"
      class="streaming-service"
    >
      <h2 class="streaming-service-title">{{ serviceName }}</h2>
      <div v-for="(link, index) in Object.values(serviceData)" :key="index">
        <a :href="link.url" target="_blank">
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DOMPurify from "dompurify";
import Cookies from "js-cookie";

const manga = ref();
const streamingData = ref();
const user = ref();
const completion = ref();

const route = useRoute();

onMounted(() => {
  const id = route.params.id.toString();
  getMangaData(parseInt(id));
  fetchStreamingData(parseInt(id));
});

watch(manga, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await getMangaCompletion();
    console.log(completion.value);
  }
});

function checkMangaCompleted() {
  switch (completion.value.status) {
    case "COMPLETED":
      completion.value.progress = manga.value.episodes;
      break;
    case "CURRENT":
      completion.value.progress = 0;
      break;
    case "PLANNING":
      completion.value.progress = 0;
      break;
    case "REPEATING":
      completion.value.progress = 0;
      break;
    default:
      break;
  }
}

async function getUserData() {
  const access_token = Cookies.get("access_token");

  const query = `
            query {
                Viewer {
                    id
                    name
                }
            }
        `;

  const variables = {};

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    user.value = data.data.Viewer;
  }
}

async function getMangaData(malId: number) {
  const query = `
        query ($id: Int, $type: MediaType) {
            Media (idMal: $id, type: $type) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                description
                volumes
                bannerImage
            }
        }
    `;

  const variables = {
    id: malId,
    type: "MANGA",
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  console.log(data);
  manga.value = data.data.Media;
}

async function getMangaCompletion() {
  await getUserData();
  const access_token = Cookies.get("access_token");

  const query = `
    query ($userId: Int, $type: MediaType) {
            MediaListCollection(userId: $userId, type: $type) {
                lists {
                    name
                    entries {
                        status
                        score
                        progress
                        mediaId
                        media {
                            idMal
                        }
                    }
                }
            }
        }
    `;

  const variables = {
    userId: user.value.id,
    type: "MANGA",
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  for (const list in data.data.MediaListCollection.lists) {
    const entry = data.data.MediaListCollection.lists[list].entries.find(
      (entry) => entry.media.idMal === manga.value.idMal
    );
    if (entry) {
      completion.value = entry;
      return;
    }
  }
}

async function updateMangaCompletion() {
  const access_token = Cookies.get("access_token");

  const query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `;

  const variables = {
    mediaId: parseInt(completion.value.mediaId),
    status: completion.value.status,
    progress: parseInt(completion.value.progress),
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  console.error(data);
}

async function addMangaToList() {
  const access_token = Cookies.get("access_token");

  const query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `;

  const variables = {
    mediaId: parseInt(manga.value.id),
    status: "PLANNING",
    progress: 0,
  };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  getMangaCompletion();
}

async function fetchStreamingData(malId: number) {
  const proxyUrl = "https://nhentai-api.onrender.com/";
  const targetUrl = `https://api.malsync.moe/mal/manga/${malId}`;
  const response = await fetch(proxyUrl + targetUrl);
  const data = await response.json();
  console.log(data);
  streamingData.value = data.Sites;
}

function sanitizeHTML(rawHTML: string) {
  return DOMPurify.sanitize(rawHTML);
}

const increaseProgress = () => {
  completion.value.progress++;
  if (completion.value.progress > manga.value.episodes) {
    completion.value.progress = manga.value.episodes;
  }
  if (completion.value.progress === manga.value.episodes) {
    completion.value.status = "COMPLETED";
  }
  if (completion.value.status === "PLANNING") {
    completion.value.status = "CURRENT";
  }
};

const decreaseProgress = () => {
  completion.value.progress--;
  if (completion.value.progress < 0) {
    completion.value.progress = 0;
  }
  if (completion.value.progress < manga.value.episodes) {
    if (completion.value.status !== "REPEATING") {
      completion.value.status = "CURRENT";
    }
  }
  if (completion.value.progress === 0) {
    completion.value.status = "PLANNING";
  }
};
</script>

<style lang="sass" scoped>
.manga-details
    position: relative

    .manga-banner
        position: relative
        max-width: 1000px
        margin: 10px auto
        margin-bottom: 0

        .manga-banner-image
            position: inherit
            top: 0
            left: 0
            width: 100%
            border-radius: 20px

    .manga-title
        margin: 10px auto
        max-width: 1000px
        color: #fff
        font: 6rem 'DharmaGothicC-Heavy', sans-serif
        //font-size: 200%
        //font-weight: 600
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 5px black
        text-align: center

    .manga-info
        margin: 10px auto
        background: #0008
        border-radius: 20px
        padding: 20px
        max-width: 800px
        display: grid
        grid-template-columns: 1fr 1fr
        align-items: start

        @media screen and (max-width: 800px)
            grid-template-columns: 1fr

        .manga-cover
            float: left
            margin-right: 20px

            .manga-cover-image
                border-radius: 20px
                width: 100%

        .manga-text
            align-self: start

            .manga-description
                color: #fff
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black
                margin-bottom: 10px

            .manga-volumes
                color: #fff
                font: 3rem 'DharmaGothicE-ExBold', sans-serif
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black
                margin: 0
                margin-bottom: 10px

.streaming-links
    position: relative
    margin: 10px auto
    background: #0008
    border-radius: 20px
    padding: 20px
    max-width: 800px
    color: #fff
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    gap: 10px

    .streaming-links-headline
        grid-column: 1 / -1
        font: 4rem 'DharmaGothicC-HeavyItalic', sans-serif
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black
        text-align: center
        margin: 0
        margin-bottom: 20px

    .streaming-service-title
        font: 2rem 'DharmaGothicE-ExBold', sans-serif
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black
        margin: 0
        margin-bottom: 10px

    a
        color: #fff
        text-decoration: underline

.manga-completion
    margin: 10px auto
    background: #0008
    border-radius: 20px
    padding: 20px
    max-width: 800px
    display: flex
    flex-direction: column
    align-items: center

    .manga-status
        margin-bottom: 10px
        border: 3px solid #fff
        border-radius: 10px
        width: 300px
        font: inherit
        background: #0008
        color: #fff
        padding: 5px 10px
        cursor: pointer
        transition: background 0.3s ease-in-out

        &:hover
            background: #fff
            color: #000



    .manga-progress
        color: #fff

        span
            font: 2rem 'DharmaGothicE-ExBold'
            text-align: center
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black

        .manga-progress-modifier
            display: flex
            justify-content: center

            input
                appearance: textfield
                text-align: center
                width: 50px
                font-size: 2rem
                font-family: 'DharmaGothicE-ExBold', sans-serif
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black
                border: 3px solid #fff
                border-radius: 10px
                background: #0008
                color: #fff
                transition: background 0.3s ease-in-out

                &:hover
                    background: #fff
                    color: #000
                    text-shadow: none

            input[type='number']
                -moz-appearance:textfield

            input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
                -webkit-appearance: none

            .manga-progress-btn-container
                display: inline-block
                margin-left: 10px

                button
                    appearance: none
                    font: inherit
                    padding: 5px 10px
                    border: 3px solid #fff
                    border-radius: 10px
                    cursor: pointer
                    background: #0008
                    color: #fff
                    transition: background 0.3s ease-in-out

                    &:hover
                        background: #fff
                        color: #000

                .btn-increase
                    border-right: none
                    border-bottom-right-radius: 0px
                    border-top-right-radius: 0px

                .btn-decrease
                    border-left: none
                    border-bottom-left-radius: 0px
                    border-top-left-radius: 0px

    .manga-completion-save
        margin-top: 10px
        border: 3px solid #fff
        border-radius: 10px
        background: #0008
        color: #fff
        font: inherit
        padding: 5px 10px
        cursor: pointer
        transition: background 0.3s ease-in-out

        &:hover
            background: #fff
            color: #000

        &:disabled
            filter: brightness(0.5)
            cursor: not-allowed

.manga-completion-wip
    height: 500px
    background: #0008 url('~/assets/img/wip.png') no-repeat center center
    background-size: cover

    p
        font: 3rem 'DharmaGothicE-ExBold', sans-serif
        color: #fff
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 3px black
        text-align: center
        margin: 0
        margin-top: 20px
</style>
