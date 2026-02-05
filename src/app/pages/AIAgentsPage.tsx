import { motion } from "motion/react";
import { Bot, CheckCircle2, ArrowRight, MessageSquare, Brain, TrendingUp, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEOHead from "../components/strict-dev/SEOHead";
import BreadcrumbSchema from "../components/strict-dev/BreadcrumbSchema";
import { getServiceMetadata } from "../../data/servicesMetadata";
import { getBreadcrumbs } from "../../data/breadcrumbsData";

export function AIAgentsPage() {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);
  
  const metadata = getServiceMetadata('ai-agents', language);
  const breadcrumbs = getBreadcrumbs('ai-agents', language);

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
      icon: MessageSquare,
      title: language === "pt" ? "Atendimento Automatizado" : "Automated Support",
      desc: language === "pt" 
        ? "Chatbots inteligentes disponíveis 24/7 para atender clientes e qualificar leads."
        : "Intelligent chatbots available 24/7 to serve customers and qualify leads.",
    },
    {
      icon: Brain,
      title: language === "pt" ? "Aprendizagem Contínua" : "Continuous Learning",
      desc: language === "pt"
        ? "Agentes que melhoram com cada interação, adaptando-se ao seu negócio."
        : "Agents that improve with each interaction, adapting to your business.",
    },
    {
      icon: TrendingUp,
      title: language === "pt" ? "Aumento de Produtividade" : "Productivity Boost",
      desc: language === "pt"
        ? "Automatize tarefas repetitivas e liberte a equipa para atividades estratégicas."
        : "Automate repetitive tasks and free up the team for strategic activities.",
    },
  ];

  const benefits = [
    language === "pt" ? "Atendimento ao cliente disponível 24 horas por dia" : "Customer support available 24 hours a day",
    language === "pt" ? "Qualificação automática de leads e contactos" : "Automatic lead and contact qualification",
    language === "pt" ? "Integração com CRM e ferramentas existentes" : "Integration with CRM and existing tools",
    language === "pt" ? "Redução de custos operacionais em até 40%" : "Reduction of operational costs by up to 40%",
    language === "pt" ? "Respostas consistentes e profissionais" : "Consistent and professional responses",
    language === "pt" ? "Análise de sentimento e métricas em tempo real" : "Sentiment analysis and real-time metrics",
  ];

  const useCases = [
    {
      title: language === "pt" ? "E-commerce" : "E-commerce",
      desc: language === "pt"
        ? "Assistente virtual para suporte de produtos, rastreamento de encomendas e recomendações personalizadas."
        : "Virtual assistant for product support, order tracking and personalized recommendations.",
    },
    {
      title: language === "pt" ? "Serviços Profissionais" : "Professional Services",
      desc: language === "pt"
        ? "Agendamento automático de reuniões, triagem de clientes e resposta a perguntas frequentes."
        : "Automatic meeting scheduling, client triage and frequently asked questions response.",
    },
    {
      title: language === "pt" ? "Saúde & Bem-estar" : "Health & Wellness",
      desc: language === "pt"
        ? "Marcação de consultas, lembretes automáticos e informações sobre serviços."
        : "Appointment booking, automatic reminders and service information.",
    },
    {
      title: language === "pt" ? "Educação" : "Education",
      desc: language === "pt"
        ? "Suporte a alunos, esclarecimento de dúvidas e orientação sobre programas educativos."
        : "Student support, clarification of doubts and guidance on educational programs.",
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
                <Bot className="w-5 md:w-6 h-5 md:h-6 text-[#2f5e50]" />
              </div>
              <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest">
                {language === "pt" ? "Agentes de IA" : "AI Agents"}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight">
              {language === "pt" 
                ? "Automatize processos e melhore o atendimento com IA."
                : "Automate processes and improve service with AI."}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 md:mb-8">
              {language === "pt"
                ? "Desenvolvemos agentes inteligentes personalizados para automatizar atendimento ao cliente, qualificar leads e reduzir tarefas repetitivas. Cada solução é treinada especificamente para o contexto do seu negócio, garantindo respostas precisas e conformidade RGPD."
                : "We develop customized intelligent agents to automate customer service, qualify leads and reduce repetitive tasks. Each solution is specifically trained for your business context, ensuring accurate responses and GDPR compliance."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Demonstração" : "Request Demo"}
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
              {language === "pt" ? "Capacidades" : "Capabilities"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Tecnologia inteligente" : "Intelligent technology"}
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
                  ? "Resultados mensuráveis e impacto real"
                  : "Measurable results and real impact"}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pt"
                  ? "Agentes de IA não dormem, não tiram férias e mantêm consistência absoluta. Reduzem custos, aumentam a satisfação do cliente e libertam a equipa para tarefas estratégicas."
                  : "AI agents don't sleep, don't take vacations and maintain absolute consistency. They reduce costs, increase customer satisfaction and free up the team for strategic tasks."}
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

      {/* Use Cases Section */}
      <section className="py-12 md:py-20 bg-neutral-50 dark:bg-[#0f0f0f]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="mb-8 md:mb-12">
            <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
              {language === "pt" ? "Casos de Uso" : "Use Cases"}
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {language === "pt" ? "Aplicações práticas" : "Practical applications"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {useCases.map((item, idx) => (
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
                ? "Pronto para automatizar o seu negócio?"
                : "Ready to automate your business?"}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
              {language === "pt"
                ? "Solicite uma demonstração personalizada e descubra como a IA pode transformar a sua operação."
                : "Request a personalized demo and discover how AI can transform your operation."}
            </p>
            <Button
              onClick={handleCtaClick}
              className="bg-[#2f5e50] hover:bg-[#234539] text-white rounded-none px-8 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              {language === "pt" ? "Solicitar Demonstração — Resposta em 24h" : "Request Demo — 24h Response"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}