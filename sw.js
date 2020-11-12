self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée ' + e.request.url);
    if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){
        e.respondWith(
            caches.match(e.request).catch(async function() {
                return fetch(e.request).then(res => {return [{"url":"https://via.placeholder.com/500x280.png",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"}]});
            })
        );
    }
});