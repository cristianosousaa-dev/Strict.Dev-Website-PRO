import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { motion } from "motion/react";

export function CTA() {
  const { t } = useTheme();
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section className="relative bg-white dark:bg-[#0a0a0a] py-6 md:py-16 px-3 md:px-6 border-t border-b border-neutral-100 dark:border-[#1a1a1a] overflow-hidden">
        {/* Subtle Swiss Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #2f5e50 1px, transparent 1px),
              linear-gradient(to bottom, #2f5e50 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <motion.div 
          className="max-w-5xl mx-auto relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px", amount: 0.1 }}
        >
            <motion.div 
              className="relative bg-white dark:bg-[#0a0a0a] border-2 border-neutral-200 dark:border-[#1a1a1a] p-3 md:p-8 text-center shadow-lg"
              variants={itemVariants}
            >
                {/* Corner Accents - Swiss Style */}
                <div className="absolute top-0 left-0 w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute top-0 left-0 w-[2px] h-4 bg-[#2f5e50]"></div>
                <div className="absolute top-0 right-0 w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute top-0 right-0 w-[2px] h-4 bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 left-0 w-[2px] h-4 bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-[#2f5e50]"></div>
                
                {/* Offer Badge - No icons/emojis */}
                <motion.div 
                  className="inline-flex items-center gap-1.5 md:gap-2 py-1 md:py-1.5 px-2 md:px-3 border-2 border-[#2f5e50] bg-[#2f5e50]/5 text-[#2f5e50] text-[7px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4"
                  variants={itemVariants}
                >
                  <span>{t.cta.offerBadge}</span>
                </motion.div>

                <motion.h2 
                  className="text-base md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-1.5 md:mb-4 tracking-tight"
                  variants={itemVariants}
                >
                    {t.cta.title}
                </motion.h2>
                <motion.p 
                  className="text-[10px] md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-3 md:mb-7"
                  variants={itemVariants}
                >
                    {t.cta.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  <Button 
                    asChild
                    className="h-8 md:h-12 px-4 md:px-8 bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white text-[7px] md:text-[10px] font-bold uppercase tracking-widest rounded-none shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer group"
                    style={{
                      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  >
                      <a href="#contact">
                          {t.cta.button}
                          <ArrowRight 
                            className="w-2.5 md:w-4 h-2.5 md:h-4 ml-2 md:ml-3 group-hover:translate-x-1" 
                            style={{
                              transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                            }}
                          />
                      </a>
                  </Button>
                </motion.div>

                {/* Trust Signals */}
                <motion.div 
                  className="mt-3 md:mt-7 pt-2.5 md:pt-6 border-t border-neutral-200 dark:border-[#1a1a1a] flex flex-wrap justify-center gap-2 md:gap-8 text-[7px] md:text-xs text-neutral-500 dark:text-neutral-400"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#2f5e50] rounded-full"></span>
                    <span>{t.cta.trustSignal1}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#2f5e50] rounded-full"></span>
                    <span>{t.cta.trustSignal2}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#2f5e50] rounded-full"></span>
                    <span>{t.cta.trustSignal3}</span>
                  </div>
                </motion.div>
            </motion.div>
        </motion.div>
    </section>
  );
}
