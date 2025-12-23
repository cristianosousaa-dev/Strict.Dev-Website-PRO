// Easing function para scroll suave
const easeInOutQuad = (t: number): number => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Easing otimizado para mobile (mais rápido e fluido)
const easeOutCubic = (t: number): number => 
  1 - Math.pow(1 - t, 3);

/**
 * Scroll suave para uma posição específica
 * @param targetPosition - Posição Y de destino
 * @param duration - Duração da animação em ms (padrão: adaptativo)
 */
export function smoothScrollTo(targetPosition: number, duration?: number): void {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const isMobile = window.innerWidth < 768;
  
  // Mobile: scroll mais rápido e responsivo
  // Desktop: mantém suave e elegante
  const scrollDuration = duration ?? (isMobile ? 500 : 1000);
  const easingFunction = isMobile ? easeOutCubic : easeInOutQuad;
  
  const startTime = performance.now();
  let rafId: number;

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      rafId = requestAnimationFrame(animateScroll);
    }
  };

  // Cancela animações anteriores em mobile para evitar conflitos
  if (isMobile && (window as any).__scrollRafId) {
    cancelAnimationFrame((window as any).__scrollRafId);
  }

  rafId = requestAnimationFrame(animateScroll);
  
  if (isMobile) {
    (window as any).__scrollRafId = rafId;
  }
}

/**
 * Scroll suave para o topo da página
 * @param duration - Duração da animação em ms (padrão: adaptativo)
 */
export function smoothScrollToTop(duration?: number): void {
  smoothScrollTo(0, duration);
}

/**
 * Scroll suave para um elemento específico
 * @param selector - Seletor CSS do elemento
 * @param duration - Duração da animação em ms (padrão: adaptativo)
 */
export function smoothScrollToElement(selector: string, duration?: number): void {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const isMobile = window.innerWidth < 768;
  const navbarHeight = isMobile ? 64 : 80;
  const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
  
  smoothScrollTo(targetPosition, duration);
}
