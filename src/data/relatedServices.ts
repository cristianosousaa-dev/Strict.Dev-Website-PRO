/**
 * Related services mapping for internal cross-linking (SEO)
 * Each service maps to 3 related services for contextual internal links
 */

export interface RelatedService {
  key: string;
  path: string;
  pt: { name: string; desc: string };
  en: { name: string; desc: string };
}

const allServices: RelatedService[] = [
  {
    key: 'web-development',
    path: '/servicos/desenvolvimento-web',
    pt: { name: 'Criação de Sites', desc: 'Websites profissionais focados em conversão e SEO.' },
    en: { name: 'Website Creation', desc: 'Professional websites focused on conversion and SEO.' },
  },
  {
    key: 'ai-agents',
    path: '/servicos/agentes-ia',
    pt: { name: 'Chatbot com IA', desc: 'Atendimento automatizado 24/7 com inteligência artificial.' },
    en: { name: 'AI Chatbot', desc: 'Automated 24/7 customer service with artificial intelligence.' },
  },
  {
    key: 'ecommerce',
    path: '/servicos/loja-online',
    pt: { name: 'Loja Online', desc: 'E-commerce com pagamentos integrados e gestão de stock.' },
    en: { name: 'Online Store', desc: 'E-commerce with integrated payments and stock management.' },
  },
  {
    key: 'gdpr',
    path: '/servicos/rgpd-dados',
    pt: { name: 'Conformidade RGPD', desc: 'Proteção de dados e conformidade legal para empresas.' },
    en: { name: 'GDPR Compliance', desc: 'Data protection and legal compliance for businesses.' },
  },
  {
    key: 'maintenance',
    path: '/servicos/manutencao',
    pt: { name: 'Manutenção de Sites', desc: 'Atualizações de segurança, backups e monitorização 24/7.' },
    en: { name: 'Website Maintenance', desc: 'Security updates, backups and 24/7 monitoring.' },
  },
  {
    key: 'infrastructure',
    path: '/servicos/infraestrutura',
    pt: { name: 'Hosting Cloud', desc: 'CDN global, SSL e proteção DDoS para o seu website.' },
    en: { name: 'Cloud Hosting', desc: 'Global CDN, SSL and DDoS protection for your website.' },
  },
];

const relatedMap: Record<string, string[]> = {
  'web-development': ['ecommerce', 'ai-agents', 'maintenance'],
  'ai-agents': ['web-development', 'ecommerce', 'gdpr'],
  'ecommerce': ['web-development', 'ai-agents', 'maintenance'],
  'gdpr': ['web-development', 'infrastructure', 'maintenance'],
  'maintenance': ['web-development', 'infrastructure', 'gdpr'],
  'infrastructure': ['maintenance', 'web-development', 'ecommerce'],
};

export function getRelatedServices(serviceKey: string): RelatedService[] {
  const keys = relatedMap[serviceKey] || [];
  return keys
    .map((k) => allServices.find((s) => s.key === k))
    .filter((s): s is RelatedService => !!s);
}