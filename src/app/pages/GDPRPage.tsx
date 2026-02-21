import { motion } from "motion/react";
import { Database, CheckCircle2, ArrowRight, FileText, Shield, Lock, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";
import { getServiceFAQ } from "../../data/faqData";
import { FAQSection } from "../components/strict-dev/FAQSection";
import { RelatedServices } from "../components/strict-dev/RelatedServices";

export function GDPRPage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('gdpr', language);
  const breadcrumbs = getBreadcrumbs('gdpr', language);
  const faqItems = getServiceFAQ('gdpr', language);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === "pt" ? "Conformidade RGPD" : "GDPR Compliance",
    "description": metadata.description,
    "provider": { "@type": "ProfessionalService", "name": "Strict.Dev", "url": "https://strict-dev.com" },
    "areaServed": { "@type": "Country", "name": "Portugal" },
    "url": "https://strict-dev.com/servicos/rgpd-dados"
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowBackButton(scrollPercentage > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: FileText,
      title: language === "pt" ? "Políticas de Privacidade" : "Privacy Policies",
      desc: language === "pt" 
        ? "Elaboração de políticas de privacidade e termos de serviço conformes com RGPD."
        : "Preparation of privacy policies and terms of service compliant with GDPR.",
    },
    {
      icon: Shield,
      title: language === "pt" ? "Gestão de Consentimentos" : "Consent Management",
      desc: language === "pt"
        ? "Sistemas de gestão de cookies e consentimento do utilizador conformes."
        : "Cookie management and user consent systems compliant.",
    },
    {
      icon: Lock,
      title: language === "pt" ? "Proteção de Dados" : "Data Protection",
      desc: language === "pt"
        ? "Encriptação, backups seguros e boas práticas de segurança aplicadas."
        : "Encryption, secure backups and best security practices applied.",
    },
  ];

  const benefits = [
    language === "pt" ? "Redução de riscos legais e conformidade total" : "Reduction of legal risks and total compliance",
    language === "pt" ? "Aumento da confiança dos clientes e utilizadores" : "Increased customer and user trust",
    language === "pt" ? "Implementação de políticas de privacidade claras" : "Implementation of clear privacy policies",
    language === "pt" ? "Gestão de consentimentos e cookies automatizada" : "Automated consent and cookie management",
    language === "pt" ? "Proteção de dados em trânsito e em repouso" : "Data protection in transit and at rest",
    language === "pt" ? "Preparação para incidentes e mitigação de riscos" : "Incident preparedness and risk mitigation",
  ];

  const areas = [
    {
      title: language === "pt" ? "Mapeamento de Dados" : "Data Mapping",
      desc: language === "pt"
        ? "Identificação e documentação de todos os fluxos de dados pessoais no sistema."
        : "Identification and documentation of all personal data flows in the system.",
    },
    {
      title: language === "pt" ? "Direitos dos Titulares" : "Data Subject Rights",
      desc: language === "pt"
        ? "Implementação de mecanismos para acesso, retificação e eliminação de dados."
        : "Implementation of mechanisms for data access, rectification and deletion.",
    },
    {
      title: language === "pt" ? "Segurança Técnica" : "Technical Security",
      desc: language === "pt"
        ? "Encriptação, autenticação forte e auditoria de acessos aos dados."
        : "Encryption, strong authentication and data access auditing.",
    },
    {
      title: language === "pt" ? "Documentação" : "Documentation",
      desc: language === "pt"
        ? "Registos de atividades de tratamento e políticas de privacidade atualizadas."
        : "Processing activity records and updated privacy policies.",
    },
  ];

  const handleCtaClick = () => {
    navigate("/#contact");
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        const navbarHeight = window.innerWidth < 768 ? 64 : 80;
        const targetPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* SEO Meta Tags */}
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        canonical={metadata.canonical}
        keywords={metadata.keywords}
        structuredData={serviceSchema}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={breadcrumbs}
      />

      {/* Back Button - Mobile only */}
      {showBackButton && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-16 left-2 z-50 md:hidden"
        >
          <button
            onClick={() => navigate("/")}
            aria-label={language === "pt" ? "Voltar à página inicial" : "Back to homepage"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] transition-all cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-widest">
              {language === "pt" ? "Voltar" : "Back"}
            </span>
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-[#0a0a0a] pt-24 md:pt-32 pb-12 md:pb-20 border-b border-neutral-100 dark:border-[#1a1a1a]"
        aria-labelledby="hero-title"
      >
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 md:p-3 bg-[#2f5e50]/10 border border-[#2f5e50]/20">
                <Database className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" aria-hidden="true" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "RGPD & Dados" : "GDPR & Data"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight"
              id="hero-title"
            >
              {language === "pt" 
                ? "Conformidade RGPD para Empresas em Portugal"
                : "GDPR Compliance for Companies in Portugal"}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Implementamos soluções completas de conformidade RGPD adaptadas à dimensão e contexto do seu negócio. Reduzimos riscos legais, aumentamos a confiança dos clientes e garantimos proteção adequada dos dados pessoais através de boas práticas técnicas e documentação clara."
                : "We implement complete GDPR compliance solutions adapted to the size and context of your business. We reduce legal risks, increase customer trust and ensure adequate protection of personal data through technical best practices and clear documentation."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Diagnóstico" : "Request Assessment"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-b border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Implementação" : "Implementation"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Soluções práticas" : "Practical solutions"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 md:p-6 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a]"
              >
                <feature.icon className="w-6 h-6 text-[#2f5e50] mb-3" aria-hidden="true" />
                <h3 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 border-b border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
                {language === "pt" ? "Benefícios" : "Benefits"}
              </span>
              <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4 md:mb-6">
                {language === "pt" 
                  ? "Vantagens da conformidade com o RGPD"
                  : "Benefits of GDPR compliance"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "A conformidade RGPD não é apenas uma obrigação legal — é uma vantagem competitiva que demonstra seriedade, profissionalismo e respeito pelos dados dos clientes."
                  : "GDPR compliance is not just a legal obligation — it's a competitive advantage that demonstrates seriousness, professionalism and respect for customer data."}
              </p>
            </div>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2f5e50] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-[10px] md:text-xs text-neutral-700 dark:text-neutral-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Áreas de Atuação" : "Areas of Action"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Abordagem integrada" : "Integrated approach"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {areas.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 md:p-6 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a]"
              >
                <h3 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection items={faqItems} language={language} />

      <RelatedServices currentService="gdpr" language={language} />

      {/* CTA Section */}
      <section className="py-12 md:py-20 border-t border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt"
                ? "Pronto para garantir conformidade RGPD?"
                : "Ready to ensure GDPR compliance?"}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
              {language === "pt"
                ? "Solicite um diagnóstico inicial gratuito e descubra como implementar RGPD no seu negócio."
                : "Request a free initial assessment and discover how to implement GDPR in your business."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Diagnóstico — Resposta em 24h" : "Request Assessment — 24h Response"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}