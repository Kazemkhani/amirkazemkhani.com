// Service Worker version for cache management
const CACHE_VERSION = 'v1';
const CACHE_NAME = `amirkazemkhani-cache-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/index.css',
  '/assets/index.js',
  '/assets/logo.png',
  '/assets/og-image.jpg'
];

// API routes to cache with network-first strategy
const API_ROUTES = [
  '/api/skills',
  '/api/projects',
  '/api/timeline'
];

// Install event - caching static assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Claim any clients immediately
  return self.clients.claim();
});

// Fetch event - network first for API, cache first for assets
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Handle API requests with network-first strategy
  if (API_ROUTES.some(route => event.request.url.includes(route))) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Handle navigation requests with network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Use cache-first strategy for static assets
  event.respondWith(cacheFirstStrategy(event.request));
});

// Cache-first strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache valid responses
    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback for images
    if (request.destination === 'image') {
      return caches.match('/images/fallback.png');
    }
    
    // Network is down, we got nothing
    throw error;
  }
}

// Network-first strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache a copy of the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // For navigation requests, return the offline page
    if (request.mode === 'navigate') {
      const cache = await caches.open(CACHE_NAME);
      return cache.match('/offline.html') || new Response('You are offline and we could not fetch the page you requested.', {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // We didn't find anything in cache and network is down
    throw error;
  }
}

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Function to sync contact form data
async function syncContactForm() {
  try {
    const cache = await caches.open('form-data');
    const requests = await cache.keys();
    
    const formSubmissions = await Promise.all(
      requests.map(async (request) => {
        const response = await cache.match(request);
        const formData = await response.json();
        
        // Try to submit the form
        const serverResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (serverResponse.ok) {
          // If successful, remove from cache
          return cache.delete(request);
        }
        
        throw new Error('Form submission failed');
      })
    );
    
    return Promise.all(formSubmissions);
  } catch (error) {
    console.error('Background sync failed:', error);
    throw error;
  }
}