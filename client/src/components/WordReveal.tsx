import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * WordReveal — word-by-word stagger, reserved for the article template
 * (the one place the long-form pacing earns it). Was copy-pasted in six
 * components; now lives here once. Reduced motion renders plain text.
 */
const WordReveal = ({
  text,
  delay = 0,
  isInView = true,
}: {
  text: string;
  delay?: number;
  isInView?: boolean;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
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
