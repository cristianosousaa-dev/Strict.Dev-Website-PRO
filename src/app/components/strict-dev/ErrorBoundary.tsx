import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - Catches runtime errors in production
 * Prevents white screen of death, shows Swiss-style fallback
 * Bilingual: reads lang from document.documentElement.lang
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    }
  }

  private getLang(): 'pt' | 'en' {
    const htmlLang = document.documentElement.lang || 'pt-PT';
    return htmlLang.startsWith('en') ? 'en' : 'pt';
  }

  private handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const lang = this.getLang();
      const isPt = lang === 'pt';

      return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            {/* Brand mark */}
            <div className="mb-8">
              <span className="text-[#2f5e50] text-[9px] font-bold uppercase tracking-[0.3em]">
                Strict.Dev
              </span>
            </div>

            {/* Error indicator */}
            <div className="w-12 h-[2px] bg-[#2f5e50] mx-auto mb-8" />

            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3">
              {isPt ? 'Ocorreu um erro inesperado' : 'An unexpected error occurred'}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 max-w-sm mx-auto">
              {isPt
                ? 'Pedimos desculpa pelo inconveniente. A nossa equipa foi notificada. Por favor, recarregue a página ou volte à página inicial.'
                : 'We apologise for the inconvenience. Our team has been notified. Please reload the page or return to the homepage.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="h-10 px-6 bg-[#2f5e50] hover:bg-[#234539] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {isPt ? 'Recarregar página' : 'Reload page'}
              </button>
              <button
                onClick={this.handleReload}
                className="h-10 px-6 border border-neutral-300 dark:border-[#2a2a2a] hover:border-[#2f5e50] text-neutral-900 dark:text-neutral-100 hover:text-[#2f5e50] text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {isPt ? 'Página inicial' : 'Homepage'}
              </button>
            </div>

            {/* Error details in dev */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-[9px] uppercase tracking-widest text-neutral-400 cursor-pointer hover:text-[#2f5e50]">
                  {isPt ? 'Detalhes do erro (dev only)' : 'Error details (dev only)'}
                </summary>
                <pre className="mt-3 p-4 bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-[#2a2a2a] text-[10px] text-red-600 dark:text-red-400 overflow-auto max-h-40 font-mono">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
