import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../../contexts/ThemeContext';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = '/og-image.png',
  noindex = false
}) => {
  const { language } = useTheme();
  const siteUrl = 'https://strict-dev.com';
  
  // Canonical dinâmico com idioma
  const getCanonicalUrl = () => {
    const basePath = canonical || '';
    if (language === 'en') {
      return `${siteUrl}${basePath}${basePath.includes('?') ? '&' : '?'}lang=en`;
    }
    return `${siteUrl}${basePath}${basePath.includes('?') ? '&' : '?'}lang=pt`;
  };

  const canonicalUrl = getCanonicalUrl();
  
  // URLs para hreflang
  const basePath = canonical || '';
  const hreflangPT = `${siteUrl}${basePath}${basePath.includes('?') ? '&' : '?'}lang=pt`;
  const hreflangEN = `${siteUrl}${basePath}${basePath.includes('?') ? '&' : '?'}lang=en`;
  const hreflangDefault = `${siteUrl}${basePath}`;

  // Locale dinâmico
  const locale = language === 'en' ? 'en_GB' : 'pt_PT';
  const localeAlternate = language === 'en' ? 'pt_PT' : 'en_GB';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL dinâmico */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang para multi-idioma */}
      <link rel="alternate" hreflang="pt-PT" href={hreflangPT} />
      <link rel="alternate" hreflang="en-GB" href={hreflangEN} />
      <link rel="alternate" hreflang="x-default" href={hreflangDefault} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Strict.Dev" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={localeAlternate} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Additional SEO */}
      <meta name="author" content="Strict.Dev" />
    </Helmet>
  );
};

export default SEOHead;
