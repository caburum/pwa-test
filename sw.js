const cacheVer = 'v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
	caches.open(cacheVer).then((cache) => {
	  return cache.addAll([
		'/index.html',
		'/script.js',
		'/style.css',
		'/404.html'
	  ]);
	})
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
	caches.match(event.request).then((response) => {
		return response // Return from the cache
		||
		fetch(event.request).then((response) => { // Fetch it from the internet and add it to the cache
		  return caches.open(cacheVer).then((cache) => {
			cache.put(event.request, response.clone());
			return response;
		  });
		}).catch(() => { // 404 if the page does not exist in the cache
		  return caches.match('/404.html');
		});
	})
  );
});