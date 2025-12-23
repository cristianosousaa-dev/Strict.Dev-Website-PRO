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
          <DialogTitle className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4">{title}</DialogTitle>
          <DialogDescription className="sr-only">
             {language === 'pt' ? `Termos legais e condições para ${title}` : `Legal terms and conditions for ${title}`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4 text-sm text-slate-500 leading-relaxed text-justify space-y-4">
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
      <div className="space-y-4">
        <p><strong>1. Acceptance of Terms</strong><br/>By accessing and using this Strict.Dev website, you agree to comply with these Terms of Service and all applicable laws and regulations.</p>
        <p><strong>2. Intellectual Property</strong><br/>All content, design, logos and source code are the exclusive property of Strict.Dev or licensed to it. Reproduction without express authorization is prohibited.</p>
        <p><strong>3. Services Provided</strong><br/>Strict.Dev provides technical consulting services, web development and compliance implementation (NIS2/GDPR). Specific commercial proposals supersede these general terms.</p>
        <p><strong>4. Limitation of Liability</strong><br/>While we make every effort to ensure technical security and accuracy, Strict.Dev is not responsible for indirect damages arising from the use of our platforms.</p>
        <p><strong>5. Applicable Law</strong><br/>These terms are governed by the laws of Portugal. Any dispute will be settled in the courts of the district of Ponte de Lima.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <p><strong>1. Aceitação dos Termos</strong><br/>Ao aceder e utilizar este website da Strict.Dev, concorda em cumprir os presentes Termos de Serviço e todas as leis e regulamentos aplicáveis.</p>
      <p><strong>2. Propriedade Intelectual</strong><br/>Todo o conteúdo, design, logótipos e código-fonte são propriedade exclusiva da Strict.Dev ou licenciados à mesma. É proibida a reprodução sem autorização expressa.</p>
      <p><strong>3. Serviços Prestados</strong><br/>A Strict.Dev fornece serviços de consultoria técnica, desenvolvimento web e implementação de conformidade (NIS2/RGPD). As propostas comerciais específicas sobrepõem-se a estes termos gerais.</p>
      <p><strong>4. Limitação de Responsabilidade</strong><br/>Embora envidemos todos os esforços para garantir a segurança e precisão técnica, a Strict.Dev não se responsabiliza por danos indiretos decorrentes do uso das nossas plataformas.</p>
      <p><strong>5. Lei Aplicável</strong><br/>Estes termos são regidos pelas leis de Portugal. Qualquer litígio será dirimido nos tribunais da comarca de Ponte de Lima.</p>
    </div>
  );
};

export const PrivacyText = () => {
  const { language } = useTheme();
  
  if (language === 'en') {
    return (
      <div className="space-y-4">
        <p><strong>1. Data Controller</strong><br/>Strict.Dev (Headquarters: Ponte de Lima) is the entity responsible for processing your personal data.</p>
        <p><strong>2. Data Collected</strong><br/>We collect only data strictly necessary for service provision: Name, Corporate Email and Billing Data.</p>
        <p><strong>3. Purpose</strong><br/>Data is used exclusively for: Customer Management, Billing and Technical Communication. We do not share data with third parties for marketing purposes.</p>
        <p><strong>4. Security (NIS2)</strong><br/>We apply enterprise-level security measures, including encryption at rest and in transit, in accordance with the NIS2 directive.</p>
        <p><strong>5. Your Rights</strong><br/>You can exercise your rights of access, rectification or erasure by sending an email to info@strict-dev.com.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <p><strong>1. Responsável pelo Tratamento</strong><br/>A Strict.Dev (Sede: Ponte de Lima) é a entidade responsável pelo tratamento dos seus dados pessoais.</p>
      <p><strong>2. Dados Recolhidos</strong><br/>Recolhemos apenas dados estritamente necessários para a prestação de serviços: Nome, Email Corporativo e Dados de Faturação.</p>
      <p><strong>3. Finalidade</strong><br/>Os dados são utilizados exclusivamente para: Gestão de Cliente, Faturação e Comunicação Técnica. Não partilhamos dados com terceiros para fins de marketing.</p>
      <p><strong>4. Segurança (NIS2)</strong><br/>Aplicamos medidas de segurança de nível empresarial, incluindo encriptação em repouso e em trânsito, de acordo com a diretiva NIS2.</p>
      <p><strong>5. Seus Direitos</strong><br/>Pode exercer os seus direitos de acesso, retificação ou esquecimento enviando um email para info@strict-dev.com.</p>
    </div>
  );
};