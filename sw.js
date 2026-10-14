const CACHE = "recipe-app-v4";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
// แคชทีละไฟล์ ถ้าไฟล์ใดหายก็ไม่ทำให้ติดตั้งล้มทั้งหมด
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// เปิดเร็วจากแคช แล้วอัปเดตไฟล์เบื้องหลัง (เฉพาะไฟล์ของแอพเอง)
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => {
      if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    }).catch(() => hit || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined));
    return hit || net;
  }));
});
