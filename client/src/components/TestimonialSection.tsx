import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/data/articles';

interface CompetitionWin {
  id: number;
  place: string;
  event: string;
  prize: string;
  project: string;
  detail: string;
}

const competitions: CompetitionWin[] = [
  {
    id: 1,
    place: '1st',
    event: 'Ruya AI Hackathon',
    prize: '$12,800',
    project: 'NOVA — Self-Improving AI Agent Academy',
    detail: 'US Embassy-sponsored, 200 shortlisted builders UAE-wide',
  },
  {
    id: 2,
    place: '1st',
    event: 'FutureHack by in5',
    prize: '6-Month Residency',
    project: 'CyberLife — AI Diabetes Detection for Mediclinic',
    detail: 'Sponsored by Dubai Knowledge Park + Dubai Science Park',
  },
  {
    id: 3,
    place: '1st',
    event: 'Dubai Police HQ',
    prize: '$1,600',
    project: 'Security & Innovation Challenge',
    detail: "Dubai Police Officer's Club",
  },
  {
    id: 4,
    place: '1st',
    event: 'IFZA Scale360 Hackathon',
    prize: 'Internship + Lead Role',
    project: 'Fusion — Enterprise SaaS for 20K+ SMEs',
    detail: "Selected to build IFZA's internal SaaS product",
  },
  {
    id: 5,
    place: '2nd',
    event: 'Function 1 x LabLab AI Genesis',
    prize: '$10,000',
    project: 'Sell The Pen AI — Voice Sales Training',
    detail: 'Largest AI conference hackathon in the Middle East',
  },
  {
    id: 6,
    place: '2nd',
    event: 'CS Expo',
    prize: 'Secured HUMAI role',
    project: 'Impressed judge Mo directly from competition',
    detail: 'Led to part-time AI Engineer position',
  },
  {
    id: 7,
    place: '3rd',
    event: 'RTA x GDG Dubai',
    prize: '$1,400',
    project: 'TANZEEM — Smart School Pickup',
    detail: 'UAE-wide competition, Roads and Transport Authority',
  },
  {
    id: 8,
    place: '3rd',
    event: 'AUS x SuiHub at SUI Basecamp',
    prize: 'SDK Invitation',
    project: 'ArenaAI — On-Chain Verifiable AI Agents',
    detail: 'Solo vs. 6-person teams. Invited by SUI co-founder.',
  },
];

const placeBadge: Record<string, string> = {
  '1st': 'bg-gold-500 text-background',
  '2nd': 'bg-zinc-400 text-background',
  '3rd': 'bg-amber-700 text-white',
};

// Map competition IDs to article slugs
const articleMap = new Map(
  articles.map((a) => [a.relatedCompetitionId, a.slug])
);

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

const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="competitions" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Competition Record
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="Wins & Podium Finishes" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            4x First Place &middot; 2x Second Place &middot; 2x Third Place across 35+ hackathons nationally. $25,800+ in prizes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitions.map((comp, i) => {
            const articleSlug = articleMap.get(comp.id);
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
                className="card-editorial rounded-xl p-5 flex items-start gap-4"
              >
                {/* Place badge — spring pop */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.06, type: 'spring', stiffness: 250, damping: 12 }}
                  className={`flex-shrink-0 w-11 h-11 rounded-full ${
                    placeBadge[comp.place] || 'bg-secondary text-foreground'
                  } flex items-center justify-center font-display font-bold text-sm`}
                >
                  {comp.place}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{comp.event}</h3>
                  <p className="text-sm text-gold-500 font-medium mb-0.5">{comp.prize}</p>
                  <p className="text-sm text-muted-foreground">{comp.project}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{comp.detail}</p>
                  {articleSlug && (
                    <a
                      href={`/articles/${articleSlug}`}
                      className="inline-flex items-center gap-1 text-xs text-gold-500/70 hover:text-gold-500 mt-2 transition-colors group"
                    >
                      Read the story
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Honourable mentions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center mt-10"
        >
          <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Also: Alibaba x RTA Private Equity Award (GITEX Global) &middot; dub(AI) 2nd Place &middot; Emirates NBD FutureHack &middot; Techstars ADYC Startup Weekend &middot; NYUAD Hackathon for Social Good &middot; Global Prompt Engineering Championship &middot; Solana MONOLITH Hackathon
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
