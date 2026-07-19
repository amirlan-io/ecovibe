// Build-time prerender: generates a static dist/<route>/index.html for each
// non-home route with correct <title>/meta description/og:*/twitter:*/canonical.
// The React app itself stays fully client-side rendered (CSR) — this script
// only rewrites the static <head> that is served on the very first request,
// so bots/crawlers/link previews that don't execute JS see per-page metadata
// instead of the homepage's.
//
// Runs after `vite build` (see package.json "build" script). Plain Node ESM,
// no extra dependencies.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const routeMetaPath = path.join(
  rootDir,
  "src",
  "app",
  "utils",
  "routeMeta.json",
);

const SITE_URL = "https://www.ecovibe.kz";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
  );
}

function replaceMetaContent(html, attr, key, value) {
  const regex = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`,
    "i",
  );
  if (!regex.test(html)) {
    throw new Error(`prerender: could not find <meta ${attr}="${key}"> tag`);
  }
  return html.replace(regex, (_match, pre, post) => `${pre}${escapeHtml(value)}${post}`);
}

function replaceCanonical(html, href) {
  const regex = /(<link\s+rel="canonical"\s+href=")[^"]*(")/i;
  if (!regex.test(html)) {
    throw new Error(`prerender: could not find <link rel="canonical"> tag`);
  }
  return html.replace(regex, (_match, pre, post) => `${pre}${escapeHtml(href)}${post}`);
}

function main() {
  const template = readFileSync(templatePath, "utf-8");
  const routes = JSON.parse(readFileSync(routeMetaPath, "utf-8"));

  for (const route of routes) {
    if (route.path === "/") continue; // dist/index.html is already correct

    const canonicalUrl = `${SITE_URL}${route.path}`;

    let html = template;
    html = replaceTitle(html, route.title);
    html = replaceMetaContent(html, "name", "description", route.description);
    html = replaceMetaContent(html, "property", "og:title", route.title);
    html = replaceMetaContent(html, "property", "og:description", route.description);
    html = replaceMetaContent(html, "property", "og:url", canonicalUrl);
    html = replaceMetaContent(html, "name", "twitter:title", route.title);
    html = replaceMetaContent(html, "name", "twitter:description", route.description);
    html = replaceCanonical(html, canonicalUrl);

    const outDir = path.join(distDir, route.path.replace(/^\//, ""));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

    console.log(`prerender: wrote ${path.relative(rootDir, path.join(outDir, "index.html"))}`);
  }
}

main();
