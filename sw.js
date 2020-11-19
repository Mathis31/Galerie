let cacheGalerieVersion = "v0.1";

self.addEventListener('fetch', (e) => {

    if(navigator.onLine){

        console.log('[Service Worker] Ressource récupérée ' + e.request.url);

        fetch(e.request).then( (response) => { 
            caches.open('cacheGalerie')
            .then(cache => {
                return cache.put(e.request,response);
            })
        });

        if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){

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

        }

    }
    
    else{

        e.respondWith(

            caches.open('cacheGalerie')
            .then( (cache) => cache.match(e.request) )
            .then( function(response){
                return response || fetch(e.request);
            })

        );

    }

});

self.addEventListener('activate', function(e){

    let cacheGalerie = [cacheGalerieVersion];

    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key){
                if(cacheGalerie.indexOf(key) === -1){
                    return caches.delete(key);
                }
            }))
        })
    )

})