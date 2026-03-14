import { Route, useParams, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useState, useCallback } from "react";
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

function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

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
