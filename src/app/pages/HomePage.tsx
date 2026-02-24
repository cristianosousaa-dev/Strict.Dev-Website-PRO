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
          title: "Criação de Sites e Lojas Online em Portugal | Strict.Dev",
          description:
            "Sites profissionais otimizados para SEO técnico, ecommerce e implementação de IA para PMEs e negócios locais. Orçamento gratuito em 24h.",
          keywords:
            "criação de sites portugal, lojas online, e-commerce portugal, implementação ia, agentes ia, sites para empresas, criar site profissional, consultoria digital portugal, web design portugal",
        }
      : {
          title: "Website Creation & Online Stores in Portugal | Strict.Dev",
          description:
            "Professional SEO-optimized websites, online stores and AI implementation for SMEs in Portugal. Free quote in 24h.",
          keywords:
            "website creation portugal, online stores, e-commerce portugal, ai implementation, ai agents, professional website, websites for business, digital consultancy portugal, web design portugal",
        };
  }, [language]);

  const faqItems = useMemo(() => getHomepageFAQ(language), [language]);

  const structuredData = useMemo(() => {
    const orgId = "https://strict-dev.com/#org";

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
            addressLocality: "Ponte de Lima",
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
