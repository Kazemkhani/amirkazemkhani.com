import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom gold cursor — dot follows mouse, scales up on hoverable elements.
 * Hidden on touch devices. Uses transform (compositor thread) for smoothness.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const setVisibleBoth = useCallback((v: boolean) => {
    visibleRef.current = v;
    setVisible(v);
  }, []);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) setVisibleBoth(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onEnter = () => setVisibleBoth(true);
    const onLeave = () => setVisibleBoth(false);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, .cursor-hover')) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, .cursor-hover')) {
        setHovering(false);
      }
    };

    // Smooth ring follow with lerp
    let frame: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = 'a,button,[role="button"],input,textarea{cursor:none!important}';
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.style.cursor = '';
      style.remove();
    };
  }, []); // stable deps — no teardown/recreate on visibility change

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          borderRadius: '50%',
          background: 'hsl(43 50% 54%)',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Ring — follows with lerp delay */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,opacity] duration-300"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: '50%',
          border: `1px solid hsl(43 50% 54% / ${hovering ? 0.5 : 0.2})`,
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
