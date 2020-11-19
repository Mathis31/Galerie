// Set service worker

if('serviceWorker' in navigator){

    navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
        console.log("Votre service worker a été enregistré!");
    })
    .catch((error) => {
        console.error(error);
    });

} 

else {
    console.warn("Service workers are not supported.");
}

// For cache

if('cache' in window){
    caches.open('cacheGalerie')
    .then( (cache) =>{ 
        cache.addAll(['/', '/index.html', '/style.css', '/index.js']);
    })
    .catch((err)=>{console.log(err)}); 
}


// Set badge if offline or not


window.addEventListener('offline', (event) => {
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "visible";
});

window.addEventListener('online', (event) => {
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "hidden";
});

if(navigator.onLine){
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "hidden";
}else{
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "visible";
}

// Create database

if('indexedDB'in window){

    const dbName = "cardDatabase";

    var request = indexedDB.open(dbName, 2);

    request.onerror = function(event) {
        // Gestion des erreurs.
    };

    request.onupgradeneeded = function(event) {

        var db = event.target.result;

        var objectStore = db.createObjectStore("card", { keyPath: "ssn" });

        objectStore.createIndex("url", "url", { unique: false });

        objectStore.transaction.oncomplete = function(event) {

            var cardObjectStore = db.transaction("cards", "readwrite").objectStore("card");

            for (var i in customerData) {

                cardObjectStore.add(
                    {
                        "url":"https://via.placeholder.com/500x280.png",
                        "description":"Photo",
                        "author":"Anonyme",
                        "updated":"2020-10-10",
                        "created":"2020-10-10"
                    }
                );

            }

        }

        console.log(db);

    };

}else{
    console.log('API not supported');
}

// Create card element for images, description, author, updated...


function createCard(element){

    let div = document.createElement("div");
    div.className += "col-12 col-sm-6 col-lg-4 col-xl-3";

    let card = document.createElement("div");
    card.className += "card mb-4";

    let img = document.createElement("img");
    img.setAttribute("src", element.url);
    img.setAttribute("width", "500");
    img.setAttribute("height", "280");
    img.className += "card-img-top";
    img.setAttribute("alt", "placeholder");
    card.append(img);

    let divBody = document.createElement("div");
    divBody.className += "card-body";

    let spanAuthor = document.createElement('span');
    spanAuthor.textContent = "Author : " + element.author;

    divBody.append(spanAuthor);

    let updated = document.createElement('p');
    updated.textContent = "Last modified : " + element.updated;

    divBody.append(updated);

    let description = document.createElement('p');
    description.className += "card-text";
    description.textContent = "Description : " + element.description;

    divBody.append(description);

    card.append(divBody);

    div.append(card);

    return div;

}


// Fetch images


window.addEventListener("DOMContentLoaded", function() {

    if(navigator.onLine){

        fetch("https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json")
        .then((res) => res.json())
        .then((datas) =>
        {
            var container = document.getElementById('container');
            datas.forEach(element => {
                let div = createCard(element);
                container.append(div);
            });
        });

    }

});