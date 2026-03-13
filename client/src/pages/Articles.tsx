import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Trophy } from 'lucide-react';
import { articles } from '@/data/articles';

const placeBadgeColor: Record<string, string> = {
  '1st': 'from-yellow-400 to-amber-600',
  '2nd': 'from-zinc-300 to-zinc-500',
  '3rd': 'from-amber-600 to-amber-800',
};

export default function ArticlesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">Articles</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The <span className="text-gradient-gold">Stories</span> Behind the Wins
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Long-form breakdowns of hackathon competitions, what we built, and the doors that opened after.
            Not pitch decks — real stories.
          </p>
        </motion.div>
      </div>

      {/* ── Featured Article ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8" ref={ref}>
        <motion.a
          href={`/articles/${featured.slug}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`block relative rounded-2xl overflow-hidden bg-gradient-to-br ${featured.gradient} group cursor-pointer`}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Ambient blur */}
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold-500/8 blur-[100px] group-hover:bg-gold-500/12 transition-all duration-700" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[360px] flex flex-col justify-end">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${
                  placeBadgeColor[featured.place]
                } text-background font-display font-bold text-xs`}
              >
                <Trophy className="w-3 h-3" />
                {featured.place} Place
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                {featured.tag}
              </span>
              <span className="font-mono text-[11px] text-white/40">{featured.event}</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4 group-hover:text-gold-400 transition-colors duration-300">
              {featured.title}
            </h2>

            {/* Subtitle */}
            <p className="font-serif text-lg text-white/50 italic mb-6 max-w-2xl">
              {featured.subtitle}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-sm text-gold-500 font-medium group-hover:gap-3 transition-all">
                Read the full story
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/30 font-mono">
                <Clock className="w-3 h-3" />
                {featured.readTime}
              </span>
            </div>
          </div>
        </motion.a>
      </div>

      {/* ── Article Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/articles/${article.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className={`block relative rounded-xl overflow-hidden bg-gradient-to-br ${article.gradient} group cursor-pointer`}
            >
              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Ambient glow */}
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-gold-500/5 blur-[80px] group-hover:bg-gold-500/10 transition-all duration-500" />

              <div className="relative z-10 p-6 md:p-8 min-h-[280px] flex flex-col justify-end">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${
                      placeBadgeColor[article.place]
                    } text-background font-display font-bold text-[11px]`}
                  >
                    <Trophy className="w-2.5 h-2.5" />
                    {article.place}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10">
                    {article.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-white/40 mb-4 line-clamp-2">{article.subtitle}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gold-500 font-medium group-hover:gap-2.5 transition-all">
                    Read story
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-mono text-[10px] text-white/25">{article.readTime}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
