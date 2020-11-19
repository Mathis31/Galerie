self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('cacheGalerie').then((cache) => {
			return cache.addAll([ '/index.html', '/style.css', '/index.js' ]);
		})
	);
});

self.addEventListener('fetch', (e) => {
	console.log('[Service Worker] Ressource récupérée ' + e.request.url);
	if (navigator.onLine) {
		if (e.request.url === 'https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json') {
			e.respondWith(
				fetch(e.request).then(async (response) => {
                    caches.open('cacheGalerie').then((cache) => {
                        return cache.add(response);
                    });
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
		} else {
			fetch(e.request).then((response) => {
				caches.open('cacheGalerie').then((cache) => {
                    return cache.add(response);
                });
			});
		}
	} else {
		e.respondWith(
			caches.open('cacheGalerie').then((cache) => cache.match(e.request)).then(function(response) {
				return response || fetch(e.request);
			})
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
