import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Endorsement {
  name: string;
  role: string;
  relationship: string;
  date: string;
  text: string;
  highlight: string;
}

const endorsements: Endorsement[] = [
  {
    name: 'Professor Kashif Rajpoot',
    role: 'Professor of Medical AI | Interim Vice Provost',
    relationship: 'Mentor',
    date: 'August 2025',
    text: 'I am pleased to recommend Amir Kazemkhani, a highly talented, vibrant, ambitious and dedicated student I have had the pleasure of working with. Amir has a remarkable blend of technical expertise, interpersonal skills, and leadership qualities that set him apart. As a BSc in AI and Computer Science student, Amir demonstrated a deep understanding of advanced concepts and has consistently excelled in areas like Artificial Intelligence, Programming, Cybersecurity, and Enterpreneurship. Beyond technical skills, Amir possesses strong interpersonal and communication abilities, making him a natural leader and an effective team player. I wholeheartedly recommend him for any opportunity where his skills, professionalism, and passion for technology can be put to great use.',
    highlight: 'A remarkable blend of technical expertise, interpersonal skills, and leadership qualities that set him apart.',
  },
  {
    name: 'Hamid Mukhtar',
    role: 'Associate Professor',
    relationship: 'Teacher',
    date: 'August 2025',
    text: 'I have seen immense growth and future potential in Amir Hossein Kazemkhani. A talented youth full of entrepreneurial spirit and a mindset geared toward advancement and progress. Amir consistently demonstrates a proactive approach to challenges, a hunger for learning, and a remarkable ability to turn ideas into impactful actions. His dedication, creativity, and leadership qualities make him a standout individual with the capacity to drive innovation and inspire those around him. I am confident that Amir will continue to achieve great things and contribute meaningfully to any endeavor he pursues.',
    highlight: 'A remarkable ability to turn ideas into impactful actions.',
  },
  {
    name: 'Wail Abu Ghazaleh',
    role: 'Builder',
    relationship: 'Studied together',
    date: 'July 2024',
    text: "Amir is a super intelligent and dedicated young man. He's made for the hustle and has proven it with what he's been building at the GGRP, helping people from all over the world get into quantum computing research.",
    highlight: "He's made for the hustle and has proven it.",
  },
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

function EndorsementCard({ endorsement, index, isInView }: { endorsement: Endorsement; index: number; isInView: boolean }) {
  const isFeature = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
      className={`relative rounded-2xl border border-border bg-card p-6 md:p-8 ${
        isFeature ? 'md:col-span-2' : ''
      }`}
    >
      {/* Gold quote icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.5 + index * 0.12, type: 'spring', stiffness: 180, damping: 12 }}
        className="absolute -top-3 -left-1 md:left-4"
      >
        <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
          <Quote className="w-3.5 h-3.5 text-gold-500" />
        </div>
      </motion.div>

      {/* Highlight quote — italic serif */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55 + index * 0.12 }}
        className="font-serif text-lg md:text-xl italic text-foreground leading-relaxed mb-4 mt-3"
      >
        "{endorsement.highlight}"
      </motion.p>

      {/* Full text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.65 + index * 0.12 }}
        className="text-sm text-muted-foreground leading-relaxed mb-6"
      >
        {endorsement.text}
      </motion.p>

      {/* Divider — line draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.7 + index * 0.12, duration: 0.5 }}
        className="editorial-divider mb-4 origin-left"
      />

      {/* Author */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-display font-semibold text-foreground text-sm">{endorsement.name}</p>
          <p className="text-xs text-gold-500/80">{endorsement.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.75 + index * 0.12, type: 'spring', stiffness: 200 }}
            className="text-[11px] px-2.5 py-0.5 rounded-full border border-border text-muted-foreground"
          >
            {endorsement.relationship}
          </motion.span>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{endorsement.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

const EndorsementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="endorsements" className="py-24 lg:py-32 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-label mb-4"
          >
            Endorsements
          </motion.p>
          <h2 className="font-display text-heading font-bold text-foreground mb-4">
            <WordReveal text="What people say" delay={0.15} isInView={isInView} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            LinkedIn recommendations from professors, mentors, and collaborators.
          </motion.p>
        </div>

        {/* Cards — first one spans 2 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {endorsements.map((endorsement, i) => (
            <EndorsementCard
              key={endorsement.name}
              endorsement={endorsement}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center mt-10"
        >
          <a
            href="https://linkedin.com/in/amirkazemkhani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors"
          >
            View all recommendations on LinkedIn
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EndorsementsSection;
