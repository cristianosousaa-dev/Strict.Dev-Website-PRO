/**
 * Smooth scroll utility for internal navigation
 * Swiss Style: Clean, precise, minimal
 */

export const smoothScrollTo = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const smoothScrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Hash-based navigation (for links like /#services)
export const handleHashNavigation = (): void => {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace('#', '');
    setTimeout(() => smoothScrollTo(id, 80), 100);
  }
};
