import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { HeroPathDecor } from "./PathDecor";
import { withUtm } from "../lib/utm";

function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const prefix = value.match(/^\$/)?.[0] ?? "";
  const suffix = value.replace(/^[\d$,]+/, "");
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
  return (
    <>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </>
  );
}

const haloLines = [
  "★  Featured on Falcons of Majlis  ·  India Today × Aaj Tak",
  "◇  In conversation with Jensen Huang  ·  NVIDIA · 2026",
  "◎  Building at the intersection of Voice AI  ·  UAE × India",
];

const HeroSection = () => {
  const nameWords = ["Amir"];
  const lastNameWords = ["Kazemkhani"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* CSS-animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-[orbDrift1_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/3 rounded-full blur-3xl animate-[orbDrift2_10s_ease-in-out_infinite]" />
      </div>

      {/* Signature gold path — decorative draw-in with traveling pulses */}
      <HeroPathDecor />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 lg:pt-0 pb-16 lg:pb-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — text */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-label mb-6 lg:mb-8"
            >
              AI Engineer &middot; Voice AI Founder &middot; Dubai
            </motion.p>

            {/* Name — word by word */}
            <h1 className="font-display text-hero font-bold text-foreground mb-6">
              {nameWords.map((word, i) => (
                <motion.span
                  key={`f-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.08,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
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
                  transition={{
                    duration: 0.5,
                    delay: 0.55 + i * 0.08,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
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
              className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:mx-0 mx-auto mb-8 leading-relaxed"
            >
              AI engineer building voice agents in Dubai.
              <br className="hidden md:block" />
              <span className="text-foreground/80">$1M raised at 21.</span>
            </motion.p>

            {/* HALO BAND — 3 editorial credibility lines */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="mx-auto lg:mx-0 max-w-xl mb-10"
              aria-label="Recent recognition"
            >
              <div className="editorial-divider mx-auto lg:mx-0 mb-4 opacity-70" />
              <ul className="space-y-1.5">
                {haloLines.map((line, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                    className="font-mono text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-gold-500/90 leading-relaxed"
                  >
                    {line}
                  </motion.li>
                ))}
              </ul>
              <div className="editorial-divider mx-auto lg:mx-0 mt-4 opacity-70" />
            </motion.div>

            {/* Stats row with counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 mb-10"
            >
              {[
                { value: "9", label: "Podium Finishes", delay: 1.3 },
                { value: "$1M", label: "Raised at 21", delay: 1.4 },
                { value: "35+", label: "Hackathons", delay: 1.5 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: stat.delay,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
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
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <MagneticButton strength={0.25}>
                <motion.a
                  href="/#projects"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="inline-block px-8 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300"
                  data-track="hero_cta_view_work"
                >
                  View My Work
                </motion.a>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <motion.a
                  href="/#contact"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                  className="inline-block px-8 py-3 border border-border text-foreground font-semibold rounded-full hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
                  data-track="hero_cta_get_in_touch"
                >
                  Get in Touch
                </motion.a>
              </MagneticButton>
            </div>

            {/* Tertiary text-link — follow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.85 }}
              className="mt-6 text-xs sm:text-sm text-muted-foreground"
            >
              Follow for AI startup updates:{" "}
              <a
                href={withUtm("https://instagram.com/amirhkazemkhani", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_follow_instagram"
                className="text-foreground/80 hover:text-gold-500 transition-colors underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              {" · "}
              <a
                href={withUtm("https://linkedin.com/in/amirkazemkhani", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_follow_linkedin"
                className="text-foreground/80 hover:text-gold-500 transition-colors underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href={withUtm("https://novalabs.ae", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_follow_nova"
                className="text-foreground/80 hover:text-gold-500 transition-colors underline-offset-4 hover:underline"
              >
                NOVA Labs
              </a>
            </motion.p>
          </div>

          {/* RIGHT — founder portrait (solo pitch) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.figure
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none"
              data-track="hero_portrait_view"
            >
              {/* Subtle gold edge glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-gold-500/15 via-transparent to-gold-500/5 blur-xl pointer-events-none" />
              <div className="relative card-editorial rounded-2xl overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src="/credibility/amir-falcons-stage-pitch-solo.jpg"
                    alt="Amir Hossein Kazemkhani pitching NOVA Labs on the Falcons of Majlis stage"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3 border-t border-border/60">
                  <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold-500">
                    Falcons of Majlis
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    2026
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>
      </div>

      {/* CSS-only scroll indicator — hidden on mobile where it overlaps CTAs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground/40 animate-[fadeIn_0.6s_2s_both]">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
};

export default HeroSection;
