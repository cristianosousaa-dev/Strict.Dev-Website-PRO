import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { language } = useTheme();

  // Service routes mapping
  const serviceRoutes: Record<string, { pt: string; en: string }> = {
    '/servicos/desenvolvimento-web': {
      pt: 'Criação de Sites',
      en: 'Web Development'
    },
    '/servicos/agentes-ia': {
      pt: 'Agentes de IA',
      en: 'AI Agents'
    },
    '/servicos/loja-online': {
      pt: 'E-commerce',
      en: 'E-commerce'
    },
    '/servicos/rgpd-dados': {
      pt: 'Conformidade RGPD',
      en: 'GDPR Compliance'
    },
    '/servicos/manutencao': {
      pt: 'Manutenção',
      en: 'Maintenance'
    },
    '/servicos/infraestrutura': {
      pt: 'Infraestrutura',
      en: 'Infrastructure'
    }
  };

  const homeLabel = language === 'pt' ? 'Início' : 'Home';
  const servicesLabel = language === 'pt' ? 'Serviços' : 'Services';

  // Build breadcrumb items
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: homeLabel, path: '/' }];

    // Check if we're on a service page
    const serviceRoute = serviceRoutes[location.pathname];
    if (serviceRoute) {
      items.push({ label: servicesLabel, path: '/#services' });
      items.push({
        label: language === 'pt' ? serviceRoute.pt : serviceRoute.en,
        path: location.pathname
      });
    }

    return items;
  };

  const breadcrumbs = buildBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav
      aria-label={language === 'pt' ? 'Navegação hierárquica' : 'Breadcrumb navigation'}
      className="fixed top-14 md:top-20 left-0 right-0 z-40 hidden md:block bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-100 dark:border-[#1a1a1a] transition-colors duration-300"
    >
      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        <ol className="flex items-center gap-1.5 py-2.5 text-[9px] uppercase tracking-[0.2em] font-medium">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {!isFirst && (
                  <ChevronRight className="w-2.5 h-2.5 text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="text-[#2f5e50] dark:text-[#3a7462]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-[#2f5e50] dark:hover:text-[#3a7462] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;