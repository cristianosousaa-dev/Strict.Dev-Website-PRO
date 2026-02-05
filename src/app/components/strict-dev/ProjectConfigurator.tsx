import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";

interface Service {
  id: string;
  name: string;
  desc: string;
  weeks: number;
  price: number;
  isMonthly?: boolean;
}

export function ProjectConfigurator() {
  const { t } = useTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const services: Service[] = [
    { 
      id: 'web', 
      name: t.projectConfigurator.services.web, 
      desc: t.projectConfigurator.services.webDesc,
      weeks: 5,
      price: 399
    },
    { 
      id: 'ai', 
      name: t.projectConfigurator.services.ai, 
      desc: t.projectConfigurator.services.aiDesc,
      weeks: 4,
      price: 499
    },
    { 
      id: 'ecommerce', 
      name: t.projectConfigurator.services.ecommerce, 
      desc: t.projectConfigurator.services.ecommerceDesc,
      weeks: 6,
      price: 599
    },
    { 
      id: 'rgpd', 
      name: t.projectConfigurator.services.rgpd, 
      desc: t.projectConfigurator.services.rgpdDesc,
      weeks: 3,
      price: 299
    },
    { 
      id: 'maintenance', 
      name: t.projectConfigurator.services.maintenance, 
      desc: t.projectConfigurator.services.maintenanceDesc,
      weeks: 2,
      price: 59,
      isMonthly: true
    },
    { 
      id: 'infra', 
      name: t.projectConfigurator.services.infra, 
      desc: t.projectConfigurator.services.infraDesc,
      weeks: 2,
      price: 59,
      isMonthly: true
    },
  ];

  const toggle = (id: string) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const selectedData = services.filter(s => selected.has(s.id));
  const total = selectedData.reduce((acc, s) => acc + s.price, 0);
  const days = selectedData.reduce((acc, s) => acc + s.weeks, 0);

  const format = (n: number) => new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(n);

  return (
    <section 
      id="configurator"
      className="py-12 px-6 bg-neutral-50 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-[#1a1a1a]"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Ultra Compact */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#2f5e50]" />
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#2f5e50]">
              {t.projectConfigurator.label}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-100 mb-1">
            {t.projectConfigurator.title}
          </h2>
          <p className="text-[10px] text-neutral-600 dark:text-neutral-400 max-w-xl">
            {t.projectConfigurator.subtitle}
          </p>
        </div>

        {/* Services Grid - 2 Columns Mobile (Compact & Symmetrical) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {services.map((s, i) => {
            const active = selected.has(s.id);
            return (
              <motion.button
                key={s.id}
                onClick={() => toggle(s.id)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`
                  relative p-2.5 md:p-4 text-left transition-all border flex flex-col h-full
                  ${active 
                    ? 'bg-[#2f5e50] border-[#2f5e50]' 
                    : 'bg-white dark:bg-[#0f0f0f] border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50]'
                  }
                `}
              >
                {/* Header Row */}
                <div className="flex justify-between items-start w-full mb-1 md:mb-1.5">
                    {/* Service Name - Allow wrapping but keep tight */}
                    <div className={`text-[10px] md:text-xs font-bold uppercase tracking-tight pr-1 leading-tight ${active ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'}`}>
                      {s.name}
                    </div>

                    {/* Checkbox Corner - Compact */}
                    <div className={`
                        shrink-0 w-3 md:w-3.5 h-3 md:h-3.5 border flex items-center justify-center
                        ${active 
                        ? 'bg-white border-white' 
                        : 'border-neutral-300 dark:border-neutral-600'
                        }
                    `}>
                        {active && (
                        <svg className="w-1.5 md:w-2 h-1.5 md:h-2 text-[#2f5e50]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        )}
                    </div>
                </div>

                {/* Description - Flex Grow & Full Text (No Truncate) */}
                <div className={`text-[9px] md:text-[10px] leading-relaxed mb-2 md:mb-3 flex-grow ${active ? 'text-white/80' : 'text-neutral-600 dark:text-neutral-400'}`}>
                  {s.desc}
                </div>

                {/* Metrics Row - Sticky Bottom */}
                <div className="flex items-end justify-between gap-1.5 md:gap-2 pt-1.5 md:pt-2 border-t border-current/10 mt-auto w-full">
                  <div>
                    <div className={`text-[7px] md:text-[8px] uppercase tracking-wide mb-0.5 ${active ? 'text-white/50' : 'text-neutral-400'}`}>
                      {t.projectConfigurator.investment.label}
                    </div>
                    <div className={`text-xs md:text-sm font-bold ${active ? 'text-white' : 'text-[#2f5e50]'}`}>
                      {t.projectConfigurator.investment.from} {format(s.price)}{s.isMonthly ? t.projectConfigurator.investment.perMonth : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[7px] md:text-[8px] uppercase tracking-wide mb-0.5 ${active ? 'text-white/50' : 'text-neutral-400'}`}>
                      {t.projectConfigurator.timeline.label}
                    </div>
                    <div className={`text-xs md:text-sm font-bold ${active ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'}`}>
                      {s.weeks} {t.projectConfigurator.timeline.days}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Summary Bar - Compact */}
        <div className={`
          p-2 md:p-4 transition-all
          ${selected.size > 0 
            ? 'bg-[#2f5e50]' 
            : 'bg-white dark:bg-[#0f0f0f] border border-neutral-200 dark:border-[#1a1a1a]'
          }
        `}>
          {selected.size > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-3 mb-1.5 md:mb-3">
                {/* Metrics */}
                <div className="flex items-center gap-1.5 md:gap-4">
                  <div>
                    <div className="text-[6px] md:text-[8px] uppercase tracking-wide text-white/40 mb-0.5 md:mb-1">
                      {t.projectConfigurator.summary.total}
                    </div>
                    <div className="text-sm md:text-xl font-bold text-white">
                      {t.projectConfigurator.investment.from} {format(total)}
                    </div>
                  </div>
                  <div className="h-3 md:h-6 w-px bg-white/20" />
                  <div>
                    <div className="text-[6px] md:text-[8px] uppercase tracking-wide text-white/40 mb-0.5 md:mb-1">
                      {t.projectConfigurator.timeline.label}
                    </div>
                    <div className="text-sm md:text-xl font-bold text-white">
                      {days} {t.projectConfigurator.timeline.days}
                    </div>
                  </div>
                  <div className="h-3 md:h-6 w-px bg-white/20" />
                  <div>
                    <div className="text-[6px] md:text-[8px] uppercase tracking-wide text-white/40 mb-0.5 md:mb-1">
                      {t.projectConfigurator.summary.services}
                    </div>
                    <div className="text-sm md:text-xl font-bold text-white">
                      {selected.size}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-block px-2.5 md:px-5 py-1 md:py-2.5 bg-white text-[#2f5e50] hover:bg-neutral-100 transition-colors whitespace-nowrap"
                >
                  <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-wider">
                    {t.projectConfigurator.summary.cta}
                  </span>
                </a>
              </div>

              {/* Disclaimer */}
              <p className="text-[7px] md:text-[9px] leading-relaxed text-white/50 pt-1 md:pt-2 border-t border-white/10">
                {t.projectConfigurator.investment.disclaimer}
              </p>
            </motion.div>
          ) : (
            <div className="text-center py-1">
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {t.projectConfigurator.selectServices}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}