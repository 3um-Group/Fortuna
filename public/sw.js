const cacheName = 'app-cache-v1';  
const assetsToCache = [
  '/',                           
  '/index.html',                
  '/static/js/bundle.js',        
  '/favicon.ico'           
];

// Install event to cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cachedName) => {
          if (!cacheWhitelist.includes(cachedName)) {
            return caches.delete(cachedName);
          }
        })
      );
    })
  );
});

// Fetch event to serve cached files if available, else fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
