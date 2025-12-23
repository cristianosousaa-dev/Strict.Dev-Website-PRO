import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

export function ThemeLanguageControls() {
  const { theme, language, toggleTheme, setLanguage } = useTheme();

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Dark Mode Toggle - FIXED SIZE, ICON ONLY, INSTANT */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-9 h-9 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
        aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      >
        {theme === "light" ? (
          <Moon 
            key="moon"
            className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-[#2f5e50]" 
          />
        ) : (
          <Sun 
            key="sun"
            className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-[#2f5e50]" 
          />
        )}
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      {/* Language Switcher */}
      <div className="flex items-center gap-2">
        <Globe className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => setLanguage("pt")}
          className={`text-[9px] md:text-[10px] uppercase tracking-wider font-bold px-2 py-1 cursor-pointer transition-colors ${
            language === "pt"
              ? "text-[#2f5e50] bg-slate-100 dark:bg-slate-800"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
          aria-label="Mudar para Português"
        >
          PT
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`text-[9px] md:text-[10px] uppercase tracking-wider font-bold px-2 py-1 cursor-pointer transition-colors ${
            language === "en"
              ? "text-[#2f5e50] bg-slate-100 dark:bg-slate-800"
              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
}