import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ArrowUpRight, Send, Loader2, Clock, CheckCircle, Lock, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { trackFormSubmission } from "./GoogleAnalytics";
import { useTheme } from "../../../contexts/ThemeContext";
import { RateLimiter, FormSecurityValidator } from "../../../utils/security";

export function Contact() {
  const { t } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    requirements: "",
    honeypot: "", // 🍯 Anti-bot honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldValid, setFieldValid] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    let error = "";
    let isValid = false;

    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Campo obrigatório";
        } else if (value.trim().length < 2) {
          error = "Nome muito curto";
        } else {
          isValid = true;
        }
        break;
      
      case "email":
        if (!value.trim()) {
          error = "Campo obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email inválido";
        } else {
          isValid = true;
        }
        break;
      
      case "requirements":
        if (!value.trim()) {
          error = "Campo obrigatório";
        } else if (value.trim().length < 10) {
          error = "Descrição muito curta (mín. 10 caracteres)";
        } else {
          isValid = true;
        }
        break;
      
      default:
        isValid = true;
    }

    return { error, isValid };
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Reutilizar validateField para evitar duplicação
    ['name', 'email', 'requirements'].forEach(field => {
      const { error } = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) {
        errors[field] = error;
      }
    });
    
    return errors;
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Validação inline em tempo real
    const { error, isValid } = validateField(field, value);
    
    if (error) {
      setFieldErrors({ ...fieldErrors, [field]: error });
      setFieldValid({ ...fieldValid, [field]: false });
    } else {
      // Remover erro se existir
      const newErrors = { ...fieldErrors };
      delete newErrors[field];
      setFieldErrors(newErrors);
      setFieldValid({ ...fieldValid, [field]: isValid });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🛡️ SECURITY VALIDATION (Rate Limiting + Honeypot)
    const securityCheck = FormSecurityValidator.validate('contact_form', formData.honeypot);
    
    if (!securityCheck.valid) {
      if (securityCheck.reason === 'bot_detected') {
        // Silent fail for bots - don't show error message
        console.warn('[Security] Bot detected via honeypot');
        return;
      }
      
      if (securityCheck.reason === 'rate_limit_exceeded') {
        toast.error('Demasiadas Tentativas', {
          description: `Por favor aguarde ${securityCheck.timeRemaining}s antes de enviar novamente.`,
          duration: 5000,
          icon: <AlertTriangle className="w-4 h-4" />,
        });
        return;
      }
    }
    
    // Validação
    const errors = validateForm();
    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast.error(t.toast.contactError, {
        description: t.toast.contactErrorDesc,
        duration: 4000,
      });
      return;
    }

    // Envio REAL via Web3Forms (grátis)
    setIsSubmitting(true);
    
    try {
      // 🛡️ Record submission for rate limiting
      RateLimiter.recordSubmission('contact_form');
      
      // 📧 ENVIAR EMAIL via Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '737d2200-e240-459a-8c60-51b179397982',
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          message: formData.requirements,
          subject: `Novo Contato - ${formData.name}`,
          from_name: 'Strict.Dev Website',
          replyto: formData.email,
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Erro ao enviar formulário');
      }
      
      toast.success(t.toast.contactSuccess, {
        description: t.toast.contactSuccessDesc,
        duration: 5000,
      });

      // Track successful submission
      trackFormSubmission("contact_form", true);

      // Limpar formulário
      setFormData({
        name: "",
        company: "",
        email: "",
        requirements: "",
        honeypot: "",
      });
      setFieldErrors({});
      setFieldValid({});
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error);
      toast.error(t.toast.contactSubmitError, {
        description: error.message || t.toast.contactSubmitErrorDesc,
        duration: 4000,
      });
      trackFormSubmission("contact_form", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-12 md:py-20" id="contact">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
            {/* TÍTULO E SUBTÍTULO - Aparece no topo no mobile, escondido no desktop (porque está dentro do primeiro div) */}
            <div className="lg:hidden mb-8">
                <span className="text-[#2f5e50] font-bold text-[0.5625rem] uppercase tracking-widest mb-2 block">{t.contact.label}</span>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3">{t.contact.title}</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mb-0 max-w-sm text-[0.6875rem] leading-[1.5]">
                    {t.contact.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                
                {/* INFORMAÇÕES DE EMAIL - ordem-3 no mobile, ordem-1 no desktop */}
                <div className="order-3 lg:order-1">
                    {/* Título e subtítulo aparecem apenas no DESKTOP */}
                    <div className="hidden lg:block">
                        <span className="text-[#2f5e50] font-bold text-[9px] uppercase tracking-widest mb-3 block">{t.contact.label}</span>
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">{t.contact.title}</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm text-xs leading-relaxed">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="space-y-5 md:space-y-6 border-t border-neutral-100 dark:border-[#1a1a1a] pt-5 md:pt-6">
                        <div className="group cursor-pointer">
                            <p className="text-[0.5rem] md:text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5 md:mb-1">{t.contact.email}</p>
                            <a href="mailto:info@strict-dev.com" className="text-sm md:text-base text-neutral-900 dark:text-neutral-100 hover:text-[#2f5e50] transition-colors flex items-center gap-2 font-medium cursor-pointer">
                                info@strict-dev.com
                                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                        <div>
                            <p className="text-[0.5rem] md:text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5 md:mb-1">{t.contact.location}</p>
                            <p className="text-sm md:text-base text-neutral-900 dark:text-neutral-100 font-medium">{t.contact.locationValue}</p>
                        </div>
                        
                        {/* Horário de Atendimento */}
                        <div className="border-t border-neutral-100 dark:border-[#1a1a1a] pt-5 md:pt-6">
                            <div className="flex items-start gap-2.5 md:gap-3">
                                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-[0.5rem] md:text-[9px] font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-1.5 md:mb-2">{t.contact.scheduleLabel}</p>
                                    <div className="space-y-0.5 md:space-y-1 text-[0.6875rem] md:text-xs text-neutral-700 dark:text-neutral-300">
                                        <p>{t.contact.scheduleWeekday}</p>
                                        <p>{t.contact.scheduleWeekend}</p>
                                    </div>
                                    <p className="text-[0.5625rem] md:text-[10px] text-[#2f5e50] mt-2 md:mt-3 font-bold uppercase tracking-wider">
                                        {t.contact.scheduleGuarantee}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FORMULÁRIO - ordem-1 no mobile, ordem-2 no desktop */}
                <div className="order-1 lg:order-2 bg-white dark:bg-[#0a0a0a] shadow-sm border border-neutral-100 dark:border-[#1a1a1a] p-6 md:p-8">
                    {/* Reassurance badges ANTES do formulário */}
                    <div className="mb-6 md:mb-8 flex flex-wrap gap-3 md:gap-4 pb-5 md:pb-6 border-b border-neutral-100 dark:border-[#1a1a1a]">
                        <div className="flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                            <span className="text-[0.5625rem] md:text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
                                {t.contact.reassurance1}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                            <span className="text-[0.5625rem] md:text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
                                {t.contact.reassurance2}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2f5e50] flex-shrink-0" />
                            <span className="text-[0.5625rem] md:text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
                                {t.contact.reassurance3}
                            </span>
                        </div>
                    </div>

                    <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1 group relative">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-focus-within:text-[#2f5e50] transition-colors">
                                    {t.contact.formName} *
                                </label>
                                <div className="relative">
                                  <Input 
                                    required
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={(e) => handleFieldChange("name", e.target.value)}
                                    className={`bg-transparent dark:text-neutral-100 border-0 border-b ${
                                      fieldErrors.name 
                                        ? 'border-red-500' 
                                        : fieldValid.name 
                                        ? 'border-[#2f5e50]' 
                                        : 'border-neutral-200 dark:border-[#1a1a1a]'
                                    } rounded-none px-0 pr-6 h-10 focus-visible:ring-0 focus-visible:border-[#2f5e50] transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 text-xs`}
                                    placeholder={t.contact.formNamePlaceholder}
                                    disabled={isSubmitting}
                                  />
                                  {fieldValid.name && (
                                    <CheckCircle className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2f5e50]" />
                                  )}
                                </div>
                                {fieldErrors.name && (
                                  <p className="text-[10px] text-red-500 mt-1">{t.contact.formNameShort || fieldErrors.name}</p>
                                )}
                            </div>
                            <div className="space-y-1 group">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-focus-within:text-[#2f5e50] transition-colors">{t.contact.formCompany}</label>
                                <Input 
                                  name="company"
                                  autoComplete="organization"
                                  value={formData.company}
                                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                  className="bg-transparent dark:text-neutral-100 border-0 border-b border-neutral-200 dark:border-[#1a1a1a] rounded-none px-0 h-10 focus-visible:ring-0 focus-visible:border-[#2f5e50] transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 text-xs" 
                                  placeholder={t.contact.formCompanyPlaceholder}
                                  disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="space-y-1 group relative">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-focus-within:text-[#2f5e50] transition-colors">
                                {t.contact.formEmail} *
                            </label>
                            <div className="relative">
                              <Input 
                                type="email"
                                required
                                name="email"
                                autoComplete="email"
                                pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
                                value={formData.email}
                                onChange={(e) => handleFieldChange("email", e.target.value)}
                                className={`bg-transparent dark:text-neutral-100 border-0 border-b ${
                                  fieldErrors.email 
                                    ? 'border-red-500' 
                                    : fieldValid.email 
                                    ? 'border-[#2f5e50]' 
                                    : 'border-neutral-200 dark:border-[#1a1a1a]'
                                } rounded-none px-0 pr-6 h-10 focus-visible:ring-0 focus-visible:border-[#2f5e50] transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 text-xs`}
                                placeholder={t.contact.formEmailPlaceholder}
                                disabled={isSubmitting}
                              />
                              {fieldValid.email && (
                                <CheckCircle className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2f5e50]" />
                              )}
                            </div>
                            {fieldErrors.email && (
                              <p className="text-[10px] text-red-500 mt-1">{t.contact.formEmailInvalid || fieldErrors.email}</p>
                            )}
                        </div>
                        <div className="space-y-1 group relative">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-focus-within:text-[#2f5e50] transition-colors">
                                {t.contact.formRequirements} *
                            </label>
                            <div className="relative">
                              <Textarea 
                                required
                                name="requirements"
                                value={formData.requirements}
                                onChange={(e) => handleFieldChange("requirements", e.target.value)}
                                className={`bg-transparent dark:text-neutral-100 border-0 border-b ${
                                  fieldErrors.requirements 
                                    ? 'border-red-500' 
                                    : fieldValid.requirements 
                                    ? 'border-[#2f5e50]' 
                                    : 'border-neutral-200 dark:border-[#1a1a1a]'
                                } rounded-none px-0 pr-6 min-h-[80px] focus-visible:ring-0 focus-visible:border-[#2f5e50] resize-none transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600 text-xs leading-relaxed`}
                                placeholder={t.contact.formRequirementsPlaceholder}
                                disabled={isSubmitting}
                              />
                              {fieldValid.requirements && (
                                <CheckCircle className="absolute right-1 top-3 w-4 h-4 text-[#2f5e50]" />
                              )}
                            </div>
                            {fieldErrors.requirements && (
                              <p className="text-[10px] text-red-500 mt-1">{t.contact.formRequirementsShort || fieldErrors.requirements}</p>
                            )}
                        </div>
                        
                        {/* 🍯 HONEYPOT FIELD - Invisible to users, visible to bots */}
                        <div 
                          style={{
                            position: 'absolute',
                            left: '-9999px',
                            width: '1px',
                            height: '1px',
                            opacity: 0,
                            pointerEvents: 'none',
                          }}
                          aria-hidden="true"
                        >
                          <label htmlFor="website">Website</label>
                          <Input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.honeypot}
                            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>
                        
                        <div className="pt-2">
                            <Button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full bg-neutral-900 dark:bg-[#2f5e50] hover:bg-[#2f5e50] dark:hover:bg-[#234539] text-white h-12 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                    {t.contact.formSubmitting}
                                  </>
                                ) : (
                                  <>
                                    {t.contact.formSubmit}
                                    <Send className="w-3 h-3 ml-2 opacity-70" />
                                  </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </section>
  );
}