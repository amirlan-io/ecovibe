import { useEffect } from "react";

const SITE_URL = "https://www.ecovibe.kz";
const DEFAULT_TITLE = "Клининг Услуги в Астане | Профессиональная Уборка | EcoVibe.kz";
const DEFAULT_DESCRIPTION =
  "Профессиональные услуги клининга в Астане от EcoVibe.kz. 🧹 Уборка квартир, офисов и домов. Наш социальный проект: поддерживаем инклюзивность и предоставляем рабочие места для глухонемых и слабослышащих специалистов. Идеальная чистота с заботой о людях!";

type DocumentMetaOptions = {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/generalnaya-uborka". Use "/" for the homepage. */
  path: string;
};

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets document.title, meta description, OG/Twitter tags, and the canonical
 * link for the current route. Restores the site defaults on unmount so
 * client-side navigation back to "/" doesn't leak another page's metadata.
 */
export function useDocumentMeta({ title, description, path }: DocumentMetaOptions) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setCanonical(canonicalUrl);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag("name", "description", DEFAULT_DESCRIPTION);
      setMetaTag("property", "og:title", DEFAULT_TITLE);
      setMetaTag("property", "og:description", DEFAULT_DESCRIPTION);
      setMetaTag("property", "og:url", `${SITE_URL}/`);
      setMetaTag("name", "twitter:title", DEFAULT_TITLE);
      setMetaTag("name", "twitter:description", DEFAULT_DESCRIPTION);
      setCanonical(`${SITE_URL}/`);
    };
  }, [title, description, path]);
}
