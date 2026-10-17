/* Kitchen Recipe & Stock — Service Worker v7
   Network-first for app HTML, cache-first for static assets.
   New worker waits until the app user confirms the update in index.html.
*/
const CACHE = "recipe-app-v7";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(FILES.map(async path => {
      try { await cache.add(path); } catch (e) { /* optional asset may not exist yet */ }
    }));
  })());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith("recipe-app-") && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  if (req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/")) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(req, { cache: "no-store" });
        if (response && response.ok) {
          cache.put("./index.html", response.clone()).catch(() => {});
          return response;
        }
      } catch (e) { /* offline fallback below */ }
      return (await cache.match(req)) || (await cache.match("./index.html")) || Response.error();
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const response = await fetch(req);
      if (response && response.ok) cache.put(req, response.clone()).catch(() => {});
      return response;
    } catch (e) {
      return Response.error();
    }
  })());
});
