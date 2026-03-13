import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Trophy } from 'lucide-react';
import { articles } from '@/data/articles';

const placeBadgeColor: Record<string, string> = {
  '1st': 'from-yellow-400 to-amber-600',
  '2nd': 'from-zinc-300 to-zinc-500',
  '3rd': 'from-amber-600 to-amber-800',
};

function ArticleCard({
  article,
  index,
  featured = false,
}: {
  article: (typeof articles)[0];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href={`/articles/${article.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: featured ? 0.2 : 0.1 + index * 0.08,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={`block relative rounded-2xl overflow-hidden bg-gradient-to-br ${article.gradient} group cursor-pointer`}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: featured ? '50px 50px' : '40px 40px',
        }}
      />

      {/* CSS-animated glow — no JS scroll tracking */}
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-gold-500/5 blur-[80px] group-hover:bg-gold-500/12 transition-all duration-700" />

      <div
        className={`relative z-10 ${
          featured ? 'p-8 md:p-12 lg:p-16 min-h-[380px]' : 'p-6 md:p-8 min-h-[300px]'
        } flex flex-col justify-end`}
      >
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: (featured ? 0.4 : 0.2 + index * 0.08), type: 'spring', stiffness: 200 }}
            className={`inline-flex items-center gap-1 ${
              featured ? 'px-3 py-1' : 'px-2.5 py-0.5'
            } rounded-full bg-gradient-to-r ${
              placeBadgeColor[article.place]
            } text-background font-display font-bold ${featured ? 'text-xs' : 'text-[11px]'}`}
          >
            <Trophy className={featured ? 'w-3 h-3' : 'w-2.5 h-2.5'} />
            {article.place}{featured ? ' Place' : ''}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: (featured ? 0.5 : 0.3 + index * 0.08) }}
            className={`${
              featured ? 'text-xs px-2.5 py-1' : 'text-[11px] px-2 py-0.5'
            } rounded-full bg-white/10 text-white/60 border border-white/10`}
          >
            {article.tag}
          </motion.span>
          {featured && (
            <span className="font-mono text-[11px] text-white/40">{article.event}</span>
          )}
        </div>

        <h2
          className={`font-display font-bold text-white leading-tight mb-2 group-hover:text-gold-400 transition-colors duration-300 ${
            featured ? 'text-3xl md:text-4xl lg:text-5xl mb-4' : 'text-xl md:text-2xl'
          }`}
        >
          {article.title}
        </h2>

        <p className={`text-white/40 mb-4 ${featured ? 'font-serif text-lg italic max-w-2xl mb-6' : 'text-sm line-clamp-2'}`}>
          {article.subtitle}
        </p>

        <div className="flex items-center gap-6">
          <span className={`inline-flex items-center gap-2 text-gold-500 font-medium group-hover:gap-3 transition-all ${featured ? 'text-sm' : 'text-xs'}`}>
            {featured ? 'Read the full story' : 'Read story'}
            <ArrowRight className={featured ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
          </span>
          <span className={`inline-flex items-center gap-1.5 font-mono ${featured ? 'text-xs text-white/30' : 'text-[10px] text-white/25'}`}>
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ArticlesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-8">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.a>

        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-label mb-4"
          >
            Articles
          </motion.p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {'The Stories Behind the Wins'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                className={`inline-block mr-[0.25em] ${i >= 4 ? 'text-gradient-gold' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Long-form breakdowns of hackathon competitions, what we built, and the doors that opened after.
            Not pitch decks — real stories.
          </motion.p>
        </div>
      </div>

      {/* ── Featured ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <ArticleCard article={featured} index={0} featured />
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
