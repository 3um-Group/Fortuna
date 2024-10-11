const cacheName = 'app-cache-v2';  
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
  self.skipWaiting();  
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
  self.clients.claim(); 
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
