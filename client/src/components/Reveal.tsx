import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — THE entrance primitive (motion budget, see docs/DESIGN-DOCTRINE.md).
 * opacity 0→1 + y 10→0, 220ms ease-out, once, -10% viewport margin.
 * Reduced-motion users get opacity-only. Never re-animates.
 */
const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();

  // No IntersectionObserver (old engines, some prerenderers) → content must
  // never be trapped at opacity 0. Render plain.
  if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.22, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
