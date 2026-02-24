import { useMemo, useState } from "react";
import { Hero } from "../components/strict-dev/Hero";
import { Services } from "../components/strict-dev/Services";
import { TechStack } from "../components/strict-dev/TechStack";
import { Compliance } from "../components/strict-dev/Compliance";
import { WhyUs } from "../components/strict-dev/WhyUs";
import { ProjectConfigurator } from "../components/strict-dev/ProjectConfigurator";
import { CTA } from "../components/strict-dev/CTA";
import { Contact } from "../components/strict-dev/Contact";
import SEOHead from "../components/strict-dev/SEOHead";
import { useTheme } from "../../contexts/ThemeContext";
import { FAQSection } from "../components/strict-dev/FAQSection";
import { getHomepageFAQ } from "../../data/faqData";
import { SectionDivider } from "../components/strict-dev/SectionDivider";

export function HomePage() {
  const [showAnimation, setShowAnimation] = useState(false);
  const { language } = useTheme();

  const seo = useMemo(() => {
    return language === "pt"
      ? {
          title: "Criação de Sites, Lojas Online e IA — Strict.Dev | Portugal",
          description:
            "Sites profissionais e otimizados para SEO, e-commerce e implementação de IA para PMEs e negócios locais em Portugal. Orçamento gratuito em 24h.",
          keywords:
            "criação de sites portugal, lojas online, e-commerce portugal, implementação ia, agentes ia, sites para empresas, criar site profissional, consultoria digital portugal, web design portugal",
        }
      : {
          title: "Strict.Dev — Website Creation, Online Stores & AI | Portugal",
          description:
            "Professional SEO-optimized websites, online stores and AI implementation for SMEs in Portugal. Free quote in 24h.",
          keywords:
            "website creation portugal, online stores, e-commerce portugal, ai implementation, ai agents, professional website, websites for business, digital consultancy portugal, web design portugal",
        };
  }, [language]);

  const faqItems = useMemo(() => getHomepageFAQ(language), [language]);

  const structuredData = useMemo(() => {
    const orgId = "https://strict-dev.com/#org";
    const businessId = "https://strict-dev.com/#business";

    const faqSchema =
      Array.isArray(faqItems) && faqItems.length
        ? {
            "@type": "FAQPage",
            "@id": "https://strict-dev.com/#faq",
            mainEntity: faqItems
              .filter((x: any) => x?.question && x?.answer)
              .map((x: any) => ({
                "@type": "Question",
                name: x.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: x.answer,
                },
              })),
          }
        : null;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": orgId,
          name: "Strict.Dev",
          url: "https://strict-dev.com",
          logo: "https://strict-dev.com/logo.png",
          description: seo.description,
          email: "info@strict-dev.com",
          telephone: "+351910205459",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Viana do Castelo",
            addressRegion: "Viana do Castelo",
            addressCountry: "PT",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "info@strict-dev.com",
            telephone: "+351910205459",
            contactType: "customer service",
            availableLanguage: ["pt-PT", "en-GB"],
          },
          sameAs: ["https://www.linkedin.com/company/strict-dev"],
        },
        {
          "@type": "ProfessionalService",
          "@id": businessId,
          name: "Strict.Dev",
          url: "https://strict-dev.com",
          provider: { "@id": orgId },
          logo: "https://strict-dev.com/logo.png",
          image: "https://strict-dev.com/og-image.png",
          description: seo.description,
          telephone: "+351910205459",
          email: "info@strict-dev.com",
          priceRange: "€€",
          currenciesAccepted: "EUR",
          paymentAccepted: ["BankTransfer", "CreditCard"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Viana do Castelo",
            addressRegion: "Viana do Castelo",
            addressCountry: "PT",
          },
          areaServed: [
            { "@type": "Country", name: "Portugal" },
            { "@type": "City", name: "Viana do Castelo" },
            { "@type": "City", name: "Braga" },
            { "@type": "City", name: "Porto" },
            { "@type": "City", name: "Lisboa" },
            { "@type": "City", name: "Coimbra" },
            { "@type": "City", name: "Aveiro" },
          ],
          serviceType: [
            "Web Development",
            "Website Creation",
            "AI Chatbot Development",
            "E-commerce Development",
            "GDPR Consultancy",
            "Technical Maintenance",
            "Cloud Infrastructure",
          ],
          knowsLanguage: ["pt-PT", "en-GB"],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: language === "pt" ? "Serviços Digitais" : "Digital Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name:
                    language === "pt"
                      ? "Criação de Sites Profissionais"
                      : "Professional Website Creation",
                  url: "https://strict-dev.com/servicos/desenvolvimento-web",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: language === "pt" ? "Agentes de Inteligência Artificial" : "AI Agents",
                  url: "https://strict-dev.com/servicos/agentes-ia",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: language === "pt" ? "Loja Online" : "E-commerce",
                  url: "https://strict-dev.com/servicos/loja-online",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: language === "pt" ? "Consultoria RGPD" : "GDPR Consultancy",
                  url: "https://strict-dev.com/servicos/rgpd-dados",
                },
              },
            ],
          },
          sameAs: [
            "https://www.linkedin.com/company/strict-dev",
            "https://maps.app.goo.gl/S1GFdxo2qikU1nxZA",
          ],
        },
        ...(faqSchema ? [faqSchema] : []),
      ],
    };
  }, [seo.description, language, faqItems]);

  const canonical = language === "pt" ? "/" : "/?lang=en";

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={canonical}
        ogType="website"
        structuredData={structuredData}
      />
      <Hero 
        onShowAnimation={() => setShowAnimation(true)}
        shouldHideCore={showAnimation}
        showAnimation={showAnimation}
        onCloseAnimation={() => setShowAnimation(false)}
      />
      <SectionDivider />
      <Services />
      <TechStack />
      <SectionDivider />
      <Compliance />
      <SectionDivider />
      <WhyUs />
      <SectionDivider />
      <ProjectConfigurator />
      <CTA />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <div id="faq">
        <FAQSection items={faqItems} language={language} includeSchema={false} />
      </div>
    </>
  );
}
