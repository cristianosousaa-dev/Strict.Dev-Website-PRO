import { motion } from "motion/react";

/**
 * SectionDivider — linha horizontal animada que se "desenha"
 * com tick verde central. Swiss Style.
 */
export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-0 overflow-hidden">
      {/* Linha horizontal que se desenha */}
      <motion.div
        className="h-[1px] bg-neutral-200 dark:bg-[#1a1a1a]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Tick central */}
      <motion.div
        className="absolute w-2 h-2 bg-[#2f5e50] rotate-45"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
      />
    </div>
  );
}
