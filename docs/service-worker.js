const c = "lap-timer-v1", r = [
  "/index.html",
  "/timer.html",
  "/icon512.png",
  "/icon192.png",
  "/maskable_icon.png"
];
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install"), e.waitUntil((async () => {
    const t = await caches.open(c);
    console.log("[Service Worker] Caching all: app shell and content"), await t.addAll(r);
  })());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const t = await caches.match(e.request);
    if (console.log(`[Service Worker] Fetching resource: ${e.request.url}`), t)
      return t;
    const n = await fetch(e.request), a = await caches.open(c);
    return console.log(`[Service Worker] Caching new resource: ${e.request.url}`), a.put(e.request, n.clone()), n;
  })());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((t) => Promise.all(t.map((n) => {
    if (n !== c)
      return caches.delete(n);
  }))));
});
