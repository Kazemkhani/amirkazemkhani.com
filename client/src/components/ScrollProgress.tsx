import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * Thin gold progress bar at top of viewport.
 * Hidden on article pages which have their own progress bar.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [location] = useLocation();

  // Hide on article detail pages (they have their own progress bar)
  const isArticlePage = location.startsWith('/articles/');

  useEffect(() => {
    if (isArticlePage) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isArticlePage]);

  if (isArticlePage) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, hsl(43 50% 54%), hsl(43 60% 65%))',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
