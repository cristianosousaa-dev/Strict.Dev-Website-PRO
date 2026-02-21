/**
 * FAQ Data for all service pages + homepage
 * Strict.Dev - Bilingual (PT-PT / EN)
 * Used for both visual FAQ accordion and FAQPage schema (rich snippets)
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQ {
  pt: FAQItem[];
  en: FAQItem[];
}

export const faqData: Record<string, ServiceFAQ> = {
  'web-development': {
    pt: [
      {
        question: 'Quanto tempo demora a criar um website profissional?',
        answer: 'Um website institucional profissional demora entre 2 a 4 semanas, dependendo da complexidade e do volume de conteúdo. Projetos mais simples (landing pages) podem ficar prontos em 5 a 7 dias úteis. Entregamos sempre um cronograma detalhado na proposta inicial.'
      },
      {
        question: 'Qual é o investimento para criar um site em Portugal?',
        answer: 'Os nossos projetos de desenvolvimento web começam a partir de 800 euros para websites institucionais. O investimento final depende do número de páginas, funcionalidades específicas e integração com sistemas externos. Enviamos proposta detalhada e personalizada em 24 horas.'
      },
      {
        question: 'O website fica otimizado para motores de busca (SEO)?',
        answer: 'Sim. Todos os websites incluem otimização SEO técnica de raiz: meta tags, structured data (Schema.org), sitemap XML, robots.txt, URLs semânticas, performance otimizada (Core Web Vitals), imagens comprimidas e HTML semântico. Não é um extra — é parte do nosso processo standard.'
      },
      {
        question: 'Posso gerir o conteúdo do site sozinho depois?',
        answer: 'Sim. Configuramos um painel de gestão intuitivo para que possa atualizar textos, imagens e conteúdos sem necessidade de conhecimentos técnicos. Incluímos formação inicial e documentação de utilização.'
      },
      {
        question: 'O website é responsivo e funciona em telemóvel?',
        answer: 'Todos os nossos websites são mobile-first, ou seja, são desenhados primeiro para telemóvel e depois adaptados para desktop e tablet. Testamos em múltiplos dispositivos e browsers antes da entrega final.'
      }
    ],
    en: [
      {
        question: 'How long does it take to create a professional website?',
        answer: 'A professional institutional website takes between 2 to 4 weeks, depending on complexity and content volume. Simpler projects (landing pages) can be ready in 5 to 7 business days. We always deliver a detailed timeline with the initial proposal.'
      },
      {
        question: 'What is the investment to create a website in Portugal?',
        answer: 'Our web development projects start from 800 euros for institutional websites. The final investment depends on the number of pages, specific features and integration with external systems. We send a detailed and personalised proposal within 24 hours.'
      },
      {
        question: 'Is the website optimised for search engines (SEO)?',
        answer: 'Yes. All websites include technical SEO optimisation from the ground up: meta tags, structured data (Schema.org), XML sitemap, robots.txt, semantic URLs, optimised performance (Core Web Vitals), compressed images and semantic HTML. It is not an extra — it is part of our standard process.'
      },
      {
        question: 'Can I manage the website content myself afterwards?',
        answer: 'Yes. We set up an intuitive management panel so you can update texts, images and content without any technical knowledge. We include initial training and user documentation.'
      },
      {
        question: 'Is the website responsive and does it work on mobile?',
        answer: 'All our websites are mobile-first, meaning they are designed first for mobile and then adapted for desktop and tablet. We test on multiple devices and browsers before final delivery.'
      }
    ]
  },
  'ai-agents': {
    pt: [
      {
        question: 'O que é um chatbot com inteligência artificial?',
        answer: 'É um assistente virtual que utiliza IA para responder automaticamente a perguntas dos seus clientes, 24 horas por dia, 7 dias por semana. Pode ser integrado no seu website, WhatsApp Business ou redes sociais, qualificando leads e respondendo a dúvidas frequentes.'
      },
      {
        question: 'O chatbot pode ser personalizado para o meu negócio?',
        answer: 'Sim. Cada chatbot é treinado especificamente com informação do seu negócio: serviços, preços, horários, localização e perguntas frequentes dos seus clientes. O tom de comunicação é adaptado à identidade da sua marca.'
      },
      {
        question: 'Quanto custa implementar um chatbot com IA?',
        answer: 'Os projetos de chatbot com IA começam a partir de 500 euros para configurações básicas. O investimento varia conforme a complexidade das intenções, integrações com sistemas externos e volume de interações esperado. Proposta personalizada em 24h.'
      },
      {
        question: 'O chatbot substitui o atendimento humano?',
        answer: 'Não. O chatbot trata das perguntas repetitivas e qualificação inicial de leads, libertando a sua equipa para interações mais complexas e valiosas. Quando necessário, o chatbot transfere automaticamente a conversa para um operador humano.'
      },
      {
        question: 'Funciona com WhatsApp Business?',
        answer: 'Sim. Integramos chatbots com IA no WhatsApp Business, permitindo atendimento automatizado no canal preferido dos portugueses. Também funciona no website, Facebook Messenger e Instagram Direct.'
      }
    ],
    en: [
      {
        question: 'What is an AI chatbot?',
        answer: 'It is a virtual assistant that uses AI to automatically answer your customers\' questions, 24 hours a day, 7 days a week. It can be integrated into your website, WhatsApp Business or social media, qualifying leads and answering frequently asked questions.'
      },
      {
        question: 'Can the chatbot be customised for my business?',
        answer: 'Yes. Each chatbot is specifically trained with your business information: services, prices, schedules, location and your customers\' frequently asked questions. The communication tone is adapted to your brand identity.'
      },
      {
        question: 'How much does it cost to implement an AI chatbot?',
        answer: 'AI chatbot projects start from 500 euros for basic configurations. The investment varies according to the complexity of intents, integrations with external systems and expected interaction volume. Personalised proposal within 24h.'
      },
      {
        question: 'Does the chatbot replace human customer service?',
        answer: 'No. The chatbot handles repetitive questions and initial lead qualification, freeing your team for more complex and valuable interactions. When necessary, the chatbot automatically transfers the conversation to a human operator.'
      },
      {
        question: 'Does it work with WhatsApp Business?',
        answer: 'Yes. We integrate AI chatbots with WhatsApp Business, enabling automated service on the preferred channel. It also works on your website, Facebook Messenger and Instagram Direct.'
      }
    ]
  },
  'ecommerce': {
    pt: [
      {
        question: 'Quanto custa criar uma loja online em Portugal?',
        answer: 'Os projetos de loja online começam a partir de 1200 euros. O investimento final depende do número de produtos, métodos de pagamento, integrações logísticas e funcionalidades específicas. Enviamos proposta detalhada em 24 horas.'
      },
      {
        question: 'Que métodos de pagamento posso aceitar?',
        answer: 'Integramos todos os métodos de pagamento populares em Portugal: Multibanco, MB WAY, cartões Visa/Mastercard, PayPal, transferência bancária e pagamento contra-entrega. Utilizamos gateways seguros e certificados PCI DSS.'
      },
      {
        question: 'A loja online inclui gestão de stock?',
        answer: 'Sim. Todas as lojas incluem painel de gestão de inventário com controlo de stock em tempo real, alertas de stock baixo, variantes de produto (tamanho, cor) e gestão de encomendas com tracking automático.'
      },
      {
        question: 'Posso vender para fora de Portugal?',
        answer: 'Sim. Configuramos a loja com suporte multi-idioma e multi-moeda, cálculos de portes de envio internacionais e conformidade com regulamentos europeus de e-commerce (incluindo RGPD).'
      },
      {
        question: 'A loja é segura para os clientes comprarem?',
        answer: 'Totalmente. Utilizamos certificado SSL, encriptação de dados, gateways de pagamento certificados PCI DSS e conformidade total com RGPD. Os dados dos seus clientes estão sempre protegidos.'
      }
    ],
    en: [
      {
        question: 'How much does it cost to create an online store in Portugal?',
        answer: 'Online store projects start from 1200 euros. The final investment depends on the number of products, payment methods, logistics integrations and specific features. We send a detailed proposal within 24 hours.'
      },
      {
        question: 'What payment methods can I accept?',
        answer: 'We integrate all popular payment methods in Portugal: Multibanco, MB WAY, Visa/Mastercard cards, PayPal, bank transfer and cash on delivery. We use secure PCI DSS certified gateways.'
      },
      {
        question: 'Does the online store include stock management?',
        answer: 'Yes. All stores include an inventory management panel with real-time stock control, low stock alerts, product variants (size, colour) and order management with automatic tracking.'
      },
      {
        question: 'Can I sell outside of Portugal?',
        answer: 'Yes. We configure the store with multi-language and multi-currency support, international shipping calculations and compliance with European e-commerce regulations (including GDPR).'
      },
      {
        question: 'Is the store secure for customers to buy from?',
        answer: 'Absolutely. We use SSL certificates, data encryption, PCI DSS certified payment gateways and full GDPR compliance. Your customers\' data is always protected.'
      }
    ]
  },
  'gdpr': {
    pt: [
      {
        question: 'O meu negócio precisa de estar em conformidade com o RGPD?',
        answer: 'Sim. Qualquer empresa que recolha dados pessoais de cidadãos da UE (nome, email, telefone, cookies) é obrigada a cumprir o RGPD. Isto inclui formulários de contacto, newsletters, cookies de analytics e lojas online.'
      },
      {
        question: 'O que acontece se o meu site não estiver conforme o RGPD?',
        answer: 'As coimas por incumprimento podem atingir 20 milhões de euros ou 4% do volume de negócios anual (o que for superior). A CNPD (Comissão Nacional de Proteção de Dados) tem intensificado as fiscalizações em Portugal.'
      },
      {
        question: 'O que inclui o serviço de conformidade RGPD básica?',
        answer: 'Inclui: implementação de banner de cookies com consentimento granular, política de privacidade personalizada, política de cookies, formulários conformes com consentimento explícito, e configuração do Google Analytics em modo anonimizado.'
      },
      {
        question: 'Quanto tempo demora a implementar a conformidade RGPD?',
        answer: 'A implementação básica demora entre 3 a 5 dias úteis. Inclui auditoria ao website atual, implementação das correções necessárias e entrega de documentação. Projetos mais complexos podem demorar até 2 semanas.'
      },
      {
        question: 'Isto substitui um DPO (Data Protection Officer)?',
        answer: 'Não. O nosso serviço foca-se na conformidade técnica do website (cookies, formulários, políticas). Para necessidades mais abrangentes de proteção de dados organizacional, recomendamos a consulta de um DPO certificado.'
      }
    ],
    en: [
      {
        question: 'Does my business need to be GDPR compliant?',
        answer: 'Yes. Any company that collects personal data from EU citizens (name, email, phone, cookies) is required to comply with GDPR. This includes contact forms, newsletters, analytics cookies and online stores.'
      },
      {
        question: 'What happens if my website is not GDPR compliant?',
        answer: 'Fines for non-compliance can reach 20 million euros or 4% of annual turnover (whichever is higher). The CNPD (Portuguese Data Protection Authority) has been intensifying inspections in Portugal.'
      },
      {
        question: 'What does the basic GDPR compliance service include?',
        answer: 'It includes: cookie banner implementation with granular consent, customised privacy policy, cookie policy, compliant forms with explicit consent, and Google Analytics configuration in anonymised mode.'
      },
      {
        question: 'How long does it take to implement GDPR compliance?',
        answer: 'Basic implementation takes between 3 to 5 business days. It includes an audit of the current website, implementation of necessary corrections and delivery of documentation. More complex projects can take up to 2 weeks.'
      },
      {
        question: 'Does this replace a DPO (Data Protection Officer)?',
        answer: 'No. Our service focuses on the technical compliance of the website (cookies, forms, policies). For broader organisational data protection needs, we recommend consulting a certified DPO.'
      }
    ]
  },
  'maintenance': {
    pt: [
      {
        question: 'O que inclui o serviço de manutenção de websites?',
        answer: 'Inclui: atualizações de segurança, backups automáticos diários, monitorização de uptime 24/7, correção de bugs, otimização de performance, relatórios mensais e suporte técnico prioritário por email.'
      },
      {
        question: 'Com que frequência são feitas as atualizações?',
        answer: 'Atualizações de segurança críticas são aplicadas em 24 horas. Atualizações regulares (plugins, dependências, framework) são realizadas semanalmente. Todas as atualizações são testadas em ambiente de staging antes de irem para produção.'
      },
      {
        question: 'O que acontece se o meu site ficar offline?',
        answer: 'A nossa monitorização 24/7 deteta qualquer indisponibilidade em menos de 1 minuto. Recebemos alerta automático e iniciamos a resolução imediatamente. Garantimos um uptime de 99,9%.'
      },
      {
        question: 'Os backups são automáticos?',
        answer: 'Sim. Realizamos backups automáticos diários com retenção de 30 dias. Os backups são armazenados em localização geográfica separada do servidor principal. Em caso de necessidade, a restauração é feita em menos de 1 hora.'
      },
      {
        question: 'Posso cancelar o serviço a qualquer momento?',
        answer: 'Sim. Não temos fidelização obrigatória. O serviço é mensal e pode ser cancelado com 30 dias de antecedência. Entregamos todos os acessos e documentação do seu website.'
      }
    ],
    en: [
      {
        question: 'What does the website maintenance service include?',
        answer: 'It includes: security updates, daily automatic backups, 24/7 uptime monitoring, bug fixes, performance optimisation, monthly reports and priority technical support via email.'
      },
      {
        question: 'How often are updates made?',
        answer: 'Critical security updates are applied within 24 hours. Regular updates (plugins, dependencies, framework) are performed weekly. All updates are tested in a staging environment before going to production.'
      },
      {
        question: 'What happens if my website goes offline?',
        answer: 'Our 24/7 monitoring detects any downtime in less than 1 minute. We receive an automatic alert and start resolution immediately. We guarantee 99.9% uptime.'
      },
      {
        question: 'Are backups automatic?',
        answer: 'Yes. We perform daily automatic backups with 30-day retention. Backups are stored in a separate geographical location from the main server. If needed, restoration is completed in less than 1 hour.'
      },
      {
        question: 'Can I cancel the service at any time?',
        answer: 'Yes. We have no mandatory commitment period. The service is monthly and can be cancelled with 30 days\' notice. We deliver all access credentials and documentation for your website.'
      }
    ]
  },
  'infrastructure': {
    pt: [
      {
        question: 'Que tipo de hosting oferecem?',
        answer: 'Oferecemos hosting cloud profissional com CDN global (Cloudflare), certificado SSL gratuito, backups automáticos, escalabilidade automática e proteção DDoS. Não utilizamos hosting partilhado tradicional.'
      },
      {
        question: 'O hosting inclui certificado SSL?',
        answer: 'Sim. Todos os planos incluem certificado SSL gratuito com renovação automática. O SSL garante que o seu website carrega em HTTPS, protegendo os dados dos visitantes e melhorando o ranking nos motores de busca.'
      },
      {
        question: 'Qual é a diferença entre hosting partilhado e cloud?',
        answer: 'No hosting partilhado, o seu site divide recursos com centenas de outros sites, afetando performance e segurança. No hosting cloud, o seu site tem recursos dedicados, escalabilidade automática e isolamento completo.'
      },
      {
        question: 'Onde estão localizados os servidores?',
        answer: 'Utilizamos a rede global da Cloudflare com mais de 300 pontos de presença mundial. O conteúdo é servido a partir do servidor mais próximo do visitante, garantindo tempos de carregamento inferiores a 100ms na Europa.'
      },
      {
        question: 'O que acontece se o tráfego do meu site aumentar muito?',
        answer: 'A infraestrutura cloud escala automaticamente conforme a procura. Não há limites rígidos de tráfego nem custos surpresa. Monitorizamos o uso e ajustamos os recursos proativamente.'
      }
    ],
    en: [
      {
        question: 'What type of hosting do you offer?',
        answer: 'We offer professional cloud hosting with a global CDN (Cloudflare), free SSL certificate, automatic backups, automatic scalability and DDoS protection. We do not use traditional shared hosting.'
      },
      {
        question: 'Does hosting include an SSL certificate?',
        answer: 'Yes. All plans include a free SSL certificate with automatic renewal. SSL ensures your website loads over HTTPS, protecting visitor data and improving search engine rankings.'
      },
      {
        question: 'What is the difference between shared and cloud hosting?',
        answer: 'In shared hosting, your site shares resources with hundreds of other sites, affecting performance and security. In cloud hosting, your site has dedicated resources, automatic scalability and complete isolation.'
      },
      {
        question: 'Where are the servers located?',
        answer: 'We use the Cloudflare global network with over 300 worldwide points of presence. Content is served from the server closest to the visitor, ensuring loading times under 100ms in Europe.'
      },
      {
        question: 'What happens if my site traffic increases significantly?',
        answer: 'Cloud infrastructure scales automatically according to demand. There are no rigid traffic limits or surprise costs. We monitor usage and adjust resources proactively.'
      }
    ]
  }
};

export const getServiceFAQ = (serviceKey: string, language: 'pt' | 'en'): FAQItem[] => {
  const faq = faqData[serviceKey];
  if (!faq) return [];
  return faq[language];
};

/**
 * Homepage general FAQ — Perguntas gerais sobre a Strict.Dev
 */
