self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée ' + e.request.url);
});

function eventHandler(e) {
    log('The time is: ' + e.element);
}