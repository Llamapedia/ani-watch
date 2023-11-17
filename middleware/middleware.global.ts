import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        if (to.path === '/login') {
            return;
        }
        
        const access_token = Cookies.get('access_token');

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