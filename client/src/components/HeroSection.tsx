import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.match(/^\$/)?.[0] ?? '';
  const suffix = value.replace(/^[\d$,]+/, '');
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || isNaN(num)) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * num));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, num]);

  if (isNaN(num)) return <>{value}</>;
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}

const HeroSection = () => {
  const nameWords = ['Amir'];
  const lastNameWords = ['Kazemkhani'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* CSS-animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-[orbDrift1_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/3 rounded-full blur-3xl animate-[orbDrift2_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 lg:pt-0">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-label mb-8"
        >
          AI Engineer &middot; Serial Founder &middot; Hackathon Champion
        </motion.p>

        {/* Name — word by word */}
        <h1 className="font-display text-hero font-bold text-foreground mb-6">
          {nameWords.map((word, i) => (
            <motion.span
              key={`f-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {lastNameWords.map((word, i) => (
            <motion.span
              key={`l-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="inline-block mr-[0.3em] text-gradient-gold"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building AI systems, shipping products, and winning competitions from Dubai.
          <br className="hidden md:block" />
          CS &amp; AI at the University of Birmingham.
        </motion.p>

        {/* Stats row with counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14"
        >
          {[
            { value: '9', label: 'Podium Finishes', delay: 1.1 },
            { value: '$1M', label: 'Raised at 21', delay: 1.25 },
            { value: '35+', label: 'Hackathons', delay: 1.4 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay, ease: [0.22, 0.61, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gold-500">
                <AnimatedCounter value={stat.value} delay={stat.delay} />
              </div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs — magnetic hover */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <MagneticButton strength={0.25}>
            <motion.a
              href="/#projects"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="inline-block px-8 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300"
            >
              View My Work
            </motion.a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <motion.a
              href="/#contact"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="inline-block px-8 py-3 border border-border text-foreground font-semibold rounded-full hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
            >
              Get in Touch
            </motion.a>
          </MagneticButton>
        </div>
      </div>

      {/* CSS-only scroll indicator — hidden on mobile where it overlaps CTAs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground/40 animate-[fadeIn_0.6s_2s_both]">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
};

export default HeroSection;
