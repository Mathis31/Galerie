let cacheGalerieVersion="v0.1";var cacheName="cacheGalerie",files=["/","/index.html","/style.css","/index.js","https://code.jquery.com/jquery-3.5.1.min.js","https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js","https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js","https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css","/images/icons/72x72.png","/images/icons/96x96.png","/images/icons/128x128.png","/images/icons/144x144.png","/images/icons/152x152.png","/images/icons/192x192.png","/images/icons/384x384.png","/images/icons/500x500.png"];self.addEventListener("install",function(e){console.log("[ServiceWorker] Install"),e.waitUntil(caches.open(cacheName).then(function(e){return console.log("[ServiceWorker] Caching app shell"),e.addAll(files)}))}),self.addEventListener("fetch",e=>{navigator.onLine?(console.log("[Service Worker] Ressource récupérée "+e.request.url),fetch(e.request).then(n=>{caches.open(cacheName).then(s=>s.put(e.request,n))}),"https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"===e.request.url&&e.respondWith(fetch(e.request).then(async e=>e.json().then(e=>{const n=e.map(e=>({url:e.url,description:e.description,updated:e.updated,author:e.author}));return new Response(JSON.stringify(n))})))):e.respondWith(caches.open(cacheName).then(n=>n.match(e.request)).then(function(n){return n||fetch(e.request)}))}),self.addEventListener("activate",function(e){let n=[cacheGalerieVersion];e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===n.indexOf(e))return caches.delete(e)}))}))});