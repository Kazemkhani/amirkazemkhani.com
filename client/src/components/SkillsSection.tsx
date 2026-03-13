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

const SkillsSection = () => {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'all' ? skillGroups : skillGroups.filter((g) => g.category === active);

  return (
    <section id="skills" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Expertise</p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Full-stack across AI, blockchain, web, and mobile — battle-tested in hackathons and production systems.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat.id
                  ? 'bg-gold-500 text-background'
                  : 'border border-border text-muted-foreground hover:border-gold-500/40 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-12">
          {filtered.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + gi * 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-lg border border-border hover:border-gold-500/30 hover:text-foreground transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
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
