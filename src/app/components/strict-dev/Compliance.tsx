import { motion } from "motion/react";
import { Check, ShieldCheck, Lock, FileSearch } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../../contexts/ThemeContext";

export function Compliance() {
  const { t } = useTheme();
  
  // Animation variants - SEM borderColor ou color dinâmicos!
  // As cores são controladas APENAS por classes CSS (border-neutral-200 dark:border-[#1a1a1a])
  const cardHoverVariants = {
    rest: { 
      y: 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
    },
    hover: { 
      y: -4,
      boxShadow: '0 6px 20px rgba(47, 94, 80, 0.15)',
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  };

  const iconHoverVariants = {
    rest: { 
      y: 0
    },
    hover: { 
      y: -2,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-12 md:py-20" id="compliance">
       <div className="container mx-auto px-3 md:px-6 max-w-7xl">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            <motion.div 
              className="space-y-5 md:space-y-8 order-2 lg:order-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ 
                once: true, 
                margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "-50px" : "-100px",
                amount: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.15 : 0.3 
              }}
            >
                <motion.div variants={itemVariants}>
                    <span className="inline-block py-1 px-2.5 md:px-3 border border-[#2f5e50] text-[#2f5e50] text-[0.5rem] md:text-[9px] font-bold uppercase tracking-widest mb-3 md:mb-4 bg-white dark:bg-[#0a0a0a]">
                        {t.compliance.badge}
                    </span>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
                        {t.compliance.title}
                    </h2>
                </motion.div>
                
                <motion.p 
                  className="text-[0.6875rem] md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-2 border-[#2f5e50] pl-3 md:pl-4"
                  variants={itemVariants}
                >
                  {t.compliance.subtitle}
                </motion.p>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
                  variants={itemVariants}
                >
                    <motion.div 
                      className="p-3 md:p-4 bg-white dark:bg-[#0a0a0a] will-change-transform shadow-sm border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50]"
                      variants={cardHoverVariants}
                      initial="rest"
                      whileInView="rest"
                      whileHover="hover"
                    >
                        <motion.div 
                          variants={iconHoverVariants}
                          className="text-neutral-400 dark:text-neutral-600 hover:text-[#2f5e50]"
                        >
                          <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 mb-2 md:mb-2.5 stroke-[1.5]" />
                        </motion.div>
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-[0.6875rem] md:text-xs mb-0.5 md:mb-1 uppercase">{t.compliance.card1Title}</h3>
                        <p className="text-[0.625rem] md:text-[10px] text-neutral-500 dark:text-neutral-400 leading-[1.4]">{t.compliance.card1Desc}</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-3 md:p-4 bg-white dark:bg-[#0a0a0a] will-change-transform shadow-sm border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50]"
                      variants={cardHoverVariants}
                      initial="rest"
                      whileInView="rest"
                      whileHover="hover"
                    >
                        <motion.div 
                          variants={iconHoverVariants}
                          className="text-neutral-400 dark:text-neutral-600 hover:text-[#2f5e50]"
                        >
                          <FileSearch className="w-5 h-5 md:w-6 md:h-6 mb-2 md:mb-2.5 stroke-[1.5]" />
                        </motion.div>
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-[0.6875rem] md:text-xs mb-0.5 md:mb-1 uppercase">{t.compliance.card2Title}</h3>
                        <p className="text-[0.625rem] md:text-[10px] text-neutral-500 dark:text-neutral-400 leading-[1.4]">{t.compliance.card2Desc}</p>
                    </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                    <Button 
                      asChild
                      className="h-11 md:h-12 px-6 md:px-8 bg-[#2f5e50] hover:bg-neutral-900 dark:hover:bg-[#1a1a1a] text-white text-[0.5625rem] md:text-[10px] font-bold uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                        <a href="#contact">
                            {t.compliance.cta}
                            <Lock className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Visual Compliance Panel */}
            <motion.div 
              className="relative order-1 lg:order-2 bg-white dark:bg-[#0a0a0a] p-6 md:p-10 border border-neutral-200 dark:border-[#1a1a1a] shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute top-0 left-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>
                <div className="absolute top-0 right-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute top-0 right-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 left-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 left-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 right-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 right-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>

                <div className="space-y-4 md:space-y-6">
                    <div className="border-b border-neutral-200 dark:border-[#1a1a1a] pb-3 md:pb-4">
                        <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1 uppercase">{t.compliance.visualTitle}</h3>
                        <p className="text-[0.5625rem] md:text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t.compliance.visualSubtitle}</p>
                    </div>

                    <div className="space-y-2.5 md:space-y-3">
                        {t.compliance.features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                className="flex items-start gap-2.5 md:gap-3 p-2.5 md:p-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] transition-colors cursor-default"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                            >
                                <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0 mt-0.5" />
                                <span className="text-[0.625rem] md:text-xs text-neutral-700 dark:text-neutral-300 font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
         </div>
       </div>
    </section>
  );
}