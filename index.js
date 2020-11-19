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

const DB_NAME = 'cardDb';
const DB_VERSION = 1; 
 const DB_STORE_NAME = 'cards';

function openDb() {
	console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'id', autoIncrement: true }
        );

      store.createIndex('url', 'url', { unique: true });
      store.createIndex('description', 'description', { unique: false });
      store.createIndex('author', 'author', { unique: false });
      store.createIndex('updated', 'updated', { unique: false });
      store.createIndex('created', 'created', { unique: false });
    };
}

function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function getAll(){
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    console.log(store.getAll());
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


// Create database

if ('indexedDB' in window) {
    openDb();
    getAll();
} else {
	console.log('API not supported');
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
	}
});
