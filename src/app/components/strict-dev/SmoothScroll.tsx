import { useEffect } from "react";

/**
 * Componente para melhorar o smooth scroll e compensar a navbar fixa
 * Adiciona offset de 64px em mobile e 80px em desktop (altura da navbar) ao fazer scroll para âncoras
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
          
          // Offset para compensar a navbar fixa - 64px mobile, 80px desktop
          const navbarHeight = window.innerWidth < 768 ? 64 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
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