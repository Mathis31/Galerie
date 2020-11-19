/*self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('cacheGalerie').then((cache) => {
			return cache.addAll([ '/index.html', '/style.css', '/index.js' ]);
		})
	);
});*/

self.addEventListener('fetch', (e) => {
	console.log('[Service Worker] Ressource récupérée ' + e.request.url);
	if (e.request.url === 'https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json') {
		e.respondWith(
			fetch(e.request).then(async (response) => {
				return response.json().then((json) => {
					const jsonFormatted = json.map((j) => ({
						url: j.url,
						description: j.description,
						updated: j.updated,
						author: j.author
					}));
					return new Response(JSON.stringify(jsonFormatted));
				});
			})
		);
	}
	e.respondWith(
		caches.open(cacheGalerie).then((cache) => cache.match(e.request, { ignoreSearch: true })).then((response) => {
			return response || fetch(e.request);
		})
	);
});
