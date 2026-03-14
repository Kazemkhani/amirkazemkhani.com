import { Route, useParams, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Articles = lazy(() => import("./pages/Articles"));
const Article = lazy(() => import("./pages/Article"));

const PageLoading = () => (
  <div className="flex justify-center items-center h-screen w-full bg-background">
    <div className="text-center">
      <p className="section-label mb-4">Loading</p>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
    </div>
  </div>
);

/** Fade transition wrapper for all pages */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper that extracts the slug param and passes it to ArticlePage */
function ArticleRoute() {
  const params = useParams<{ slug: string }>();
  return <Article slug={params.slug ?? ""} />;
}

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoading />} key={location}>
        <Route path="/">
          <PageTransition><Home /></PageTransition>
        </Route>
        <Route path="/articles">
          <PageTransition><Articles /></PageTransition>
        </Route>
        <Route path="/articles/:slug">
          <PageTransition><ArticleRoute /></PageTransition>
        </Route>
        <Route path="/privacy">
          <PageTransition><Privacy /></PageTransition>
        </Route>
        <Route path="/terms">
          <PageTransition><Terms /></PageTransition>
        </Route>
        <Route path="/:rest*">
          <PageTransition><NotFound /></PageTransition>
        </Route>
      </Suspense>
    </AnimatePresence>
  );
}

/**
 * Global click interceptor — converts internal <a href> clicks to SPA navigation
 * so we don't get full page reloads (and therefore no loading screen on every click).
 */
function useSPALinks() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only handle left clicks without modifiers
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip external links, mailto, tel, download, target=_blank
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || anchor.hasAttribute('download') || anchor.target === '_blank') return;

      // Skip pure hash links on same page (handled by SmoothScroll)
      if (href.startsWith('#')) return;

      // Handle /#hash links — navigate to home then scroll to hash
      if (href.startsWith('/#')) {
        const hash = href.slice(2);
        const currentPath = window.location.pathname;

        if (currentPath === '/') {
          // Already on home — just scroll to the element
          e.preventDefault();
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Navigate to home, then scroll after render
          e.preventDefault();
          setLocation('/');
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 400); // Wait for page transition
        }
        return;
      }

      // Internal path link — SPA navigate
      e.preventDefault();
      setLocation(href);
      window.scrollTo(0, 0);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [setLocation]);
}

function App() {
  // Only show loading screen on first cold load (not on SPA navigations)
  const isFirstVisit = !sessionStorage.getItem('amirk-loaded');
  const [loaded, setLoaded] = useState(!isFirstVisit);

  const onLoadComplete = useCallback(() => {
    sessionStorage.setItem('amirk-loaded', '1');
    setLoaded(true);
  }, []);

  // If already loaded (returning visit in this tab), mark immediately
  useEffect(() => {
    if (!isFirstVisit) {
      sessionStorage.setItem('amirk-loaded', '1');
    }
  }, [isFirstVisit]);

  // Intercept internal links for SPA navigation
  useSPALinks();

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      </AnimatePresence>

      {loaded && (
        <SmoothScroll>
          <div className="min-h-screen bg-background text-foreground grain">
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <AnimatedRoutes />
            <Footer />
            <BackToTop />
            <Toaster />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
