import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Navbar } from "./components/strict-dev/Navbar";
import { HomePage } from "./pages/HomePage";
import { WebDevelopmentPage } from "./pages/WebDevelopmentPage";
import { AIAgentsPage } from "./pages/AIAgentsPage";
import { EcommercePage } from "./pages/EcommercePage";
import { GDPRPage } from "./pages/GDPRPage";
import { MaintenancePage } from "./pages/MaintenancePage";
import { InfrastructurePage } from "./pages/InfrastructurePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Footer } from "./components/strict-dev/Footer";
import Breadcrumbs from "./components/strict-dev/Breadcrumbs";
import { CookieBanner } from "./components/strict-dev/CookieBanner";
import { SmoothScroll } from "./components/strict-dev/SmoothScroll";
import { LoadingScreen } from "./components/strict-dev/LoadingScreen";
import { GoogleAnalytics } from "./components/strict-dev/GoogleAnalytics";
import { SocialSchema } from "./components/strict-dev/SocialSchema";
import { ScrollProgress } from "./components/strict-dev/ScrollProgress";
import { BackToTop } from "./components/strict-dev/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { lazy, Suspense } from "react";
import { LiveChatSkeleton } from "./components/strict-dev/SkeletonLoaders";

// Lazy load components below the fold and modals
const LiveChatWidget = lazy(() => import("./components/strict-dev/LiveChatWidget").then(m => ({ default: m.LiveChatWidget })));

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

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <BrowserRouter>
      <main className="min-h-screen font-sans text-neutral-900 bg-white dark:bg-[#0a0a0a] dark:text-[#e5e5e5] selection:bg-[#2f5e50] selection:text-white overflow-x-hidden transition-colors duration-300">
        <SocialSchema />
        <Toaster position="top-center" />
        <SmoothScroll />
        <ScrollToTop />
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        
        <div className={loading ? "hidden" : "block"}>
          <Navbar />
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicos/desenvolvimento-web" element={<WebDevelopmentPage />} />
            <Route path="/servicos/agentes-ia" element={<AIAgentsPage />} />
            <Route path="/servicos/loja-online" element={<EcommercePage />} />
            <Route path="/servicos/rgpd-dados" element={<GDPRPage />} />
            <Route path="/servicos/manutencao" element={<MaintenancePage />} />
            <Route path="/servicos/infraestrutura" element={<InfrastructurePage />} />
                      <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <CookieBanner />
          <GoogleAnalytics />
          <Suspense fallback={<LiveChatSkeleton />}>
            <LiveChatWidget />
          </Suspense>
          <ScrollProgress />
          <BackToTop />
        </div>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;