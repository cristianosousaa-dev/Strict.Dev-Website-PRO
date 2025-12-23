import { X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { useTheme } from "../../../contexts/ThemeContext";
import { ThemeLanguageControls } from "./ThemeLanguageControls";
import logo from "figma:asset/4d7188997962f2b31b257965e8301d417e7e07aa.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTheme();

  // Função de scroll otimizada: mobile rápido (500ms)
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500; // Mobile: 500ms (mais rápido)
    const startTime = performance.now();
    
    // Cancela scroll anterior
    if ((window as any).__menuScrollRafId) {
      cancelAnimationFrame((window as any).__menuScrollRafId);
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing otimizado para mobile
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      
      const easedProgress = easeOutCubic(progress);
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        (window as any).__menuScrollRafId = requestAnimationFrame(animateScroll);
      }
    };

    (window as any).__menuScrollRafId = requestAnimationFrame(animateScroll);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    
    // Aguarda o menu fechar antes de fazer scroll
    setTimeout(() => {
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 64; // Mobile navbar height
        const targetPosition = targetElement.offsetTop - navbarHeight;
        smoothScrollTo(targetPosition);
      }
    }, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-neutral-200 dark:border-[#1a1a1a] bg-neutral-50 dark:bg-[#0f0f0f]">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-sm transition-colors z-10 cursor-pointer"
            aria-label={t.mobileMenu.close}
          >
            <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </button>
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Strict.Dev" className="h-14 w-auto" />
          </div>
          <p className="text-center text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
            {t.mobileMenu.tagline}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6">
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 px-4">{t.mobileMenu.navigation}</p>
            <div className="space-y-1">
              <a 
                href="#services" 
                onClick={(e) => handleLinkClick(e, '#services')}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.services}
              </a>
              <a 
                href="#compliance" 
                onClick={(e) => handleLinkClick(e, '#compliance')}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.compliance}
              </a>
              <a 
                href="#configurator" 
                onClick={(e) => handleLinkClick(e, '#configurator')}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.configurator || "Orçamento"}
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleLinkClick(e, '#about')}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.about}
              </a>
            </div>
          </div>

          {/* Theme & Language Controls */}
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 px-4">{t.mobileMenu.preferences}</p>
            <div className="px-4">
              <ThemeLanguageControls />
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            asChild
            className="w-full bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white rounded-none px-6 h-12 text-[9px] font-bold uppercase tracking-widest shadow-lg transition-all cursor-pointer mb-6"
          >
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>
              {t.mobileMenu.cta}
              <FileText className="w-3 h-3 ml-2" />
            </a>
          </Button>

          {/* Footer Info */}
          <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-[#1a1a1a]">
            <p className="text-[9px] text-center text-neutral-400 uppercase tracking-wider">
              © 2025 Strict.Dev. {t.footer.copyright}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
