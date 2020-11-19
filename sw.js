let cacheGalerieVersion = "v0.1";
var cacheName = 'cacheGalerie';

var files = [
    '/',
    'https://compassionate-lichterman-736604.netlify.app/',
    '/index.html', 
    '/style.css', 
    '/index.js',  
    'https://code.jquery.com/jquery-3.5.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js',
    'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    '/images/icons/72x72.png',
    '/images/icons/96x96.png',
    '/images/icons/128x128.png',
    '/images/icons/144x144.png',
    '/images/icons/152x152.png',
    '/images/icons/192x192.png',
    '/images/icons/384x384.png',
    '/images/icons/500x500.png',
];

// Listen to installation event
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(files);
    })
  );
});

self.addEventListener('fetch', (e) => {

    if(navigator.onLine){

        console.log('[Service Worker] Ressource récupérée ' + e.request.url);

        fetch(e.request).then( (response) => { 
            caches.open(cacheName)
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

            caches.open(cacheName)
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