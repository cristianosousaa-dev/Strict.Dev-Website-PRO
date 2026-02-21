import logo from "/logo.png";
import { motion } from "motion/react";
import { LegalModal, TermsText, PrivacyText } from "./LegalModals";
import { CookieSettingsModal } from "./CookieSettingsModal";
import { SecurityBadges } from "./SecurityBadges";
import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

export function Footer() {
  const { t, language } = useTheme();
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openCookieSettings = () => {
    setShowCookieSettings(true);
  };

  const goToSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();

    const nextHash = hash.startsWith("#") ? hash : `#${hash}`;

    if (location.pathname === "/") {
      // Na Home, deixa o SmoothScroll tratar do scroll e atualiza o URL via navegação
      navigate({ pathname: "/", search: location.search, hash: nextHash }, { replace: true });
      return;
    }

    // Fora da Home, vai para a Home com hash (o ScrollToTop do App faz o scroll)
    navigate({ pathname: "/", hash: nextHash });
  };

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-[#1a1a1a] pt-12 md:pt-20 pb-8 md:pb-10" role="contentinfo">
      <motion.div
        className="container mx-auto px-4 md:px-6 max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="mb-10 md:mb-12 pb-6 md:pb-8 border-b border-neutral-100 dark:border-[#1a1a1a]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50]" strokeWidth={2} aria-hidden="true" />
                <h3 className="text-sm md:text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
                  {t.footer.security}
                </h3>
              </div>
              <p className="text-sm md:text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-[1.4] md:leading-normal">
                {t.footer.securityDescription}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-neutral-400" aria-hidden="true" />
              <span className="text-xs md:text-xs uppercase tracking-wider text-neutral-400 font-mono">
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
            <img src={logo} alt="Strict.Dev" width="200" height="40" className="h-8 md:h-10 w-auto mb-4 md:mb-6" />
            <p className="text-sm md:text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-[1.4] md:leading-normal">
              {t.footer.companyDescription}
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row gap-8 md:gap-24 w-full md:w-auto" aria-label={language === "pt" ? "Navegação do rodapé" : "Footer navigation"}>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-sm md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">
                {t.footer.navigation}
              </h4>
              <ul className="space-y-1.5 md:space-y-2 text-sm md:text-xs text-neutral-500 dark:text-neutral-400">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => goToSection(e, "#services")}
                    className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                  >
                    {t.footer.services}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#compliance"
                    onClick={(e) => goToSection(e, "#compliance")}
                    className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                  >
                    {t.footer.compliance}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => goToSection(e, "#about")}
                    className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                  >
                    {t.footer.about}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => goToSection(e, "#contact")}
                    className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                  >
                    {t.footer.contact}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => goToSection(e, "#faq")}
                    className="relative inline-block hover:text-[#2f5e50] cursor-pointer transition-colors group"
                  >
                    FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2f5e50] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h4 className="text-sm md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">
                {t.footer.legal}
              </h4>
              <ul className="space-y-1.5 md:space-y-2 text-sm md:text-xs text-neutral-500 dark:text-neutral-400 flex flex-col items-start">
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
                    className="text-sm md:text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all font-normal"
                  >
                    {t.footer.cookies}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.livroreclamacoes.pt/inicio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.footer.complaintsBook} (${language === "pt" ? "abre numa nova janela" : "opens in a new window"})`}
                    className="hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all"
                  >
                    {t.footer.complaintsBook}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h4 className="text-sm md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-widest">
                {t.footer.social || "Social"}
              </h4>
              <ul className="space-y-1.5 md:space-y-2 text-sm md:text-xs text-neutral-500 dark:text-neutral-400">
                <li>
                  <a
                    href="https://www.linkedin.com/company/strict-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn Strict.Dev (${language === "pt" ? "abre numa nova janela" : "opens in a new window"})`}
                    className="hover:text-[#2f5e50] cursor-pointer hover:underline decoration-[#2f5e50]/30 underline-offset-4 transition-all"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="border-t border-neutral-100 dark:border-[#1a1a1a] pt-6 md:pt-8 flex items-center justify-center">
          <p className="text-[10px] text-neutral-400 tracking-wider text-center">
            &copy; 2026 Strict.Dev. {t.footer.copyright}
          </p>
        </div>
      </motion.div>

      <CookieSettingsModal open={showCookieSettings} onOpenChange={setShowCookieSettings} />
    </footer>
  );
}