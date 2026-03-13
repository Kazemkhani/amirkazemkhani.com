import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineEvent {
  id: number;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'work' | 'education' | 'achievement';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'AI Engineer (Part-Time) / Final Year Industry Project',
    organization: 'HUMAI — AI Startup, JLT Dubai',
    description: 'Won 2nd Place at CS Expo and secured a part-time role directly from the competition. Built n8n AI automation workflows over a 2-month engagement. Now building NOVA AI as final year project: an autonomous voice agent system using Stanford DSPy, LiveKit Agents, and a novel 4-agent multi-phase conversation architecture with 334 automated tests.',
    startDate: '2025-01',
    endDate: 'Present',
    type: 'work',
  },
  {
    id: 2,
    title: 'Co-Founder & CTO — $1M Funded',
    organization: 'Stealth AI Construction Startup (Y Combinator Network)',
    description: 'Secured $1M in funding from a YC-network co-founder. Sole technical co-founder leading all engineering, product, and operations from a hacker house in Meydan. 14-hour days, 45+ consecutive days. Screened 1,000+ applicants, hired a 5-person senior engineering team.',
    startDate: '2025-01',
    endDate: '2025-06',
    type: 'work',
  },
  {
    id: 3,
    title: 'Hackathon Winner / Intern / AI Automation Lead',
    organization: 'IFZA (International Free Zone Authority)',
    description: 'Won 1st Place at IFZA Scale360 Hackathon. Selected for internship to build Fusion: a centralised platform for 20,000+ licensed SMEs. Proposed AI automation model to Head of IT; approved to lead initiative.',
    startDate: '2025-01',
    endDate: '2025-06',
    type: 'work',
  },
  {
    id: 4,
    title: 'Co-Founder & CEO',
    organization: 'TheGGRP.com',
    description: 'Founded a premium $349/user AI-powered research accelerator. Grew to 147 recurring paying users through product-led growth. Managed 8-person cross-functional team. Achieved 11.2x return on Meta ad spend.',
    startDate: '2023-01',
    endDate: '2025-01',
    type: 'work',
  },
  {
    id: 5,
    title: 'Co-Founder & Chief Community Officer',
    organization: 'Student Entrepreneurship Association (SEA UOBD)',
    description: 'Scaled membership to 600+ students in under 3 months. Co-organised 4 revenue-generating flagship events with 400+ attendees and 20+ global speakers from MIT, Oxford, UC Berkeley.',
    startDate: '2024-01',
    endDate: 'Present',
    type: 'work',
  },
  {
    id: 6,
    title: 'BSc Computer Science with Artificial Intelligence',
    organization: 'University of Birmingham Dubai',
    description: 'Expected First-Class Honours. Key Modules: Machine Learning, Deep Neural Networks, Computer Vision, HCI, Security & Networks, Software Engineering. President of Blockchain Society.',
    startDate: '2022-09',
    endDate: '2026-06',
    type: 'education',
  },
  {
    id: 7,
    title: '1st Place — Ruya AI Hackathon ($12,800)',
    organization: 'US Embassy-sponsored, 200 shortlisted builders UAE-wide',
    description: 'Built NOVA: an AI agent evaluation and self-improvement platform using Monte Carlo Strategy Search with UCB1 confidence-bounded optimisation.',
    startDate: '2026-02',
    endDate: '',
    type: 'achievement',
  },
  {
    id: 8,
    title: '1st Place — FutureHack by in5 (6-Month Residency)',
    organization: 'CyberLife Technologies — AI Diabetes Detection for Mediclinic',
    description: 'Built AI system for Mediclinic: flags potential Type 2 diabetes from scattered lab data. 5-7 minutes saved per diagnosis, +1.3M annual appointment capacity unlocked.',
    startDate: '2025-02',
    endDate: '',
    type: 'achievement',
  },
  {
    id: 9,
    title: '2nd Place — LabLab AI Genesis ($10,000)',
    organization: 'Sell The Pen AI — AI Sales Training for Real Estate',
    description: 'Largest AI conference hackathon in the Middle East. Built voice AI sales training platform using Vapi, FastAPI, and GPT-4.',
    startDate: '2025-01',
    endDate: '',
    type: 'achievement',
  },
  {
    id: 10,
    title: '3rd Place — RTA x GDG Dubai ($1,400)',
    organization: 'TANZEEM — Smart School Pickup Management',
    description: 'UAE-wide competition sponsored by Roads and Transport Authority. Built a 3-tier pickup system with QR-verified custody handoff and immutable audit trail.',
    startDate: '2026-02',
    endDate: '',
    type: 'achievement',
  },
  {
    id: 11,
    title: 'Cross-Species Regenerative Signalling Analysis',
    organization: 'Dubai Stem Cell Congress 2026',
    description: 'Lead Author & Presenting Author. Co-authored cross-species systems analysis of conserved regenerative signalling pathways with co-authors from Gulf Medical University, Khalifa University, University of Warwick.',
    startDate: '2026-02',
    endDate: '',
    type: 'achievement',
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievement', label: 'Wins & Research' },
];

const formatDate = (d: string): string => {
  if (!d || d === 'Present') return d || '';
  const [year, month] = d.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

const typeBadgeClass: Record<string, string> = {
  work: 'bg-gold-500/10 text-gold-500 border-gold-500/20',
  education: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  achievement: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const typeLabel: Record<string, string> = {
  work: 'Experience',
  education: 'Education',
  achievement: 'Achievement',
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

function TimelineItem({ event, index, isInView }: { event: TimelineEvent; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative pl-12"
    >
      {/* Dot with pulse ring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.45 + index * 0.08, type: 'spring', stiffness: 250, damping: 12 }}
        className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gold-500/80 border-2 border-background"
      />

      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.08 }}
          className="text-xs text-muted-foreground font-mono"
        >
          {formatDate(event.startDate)}
          {event.endDate ? ` — ${formatDate(event.endDate)}` : ''}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.55 + index * 0.08, type: 'spring', stiffness: 200 }}
          className={`text-xs px-2 py-0.5 rounded-full border ${typeBadgeClass[event.type]}`}
        >
          {typeLabel[event.type]}
        </motion.span>
      </div>

      <h3 className="font-display font-semibold text-lg text-foreground mb-0.5">
        {event.title}
      </h3>
      <h4 className="text-sm text-gold-500/80 mb-2">{event.organization}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {event.description}
      </p>
    </motion.div>
  );
}

const TimelineSection = () => {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const visible = active === 'all' ? timelineEvents : timelineEvents.filter((e) => e.type === active);

  return (
    <section id="timeline" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Journey
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="The path so far" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            From a university hackathon circuit to $1M in funding, 9 podium finishes, and a research paper at 22.
          </motion.p>
        </div>

        {/* Filters — spring entrance */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {filters.map((f, i) => (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => setActive(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === f.id
                  ? 'bg-gold-500 text-background'
                  : 'border border-border text-muted-foreground hover:border-gold-500/40 hover:text-foreground'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — draws down on reveal */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute left-4 top-0 bottom-0 w-px bg-border origin-top"
          />

          <div className="space-y-10">
            {visible.map((event, i) => (
              <TimelineItem key={event.id} event={event} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
