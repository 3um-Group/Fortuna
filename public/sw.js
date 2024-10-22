importScripts('https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js'); 

const cacheName = 'app-cache';
const assetsToCache = [
  '/',                            
  '/index.html',                  
  '/static/js/bundle.js',        
  '/favicon.ico'                  
];

localforage.config({
  driver: localforage.INDEXEDDB,   
  name: 'myApp',
  version: 1.0,
  storeName: 'dynamicData',        
  description: 'LocalForage cache for API responses'
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);  
    })
  );
  self.skipWaiting();  
});

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

          if (event.request.url.includes('/api/')) {
            networkResponse.clone().json().then((data) => {
              localforage.setItem(event.request.url, data); 
            });
          }

          return networkResponse;
        });

        return cachedResponse || fetchPromise;
      });
    }).catch(() => {
      return localforage.getItem(event.request.url).then((data) => {
        if (data) {
          return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response('No data available', {
            status: 404,
            statusText: 'Not Found'
          });
        }
      });
    })
  );
});
