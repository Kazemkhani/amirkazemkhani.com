import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How I Built a 4-Agent Voice AI Pipeline with DSPy and LiveKit',
    excerpt: 'The architecture behind NOVA AI: Greeting / Discovery / Pitch / Close. How Stanford DSPy and LiveKit Agents power sub-millisecond context generation across 334 automated tests.',
    date: 'Feb 2026',
    tag: 'Voice AI',
  },
  {
    id: 2,
    title: 'Winning Hackathons: Lessons from 35+ Competitions',
    excerpt: "What I've learned from 9 podium finishes across AI, blockchain, healthcare, and government tech — and why the hackathon model is a superpower for rapid domain absorption.",
    date: 'Jan 2026',
    tag: 'Startups',
  },
  {
    id: 3,
    title: 'From Hacker House to $1M: Building an AI Construction Startup at 21',
    excerpt: '45 consecutive days, 14-hour shifts, 1000+ applicants screened. What I learned as sole technical co-founder of a YC-network construction AI startup.',
    date: 'Dec 2025',
    tag: 'Founder',
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Writing</p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            Latest Insights
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technical deep-dives, hackathon lessons, and startup building from Dubai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="card-editorial rounded-xl p-6 flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
                  {post.tag}
                </span>
              </div>

              <h3 className="font-display font-semibold text-lg text-foreground mb-3 leading-snug group-hover:text-gold-500 transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>

              <span className="inline-flex items-center gap-1 text-sm text-gold-500 font-medium group-hover:gap-2 transition-all">
                Coming soon
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
