if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
        console.log("votre service worker a été enregistré!");
    })
    .catch((error) => {
        console.error(error);
    });
} else {
    console.warn("Service workers are not supported.");
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
    card.append(divBody);

    let p = document.createElement('p');
    p.className += "card-text p-3";
    p.textContent = element.description;
    card.append(p);

    div.append(card);

    return div;

}



window.addEventListener("DOMContentLoaded", (event) => {
    fetch("https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json")
    .then(res => {return res.json()})
    .then(datas =>
    {
        var container = document.getElementById('container');
        datas.forEach(element => {
            let div = createCard(element);
            container.append(div);
        });
    });
});