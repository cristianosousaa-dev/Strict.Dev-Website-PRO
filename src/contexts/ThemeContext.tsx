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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = localStorage.getItem("strict-dev-theme");
      return (saved as Theme) || "light";
    } catch {
      return 'light';
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'pt';
    try {
      const saved = localStorage.getItem("strict-dev-language");
      return (saved as Language) || "pt";
    } catch {
      return 'pt';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('loading');
    
    const timer = setTimeout(() => {
      root.classList.remove('loading');
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('theme-transitioning');
      });
    });
    
    try {
      localStorage.setItem("strict-dev-theme", theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("strict-dev-language", language);
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Error saving language:', error);
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
    if (process.env.NODE_ENV === 'development') {
      return {
        theme: 'light' as Theme,
        language: 'pt' as Language,
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