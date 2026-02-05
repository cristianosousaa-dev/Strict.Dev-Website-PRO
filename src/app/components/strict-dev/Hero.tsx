import { motion } from "motion/react";
import { ArrowDown, CheckCircle, BrainCircuit, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../../contexts/ThemeContext";
import logo from "/logo.png";
import { NeuralCore } from "./NeuralCore";
import { BuildAnimation } from "./BuildAnimation";
import { useIsMobile } from "../../../utils/responsive";
import { smoothScrollToElement } from "../../../utils/scroll";

interface HeroProps {
  onShowAnimation: () => void;
  shouldHideCore: boolean;
  showAnimation: boolean;
  onCloseAnimation: () => void;
}

export function Hero({ onShowAnimation, shouldHideCore, showAnimation, onCloseAnimation }: HeroProps) {
  const { t, language } = useTheme();
  const isMobile = useIsMobile();
  
  const scrollToServices = () => smoothScrollToElement('#services');
  
  return (
    <section className="relative pt-20 pb-10 md:pt-24 md:pb-16 lg:pt-32 bg-white dark:bg-[#0a0a0a] min-h-screen flex flex-col justify-center overflow-hidden border-b border-neutral-200 dark:border-[#1a1a1a]">
      
      {/* NEURAL CORE BACKGROUND - Z-40 (atrás do Navbar z-50) */}
      {/* NO MOBILE: Não renderiza (performance) */}
      {!isMobile && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          <NeuralCore 
            onCoreClick={onShowAnimation}
            shouldHide={shouldHideCore}
            language={language}
          />
        </div>
      )}

      {/* BUILD ANIMATION - Z-45 (na frente da esfera, atrás do Navbar!) */}
      {!isMobile && (
        <div className="absolute inset-0 z-[45] pointer-events-none">
          <BuildAnimation 
            isOpen={showAnimation}
            onClose={onCloseAnimation}
            language={language}
          />
        </div>
      )}
      
      <div className="container mx-auto max-w-7xl px-3 md:px-6 relative z-30 pointer-events-auto">
        
        {/* ============================================ */}
        {/* LOGO - MOBILE ONLY (Above frame)           */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="md:hidden mb-6 flex justify-center pointer-events-auto relative z-10"
        >
          <img 
            src={logo} 
            alt="Strict.Dev logotipo" 
            className="h-24 w-auto object-contain"
          />
        </motion.div>
        
        {/* Technical Frame with Border on the LEFT side of content */}
        <div className="relative py-6 md:py-0 pointer-events-auto z-40">
            
            {/* Left Border - Positioned at the edge of container */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-[#1a1a1a]"></div>
            
            {/* Corner Markers (Blueprint Style) */}
            <div className="absolute -top-1 left-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
            <div className="absolute -top-1 left-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>
            <div className="absolute -bottom-1 left-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
            <div className="absolute -bottom-1 left-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.5,
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="max-w-4xl pl-3 md:pl-6"
            >
            
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <span className="h-[2px] w-6 md:w-8 bg-[#2f5e50]"></span>
            </div>

            <h1 className="text-[1.75rem] leading-[1.1] md:text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 md:leading-[0.95] tracking-tight mb-3 md:mb-6">
                {t.hero.title1} <br/>
                <span className="text-neutral-700 dark:text-neutral-400">&</span> {t.hero.title2} <br/>
                {t.hero.title3}
            </h1>
            
            <p className="text-[0.8125rem] md:text-base lg:text-lg text-neutral-700 dark:text-neutral-400 max-w-2xl leading-[1.5] md:leading-relaxed font-normal md:font-light mb-5 md:mb-8 border-l-2 border-[#2f5e50] pl-2.5 md:pl-4">
                {t.hero.subtitle}
            </p>

            <div className="flex flex-col md:flex-row gap-2.5 md:gap-4 mb-6 md:mb-12">
                 <Button 
                    asChild
                    className="h-12 md:h-12 px-5 md:px-8 bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white text-[0.5625rem] md:text-[10px] font-bold uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group w-full md:w-auto focus-visible:ring-2 focus-visible:ring-[#2f5e50] focus-visible:ring-offset-2"
                >
                    <a href="#contact" aria-label={t.hero.ctaPrimary}>
                        {t.hero.ctaPrimary}
                        <ArrowDown className="w-3 h-3 ml-2 -rotate-90 group-hover:rotate-0 transition-transform duration-300" />
                    </a>
                </Button>
                 <Button 
                    asChild
                    variant="outline"
                    className="h-12 md:h-12 px-5 md:px-8 border-neutral-200 dark:border-[#1a1a1a] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] text-[0.5625rem] md:text-[10px] font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer w-full md:w-auto focus-visible:ring-2 focus-visible:ring-[#2f5e50] focus-visible:ring-offset-2"
                >
                    <a href="#services" aria-label={t.hero.ctaSecondary}>
                        {t.hero.ctaSecondary}
                    </a>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-6 border-t border-neutral-200 dark:border-[#1a1a1a] pt-3.5 md:pt-6">
                <div className="flex items-center gap-1.5 md:gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                    <span className="text-[0.5625rem] md:text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">{t.hero.badge1}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                    <BrainCircuit className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                    <span className="text-[0.5625rem] md:text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">{t.hero.badge2}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                    <span className="text-[0.5625rem] md:text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">{t.hero.badge3}</span>
                </div>
            </div>
            </motion.div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SCROLL INDICATOR - Swiss Style              */}
      {/* ============================================ */}
      
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        onClick={scrollToServices}
      >
        {/* Texto "SCROLL" */}
        <span className="text-[0.5rem] md:text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 mb-1">
          Scroll
        </span>

        {/* Container do Mouse Icon - Swiss Style */}
        <div className="relative flex flex-col items-center">
          {/* Mouse Border */}
          <div className="w-5 h-8 md:w-6 md:h-9 border-2 border-neutral-300 dark:border-neutral-600 rounded-full flex items-start justify-center pt-1.5 group-hover:border-[#2f5e50] transition-colors duration-300">
            {/* Mouse Wheel - Animated */}
            <motion.div
              className="w-1 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full group-hover:bg-[#2f5e50] transition-colors duration-300"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Linha vertical abaixo do mouse */}
          <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-transparent mt-1"></div>

          {/* Chevron animado */}
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#2f5e50] opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
