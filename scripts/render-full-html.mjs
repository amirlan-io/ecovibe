// Full-content prerender: after `vite build` + scripts/prerender.mjs have
// produced dist/<route>/index.html with correct per-route <head> tags, this
// script boots a headless Chromium against the built dist/ output, waits for
// each route's React app to finish mounting (including lazy Suspense chunks),
// and writes the resulting #root markup back into the static HTML file.
//
// Why a real browser instead of ReactDOMServer/SSR: the app and its
// dependencies (framer motion, radix, embla) are written for the client only.
// Capturing the DOM after a real client-side render avoids rewriting those
// components for SSR compatibility, so the rendered markup is guaranteed to
// match what users already see — nothing in the UI changes.
//
// The client still hydrates normally on load (see src/main.tsx), so this is
// static content for crawlers, not a replacement for the SPA.

import { chromium as playwrightChromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const routeMetaPath = path.join(rootDir, "src", "app", "utils", "routeMeta.json");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function serveStatic(port) {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(distDir, urlPath);

    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      const indexInDir = path.join(filePath, "index.html");
      filePath = existsSync(indexInDir) ? indexInDir : path.join(distDir, "index.html");
    }

    const ext = path.extname(filePath);
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function targetFileFor(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

async function launchBrowser() {
  // Build servers (Vercel included) run Linux without the shared libs a
  // plain downloaded Chromium needs (libnspr4.so etc.) and without apt/root
  // to install them. @sparticuz/chromium ships a Linux build with those libs
  // bundled in, so use it there. Locally (Windows/macOS dev), fall back to
  // whatever Chromium `npx playwright install chromium` already cached.
  if (process.platform === "linux") {
    const sparticuzChromium = (await import("@sparticuz/chromium")).default;
    return playwrightChromium.launch({
      args: sparticuzChromium.args,
      executablePath: await sparticuzChromium.executablePath(),
      headless: true,
    });
  }
  return playwrightChromium.launch();
}

async function main() {
  const routes = JSON.parse(readFileSync(routeMetaPath, "utf-8")).map((r) => r.path);
  const port = 4173 + Math.floor(Math.random() * 1000);
  const server = await serveStatic(port);
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const routePath of routes) {
      const url = `http://127.0.0.1:${port}${routePath}`;
      await page.goto(url, { waitUntil: "networkidle" });
      // The responsive hero duplicates its copy (one literal <h1>, one
      // role="heading" <p>) and toggles visibility via CSS per breakpoint,
      // so the real <h1> isn't always the visible one — wait for it to
      // exist in the DOM rather than requiring visibility.
      await page.waitForSelector("#root h1", { state: "attached", timeout: 10_000 });

      const rootHtml = await page.evaluate(() => document.getElementById("root").innerHTML);

      const file = targetFileFor(routePath);
      const html = readFileSync(file, "utf-8");
      if (!html.includes('<div id="root"></div>')) {
        throw new Error(`render-full-html: expected empty #root placeholder in ${file}`);
      }
      const updated = html.replace(
        '<div id="root"></div>',
        `<div id="root">${rootHtml}</div>`,
      );
      writeFileSync(file, updated, "utf-8");
      console.log(`render-full-html: wrote content for ${routePath} -> ${path.relative(rootDir, file)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
