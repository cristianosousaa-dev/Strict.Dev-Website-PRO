/**
 * Breadcrumb data for all service pages
 * Strict.Dev - Swiss Style
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const getBreadcrumbs = (
  serviceKey: string,
  language: 'pt' | 'en'
): BreadcrumbItem[] => {
  const baseItems: BreadcrumbItem[] = [
    { name: language === 'pt' ? 'Início' : 'Home', url: '/' },
    { name: language === 'pt' ? 'Serviços' : 'Services', url: '/#services' }
  ];

  const serviceNames: Record<string, { pt: string; en: string; url: string }> = {
    'web-development': {
      pt: 'Criação de Sites',
      en: 'Web Development',
      url: '/servicos/desenvolvimento-web'
    },
    'ai-agents': {
      pt: 'Agentes de IA',
      en: 'AI Agents',
      url: '/servicos/agentes-ia'
    },
    'ecommerce': {
      pt: 'E-commerce',
      en: 'E-commerce',
      url: '/servicos/loja-online'
    },
    'gdpr': {
      pt: 'RGPD Básico',
      en: 'Basic GDPR',
      url: '/servicos/rgpd-dados'
    },
    'maintenance': {
      pt: 'Manutenção',
      en: 'Maintenance',
      url: '/servicos/manutencao'
    },
    'infrastructure': {
      pt: 'Infraestrutura',
      en: 'Infrastructure',
      url: '/servicos/infraestrutura'
    }
  };

  const service = serviceNames[serviceKey];
  if (service) {
    baseItems.push({
      name: language === 'pt' ? service.pt : service.en,
      url: service.url
    });
  }

  return baseItems;
};
