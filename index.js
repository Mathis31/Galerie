// Set service worker

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((reg) => {
			console.log('Votre service worker a été enregistré!');
		})
		.catch((error) => {
			console.error(error);
		});
} else {
	console.warn('Service workers are not supported.');
}

// For cache

if ('cache' in window) {
	caches
		.open('cacheGalerie')
		.then((cache) => {
			cache.addAll([ '/', '/index.html', '/style.css', '/index.js' ]);
		})
		.catch((err) => {
			console.log(err);
		});
}

// Set badge if offline or not

window.addEventListener('offline', (event) => {
	let divOffline = document.getElementById('divOffline');
	divOffline.style.visibility = 'visible';
});

window.addEventListener('online', (event) => {
	let divOffline = document.getElementById('divOffline');
	divOffline.style.visibility = 'hidden';
});

if (navigator.onLine) {
	let divOffline = document.getElementById('divOffline');
	divOffline.style.visibility = 'hidden';
} else {
	let divOffline = document.getElementById('divOffline');
	divOffline.style.visibility = 'visible';
}

if('indexedDB'in window){
    var store = localforage.createInstance({
        name: 'cardDb'
    });
    store.setItem('cards',
        [
            {
                "url":"https://via.placeholder.com/500x280.png",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            },
            {
                "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            },
            {
                "url":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            },
            {
                "url":"https://bibliotheques.csdm.qc.ca/files/2018/11/10_banques_dimages_gratuites_libres_de_droits-300x169.jpg",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            },
            {
                "url":"https://wp-fr.oberlo.com/wp-content/uploads/sites/4/2019/09/banque-images.jpg",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            },
            {
                "url":"https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg",
                "description":"Photo",
                "author":"Anonyme",
                "updated":"2020-10-10",
                "created":"2020-10-10"
            }
        ]
    );
}else{
    console.log('API not supported');
}

// Create card element for images, description, author, updated...

function createCard(element) {
	let div = document.createElement('div');
	div.className += 'col-12 col-sm-6 col-lg-4 col-xl-3';

	let card = document.createElement('div');
	card.className += 'card mb-4';

	let img = document.createElement('img');
	img.setAttribute('src', element.url);
	img.setAttribute('width', '500');
	img.setAttribute('height', '280');
	img.className += 'card-img-top';
	img.setAttribute('alt', 'placeholder');
	card.append(img);

	let divBody = document.createElement('div');
	divBody.className += 'card-body';

	let spanAuthor = document.createElement('span');
	spanAuthor.textContent = 'Author : ' + element.author;

	divBody.append(spanAuthor);

	let updated = document.createElement('p');
	updated.textContent = 'Last modified : ' + element.updated;

	divBody.append(updated);

	let description = document.createElement('p');
	description.className += 'card-text';
	description.textContent = 'Description : ' + element.description;

	divBody.append(description);

	card.append(divBody);

	div.append(card);

	return div;
}

// Fetch images

window.addEventListener('DOMContentLoaded', function() {
	if (navigator.onLine) {
		fetch('https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json')
			.then((res) => res.json())
			.then((datas) => {
				var container = document.getElementById('container');
				datas.forEach((element) => {
					let div = createCard(element);
					container.append(div);
				});
			});
	}else{
        localforage.getItem('cards').then(function(cards) {
            console.log(cards);
        });
    }
});
