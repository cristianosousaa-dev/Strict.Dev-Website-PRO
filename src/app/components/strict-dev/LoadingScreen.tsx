import { motion } from "motion/react";
import logo from "/logo.png";
import { useTheme } from "../../../contexts/ThemeContext";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useTheme();
  
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
            <img src={logo} alt="Strict.Dev" className="w-24 h-auto" />
        </motion.div>

        {/* Barra de progresso minimalista */}
        <div className="w-64 h-[1px] bg-slate-100 dark:bg-neutral-800 overflow-hidden relative">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-[#2f5e50]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </div>
        
        <motion.p 
            className="mt-6 text-[9px] uppercase tracking-[0.25em] text-slate-400 dark:text-neutral-500 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
        >
            {t.loading.text}
        </motion.p>
      </div>
    </motion.div>
  );
}