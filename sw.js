self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('cacheGalerie')
        .then(cache => {
            return cache.addAll(['/index.html', '/style.css', '/index.js']);
        })
    ); 
});

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée ' + e.request.url);
    if(navigator.onLine){
        e.waitUntil(
            caches.open('cacheGalerie')
            .then(cache => {
                if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){
                    e.respondWith(
                        fetch(e.request).then(async (response) => {
                            cache.add(response);
                            return response.json().then((json) => {
                                const jsonFormatted = json.map((j) => ({
                                    url: j.url,
                                    description: j.description,
                                    updated: j.updated,
                                    author: j.author
                                }))
                                return new Response(JSON.stringify(jsonFormatted));
                            })
                        })
                    )
                }
                else{
                    fetch(e.request).then( (response) => {
                        return cache.add(response);
                    });
                }
            })
        ); 
    }else{
        e.respondWith(
            caches.open('nom_du_cache')
            .then( (cache) => cache.match(e.request))
            .then(function (response) { return response || fetch(e.request); })
        ); 
    }
    /*if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){
        e.respondWith(
            fetch(e.request).then(async (response) => {
                return response.json().then((json) => {
                    const jsonFormatted = json.map((j) => ({
                        url: j.url,
                        description: j.description,
                        updated: j.updated,
                        author: j.author
                    }))
                    return new Response(JSON.stringify(jsonFormatted));
                })
            })
        )
    }*/
});