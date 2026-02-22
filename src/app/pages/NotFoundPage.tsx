import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Globe, Bot, ShoppingBag, Database, Cpu, Server } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../../contexts/ThemeContext";
import SEOHead from "../components/strict-dev/SEOHead";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const suggestedLinks = [
  { path: "/servicos/desenvolvimento-web", icon: Globe, labelPt: "Criação de Sites", labelEn: "Website Creation" },
  { path: "/servicos/agentes-ia", icon: Bot, labelPt: "Agentes de IA", labelEn: "AI Agents" },
  { path: "/servicos/loja-online", icon: ShoppingBag, labelPt: "Loja Online", labelEn: "Online Store" },
  { path: "/servicos/rgpd-dados", icon: Database, labelPt: "RGPD & Dados", labelEn: "GDPR & Data" },
  { path: "/servicos/manutencao", icon: Cpu, labelPt: "Manutenção Técnica", labelEn: "Technical Maintenance" },
  { path: "/servicos/infraestrutura", icon: Server, labelPt: "Infraestrutura", labelEn: "Infrastructure" },
];

export function NotFoundPage() {
  const { t, language } = useTheme();

  return (
    <section
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white dark:bg-[#0a0a0a] py-12 md:py-20 px-3 md:px-6"
      aria-labelledby="not-found-title"
    >
      <SEOHead
        title={`404 — ${language === "pt" ? "Pagina nao encontrada" : "Page not found"} | Strict.Dev`}
        description={language === "pt" ? "A página que procura não existe ou foi removida." : "The page you are looking for does not exist or has been removed."}
        noindex={true}
      />

      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div
          className="relative bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] shadow-sm p-6 md:p-12"
          variants={itemVariants}
        >
          {/* Corner Markers - Swiss Style */}
          <div className="absolute top-0 left-0 w-4 h-[2px] bg-[#2f5e50]" />
          <div className="absolute top-0 left-0 w-[2px] h-4 bg-[#2f5e50]" />
          <div className="absolute top-0 right-0 w-4 h-[2px] bg-[#2f5e50]" />
          <div className="absolute top-0 right-0 w-[2px] h-4 bg-[#2f5e50]" />
          <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#2f5e50]" />
          <div className="absolute bottom-0 left-0 w-[2px] h-4 bg-[#2f5e50]" />
          <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#2f5e50]" />
          <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-[#2f5e50]" />

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-start">
            {/* 404 Typography */}
            <motion.div
              className="flex flex-col items-start"
              variants={itemVariants}
            >
              <span className="text-[8rem] md:text-[12rem] font-bold text-neutral-100 dark:text-[#1a1a1a] leading-none select-none tracking-tighter">
                404
              </span>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 block">
                  {t.notFound.badge}
                </span>
              </motion.div>

              <motion.h1
                id="not-found-title"
                className="text-xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3 md:mb-4"
                variants={itemVariants}
              >
                {t.notFound.title}
              </motion.h1>

              <motion.p
                className="text-[0.6875rem] md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg mb-6 md:mb-8 border-l-2 border-[#2f5e50] pl-3 md:pl-4"
                variants={itemVariants}
              >
                {t.notFound.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-2.5 md:gap-4"
                variants={itemVariants}
              >
                <Button
                  asChild
                  className="h-11 md:h-12 px-5 md:px-8 bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white text-[0.5625rem] md:text-[10px] font-bold uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group w-full sm:w-auto"
                >
                  <Link to="/">
                    {t.notFound.ctaHome}
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 md:h-12 px-5 md:px-8 border-neutral-200 dark:border-[#1a1a1a] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] text-[0.5625rem] md:text-[10px] font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <Link to="/#contact">
                    {t.notFound.ctaContact}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Suggested Links */}
        <motion.div
          className="mt-6 md:mt-8"
          variants={itemVariants}
        >
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 md:mb-4">
            {language === "pt" ? "Talvez esteja a procurar" : "You might be looking for"}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {suggestedLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.4 + idx * 0.06,
                }}
              >
                <Link
                  to={link.path}
                  className="group flex items-center gap-2 md:gap-2.5 p-3 md:p-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] transition-all duration-200 cursor-pointer"
                >
                  <link.icon
                    className="w-4 h-4 text-neutral-400 dark:text-neutral-600 group-hover:text-[#2f5e50] transition-colors duration-200 stroke-[1.5] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 group-hover:text-[#2f5e50] transition-colors duration-200">
                    {language === "pt" ? link.labelPt : link.labelEn}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
