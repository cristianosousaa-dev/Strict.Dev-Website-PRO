import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, TranslationKeys } from "../translations";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  language: Language;
  t: TranslationKeys;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function htmlLang(lang: Language) {
  return lang === "pt" ? "pt-PT" : "en-GB";
}

function readLangFromUrl(): Language | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "pt" || q === "en") return q;
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = localStorage.getItem("strict-dev-theme");
      return (saved as Theme) || "light";
    } catch {
      return "light";
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "pt";

    const urlLang = readLangFromUrl();
    if (urlLang) return urlLang;

    try {
      const saved = localStorage.getItem("strict-dev-language");
      return (saved as Language) || "pt";
    } catch {
      return "pt";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("loading");

    const timer = setTimeout(() => {
      root.classList.remove("loading");
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-transitioning");
      });
    });

    try {
      localStorage.setItem("strict-dev-theme", theme);
    } catch {
      // ignora
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("strict-dev-language", language);
    } catch {
      // ignora
    }

    document.documentElement.lang = htmlLang(language);

    // Faz o ?lang= funcionar e mantém coerência com as tags hreflang
    // Se já existe ?lang, atualiza sempre
    // Se não existe e a língua é EN, adiciona
    // Se não existe e a língua é PT, não mexe no URL
    try {
      const url = new URL(window.location.href);
      const hasLang = url.searchParams.has("lang");

      if (hasLang) {
        url.searchParams.set("lang", language);
      } else if (language === "en") {
        url.searchParams.set("lang", "en");
      }

      const search = url.searchParams.toString();
      const next = url.pathname + (search ? `?${search}` : "") + url.hash;
      history.replaceState(null, "", next);
    } catch {
      // ignora
    }
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];
  const isDarkMode = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, language, t, isDarkMode, toggleTheme, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    if (import.meta.env.DEV) {
      return {
        theme: "light" as Theme,
        language: "pt" as Language,
        t: translations.pt,
        isDarkMode: false,
        toggleTheme: () => {},
        setLanguage: () => {},
      };
    }
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
