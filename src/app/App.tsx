import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./components/strict-dev/Navbar";
import { Hero } from "./components/strict-dev/Hero";
import { Services } from "./components/strict-dev/Services";
import { TechStack } from "./components/strict-dev/TechStack";
import { Compliance } from "./components/strict-dev/Compliance";
import { WhyUs } from "./components/strict-dev/WhyUs";
import { ProjectConfigurator } from "./components/strict-dev/ProjectConfigurator";
import { CTA } from "./components/strict-dev/CTA";
import { Contact } from "./components/strict-dev/Contact";
import { Footer } from "./components/strict-dev/Footer";
import { SEOHead } from "./components/strict-dev/SEOHead";
import { CookieBanner } from "./components/strict-dev/CookieBanner";
import { SmoothScroll } from "./components/strict-dev/SmoothScroll";
import { LoadingScreen } from "./components/strict-dev/LoadingScreen";
import { GoogleAnalytics } from "./components/strict-dev/GoogleAnalytics";
import { ScrollProgress } from "./components/strict-dev/ScrollProgress";
import { BackToTop } from "./components/strict-dev/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { lazy, Suspense } from "react";
import { LiveChatSkeleton } from "./components/strict-dev/SkeletonLoaders";

// Lazy load components below the fold and modals
const LiveChatWidget = lazy(() => import("./components/strict-dev/LiveChatWidget").then(m => ({ default: m.LiveChatWidget })));

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const { language } = useTheme();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <main className="min-h-screen font-sans text-neutral-900 bg-white dark:bg-[#0a0a0a] dark:text-[#e5e5e5] selection:bg-[#2f5e50] selection:text-white overflow-x-hidden transition-colors duration-300">
      <SEOHead />
      <Toaster position="top-center" />
      <SmoothScroll />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className={loading ? "hidden" : "block"}>
        <Navbar />
        <Hero 
          onShowAnimation={() => setShowAnimation(true)}
          shouldHideCore={showAnimation}
          showAnimation={showAnimation}
          onCloseAnimation={() => setShowAnimation(false)}
        />
        <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
           <Services />
        </div>
        <TechStack />
        <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
          <Compliance />
        </div>
        <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
          <WhyUs />
        </div>
        
        <ProjectConfigurator />
        <CTA />

        <div className="border-t border-neutral-100 dark:border-[#1a1a1a]">
          <Contact />
        </div>
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