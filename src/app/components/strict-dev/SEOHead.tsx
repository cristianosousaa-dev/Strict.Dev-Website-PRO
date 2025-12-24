import { Helmet } from "react-helmet-async";
import { useTheme } from "../../../contexts/ThemeContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  image = "https://strict-dev.com/og-image.png",
  url = "https://strict-dev.com",
  type = "website",
}: SEOHeadProps) {
  const { language, t } = useTheme();

  // Static version for caching (update when image changes)
  const finalImage = `${image}?v=2024`;

  // Dynamic defaults based on language
  const defaultTitle = language === 'en' 
    ? "Strict.Dev — Web Development & Artificial Intelligence | NIS2 & GDPR"
    : "Strict.Dev — Desenvolvimento Web & Inteligência Artificial | NIS2 & RGPD";
  
  const defaultDescription = language === 'en'
    ? "Premium consultancy in high-performance web development and business automation via AI. Legal compliance guarantee (NIS2/GDPR) for critical infrastructures in Portugal."
    : "Consultoria premium em desenvolvimento web de alta performance e automação empresarial via IA. Garantia de conformidade legal (NIS2/RGPD) para infraestruturas críticas em Portugal.";
  
  const defaultKeywords = language === 'en'
    ? [
        "web development",
        "artificial intelligence",
        "AI Portugal",
        "NIS2 consulting",
        "GDPR compliance",
        "business automation",
        "AI chatbots",
        "AI agents",
        "technical SEO",
        "critical infrastructure",
        "cybersecurity",
        "React development",
        "Next.js Portugal",
      ]
    : [
        "desenvolvimento web",
        "inteligência artificial",
        "IA Portugal",
        "consultoria NIS2",
        "compliance RGPD",
        "automação empresarial",
        "chatbots IA",
        "agentes IA",
        "SEO técnico",
        "infraestrutura crítica",
        "segurança cibernética",
        "desenvolvimento React",
        "Next.js Portugal",
      ];

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  // Organization Schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Strict.Dev",
    "legalName": "Strict.Dev - Consultoria em Desenvolvimento Web e IA",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": "https://strict-dev.com/logo.png",
      "width": 200,
      "height": 70
    },
    "image": image,
    "foundingDate": "2020",
    "description": description,
    "slogan": "Desenvolvimento Web de Alta Performance & Conformidade Legal Europeia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ponte de Lima",
      "addressRegion": "Viana do Castelo",
      "addressCountry": "PT",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Portuguese", "English"],
      "email": "info@strict-dev.com",
      "areaServed": "PT",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    "sameAs": [
      "https://www.linkedin.com/company/strict-dev/"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Portugal",
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desenvolvimento Web",
          "description": "Plataformas web de alta performance com SEO técnico otimizado"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Agentes de IA",
          "description": "Chatbots e automação via LLMs para eficiência empresarial"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consultoria NIS2",
          "description": "Segurança de redes segundo a diretiva europeia NIS2"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "RGPD & Proteção de Dados",
          "description": "Sistemas de consentimento e retenção legal conforme RGPD"
        }
      }
    ]
  };

  // Professional Service Schema
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Strict.Dev",
    "description": finalDescription,
    "url": url,
    "telephone": "+351912345678",
    "email": "info@strict-dev.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ponte de Lima",
      "addressRegion": "Viana do Castelo",
      "postalCode": "4990",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.7694",
      "longitude": "-8.5833"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Portugal"
    },
    "priceRange": "€€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'en' ? "Web Development & AI Services" : "Serviços de Desenvolvimento Web e IA",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'en' ? "Web Development" : "Desenvolvimento Web",
            "description": language === 'en' 
              ? "High-performance web platforms with technical SEO"
              : "Plataformas web de alta performance com SEO técnico"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'en' ? "AI Agents" : "Agentes de IA",
            "description": language === 'en'
              ? "AI chatbots and automation via LLMs"
              : "Chatbots e automação via LLMs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'en' ? "NIS2 Consulting" : "Consultoria NIS2",
            "description": language === 'en'
              ? "Network security compliance according to NIS2 directive"
              : "Conformidade de segurança de redes segundo diretiva NIS2"
          }
        }
      ]
    }
  };

  // LocalBusiness Schema for Portugal
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Strict.Dev",
    "image": image,
    "description": finalDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ponte de Lima",
      "addressLocality": "Ponte de Lima",
      "addressRegion": "Viana do Castelo",
      "postalCode": "4990",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.7694",
      "longitude": "-8.5833"
    },
    "url": url,
    "telephone": "+351-XXX-XXX-XXX",
    "email": "info@strict-dev.com",
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/strict-dev/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "12"
    }
  };

  // WebSite Schema for Search
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Strict.Dev",
    "url": url,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Serviços",
        "item": `${url}/#services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contacto",
        "item": `${url}/#contact`,
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(", ")} />
      <meta name="author" content="Strict.Dev" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Language and Locale - Dynamic based on selected language */}
      <html lang={language === 'en' ? 'en-GB' : 'pt-PT'} />
      <meta httpEquiv="content-language" content={language === 'en' ? 'en-GB' : 'pt-PT'} />

      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Strict.Dev - Desenvolvimento Web & IA com Conformidade NIS2/RGPD" />
      <meta property="og:site_name" content="Strict.Dev" />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      
      {/* Enhanced Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta property="twitter:image:alt" content="Strict.Dev - Consultoria Premium" />
      <meta property="twitter:creator" content="@strictdev" />
      <meta property="twitter:site" content="@strictdev" />

      {/* LinkedIn Specific */}
      <meta property="og:see_also" content="https://www.linkedin.com/company/strict-dev/" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#2f5e50" />
      <meta name="msapplication-TileColor" content="#2f5e50" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Strict.Dev" />
      <meta name="application-name" content="Strict.Dev" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>

      {/* Structured Data - Professional Service */}
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>

      {/* Structured Data - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteData)}
      </script>

      {/* Structured Data - Breadcrumb */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>

      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
}
