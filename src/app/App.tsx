import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./components/strict-dev/Navbar";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/strict-dev/Footer";
import Breadcrumbs from "./components/strict-dev/Breadcrumbs";
import { CookieBanner } from "./components/strict-dev/CookieBanner";
import { SmoothScroll } from "./components/strict-dev/SmoothScroll";
import { LoadingScreen } from "./components/strict-dev/LoadingScreen";
import { GoogleAnalytics } from "./components/strict-dev/GoogleAnalytics";
import { ScrollProgress } from "./components/strict-dev/ScrollProgress";
import { BackToTop } from "./components/strict-dev/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { LiveChatSkeleton } from "./components/strict-dev/SkeletonLoaders";
import { ErrorBoundary } from "./components/strict-dev/ErrorBoundary";

// Lazy load: service pages (below-the-fold routes)
const WebDevelopmentPage = lazy(() => import("./pages/WebDevelopmentPage").then(m => ({ default: m.WebDevelopmentPage })));
const AIAgentsPage = lazy(() => import("./pages/AIAgentsPage").then(m => ({ default: m.AIAgentsPage })));
const EcommercePage = lazy(() => import("./pages/EcommercePage").then(m => ({ default: m.EcommercePage })));
const GDPRPage = lazy(() => import("./pages/GDPRPage").then(m => ({ default: m.GDPRPage })));
const MaintenancePage = lazy(() => import("./pages/MaintenancePage").then(m => ({ default: m.MaintenancePage })));
const InfrastructurePage = lazy(() => import("./pages/InfrastructurePage").then(m => ({ default: m.InfrastructurePage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

// Lazy load: heavy below-the-fold widgets
const LiveChatWidget = lazy(() => import("./components/strict-dev/LiveChatWidget").then(m => ({ default: m.LiveChatWidget })));

// Minimal loading fallback for lazy-loaded pages
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="w-48 h-[1px] bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-[#2f5e50] animate-[shimmer_1s_ease-in-out_infinite]" />
      </div>
      <style>{`.animate-\\[shimmer_1s_ease-in-out_infinite\\]{animation:shimmer 1s ease-in-out infinite}@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
    </div>
  );
}

// ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (like #contact), scroll to it
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace("#", ""));
        if (element) {
          const navbarHeight = window.innerWidth < 768 ? 64 : 80;
          const targetPosition = element.offsetTop - navbarHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans text-neutral-900 bg-white dark:bg-[#0a0a0a] dark:text-[#e5e5e5] selection:bg-[#2f5e50] selection:text-white overflow-x-hidden transition-colors duration-300">
        {/* Skip to main content - WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-[#2f5e50] focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:outline-none focus:ring-2 focus:ring-white"
        >
          {language === 'pt' ? 'Saltar para o conteúdo principal' : 'Skip to main content'}
        </a>
        <Toaster position="top-center" />
        <SmoothScroll />
        <ScrollToTop />
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        
        <div className={loading ? "hidden" : "block"}>
          <header>
            <Navbar />
            <Breadcrumbs />
          </header>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicos/desenvolvimento-web" element={<Suspense fallback={<PageFallback />}><WebDevelopmentPage /></Suspense>} />
              <Route path="/servicos/agentes-ia" element={<Suspense fallback={<PageFallback />}><AIAgentsPage /></Suspense>} />
              <Route path="/servicos/loja-online" element={<Suspense fallback={<PageFallback />}><EcommercePage /></Suspense>} />
              <Route path="/servicos/rgpd-dados" element={<Suspense fallback={<PageFallback />}><GDPRPage /></Suspense>} />
              <Route path="/servicos/manutencao" element={<Suspense fallback={<PageFallback />}><MaintenancePage /></Suspense>} />
              <Route path="/servicos/infraestrutura" element={<Suspense fallback={<PageFallback />}><InfrastructurePage /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
          <GoogleAnalytics />
          <Suspense fallback={<LiveChatSkeleton />}>
            <LiveChatWidget />
          </Suspense>
          <ScrollProgress />
          <BackToTop />
        </div>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;