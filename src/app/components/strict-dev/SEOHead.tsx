// src/components/strict-dev/SEOHead.tsx
import { useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string; // pode ser path "/x" ou absoluto
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

const BASE_URL = "https://strict-dev.com";

function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function setMeta(attr: string, attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;

  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeById(id: string) {
  const el = document.getElementById(id);
  if (el?.parentNode) el.parentNode.removeChild(el);
}

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogType = "website",
  ogImage = "/og-image.png",
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  const { language } = useTheme();

  useEffect(() => {
    const currentPath = `${window.location.pathname}${window.location.search}`;
    const pathOrUrl = canonical ?? currentPath;

    const fullCanonical = isAbsoluteUrl(pathOrUrl) ? pathOrUrl : `${BASE_URL}${pathOrUrl}`;
    const fullOgImage = isAbsoluteUrl(ogImage) ? ogImage : `${BASE_URL}${ogImage}`;

    const locale = language === "pt" ? "pt_PT" : "en_GB";
    const altLocale = language === "pt" ? "en_GB" : "pt_PT";

    const ptUrl = new URL(fullCanonical);
    ptUrl.searchParams.delete("lang");

    const enUrl = new URL(fullCanonical);
    enUrl.searchParams.set("lang", "en");

    document.title = title;
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en-GB";

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    setLink("canonical", fullCanonical);

    setLink("alternate", ptUrl.toString(), "pt-PT");
    setLink("alternate", enUrl.toString(), "en-GB");
    setLink("alternate", ptUrl.toString(), "x-default");

    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", fullCanonical);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", fullOgImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:site_name", "Strict.Dev");
    setMeta("property", "og:locale", locale);
    setMeta("property", "og:locale:alternate", altLocale);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:url", fullCanonical);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullOgImage);
    setMeta("name", "twitter:image:alt", title);

    const id = "seo-head-jsonld";
    if (structuredData) {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      removeById(id);
    }
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, structuredData, language]);

  return null;
}
