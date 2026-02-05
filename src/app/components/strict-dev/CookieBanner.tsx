import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { X, Settings, Cookie, Shield, BarChart, Target } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "../../../contexts/ThemeContext";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}

interface CookieBannerProps {
  onPreferencesClick?: () => void;
}

export function CookieBanner({ onPreferencesClick }: CookieBannerProps) {
  const { t } = useTheme();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const persistConsent = (data: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("strict-dev-cookie-consent", { detail: data }));
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    persistConsent(allAccepted);
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    persistConsent(necessaryOnly);
    setShowBanner(false);
  };

  const savePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    persistConsent(savedPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] shadow-2xl rounded-none max-w-[320px] md:max-w-md w-full mx-4 md:mx-0">
      <div className="p-3 md:p-5">
        {!showSettings ? (
          <div className="space-y-2 md:space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-3">
              <Cookie className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#2f5e50] flex-shrink-0 mt-0 md:mt-0.5" />
              <div className="text-center md:text-left flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-neutral-100 text-xs md:text-sm mb-0.5 md:mb-1">
                  {t.cookies.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-snug md:leading-relaxed">
                  {t.cookies.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2">
              <Button
                onClick={acceptAll}
                size="sm"
                className="w-full bg-[#2f5e50] hover:bg-[#254a3d] text-white rounded-none text-xs md:text-sm h-7 md:h-9"
              >
                {t.cookies.acceptAll}
              </Button>
              <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                <Button
                  onClick={acceptNecessary}
                  variant="outline"
                  size="sm"
                  className="rounded-none border-slate-300 hover:border-slate-400 text-xs md:text-sm h-7 md:h-9"
                >
                  {t.cookies.acceptNecessary}
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  size="sm"
                  className="rounded-none border-slate-300 hover:border-[#2f5e50] hover:text-[#2f5e50] text-xs md:text-sm h-7 md:h-9"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  {t.cookies.customize}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Cookie className="w-4 h-4 md:w-5 md:h-5 text-[#2f5e50]" />
                <h3 className="font-semibold text-slate-900 dark:text-neutral-100 text-xs md:text-sm">
                  {t.cookies.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-start justify-between p-2 md:p-3 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-100 dark:border-[#2a2a2a] rounded-none">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-xs md:text-sm mb-0.5">
                    {t.cookies.necessary}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-normal">
                    {t.cookies.necessaryDesc}
                  </p>
                </div>
                <div className="ml-2 md:ml-3 flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-none border-slate-300 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-start justify-between p-2 md:p-3 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-100 dark:border-[#2a2a2a] rounded-none">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-xs md:text-sm mb-0.5">
                    {t.cookies.analytics}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-normal">
                    {t.cookies.analyticsDesc}
                  </p>
                </div>
                <div className="ml-2 md:ml-3 flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        analytics: e.target.checked,
                      })
                    }
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-none border-slate-300 text-[#2f5e50] focus:ring-[#2f5e50] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-start justify-between p-2 md:p-3 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-100 dark:border-[#2a2a2a] rounded-none">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-neutral-100 text-xs md:text-sm mb-0.5">
                    {t.cookies.marketing}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-tight md:leading-normal">
                    {t.cookies.marketingDesc}
                  </p>
                </div>
                <div className="ml-2 md:ml-3 flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        marketing: e.target.checked,
                      })
                    }
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-none border-slate-300 text-[#2f5e50] focus:ring-[#2f5e50] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={savePreferences}
                size="sm"
                className="w-full bg-[#2f5e50] hover:bg-[#254a3d] text-white rounded-none text-xs md:text-sm h-8 md:h-9"
              >
                {t.cookies.savePreferences}
              </Button>
              <Button
                onClick={acceptNecessary}
                variant="outline"
                size="sm"
                className="w-full rounded-none border-slate-300 hover:border-slate-400 text-xs md:text-sm h-8 md:h-9"
              >
                {t.cookies.acceptNecessary}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook para verificar se um tipo de cookie foi aceite
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences & { timestamp?: string } | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const updateConsent = () => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
  };

  return { consent, updateConsent };
}