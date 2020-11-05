function loadJsonFile(url) {
    return new Promise(function (resolve, reject) {
        $.getJSON(url)
            .done(function (data) {
                resolve(data);
            })
            .fail(function () {
                reject(Error('Impossible d\'ouvrir le fichier ' + url));
            })
        }
    );
}

Promise.all(loadJsonFile("https://compassionate-lichterman-736604.netlify.app/index.json")).then(datas => {
    var container = document.getElementById('container');
    for(let i = 0; i<6; i++){
        let div = createCard(datas);
        container.append(div);
    }
})

function createCard(datas){
    
    let div = document.createElement("div");
    div.className += "col-12 col-sm-6 col-lg-4 col-xl-3";

    let card = document.createElement("div");
    card.className += "card mb-4";

    let img = document.createElement("img");
    img.setAttribute("src", datas.img);
    img.setAttribute("width", "500");
    img.setAttribute("height", "280");
    img.className += "card-img-top img-fluid";
    img.setAttribute("alt", "placeholder");
    card.append(img);

    let divBody = document.createElement("div");
    divBody.className += "card-body";
    card.append(divBody);

    let p = document.createElement('p');
    p.className += "card-text p-3";
    p.textContent = datas.text[i].substring(0,100);
    card.append(p);

    div.append(card);

    return div;

}