import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/**
 * VerticalRail — THE signature device (one-signature-device law,
 * docs/DESIGN-DOCTRINE.md).
 *
 * A thin gold line in the left viewport gutter (desktop ≥1280px only) that
 * draws with scroll: `useScroll` progress through the page, run through a
 * `useSpring` (stiffness 90, damping 25) so it feels physical — it
 * overshoots a breath and settles. Diamond notches sit at each section
 * anchor and flip to a lit state the moment the spring passes them
 * (discrete notch states).
 *
 * Overlap safety: rail X derives from the viewport gutter
 * ((innerWidth − 1280) / 2) and is clamped to stay ≥18px clear of the
 * content column. Below 1280px the component renders nothing.
 *
 * Reduced motion: rail renders fully drawn, all notches lit, zero animation.
 */

const DESKTOP_MQ = "(min-width: 1280px)";
const CONTENT_MAX = 1280; // Tailwind max-w-7xl
const CONTENT_PAD = 32; // px-8 horizontal padding at lg+

interface Geometry {
  railX: number; // viewport x of the rail line
  height: number; // host height in px
  notches: { id: string; y: number }[];
}

function measure(host: HTMLElement, sectionIds: string[]): Geometry {
  const hostRect = host.getBoundingClientRect();
  const gutter = Math.max(14, (window.innerWidth - CONTENT_MAX) / 2 - 24);
  const contentLeft =
    Math.max(0, (window.innerWidth - CONTENT_MAX) / 2) + CONTENT_PAD;
  const railX = Math.min(gutter, contentLeft - 18);

  const notches: Geometry["notches"] = [];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    notches.push({ id, y: rect.top - hostRect.top + 28 });
  }
  return { railX, height: Math.round(hostRect.height), notches };
}

const VerticalRail = ({ sectionIds }: { sectionIds: string[] }) => {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [litCount, setLitCount] = useState(0);

  // Scroll progress through the page content, springed
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end end"],
  });
  const spring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 1,
  });

  // Desktop-only gate
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Geometry: measure on mount + resize + content reflow (images etc.)
  useEffect(() => {
    if (!enabled) {
      setGeo(null);
      return;
    }
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const remeasure = () => setGeo(measure(host, sectionIds));
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(remeasure);
      }, 200);
    };

    remeasure();
    window.addEventListener("resize", debounced);
    window.addEventListener("load", debounced);
    const ro =
      "ResizeObserver" in window ? new ResizeObserver(debounced) : null;
    if (ro && host.parentElement) ro.observe(host.parentElement);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", debounced);
      window.removeEventListener("load", debounced);
      ro?.disconnect();
    };
  }, [enabled, sectionIds]);

  // Discrete notch states — state only changes when a notch is crossed
  useMotionValueEvent(spring, "change", (v) => {
    if (!geo) return;
    const drawnPx = v * geo.height;
    const count = geo.notches.filter((n) => n.y <= drawnPx).length;
    setLitCount((c) => (c === count ? c : count));
  });

  if (!enabled) {
    // hostRef must exist for useScroll even below the breakpoint
    return <div ref={hostRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden xl:block"
    >
      {geo && (
        <div
          className="absolute top-0"
          style={{ left: geo.railX, height: geo.height }}
        >
          {/* Track — faint, always present */}
          <div
            className="absolute top-0 w-px"
            style={{
              height: geo.height,
              background: "hsl(var(--gold) / 0.12)",
            }}
          />
          {/* Drawn line — springed scroll progress */}
          <motion.div
            className="absolute top-0 w-px origin-top"
            style={{
              height: geo.height,
              scaleY: reduceMotion ? 1 : spring,
              background:
                "linear-gradient(180deg, #8a6d2f 0%, #9d7d36 55%, #b09045 100%)",
              opacity: 0.65,
            }}
          />
          {/* Notches — one diamond per section anchor, discrete lit states */}
          {geo.notches.map((n, i) => (
            <div
              key={n.id}
              className="rail-node absolute w-[7px] h-[7px]"
              data-lit={reduceMotion || i < litCount ? "true" : "false"}
              style={{
                top: n.y - 3.5,
                left: -3,
                background:
                  reduceMotion || i < litCount
                    ? "#8a6d2f"
                    : "hsl(var(--background))",
                border: "1px solid #8a6d2f",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalRail;
