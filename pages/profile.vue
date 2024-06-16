<template>
  <div v-if="user" class="user-profile">
    <div class="user-profile-info">
      <div class="user-profile-banner">
        <img :src="user.bannerImage" alt="" class="user-profile-banner-image" />
      </div>
      <div class="user-profile-title">
        <img
          :src="user.avatar.large"
          alt="Avatar"
          class="user-profile-title-avatar"
        />
        <p class="user-profile-title-text">{{ user.name }}</p>
        <p class="user-profile-title-joined">Joined {{ formattedCreatedAt }}</p>
      </div>
      <div class="user-about" v-html="sanitize(user.about)"></div>
      <Reader v-if="user.name === 'BotiusPrime'" />
      <div class="user-profile-statistics">
        <p class="user-profile-statistics-title">Statistics</p>
        <div class="user-profile-statistics-element">
          <p class="user-profile-statistics-element-title">Anime</p>
          <p>{{ user.statistics.anime.count }} Titles</p>
          <p class="user-profile-statistics-time">
            <template v-if="timeWatched.years > 0">
              <span>{{ timeWatched.years }} Years </span>
            </template>
            <template v-if="timeWatched.weeks > 0">
              <span>{{ timeWatched.weeks }} Weeks </span>
            </template>
            <template v-if="timeWatched.days > 0">
              <span>{{ timeWatched.days }} Days </span>
            </template>
            <template v-if="timeWatched.hours > 0">
              <span>{{ timeWatched.hours }} Hours </span>
            </template>
            <template v-if="timeWatched.minutes > 0">
              <span>{{ timeWatched.minutes }} Minutes </span>
            </template>
          </p>
          <p>{{ user.statistics.anime.episodesWatched }} Episodes Watched</p>
        </div>
        <div class="user-profile-statistics-element">
          <p class="user-profile-statistics-element-title">Manga</p>
          <p>{{ user.statistics.manga.count }} Titles</p>
          <p>{{ user.statistics.manga.chaptersRead }} Chapters Read</p>
          <p>{{ user.statistics.manga.volumesRead }} Volumes Read</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cookies from "js-cookie";
import { ref, onBeforeMount, computed } from "vue";
import DOMPurify from "dompurify";

const user = ref();

onBeforeMount(() => {
  getUserData();
});

const getUserData = async () => {
  const access_token = Cookies.get("access_token");

  const query = `
            query {
                Viewer {
                    id
                    name
                    about(asHtml: true)
                    bannerImage
                    avatar {
                        large
                    }
                    statistics {
                        anime {
                            count
                            minutesWatched
                            episodesWatched
                        }
                        manga {
                            count
                            chaptersRead
                            volumesRead
                        }
                    }
                    createdAt
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
};

const convertMinutes = (totalMinutes) => {
  const minutesInYear = 525600; // 60 * 24 * 365
  const minutesInWeek = 10080; // 60 * 24 * 7
  const minutesInDay = 1440; // 60 * 24
  const minutesInHour = 60;

  const years = Math.floor(totalMinutes / minutesInYear);
  totalMinutes %= minutesInYear;
  const weeks = Math.floor(totalMinutes / minutesInWeek);
  totalMinutes %= minutesInWeek;
  const days = Math.floor(totalMinutes / minutesInDay);
  totalMinutes %= minutesInDay;
  const hours = Math.floor(totalMinutes / minutesInHour);
  const minutes = totalMinutes % minutesInHour;

  return { years, weeks, days, hours, minutes };
};

const timeWatched = computed(() =>
  user.value
    ? convertMinutes(user.value.statistics.anime.minutesWatched)
    : { years: 0, weeks: 0, days: 0, hours: 0, minutes: 0 }
);

const formattedCreatedAt = computed(() => {
  if (!user.value) return "";
  const date = new Date(user.value.createdAt * 1000);
  return date.toLocaleDateString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const sanitize = (html: string) => {
  return DOMPurify.sanitize(html);
};
</script>

<style lang="sass" scoped>
*
    color: #fff
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

.user-profile
    position: relative

    .user-profile-info
        max-width: 1000px
        background: #0008
        margin: 0 auto
        margin-bottom: 20px
        border-radius: 20px
        position: relative

        .user-profile-banner
            position: relative
            max-width: 1000px
            margin: 10px auto
            margin-bottom: 0

            .user-profile-banner-image
                position: inherit
                top: 0
                left: 0
                width: 100%
                border-top-left-radius: 20px
                border-top-right-radius: 20px

        .user-profile-title
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            margin-top: -50px

            .user-profile-title-avatar
                width: 100px
                height: 100px
                border-radius: 50%
                z-index: 1

            .user-profile-title-text
                font-family: "DharmaGothicC-HeavyItalic", sans-serif
                font-size: 5rem
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 5px black
                margin: 0
                margin-top: 10px
                line-height: 0.7

            .user-profile-title-joined
                font-family: "DharmaGothicE-ExBold", sans-serif
                font-size: 1.5rem
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 5px black
                margin: 0

        .user-about
            margin: 0
            text-align: center

        .user-profile-statistics
            display: grid
            grid-template-columns: 1fr 1fr
            column-gap: 20px

            .user-profile-statistics-title
                font-family: "DharmaGothicE-ExBold", sans-serif
                font-size: 3rem
                text-align: center
                margin: 0
                grid-column: 1 / -1

            .user-profile-statistics-element
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
                margin: 10px
                border: 2px solid #fff
                border-radius: 20px
                text-align: center
                backdrop-filter: blur(5px)

                .user-profile-statistics-element-title
                    font-family: "DharmaGothicE-ExBold", sans-serif
                    font-size: 2rem
                    margin: 0
                    margin-top: 10px

                p
                    margin: 0
                    margin-top: 5px

                p:last-child
                    margin-bottom: 10px
</style>
