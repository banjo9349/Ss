Kitchen Recipe & Stock — Yield update v8

Upload to the root of the existing GitHub Pages repository:
1. Rename Kitchen_Recipe_Stock_Yield_Waste_v8.html to index.html before uploading/replacing the existing index.html.
2. Replace the existing sw.js with the supplied sw.js.
3. README is documentation only and is optional.
4. Commit both index.html and sw.js to the main branch.

Yield changes:
- Yield usable weight / purchased weight is calculated immediately from purchase weight and usable weight, without requiring trim weight.
- Trim weight is optional when usable weight is provided.
- Effective cost per gram and portion use usable weight when entered; otherwise they use trim weight.
- Save requires purchase price, purchase weight, and at least one of trim weight or usable weight.

Safety:
- Back up app data from the app before updating.
- Do not clear browser/site storage; recipe and stock data may be stored locally.
- The file passed JavaScript syntax validation, but has not been fully tested in a real Android browser. Test with a backup first.
