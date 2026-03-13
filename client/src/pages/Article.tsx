import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Trophy, ChevronRight } from 'lucide-react';
import { getArticleBySlug, type ArticleSection } from '@/data/articles';

const placeBadgeColor: Record<string, string> = {
  '1st': 'from-yellow-400 to-amber-600',
  '2nd': 'from-zinc-300 to-zinc-500',
  '3rd': 'from-amber-600 to-amber-800',
};

function SectionBlock({ section, index }: { section: ArticleSection; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  if (section.type === 'heading') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-16 mb-6 first:mt-0"
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-500/60">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          {section.content}
        </h2>
      </motion.div>
    );
  }

  if (section.type === 'quote') {
    return (
      <motion.blockquote
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="my-12 relative"
      >
        <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-500/50 to-transparent rounded-full" />
        <div className="pl-6 md:pl-10 py-2">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/90 italic leading-relaxed">
            "{section.content}"
          </p>
        </div>
      </motion.blockquote>
    );
  }

  if (section.type === 'stats' && section.items) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="my-10"
      >
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold-500/60 mb-4">
          {section.content}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {section.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="rounded-xl border border-border/60 bg-card/50 p-4 hover:border-gold-500/30 transition-colors"
            >
              <span className="font-display font-bold text-gold-500 text-sm">{item.label}</span>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default: text
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-base md:text-lg text-muted-foreground leading-[1.85] mb-5"
    >
      {section.content}
    </motion.p>
  );
}

export default function ArticlePage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [headingIndex, setHeadingIndex] = useState(0);
  const headings = article?.sections.filter((s) => s.type === 'heading').map((s) => s.content) ?? [];

  // Track which heading section the user is reading
  useEffect(() => {
    if (!article) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const totalSections = article.sections.length;
      const headingSections = article.sections
        .map((s, i) => ({ ...s, i }))
        .filter((s) => s.type === 'heading');
      const progress = v * totalSections;
      let current = 0;
      for (let h = 0; h < headingSections.length; h++) {
        if (progress >= headingSections[h].i) current = h;
      }
      setHeadingIndex(current);
    });
    return unsubscribe;
  }, [article, scrollYProgress]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <a href="/articles" className="text-gold-500 hover:text-gold-400">
            &larr; Back to articles
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* ── Reading Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #c9a84c, #e7bc66, #f0d6a0)',
        }}
      />

      {/* ── Floating Chapter Nav (desktop) ── */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-2 items-end">
          {headings.map((h, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 transition-all duration-300 ${
                headingIndex === i ? 'opacity-100' : 'opacity-30 hover:opacity-60'
              }`}
            >
              <span
                className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                  headingIndex === i ? 'text-gold-500' : 'text-muted-foreground'
                }`}
              >
                {h}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  headingIndex === i
                    ? 'bg-gold-500 scale-125'
                    : 'bg-border scale-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={`relative min-h-[80vh] flex items-end bg-gradient-to-br ${article.gradient} overflow-hidden`}>
        {/* Ambient blur orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white/3 blur-[100px]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient fade to background at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-16 pt-32 w-full">
          {/* Back link */}
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

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            {/* Place badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${
                placeBadgeColor[article.place] || 'from-zinc-600 to-zinc-700'
              } text-background font-display font-bold text-xs`}
            >
              <Trophy className="w-3 h-3" />
              {article.place} Place
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
              {article.tag}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/40 font-mono">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            {article.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="font-serif text-lg md:text-xl text-white/60 italic max-w-2xl"
          >
            {article.subtitle}
          </motion.p>
        </div>
      </header>

      {/* ── Article Body ── */}
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        {article.sections.map((section, i) => {
          // Count headings up to this point for numbering
          const headingCount = article.sections
            .slice(0, i + 1)
            .filter((s) => s.type === 'heading').length;
          return (
            <SectionBlock
              key={i}
              section={section}
              index={section.type === 'heading' ? headingCount - 1 : i}
            />
          );
        })}

        {/* ── Achievement Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-10 border-t border-border/50"
        >
          <p className="section-label mb-6">Achievements</p>
          <div className="space-y-3">
            {article.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-gold-500/5 border border-gold-500/10"
              >
                <Trophy className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{ach}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Next Article / Back ── */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </a>
          <a
            href="/#competitions"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors group"
          >
            View All Wins
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
