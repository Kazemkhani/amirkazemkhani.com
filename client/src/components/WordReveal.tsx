import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Shared text reveal. Editorial pacing for articles; perspective for portfolio headings.
 */
const WordReveal = ({
  text,
  delay = 0,
  isInView = true,
  variant = "editorial",
  paused = false,
}: {
  text: string;
  delay?: number;
  isInView?: boolean;
  variant?: "editorial" | "sculpted";
  paused?: boolean;
}) => {
  const reduce = useReducedMotion();
  if (reduce || paused)
    return (
      <span
        className={variant === "sculpted" ? "kinetic-line is-still" : undefined}
      >
        {text}
      </span>
    );
  if (variant === "sculpted")
    return (
      <span className="kinetic-line" aria-label={text}>
        {text.split(" ").map((word, i) => (
          <motion.span
            aria-hidden="true"
            key={`${word}-${i}`}
            initial={{
              rotateX: 75,
              y: "0.5em",
              opacity: 0,
              filter: "blur(8px)",
            }}
            whileInView={{ rotateX: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: delay + i * 0.07, ease: EASE }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00a0" : ""}
          </motion.span>
        ))}
      </span>
    );
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.05,
            ease: EASE,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};

export default WordReveal;
