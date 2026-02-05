import { motion } from "motion/react";
import { Globe, ShoppingBag, Database, Bot, Cpu, Server } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const serviceIcons = [Globe, Bot, ShoppingBag, Database, Cpu, Server];

// Service badges - apenas cores da marca
const serviceBadges = [
  { label: "badges.0", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
  { label: "badges.1", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
  { label: "badges.2", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
  { label: "badges.3", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
  { label: "badges.4", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
  { label: "badges.5", color: "bg-[#2f5e50]/10 text-[#2f5e50] dark:text-[#2f5e50] border-[#2f5e50]/20" },
];

export function Services() {
  const { t } = useTheme();
  const navigate = useNavigate();

  const servicePaths = [
    "/servicos/desenvolvimento-web",
    "/servicos/agentes-ia",
    "/servicos/loja-online",
    "/servicos/rgpd-dados",
    "/servicos/manutencao",
    "/servicos/infraestrutura",
  ];

  // Animation variants
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

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };

  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-12 md:py-20" id="services">
      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 pb-4 md:pb-8 border-b border-neutral-100 dark:border-[#1a1a1a]">
            <div>
                <span className="text-[#2f5e50] font-bold text-[0.5625rem] md:text-[10px] uppercase tracking-widest mb-1.5 md:mb-2 block">{t.services.sectionLabel}</span>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{t.services.title}</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xs text-[0.6875rem] md:text-xs leading-relaxed mt-3 md:mt-0 text-left md:text-right">
                {t.services.subtitle}
            </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "-50px" : "-100px",
            amount: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.1 : 0.2 
          }}
        >
            {serviceIcons.map((Icon, idx) => (
                <motion.div 
                    key={idx}
                    className="relative p-3 md:p-5 bg-white dark:bg-[#0a0a0a] will-change-transform border border-neutral-200 dark:border-[#1a1a1a] shadow-sm overflow-hidden hover:border-[#2f5e50] flex flex-col h-full"
                    variants={cardHoverVariants}
                    initial="rest"
                    whileInView="rest"
                    whileHover="hover"
                    viewport={{ 
                      once: true, 
                      margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "0px" : "-50px"
                    }}
                    onClick={() => navigate(servicePaths[idx])}
                    style={{ cursor: 'pointer' }}
                >
                    {/* Badge no topo direito */}
                    <div className="absolute top-2 md:top-2 right-2 md:right-2">
                      <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[7px] md:text-[9px] font-bold ${serviceBadges[idx].color} border rounded uppercase tracking-wide`}>
                        {t.services.badges[idx]}
                      </span>
                    </div>
                    
                    <motion.div 
                      variants={iconHoverVariants}
                      className="text-neutral-400 dark:text-neutral-600 hover:text-[#2f5e50] mb-2 md:mb-3"
                    >
                      <Icon className="w-5 md:w-6 h-5 md:h-6 stroke-[1.5]" />
                    </motion.div>
                    
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-[10px] md:text-xs mb-1 md:mb-1 uppercase leading-tight md:leading-normal">
                      {t.services.items[idx].title}
                    </h3>
                    
                    <p className="text-[9px] md:text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2 md:mb-3 flex-grow">
                      {t.services.items[idx].desc}
                    </p>
                    
                    <div className="pt-2 md:pt-2 border-t border-neutral-200 dark:border-[#1a1a1a] mt-auto">
                      <p className="text-[7px] md:text-[9px] text-[#2f5e50] font-bold uppercase tracking-wider">
                        {t.services.pricing}
                      </p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}