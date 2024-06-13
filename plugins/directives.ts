export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("lazy-load", {
        mounted(el) {
            function loadImage() {
                el.src = el.dataset.src;
            }
      
            function handleIntersect(entries, observer) {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.unobserve(el);
                }
                });
            }
      
            const observer = new IntersectionObserver(handleIntersect, {
                root: null,
                threshold: 0.01,
            });
      
            observer.observe(el);
            
            onUnmounted(() => {
                observer.disconnect();
            });
        },
    });
});