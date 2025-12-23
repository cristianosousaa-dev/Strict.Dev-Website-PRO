import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";
import { smoothScrollToTop } from "../../../utils/scroll";

export function BackToTop() {
  const { t } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25
          }}
          onClick={() => smoothScrollToTop()}
          className="fixed bottom-[96px] right-7 z-[9998] w-12 h-12 bg-[#2f5e50] hover:bg-[#254a3f] text-white rounded-full shadow-lg hover:shadow-xl transition-colors flex items-center justify-center group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2f5e50] focus-visible:ring-offset-2"
          aria-label={t.backToTop.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}