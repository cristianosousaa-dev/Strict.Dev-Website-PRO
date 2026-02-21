import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getRelatedServices } from "../../../data/relatedServices";

interface RelatedServicesProps {
  currentService: string;
  language: "pt" | "en";
}

export function RelatedServices({ currentService, language }: RelatedServicesProps) {
  const related = getRelatedServices(currentService);

  if (related.length === 0) return null;

  return (
    <section
      className="py-12 md:py-20 border-b border-neutral-100 dark:border-[#1a1a1a]"
      aria-labelledby="related-services-title"
    >
      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        <div className="mb-8 md:mb-12">
          <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
            {language === "pt" ? "Serviços Relacionados" : "Related Services"}
          </span>
          <h2
            id="related-services-title"
            className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight"
          >
            {language === "pt"
              ? "Outros serviços que complementam o seu projeto"
              : "Other services that complement your project"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {related.map((service, idx) => {
            const content = language === "pt" ? service.pt : service.en;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={service.path}
                  className="block p-5 md:p-6 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] transition-colors group"
                >
                  <h3 className="text-xs md:text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide mb-2 group-hover:text-[#2f5e50] transition-colors">
                    {content.name}
                  </h3>
                  <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {content.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#2f5e50]">
                    {language === "pt" ? "Ver serviço" : "View service"}
                    <ArrowRight
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}