import { useEffect } from "react";
import { smoothScrollTo } from "../../../utils/scroll";

/**
 * Componente para scroll suave otimizado
 * Mobile: 600ms, easeOutQuart (fluido como desktop)
 * Desktop: usa scroll nativo do browser
 */
export function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      // Verifica se é um link de âncora interno
      if (target.tagName === "A" && target.hash && target.pathname === window.location.pathname) {
        const hash = target.hash;
        const element = document.querySelector(hash);
        
        if (element) {
          e.preventDefault();
          
          const isMobile = window.innerWidth < 768;
          const navbarHeight = isMobile ? 64 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          // Mobile: usa função otimizada
          // Desktop: scroll nativo
          if (isMobile) {
            smoothScrollTo(offsetPosition);
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
          
          // Atualiza a URL sem forçar scroll
          history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}