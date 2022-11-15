const s = "lap-timer-v1", n = [
  "src/app.html",
  "src/timer.html",
  "style.css",
  "static/icon512.png",
  "static/icon192.png",
  "static/maskable_icon.png"
];
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install"), e.waitUntil((async () => {
    const t = await caches.open(s);
    console.log("[Service Worker] Caching all: app shell and content"), await t.addAll(n);
  })());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const t = await caches.match(e.request);
    if (console.log(`[Service Worker] Fetching resource: ${e.request.url}`), t)
      return t;
    const c = await fetch(e.request), a = await caches.open(s);
    return console.log(`[Service Worker] Caching new resource: ${e.request.url}`), a.put(e.request, c.clone()), c;
  })());
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((t) => Promise.all(t.map((c) => {
    if (c !== s)
      return caches.delete(c);
  }))));
});
