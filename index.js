if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
        console.log("Votre service worker a été enregistré!");
    })
    .catch((error) => {
        console.error(error);
    });
} else {
    console.warn("Service workers are not supported.");
}

if('cache' in window){
    caches.open('cacheGalerie')
    .then( (cache) =>{ 
        cache.addAll(['/index.html', '/style.css', '/index.js']);
    })
    .catch((err)=>{console.log(err)}); 
}

window.addEventListener('offline', (event) => {
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "visible";
});

window.addEventListener('onLine', (event) => {
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "hidden";
});

console.log(navigator.onLine);

if(navigator.onLine){
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "hidden";
}else{
    let divOffline = document.getElementById("divOffline");
    divOffline.style.visibility = "visible";
}

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

window.addEventListener("DOMContentLoaded", function() {
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
});