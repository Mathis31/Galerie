var container = document.getElementById('container');

const text = [
    `I'm baby intelligentsia hot chicken iPhone, letterpress food truck lomo roof party celiac +1 photo booth yr thundercats affogato. Poke pork belly PBR&B, vape fashion axe hashtag chillwave brooklyn cloud bread marfa cold-pressed adaptogen. Ennui tilde fam, chicharrones irony you probably haven't heard of them raclette poutine. Intelligentsia seitan chicharrones, enamel pin brunch vaporware art party kitsch retro. Vegan sustainable tumeric cronut. Pug aesthetic PBR&B glossier selvage, art party salvia wayfarers. Etsy taiyaki typewriter chicharrones, taxidermy cold-pressed pabst vinyl cronut pok pok 8-bit fam.`,
    `Activated charcoal direct trade palo santo vape everyday carry pork belly mustache kitsch gochujang. Vexillologist shoreditch deep v, keytar ethical seitan sartorial kale chips irony tumeric microdosing brunch. Keffiyeh master cleanse next level, glossier lumbersexual shaman af edison bulb distillery knausgaard vape small batch portland. Cred truffaut vape deep v +1, gastropub hot chicken raw denim helvetica umami offal.`,
    `Dreamcatcher sartorial asymmetrical crucifix wolf godard, coloring book squid freegan affogato lumbersexual franzen. Drinking vinegar vape chillwave pinterest tofu pug hella sartorial neutra cray tumeric. Poke cloud bread XOXO salvia. Glossier jean shorts craft beer gastropub, squid pitchfork humblebrag listicle taiyaki messenger bag retro thundercats subway tile raw denim. Hoodie asymmetrical food truck listicle pour-over.`,
    `Pop-up tote bag twee squid asymmetrical lyft roof party ugh try-hard glossier pabst bicycle rights jean shorts single-origin coffee. IPhone tumblr narwhal, tattooed mumblecore you probably haven't heard of them XOXO authentic art party bicycle rights. Bespoke bitters master cleanse austin authentic lumbersexual mixtape man bun art party tilde swag. Tacos bitters chicharrones thundercats selfies chartreuse chia. Put a bird on it taxidermy cornhole VHS, tousled ennui fam hexagon craft beer marfa DIY pinterest.`,
    `Air plant deep v polaroid church-key. Farm-to-table ramps put a bird on it pickled aesthetic pork belly beard tbh street art pabst. Pop-up cliche before they sold out hoodie heirloom flannel schlitz organic. Crucifix forage cardigan before they sold out umami echo park subway tile art party squid shoreditch photo booth.`,
    `Yr offal cornhole neutra. Cronut kale chips hoodie, mustache tilde tacos palo santo fashion axe whatever pop-up post-ironic pitchfork pok pok ethical. Literally freegan post-ironic wolf listicle synth gochujang tousled palo santo 3 wolf moon health goth next level. Asymmetrical you probably haven't heard of them lomo post-ironic, pitchfork crucifix narwhal retro chia tofu schlitz. Kitsch keytar normcore listicle flexitarian fashion axe chartreuse jianbing yr vice flannel cred.`,
]

function createCard(i){
    
    let div = document.createElement("div");
    div.className += "col-12 col-sm-6 col-lg-4 col-xl-3";

    let card = document.createElement("div");
    card.className += "card mb-4";

    let img = document.createElement("img");
    img.setAttribute("src", "https://via.placeholder.com/500x280.png");
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
    p.textContent = text[i].substring(0,100);
    card.append(p);

    div.append(card);

    return div;

}

for(let i = 0; i<6; i++){
    let div = createCard(i);
    container.append(div);
}