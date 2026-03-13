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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Allow hash links to work with Lenis
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
