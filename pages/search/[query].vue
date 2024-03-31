<template>
  <div class="container">
    <div class="row mt-3" v-if="searchResults.length > 0">
      <div class="col-12">
        <h2 class="search-title">Search Results for {{ searchTerm }}</h2>
      </div>
      <div class="col-12 search-item-amount">
        <label for="perPage">Items per page: </label>
        <select id="perPage" v-model="perPage">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-4" v-for="result in searchResults" :key="result.id">
            <div class="card mb-3">
              <div class="card-img">
                <img
                  :src="result.coverImage.large"
                  class="card-img-top"
                  alt="..."
                  @click="navigateTo(`/anime/${result.idMal}`)"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title">
                  <nuxt-link
                    :to="`/anime/${result.idMal}`"
                    target=""
                    rel="noopener noreferrer"
                    >{{ result.title.english }}</nuxt-link
                  >
                </h3>
                <div class="card-info">
                  <span class="card-type">{{ result.type }}</span>
                  <span class="card-episodes" v-if="result.episodes">
                    | {{ result.episodes }} Episodes</span
                  >
                </div>
                <p
                  class="card-text"
                  v-html="sanitizeHTML(result.description)"
                ></p>
              </div>
            </div>
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
  </div>
</template>

<script lang="ts" setup>
import "~/assets/search.sass";

import DOMPurify from "dompurify";

const searchResults = ref([]);
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
  return DOMPurify.sanitize(rawHTML);
}
</script>
