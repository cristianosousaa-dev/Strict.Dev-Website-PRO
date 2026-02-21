import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import SEOHead from "../components/strict-dev/SEOHead";

export function NotFoundPage() {
  const { t, language } = useTheme();

  return (
    <section className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24" aria-labelledby="not-found-title">
      <SEOHead
        title={`404 — ${language === "pt" ? "Página não encontrada" : "Page not found"} | Strict.Dev`}
        description={language === "pt" ? "A página que procura não existe ou foi removida." : "The page you are looking for does not exist or has been removed."}
        noindex={true}
      />
      <div className="border border-neutral-200 dark:border-[#1a1a1a] rounded-none p-6 md:p-10 bg-white dark:bg-[#0a0a0a]">
        <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 mb-2">
          {t.notFound.badge}
        </p>
        <h1 id="not-found-title" className="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-neutral-100 mb-3">
          {t.notFound.title}
        </h1>
        <p className="text-sm md:text-base text-slate-700 dark:text-neutral-300 max-w-2xl mb-6">
          {t.notFound.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-4 bg-[#2f5e50] hover:bg-[#254a3d] text-white rounded-none text-sm"
          >
            {t.notFound.ctaHome}
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center h-10 px-4 border border-slate-300 hover:border-[#2f5e50] hover:text-[#2f5e50] rounded-none text-sm text-slate-900 dark:text-neutral-100"
          >
            {t.notFound.ctaContact}
          </Link>
        </div>
      </div>
    </section>
  );
}
