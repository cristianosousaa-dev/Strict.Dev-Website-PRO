import { motion } from "motion/react";
import { Server, CheckCircle2, ArrowRight, Cloud, HardDrive, Activity, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";

export function InfrastructurePage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('infrastructure', language);
  const breadcrumbs = getBreadcrumbs('infrastructure', language);

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
      icon: Cloud,
      title: language === "pt" ? "Cloud Infrastructure" : "Cloud Infrastructure",
      desc: language === "pt" 
        ? "Infraestrutura cloud escalável com alta disponibilidade e redundância geográfica."
        : "Scalable cloud infrastructure with high availability and geographic redundancy.",
    },
    {
      icon: HardDrive,
      title: language === "pt" ? "Armazenamento Seguro" : "Secure Storage",
      desc: language === "pt"
        ? "Armazenamento encriptado com backups automáticos e replicação de dados."
        : "Encrypted storage with automatic backups and data replication.",
    },
    {
      icon: Activity,
      title: language === "pt" ? "Monitorização em Tempo Real" : "Real-time Monitoring",
      desc: language === "pt"
        ? "Monitorização contínua de recursos, performance e disponibilidade."
        : "Continuous monitoring of resources, performance and availability.",
    },
  ];

  const benefits = [
    language === "pt" ? "Infraestrutura cloud gerida e otimizada" : "Managed and optimized cloud infrastructure",
    language === "pt" ? "Escalabilidade automática conforme necessidade" : "Automatic scalability as needed",
    language === "pt" ? "Proteção DDoS e firewall de aplicação web" : "DDoS protection and web application firewall",
    language === "pt" ? "SSL/TLS e encriptação em trânsito e repouso" : "SSL/TLS and encryption in transit and at rest",
    language === "pt" ? "CDN global para máxima performance" : "Global CDN for maximum performance",
    language === "pt" ? "SLA de 99.9% de uptime garantido" : "Guaranteed 99.9% uptime SLA",
  ];

  const solutions = [
    {
      title: language === "pt" ? "Hosting Gerido" : "Managed Hosting",
      desc: language === "pt"
        ? "Servidores geridos otimizados para aplicações web com configuração personalizada."
        : "Managed servers optimized for web applications with custom configuration.",
    },
    {
      title: language === "pt" ? "CDN & Cache" : "CDN & Cache",
      desc: language === "pt"
        ? "Rede de distribuição de conteúdos global para carregamento ultra-rápido."
        : "Global content delivery network for ultra-fast loading.",
    },
    {
      title: language === "pt" ? "Base de Dados" : "Database",
      desc: language === "pt"
        ? "Bases de dados geridas com backups automáticos e otimização contínua."
        : "Managed databases with automatic backups and continuous optimization.",
    },
    {
      title: language === "pt" ? "Escalabilidade" : "Scalability",
      desc: language === "pt"
        ? "Auto-scaling para lidar com picos de tráfego sem interrupções."
        : "Auto-scaling to handle traffic spikes without interruptions.",
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
                <Server className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "Infraestrutura" : "Infrastructure"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt" 
                ? "Infraestrutura cloud robusta e escalável."
                : "Robust and scalable cloud infrastructure."}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Fornecemos infraestrutura cloud gerida e otimizada para máxima performance, segurança e disponibilidade. Cada solução é arquitetada com redundância geográfica, proteção DDoS, CDN global e monitorização 24/7 para garantir que as aplicações estão sempre online e rápidas."
                : "We provide managed and optimized cloud infrastructure for maximum performance, security and availability. Each solution is architected with geographic redundancy, DDoS protection, global CDN and 24/7 monitoring to ensure applications are always online and fast."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Arquitetura" : "Request Architecture"}
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
              {language === "pt" ? "Tecnologia" : "Technology"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Infraestrutura moderna" : "Modern infrastructure"}
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
                  ? "Performance e disponibilidade"
                  : "Performance and availability"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "Infraestrutura cloud gerida liberta-o da complexidade técnica. Focamos em disponibilidade, segurança e performance para que se possa focar no crescimento do negócio."
                  : "Managed cloud infrastructure frees you from technical complexity. We focus on availability, security and performance so you can focus on business growth."}
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

      {/* Solutions Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Soluções" : "Solutions"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Arquitetura completa" : "Complete architecture"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {solutions.map((item, idx) => (
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
                ? "Pronto para modernizar a infraestrutura?"
                : "Ready to modernize infrastructure?"}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
              {language === "pt"
                ? "Solicite uma análise de arquitetura personalizada sem compromisso. Resposta garantida em 24 horas."
                : "Request a personalized architecture analysis with no commitment. Response guaranteed within 24 hours."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Análise — Resposta em 24h" : "Request Analysis — 24h Response"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}