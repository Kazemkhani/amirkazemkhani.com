import { Route, Switch, useParams, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import AnchorScroll from "@/components/AnchorScroll";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Articles = lazy(() => import("./pages/Articles"));
const Article = lazy(() => import("./pages/Article"));
const WorkWithMe = lazy(() => import("./pages/WorkWithMe"));

/** Route-level fallback — blank canvas, no spinner theater. */
const PageLoading = () => (
  <div className="min-h-screen w-full bg-background" aria-hidden="true" />
);

/** Wrapper that extracts the slug param and passes it to ArticlePage */
function ArticleRoute() {
  const params = useParams<{ slug: string }>();
  return <Article slug={params.slug ?? ""} />;
}

/**
 * Routes — zero animation on navigation (route changes are
 * keyboard-frequency actions; see docs/DESIGN-DOCTRINE.md motion budget).
 */
function Routes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles/:slug" component={ArticleRoute} />
        <Route path="/work-with-me" component={WorkWithMe} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

/**
 * Global click interceptor — converts internal <a href> clicks to SPA
 * navigation so we don't get full page reloads.
 */
function useSPALinks() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only handle left clicks without modifiers
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const anchor = (e.target as HTMLElement).closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, mailto, tel, download, target=_blank
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank"
      )
        return;

      // Skip pure hash links on same page (handled by AnchorScroll)
      if (href.startsWith("#")) return;

      // Handle /#hash links — navigate to home then scroll to hash
      if (href.startsWith("/#")) {
        const hash = href.slice(2);
        const currentPath = window.location.pathname;

        if (currentPath === "/") {
          // Already on home — just scroll to the element
          e.preventDefault();
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Navigate to home, then scroll after render
          e.preventDefault();
          setLocation("/");
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
        return;
      }

      // Internal path link — SPA navigate, instant
      e.preventDefault();
      setLocation(href);
      window.scrollTo(0, 0);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setLocation]);
}

function App() {
  // Intercept internal links for SPA navigation
  useSPALinks();

  return (
    <AnchorScroll>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="min-h-screen bg-background text-foreground grain">
        <Header />
        <Routes />
        <Footer />
        <BackToTop />
      </div>
    </AnchorScroll>
  );
}

export default App;
