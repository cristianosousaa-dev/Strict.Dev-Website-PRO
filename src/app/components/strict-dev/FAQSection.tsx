import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  language: 'pt' | 'en';
}

export function FAQSection({ items, language }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // FAQPage schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="py-12 md:py-20 border-b border-neutral-100 dark:border-[#1a1a1a]"
      aria-labelledby="faq-title"
    >
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        <div className="mb-8 md:mb-12">
          <span className="text-[#2f5e50] font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-2 block">
            {language === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </span>
          <h2
            id="faq-title"
            className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight"
          >
            {language === 'pt' ? 'Dúvidas comuns' : 'Common questions'}
          </h2>
        </div>

        <div className="max-w-3xl space-y-0">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-neutral-200 dark:border-[#1a1a1a]"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between py-4 md:py-5 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="text-xs md:text-sm font-bold text-neutral-900 dark:text-neutral-100 pr-4 uppercase tracking-wide">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className="w-4 h-4 text-[#2f5e50]"
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pb-4 md:pb-5 pr-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}