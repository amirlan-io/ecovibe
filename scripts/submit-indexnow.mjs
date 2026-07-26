// Pings IndexNow (supported by Yandex and Bing — not Google) with every URL
// from public/sitemap.xml, so those engines know to (re)crawl the site
// without waiting for their own discovery schedule.
//
// Run manually after a deploy that changes page content or adds pages:
//   node scripts/submit-indexnow.mjs
//
// Requires the key file at public/<INDEXNOW_KEY>.txt to already be live at
// https://www.ecovibe.kz/<INDEXNOW_KEY>.txt — that's how Yandex/Bing verify
// the submission actually comes from the site owner.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const HOST = "www.ecovibe.kz";
const INDEXNOW_KEY = "7d8913f6abef9538c4878137ba81e28c";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

function extractUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function submitTo(endpoint, urlList) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  return { endpoint, status: res.status, statusText: res.statusText };
}

async function main() {
  const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
  const xml = readFileSync(sitemapPath, "utf-8");
  const urlList = extractUrlsFromSitemap(xml);

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Yandex + Bing)...`);
  urlList.forEach((u) => console.log(" -", u));

  // api.indexnow.org fans out to every participating engine (Yandex, Bing,
  // Seznam, Naver...); also hit Yandex's own endpoint directly as a backup.
  const results = await Promise.all([
    submitTo("https://api.indexnow.org/indexnow", urlList),
    submitTo("https://yandex.com/indexnow", urlList),
  ]);

  for (const r of results) {
    console.log(`${r.endpoint} -> ${r.status} ${r.statusText}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
