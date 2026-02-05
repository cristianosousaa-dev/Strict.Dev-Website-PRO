import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    [key: string]: any;
  }
}

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
};

function readCookieConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem("cookie-consent");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: parsed.necessary ?? true,
      analytics: parsed.analytics ?? false,
      marketing: parsed.marketing ?? false,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

function deleteGaCookies() {
  const candidates = ["_ga", "_ga_"];
  const cookies = document.cookie.split(";").map(c => c.trim());
  cookies.forEach((c) => {
    const name = c.split("=")[0];
    if (candidates.some(prefix => name === prefix || name.startsWith(prefix))) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=None; Secure`;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict; Secure`;
    }
  });
}

export function GoogleAnalytics() {
  const location = useLocation();
  const gaLoadedRef = useRef(false);

  const GA_MEASUREMENT_ID = String((import.meta as any).env?.VITE_GA4_ID || "").trim();

  // Só ativa se estiver configurado por variável de ambiente
  if (!GA_MEASUREMENT_ID) return null;

  const enableGA = () => {
    if (gaLoadedRef.current) return;

    // Remove global disable flag if it exists
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    // Load script
    if (!document.getElementById("ga4-script")) {
      const script = document.createElement("script");
      script.id = "ga4-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    // Init dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = window.gtag || gtag;

    window.gtag("js", new Date());

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });

    gaLoadedRef.current = true;
  };

  const disableGA = () => {
    // Set global disable flag
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

    // Best effort cleanup
    deleteGaCookies();
  };

  const applyConsent = () => {
    const consent = readCookieConsent();
    if (consent?.analytics) {
      enableGA();
    } else {
      disableGA();
    }
  };

  useEffect(() => {
    // Apply current consent on mount
    applyConsent();

    // React to consent changes (banner or settings)
    const handler = () => applyConsent();
    window.addEventListener("strict-dev-cookie-consent", handler as any);

    // Cross-tab updates
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "cookie-consent") applyConsent();
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("strict-dev-cookie-consent", handler as any);
      window.removeEventListener("storage", storageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track virtual pageviews on route change (only if GA is loaded and enabled)
  useEffect(() => {
    if (!gaLoadedRef.current) return;
    if (window[`ga-disable-${GA_MEASUREMENT_ID}`]) return;
    if (!window.gtag) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location, GA_MEASUREMENT_ID]);

  // Engagement tracking (only sends events when GA is enabled)
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!gaLoadedRef.current) return;
      if (window[`ga-disable-${GA_MEASUREMENT_ID}`]) return;
      if (!window.gtag) return;

      const target = e.target as Element | null;
      if (!target) return;

      const el = target.closest('a[href="#contact"], button[type="submit"]');
      if (!el) return;

      window.gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: (el as HTMLElement).textContent?.trim() || "CTA",
      });
    };

    let scrollDepth = 0;
    const scrollHandler = () => {
      if (!gaLoadedRef.current) return;
      if (window[`ga-disable-${GA_MEASUREMENT_ID}`]) return;
      if (!window.gtag) return;

      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackPoint = ((scrollTop + winHeight) / docHeight) * 100;

      if (trackPoint > scrollDepth + 25) {
        scrollDepth = Math.floor(trackPoint / 25) * 25;
        window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: `${scrollDepth}%`,
        });
      }
    };

    document.addEventListener("click", clickHandler, true);
    window.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [GA_MEASUREMENT_ID]);

  return null;
}

// Helper function to track custom events
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  const GA_MEASUREMENT_ID =
    (import.meta as any).env?.VITE_GA4_ID || "G-D6X8BXE242";

  if (typeof window === "undefined") return;
  if (window[`ga-disable-${GA_MEASUREMENT_ID}`]) return;
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackCustomEvent("form_submission", {
    event_category: "conversions",
    event_label: formName,
    value: success ? 1 : 0,
  });
};

export const trackLeadMagnetDownload = (magnetName: string) => {
  trackCustomEvent("lead_magnet_download", {
    event_category: "conversions",
    event_label: magnetName,
    value: 1,
  });
};
