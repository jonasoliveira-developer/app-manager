const CACHE_NAME = 'fisioadmin-cache-v2'; // 🔄 Versão atualizada do cache
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  OFFLINE_URL,
];

// Instala o service worker e pré-cacheia os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // ⚡ Ativa imediatamente
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🧹 Remove caches antigos
          }
        })
      )
    )
  );
  self.clients.claim(); // 🧠 Assume controle das páginas abertas
});

// Intercepta requisições e responde com cache ou rede
self.addEventListener('fetch', event => {
  const { request } = event;

  // Navegação (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // ✅ Atualiza o cache com nova versão da página
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Demais arquivos (CSS, JS, imagens, etc.)
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request).then(networkResponse => {
        // ✅ Atualiza o cache com nova versão do recurso
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          request.method === 'GET'
        ) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return networkResponse;
      });

      // Retorna cache imediatamente, atualiza em segundo plano
      return cachedResponse || fetchPromise;
    })
  );
});