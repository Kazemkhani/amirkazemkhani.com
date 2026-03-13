import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, Trophy } from 'lucide-react';
import { articles } from '@/data/articles';

const placeBadgeColor: Record<string, string> = {
  '1st': 'from-yellow-400 to-amber-600',
  '2nd': 'from-zinc-300 to-zinc-500',
  '3rd': 'from-amber-600 to-amber-800',
};

function WordReveal({ text, delay = 0, isInView }: { text: string; delay?: number; isInView: boolean }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: delay + i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Show first 3 articles as preview
  const preview = articles.slice(0, 3);

  return (
    <section id="blog" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Articles
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="The Stories Behind the Wins" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Long-form breakdowns of hackathon battles, what we built, and the
            conversations that happened after.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/articles/${article.slug}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className={`block relative rounded-xl overflow-hidden bg-gradient-to-br ${article.gradient} group cursor-pointer`}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Glow */}
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-gold-500/5 blur-[60px] group-hover:bg-gold-500/10 transition-all duration-500" />

              <div className="relative z-10 p-6 min-h-[300px] flex flex-col justify-end">
                {/* Meta — spring badges */}
                <div className="flex items-center gap-2 mb-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${
                      placeBadgeColor[article.place]
                    } text-background font-display font-bold text-[11px]`}
                  >
                    <Trophy className="w-2.5 h-2.5" />
                    {article.place}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.1 }}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10"
                  >
                    {article.tag}
                  </motion.span>
                </div>

                <h3 className="font-display font-bold text-lg text-white leading-snug mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-sm text-white/40 mb-4 line-clamp-2">
                  {article.subtitle}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gold-500 font-medium group-hover:gap-2.5 transition-all">
                    Read the story
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-white/25 font-mono">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors group"
          >
            View all {articles.length} articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
