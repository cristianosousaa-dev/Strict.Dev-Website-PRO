import { motion } from "motion/react";
import { Globe, CheckCircle2, ArrowRight, Zap, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { smoothScrollTo } from "../../utils/smoothScroll";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";

export function WebDevelopmentPage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('web-development', language);
  const breadcrumbs = getBreadcrumbs('web-development', language);

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
      icon: Zap,
      title: language === "pt" ? "Performance Otimizada" : "Optimized Performance",
      desc: language === "pt" 
        ? "Websites ultra-rápidos com carregamento inferior a 2 segundos e otimização SEO completa."
        : "Ultra-fast websites with loading times under 2 seconds and complete SEO optimization.",
    },
    {
      icon: TrendingUp,
      title: language === "pt" ? "Focado em Conversão" : "Conversion Focused",
      desc: language === "pt"
        ? "Cada elemento é projetado para transformar visitantes em clientes qualificados."
        : "Every element is designed to transform visitors into qualified customers.",
    },
    {
      icon: Shield,
      title: language === "pt" ? "Segurança Avançada" : "Advanced Security",
      desc: language === "pt"
        ? "Proteção completa contra ameaças, com certificado SSL, backups automáticos e conformidade RGPD."
        : "Complete threat protection with SSL certificate, automatic backups and GDPR compliance.",
    },
  ];

  const benefits = [
    language === "pt" ? "Design responsivo e adaptável a todos os dispositivos" : "Responsive design adaptable to all devices",
    language === "pt" ? "Gestão de conteúdos simplificada e intuitiva" : "Simplified and intuitive content management",
    language === "pt" ? "Integração com Google Analytics e ferramentas de marketing" : "Integration with Google Analytics and marketing tools",
    language === "pt" ? "Formulários de contacto profissionais e seguros" : "Professional and secure contact forms",
    language === "pt" ? "Otimização automática para motores de busca (SEO)" : "Automatic search engine optimization (SEO)",
    language === "pt" ? "Tempo de carregamento inferior a 2 segundos" : "Loading time under 2 seconds",
  ];

  const process = [
    {
      step: "01",
      title: language === "pt" ? "Análise de Requisitos" : "Requirements Analysis",
      desc: language === "pt"
        ? "Compreendemos o negócio, público-alvo e objetivos comerciais."
        : "We understand the business, target audience and commercial objectives.",
    },
    {
      step: "02",
      title: language === "pt" ? "Arquitetura & Design" : "Architecture & Design",
      desc: language === "pt"
        ? "Criamos wireframes, protótipos e definimos a estrutura técnica."
        : "We create wireframes, prototypes and define technical structure.",
    },
    {
      step: "03",
      title: language === "pt" ? "Desenvolvimento" : "Development",
      desc: language === "pt"
        ? "Desenvolvemos com tecnologias modernas, código limpo e escalável."
        : "We develop with modern technologies, clean and scalable code.",
    },
    {
      step: "04",
      title: language === "pt" ? "Testes & Deploy" : "Testing & Deployment",
      desc: language === "pt"
        ? "Testamos exaustivamente e colocamos online com zero downtime."
        : "We test exhaustively and deploy online with zero downtime.",
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* SEO Meta Tags */}
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        canonical={metadata.canonical}
        keywords={metadata.keywords}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={breadcrumbs}
      />

      {/* Back Button */}
      {showBackButton && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-16 md:top-24 left-2 md:left-6 z-50"
        >
          <button
            onClick={() => navigate("/")}
            aria-label={language === "pt" ? "Voltar à página inicial" : "Back to homepage"}
            className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] transition-colors duration-300 cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-widest">
              {language === "pt" ? "Voltar" : "Back"}
            </span>
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-[#0a0a0a] pt-24 md:pt-32 pb-12 md:pb-20 border-b border-neutral-100 dark:border-[#1a1a1a] transition-colors duration-300"
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
                <Globe className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "Desenvolvimento Web" : "Web Development"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight" id="hero-title">
              {language === "pt" 
                ? "Websites profissionais que geram resultados."
                : "Professional websites that generate results."}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Desenvolvemos websites de alta performance focados em conversão, credibilidade digital e posicionamento nos motores de busca. Cada projeto é construído com tecnologias modernas, código limpo e estratégia orientada a resultados."
                : "We develop high-performance websites focused on conversion, digital credibility and search engine positioning. Each project is built with modern technologies, clean code and results-oriented strategy."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Proposta" : "Request Proposal"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-b border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Características" : "Features"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "O que está incluído" : "What's included"}
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
                <feature.icon className="w-6 h-6 text-[#2f5e50] mb-3" />
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
                  ? "Soluções completas e profissionais"
                  : "Complete and professional solutions"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "Cada website é desenvolvido com foco em performance, segurança e conversão. Não vendemos templates genéricos — desenvolvemos soluções personalizadas e escaláveis."
                  : "Each website is developed with focus on performance, security and conversion. We don't sell generic templates — we develop customized and scalable solutions."}
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
                  <CheckCircle2 className="w-4 h-4 text-[#2f5e50] mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] md:text-xs text-neutral-700 dark:text-neutral-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Processo" : "Process"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Como trabalhamos" : "How we work"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {process.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-5 md:p-6 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a]"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#2f5e50]/10 mb-3">
                  {item.step}
                </div>
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

      {/* CTA Section */}
      <section className="py-12 md:py-20 border-t border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt"
                ? "Pronto para transformar a sua presença digital?"
                : "Ready to transform your digital presence?"}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
              {language === "pt"
                ? "Solicite uma proposta personalizada sem compromisso. Resposta garantida em 24 horas."
                : "Request a personalized proposal with no commitment. Response guaranteed within 24 hours."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Proposta — Resposta em 24h" : "Request Proposal — 24h Response"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}