import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { GA4_MEASUREMENT_ID } from "../../../config/keys";

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

  const isEnabled = Boolean(GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX");

  const enableGA = useCallback(() => {
    if (!isEnabled) return;
    if (gaLoadedRef.current) return;

    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;

    if (!document.getElementById("ga4-script")) {
      const script = document.createElement("script");
      script.id = "ga4-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = window.gtag || gtag;

    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });

    gaLoadedRef.current = true;
  }, [GA4_MEASUREMENT_ID, isEnabled]);

  const disableGA = useCallback(() => {
    if (!isEnabled) return;
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
    deleteGaCookies();
  }, [GA4_MEASUREMENT_ID, isEnabled]);

  const applyConsent = useCallback(() => {
    if (!isEnabled) return;
    const consent = readCookieConsent();
    if (consent?.analytics) {
      enableGA();
    } else {
      disableGA();
    }
  }, [isEnabled, enableGA, disableGA]);

  // Apply current consent on mount
  useEffect(() => {
    if (!isEnabled) return;

    applyConsent();

    const handler = () => applyConsent();
    window.addEventListener("strict-dev-cookie-consent", handler as any);

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "cookie-consent") applyConsent();
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("strict-dev-cookie-consent", handler as any);
      window.removeEventListener("storage", storageHandler);
    };
  }, [isEnabled, applyConsent]);

  // Track virtual pageviews on route change
  useEffect(() => {
    if (!isEnabled) return;
    if (!gaLoadedRef.current) return;
    if (window[`ga-disable-${GA4_MEASUREMENT_ID}`]) return;
    if (!window.gtag) return;

    window.gtag("config", GA4_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location, GA4_MEASUREMENT_ID, isEnabled]);

  // Engagement tracking
  useEffect(() => {
    if (!isEnabled) return;

    const clickHandler = (e: MouseEvent) => {
      if (!gaLoadedRef.current) return;
      if (window[`ga-disable-${GA4_MEASUREMENT_ID}`]) return;
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
      if (window[`ga-disable-${GA4_MEASUREMENT_ID}`]) return;
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
  }, [GA4_MEASUREMENT_ID, isEnabled]);

  return null;
}

// Helper function to track custom events
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`]) return;
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