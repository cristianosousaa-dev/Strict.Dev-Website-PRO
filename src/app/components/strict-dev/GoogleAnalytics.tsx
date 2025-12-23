import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Google Analytics 4 - Substitua YOUR_GA4_ID pelo seu ID real (ex: G-XXXXXXXXXX)
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Substituir por ID real do GA4
    
    // Carregar script do GA4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Inicializar dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      anonymize_ip: true, // GDPR compliance
      cookie_flags: 'SameSite=None;Secure',
    });

    // Event tracking helper
    const trackEvent = (eventName: string, params?: any) => {
      if (window.gtag) {
        window.gtag('event', eventName, params);
      }
    };

    // Track CTA clicks
    const trackCTAClicks = () => {
      document.querySelectorAll('a[href="#contact"], button[type="submit"]').forEach((el) => {
        el.addEventListener('click', () => {
          trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: el.textContent?.trim() || 'CTA',
          });
        });
      });
    };

    // Track scroll depth
    let scrollDepth = 0;
    const trackScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackPoint = ((scrollTop + winHeight) / docHeight) * 100;

      if (trackPoint > scrollDepth + 25) {
        scrollDepth = Math.floor(trackPoint / 25) * 25;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: `${scrollDepth}%`,
        });
      }
    };

    // Setup tracking
    setTimeout(trackCTAClicks, 1000);
    window.addEventListener('scroll', trackScroll);

    return () => {
      window.removeEventListener('scroll', trackScroll);
    };
  }, []);

  return null;
}

// Helper function to track custom events
export const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Helper to track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackCustomEvent('form_submission', {
    event_category: 'conversions',
    event_label: formName,
    value: success ? 1 : 0,
  });
};

// Helper to track lead magnet downloads
export const trackLeadMagnetDownload = (magnetName: string) => {
  trackCustomEvent('lead_magnet_download', {
    event_category: 'conversions',
    event_label: magnetName,
    value: 1,
  });
};
