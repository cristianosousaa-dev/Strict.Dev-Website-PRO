import { motion } from "motion/react";
import { Cpu, CheckCircle2, ArrowRight, RefreshCw, AlertTriangle, Zap, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";

export function MaintenancePage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('maintenance', language);
  const breadcrumbs = getBreadcrumbs('maintenance', language);

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
      icon: RefreshCw,
      title: language === "pt" ? "Atualizações Contínuas" : "Continuous Updates",
      desc: language === "pt" 
        ? "Atualizações de segurança, correções de bugs e melhorias de performance regulares."
        : "Security updates, bug fixes and regular performance improvements.",
    },
    {
      icon: AlertTriangle,
      title: language === "pt" ? "Monitorização 24/7" : "24/7 Monitoring",
      desc: language === "pt"
        ? "Monitorização contínua de uptime, performance e segurança do website."
        : "Continuous monitoring of website uptime, performance and security.",
    },
    {
      icon: Zap,
      title: language === "pt" ? "Suporte Técnico" : "Technical Support",
      desc: language === "pt"
        ? "Suporte técnico direto para resolver problemas e implementar melhorias."
        : "Direct technical support to solve problems and implement improvements.",
    },
  ];

  const benefits = [
    language === "pt" ? "Proteção contínua contra vulnerabilidades" : "Continuous protection against vulnerabilities",
    language === "pt" ? "Backups automáticos diários com retenção segura" : "Automatic daily backups with secure retention",
    language === "pt" ? "Atualizações de software e dependências" : "Software and dependency updates",
    language === "pt" ? "Otimização de performance e velocidade" : "Performance and speed optimization",
    language === "pt" ? "Resolução prioritária de problemas técnicos" : "Priority resolution of technical issues",
    language === "pt" ? "Relatórios mensais de performance e segurança" : "Monthly performance and security reports",
  ];

  const services = [
    {
      title: language === "pt" ? "Segurança" : "Security",
      desc: language === "pt"
        ? "Atualizações de segurança críticas, patch management e auditoria contínua."
        : "Critical security updates, patch management and continuous auditing.",
    },
    {
      title: language === "pt" ? "Performance" : "Performance",
      desc: language === "pt"
        ? "Otimização de base de dados, cache, imagens e código para máxima velocidade."
        : "Database, cache, image and code optimization for maximum speed.",
    },
    {
      title: language === "pt" ? "Backups" : "Backups",
      desc: language === "pt"
        ? "Backups automáticos diários com armazenamento redundante e testes de recuperação."
        : "Automatic daily backups with redundant storage and recovery testing.",
    },
    {
      title: language === "pt" ? "Suporte" : "Support",
      desc: language === "pt"
        ? "Canal direto de suporte técnico com resposta prioritária a problemas críticos."
        : "Direct technical support channel with priority response to critical issues.",
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
            className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] transition-all cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-bold uppercase tracking-widest">
              {language === "pt" ? "Voltar" : "Back"}
            </span>
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-[#0a0a0a] pt-24 md:pt-32 pb-12 md:pb-20 border-b border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 md:p-3 bg-[#2f5e50]/10 border border-[#2f5e50]/20">
                <Cpu className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "Manutenção Técnica" : "Technical Maintenance"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt" 
                ? "Manutenção contínua para segurança e performance."
                : "Continuous maintenance for security and performance."}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Garantimos que o seu website permanece seguro, rápido e atualizado através de manutenção técnica contínua. Monitorizamos uptime 24/7, realizamos backups diários, aplicamos patches de segurança e otimizamos performance para garantir máxima disponibilidade e proteção."
                : "We ensure your website remains secure, fast and up-to-date through continuous technical maintenance. We monitor uptime 24/7, perform daily backups, apply security patches and optimize performance to ensure maximum availability and protection."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Plano" : "Request Plan"}
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
              {language === "pt" ? "Serviços" : "Services"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Proteção completa" : "Complete protection"}
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
                  ? "Tranquilidade e disponibilidade"
                  : "Peace of mind and availability"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "Focamos na manutenção técnica para que se possa focar no negócio. Garantimos que o website está sempre online, seguro e otimizado."
                  : "We focus on technical maintenance so you can focus on business. We ensure the website is always online, secure and optimized."}
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

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Áreas Cobertas" : "Covered Areas"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Manutenção integral" : "Comprehensive maintenance"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((item, idx) => (
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

      {/* CTA Section */}
      <section className="py-12 md:py-20 border-t border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt"
                ? "Pronto para proteger o seu website?"
                : "Ready to protect your website?"}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
              {language === "pt"
                ? "Solicite um plano de manutenção personalizado sem compromisso. Resposta garantida em 24 horas."
                : "Request a personalized maintenance plan with no commitment. Response guaranteed within 24 hours."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Plano — Resposta em 24h" : "Request Plan — 24h Response"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}