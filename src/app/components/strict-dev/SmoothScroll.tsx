import { useEffect } from "react";

/**
 * Componente para melhorar o smooth scroll e compensar a navbar fixa
 * Otimizado para mobile: scroll rápido e sem travamentos
 * Desktop: mantém scroll suave e elegante
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
          
          // Mobile: scroll otimizado com requestAnimationFrame
          // Desktop: usa scroll nativo do browser
          if (isMobile) {
            // Cancela scroll anterior se existir
            if ((window as any).__scrollRafId) {
              cancelAnimationFrame((window as any).__scrollRafId);
            }
            
            const startPosition = window.scrollY;
            const distance = offsetPosition - startPosition;
            const duration = 500; // Mobile: 500ms (mais rápido)
            const startTime = performance.now();
            
            // Easing otimizado para mobile
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            
            const animateScroll = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutCubic(progress);
              
              window.scrollTo(0, startPosition + distance * easedProgress);

              if (progress < 1) {
                (window as any).__scrollRafId = requestAnimationFrame(animateScroll);
              }
            };
            
            (window as any).__scrollRafId = requestAnimationFrame(animateScroll);
          } else {
            // Desktop: usa scroll nativo
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
      // Cleanup: cancela animações pendentes
      if ((window as any).__scrollRafId) {
        cancelAnimationFrame((window as any).__scrollRafId);
      }
    };
  }, []);

  return null;
}
