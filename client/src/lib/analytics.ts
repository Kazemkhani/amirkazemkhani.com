/**
 * Analytics loader — Plausible (privacy-first, no cookies, PDPL/GDPR compliant).
 *
 * No env var needed; the domain identifier IS amirkazemkhani.com. Localhost is
 * automatically ignored by Plausible's script.
 *
 * Why Plausible and not GA4 / PostHog / Vercel Analytics:
 *   - Cookieless → no consent banner required under UAE PDPL + GDPR.
 *   - <1KB script, fast, ad-block-survival via /js/script.js proxying if needed.
 *   - Public share link → embed straight into the Notion conversion dashboard.
 *
 * To add an event manually (e.g. "Demo Booked"):
 *   trackEvent("Demo Booked", { plan: "discovery-30" });
 */

const PLAUSIBLE_DOMAIN = "amirkazemkhani.com";
const PLAUSIBLE_SRC = "https://plausible.io/js/script.outbound-links.js";

declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

let injected = false;

export function initAnalytics(): void {
  if (injected) return;
  if (typeof window === "undefined") return;
  // Skip on localhost / preview deployments to keep stats clean.
  const host = window.location.hostname;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return;
  }
  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
  script.src = PLAUSIBLE_SRC;
  document.head.appendChild(script);
  injected = true;
}

export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  window.plausible(name, props ? { props } : undefined);
}
