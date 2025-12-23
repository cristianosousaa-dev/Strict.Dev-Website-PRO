// Easing function para scroll suave
const easeInOutQuad = (t: number): number => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Easing linear para mobile (transição fluida e consistente)
const linear = (t: number): number => t;

/**
 * Scroll suave para uma posição específica
 * @param targetPosition - Posição Y de destino
 * @param duration - Duração da animação em ms (padrão: 1000ms)
 */
export function smoothScrollTo(targetPosition: number, duration: number = 1000): void {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  
  // Detecta se é mobile para usar easing linear (mais fluido)
  const isMobile = window.innerWidth < 768;
  const easingFunction = isMobile ? linear : easeInOutQuad;

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
}

/**
 * Scroll suave para o topo da página
 * @param duration - Duração da animação em ms (padrão: 1000ms)
 */
export function smoothScrollToTop(duration: number = 1000): void {
  smoothScrollTo(0, duration);
}

/**
 * Scroll suave para um elemento específico
 * @param selector - Seletor CSS do elemento
 * @param duration - Duração da animação em ms (padrão: 1000ms)
 */
export function smoothScrollToElement(selector: string, duration: number = 1000): void {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(targetPosition, duration);
}