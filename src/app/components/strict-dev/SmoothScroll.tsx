import { useEffect } from "react";
import { smoothScrollTo } from "../../../utils/scroll";

/**
 * Scroll suave com offset da navbar e atualização correta do hash.
 * Funciona mesmo quando clicas em elementos dentro do link (icon, span, etc).
 */
export function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Se outro handler já tratou o clique (Navbar, MobileMenu, Footer), não mexe
      if (e.defaultPrevented) return;

      const link = (e.target as HTMLElement | null)?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      // Só âncoras com hash
      if (!link.hash) return;

      // Só links internos no mesmo origin
      if (link.origin !== window.location.origin) return;

      // Só âncoras na mesma página (mesmo pathname)
      if (link.pathname !== window.location.pathname) return;

      const hash = link.hash;
      const element = document.querySelector(hash) as HTMLElement | null;
      if (!element) return;

      e.preventDefault();

      const isMobile = window.innerWidth < 768;
      const navbarHeight = isMobile ? 64 : 80;

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      if (isMobile) {
        smoothScrollTo(offsetPosition);
      } else {
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

      // Atualiza a barra de endereços sem criar entradas extra no histórico
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);

      const rafId = (window as any).__scrollRafId;
      if (rafId) {
        cancelAnimationFrame(rafId);
        delete (window as any).__scrollRafId;
      }
    };
  }, []);

  return null;
}
