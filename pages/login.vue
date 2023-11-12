<template>
  <div>
    <a href="https://anilist.co/api/v2/oauth/authorize?client_id=15237&response_type=token">Login with AniList</a>
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  const router = useRouter();
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const access_token = hashParams.get('access_token');

  if (access_token) {
    document.cookie = `access_token=${access_token}; path=/; Secure; SameSite=Lax;`;
    router.push('/');
  }
});
</script>

