import { motion } from "motion/react";
import { ShoppingBag, CheckCircle2, ArrowRight, ShoppingCart, CreditCard, BarChart3, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";

export function EcommercePage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('ecommerce', language);
  const breadcrumbs = getBreadcrumbs('ecommerce', language);

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
      icon: ShoppingCart,
      title: language === "pt" ? "Experiência de Compra Otimizada" : "Optimized Shopping Experience",
      desc: language === "pt" 
        ? "Carrinho intuitivo, checkout rápido e processo de compra sem fricção."
        : "Intuitive cart, fast checkout and frictionless purchase process.",
    },
    {
      icon: CreditCard,
      title: language === "pt" ? "Pagamentos Integrados" : "Integrated Payments",
      desc: language === "pt"
        ? "Integração com Stripe, MB Way, Multibanco e outros sistemas de pagamento."
        : "Integration with Stripe, MB Way, Multibanco and other payment systems.",
    },
    {
      icon: BarChart3,
      title: language === "pt" ? "Análise e Métricas" : "Analytics & Metrics",
      desc: language === "pt"
        ? "Dashboard completo com métricas de vendas, conversão e comportamento do cliente."
        : "Complete dashboard with sales, conversion and customer behavior metrics.",
    },
  ];

  const benefits = [
    language === "pt" ? "Design responsivo otimizado para mobile e desktop" : "Responsive design optimized for mobile and desktop",
    language === "pt" ? "Gestão de produtos, stock e variantes simplificada" : "Simplified product, stock and variant management",
    language === "pt" ? "Sistema de envios e rastreamento integrado" : "Integrated shipping and tracking system",
    language === "pt" ? "Cupões de desconto e promoções automatizadas" : "Discount coupons and automated promotions",
    language === "pt" ? "Conformidade RGPD e segurança de dados" : "GDPR compliance and data security",
    language === "pt" ? "Otimização SEO para produtos e categorias" : "SEO optimization for products and categories",
  ];

  const integrations = [
    {
      title: language === "pt" ? "Pagamentos" : "Payments",
      desc: language === "pt"
        ? "Stripe, MB Way, Multibanco, PayPal e cartões de crédito."
        : "Stripe, MB Way, Multibanco, PayPal and credit cards.",
    },
    {
      title: language === "pt" ? "Envios" : "Shipping",
      desc: language === "pt"
        ? "CTT, DPD, UPS e outras transportadoras com rastreamento automático."
        : "CTT, DPD, UPS and other carriers with automatic tracking.",
    },
    {
      title: language === "pt" ? "Contabilidade" : "Accounting",
      desc: language === "pt"
        ? "Exportação automática de faturas e integração com software de gestão."
        : "Automatic invoice export and integration with management software.",
    },
    {
      title: language === "pt" ? "Marketing" : "Marketing",
      desc: language === "pt"
        ? "Google Analytics, Meta Pixel e automação de email marketing."
        : "Google Analytics, Meta Pixel and email marketing automation.",
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
                <ShoppingBag className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "Loja Online" : "E-commerce Store"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt" 
                ? "Lojas online profissionais que vendem."
                : "Professional online stores that sell."}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Desenvolvemos lojas online completas com pagamentos integrados, gestão de stock, envios automáticos e análise de vendas. Cada projeto é construído com foco em conversão, segurança e escalabilidade, garantindo conformidade RGPD e proteção total dos dados dos clientes."
                : "We develop complete online stores with integrated payments, stock management, automatic shipping and sales analysis. Each project is built with focus on conversion, security and scalability, ensuring GDPR compliance and full customer data protection."}
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
              {language === "pt" ? "Funcionalidades" : "Features"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Tudo o que precisa" : "Everything you need"}
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
                  ? "Solução completa para vender online"
                  : "Complete solution to sell online"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "Não vendemos templates genéricos. Desenvolvemos lojas online personalizadas, escaláveis e preparadas para crescer com o seu negócio."
                  : "We don't sell generic templates. We develop customized, scalable online stores prepared to grow with your business."}
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

      {/* Integrations Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Integrações" : "Integrations"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Conecte o essencial" : "Connect the essentials"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {integrations.map((item, idx) => (
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
                ? "Pronto para começar a vender online?"
                : "Ready to start selling online?"}
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