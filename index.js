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
			cache.addAll([
                '/', 
                '/index.html', 
                '/style.css', 
                '/index.js',  
                'https://code.jquery.com/jquery-3.5.1.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js',
                'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                '/images/icons/72x72.png',
                '/images/icons/96x96.png',
                '/images/icons/128x128.png',
                '/images/icons/144x144.png',
                '/images/icons/152x152.png',
                '/images/icons/192x192.png',
                '/images/icons/384x384.png',
                '/images/icons/500x500.png',

            ]);
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
                var store = localforage.createInstance({
                    name: 'cardDb'
                });
                store.setItem('cards', datas);
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
