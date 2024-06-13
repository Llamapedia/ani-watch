<template>
  <div
    class="container"
    v-if="searchResults.length > 0 && searchResults[0] !== 0"
  >
    <div class="search-title">
      <span class="search-title-tag">Search Results for</span><br />
      <span class="search-title-name">{{ searchTerm }}</span>
    </div>
    <div class="search-item-amount">
      <label for="perPage">Items per page: </label>
      <select id="perPage" v-model="perPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
    <div class="card-results">
      <div class="card" v-for="result in searchResults" :key="result.id">
        <div class="card-img">
          <img
            v-if="result.type === 'ANIME'"
            :src="result.coverImage.large"
            class="card-img-top"
            alt="..."
            @click="navigateTo(`/anime/${result.idMal}`)"
          />
          <img
            v-else-if="result.type === 'MANGA'"
            :src="result.coverImage.large"
            class="card-img-top"
            alt="..."
            @click="navigateTo(`/manga/${result.idMal}`)"
          />
        </div>
        <div class="card-body">
          <p class="card-title">
            <nuxt-link
              v-if="result.type === 'ANIME'"
              :to="`/anime/${result.idMal}`"
              target=""
              rel="noopener noreferrer"
              >{{ result.title.english }}</nuxt-link
            >
            <nuxt-link
              v-else-if="result.type === 'MANGA'"
              :to="`/manga/${result.idMal}`"
              target=""
              rel="noopener noreferrer"
              >{{
                result.title.english
                  ? result.title.english
                  : result.title.romaji
                  ? result.title.romaji
                  : result.title.native
                  ? result.title.native
                  : ""
              }}</nuxt-link
            >
          </p>
          <div class="card-info">
            <span class="card-type">{{ result.type }}</span>
            <span class="card-episodes" v-if="result.episodes">
              | {{ result.episodes }}
              {{ result.episodes > 1 ? "Episodes" : "Episode" }}</span
            >
            <span class="card-episodes" v-else-if="result.volumes">
              | {{ result.volumes }}
              {{ result.volumes > 1 ? "Volumes" : "Volume" }}</span
            >
          </div>
          <p class="card-text" v-html="sanitizeHTML(result.description)"></p>
        </div>
      </div>
    </div>
    <div class="search-pagination">
      <button
        class="search-pagination-button"
        @click="prevPage"
        :disabled="currentPage <= 1"
      >
        Previous
      </button>
      <button
        class="search-pagination-button"
        @click="nextPage"
        :disabled="currentPage >= totalPages"
      >
        Next
      </button>
    </div>
  </div>
  <div class="container" v-else-if="searchResults.length === 0">
    <div class="search-title">
      <span class="search-title-tag">No Results found for</span><br />
      <span class="search-title-name">{{ searchTerm }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "~/assets/style/search.sass";

import DOMPurify from "dompurify";

const searchResults = ref([0]);
const currentPage = ref(1);
const totalPages = ref(0);
const perPage = ref(10);

const route = useRoute();
const router = useRouter();

const searchTerm = useRoute().params.query.toString();

onMounted(async () => {
  if (!route.query.page) {
    await router.push({ query: { ...route.query, page: 1 } });
  }
  currentPage.value = Number(route.query.page) || 1;
  await searchAniList(searchTerm, currentPage.value, perPage.value);
});

watch(route, async (newRoute, oldRoute) => {
  if (newRoute.query.page !== oldRoute.query.page) {
    currentPage.value = Number(newRoute.query.page) || 1;
    await searchAniList(searchTerm, currentPage.value, perPage.value);
  }
});

watch(perPage, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    currentPage.value = 1;
    await searchAniList(searchTerm, currentPage.value, perPage.value);
  }
});

watch(currentPage, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await router.push({ query: { ...route.query, page: newVal } });
    window.scrollTo(0, 0);
  }
});

async function searchAniList(
  searchTerm: string,
  page: number,
  perPage: number
) {
  const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
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
        volumes
        type
      }
    }
  }
  `;

  const variables = {
    search: searchTerm,
    page: page,
    perPage: perPage,
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
  searchResults.value = data.data.Page.media;
  totalPages.value = data.data.Page.pageInfo.lastPage;
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    searchAniList(searchTerm, currentPage.value, perPage.value);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    searchAniList(searchTerm, currentPage.value, perPage.value);
  }
}

async function aniListToMal(anilistId: number, type: "anime" | "manga") {
  const query = `
  query ($id: Int, $type: MediaType) {
    Media (id: $id, type: $type) {
      id
      idMal
    }
  }
  `;

  const variables = {
    id: anilistId,
    type: type.toUpperCase(),
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
  return data.data.Media.idMal;
}

function sanitizeHTML(rawHTML: string) {
  if (!rawHTML) return "";

  // Step 1: Extract and store HTML tags
  const tagMatches = [...rawHTML.matchAll(/<[^>]+>/gm)];
  const tags = tagMatches.map((match) => ({
    tag: match[0],
    index: match.index,
  }));

  // Step 2: Remove HTML tags for length check
  const textOnly = rawHTML.replace(/<[^>]+>/gm, "");

  // Step 3: Truncate text content if necessary
  const truncatedText =
    textOnly.length > 512
      ? textOnly.substring(0, 512) + "<br><b>...</b>"
      : textOnly;

  // Step 4: Reinsert HTML tags into the truncated text
  let finalText = truncatedText;
  tags.forEach((tag) => {
    if (tag.index < 512) {
      // Only reinsert tags that were in the first 512 characters
      const insertionPoint =
        tag.index <= finalText.length ? tag.index : finalText.length;
      finalText =
        finalText.slice(0, insertionPoint) +
        tag.tag +
        finalText.slice(insertionPoint);
    }
  });

  // Step 5: Sanitize and return
  return DOMPurify.sanitize(finalText);
}
</script>
