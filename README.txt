Kitchen Recipe & Stock — replacement files
Contents:
- index.html: app page with Yield & Waste Control, recipe total weights, backup/restore for yield records.
- sw.js: service worker cache version v7 with user-confirmed activation.

Deployment on GitHub Pages (Android):
1. Download and unzip the package.
2. In repository banjo9349/Ss, open index.html and replace its contents with the provided index.html, then commit.
3. Replace sw.js with the provided sw.js and commit.
4. Do not delete old files first; replace each file at the same path.
5. Open the GitHub Pages app online and accept the update prompt. Check recipe and stock data are still present before relying on it.
6. Export a backup before deployment. The new backup format includes Yield & Waste records and remains compatible with existing recipes/stock fields.

Checks performed: JavaScript syntax check passed; HTML duplicate-ID check passed; cost calculations checked against example (500 baht / 800 g = 0.625 baht/g; 500 baht / 600 g = 0.8333 baht/g; clearing cooked weight falls back to post-trim weight).
Limit: these are static/smoke checks in this environment, not a full live Android browser test. Keep your current backup and do not clear site data.
