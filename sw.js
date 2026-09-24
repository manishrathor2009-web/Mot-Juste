/* Mot Juste service worker: keeps the app and its fonts available offline. */
const VERSION = 'mj-e1daa4bca5';
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-48.png"];
const FONT_CACHE = 'mj-fonts-v1';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: cache on first use, then serve from cache.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // App files: answer from cache at once, refresh the cache in the background.
  e.respondWith(caches.open(VERSION).then(async c => {
    const key = req.mode === 'navigate' ? 'index.html' : req;
    const hit = await c.match(key, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) c.put(key, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || c.match('index.html') || Response.error();
  }));
});
