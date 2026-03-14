import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'logo' | 'line' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('line'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 1400);
    const t3 = setTimeout(() => onComplete(), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground"
      >
        Amir<span className="text-gold-500">K</span>
      </motion.div>

      {/* Gold line draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={phase === 'line' || phase === 'exit' ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="w-24 h-px mt-4 origin-center"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(43 50% 54%), transparent)' }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={phase === 'line' || phase === 'exit' ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mt-4"
      >
        Loading
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
