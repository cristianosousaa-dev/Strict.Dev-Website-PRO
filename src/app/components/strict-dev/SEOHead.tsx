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
    ? "Strict.Dev — Web Development & Artificial Intelligence | Website Creation & AI Bots | GDPR"
    : "Strict.Dev — Desenvolvimento Web & Inteligência Artificial | Criação de Sites / IA Bots | RGPD";
  
  const defaultDescription = language === 'en'
    ? "Professional website creation and AI chatbots. Online stores, GDPR compliance, and business automation for companies in Portugal. Free quote in 24h. ☎ +351 910 205 459"
    : "Criação de sites profissionais e chatbots com IA. Lojas online, conformidade RGPD e automação empresarial para PMEs em Portugal. Orçamento gratuito em 24h. ☎ 910 205 459";
  
  const defaultKeywords = language === 'en'
    ? [
        // Tier 1: Local Businesses
        "website creation Ponte de Lima",
        "web design Portugal",
        "online store creation",
        "professional websites",
        "responsive web design",
        "website maintenance Portugal",
        // Tier 2: SMEs
        "AI chatbot Portugal",
        "AI implementation for companies",
        "GDPR consulting Portugal",
        "business automation AI",
        "customer service chatbot",
        "AI automation Portugal",
        "cookie consent GDPR",
        "GDPR website compliance",
        // Local + National
        "web development Portugal",
        "web development Northern Portugal",
        "AI Portugal",
        "web agency Ponte de Lima",
        // Technical
        "technical SEO",
        "React development",
        "web performance optimization",
      ]
    : [
        // Tier 1: Negócios Locais
        "criação de sites Ponte de Lima",
        "criação de sites profissionais",
        "web design Portugal",
        "desenvolvimento web Viana do Castelo",
        "criação de loja online",
        "loja online Portugal",
        "website para empresas",
        "manutenção de websites",
        "sites responsivos Portugal",
        "agência web Ponte de Lima",
        // Tier 2: PMEs
        "chatbot com IA",
        "implementação de IA para empresas",
        "consultoria RGPD Portugal",
        "automação empresarial IA",
        "chatbot atendimento ao cliente",
        "automação de atendimento com IA",
        "banner de cookies RGPD",
        "adequação website RGPD",
        "conformidade RGPD websites",
        // Local + Nacional
        "desenvolvimento web Portugal",
        "desenvolvimento web Norte de Portugal",
        "IA Portugal",
        "agência digital Minho",
        // Técnicas
        "SEO técnico",
        "desenvolvimento React",
        "otimização performance web",
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
    "image": finalImage,
    "foundingDate": "2020",
    "description": finalDescription,
    "slogan": "Desenvolvimento Web de Alta Performance & Conformidade Legal Europeia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ponte de Lima",
      "addressRegion": "Viana do Castelo",
      "addressCountry": "PT"
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
      "name": "Portugal"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'en' ? "Web Development" : "Desenvolvimento Web",
          "description": language === 'en' 
            ? "High-performance web platforms with optimized technical SEO" 
            : "Plataformas web de alta performance com SEO técnico otimizado"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'en' ? "AI Agents" : "Agentes de IA",
          "description": language === 'en'
            ? "Chatbots and automation via LLMs for business efficiency"
            : "Chatbots e automação via LLMs para eficiência empresarial"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'en' ? "GDPR & Data Protection" : "RGPD & Proteção de Dados",
          "description": language === 'en'
            ? "Consent systems and legal data retention according to GDPR"
            : "Sistemas de consentimento e retenção legal conforme RGPD"
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
    "telephone": "+351 910 205 459",
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
            "name": language === 'en' ? "Professional Website Creation" : "Criação de Sites Profissionais",
            "description": language === 'en' 
              ? "Responsive websites and online stores for local businesses with technical SEO"
              : "Sites responsivos e lojas online para negócios locais com SEO técnico"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'en' ? "AI Chatbot & Automation" : "Chatbot com IA e Automação",
            "description": language === 'en'
              ? "Intelligent chatbots for customer service and business process automation"
              : "Chatbots inteligentes para atendimento ao cliente e automação de processos empresariais"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'en' ? "GDPR Website Compliance" : "Conformidade RGPD em Websites",
            "description": language === 'en'
              ? "Cookie consent banners, privacy policies, and GDPR-compliant data management"
              : "Banners de consentimento de cookies, políticas de privacidade e gestão de dados conforme RGPD"
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
    "image": finalImage,
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
    "telephone": "+351 910 205 459",
    "email": "info@strict-dev.com",
    "priceRange": "€€-€€€€",
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
    ]
  };

  // WebSite Schema for Search
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Strict.Dev",
    "url": url,
    "description": finalDescription,
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
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Serviços",
        "item": `${url}/#services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contacto",
        "item": `${url}/#contact`
      }
    ]
  };

  // FAQ Schema - Focused on Local Businesses & SMEs
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": language === 'en' ? [
      {
        "@type": "Question",
        "name": "How much does it cost to create a professional website in Ponte de Lima?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional website creation starts at €1,200, including responsive design, technical SEO, and GDPR compliance. Free quote within 24 hours. Contact us at +351 910 205 459."
        }
      },
      {
        "@type": "Question",
        "name": "Can I have an online store to sell my products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We develop complete online stores with secure payments, stock management, and social media integration. Ideal for local businesses wanting to sell online in Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "Does Strict.Dev maintain my website after it's ready?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer monthly maintenance plans including security updates, automatic backups, and priority technical support for businesses in Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "How to implement an AI chatbot on my website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We create intelligent chatbots that automatically respond to customers 24/7, reducing customer service costs by up to 60%. Integration with WhatsApp, email, and social networks."
        }
      },
      {
        "@type": "Question",
        "name": "Does my website need to be GDPR compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All websites that collect data (forms, cookies, analytics) must have a consent banner, privacy policy, and GDPR-compliant data management system."
        }
      },
      {
        "@type": "Question",
        "name": "How long does AI implementation take in my company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI automation projects (chatbots, data analysis, processes) take 4-8 weeks from initial consultation to complete deployment in Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "Does Strict.Dev work with companies outside Ponte de Lima?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We serve clients throughout Portugal (Porto, Lisbon, Braga, Aveiro). Remote meetings via Zoom and on-site visits when necessary."
        }
      }
    ] : [
      {
        "@type": "Question",
        "name": "Quanto custa criar um site profissional em Ponte de Lima?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Criação de sites profissionais desde €399, incluindo design responsivo, SEO técnico e conformidade RGPD. Orçamento gratuito em 24h. Contacte-nos: 910 205 459."
        }
      },
      {
        "@type": "Question",
        "name": "Posso ter uma loja online para vender os meus produtos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Desenvolvemos lojas online completas com pagamentos seguros, gestão de stock e integração com redes sociais. Ideais para negócios locais que querem vender online em Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "A Strict.Dev faz a manutenção do meu site depois de pronto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, oferecemos planos de manutenção mensal incluindo atualizações de segurança, backups automáticos e suporte técnico prioritário para empresas em Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "Como implementar um chatbot com IA no meu website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Criamos chatbots inteligentes que respondem automaticamente a clientes 24/7, reduzindo custos de atendimento em até 60%. Integração com WhatsApp, email e redes sociais."
        }
      },
      {
        "@type": "Question",
        "name": "O meu website precisa estar conforme ao RGPD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Todos os websites que recolhem dados (formulários, cookies, analytics) devem ter banner de consentimento, política de privacidade e sistema de gestão de dados conforme RGPD."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo demora a implementação de IA na minha empresa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Projetos de automação com IA (chatbots, análise de dados, processos) demoram 1-4 semanas desde consultoria inicial até deployment completo em Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "A Strict.Dev trabalha com empresas fora de Ponte de Lima?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Servimos clientes em todo Portugal (Porto, Lisboa, Braga, Aveiro). Reuniões remotas via Zoom e deslocações quando necessário."
        }
      }
    ]
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
      <meta property="og:image:alt" content="Strict.Dev - Desenvolvimento Web & IA para Negócios" />
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

      {/* Structured Data - FAQ */}
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
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
