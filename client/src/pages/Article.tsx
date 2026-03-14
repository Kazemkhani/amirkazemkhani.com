import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowLeft, Clock, Trophy, ChevronRight, ChevronDown } from 'lucide-react';
import { getArticleBySlug, articles, type ArticleSection } from '@/data/articles';

const placeBadgeColor: Record<string, string> = {
  '1st': 'from-yellow-400 to-amber-600',
  '2nd': 'from-zinc-300 to-zinc-500',
  '3rd': 'from-amber-600 to-amber-800',
};

/* ─────────────────────────────────────────────
   Animated counter — runs on rAF, no scroll binding
   ───────────────────────────────────────────── */
function AnimatedNumber({ value, isInView }: { value: string; isInView: boolean }) {
  const num = parseInt(value, 10);
  // .test() returns a primitive boolean — stable across renders (unlike .match() which returns a new array)
  const isNumeric = !isNaN(num) && /^\d+%?$/.test(value);
  const suffix = value.includes('%') ? '%' : '';
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isNumeric || !isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * num));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, isNumeric, num]);

  if (!isNumeric) return <>{value}</>;
  return <>{display}{suffix}</>;
}

/* ─────────────────────────────────────────────
   Word-by-word stagger — NO filter:blur (GPU killer)
   ───────────────────────────────────────────── */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: delay + i * 0.055, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Section components — simple useInView, no per-element scroll tracking
   ───────────────────────────────────────────── */
function HeadingBlock({ section, index }: { section: ArticleSection; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mt-20 mb-8 first:mt-0">
      <div className="flex items-center gap-4 mb-3 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-500/60"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent origin-left"
        />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
        {isInView ? <WordReveal text={section.content} delay={0.25} /> : <span className="opacity-0">{section.content}</span>}
      </h2>
    </div>
  );
}

function QuoteBlock({ section }: { section: ArticleSection }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <blockquote ref={ref} className="my-14 relative">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[3px] origin-top rounded-full"
        style={{ background: 'linear-gradient(180deg, #c9a84c, rgba(201,168,76,0.3), transparent)' }}
      />
      <div className="pl-6 md:pl-10 py-2">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif text-xl md:text-2xl lg:text-[1.75rem] text-foreground/90 italic leading-relaxed"
        >
          "{section.content}"
        </motion.p>
      </div>
    </blockquote>
  );
}

