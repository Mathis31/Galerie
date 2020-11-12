self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée ' + e.request.url);
    if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){
        e.respondWith(
            fetch(e.request).then((response) => {
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
});