import { useEffect, useState } from 'react';

/**
 * Hook para detectar se está em mobile
 * @param breakpoint - Largura em pixels para considerar mobile (padrão: 768px)
 * @returns boolean indicando se está em mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
