import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: any;
  }
}

type Props = {
  siteKey: string;
  theme: "light" | "dark";
  onToken: (token: string) => void;
};

export function TurnstileWidget({ siteKey, theme, onToken }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<any>(null);

  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) return;

    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled) return;
      if (!containerRef.current) return;
      if (!window.turnstile) return;

      containerRef.current.innerHTML = "";
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    const timer = setInterval(() => {
      if (window.turnstile && containerRef.current) {
        clearInterval(timer);
        render();
      }
    }, 250);

    return () => {
      cancelled = true;
      clearInterval(timer);
      try {
        if (window.turnstile && widgetIdRef.current !== null) {
          window.turnstile.remove(widgetIdRef.current);
        }
      } catch {
        // ignore
      }
      widgetIdRef.current = null;
    };
  }, [siteKey, theme, onToken]);

  return <div ref={containerRef} />;
}
