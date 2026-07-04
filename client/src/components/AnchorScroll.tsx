import { useEffect } from "react";

/**
 * Anchor scrolling on top of fully NATIVE page scroll.
 *
 * Scrolling itself is left 100% native (no wheel interception, no
 * scroll-jacking, no inertia layer) so the page feels as light as the OS
 * scroll physics. Only same-page hash-link clicks are intercepted, and
 * those use scrollIntoView({ behavior: 'smooth' }) — the fixed-header
 * offset is handled by `scroll-margin-top` in index.css.
 * Honors prefers-reduced-motion (instant jump).
 */
const AnchorScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      // Extract hash from href (handles #id and /#id)
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      const id = href.slice(hashIndex + 1);
      // Only intercept if we're on the target page (or path is empty / "/")
      if (path && path !== "/" && path !== window.location.pathname) return;
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          // Mouse clicks must not leave a lingering focus ring on the link
          // (keyboard activation has e.detail === 0 and keeps :focus-visible).
          if (e.detail > 0) anchor.blur();
          // If path is "/" and we're not on home, navigate first
          if (path === "/" && window.location.pathname !== "/") {
            window.location.href = href;
            return;
          }
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          el.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
};

export default AnchorScroll;
