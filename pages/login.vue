<template>
  <div>
    <a href="https://anilist.co/api/v2/oauth/authorize?client_id=15237&response_type=token">Login with AniList</a>
  </div>
</template>

<script lang="ts" setup>
import Cookies from 'js-cookie';

onMounted(() => {
  const router = useRouter();
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const access_token = hashParams.get('access_token');
  const expires_in = Number(hashParams.get('expires_in'));

  if (access_token) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expires_in);  
    const expires = `expires=${date.toUTCString()}`;

    Cookies.set('access_token', access_token, {
      expires: date,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    window.location.href = '/';
  }
});
</script>

