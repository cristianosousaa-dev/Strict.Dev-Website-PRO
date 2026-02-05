import { Square } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const boxVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export function WhyUs() {
  const { t } = useTheme();
  
  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-12 md:py-20 border-b border-neutral-100 dark:border-[#1a1a1a]" id="about">
      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            
            {/* Texto Institucional */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ 
                once: true, 
                margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "-50px" : "-100px",
                amount: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.15 : 0.3 
              }}
            >
                <span className="text-[#2f5e50] font-bold text-[0.5625rem] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 block">
                    {t.whyUs.label}
                </span>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 tracking-tight leading-tight">
                    {t.whyUs.title}
                </h2>
                
                <div className="space-y-3.5 md:space-y-5 text-[0.6875rem] md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <p>{t.whyUs.paragraph1}</p>
                    <p>{t.whyUs.paragraph2}</p>
                </div>
            </motion.div>

            {/* Metodologia Operacional */}
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
                <div className="absolute bottom-0 right-0 w-3 md:w-4 h-[2px] bg-[#2f5e50]"></div>
                <div className="absolute bottom-0 right-0 w-[2px] h-3 md:h-4 bg-[#2f5e50]"></div>

                <h3 className="text-sm md:text-base font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 uppercase border-b border-neutral-200 dark:border-[#1a1a1a] pb-2.5 md:pb-3">
                    {t.whyUs.boxTitle}
                </h3>

                <motion.div 
                  className="space-y-4 md:space-y-6"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                    {t.whyUs.methodology.map((item, idx) => (
                        <motion.div key={idx} className="group" variants={itemVariants}>
                            <div className="flex items-start gap-2 md:gap-3 mb-1.5 md:mb-2">
                                <Square className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#2f5e50] mt-0.5 flex-shrink-0 fill-[#2f5e50]" />
                                <h4 className="text-[0.6875rem] md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">
                                    {item.title}
                                </h4>
                            </div>
                            <p className="text-[0.625rem] md:text-[10px] text-neutral-600 dark:text-neutral-400 leading-relaxed pl-5 md:pl-6">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}