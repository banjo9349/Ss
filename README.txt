Kitchen Recipe & Stock — Complete PWA package

Files:
- index.html: main app (recipe scaling, main stock, quick stock check, field color settings, OCR/image import, backup/restore, Firebase sync)
- manifest.webmanifest: installable PWA metadata
- sw.js: service worker cache, versioned to refresh the complete app
- icon-192.png and icon-512.png: app icons

Usage:
1. For PWA installation and service-worker updates, host these files together on HTTPS. Opening index.html directly also works for many basic functions, but browser security rules can limit PWA features.
2. Recipe and stock data are stored in the browser's localStorage. Use Settings > Backup to export a JSON backup regularly.
3. OCR via Tesseract and AI reading require internet access. The AI API key is stored in browser localStorage in this client-only version; do not treat that as secure storage or share a copy containing a key.
4. Firebase sync remains optional and uses the existing configuration flow. Configure restrictive Firebase security rules before using it with real data.
5. Row dragging is supported where the browser permits native drag-and-drop. Up/down controls are included as a touch-friendly fallback.

Validation performed: JavaScript syntax checked with Node.js. Real-device Android testing is still recommended for camera selection, OCR, drag interactions, local storage, and PWA installation.
