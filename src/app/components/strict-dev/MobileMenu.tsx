import { X, FileText, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../../contexts/ThemeContext";
import { ThemeLanguageControls } from "./ThemeLanguageControls";
import logo from "/logo.png";
import { smoothScrollTo } from "../../../utils/scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, language } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { name: language === "pt" ? "Desenvolvimento Web" : "Web Development", path: "/servicos/desenvolvimento-web" },
    { name: language === "pt" ? "Agentes de IA" : "AI Agents", path: "/servicos/agentes-ia" },
    { name: language === "pt" ? "Loja Online" : "E-commerce Store", path: "/servicos/loja-online" },
    { name: language === "pt" ? "RGPD & Dados" : "GDPR & Data", path: "/servicos/rgpd-dados" },
    { name: language === "pt" ? "Manutenção Técnica" : "Technical Maintenance", path: "/servicos/manutencao" },
    { name: language === "pt" ? "Infraestrutura" : "Infrastructure", path: "/servicos/infraestrutura" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();

    const hash = href.startsWith("#") ? href : `#${href}`;

    setTimeout(() => {
      if (location.pathname === "/") {
        history.replaceState(null, "", hash);

        const targetId = hash.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = 64;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          smoothScrollTo(targetPosition);
        }
      } else {
        navigate({ pathname: "/", hash });
      }
    }, 300);
  };

  const handleServiceClick = (path: string) => {
    onClose();
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative p-6 border-b border-neutral-200 dark:border-[#1a1a1a] bg-neutral-50 dark:bg-[#0f0f0f]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-sm transition-colors z-10 cursor-pointer"
            aria-label={t.mobileMenu.close}
          >
            <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </button>

          <div className="flex justify-center mb-4">
            <img src={logo} alt="Strict.Dev" className="h-14 w-auto" />
          </div>

          <p className="text-center text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
            {t.mobileMenu.tagline}
          </p>
        </div>

        <nav className="flex flex-col p-6">
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 px-4">
              {t.mobileMenu.navigation}
            </p>

            <div className="space-y-1">
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
                >
                  <span>{t.nav.services}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>

                {servicesOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-neutral-200 dark:border-[#1a1a1a]">
                    {services.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(service.path)}
                        className="w-full text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all cursor-pointer"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#compliance"
                onClick={(e) => handleLinkClick(e, "#compliance")}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.compliance}
              </a>

              <a
                href="#configurator"
                onClick={(e) => handleLinkClick(e, "#configurator")}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.configurator || "Orçamento"}
              </a>

              <a
                href="#about"
                onClick={(e) => handleLinkClick(e, "#about")}
                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] rounded-r-sm cursor-pointer"
              >
                {t.nav.about}
              </a>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 px-4">
              {t.mobileMenu.preferences}
            </p>
            <div className="px-4">
              <ThemeLanguageControls />
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white rounded-none px-6 h-12 text-[9px] font-bold uppercase tracking-widest shadow-lg transition-all cursor-pointer mb-6"
          >
            <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>
              {t.mobileMenu.cta}
              <FileText className="w-3 h-3 ml-2" />
            </a>
          </Button>

          <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-[#1a1a1a]">
            <p className="text-[9px] text-center text-neutral-400 uppercase tracking-wider">
              © {new Date().getFullYear()} Strict.Dev. {t.footer.copyright}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
