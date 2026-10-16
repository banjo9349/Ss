
const CACHE = "recipe-app-v6";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

// ติดตั้งไฟล์ใหม่ แต่รอให้ผู้ใช้ยืนยันก่อนเปิดใช้
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(FILES.map(file =>
        cache.add(file).catch(() => {})
      ))
    )
  );
});

// รับคำสั่งจากปุ่มอัปเดตในแอป
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// เปิดใช้เวอร์ชันใหม่ และลบเฉพาะแคชเก่าของแอปนี้
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key =>
          key.startsWith("recipe-app-") && key !== CACHE
        ).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ขอหน้า HTML จากเครือข่ายก่อน เพื่อให้พบเวอร์ชันล่าสุด
// ส่วนไฟล์อื่นยังใช้แคชได้เมื่อออฟไลน์
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin
  ) return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true })
      .then(cached => {
        const network = fetch(request)
          .then(response => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(CACHE)
                .then(cache => cache.put(request, copy))
                .catch(() => {});
            }
            return response;
          })
          .catch(() =>
            cached ||
            (request.mode === "navigate"
              ? caches.match("./index.html")
              : undefined)
          );

        return request.mode === "navigate"
          ? network.then(response => response || cached)
          : (cached || network);
      })
  );
});
