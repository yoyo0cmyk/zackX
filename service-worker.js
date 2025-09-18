const CACHE_NAME = 'cyber-cafe-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.svg',
  '/register-sw.js',
  '/background-timer.js',
  '/daily-report-saver.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});