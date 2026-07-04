/**
 * Analytics — inert by default.
 *
 * A delegated click listener reads the `data-track` attributes that already
 * exist across the site and dispatches to `window.plausible` IF it is
 * defined. The Plausible script itself is injected ONLY when
 * VITE_PLAUSIBLE_DOMAIN is set — with it unset this whole module is a no-op
 * listener and zero network requests.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function initAnalytics(): void {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  if (domain && !document.querySelector("script[data-plausible]")) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://plausible.io/js/script.js";
    s.setAttribute("data-domain", domain);
    s.setAttribute("data-plausible", "");
    document.head.appendChild(s);
  }

  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
    if (el?.dataset.track) window.plausible?.(el.dataset.track);
  });
}
