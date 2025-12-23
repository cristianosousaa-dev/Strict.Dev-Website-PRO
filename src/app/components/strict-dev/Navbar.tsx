import { Button } from "../ui/button";
import { Menu, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeLanguageControls } from "./ThemeLanguageControls";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTheme();

  // Função de scroll suave (mesma do BackToTop)
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 segundo
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const easeInOutQuad = (t: number) => 
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#") {
      // Se for o logo, volta para o topo
      smoothScrollTo(0);
    } else {
      // Se for link de seção, calcula posição
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Altura do navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;
        smoothScrollTo(targetPosition);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0a0a0a] backdrop-blur-md border-b border-neutral-200 dark:border-[#1a1a1a] h-14 md:h-20 transition-all duration-300">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl h-full flex items-center justify-between">
          {/* Logo Section - DESKTOP ONLY */}
          <div className="hidden md:flex items-center gap-3 md:gap-4 md:pr-8 h-full md:border-r md:border-neutral-100 md:dark:border-[#1a1a1a] lg:border-r-0 lg:pr-0 md:flex-initial justify-start">
              <a 
                href="#" 
                aria-label={t.aria.backToHome} 
                className="flex items-center h-full cursor-pointer"
                onClick={(e) => handleNavClick(e, "#")}
              >
                 <Logo className="md:h-[70px] w-auto object-contain" />
            </a>
          </div>

          {/* Mobile Navigation Links - MOBILE ONLY */}
          <div className="flex md:hidden items-center gap-1 h-full flex-1">
            {[
              { label: t.nav.services, href: "#services" },
              { label: t.nav.compliance, href: "#compliance" },
              { label: t.nav.configurator || "Orçamento", href: "#configurator" },
              { label: t.nav.about, href: "#about" }
            ].map((item, idx) => (
              <a 
                key={idx}
                href={item.href} 
                aria-label={`Navegar para secção ${item.label}`}
                className="h-full flex items-center px-2.5 text-[9px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all cursor-pointer"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 h-full">
            {[
                { label: t.nav.services, href: "#services" },
                { label: t.nav.compliance, href: "#compliance" },
                { label: t.nav.configurator || "Orçamento", href: "#configurator" },
                { label: t.nav.about, href: "#about" }
            ].map((item, idx) => (
                <a 
                    key={idx}
                    href={item.href} 
                    aria-label={`Navegar para secção ${item.label}`}
                    className="h-full flex items-center px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l border-transparent hover:border-neutral-100 dark:hover:border-[#1a1a1a] cursor-pointer relative group overflow-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f5e50]"
                    onClick={(e) => handleNavClick(e, item.href)}
                >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2f5e50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
            ))}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-2 md:gap-6 md:pl-6 md:border-l md:border-neutral-100 md:dark:border-[#1a1a1a] h-full">
            <div className="hidden xl:block text-right">
                <p className="text-[9px] uppercase text-neutral-400 font-bold tracking-wider">{t.nav.location}</p>
                <p className="text-[10px] font-medium text-neutral-900 dark:text-neutral-100">{t.nav.locationValue}</p>
            </div>
            <Button 
                asChild
                className="hidden md:flex bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white rounded-none px-7 h-11 text-[9px] font-bold uppercase tracking-widest shadow-none hover:shadow-lg hover:shadow-[#2f5e50]/20 transition-all duration-500 cursor-pointer group border border-transparent hover:border-[#2f5e50]"
            >
                <a href="#contact">
                    {t.nav.cta}
                    <FileText className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden rounded-none cursor-pointer h-full w-11 md:w-14 hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]"
              onClick={() => setMobileMenuOpen(true)}
            >
                <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </Button>
            <div className="hidden md:block">
              <ThemeLanguageControls />
            </div>
        </div>
      </div>
    </nav>

    <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}