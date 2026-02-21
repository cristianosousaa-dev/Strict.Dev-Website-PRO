import { useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

const BASE_URL = 'https://strict-dev.com';

/** Helper: upsert a <meta> tag by attribute selector */
function setMeta(attr: string, attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Helper: upsert a <link> tag by rel + hreflang */
function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = '/og-image.png',
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  const { language } = useTheme();

  useEffect(() => {
    const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
    const locale = language === 'pt' ? 'pt_PT' : 'en_GB';
    const altLocale = language === 'pt' ? 'en_GB' : 'pt_PT';
    const path = canonical || '/';
    const ptUrl = `${BASE_URL}${path}`;
    const enUrl = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}lang=en`;

    // Title
    document.title = title;

    // HTML lang
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en-GB';

    // Primary meta
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Canonical
    setLink('canonical', fullCanonical);

    // Hreflang
    setLink('alternate', ptUrl, 'pt-PT');
    setLink('alternate', enUrl, 'en-GB');
    setLink('alternate', ptUrl, 'x-default');

    // Open Graph
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', fullOgImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:site_name', 'Strict.Dev');
    setMeta('property', 'og:locale', locale);
    setMeta('property', 'og:locale:alternate', altLocale);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', fullCanonical);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullOgImage);
    setMeta('name', 'twitter:image:alt', title);

    // Structured Data
    if (structuredData) {
      const id = 'seo-head-jsonld';
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, structuredData, language]);

  return null;
}
