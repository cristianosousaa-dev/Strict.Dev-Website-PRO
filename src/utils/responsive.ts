import { useEffect, useState } from 'react';

/**
 * Hook para detectar se está em mobile (com debounce)
 * @param breakpoint - Largura em pixels para considerar mobile (padrão: 768px)
 * @returns boolean indicando se está em mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedCheck = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', debouncedCheck);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [breakpoint]);

  return isMobile;
}