function StatsBlock({ section }: { section: ArticleSection }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="my-12">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-500/60 mb-5"
      >
        {section.content}
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {section.items?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
            className="rounded-xl border border-border/60 bg-card/50 p-5 hover:border-gold-500/30 hover:bg-card/80 transition-all duration-300 group"
          >
            <span className="font-display font-bold text-gold-500 text-lg group-hover:text-gold-400 transition-colors">
              <AnimatedNumber value={item.label} isInView={isInView} />
            </span>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TextBlock({ section }: { section: ArticleSection }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      className="text-base md:text-lg text-muted-foreground leading-[1.9] mb-6"
    >
      {section.content}
    </motion.p>
  );
}

function SectionBlock({ section, index }: { section: ArticleSection; index: number }) {
  if (section.type === 'heading') return <HeadingBlock section={section} index={index} />;
  if (section.type === 'quote') return <QuoteBlock section={section} />;
  if (section.type === 'stats' && section.items) return <StatsBlock section={section} />;
  return <TextBlock section={section} />;
}

/* ─────────────────────────────────────────────
   Main Article Page
   Only 2 scroll listeners: progress bar + hero parallax
   ───────────────────────────────────────────── */
export default function ArticlePage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // 1. Progress bar — single scroll listener on page
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 2. Hero parallax — single scroll listener on hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Chapter tracking — derived from existing scrollYProgress, no extra listener
  const [headingIndex, setHeadingIndex] = useState(0);
  const headings = article?.sections.filter((s) => s.type === 'heading').map((s) => s.content) ?? [];

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!article) return;
    const headingSections = article.sections
      .map((s, i) => ({ ...s, i }))
      .filter((s) => s.type === 'heading');
    const progress = v * article.sections.length;
    let current = 0;
    for (let h = 0; h < headingSections.length; h++) {
      if (progress >= headingSections[h].i) current = h;
    }
    setHeadingIndex(current);
  });

  const currentIdx = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[(currentIdx + 1) % articles.length];

  const scrollToContent = useCallback(() => {
    const el = heroRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().bottom + window.scrollY, behavior: 'smooth' });
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <a href="/articles" className="text-gold-500 hover:text-gold-400">&larr; Back to articles</a>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* ── Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left will-change-transform"
        style={{ scaleX, background: 'linear-gradient(90deg, #c9a84c, #e7bc66, #f0d6a0)' }}
      />

      {/* ── Chapter Nav (desktop) ── */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3 items-end">
          {headings.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className={`flex items-center gap-2.5 transition-all duration-500 ${
                headingIndex === i ? 'opacity-100' : 'opacity-20 hover:opacity-50'
              }`}
            >
              <span
                className={`text-[10px] font-mono tracking-wider transition-all duration-500 ${
                  headingIndex === i ? 'text-gold-500 translate-x-0' : 'text-muted-foreground translate-x-2'
                }`}
              >
                {h}
              </span>
              <div className="relative">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    headingIndex === i ? 'bg-gold-500 scale-125' : 'bg-border scale-100'
                  }`}
                />
                {/* CSS-only pulse — no JS overhead */}
                {headingIndex === i && (
                  <span className="absolute inset-0 rounded-full border border-gold-500/50 animate-[chapterPulse_1.5s_ease-out_infinite]" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <header
        ref={heroRef}
        className={`relative min-h-[85vh] flex items-end bg-gradient-to-br ${article.gradient} overflow-hidden`}
      >
        {/* Parallax bg — single transform */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY }}>
          {/* CSS-animated orbs — no JS on scroll */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] animate-[orbDrift1_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white/[0.03] blur-[100px] animate-[orbDrift2_10s_ease-in-out_infinite]" />
        </motion.div>

        {/* Static grid (no parallax) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

        {/* Content — fades on scroll */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-20 pt-32 w-full"
          style={{ opacity: heroOpacity }}
        >
          <motion.a
            href="/articles"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-gold-500 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </motion.a>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${
                placeBadgeColor[article.place] || 'from-zinc-600 to-zinc-700'
              } text-background font-display font-bold text-xs`}
            >
              <Trophy className="w-3 h-3" />
              {article.place} Place
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10"
            >
              {article.tag}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-1 text-xs text-white/40 font-mono"
            >
              <Clock className="w-3 h-3" />
              {article.readTime}
            </motion.span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            <WordReveal text={article.title} delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-serif text-lg md:text-xl text-white/60 italic max-w-2xl"
          >
            {article.subtitle}
          </motion.p>
        </motion.div>

        {/* CSS-animated scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 hover:text-gold-500 transition-colors cursor-pointer animate-[fadeIn_0.6s_1.8s_both]"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to read</span>
          <ChevronDown className="w-5 h-5 animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
        </button>
      </header>

      {/* ── Article Body ── */}
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        {article.sections.map((section, i) => {
          const headingCount = article.sections.slice(0, i + 1).filter((s) => s.type === 'heading').length;
          return <SectionBlock key={i} section={section} index={section.type === 'heading' ? headingCount - 1 : i} />;
        })}

        {/* ── Achievements ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-10 border-t border-border/50"
        >
          <p className="section-label mb-6">Achievements</p>
          <div className="space-y-3">
            {article.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-gold-500/5 border border-gold-500/10 hover:border-gold-500/25 hover:bg-gold-500/[0.08] transition-all duration-300"
              >
                <Trophy className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{ach}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Next Article ── */}
        {nextArticle && nextArticle.slug !== slug && (
          <motion.a
            href={`/articles/${nextArticle.slug}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`block mt-16 rounded-xl overflow-hidden bg-gradient-to-br ${nextArticle.gradient} group cursor-pointer`}
          >
            <div className="p-6 md:p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold-500/5 blur-[60px] group-hover:bg-gold-500/10 transition-all duration-500" />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">Next Story</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                {nextArticle.title}
              </h3>
              <p className="text-sm text-white/40">{nextArticle.subtitle}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-gold-500 font-medium group-hover:gap-3 transition-all">
                Continue reading <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.a>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <a href="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </a>
          <a href="/#competitions" className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors group">
            View All Wins <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
