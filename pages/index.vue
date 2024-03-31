<template>
  <div v-if="!user" class="index-content">
    <h1 class="index-welcome">Welcome on anime.vg</h1>
    <h2 class="index-login-notification">
      To use anime.vg in any capacity you must sign in using your anilist.co
      account.
    </h2>
    <nuxt-link to="/login">Go to login page.</nuxt-link>
  </div>
  <div v-else class="index-content">
    <h1 class="index-welcome">Welcome back, {{ user.name }}.</h1>
    <div v-if="lists">
      <div class="user-list-selector">
        <h2>Select a list to view:</h2>
        <div class="user-list-selector-items">
          <a
            v-for="list in lists"
            :key="list.name"
            @click="scrollTo(list.name)"
          >
            {{ list.name }}
          </a>
        </div>
        <div class="user-list-compact-switch">
          <label for="compact-view">Compact view</label>
          <input
            type="checkbox"
            name="compact-view"
            id="compact-view"
            v-model="compactView"
          />
        </div>
      </div>
      <div class="user-list-top">
        <button @click="scrollToTop">⬆️</button>
      </div>
      <div
        v-for="list in lists"
        :key="list.name"
        class="user-list"
        :class="compactView ? 'user-list-compact' : ''"
        :id="list.name"
      >
        <h2 class="user-list-title">{{ list.name }}</h2>
        <div
          v-for="entry in list.entries"
          :key="entry.media.id"
          class="user-list-entry"
        >
          <nuxt-link :to="`/anime/${entry.media.idMal}`">
            <div class="user-list-entry-cover">
              <img
                :src="entry.media.coverImage.large"
                alt="Cover Image"
                class="user-list-entry-cover-image"
              />
            </div>

            <div class="user-list-entry-info">
              <h4>{{ entry.media.title.english }}</h4>
              <h5>
                {{ entry.progress }}/{{ entry.media.episodes }} Episodes
                watched.
                <span v-if="entry.score > 0">{{ entry.score }} / 10</span>
              </h5>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>We're sorry, but we couldn't get your lists.</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cookies from "js-cookie";

const user = ref();
const lists = ref();

const compactView = ref(false);

onMounted(() => {
  compactView.value = window.innerWidth < 600;
  getAnimeData();
});

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

async function getAnimeData() {
  await getUserData();
  if (!user.value) return console.log("User not logged in (yet).");
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
                        id
                        media {
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
                            episodes
                            bannerImage
                        }
                    }
                }
            }
        }
    `;

  const variables = {
    userId: user.value.id,
    type: "ANIME",
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
  console.log(data);
  lists.value = data.data.MediaListCollection.lists;
  const order = ["Watching", "Rewatching", "Planning", "Completed"];
  lists.value.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  console.warn(lists.value);
}

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="sass" scoped>
*
    color: #fff
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

.index-content
    margin: 10px auto
    max-width: 800px
    scroll-behavior: smooth

    @media screen and (max-width: 800px)
        margin: 10px 20px

.index-welcome
    font-size: 4em
    line-height: 1.1
    margin: 30px 0
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 0 10px black

    @media screen and (max-width: 800px)
        font-size: 3em

.user-list-selector
    margin: 10px 0
    padding: 10px
    background: #0008
    border-radius: 20px

    .user-list-selector-items
      display: flex
      gap: 10px
      flex-wrap: wrap

    .user-list-compact-switch
      margin-top: 10px
      margin-left: 4px
      display: flex
      align-items: center
      gap: 10px
      user-select: none

      label, input
        cursor: pointer

    h2
        margin: 4px

    a
        font-size: 1.5em
        padding: 5px 10px
        border-radius: 10px
        background: #0008
        color: #fff
        border: 3px solid #fff
        cursor: pointer
        transition: background 0.3s ease-in-out

        &:hover
            background: #fff
            color: #000

.user-list-top
    position: fixed
    bottom: 10px
    right: 10px
    width: fit-content
    z-index: 10

    button
        font-size: 2em
        padding: 5px 10px
        border-radius: 10px
        background: #0008
        color: #fff
        border: 3px solid #fff
        cursor: pointer
        transition: background 0.3s ease-in-out

        &:hover
            background: #fff
            color: #000

.user-list-compact
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important

.user-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-gap: 10px
    margin-bottom: 20px

    .user-list-title
        grid-column: 1 / -1
        margin: 0
        font-size: 2em
        background: #0008
        width: fit-content
        padding: 0 5px
        border-radius: 10px

    .user-list-entry
        grid-column: span 1
        grid-row: span 1
        width: 100%
        height: 100%
        overflow: hidden
        position: relative
        &:hover .user-list-entry-info
            opacity: 1

        .user-list-entry-cover
            width: 100%
            height: 100%
            background: #0008
            display: flex
            justify-content: center
            align-items: center
            border-radius: 10px
            padding: 3px
            box-sizing: border-box

            .user-list-entry-cover-image
                position: relative
                border-radius: 10px
                height: 100%
                object-fit: cover
                width: 100%

        .user-list-entry-info
            position: absolute
            bottom: 0
            left: 0
            opacity: 0
            background: linear-gradient(transparent, #000 80%)
            border-radius: 0 0 10px 10px
            padding: 5px
            box-sizing: border-box
            width: 100%
            transition: opacity 0.3s ease-in-out
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 0 10px black

            h4, h5
                margin: 0 auto
                margin-bottom: 5px
</style>
