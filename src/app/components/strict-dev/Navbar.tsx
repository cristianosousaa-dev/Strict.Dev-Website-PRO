import { Button } from "../ui/button";
import { Menu, FileText, ChevronDown } from "lucide-react";
import logo from "/logo.png";
import { MobileMenu } from "./MobileMenu";
import { ThemeLanguageControls } from "./ThemeLanguageControls";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState } from "react";
import { smoothScrollTo } from "../../../utils/scroll";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { t, language } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    { name: language === "pt" ? "Desenvolvimento Web" : "Web Development", path: "/servicos/desenvolvimento-web" },
    { name: language === "pt" ? "Agentes de IA" : "AI Agents", path: "/servicos/agentes-ia" },
    { name: language === "pt" ? "Loja Online" : "E-commerce Store", path: "/servicos/loja-online" },
    { name: language === "pt" ? "RGPD & Dados" : "GDPR & Data", path: "/servicos/rgpd-dados" },
    { name: language === "pt" ? "Manutenção Técnica" : "Technical Maintenance", path: "/servicos/manutencao" },
    { name: language === "pt" ? "Infraestrutura" : "Infrastructure", path: "/servicos/infraestrutura" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Logo: volta para home e limpa hash
    if (href === "#") {
      navigate("/", { replace: true });
      setTimeout(() => smoothScrollTo(0), 100);
      return;
    }

    const hash = href.startsWith("#") ? href : `#${href}`;

    // Se já estamos na home, faz scroll e atualiza a barra de endereços
    if (location.pathname === "/") {
      history.replaceState(null, "", hash);

      const targetId = hash.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const isMobile = window.innerWidth < 768;
        const navbarHeight = isMobile ? 64 : 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        smoothScrollTo(targetPosition);
      }
      return;
    }

    // Se não estamos na home, navega para home com hash (App ScrollToTop trata do scroll)
    navigate({ pathname: "/", hash });
  };

  const handleServiceClick = (path: string) => {
    setServicesDropdownOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0a0a0a] backdrop-blur-md border-b border-neutral-200 dark:border-[#1a1a1a] h-14 md:h-20 transition-all duration-300">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl h-full flex items-center justify-between">
          {/* Logo Section - DESKTOP ONLY */}
          <div className="hidden md:flex items-center gap-3 md:gap-4 md:pr-8 h-full md:border-r md:border-neutral-100 md:dark:border-[#1a1a1a] lg:border-r-0 lg:pr-0 md:flex-initial justify-start">
            <a
              href="#"
              aria-label={t.aria.backToHome}
              className="flex items-center h-full cursor-pointer"
              onClick={(e) => handleNavClick(e, "#")}
            >
              <img
                src={logo}
                alt="Strict.Dev logotipo"
                width="200"
                height="70"
                className="md:h-[70px] w-auto object-contain"
              />
            </a>
          </div>

          {/* Mobile Navigation Links - MOBILE ONLY */}
          <div className="flex md:hidden items-center gap-1 h-full flex-1">
            {[
              { label: t.nav.services, href: "#services" },
              { label: t.nav.compliance, href: "#compliance" },
              { label: t.nav.configurator || "Orçamento", href: "#configurator" },
              { label: t.nav.about, href: "#about" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                aria-label={`Navegar para secção ${item.label}`}
                className="h-full flex items-center px-2.5 text-[9px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all cursor-pointer"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {/* Services Dropdown */}
            <div
              className="relative h-full"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="h-full flex items-center gap-1 px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l border-transparent hover:border-neutral-100 dark:hover:border-[#1a1a1a] cursor-pointer relative group overflow-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f5e50]">
                <span className="relative z-10">{t.nav.services}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2f5e50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] shadow-lg z-50">
                  {services.map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleServiceClick(service.path)}
                      className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l-2 border-transparent hover:border-[#2f5e50] cursor-pointer"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {[
              { label: t.nav.compliance, href: "#compliance" },
              { label: t.nav.configurator || "Orçamento", href: "#configurator" },
              { label: t.nav.about, href: "#about" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                aria-label={`Navegar para secção ${item.label}`}
                className="h-full flex items-center px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-[#2f5e50] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] transition-all border-l border-transparent hover:border-neutral-100 dark:hover:border-[#1a1a1a] cursor-pointer relative group overflow-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2f5e50]"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2f5e50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-2 md:gap-6 md:pl-6 md:border-l md:border-neutral-100 md:dark:border-[#1a1a1a] h-full">
            <div className="hidden xl:block text-right">
              <p className="text-[9px] uppercase text-neutral-400 font-bold tracking-wider">{t.nav.location}</p>
              <p className="text-[10px] font-medium text-neutral-900 dark:text-neutral-100">{t.nav.locationValue}</p>
            </div>

            <Button
              asChild
              className="hidden md:flex bg-[#2f5e50] hover:bg-[#234539] dark:hover:bg-[#1a4237] text-white rounded-none px-7 h-11 text-[9px] font-bold uppercase tracking-widest shadow-none hover:shadow-lg hover:shadow-[#2f5e50]/20 transition-all duration-500 cursor-pointer group border border-transparent hover:border-[#2f5e50]"
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                {t.nav.cta}
                <FileText className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-none cursor-pointer h-full w-11 md:w-14 hover:bg-neutral-50 dark:hover:bg-[#1a1a1a]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </Button>

            <div className="hidden md:block">
              <ThemeLanguageControls />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
