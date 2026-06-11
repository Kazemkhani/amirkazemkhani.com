import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Vertical scroll-drawn gold rail — same concept as the novalabs.ae signal
 * rail, ported to React. A thin vertical gradient line lives in the LEFT
 * VIEWPORT GUTTER (desktop ≥1280px only), one segment per major section.
 * Each segment draws in top→down (stroke-dash transition, see `.vrail-*`
 * in index.css) the first time its section scrolls into view, with a small
 * gold diamond node at the segment head.
 *
 * Overlap safety: the rail X is derived from the viewport gutter
 * (`(innerWidth - 1280px content) / 2`) and additionally clamped to end
 * well before the content column's left edge, so it can NEVER overlap
 * content at any width ≥1280px. Below 1280px the component renders nothing.
 *
 * Perf: zero scroll listeners — geometry is measured once per layout
 * change (resize / ResizeObserver, debounced) and draw-in is driven by
 * IntersectionObserver. prefers-reduced-motion → fully drawn, static.
 */

const DESKTOP_MQ = "(min-width: 1280px)";
const CONTENT_MAX = 1280; // Tailwind max-w-7xl
const CONTENT_PAD = 32; // px-8 horizontal padding at lg+
const SEG_INSET = 28; // breathing room at segment top/bottom
const MIN_SECTION_H = 160;

interface Segment {
  id: string;
  top: number; // px from rail host top
  height: number; // segment svg height
}

interface RailGeometry {
  segments: Segment[];
  railX: number; // viewport x of the rail's center line
}

function measure(host: HTMLElement, sectionIds: string[]): RailGeometry {
  const hostTop = host.getBoundingClientRect().top;
  const gutter = Math.max(14, (window.innerWidth - CONTENT_MAX) / 2 - 24);
  const contentLeft =
    Math.max(0, (window.innerWidth - CONTENT_MAX) / 2) + CONTENT_PAD;
  // Hard clamp: rail centre always ≥18px clear of the content column.
  const railX = Math.min(gutter, contentLeft - 18);

  const segments: Segment[] = [];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.height < MIN_SECTION_H) continue;
    segments.push({
      id,
      top: rect.top - hostTop + SEG_INSET,
      height: Math.round(rect.height - SEG_INSET * 2),
    });
  }
  return { segments, railX };
}

const VerticalRail = ({ sectionIds }: { sectionIds: string[] }) => {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [geo, setGeo] = useState<RailGeometry | null>(null);
  const [drawn, setDrawn] = useState<Record<string, boolean>>({});

  // Desktop-only gate
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Geometry: measure on mount + window resize + content reflow (images etc.)
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

  // Draw-in: observe the sections themselves
  useEffect(() => {
    if (!enabled || !geo) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setDrawn(Object.fromEntries(geo.segments.map((s) => [s.id, true])));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setDrawn((d) => (d[id] ? d : { ...d, [id]: true }));
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const seg of geo.segments) {
      const el = document.getElementById(seg.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, geo === null, reduceMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden xl:block"
    >
      {geo?.segments.map((seg, i) => {
        const gid = `vrailGold${i}`;
        const headY = 5;
        return (
          <svg
            key={seg.id}
            className={`vrail-seg absolute${drawn[seg.id] ? " is-drawn" : ""}`}
            style={{ top: seg.top, left: geo.railX - 12 }}
            width="24"
            height={seg.height}
            viewBox={`0 0 24 ${seg.height}`}
            fill="none"
            focusable="false"
          >
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c9a84c" stopOpacity="0" />
                <stop offset="0.12" stopColor="#c9a84c" stopOpacity="0.9" />
                <stop offset="0.88" stopColor="#f0d6a0" stopOpacity="0.9" />
                <stop offset="1" stopColor="#f0d6a0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="vrail-path"
              d={`M12 ${headY} L12 ${seg.height - 5}`}
              pathLength={1}
              stroke={`url(#${gid})`}
              strokeWidth="1.5"
            />
            {/* Diamond node at the segment head */}
            <rect
              className="vrail-node"
              x="8.8"
              y={headY - 3.2}
              width="6.4"
              height="6.4"
              transform={`rotate(45 12 ${headY})`}
              fill="#e7bc66"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default VerticalRail;
