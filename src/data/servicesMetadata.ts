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
      title: 'Criação de Sites Profissionais Portugal | Strict.Dev',
      description: 'Criação de sites profissionais em Portugal. Desenvolvimento web com performance superior, SEO otimizado e design responsivo. Proposta personalizada em 24h para Lisboa, Porto, Braga e Coimbra.',
      keywords: 'criação de sites portugal, criar site profissional, desenvolvimento web, web design lisboa, web design porto, agência digital portugal, site profissional para empresas, criação de websites braga, seo portugal, sites para PMEs'
    },
    en: {
      title: 'Professional Website Creation Portugal | Strict.Dev',
      description: 'Professional website creation in Portugal. Web development with superior performance, optimised SEO and responsive design. Personalised proposal in 24h for Lisbon, Porto, Braga and Coimbra.',
      keywords: 'website creation portugal, professional web development, web design lisbon, web design porto, digital agency portugal, professional website for business, website creation braga, seo portugal, websites for SMEs'
    },
    canonical: '/servicos/desenvolvimento-web'
  },
  'ai-agents': {
    pt: {
      title: 'Chatbot IA para Empresas Portugal | Strict.Dev',
      description: 'Chatbot com inteligência artificial para empresas em Portugal. Atendimento automatizado 24/7, qualificação de leads e integração WhatsApp Business. Proposta em 24h.',
      keywords: 'chatbot ia portugal, chatbot inteligência artificial, chatbot para empresas, atendimento automatizado, chatbot whatsapp business, agentes ia portugal, automação atendimento, bot conversacional PMEs'
    },
    en: {
      title: 'AI Chatbot for Business Portugal | Strict.Dev',
      description: 'AI chatbot for companies in Portugal. Automated 24/7 customer service, lead qualification and WhatsApp Business integration. Proposal in 24h.',
      keywords: 'ai chatbot portugal, artificial intelligence chatbot, chatbot for business, automated customer service, whatsapp business chatbot, ai agents portugal, service automation, conversational bot SMEs'
    },
    canonical: '/servicos/agentes-ia'
  },
  'ecommerce': {
    pt: {
      title: 'Criar Loja Online Portugal | Strict.Dev',
      description: 'Criação de lojas online profissionais em Portugal. E-commerce com pagamentos integrados, gestão de stock e design otimizado para conversão. Proposta em 24h.',
      keywords: 'criar loja online portugal, loja online profissional, e-commerce portugal, vender online, loja virtual lisboa, loja online porto, plataforma vendas online, criação e-commerce braga, loja com multibanco mb way'
    },
    en: {
      title: 'Create Online Store Portugal | Strict.Dev',
      description: 'Professional online store creation in Portugal. E-commerce with integrated payments, stock management and conversion-optimised design. Proposal in 24h.',
      keywords: 'create online store portugal, professional online store, e-commerce portugal, sell online, virtual store lisbon, online store porto, online sales platform, e-commerce creation braga, store with multibanco mb way'
    },
    canonical: '/servicos/loja-online'
  },
  'gdpr': {
    pt: {
      title: 'Conformidade RGPD Portugal | Strict.Dev',
      description: 'Implementação RGPD para empresas e PMEs em Portugal. Cookies, políticas de privacidade, formulários conformes e proteção de dados. Auditoria e proposta em 24h.',
      keywords: 'rgpd portugal, conformidade rgpd empresas, proteção de dados, políticas de privacidade, cookies rgpd, consultoria rgpd PMEs, gdpr portugal, regulamento proteção dados'
    },
    en: {
      title: 'GDPR Compliance Portugal | Strict.Dev',
      description: 'GDPR implementation for companies and SMEs in Portugal. Cookies, privacy policies, compliant forms and data protection. Audit and proposal in 24h.',
      keywords: 'gdpr portugal, gdpr compliance companies, data protection, privacy policies, gdpr cookies, gdpr consultancy SMEs, gdpr regulation, data protection regulation'
    },
    canonical: '/servicos/rgpd-dados'
  },
  'maintenance': {
    pt: {
      title: 'Manutenção de Websites Portugal | Strict.Dev',
      description: 'Manutenção profissional de websites em Portugal. Atualizações de segurança, backups diários, monitorização 24/7 e suporte técnico. Uptime garantido 99.9%.',
      keywords: 'manutenção website portugal, manutenção de sites, suporte técnico web, backups website, monitorização 24/7, atualizações segurança, manutenção site profissional, suporte web portugal'
    },
    en: {
      title: 'Website Maintenance Portugal | Strict.Dev',
      description: 'Professional website maintenance in Portugal. Security updates, daily backups, 24/7 monitoring and technical support. Guaranteed 99.9% uptime.',
      keywords: 'website maintenance portugal, site maintenance, web technical support, website backups, 24/7 monitoring, security updates, professional site maintenance, web support portugal'
    },
    canonical: '/servicos/manutencao'
  },
  'infrastructure': {
    pt: {
      title: 'Hosting Cloud Portugal | Strict.Dev',
      description: 'Hosting cloud profissional em Portugal. CDN global Cloudflare, SSL gratuito, backups automáticos e proteção DDoS. Performance e segurança para o seu website.',
      keywords: 'hosting cloud portugal, alojamento web portugal, hosting profissional, cdn portugal, ssl certificado, servidor cloud, hosting website, alojamento cloud, vps portugal'
    },
    en: {
      title: 'Cloud Hosting Portugal | Strict.Dev',
      description: 'Professional cloud hosting in Portugal. Global Cloudflare CDN, free SSL, automatic backups and DDoS protection. Performance and security for your website.',
      keywords: 'cloud hosting portugal, web hosting portugal, professional hosting, cdn portugal, ssl certificate, cloud server, website hosting, cloud hosting, vps portugal'
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