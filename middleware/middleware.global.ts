export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        if (to.path === '/login') {
            return;
        }
        
        const cookies = document.cookie.split('; ');
        const access_token_cookie = cookies.find(cookie => cookie.startsWith('access_token'));
        const access_token = access_token_cookie ? access_token_cookie.split('=')[1] : '';

        if (!access_token && to.path !== '/login') {
            return navigateTo('/login');
        } else if (access_token && to.path === '/login') {
            return;
        }

        const query = `
            query {
                Viewer {
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
            return;
        } else {
            return navigateTo('/login');
        }
    }
});