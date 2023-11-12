<template>
    <div v-if="!user">
        <h1>Welcome on wwwwwww</h1>
        <h2>To use wwww in any capacity you must sign in using your anilist.co account.</h2>
        <nuxt-link to="/login">Go to login page.</nuxt-link>
    </div>
    <div v-else class="index-content">
        <h1>Welcome back, {{ user.name }}</h1>
        <div v-if="lists">
            <div v-for="list in lists" :key="list.name" class="user-list">
                <h2 class="user-list-title">{{ list.name }}</h2>
                <div v-for="entry in list.entries" :key="entry.media.id" class="user-list-entry">
                    <nuxt-link :to="`/anime/${entry.media.idMal}`">
                        <div class="user-list-entry-cover">
                            <img :src="entry.media.coverImage.large" alt="Cover Image" class="user-list-entry-cover-image">
                        </div>
                    
                        <div class="user-list-entry-info">
                            <h4>{{ entry.media.title.english }}</h4>
                            <h5>
                                {{ entry.progress }}/{{ entry.media.episodes }} Episodes watched.
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
const user = ref();
const lists = ref();

getAnimeData();

async function getUserData() {
    const cookies = document.cookie.split('; ');
    const access_token_cookie = cookies.find(cookie => cookie.startsWith('access_token'));
    const access_token = access_token_cookie ? access_token_cookie.split('=')[1] : '';

    const query = `
            query {
                Viewer {
                    id
                    name
                }
            }
        `;

    const variables = {
    };

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${access_token}`,
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
    const cookies = document.cookie.split('; ');
    const access_token_cookie = cookies.find(cookie => cookie.startsWith('access_token'));
    const access_token = access_token_cookie ? access_token_cookie.split('=')[1] : '';

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
        type: 'ANIME',
    };

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const data = await response.json();
    console.log(data);
    lists.value = data.data.MediaListCollection.lists;
    console.warn(lists.value);
}
</script>

<style lang="sass" scoped>
*
    color: #fff

.index-content
    margin: 10px auto
    max-width: 800px

    @media screen and (max-width: 800px)
        margin: 10px 20px
    

.user-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-gap: 10px

    .user-list-title
        grid-column: 1 / -1

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
