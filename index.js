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

    new Event('parseJson', {'element' : element});
    console.log('titi');
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