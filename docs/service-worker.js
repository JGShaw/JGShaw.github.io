const n = "lap-timer-v1", a = [
  "src/app.html",
  "src/timer.html",
  "/style.css",
  "/icon512.png",
  "/icon192.png",
  "/maskable_icon.png"
];
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install"), e.waitUntil((async () => {
    const t = await caches.open(n);
    console.log("[Service Worker] Caching all: app shell and content"), await t.addAll(a);
  })());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const t = await caches.match(e.request);
    if (console.log(`[Service Worker] Fetching resource: ${e.request.url}`), t)
      return t;
    const c = await fetch(e.request), s = await caches.open(n);
    return console.log(`[Service Worker] Caching new resource: ${e.request.url}`), s.put(e.request, c.clone()), c;
  })());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((t) => Promise.all(t.map((c) => {
    if (c !== n)
      return caches.delete(c);
  }))));
});
