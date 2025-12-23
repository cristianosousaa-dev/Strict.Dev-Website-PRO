import { LegalModal, TermsText, PrivacyText } from "./LegalModals";
import { CookieSettingsModal } from "./CookieSettingsModal";
import { SecurityBadges } from "./SecurityBadges";
import { Logo } from "./Logo";
import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

export function Footer() {
  const { t } = useTheme();
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  const openCookieSettings = () => {
    setShowCookieSettings(true);
  };

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-[#1a1a1a] pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Security & Compliance Badges */}
        <div className="mb-10 md:mb-12 pb-6 md:pb-8 border-b border-neutral-100 dark:border-[#1a1a1a]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50]" strokeWidth={2} />
                <h3 className="text-[0.6875rem] md:text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
                  {t.footer.security}
                </h3>
              </div>
              <p className="text-[0.6875rem] md:text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-[1.4] md:leading-normal">
                Desenvolvemos com os mais elevados padrões de segurança e conformidade legal europeia.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-neutral-400" />
              <span className="text-[0.5rem] md:text-[9px] uppercase tracking-wider text-neutral-400 font-mono">
                RFC 9116 • NIS2 • RGPD
              </span>
            </div>
          </div>
          <div className="mt-5 md:mt-6">
            <SecurityBadges />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8 md:gap-10">
            <div>
                <Logo className="h-8 md:h-10 w-auto mb-4 md:mb-6" />
                <p className="text-[0.6875rem] md:text-xs text-neutral-400 max-w-xs leading-[1.5] md:leading-relaxed">
                    {t.footer.companyDescription}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 md:gap-24 w-full md:w-auto">
                <div className="space-y-3 md:space-y-4">
                    <h4 className="text-[0.6875rem] md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">{t.footer.navigation}</h4>
                    <ul className="space-y-1.5 md:space-y-2 text-[0.6875rem] md:text-xs text-neutral-500 dark:text-neutral-400">
                        <li>
                          <a 
                            href="#services" 
                            className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                          >
                            {t.footer.services}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                          </a>
                        </li>
                        <li>
                          <a 
                            href="#compliance" 
                            className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                          >
                            {t.footer.compliance}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                          </a>
                        </li>
                        <li>
                          <a 
                            href="#about" 
                            className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                          >
                            {t.footer.about}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                          </a>
                        </li>
                        <li>
                          <a 
                            href="#contact" 
                            className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                          >
                            {t.footer.contact}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                          </a>
                        </li>
                    </ul>
                </div>
                 <div className="space-y-3 md:space-y-4">
                    <h4 className="text-[0.6875rem] md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">{t.footer.legal}</h4>
                    <ul className="space-y-1.5 md:space-y-2 text-[0.6875rem] md:text-xs text-neutral-500 dark:text-neutral-400 flex flex-col items-start">
                        <li>
                            <LegalModal title={t.footer.terms} triggerText={t.footer.terms}>
                                <TermsText />
                            </LegalModal>
                        </li>
                        <li>
                            <LegalModal title={t.footer.privacy} triggerText={t.footer.privacy}>
                                <PrivacyText />
                            </LegalModal>
                        </li>
                        <li>
                            <button
                                onClick={openCookieSettings}
                                className="text-[0.6875rem] md:text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all font-normal"
                            >
                                {t.footer.cookies}
                            </button>
                        </li>
                        <li>
                            <a 
                                href="https://www.livroreclamacoes.pt/inicio" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all"
                            >
                                Livro de Reclamações
                            </a>
                        </li>
                    </ul>
                </div>
                 <div className="space-y-3 md:space-y-4">
                    <h4 className="text-[0.6875rem] md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">Social</h4>
                    <ul className="space-y-1.5 md:space-y-2 text-[0.6875rem] md:text-xs text-neutral-500 dark:text-neutral-400">
                        <li><a href="https://www.linkedin.com/company/strict-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="border-t border-neutral-100 dark:border-[#1a1a1a] pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[0.5625rem] md:text-[10px] text-neutral-400 uppercase tracking-wider font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} Strict.Dev. {t.footer.copyright}
            </p>
        </div>
      </div>
      
      <CookieSettingsModal 
        open={showCookieSettings} 
        onOpenChange={setShowCookieSettings} 
      />
    </footer>
  );
}