import { Shield, Lock, Database, FileCheck, Eye, Clock } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { useTheme } from "../../../contexts/ThemeContext";

export function SecurityBadges() {
  const { language } = useTheme();

  const badges = [
    {
      icon: Shield,
      label: "NIS2 Compliant",
      description: language === "pt"
        ? "Desenvolvimento segundo a Diretiva NIS2 da UE para segurança de redes e sistemas de informação."
        : "Development following the EU NIS2 Directive for network and information systems security.",
    },
    {
      icon: Lock,
      label: language === "pt" ? "RGPD Certified" : "GDPR Certified",
      description: language === "pt"
        ? "Conformidade total com o Regulamento Geral de Proteção de Dados da União Europeia."
        : "Full compliance with the European Union General Data Protection Regulation.",
    },
    {
      icon: Database,
      label: "Privacy by Design",
      description: language === "pt"
        ? "Privacidade incorporada desde o início do desenvolvimento de cada solução."
        : "Privacy built in from the start of every solution's development.",
    },
    {
      icon: FileCheck,
      label: "Security.txt",
      description: language === "pt"
        ? "RFC 9116 compliant - canal oficial para reportar vulnerabilidades de segurança."
        : "RFC 9116 compliant - official channel for reporting security vulnerabilities.",
    },
    {
      icon: Eye,
      label: "Consent Management",
      description: language === "pt"
        ? "Sistema granular de gestão de consentimento de cookies e dados pessoais."
        : "Granular consent management system for cookies and personal data.",
    },
    {
      icon: Clock,
      label: "Session Timeout",
      description: language === "pt"
        ? "Gestão automática de sessões inativas para proteção de dados sensíveis."
        : "Automatic inactive session management for sensitive data protection.",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      {badges.map((badge, idx) => (
        <HoverCard key={idx} openDelay={150} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#1a1a1a] hover:border-[#2f5e50] transition-all duration-200 cursor-pointer group">
              <badge.icon className="w-3 h-3 text-[#2f5e50] group-hover:scale-110 transition-transform duration-200" strokeWidth={2} aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 group-hover:text-[#2f5e50] transition-colors duration-200">
                {badge.label}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            className="w-64 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#1a1a1a] rounded-none shadow-lg p-3"
            side="top"
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#1a1a1a]">
                <badge.icon className="w-3.5 h-3.5 text-[#2f5e50]" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-bold text-[10px] uppercase tracking-wide text-slate-900 dark:text-neutral-100 mb-1">
                  {badge.label}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}