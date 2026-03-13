import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  award?: string;
  tech: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: 'NOVA — Self-Improving AI Agent Academy',
    description: 'AI agent evaluation and self-improvement platform. Agents benchmarked against expert baselines, improved via Monte Carlo Strategy Search with UCB1 confidence-bounded optimisation, validated on held-out data, and certified before deployment.',
    tags: ['AI Agents', 'AWS Bedrock', 'DSPy'],
    category: 'AI',
    award: '1st Place — $12,800 — Ruya AI Hackathon',
    tech: 'Strands SDK, Redis, PostgreSQL, ClickHouse, Langfuse',
  },
  {
    id: 2,
    title: 'NOVA AI — Autonomous Voice Agent System',
    description: 'Final year industry project: autonomous voice agent for AI-driven lead qualification using a novel 4-agent multi-phase conversation architecture (Greeting / Discovery / Pitch / Close). 334 automated tests across 9 suites.',
    tags: ['Voice AI', 'LiveKit', 'Stanford DSPy'],
    category: 'AI',
    tech: 'LiveKit Agents, Cartesia, Deepgram, FastAPI',
  },
  {
    id: 3,
    title: 'CyberLife — AI Diabetes Detection for Mediclinic',
    description: 'Flags potential Type 2 diabetes cases from scattered lab data, highlights anomalies, and tracks patient trends. 5-7 min saved per diagnosis, +1.3M annual appointment capacity unlocked.',
    tags: ['Healthcare AI', 'ML', 'Data Pipeline'],
    category: 'AI',
    award: '1st Place — 6-Month in5 Residency',
    tech: 'Python, LLM Interface, Wearable Integration',
  },
  {
    id: 4,
    title: 'Sell The Pen AI — Voice Sales Training',
    description: 'Voice AI sales training platform for real estate agents. Integrates Mike Ferry cold-calling methodology and Tom Sant proposal-crafting framework. 8-step personalised onboarding with real-time coaching.',
    tags: ['Voice AI', 'Real Estate', 'React'],
    category: 'AI',
    award: '2nd Place — $10,000 — LabLab AI Genesis',
    tech: 'Vapi, FastAPI, GPT-4, React/TypeScript',
  },
  {
    id: 5,
    title: 'Rally — Onchain Squad Finance for Solana',
    description: 'Mobile-first Solana app unifying 6 financial primitives: instant pay, smart split, pool funds, governance voting, real-time payment streaming, and DeFi yield.',
    tags: ['Solana', 'DeFi', 'Mobile'],
    category: 'Blockchain',
    tech: 'React Native/Expo, Anchor (Rust), Solana Mobile Stack',
  },
  {
    id: 6,
    title: 'ArenaAI — On-Chain Verifiable AI Agents',
    description: 'On-chain verifiable AI agents for competitive environments using zkLogin + Walrus on the SUI blockchain. Solo vs. 6-person teams. Invited by SUI co-founder to build full SDK.',
    tags: ['SUI', 'AI', 'zkLogin'],
    category: 'Blockchain',
    award: '3rd Place — AUS x SuiHub at SUI Basecamp',
    tech: 'SUI Move, zkLogin, Walrus',
  },
  {
    id: 7,
    title: 'Meridian — AI-Native OS for Private Markets',
    description: 'Multi-tenant fund management platform for PE, VC, and real estate. 7-role RBAC with 22 granular permissions, covering CRM, deal pipeline, virtual data room, fundraising, and AI intelligence modules.',
    tags: ['Fintech', 'AI', 'Full-Stack'],
    category: 'Product',
    tech: 'Next.js 15, Supabase, Claude AI, Vercel AI SDK',
  },
  {
    id: 8,
    title: 'TANZEEM — Smart School Pickup Management',
    description: '3-tier pickup system with progressive fee enforcement, QR-verified custody handoff, and immutable audit trail. Parent mobile app + operations dashboard with real-time KPI monitoring.',
    tags: ['GovTech', 'RTA', 'Next.js'],
    category: 'Product',
    award: '3rd Place — $1,400 — RTA x GDG Dubai',
    tech: 'Next.js 14, TypeScript, Zustand',
  },
  {
    id: 9,
    title: 'Fusion — IFZA Enterprise SaaS Platform',
    description: 'Centralised platform enabling 20,000+ licensed SMEs to network, track admin, access analytics, and communicate via multilingual chat.',
    tags: ['Enterprise', 'SaaS', 'Figma'],
    category: 'Product',
    award: '1st Place — IFZA Scale360 Hackathon',
    tech: 'Figma, Full-Stack Prototype',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'AI', label: 'AI / Voice' },
  { id: 'Blockchain', label: 'Blockchain' },
  { id: 'Product', label: 'Product / SaaS' },
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

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0, y: index % 3 === 1 ? 20 : 0 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className="card-editorial rounded-xl p-6 flex flex-col"
    >
      {/* Award badge — spring pop */}
      {project.award && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.08, type: 'spring', stiffness: 220, damping: 12 }}
          className="mb-4 px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-lg inline-block self-start"
        >
          <span className="text-xs font-semibold text-gold-500">{project.award}</span>
        </motion.div>
      )}

      {/* Tags — spring stagger */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, ti) => (
          <motion.span
            key={ti}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.5 + index * 0.08 + ti * 0.03,
              type: 'spring',
              stiffness: 180,
              damping: 14,
            }}
            className={`text-xs px-2.5 py-1 rounded-full ${
              ti === 0
                ? 'bg-gold-500/15 text-gold-400'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech stack — line draw + fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 + index * 0.08 }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.55 + index * 0.08, duration: 0.5 }}
          className="h-px bg-border/50 mb-3 origin-left"
        />
        <p className="text-xs font-mono text-muted-foreground/60">
          {project.tech}
        </p>
      </motion.div>
    </motion.article>
  );
}

const ProjectsSection = () => {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const visible = active === 'all' ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Portfolio
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="Projects & Hackathon Builds" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Real products built under pressure — hackathons, startups, and solo projects across AI, blockchain, and enterprise SaaS.
          </motion.p>
        </div>

        {/* Filters — spring entrance */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
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

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
