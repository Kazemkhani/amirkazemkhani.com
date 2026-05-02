import { Route, useParams, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";

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

/** Wrapper that extracts the slug param and passes it to ArticlePage */
function ArticleRoute() {
  const params = useParams<{ slug: string }>();
  return <Article slug={params.slug ?? ""} />;
}

/**
 * Global click interceptor — converts internal <a href> clicks to SPA navigation
 * so we don't get full page reloads.
 */
function useSPALinks() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const anchor = (e.target as HTMLElement).closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank"
      )
        return;

      if (href.startsWith("#")) return;

      if (href.startsWith("/#")) {
        const hash = href.slice(2);
        const currentPath = window.location.pathname;

        if (currentPath === "/") {
          e.preventDefault();
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          e.preventDefault();
          setLocation("/");
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
        return;
      }

      e.preventDefault();
      setLocation(href);
      window.scrollTo(0, 0);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setLocation]);
}

function AnimatedRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:slug" component={ArticleRoute} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/:rest*" component={NotFound} />
    </Suspense>
  );
}

function App() {
  useSPALinks();

  return (
    <>
      <div className="min-h-screen bg-background text-foreground grain">
        <Header />
        <AnimatedRoutes />
        <Toaster />
      </div>
    </>
  );
}

export default App;
