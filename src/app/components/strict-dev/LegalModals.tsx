import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "../../../contexts/ThemeContext";

export function LegalModal({ title, triggerText, children }: { title: string, triggerText: string, children: React.ReactNode }) {
  const { language } = useTheme();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs text-slate-500 hover:text-[#2f5e50] cursor-pointer text-left transition-all hover:underline decoration-[#2f5e50]/30 underline-offset-4 font-normal">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-widest text-slate-900 dark:text-neutral-100 mb-4">{title}</DialogTitle>
          <DialogDescription className="sr-only">
             {language === 'pt' ? `Termos legais e condições para ${title}` : `Legal terms and conditions for ${title}`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed space-y-4">
            {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export const TermsText = () => {
  const { language } = useTheme();
  
  if (language === 'en') {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
            Last updated: February 3, 2026
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">1. ACCEPTANCE OF TERMS</h3>
          <p>
            By accessing and using the website <strong>strict-dev.com</strong> ("Website") and the services provided by <strong>Strict.Dev</strong> (hereinafter "Service Provider", "we", "our"), you ("Client", "User") expressly agree to comply with these Terms of Service ("Terms"), as well as all applicable laws and regulations of the European Union and Portugal.
          </p>
          <p className="mt-2">
            If you do not agree with any part of these Terms, you must immediately cease using the Website and our services.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">2. SERVICE PROVIDER IDENTIFICATION</h3>
          <p><strong>Business Name:</strong> Strict.Dev<br/>
          <strong>Location:</strong> Ponte de Lima, Portugal<br/>
          <strong>Professional Email:</strong> info@strict-dev.com<br/>
          <strong>Telephone:</strong> +351 910 205 459</p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">3. SERVICES PROVIDED</h3>
          <p>Strict.Dev offers the following professional services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Professional Website Development:</strong> Custom websites and e-commerce platforms</li>
            <li><strong>AI Chatbots:</strong> Intelligent agents for WhatsApp Business and automated customer service</li>
            <li><strong>GDPR Consultancy:</strong> Implementation of basic data protection compliance for SMEs</li>
            <li><strong>Cloud Infrastructure:</strong> Professional hosting with CDN, SSL certificates, and automatic backups</li>
            <li><strong>Technical Maintenance:</strong> 24/7 monitoring, updates, and technical support</li>
          </ul>
          <p className="mt-2">
            <strong>Specific commercial proposals</strong> (quotes, service contracts) supersede these general Terms in case of conflict.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">4. CONTRACTUAL PROCESS</h3>
          <p><strong>4.1. Quote Request:</strong> Clients may request a free quote via telephone (+351 910 205 459), email (info@strict-dev.com), or contact form on the Website.</p>
          <p><strong>4.2. Quote Validity:</strong> Quotes are valid for 30 (thirty) calendar days from the issue date, unless otherwise specified.</p>
          <p><strong>4.3. Contract Formation:</strong> The contract is formed upon:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Written acceptance of the quote by the Client (email or signed document); AND</li>
            <li>Payment of the agreed initial deposit (typically 50% of the total value).</li>
          </ul>
          <p className="mt-2"><strong>4.4. Right of Withdrawal (Consumers):</strong> In accordance with Portuguese Law and EU Directive 2011/83/EU, <strong>consumers</strong> (individuals not acting for commercial purposes) have the right to withdraw from the contract within <strong>14 (fourteen) calendar days</strong> from the date of contract formation, without stating reasons and without penalty, provided that service provision has not yet begun at their express request.</p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">5. PRICES AND PAYMENT</h3>
          <p><strong>5.1. Prices:</strong> All prices quoted are in <strong>Euros (EUR)</strong> and include <strong>VAT at the applicable rate</strong> (currently 23% in Continental Portugal).</p>
          <p><strong>5.2. Payment Terms:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Deposit:</strong> 50% upon acceptance of the quote</li>
            <li><strong>Final Payment:</strong> 50% upon project delivery (before final deployment)</li>
            <li><strong>Recurring Services:</strong> Monthly/annual subscription, payable in advance</li>
          </ul>
          <p className="mt-2"><strong>5.3. Payment Methods:</strong> Bank transfer (IBAN provided on invoice), MB WAY, or Stripe payment link.</p>
          <p className="mt-2"><strong>5.4. Late Payment:</strong> Late payment beyond 15 (fifteen) calendar days from the due date will result in:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Default interest at the legal rate (currently 9.5% per annum in Portugal)</li>
            <li>Possible suspension of services until full payment</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">6. INTELLECTUAL PROPERTY</h3>
          <p><strong>6.1. Website Content:</strong> All content on the Website (text, graphics, logos, icons, images, audio clips, source code, design) is the exclusive property of Strict.Dev or licensed to it. Reproduction, distribution, or modification without express written authorization is prohibited.</p>
          <p className="mt-2"><strong>6.2. Developed Projects:</strong> Upon full payment:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>The Client receives an <strong>irrevocable license for commercial use</strong> of the website/application developed</li>
            <li><strong>Source code</strong> may be provided upon express request and additional payment (if not included in the original quote)</li>
            <li>Strict.Dev retains the right to use the project in its <strong>portfolio</strong> (unless the Client requests confidentiality)</li>
          </ul>
          <p className="mt-2"><strong>6.3. Third-Party Materials:</strong> Plugins, libraries, and licensed fonts used in projects remain the property of their respective owners.</p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">7. CLIENT OBLIGATIONS</h3>
          <p>The Client commits to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide <strong>accurate and updated information</strong> necessary for service execution</li>
            <li>Supply <strong>content</strong> (texts, images, logos) within agreed deadlines</li>
            <li>Respond to validation requests within <strong>5 (five) business days</strong></li>
            <li>Ensure that supplied materials <strong>do not infringe third-party intellectual property rights</strong></li>
            <li>Comply with <strong>GDPR</strong> if processing personal data via developed platforms</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">8. WARRANTIES AND LIMITATION OF LIABILITY</h3>
          <p><strong>8.1. Technical Warranty:</strong> Strict.Dev guarantees that developed solutions will function as specified in the quote for <strong>30 (thirty) days</strong> from delivery. Critical bugs identified within this period will be corrected at no additional cost.</p>
          <p className="mt-2"><strong>8.2. Limitation of Liability:</strong> To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Strict.Dev is <strong>not liable for indirect, incidental, special, or consequential damages</strong> (including lost profits, data, or business opportunities)</li>
            <li>Total liability is <strong>limited to the amount paid by the Client</strong> for the specific service</li>
            <li>Strict.Dev does not guarantee <strong>uninterrupted service or error-free operation</strong> (although we make commercially reasonable efforts)</li>
          </ul>
          <p className="mt-2"><strong>8.3. Disclaimer:</strong> Strict.Dev is not responsible for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Third-party content (plugins, APIs, external integrations)</li>
            <li>Damage caused by <strong>Client misuse</strong> of the platform</li>
            <li><strong>Force majeure</strong> (natural disasters, internet failures, DDoS attacks)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">9. DATA PROTECTION AND SECURITY (GDPR/NIS2)</h3>
          <p>Strict.Dev complies with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>EU GDPR (Regulation 2016/679)</strong> – See complete Privacy Policy</li>
            <li><strong>NIS2 Directive (EU 2022/2555)</strong> – Security measures for critical infrastructure</li>
            <li><strong>Portuguese Data Protection Law (Law No. 58/2019)</strong></li>
          </ul>
          <p className="mt-2">
            For details on data processing, see our <strong>Privacy Policy</strong>.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">10. CONTRACT TERMINATION</h3>
          <p><strong>10.1. By the Client:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Recurring services may be canceled with <strong>30 (thirty) days' notice</strong></li>
            <li>One-time projects cannot be canceled after work begins (except with payment of costs already incurred)</li>
          </ul>
          <p className="mt-2"><strong>10.2. By Strict.Dev:</strong> We may terminate the contract immediately in case of:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Non-payment beyond 30 (thirty) days</li>
            <li>Client breach of these Terms</li>
            <li>Use of services for illegal activities</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">11. MODIFICATIONS TO TERMS</h3>
          <p>
            Strict.Dev reserves the right to modify these Terms at any time. Changes will be communicated via email and published on the Website with at least <strong>15 (fifteen) days' notice</strong>. Continued use of services after this period constitutes acceptance of the new Terms.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">12. APPLICABLE LAW AND JURISDICTION</h3>
          <p><strong>12.1. Applicable Law:</strong> These Terms are governed by <strong>Portuguese law</strong> and <strong>European Union law</strong>.</p>
          <p className="mt-2"><strong>12.2. Dispute Resolution:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Consumers:</strong> May use the EU Online Dispute Resolution platform (<a href="https://ec.europa.eu/consumers/odr" className="text-[#2f5e50] hover:underline" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>) or Portuguese consumer arbitration centers</li>
            <li><strong>Companies:</strong> Disputes will be settled in the courts of the district of <strong>Viana do Castelo</strong>, with express waiver of any other jurisdiction</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">13. MISCELLANEOUS</h3>
          <p><strong>13.1. Entire Agreement:</strong> These Terms, together with the Privacy Policy and specific quotes, constitute the entire agreement between the parties.</p>
          <p className="mt-2"><strong>13.2. Severability:</strong> If any clause is deemed invalid, the remaining clauses remain in full effect.</p>
          <p className="mt-2"><strong>13.3. Assignment:</strong> The Client may not assign rights or obligations without prior written consent from Strict.Dev.</p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">14. CONTACT</h3>
          <p>
            For questions about these Terms:<br/>
            <strong>Email:</strong> info@strict-dev.com<br/>
            <strong>Telephone:</strong> +351 910 205 459<br/>
            <strong>Address:</strong> Ponte de Lima, 4990 Viana do Castelo, Portugal
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
          Última atualização: 3 de fevereiro de 2026
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">1. ACEITAÇÃO DOS TERMOS</h3>
        <p>
          Ao aceder e utilizar o website <strong>strict-dev.com</strong> ("Website") e os serviços prestados pela <strong>Strict.Dev</strong> (doravante "Prestador de Serviços", "nós", "nosso"), o utilizador ("Cliente", "Utilizador") aceita expressamente cumprir os presentes Termos de Serviço ("Termos"), bem como todas as leis e regulamentos aplicáveis da União Europeia e de Portugal.
        </p>
        <p className="mt-2">
          Caso não concorde com qualquer parte destes Termos, deverá cessar imediatamente a utilização do Website e dos nossos serviços.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">2. IDENTIFICAÇÃO DO PRESTADOR DE SERVIÇOS</h3>
        <p><strong>Denominação Social:</strong> Strict.Dev<br/>
        <strong>Localização:</strong> Ponte de Lima, Portugal<br/>
        <strong>Email Profissional:</strong> info@strict-dev.com<br/>
        <strong>Telefone:</strong> +351 910 205 459</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">3. SERVIÇOS PRESTADOS</h3>
        <p>A Strict.Dev oferece os seguintes serviços profissionais:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Desenvolvimento de Websites Profissionais:</strong> Sites personalizados e lojas online (e-commerce)</li>
          <li><strong>Chatbots com Inteligência Artificial:</strong> Agentes inteligentes para WhatsApp Business e atendimento automatizado</li>
          <li><strong>Consultoria RGPD:</strong> Implementação de conformidade básica com proteção de dados para PMEs</li>
          <li><strong>Infraestrutura Cloud:</strong> Hosting profissional com CDN, certificados SSL e backups automáticos</li>
          <li><strong>Manutenção Técnica:</strong> Monitorização 24/7, atualizações e suporte técnico</li>
        </ul>
        <p className="mt-2">
          <strong>Propostas comerciais específicas</strong> (orçamentos, contratos de serviço) sobrepõem-se a estes Termos gerais em caso de conflito.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">4. PROCESSO CONTRATUAL</h3>
        <p><strong>4.1. Pedido de Orçamento:</strong> Os Clientes podem solicitar orçamento gratuito através de telefone (+351 910 205 459), email (info@strict-dev.com) ou formulário de contacto no Website.</p>
        <p><strong>4.2. Validade do Orçamento:</strong> Os orçamentos são válidos por 30 (trinta) dias corridos a contar da data de emissão, salvo indicação contrária.</p>
        <p><strong>4.3. Formação do Contrato:</strong> O contrato considera-se formado mediante:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Aceitação escrita do orçamento pelo Cliente (email ou documento assinado); E</li>
          <li>Pagamento do sinal inicial acordado (tipicamente 50% do valor total).</li>
        </ul>
        <p className="mt-2"><strong>4.4. Direito de Livre Resolução (Consumidores):</strong> Em conformidade com a lei portuguesa e a Diretiva UE 2011/83/EU, os <strong>consumidores</strong> (pessoas singulares que não atuem no âmbito de atividade comercial) têm direito a resolver o contrato no prazo de <strong>14 (catorze) dias corridos</strong> a contar da data de celebração do contrato, sem necessidade de indicar motivo e sem penalização, desde que a prestação de serviços ainda não tenha sido iniciada a seu pedido expresso.</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">5. PREÇOS E PAGAMENTO</h3>
        <p><strong>5.1. Preços:</strong> Todos os preços apresentados são expressos em <strong>Euros (EUR)</strong> e incluem <strong>IVA à taxa legal aplicável</strong> (atualmente 23% em Portugal Continental).</p>
        <p><strong>5.2. Condições de Pagamento:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Sinal:</strong> 50% aquando da aceitação do orçamento</li>
          <li><strong>Pagamento Final:</strong> 50% aquando da entrega do projeto (antes da colocação final em produção)</li>
          <li><strong>Serviços Recorrentes:</strong> Mensalidade/anuidade paga antecipadamente</li>
        </ul>
        <p className="mt-2"><strong>5.3. Métodos de Pagamento:</strong> Transferência bancária (IBAN fornecido na fatura), MB WAY ou link de pagamento Stripe.</p>
        <p className="mt-2"><strong>5.4. Atraso no Pagamento:</strong> O atraso no pagamento superior a 15 (quinze) dias corridos sobre a data de vencimento implica:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Juros de mora à taxa legal (atualmente 9,5% ao ano em Portugal)</li>
          <li>Possível suspensão dos serviços até regularização</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">6. PROPRIEDADE INTELECTUAL</h3>
        <p><strong>6.1. Conteúdo do Website:</strong> Todo o conteúdo presente no Website (textos, gráficos, logótipos, ícones, imagens, clips de áudio, código-fonte, design) é propriedade exclusiva da Strict.Dev ou licenciado à mesma. É proibida a reprodução, distribuição ou modificação sem autorização expressa por escrito.</p>
        <p className="mt-2"><strong>6.2. Projetos Desenvolvidos:</strong> Após pagamento integral:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>O Cliente recebe uma <strong>licença irrevogável de uso comercial</strong> do website/aplicação desenvolvido</li>
          <li>O <strong>código-fonte</strong> pode ser disponibilizado mediante pedido expresso e pagamento adicional (caso não incluído no orçamento original)</li>
          <li>A Strict.Dev reserva-se o direito de utilizar o projeto no seu <strong>portfólio</strong> (salvo pedido de confidencialidade pelo Cliente)</li>
        </ul>
        <p className="mt-2"><strong>6.3. Materiais de Terceiros:</strong> Plugins, bibliotecas e fontes licenciadas utilizadas nos projetos continuam a ser propriedade dos respetivos titulares.</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">7. OBRIGAÇÕES DO CLIENTE</h3>
        <p>O Cliente compromete-se a:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Fornecer <strong>informações precisas e atualizadas</strong> necessárias à execução dos serviços</li>
          <li>Disponibilizar <strong>conteúdos</strong> (textos, imagens, logótipos) dentro dos prazos acordados</li>
          <li>Responder a pedidos de validação no prazo máximo de <strong>5 (cinco) dias úteis</strong></li>
          <li>Assegurar que os materiais fornecidos <strong>não violam direitos de propriedade intelectual de terceiros</strong></li>
          <li>Cumprir o <strong>RGPD</strong> caso trate dados pessoais através das plataformas desenvolvidas</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">8. GARANTIAS E LIMITAÇÃO DE RESPONSABILIDADE</h3>
        <p><strong>8.1. Garantia Técnica:</strong> A Strict.Dev garante que as soluções desenvolvidas funcionarão conforme especificado no orçamento durante <strong>30 (trinta) dias</strong> após a entrega. Bugs críticos identificados neste período serão corrigidos sem custos adicionais.</p>
        <p className="mt-2"><strong>8.2. Limitação de Responsabilidade:</strong> Na máxima extensão permitida por lei:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>A Strict.Dev <strong>não se responsabiliza por danos indiretos, incidentais, especiais ou consequenciais</strong> (incluindo lucros cessantes, perda de dados ou oportunidades de negócio)</li>
          <li>A responsabilidade total está <strong>limitada ao valor pago pelo Cliente</strong> pelo serviço específico</li>
          <li>A Strict.Dev não garante <strong>funcionamento ininterrupto ou isento de erros</strong> (embora envidemos esforços comercialmente razoáveis)</li>
        </ul>
        <p className="mt-2"><strong>8.3. Exclusão de Responsabilidade:</strong> A Strict.Dev não é responsável por:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Conteúdos de terceiros (plugins, APIs, integrações externas)</li>
          <li>Danos causados por <strong>uso indevido da plataforma pelo Cliente</strong></li>
          <li><strong>Força maior</strong> (catástrofes naturais, falhas de internet, ataques DDoS)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">9. PROTEÇÃO DE DADOS E SEGURANÇA (RGPD/NIS2)</h3>
        <p>A Strict.Dev cumpre com:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>RGPD da UE (Regulamento 2016/679)</strong> – Ver Política de Privacidade completa</li>
          <li><strong>Diretiva NIS2 (UE 2022/2555)</strong> – Medidas de segurança para infraestruturas críticas</li>
          <li><strong>Lei da Proteção de Dados Pessoais de Portugal (Lei n.º 58/2019)</strong></li>
        </ul>
        <p className="mt-2">
          Para detalhes sobre o tratamento de dados, consulte a nossa <strong>Política de Privacidade</strong>.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">10. CESSAÇÃO DO CONTRATO</h3>
        <p><strong>10.1. Pelo Cliente:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Serviços recorrentes podem ser cancelados com <strong>30 (trinta) dias de pré-aviso</strong></li>
          <li>Projetos pontuais não podem ser cancelados após o início dos trabalhos (exceto mediante pagamento dos custos já incorridos)</li>
        </ul>
        <p className="mt-2"><strong>10.2. Pela Strict.Dev:</strong> Podemos cessar o contrato de forma imediata em caso de:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Falta de pagamento superior a 30 (trinta) dias</li>
          <li>Violação dos presentes Termos pelo Cliente</li>
          <li>Utilização dos serviços para atividades ilegais</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">11. ALTERAÇÕES AOS TERMOS</h3>
        <p>
          A Strict.Dev reserva-se o direito de modificar estes Termos a qualquer momento. As alterações serão comunicadas por email e publicadas no Website com, pelo menos, <strong>15 (quinze) dias de antecedência</strong>. A continuação da utilização dos serviços após este prazo constitui aceitação dos novos Termos.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">12. LEI APLICÁVEL E JURISDIÇÃO</h3>
        <p><strong>12.1. Lei Aplicável:</strong> Estes Termos são regidos pela <strong>lei portuguesa</strong> e pelo <strong>direito da União Europeia</strong>.</p>
        <p className="mt-2"><strong>12.2. Resolução de Litígios:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Consumidores:</strong> Podem recorrer à plataforma de resolução de litígios em linha da UE (<a href="https://ec.europa.eu/consumers/odr" className="text-[#2f5e50] hover:underline" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>) ou aos centros de arbitragem de consumo portugueses</li>
          <li><strong>Empresas:</strong> Os litígios serão dirimidos nos tribunais da comarca de <strong>Viana do Castelo</strong>, com renúncia expressa a qualquer outro foro</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">13. DISPOSIÇÕES GERAIS</h3>
        <p><strong>13.1. Acordo Integral:</strong> Estes Termos, juntamente com a Política de Privacidade e os orçamentos específicos, constituem o acordo integral entre as partes.</p>
        <p className="mt-2"><strong>13.2. Divisibilidade:</strong> Caso alguma cláusula seja considerada inválida, as restantes permanecem em pleno vigor.</p>
        <p className="mt-2"><strong>13.3. Cessão:</strong> O Cliente não pode ceder direitos ou obrigações sem consentimento prévio por escrito da Strict.Dev.</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">14. CONTACTO</h3>
        <p>
          Para questões sobre estes Termos:<br/>
          <strong>Email:</strong> info@strict-dev.com<br/>
          <strong>Telefone:</strong> +351 910 205 459<br/>
          <strong>Morada:</strong> Ponte de Lima, 4990 Viana do Castelo, Portugal
        </p>
      </div>
    </div>
  );
};

export const PrivacyText = () => {
  const { language } = useTheme();
  
  if (language === 'en') {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
            Last updated: February 3, 2026
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">1. INTRODUCTION AND DATA CONTROLLER</h3>
          <p>
            <strong>Strict.Dev</strong> (hereinafter "we", "our") respects your privacy and is committed to protecting your personal data in compliance with the <strong>General Data Protection Regulation (GDPR - EU Regulation 2016/679)</strong>, the <strong>ePrivacy Directive (2002/58/EC)</strong>, and <strong>Portuguese Personal Data Protection Law (Law No. 58/2019)</strong>.
          </p>
          <p className="mt-2">
            <strong>Data Controller:</strong><br/>
            Business Name: Strict.Dev<br/>
            Address: Ponte de Lima, 4990 Viana do Castelo, Portugal<br/>
            Email: info@strict-dev.com<br/>
            Telephone: +351 910 205 459
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">2. DATA PROTECTION OFFICER (DPO)</h3>
          <p>
            As an SME, Strict.Dev is not required under Article 37 GDPR to appoint a Data Protection Officer. For data protection inquiries, please contact: <strong>info@strict-dev.com</strong>
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">3. PERSONAL DATA WE COLLECT</h3>
          <p>We collect only data strictly necessary for service provision:</p>
          <p className="mt-2"><strong>3.1. Data Provided Voluntarily by You:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Contact Forms/Email:</strong> Name, corporate/personal email, telephone (optional), company name, message</li>
            <li><strong>Service Contracts:</strong> Full name, tax number (NIF/VAT), address, billing data</li>
            <li><strong>Technical Support:</strong> Issue descriptions, conversation history</li>
          </ul>
          <p className="mt-2"><strong>3.2. Data Automatically Collected (Technical Cookies):</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Navigation Data:</strong> IP address (anonymized), browser type, operating system, pages visited, time spent</li>
            <li><strong>Functional Cookies:</strong> Language preferences (pt/en), theme selection (light/dark mode)</li>
          </ul>
          <p className="mt-2">
            <strong>We DO NOT collect:</strong> Sensitive data (racial origin, political opinions, religious beliefs, health data), biometric data, or data from minors under 16 years without parental consent.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">4. LEGAL BASIS FOR PROCESSING (ARTICLE 6 GDPR)</h3>
          <p>We process your data based on the following legal grounds:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> Contact forms, marketing communications (when applicable)</li>
            <li><strong>Contract Execution (Art. 6(1)(b) GDPR):</strong> Service provision, invoicing, technical support</li>
            <li><strong>Legal Obligation (Art. 6(1)(c) GDPR):</strong> Tax record retention (Portuguese Tax Authority), accounting data (7 years)</li>
            <li><strong>Legitimate Interest (Art. 6(1)(f) GDPR):</strong> Fraud prevention, network security (NIS2), technical analytics</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">5. PURPOSE OF PROCESSING</h3>
          <p>Your data is used exclusively for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Client Management:</strong> Responding to quote requests, managing service contracts</li>
            <li><strong>Invoicing and Accounting:</strong> Issuing invoices (legal obligation), financial records</li>
            <li><strong>Technical Communication:</strong> Support, updates, security notifications</li>
            <li><strong>Website Improvement:</strong> Anonymous analytics (Google Analytics with IP anonymization)</li>
            <li><strong>Security (NIS2):</strong> Attack detection, security incident logs</li>
          </ul>
          <p className="mt-2">
            <strong>We DO NOT:</strong> Sell, rent, or share your data with third parties for marketing purposes without explicit consent.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">6. DATA SHARING (PROCESSORS AND THIRD PARTIES)</h3>
          <p>We may share your data with:</p>
          <p className="mt-2"><strong>6.1. Processors (Article 28 GDPR):</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Hosting Provider:</strong> Cloudflare (servers in EU) - Processing Agreement in place</li>
            <li><strong>Email Service:</strong> Professional email service (EU data centers) - GDPR-compliant</li>
            <li><strong>Payment Processing:</strong> Stripe (PCI-DSS certified) - only for payment transactions</li>
            <li><strong>Analytics:</strong> Privacy-focused analytics (IP anonymization enabled)</li>
          </ul>
          <p className="mt-2"><strong>6.2. Legal Authorities:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Portuguese Tax Authority (AT):</strong> Invoicing data (legal obligation)</li>
            <li><strong>Judicial Authorities:</strong> In case of court orders</li>
          </ul>
          <p className="mt-2"><strong>6.3. International Transfers:</strong></p>
          <p className="mt-2">
            We avoid transferring data outside the EU. When necessary (e.g., Stripe USA), we ensure <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">7. DATA RETENTION PERIOD</h3>
          <p>We retain your data for the following periods:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Quote Requests (not converted):</strong> 1 year (then deleted)</li>
            <li><strong>Client Contracts:</strong> 10 years (Portuguese Commercial Code requirement)</li>
            <li><strong>Invoicing Data:</strong> 7 years (Portuguese Tax and Accounting Code)</li>
            <li><strong>Technical Support Logs:</strong> 2 years</li>
            <li><strong>Functional Cookies:</strong> 12 months (renewed with each visit)</li>
            <li><strong>Security Logs (NIS2):</strong> 6 months</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">8. YOUR RIGHTS (ARTICLES 15-22 GDPR)</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Right of Access (Art. 15):</strong> Request a copy of your personal data</li>
            <li><strong>Right of Rectification (Art. 16):</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Right to Erasure / "Right to be Forgotten" (Art. 17):</strong> Request deletion of data (except when legal retention is required)</li>
            <li><strong>Right to Restriction of Processing (Art. 18):</strong> Limit the use of your data in certain circumstances</li>
            <li><strong>Right to Data Portability (Art. 20):</strong> Receive data in structured, commonly used format</li>
            <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interest</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (without affecting prior lawful processing)</li>
          </ul>
          <p className="mt-2">
            <strong>How to Exercise Your Rights:</strong><br/>
            Send an email to <strong>info@strict-dev.com</strong> with the subject "GDPR Request - [Your Right]". We will respond within <strong>30 days</strong> (extendable to 90 days in complex cases, with notification).
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">9. COOKIES AND TRACKING TECHNOLOGIES</h3>
          <p><strong>9.1. Types of Cookies Used:</strong></p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Strictly Necessary Cookies:</strong> Language (pt/en), theme (light/dark) - No consent required (Art. 5(3) ePrivacy)</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics (anonymized IP) - Consent required</li>
          </ul>
          <p className="mt-2"><strong>9.2. Cookie Management:</strong></p>
          <p>You can modify cookie preferences at any time by clicking on <strong>"Cookie Settings"</strong> in the footer. You can also disable cookies in your browser settings (note: this may affect website functionality).</p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">10. SECURITY MEASURES (GDPR + NIS2)</h3>
          <p>We implement <strong>technical and organizational measures</strong> to protect your data:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Encryption:</strong> TLS 1.3 (data in transit), AES-256 (data at rest)</li>
            <li><strong>Access:</strong> Restricted to authorized personnel only (least privilege principle)</li>
            <li><strong>Backups:</strong> Automatic daily backups with encryption</li>
            <li><strong>Monitoring (NIS2):</strong> 24/7 intrusion detection, security logs</li>
            <li><strong>Incident Response:</strong> Data breach notification to supervisory authority within <strong>72 hours</strong> (Art. 33 GDPR)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">11. AUTOMATED DECISIONS AND PROFILING</h3>
          <p>
            Strict.Dev <strong>does not perform automated decision-making</strong> (including profiling) with legal or similarly significant effects (Art. 22 GDPR).
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">12. MINORS' DATA</h3>
          <p>
            Our services are intended for <strong>adults (18+ years)</strong> and companies. We do not knowingly collect data from minors under 16 years without verifiable parental consent (Art. 8 GDPR). If you believe we have inadvertently collected such data, contact us immediately.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">13. POLICY UPDATES</h3>
          <p>
            We may update this Privacy Policy to reflect legislative changes or new practices. Significant changes will be communicated via email and published on the Website with <strong>30 days' notice</strong>.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">14. COMPLAINTS TO SUPERVISORY AUTHORITY</h3>
          <p>
            If you believe your rights have been violated, you may file a complaint with:
          </p>
          <p className="mt-2">
            <strong>Portuguese National Data Protection Commission (CNPD):</strong><br/>
            Address: Av. D. Carlos I, 134, 1º, 1200-651 Lisboa<br/>
            Website: <a href="https://www.cnpd.pt" className="text-[#2f5e50] hover:underline" target="_blank" rel="noopener">www.cnpd.pt</a><br/>
            Email: geral@cnpd.pt<br/>
            Telephone: +351 213 928 400
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">15. CONTACT</h3>
          <p>
            For questions about this Privacy Policy or to exercise your rights:<br/>
            <strong>Email:</strong> info@strict-dev.com<br/>
            <strong>Telephone:</strong> +351 910 205 459<br/>
            <strong>Address:</strong> Ponte de Lima, 4990 Viana do Castelo, Portugal
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
          Última atualização: 3 de fevereiro de 2026
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">1. INTRODUÇÃO E RESPONSÁVEL PELO TRATAMENTO</h3>
        <p>
          A <strong>Strict.Dev</strong> (doravante "nós", "nosso") respeita a sua privacidade e compromete-se a proteger os seus dados pessoais em conformidade com o <strong>Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679)</strong>, a <strong>Diretiva ePrivacy (2002/58/CE)</strong> e a <strong>Lei da Proteção de Dados Pessoais de Portugal (Lei n.º 58/2019)</strong>.
        </p>
        <p className="mt-2">
          <strong>Responsável pelo Tratamento:</strong><br/>
          Denominação Social: Strict.Dev<br/>
          Morada: Ponte de Lima, 4990 Viana do Castelo, Portugal<br/>
          Email: info@strict-dev.com<br/>
          Telefone: +351 910 205 459
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">2. ENCARREGADO DA PROTEÇÃO DE DADOS (DPO)</h3>
        <p>
          Enquanto PME, a Strict.Dev não está obrigada ao abrigo do Artigo 37.º do RGPD a designar um Encarregado da Proteção de Dados. Para questões sobre proteção de dados, contacte: <strong>info@strict-dev.com</strong>
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">3. DADOS PESSOAIS QUE RECOLHEMOS</h3>
        <p>Recolhemos apenas dados estritamente necessários para a prestação de serviços:</p>
        <p className="mt-2"><strong>3.1. Dados Fornecidos Voluntariamente por Si:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Formulários de Contacto/Email:</strong> Nome, email corporativo/pessoal, telefone (opcional), nome da empresa, mensagem</li>
          <li><strong>Contratos de Serviços:</strong> Nome completo, NIF/NIPC, morada, dados de faturação</li>
          <li><strong>Suporte Técnico:</strong> Descrições de problemas, histórico de conversas</li>
        </ul>
        <p className="mt-2"><strong>3.2. Dados Recolhidos Automaticamente (Cookies Técnicos):</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Dados de Navegação:</strong> Endereço IP (anonimizado), tipo de browser, sistema operativo, páginas visitadas, tempo de permanência</li>
          <li><strong>Cookies Funcionais:</strong> Preferências de idioma (pt/en), seleção de tema (modo claro/escuro)</li>
        </ul>
        <p className="mt-2">
          <strong>NÃO recolhemos:</strong> Dados sensíveis (origem racial, opiniões políticas, convicções religiosas, dados de saúde), dados biométricos ou dados de menores de 16 anos sem consentimento parental.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">4. BASE LEGAL DO TRATAMENTO (ARTIGO 6.º RGPD)</h3>
        <p>Tratamos os seus dados com base nas seguintes bases legais:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Consentimento (Art. 6.º, n.º 1, a) RGPD):</strong> Formulários de contacto, comunicações de marketing (quando aplicável)</li>
          <li><strong>Execução de Contrato (Art. 6.º, n.º 1, b) RGPD):</strong> Prestação de serviços, faturação, suporte técnico</li>
          <li><strong>Obrigação Legal (Art. 6.º, n.º 1, c) RGPD):</strong> Conservação de registos fiscais (Autoridade Tributária), dados contabilísticos (7 anos)</li>
          <li><strong>Interesse Legítimo (Art. 6.º, n.º 1, f) RGPD):</strong> Prevenção de fraudes, segurança de rede (NIS2), análises técnicas</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">5. FINALIDADE DO TRATAMENTO</h3>
        <p>Os seus dados são utilizados exclusivamente para:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Gestão de Clientes:</strong> Responder a pedidos de orçamento, gerir contratos de serviços</li>
          <li><strong>Faturação e Contabilidade:</strong> Emissão de faturas (obrigação legal), registos financeiros</li>
          <li><strong>Comunicação Técnica:</strong> Suporte, atualizações, notificações de segurança</li>
          <li><strong>Melhoria do Website:</strong> Análises anónimas (Google Analytics com anonimização de IP)</li>
          <li><strong>Segurança (NIS2):</strong> Deteção de ataques, registos de incidentes de segurança</li>
        </ul>
        <p className="mt-2">
          <strong>NÃO:</strong> Vendemos, alugamos ou partilhamos os seus dados com terceiros para fins de marketing sem o seu consentimento explícito.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">6. PARTILHA DE DADOS (SUBCONTRATANTES E TERCEIROS)</h3>
        <p>Podemos partilhar os seus dados com:</p>
        <p className="mt-2"><strong>6.1. Subcontratantes (Artigo 28.º RGPD):</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Fornecedor de Hosting:</strong> Cloudflare (servidores na UE) - Acordo de Subcontratação celebrado</li>
          <li><strong>Serviço de Email:</strong> Serviço de email profissional (data centers na UE) - Conforme RGPD</li>
          <li><strong>Processamento de Pagamentos:</strong> Stripe (certificado PCI-DSS) - apenas para transações de pagamento</li>
          <li><strong>Análises:</strong> Análises focadas na privacidade (anonimização de IP ativada)</li>
        </ul>
        <p className="mt-2"><strong>6.2. Autoridades Legais:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Autoridade Tributária (AT):</strong> Dados de faturação (obrigação legal)</li>
          <li><strong>Autoridades Judiciais:</strong> Em caso de ordens judiciais</li>
        </ul>
        <p className="mt-2"><strong>6.3. Transferências Internacionais:</strong></p>
        <p className="mt-2">
          Evitamos transferir dados para fora da UE. Quando necessário (ex: Stripe EUA), garantimos <strong>Cláusulas Contratuais Tipo (SCC)</strong> aprovadas pela Comissão Europeia.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">7. PRAZO DE CONSERVAÇÃO DOS DADOS</h3>
        <p>Conservamos os seus dados pelos seguintes períodos:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Pedidos de Orçamento (não convertidos):</strong> 1 ano (depois eliminados)</li>
          <li><strong>Contratos de Cliente:</strong> 10 anos (exigência do Código Comercial Português)</li>
          <li><strong>Dados de Faturação:</strong> 7 anos (Código do IRS e Contabilidade)</li>
          <li><strong>Registos de Suporte Técnico:</strong> 2 anos</li>
          <li><strong>Cookies Funcionais:</strong> 12 meses (renovados a cada visita)</li>
          <li><strong>Logs de Segurança (NIS2):</strong> 6 meses</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">8. OS SEUS DIREITOS (ARTIGOS 15.º-22.º RGPD)</h3>
        <p>Tem o direito a:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Direito de Acesso (Art. 15.º):</strong> Solicitar uma cópia dos seus dados pessoais</li>
          <li><strong>Direito de Retificação (Art. 16.º):</strong> Corrigir dados incorretos ou incompletos</li>
          <li><strong>Direito ao Apagamento / "Direito ao Esquecimento" (Art. 17.º):</strong> Solicitar a eliminação dos dados (exceto quando há obrigação legal de conservação)</li>
          <li><strong>Direito à Limitação do Tratamento (Art. 18.º):</strong> Limitar o uso dos seus dados em certas circunstâncias</li>
          <li><strong>Direito à Portabilidade dos Dados (Art. 20.º):</strong> Receber dados em formato estruturado e de uso corrente</li>
          <li><strong>Direito de Oposição (Art. 21.º):</strong> Opor-se ao tratamento baseado em interesse legítimo</li>
          <li><strong>Direito de Retirar Consentimento:</strong> Retirar consentimento a qualquer momento (sem afetar a licitude do tratamento anterior)</li>
        </ul>
        <p className="mt-2">
          <strong>Como Exercer os Seus Direitos:</strong><br/>
          Envie email para <strong>info@strict-dev.com</strong> com o assunto "Pedido RGPD - [Seu Direito]". Responderemos no prazo de <strong>30 dias</strong> (prorrogáveis até 90 dias em casos complexos, com notificação).
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">9. COOKIES E TECNOLOGIAS DE RASTREAMENTO</h3>
        <p><strong>9.1. Tipos de Cookies Utilizados:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Cookies Estritamente Necessários:</strong> Idioma (pt/en), tema (claro/escuro) - Não requerem consentimento (Art. 5.º(3) ePrivacy)</li>
          <li><strong>Cookies de Análise:</strong> Google Analytics (IP anonimizado) - Requerem consentimento</li>
        </ul>
        <p className="mt-2"><strong>9.2. Gestão de Cookies:</strong></p>
        <p>Pode modificar as preferências de cookies a qualquer momento clicando em <strong>"Definições de Cookies"</strong> no rodapé. Também pode desativar cookies nas definições do seu browser (nota: isto pode afetar a funcionalidade do website).</p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">10. MEDIDAS DE SEGURANÇA (RGPD + NIS2)</h3>
        <p>Implementamos <strong>medidas técnicas e organizativas</strong> para proteger os seus dados:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Encriptação:</strong> TLS 1.3 (dados em trânsito), AES-256 (dados em repouso)</li>
          <li><strong>Acesso:</strong> Restrito apenas a pessoal autorizado (princípio do menor privilégio)</li>
          <li><strong>Backups:</strong> Backups automáticos diários com encriptação</li>
          <li><strong>Monitorização (NIS2):</strong> Deteção de intrusões 24/7, logs de segurança</li>
          <li><strong>Resposta a Incidentes:</strong> Notificação de violações de dados à autoridade de controlo no prazo de <strong>72 horas</strong> (Art. 33.º RGPD)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">11. DECISÕES AUTOMATIZADAS E DEFINIÇÃO DE PERFIS</h3>
        <p>
          A Strict.Dev <strong>não realiza decisões automatizadas</strong> (incluindo definição de perfis) que produzam efeitos jurídicos ou afetem significativamente o titular dos dados (Art. 22.º RGPD).
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">12. DADOS DE MENORES</h3>
        <p>
          Os nossos serviços destinam-se a <strong>adultos (18+ anos)</strong> e empresas. Não recolhemos intencionalmente dados de menores de 16 anos sem consentimento parental verificável (Art. 8.º RGPD). Se acreditar que recolhemos inadvertidamente tais dados, contacte-nos imediatamente.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">13. ATUALIZAÇÕES DA POLÍTICA</h3>
        <p>
          Podemos atualizar esta Política de Privacidade para refletir alterações legislativas ou novas práticas. Alterações significativas serão comunicadas por email e publicadas no Website com <strong>30 dias de antecedência</strong>.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">14. RECLAMAÇÕES À AUTORIDADE DE CONTROLO</h3>
        <p>
          Caso considere que os seus direitos foram violados, pode apresentar uma reclamação à:
        </p>
        <p className="mt-2">
          <strong>Comissão Nacional de Proteção de Dados (CNPD):</strong><br/>
          Morada: Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa<br/>
          Website: <a href="https://www.cnpd.pt" className="text-[#2f5e50] hover:underline" target="_blank" rel="noopener">www.cnpd.pt</a><br/>
          Email: geral@cnpd.pt<br/>
          Telefone: +351 213 928 400
        </p>
      </div>

      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-neutral-100 mb-2">15. CONTACTO</h3>
        <p>
          Para questões sobre esta Política de Privacidade ou para exercer os seus direitos:<br/>
          <strong>Email:</strong> info@strict-dev.com<br/>
          <strong>Telefone:</strong> +351 910 205 459<br/>
          <strong>Morada:</strong> Ponte de Lima, 4990 Viana do Castelo, Portugal
        </p>
      </div>
    </div>
  );
};
