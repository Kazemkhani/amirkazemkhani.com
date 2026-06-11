import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative animated SVG path treatments — editorial gold, Stripe/Linear calibre.
 *
 * Purely presentational: aria-hidden, pointer-events-none, absolutely
 * positioned (zero layout shift), inline SVG (no external requests).
 *
 * - Draw-in uses a CSS stroke-dash animation (`.hero-path-draw` in index.css),
 *   which falls back to a fully-drawn static path under
 *   `prefers-reduced-motion: reduce`.
 * - The traveling pulse dots use SMIL `animateMotion` and are skipped
 *   entirely under reduced motion (SMIL ignores the CSS media query).
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* Signature trajectory: enters low-left, dips beneath the headline column,
   then rises toward the portrait and exits top-right.
   Simplified to a single stroke (the former echo path was removed when the
   vertical gutter rail landed — one horizontal signature line composes with
   the new vertical rhythm instead of competing with it). */
const MAIN_D =
  "M -80 645 C 180 668, 392 560, 580 470 S 905 522, 1080 400 S 1390 175, 1545 130";

export function HeroPathDecor() {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const strokeId = `heroPathGold${uid}`;
  const glowId = `heroDotGlow${uid}`;
  const mainId = `heroPathMain${uid}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient
          id={strokeId}
          x1="0"
          y1="450"
          x2="1440"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="0.2" stopColor="#c9a84c" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#f0d6a0" stopOpacity="0.75" />
          <stop offset="0.8" stopColor="#e7bc66" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c9a84c" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="#f0d6a0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f0d6a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        id={mainId}
        d={MAIN_D}
        stroke={`url(#${strokeId})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="hero-path-draw"
      />
      {!reduceMotion && (
        /* Traveling pulse along the signature stroke */
        <g opacity="0">
          <circle r="9" fill={`url(#${glowId})`} />
          <circle r="2" fill="#f0d6a0" />
          <animateMotion dur="11s" begin="3s" repeatCount="indefinite">
            <mpath href={`#${mainId}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="11s"
            begin="3s"
            repeatCount="indefinite"
          />
        </g>
      )}
    </svg>
  );
}

const FLOURISH_LINE = "M6 14 C 70 14, 105 6, 170 14 C 235 22, 270 14, 334 14";
const FLOURISH_DIAMOND = "M170 9.5 L174.5 14 L170 18.5 L165.5 14 Z";

/**
 * Delicate gold flourish overlaid on the seam between two sections.
 * Wrapper is h-0 → occupies no flow space (zero layout shift); the SVG
 * draws itself in on scroll-into-view.
 */
export function SectionFlourish() {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gid = `flourishGold${uid}`;

  return (
    <div
      aria-hidden="true"
      className="relative h-0 overflow-visible flex justify-center pointer-events-none select-none"
    >
      <svg
        width="340"
        height="28"
        viewBox="0 0 340 28"
        fill="none"
        focusable="false"
        className="max-w-[78vw] -translate-y-1/2"
      >
        <defs>
          <linearGradient
            id={gid}
            x1="0"
            y1="14"
            x2="340"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#c9a84c" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e7bc66" stopOpacity="0.8" />
            <stop offset="1" stopColor="#c9a84c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {reduceMotion ? (
          <>
            <path d={FLOURISH_LINE} stroke={`url(#${gid})`} strokeWidth="1" />
            <path
              d={FLOURISH_DIAMOND}
              fill="hsl(var(--background))"
              stroke="#c9a84c"
              strokeWidth="1"
              opacity="0.9"
            />
          </>
        ) : (
          <>
            <motion.path
              d={FLOURISH_LINE}
              stroke={`url(#${gid})`}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.3, ease: EASE }}
            />
            <motion.path
              d={FLOURISH_DIAMOND}
              fill="hsl(var(--background))"
              stroke="#c9a84c"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default HeroPathDecor;
