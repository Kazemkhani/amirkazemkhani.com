import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import { captureInboundUtm } from "./lib/utm";
import { maybeLoadLinkedInPixel } from "./components/CookieBanner";

// First-touch UTM attribution — captured BEFORE analytics fire so we never
// lose the original source of a visit (e.g. user refreshes after landing).
captureInboundUtm();

// Plausible — privacy-first, no cookie banner needed.
initAnalytics();

// LinkedIn Insight Tag — only fires if (a) VITE_LINKEDIN_PARTNER_ID is set
// and (b) the visitor has previously granted consent via the cookie banner.
maybeLoadLinkedInPixel();

createRoot(document.getElementById("root")!).render(<App />);
