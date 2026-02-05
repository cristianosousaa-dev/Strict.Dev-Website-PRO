import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, X } from "lucide-react";
import { Button } from "../ui/button";
import { trackCustomEvent } from "./GoogleAnalytics";
import { useTheme } from "../../../contexts/ThemeContext";
import logo from "/logo.png";

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const isBusinessHours = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;
  return day >= 1 && day <= 5 && currentTime >= 9 && currentTime < 18;
};

export function LiveChatWidget() {
  const { t } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(isBusinessHours());

  useEffect(() => {
    const interval = setInterval(() => setIsOnline(isBusinessHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackCustomEvent("live_chat_opened", { event_category: "engagement" });
    }
  };

  return (
    <>
      {/* Chat Window - COM ANIMATEPRESNCE PARA TRANSIÇÕES SUAVES */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.1, 0.25, 1] // Ease-in-out suave
            }}
            className="fixed bottom-24 right-6 z-[9999] w-80 bg-white dark:bg-[#0a0a0a] rounded-lg border border-neutral-200 dark:border-[#1a1a1a] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white dark:bg-[#0a0a0a] p-4 border-b border-slate-200 dark:border-[#0f0f0f]">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt={t.liveChat.title} className="h-8" />
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                    {t.liveChat.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-slate-400 dark:bg-neutral-600"}`} />
                    <span className="text-slate-600 dark:text-neutral-400 text-[9px] uppercase tracking-wider">
                      {isOnline ? t.liveChat.online : t.liveChat.offline}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <p className="text-slate-600 dark:text-neutral-300 text-xs">
                {t.liveChat.description}
              </p>

              {/* Business Hours */}
              <div className="bg-slate-50 dark:bg-[#0f0f0f] p-3 rounded border border-slate-100 dark:border-[#0f0f0f]">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#2f5e50] mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-900 dark:text-neutral-100 mb-1.5">
                      {t.liveChat.scheduleTitle}
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-neutral-400">
                      {t.liveChat.scheduleWeekday}<br />
                      {t.liveChat.scheduleWeekend}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <Button
                onClick={() => {
                  trackCustomEvent("whatsapp_click", { event_category: "engagement" });
                  window.open("https://wa.me/351910205459", "_blank");
                }}
                className="w-full bg-[#2f5e50] hover:bg-[#234539] text-white h-10 rounded text-[10px] font-bold uppercase tracking-widest"
              >
                <WhatsAppIcon />
                <span className="ml-2">{t.liveChat.whatsappButton}</span>
              </Button>

              {/* Other Contacts */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-[#0f0f0f]">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  {t.liveChat.otherContacts}
                </p>
                <a 
                  href="mailto:info@strict-dev.com" 
                  className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-neutral-400 hover:text-[#2f5e50] cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@strict-dev.com
                </a>
                <a 
                  href="tel:+351910205459" 
                  className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-neutral-400 hover:text-[#2f5e50] cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +351 910 205 459
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - COM ANIMAÇÃO NO ÍCONE */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9999] bg-[#2f5e50] hover:bg-[#234539] text-white w-14 h-14 rounded-full shadow-lg dark:shadow-none hover:shadow-xl flex items-center justify-center transition-colors duration-200 cursor-pointer"
        aria-label={isOpen ? t.liveChat.closeChat : t.liveChat.openChat}
      >
        {/* Ícone que alterna com AnimatePresence */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <WhatsAppIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}