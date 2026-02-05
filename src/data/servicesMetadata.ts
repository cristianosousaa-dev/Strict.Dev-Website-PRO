/**
 * SEO Metadata for all service pages
 * Strict.Dev - Swiss Style
 */

interface ServiceMetadata {
  pt: {
    title: string;
    description: string;
    keywords: string;
  };
  en: {
    title: string;
    description: string;
    keywords: string;
  };
  canonical: string;
}

export const servicesMetadata: Record<string, ServiceMetadata> = {
  'web-development': {
    pt: {
      title: 'Criação de Sites Profissionais Portugal | Strict.Dev — Web Development',
      description: 'Desenvolvimento de websites profissionais em Portugal com performance superior e SEO otimizado. Criação de sites em Lisboa, Porto, Braga, Coimbra. Proposta em 24h.',
      keywords: 'criação de sites portugal, desenvolvimento web lisboa, website profissional porto, web design braga, sites para empresas portugal, criação sites coimbra, desenvolvimento web profissional, seo portugal'
    },
    en: {
      title: 'Professional Website Development Portugal | Strict.Dev',
      description: 'Professional website development in Portugal with superior performance and optimized SEO. Website creation in Lisbon, Porto, Braga, Coimbra. Proposal in 24h.',
      keywords: 'website creation portugal, web development lisbon, professional website porto, web design braga, business websites portugal, website creation coimbra, professional web development, seo portugal'
    },
    canonical: '/servicos/desenvolvimento-web'
  },
  'ai-agents': {
    pt: {
      title: 'Chatbot com IA Portugal | Strict.Dev — Agentes Inteligentes',
      description: 'Chatbots com IA para empresas em Portugal. Atendimento 24/7, automação e qualificação de leads em Lisboa, Porto, Braga. Solução completa para PMEs.',
      keywords: 'chatbot ia portugal, chatbot inteligente lisboa, atendimento automatizado porto, bot conversacional, ia para empresas portugal, chatbot whatsapp business, agentes ia'
    },
    en: {
      title: 'AI Chatbot Portugal | Strict.Dev — Intelligent Agents',
      description: 'AI chatbots for companies in Portugal. 24/7 service, automation and lead qualification in Lisbon, Porto, Braga. Complete solution for SMEs.',
      keywords: 'ai chatbot portugal, intelligent chatbot lisbon, automated customer service porto, conversational bot, ai for business portugal, whatsapp business chatbot, ai agents'
    },
    canonical: '/servicos/agentes-ia'
  },
  'ecommerce': {
    pt: {
      title: 'Loja Online Portugal | Strict.Dev — E-commerce Profissional',
      description: 'Criação de lojas online em Portugal com pagamentos, gestão de stock e painel admin. E-commerce em Lisboa, Porto, Braga. Solução completa para PMEs.',
      keywords: 'loja online portugal, e-commerce lisboa, criar loja virtual porto, vender online portugal, loja profissional braga, ecommerce coimbra, plataforma vendas online'
    },
    en: {
      title: 'Online Store Portugal | Strict.Dev — Professional E-commerce',
      description: 'Online store creation in Portugal with payments, stock management and admin panel. E-commerce in Lisbon, Porto, Braga. Complete solution for SMEs.',
      keywords: 'online store portugal, e-commerce lisbon, create virtual store porto, sell online portugal, professional store braga, ecommerce coimbra, online sales platform'
    },
    canonical: '/servicos/loja-online'
  },
  'gdpr': {
    pt: {
      title: 'RGPD Portugal | Strict.Dev — Conformidade Proteção de Dados',
      description: 'Implementação RGPD básica para PMEs em Portugal. Cookies, políticas de privacidade e formulários conformes em Lisboa, Porto, Braga. Proteção de dados simplificada.',
      keywords: 'rgpd portugal, gdpr lisboa, proteção de dados porto, políticas de privacidade portugal, conformidade rgpd empresas, cookies gdpr, consultoria rgpd'
    },
    en: {
      title: 'GDPR Portugal | Strict.Dev — Data Protection Compliance',
      description: 'Basic GDPR implementation for SMEs in Portugal. Cookies, privacy policies and compliant forms in Lisbon, Porto, Braga. Simplified data protection.',
      keywords: 'gdpr portugal, gdpr lisbon, data protection porto, privacy policies portugal, gdpr compliance companies, gdpr cookies, gdpr consultancy'
    },
    canonical: '/servicos/rgpd-dados'
  },
  'maintenance': {
    pt: {
      title: 'Manutenção Websites Portugal | Strict.Dev — Suporte Técnico 24/7',
      description: 'Manutenção de websites em Portugal: atualizações, backups, monitorização 24/7. Suporte em Lisboa, Porto, Braga. Uptime garantido 99.9%.',
      keywords: 'manutenção website portugal, suporte técnico lisboa, backups sites porto, monitorização websites, updates wordpress portugal, manutenção site braga, suporte web 24/7'
    },
    en: {
      title: 'Website Maintenance Portugal | Strict.Dev — 24/7 Technical Support',
      description: 'Website maintenance in Portugal: updates, backups, 24/7 monitoring. Support in Lisbon, Porto, Braga. Uptime guaranteed 99.9%.',
      keywords: 'website maintenance portugal, technical support lisbon, site backups porto, website monitoring, wordpress updates portugal, site maintenance braga, 24/7 web support'
    },
    canonical: '/servicos/manutencao'
  },
  'infrastructure': {
    pt: {
      title: 'Hosting Cloud Portugal | Strict.Dev — Infraestrutura Profissional',
      description: 'Infraestrutura cloud profissional em Portugal. CDN global, SSL, backups automáticos. Hosting em Lisboa, Porto, Braga. Performance e segurança garantidas.',
      keywords: 'cloud hosting portugal, infraestrutura cloud lisboa, cdn portugal, ssl certificado, hosting profissional porto, servidor web braga, vps portugal'
    },
    en: {
      title: 'Cloud Hosting Portugal | Strict.Dev — Professional Infrastructure',
      description: 'Professional cloud infrastructure in Portugal. Global CDN, SSL, automatic backups. Hosting in Lisbon, Porto, Braga. Guaranteed performance and security.',
      keywords: 'cloud hosting portugal, cloud infrastructure lisbon, cdn portugal, ssl certificate, professional hosting porto, web server braga, vps portugal'
    },
    canonical: '/servicos/infraestrutura'
  }
};

export const getServiceMetadata = (serviceKey: string, language: 'pt' | 'en') => {
  const metadata = servicesMetadata[serviceKey];
  if (!metadata) {
    return {
      title: 'Strict.Dev — Premium IT Consultancy',
      description: 'Premium IT consultancy focused on SMEs in Portugal.',
      keywords: 'it consultancy, web development, portugal',
      canonical: '/'
    };
  }

  return {
    ...metadata[language],
    canonical: metadata.canonical
  };
};