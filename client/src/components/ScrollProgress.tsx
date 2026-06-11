import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Thin gold progress bar at top of viewport.
 * Hidden on article pages which have their own progress bar.
 *
 * Perf: writes `transform: scaleX()` straight to the DOM node inside a
 * rAF-throttled passive scroll listener — zero React re-renders while
 * scrolling, transform-only (compositor thread).
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Hide on article detail pages (they have their own progress bar)
  const isArticlePage = location.startsWith("/articles/");

  useEffect(() => {
    if (isArticlePage) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage]);

  if (isArticlePage) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, hsl(43 50% 54%), hsl(43 60% 65%))",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
