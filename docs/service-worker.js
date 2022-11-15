const c = "lap-timer-v1";
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install"), e.waitUntil((async () => {
    await caches.open(c), console.log("[Service Worker] Caching all: app shell and content");
  })());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (console.log(`[Service Worker] Fetching resource: ${e.request.url}`), r)
      return r;
    const t = await fetch(e.request), n = await caches.open(c);
    return console.log(`[Service Worker] Caching new resource: ${e.request.url}`), n.put(e.request, t.clone()), t;
  })());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((r) => Promise.all(r.map((t) => {
    if (t !== c)
      return caches.delete(t);
  }))));
});