export const homepageFAQ: ServiceFAQ = {
  pt: [
    {
      question: 'O que é a Strict.Dev?',
      answer: 'A Strict.Dev é uma consultoria de desenvolvimento de software focada em PMEs e negócios locais em Portugal. Oferecemos desenvolvimento web profissional, chatbots com inteligência artificial, lojas online, consultoria RGPD, manutenção técnica e infraestrutura cloud.'
    },
    {
      question: 'Onde está localizada a Strict.Dev?',
      answer: 'Operamos em regime totalmente digital a partir de Portugal, servindo clientes em todo o território nacional, incluindo Lisboa, Porto, Braga, Coimbra, Aveiro, Viana do Castelo e Ponte de Lima. Todas as reuniões são realizadas por videochamada.'
    },
    {
      question: 'Como posso pedir um orçamento?',
      answer: 'Pode solicitar um orçamento através do formulário de contacto no nosso website, por email para info@strict-dev.com, ou pelo nosso configurador de orçamento interativo. Garantimos resposta personalizada em 24 horas úteis.'
    },
    {
      question: 'Que tecnologias utilizam no desenvolvimento?',
      answer: 'Utilizamos tecnologias modernas e de alta performance: React, TypeScript, Next.js, Node.js, Tailwind CSS e infraestrutura Cloudflare. Para chatbots utilizamos OpenAI GPT-4, LangChain e integração com a WhatsApp Business API.'
    },
    {
      question: 'Quanto custa um projeto com a Strict.Dev?',
      answer: 'Os nossos projetos começam a partir de 500 euros para chatbots e 800 euros para websites. O investimento final depende da complexidade, funcionalidades e integrações necessárias. Enviamos proposta detalhada e personalizada sem compromisso.'
    },
    {
      question: 'Os vossos websites são otimizados para o Google?',
      answer: 'Sim. Todos os projetos incluem otimização SEO técnica completa: structured data (Schema.org), Core Web Vitals otimizados, sitemap XML, meta tags, URLs semânticas e HTML semântico. O nosso próprio website pontua 100/100 no Google PageSpeed.'
    },
    {
      question: 'Oferecem suporte após a entrega do projeto?',
      answer: 'Sim. Oferecemos planos de manutenção mensal que incluem atualizações de segurança, backups diários, monitorização 24/7, correção de bugs e suporte técnico prioritário. Também incluímos 30 dias de suporte gratuito após a entrega de qualquer projeto.'
    }
  ],
  en: [
    {
      question: 'What is Strict.Dev?',
      answer: 'Strict.Dev is a software development consultancy focused on SMEs and local businesses in Portugal. We offer professional web development, AI chatbots, online stores, GDPR consultancy, technical maintenance and cloud infrastructure.'
    },
    {
      question: 'Where is Strict.Dev located?',
      answer: 'We operate fully remotely from Portugal, serving clients across the entire national territory, including Lisbon, Porto, Braga, Coimbra, Aveiro, Viana do Castelo and Ponte de Lima. All meetings are conducted via video call.'
    },
    {
      question: 'How can I request a quote?',
      answer: 'You can request a quote through the contact form on our website, by email to info@strict-dev.com, or through our interactive quote configurator. We guarantee a personalised response within 24 business hours.'
    },
    {
      question: 'What technologies do you use in development?',
      answer: 'We use modern, high-performance technologies: React, TypeScript, Next.js, Node.js, Tailwind CSS and Cloudflare infrastructure. For chatbots we use OpenAI GPT-4, LangChain and WhatsApp Business API integration.'
    },
    {
      question: 'How much does a project with Strict.Dev cost?',
      answer: 'Our projects start from 500 euros for chatbots and 800 euros for websites. The final investment depends on complexity, features and required integrations. We send a detailed and personalised proposal with no commitment.'
    },
    {
      question: 'Are your websites optimised for Google?',
      answer: 'Yes. All projects include complete technical SEO optimisation: structured data (Schema.org), optimised Core Web Vitals, XML sitemap, meta tags, semantic URLs and semantic HTML. Our own website scores 100/100 on Google PageSpeed.'
    },
    {
      question: 'Do you offer support after project delivery?',
      answer: 'Yes. We offer monthly maintenance plans that include security updates, daily backups, 24/7 monitoring, bug fixes and priority technical support. We also include 30 days of free support after delivery of any project.'
    }
  ]
};

export const getHomepageFAQ = (language: 'pt' | 'en'): FAQItem[] => {
  return homepageFAQ[language];
};
