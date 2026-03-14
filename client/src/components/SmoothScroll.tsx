import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll — wraps the entire app.
 * Runs on rAF, syncs with Framer Motion's scroll tracking.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Allow hash links to work with Lenis (supports both #id and /#id)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      // Extract hash from href (handles #id and /#id)
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      const id = href.slice(hashIndex + 1);
      // Only intercept if we're on the target page (or path is empty / "/")
      if (path && path !== '/' && path !== window.location.pathname) return;
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          // If path is "/" and we're not on home, navigate first
          if (path === '/' && window.location.pathname !== '/') {
            window.location.href = href;
            return;
          }
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', handleClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
