import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillGroup {
  category: string;
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'languages',
    label: 'Languages',
    skills: ['Python', 'JavaScript/TypeScript', 'Java', 'C', 'Rust', 'Solidity', 'Haskell', 'SQL', 'HTML/CSS', 'Bash'],
  },
  {
    category: 'ai',
    label: 'AI & Machine Learning',
    skills: [
      'OpenAI API', 'Claude API (Anthropic)', 'Hugging Face Transformers', 'Stanford DSPy',
      'LangChain', 'RAG Architectures', 'XGBoost', 'CNNs',
      'Monte Carlo Tree Search / UCB1', 'Voice AI (LiveKit, Vapi, ElevenLabs, Deepgram, Cartesia)',
      'n8n AI Workflow Automation',
    ],
  },
  {
    category: 'web',
    label: 'Web & Mobile',
    skills: [
      'Next.js 14/15', 'React', 'React Native (Expo)', 'Flask', 'FastAPI',
      'Node.js', 'Supabase', 'Firebase', 'JHipster', 'Vercel', 'Docker', 'Git',
    ],
  },
  {
    category: 'blockchain',
    label: 'Blockchain & Web3',
    skills: [
      'Solidity', 'SUI Move', 'Anchor (Rust/Solana)', 'zkLogin', 'Walrus',
      'Solana Mobile Stack', 'Tokenomics Design', 'Smart Contract Development',
    ],
  },
  {
    category: 'product',
    label: 'Product & Leadership',
    skills: [
      'Figma Prototyping', 'User Funnel Design', 'KPI Roadmapping',
      'Go-to-Market Strategy', 'Paid Acquisition (Meta Ads)', 'Pitch Deck Creation',
      'Technical Hiring', 'Team Leadership (5-10 person teams)',
    ],
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web & Mobile' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'product', label: 'Product' },
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

const SkillsSection = () => {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'all' ? skillGroups : skillGroups.filter((g) => g.category === active);

  return (
    <section id="skills" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Expertise
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="Technical Skills" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Full-stack across AI, blockchain, web, and mobile — battle-tested in hackathons and production systems.
          </motion.p>
        </div>

        {/* Filter pills — spring entrance */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat.id
                  ? 'bg-gold-500 text-background'
                  : 'border border-border text-muted-foreground hover:border-gold-500/40 hover:text-foreground'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Skill groups — staggered from alternating sides */}
        <div className="space-y-12">
          {filtered.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: gi % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + gi * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.55 + gi * 0.1 + si * 0.025,
                      type: 'spring',
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-lg border border-border hover:border-gold-500/30 hover:text-foreground transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
