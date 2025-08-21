/**
 * Service Worker for Hardware Study Guide
 * Provides caching and offline functionality
 */

const CACHE_NAME = 'hardware-study-guide-v1';
const STATIC_CACHE_NAME = 'hardware-study-guide-static-v1';

// Files to cache immediately (critical resources)
const STATIC_ASSETS = [
  './',
  './index.html',
  './vite.svg',
  // CSS and JS files will be added dynamically
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets (CSS, JS, images)
  CACHE_FIRST: 'cache-first',
  // Network first for HTML and API calls
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for frequently updated content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Determine cache strategy based on request type
  let strategy = CACHE_STRATEGIES.NETWORK_FIRST;
  
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image') {
    strategy = CACHE_STRATEGIES.CACHE_FIRST;
  } else if (request.destination === 'document') {
    strategy = CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  event.respondWith(handleRequest(request, strategy));
});

// Handle requests based on cache strategy
async function handleRequest(request, strategy) {
  const cache = await caches.open(CACHE_NAME);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cache);
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cache);
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cache);
    
    default:
      return fetch(request);
  }
}

// Cache first strategy - good for static assets
async function cacheFirst(request, cache) {
  try {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy - good for HTML and dynamic content
async function networkFirst(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate - good for frequently updated content
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch from network in background
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, but we might have cache
    return null;
  });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return networkPromise || new Response('Offline', { status: 503 });
}