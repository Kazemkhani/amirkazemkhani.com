import { useId } from "react";
import { useReducedMotion } from "framer-motion";

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

export default HeroPathDecor;
