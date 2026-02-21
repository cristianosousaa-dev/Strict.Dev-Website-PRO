import { useState } from "react";
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

  const faqItems = getHomepageFAQ(language);

  const seo = language === "pt"
    ? {
        title: "Strict.Dev — Criação de Sites, IA e RGPD | Portugal",
        description: "Criação de sites profissionais, chatbot com IA e consultoria RGPD para PMEs em Portugal. Agência digital em Lisboa, Porto, Braga. Proposta gratuita em 24h.",
        keywords: "criação de sites portugal, desenvolvimento web, agência digital, chatbot ia, loja online, rgpd, web design lisboa, web design porto, criar site profissional, sites para empresas, consultoria digital portugal",
      }
    : {
        title: "Strict.Dev — Website Creation, AI & GDPR | Portugal",
        description: "Professional website creation, AI chatbot and GDPR consultancy for SMEs in Portugal. Digital agency in Lisbon, Porto, Braga. Free proposal in 24h.",
        keywords: "website creation portugal, web development, digital agency, ai chatbot, online store, gdpr, web design lisbon, web design porto, professional website, websites for business, digital consultancy portugal",
      };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Strict.Dev",
    "url": "https://strict-dev.com",
    "logo": "https://strict-dev.com/logo.png",
    "description": seo.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@strict-dev.com",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/strict-dev"
    ]
  };

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical="/"
        ogType="website"
        structuredData={organizationSchema}
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
        <FAQSection items={faqItems} language={language} />
      </div>
    </>
  );
}