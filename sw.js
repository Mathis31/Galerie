self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Ressource récupérée ' + e.request.url);
    if(e.request.url === "https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json"){
        e.respondWith(
            // Ici je crée une réponse à partir
            // de rien qui contient uniquement
            // "Hello Toto"
            new Response(
              new Blob(
                ["Hello Toto"],
                {type : "text/html"}
              ),
              {
                status: 200,
                statusText: "OK",
                headers: {
                  "Content-Type": "text/html",
                }
              }
            )
          );
    }
});