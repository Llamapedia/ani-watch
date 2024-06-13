import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const access_token = Cookies.get('access_token');

        if (!access_token && to.path !== '/login' && to.path !== '/') {
            console.error('No access token found, redirecting to login page');
            return navigateTo('/login');
        } else if (!access_token && to.path === '/login' && to.path === '/login') {
            console.error('No access token found, but already on login page or home page');
            return;
        }

        const isAuthenticated = await checkAuthenticationWithDowntime(access_token);
        if (!isAuthenticated) {
            Cookies.remove('access_token');
            if (to.path === '/') {
                console.error('User is not authenticated, but trying to access home page');
                return;
            } else {
                console.error('User is not authenticated, redirecting to login page');
                return navigateTo('/login');
            }
        } else if (to.path === '/login') {
            console.error('User is authenticated, redirecting to home page');
            return navigateTo('/');
        }
    }
});

async function checkAuthenticationWithDowntime(access_token: string | undefined) {
    if (!access_token) return false;

    const lastAuthCheckTime = localStorage.getItem('lastAuthCheckTime');
    const currentTime = new Date().getTime();

    if (lastAuthCheckTime && currentTime - parseInt(lastAuthCheckTime) < 60000) {
        console.log('Using cached authentication check');
        return true;
    }

    const isAuthenticated = await checkAuthentication(access_token);

    if (isAuthenticated) {
        localStorage.setItem('lastAuthCheckTime', currentTime.toString());
    }

    return isAuthenticated;
}

async function checkAuthentication(access_token: string | undefined) {
    if (!access_token) return false;

    try {
        const query = `
            query {
                Viewer {
                    name
                }
            }
        `;

        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({ query }),
        });

        return response.status === 200;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false;
    }
}