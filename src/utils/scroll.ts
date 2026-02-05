// Easing function para scroll suave desktop
const easeInOutQuad = (t: number): number => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Easing otimizado para mobile - ultra suave como desktop
const easeOutQuart = (t: number): number => 
  1 - Math.pow(1 - t, 4);

/**
 * Scroll suave ultra-otimizado
 * Mobile: 600ms com easeOutQuart (fluido como desktop)
 * Desktop: 1000ms com easeInOutQuad (mantido original)
 * @param targetPosition - Posição Y de destino
 * @param duration - Duração da animação em ms (opcional)
 */
export function smoothScrollTo(targetPosition: number, duration?: number): void {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const isMobile = window.innerWidth < 768;
  
  // Mobile: 600ms (fluido mas não muito rápido)
  // Desktop: 1000ms (mantém original)
  const scrollDuration = duration ?? (isMobile ? 600 : 1000);
  const easingFunction = isMobile ? easeOutQuart : easeInOutQuad;
  
  const startTime = performance.now();
  let rafId: number;

  // Cancela animação anterior se existir (evita conflitos)
  if ((window as any).__scrollRafId) {
    cancelAnimationFrame((window as any).__scrollRafId);
  }

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      rafId = requestAnimationFrame(animateScroll);
      (window as any).__scrollRafId = rafId;
    } else {
      // Garante posição final exata
      window.scrollTo(0, targetPosition);
      delete (window as any).__scrollRafId;
    }
  };

  rafId = requestAnimationFrame(animateScroll);
  (window as any).__scrollRafId = rafId;
}

/**
 * Scroll suave para o topo da página
 * @param duration - Duração da animação em ms (opcional)
 */
export function smoothScrollToTop(duration?: number): void {
  smoothScrollTo(0, duration);
}

/**
 * Scroll suave para um elemento específico
 * @param selector - Seletor CSS do elemento
 * @param duration - Duração da animação em ms (opcional)
 */
export function smoothScrollToElement(selector: string, duration?: number): void {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const isMobile = window.innerWidth < 768;
  const navbarHeight = isMobile ? 64 : 80;
  const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
  
  smoothScrollTo(targetPosition, duration);
}