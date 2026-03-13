import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  { title: 'AI Engineering', desc: 'Voice AI, multi-agent systems, DSPy, LiveKit, RAG architectures.' },
  { title: 'Venture Building', desc: 'Co-founded $1M startup, grew TheGGRP to 147 paying users.' },
  { title: 'Blockchain & Web3', desc: 'Solidity, Anchor/Rust, SUI Move, zkLogin, Solana Mobile Stack.' },
  { title: 'Community Leadership', desc: 'Scaled SEA UOBD to 600+ members, President of Blockchain Society.' },
];

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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="/assets/images/amir-profile.jpeg"
                alt="Amir Kazemkhani"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 150 }}
              className="absolute -bottom-6 right-2 sm:-right-4 lg:-right-8 bg-card border border-border p-5 rounded-xl max-w-[200px] sm:max-w-[240px]"
            >
              <p className="font-serif text-lg italic text-foreground leading-snug">
                "Build things from nothing."
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="editorial-divider mt-3 origin-left"
              />
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="section-label mb-4"
            >
              About
            </motion.p>

            <h2 className="font-display text-heading font-bold text-foreground mb-8">
              <WordReveal text="The story so far" delay={0.25} isInView={isInView} />
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                I'm a final-year Computer Science with AI student at the University of Birmingham Dubai, on track for First-Class Honours. At 22, I've co-founded a $1M-funded AI construction startup within the Y Combinator network, built a 147-user premium research product, and won 9 podium finishes across 35+ hackathons spanning AI, blockchain, healthcare, and government technology.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                My technical range covers voice AI, multi-agent systems, blockchain smart contracts, and full-stack product development. I've recruited and led engineering teams, shipped production systems under extreme time pressure, and presented research at the Dubai Stem Cell Congress.
              </motion.p>
            </div>

            {/* Pillars — stagger from alternating sides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                  className="p-4 rounded-xl border border-border hover:border-gold-500/30 transition-colors duration-300"
                >
                  <h3 className="font-display font-semibold text-foreground mb-1">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="mt-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-gold-500 font-medium hover:text-gold-400 transition-colors group"
              >
                <span>Let's build something together</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
