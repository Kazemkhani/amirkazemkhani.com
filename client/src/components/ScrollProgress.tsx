import { useEffect, useState } from 'react';

/**
 * Thin gold progress bar at top of viewport.
 * Uses a single passive scroll listener — same one the header already uses.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
