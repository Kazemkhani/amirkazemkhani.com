import { Route, Router as WouterRouter, useParams } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";

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

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <Suspense fallback={<PageLoading />}>
        <WouterRouter>
          <Route path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:slug" component={ArticleRoute} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/:rest*" component={NotFound} />
        </WouterRouter>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
