/**
 * Dados centralizados de navegação de serviços
 * Usados por Navbar.tsx e MobileMenu.tsx
 */

export interface ServiceNavItem {
  name: string;
  path: string;
}

const servicesData: Record<string, ServiceNavItem[]> = {
  pt: [
    { name: "Criação de Sites", path: "/servicos/desenvolvimento-web" },
    { name: "Agentes de IA", path: "/servicos/agentes-ia" },
    { name: "Loja Online", path: "/servicos/loja-online" },
    { name: "RGPD & Dados", path: "/servicos/rgpd-dados" },
    { name: "Manutenção Técnica", path: "/servicos/manutencao" },
    { name: "Infraestrutura", path: "/servicos/infraestrutura" },
  ],
  en: [
    { name: "Website Creation", path: "/servicos/desenvolvimento-web" },
    { name: "AI Agents", path: "/servicos/agentes-ia" },
    { name: "E-commerce Store", path: "/servicos/loja-online" },
    { name: "GDPR & Data", path: "/servicos/rgpd-dados" },
    { name: "Technical Maintenance", path: "/servicos/manutencao" },
    { name: "Infrastructure", path: "/servicos/infraestrutura" },
  ],
};

export function getServiceNavItems(language: string): ServiceNavItem[] {
  return servicesData[language] || servicesData.pt;
}