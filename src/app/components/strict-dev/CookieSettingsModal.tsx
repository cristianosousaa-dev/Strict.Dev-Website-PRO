import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Cookie, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookieSettingsModal({ open, onOpenChange }: CookieSettingsModalProps) {
  const { t } = useTheme();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (open) {
      const savedConsent = localStorage.getItem("cookie-consent");
      if (savedConsent) {
        const parsed = JSON.parse(savedConsent);
        setPreferences({
          necessary: parsed.necessary ?? true,
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false,
        });
      }
    }
  }, [open]);

  const persistConsent = (data: any) => {
    localStorage.setItem("cookie-consent", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("strict-dev-cookie-consent", { detail: data }));
  };

  const savePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    persistConsent(savedPreferences);
    onOpenChange(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    persistConsent(necessaryOnly);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[85vw] md:max-w-lg rounded-none p-4 md:p-6">
        <DialogHeader>
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
            <Cookie className="w-4 h-4 md:w-5 md:h-5 text-[#2f5e50]" />
            <DialogTitle className="text-sm md:text-lg font-semibold text-slate-900 dark:text-neutral-100">
              {t.cookies.modalTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-snug md:leading-normal">
            {t.cookies.modalDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 md:space-y-3 my-3 md:my-4">
          <div className="flex items-start justify-between p-2.5 md:p-4 bg-slate-50 dark:bg-[#0f0f0f] rounded-none border border-slate-200 dark:border-[#2a2a2a]">
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-sm md:text-base mb-0.5 md:mb-1">
                {t.cookies.necessaryTitle}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-relaxed">
                {t.cookies.necessaryModalDesc}
              </p>
            </div>
            <div className="ml-2.5 md:ml-4 flex items-center h-5">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-none border-slate-300 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-start justify-between p-2.5 md:p-4 bg-slate-50 dark:bg-[#0f0f0f] rounded-none border border-slate-200 dark:border-[#2a2a2a]">
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-sm md:text-base mb-0.5 md:mb-1">
                {t.cookies.analyticsTitle}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-relaxed">
                {t.cookies.analyticsModalDesc}
              </p>
            </div>
            <div className="ml-2.5 md:ml-4 flex items-center h-5">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    analytics: e.target.checked,
                  })
                }
                className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-none border-slate-300 text-[#2f5e50] focus:ring-[#2f5e50] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-start justify-between p-2.5 md:p-4 bg-slate-50 dark:bg-[#0f0f0f] rounded-none border border-slate-200 dark:border-[#2a2a2a]">
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-sm md:text-base mb-0.5 md:mb-1">
                {t.cookies.marketingTitle}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-relaxed">
                {t.cookies.marketingModalDesc}
              </p>
            </div>
            <div className="ml-2.5 md:ml-4 flex items-center h-5">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    marketing: e.target.checked,
                  })
                }
                className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-none border-slate-300 text-[#2f5e50] focus:ring-[#2f5e50] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3 md:mt-4">
          <Button
            onClick={savePreferences}
            size="sm"
            className="w-full bg-[#2f5e50] hover:bg-[#254a3d] text-white rounded-none text-xs md:text-sm h-9 md:h-10"
          >
            {t.cookies.savePreferences}
          </Button>
          <Button
            onClick={acceptNecessary}
            variant="outline"
            size="sm"
            className="w-full rounded-none border-slate-300 hover:border-slate-400 text-xs md:text-sm h-9 md:h-10"
          >
            {t.cookies.acceptNecessary}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}