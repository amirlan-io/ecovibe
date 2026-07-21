// GA4 + Yandex Metrika (with Webvisor) loader and event tracking.
//
// IMPORTANT: the IDs below are placeholders. Replace them with the real
// GA4 Measurement ID (format "G-XXXXXXXXXX") and Yandex Metrika counter
// number before deploying — until then, initAnalytics() intentionally
// no-ops so nothing tries to load a non-existent property/counter.
export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
export const YANDEX_METRIKA_ID = 0;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

function isGa4Configured() {
  return /^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID) && !GA4_MEASUREMENT_ID.includes("X");
}

function isYandexConfigured() {
  return YANDEX_METRIKA_ID > 0;
}

function loadScript(src: string, async = true) {
  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
  return script;
}

function initGa4() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`);
}

function initYandexMetrika() {
  const script = document.createElement("script");
  script.textContent = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(${YANDEX_METRIKA_ID}, "init", { webvisor: true, clickmap: true, trackLinks: true, accurateTrackBounce: true });
  `;
  document.head.appendChild(script);
}

let initialized = false;

/** Вызывается один раз при старте приложения (см. src/app/Root.tsx). */
export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  if (isGa4Configured()) initGa4();
  if (isYandexConfigured()) initYandexMetrika();
}

export type AnalyticsGoal =
  | "form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "calculator_used";

/** Единая точка для целей GA4 + Яндекс.Метрики. */
export function trackGoal(goal: AnalyticsGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", goal, params);
  if (isYandexConfigured()) {
    window.ym?.(YANDEX_METRIKA_ID, "reachGoal", goal, params);
  }
}
