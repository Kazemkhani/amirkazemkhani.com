import { Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const PageLoading = () => (
  <div className="flex justify-center items-center h-screen w-full bg-background">
    <div className="text-center">
      <p className="section-label mb-4">Loading</p>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <Suspense fallback={<PageLoading />}>
        <WouterRouter>
          <Route path="/" component={Home} />
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
