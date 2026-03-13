export interface ArticleSection {
  type: 'text' | 'quote' | 'stats' | 'heading';
  content: string;
  /** For stats type: JSON-encoded array of { label, value } */
  items?: { label: string; value: string }[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  place: string;
  event: string;
  prize: string;
  project: string;
  gradient: string;         // unique gradient for hero
  accentColor: string;      // tailwind color class
  excerpt: string;
  achievements: string[];
  sections: ArticleSection[];
  relatedCompetitionId: number;  // maps to TestimonialSection id
}

export const articles: Article[] = [
  {
    slug: 'dubai-police-hackathon',
    title: '1st Place — Dubai Police HQ Hackathon',
    subtitle: 'When the judges carry badges, your solution better be bulletproof.',
    date: '2025',
    readTime: '5 min',
    tag: 'Security & Innovation',
    place: '1st',
    event: 'Dubai Police HQ',
    prize: '$1,600',
    project: 'Security & Innovation Challenge',
    gradient: 'from-blue-900 via-slate-900 to-zinc-950',
    accentColor: 'blue',
    excerpt: 'Competing inside the actual Dubai Police Headquarters — not a co-working space, not a university lecture hall. Judges were officers, forensic tech specialists, and cybersecurity professionals.',
    achievements: [
      '1st Place — Dubai Police HQ Hackathon',
      'Presented at Dubai Police Forensics Forum',
      'Only student representing University of Birmingham Dubai',
    ],
    relatedCompetitionId: 3,
    sections: [
      {
        type: 'heading',
        content: 'The Setting',
      },
      {
        type: 'text',
        content: 'This hackathon was held inside Dubai Police HQ. Not a co-working space. Not a university lecture hall. The actual headquarters of one of the most advanced police forces in the region.',
      },
      {
        type: 'text',
        content: 'The room was filled with officers, forensic technology specialists, cybersecurity professionals, and institutional decision-makers. These are people who evaluate ideas not by how impressive they sound — but by whether they would actually work in the field.',
      },
      {
        type: 'quote',
        content: "That's a very different audience from what you encounter at most hackathons.",
      },
      {
        type: 'heading',
        content: 'The Challenge',
      },
      {
        type: 'text',
        content: "The challenge required us to think about real-world security and operational problems that Dubai Police faces — and to propose technology solutions that were practical, implementable, and aligned with how these institutions actually operate.",
      },
      {
        type: 'text',
        content: "This wasn't about building a flashy demo. It was about building something that someone in that room could look at and say: \"Yes. This would work.\"",
      },
      {
        type: 'heading',
        content: 'Why It Mattered',
      },
      {
        type: 'text',
        content: "I've competed in over 35 hackathons nationally. I've been in rooms with brilliant builders, funded startup teams, and professional engineers.",
      },
      {
        type: 'text',
        content: "But there's something different about competing in an institutional environment. The feedback is direct. The questions are operational. The judges aren't evaluating your pitch deck — they're evaluating whether your thinking is rigorous enough to survive contact with reality.",
      },
      {
        type: 'quote',
        content: 'That pressure sharpens you in ways that regular competitions don\'t.',
      },
      {
        type: 'heading',
        content: 'The Forensics Forum',
      },
      {
        type: 'text',
        content: "Separately, I was invited to present at the Dubai Police Forensics Forum, held at the Dubai Police Officer's Club. I was the only student representing the University of Birmingham Dubai.",
      },
      {
        type: 'text',
        content: "The forum brought together forensic technology professionals, law enforcement leaders, and researchers working at the intersection of technology and public safety. Being in that room — not as an observer, but as a presenter — was one of the most formative professional experiences of my university career.",
      },
      {
        type: 'quote',
        content: "Credibility isn't claimed. It's earned by showing up in rooms that matter and delivering work that holds up to scrutiny.",
      },
      {
        type: 'heading',
        content: 'Reflection',
      },
      {
        type: 'text',
        content: 'First — build for real problems, not hypothetical ones. The best ideas are the ones that survive contact with practitioners. If an officer or a forensic specialist can poke holes in your solution in 30 seconds, it\'s not ready.',
      },
      {
        type: 'text',
        content: 'Second — seek out the rooms that don\'t hand out participation trophies. The competitions that are hardest to win are usually the ones worth winning. And the rooms that are hardest to enter are usually the ones where you learn the most.',
      },
    ],
  },
  {
    slug: 'rta-gdg-tanzeem',
    title: '3rd Place — RTA × GDG Dubai Hackathon',
    subtitle: 'Fixing school pickup chaos for millions of UAE families.',
    date: '2025',
    readTime: '7 min',
    tag: 'Smart Cities',
    place: '3rd',
    event: 'RTA × GDG Dubai',
    prize: '$1,400',
    project: 'TANZEEM — Smart School Pickup',
    gradient: 'from-emerald-900 via-teal-950 to-zinc-950',
    accentColor: 'emerald',
    excerpt: 'A UAE-wide competition by the Roads and Transport Authority. We built TANZEEM — a three-tier smart pickup system with QR verification, smart zones, and progressive compliance.',
    achievements: [
      '3rd Place — RTA × GDG Dubai Hackathon (UAE-Wide)',
      'TANZEEM — Smart School Pickup Management',
      'Three-tier pickup model with real-time tracking',
    ],
    relatedCompetitionId: 7,
    sections: [
      {
        type: 'heading',
        content: 'The Problem',
      },
      {
        type: 'text',
        content: 'School dismissal in the UAE creates daily chaos. Parents idle in pickup zones — sometimes for 20, 30, 40 minutes. Children wait unsupervised. Schools have no tools to manage the flow. Traffic backs up into residential streets, creating safety risks and frustration for thousands of families every single day.',
      },
      {
        type: 'text',
        content: "Current systems rely on manual coordination: teachers with walkie-talkies, parents honking, and security guards doing their best. No data. No enforcement. No accountability. No alternatives to the school-gate pickup model that hasn't changed in decades.",
      },
      {
        type: 'quote',
        content: 'This was our challenge: fix it.',
      },
      {
        type: 'heading',
        content: 'What We Built',
      },
      {
        type: 'text',
        content: 'We built TANZEEM — تنظيم — "organisation" in Arabic. TANZEEM introduces a three-tier pickup model with built-in compliance, real-time tracking, and community-driven alternatives.',
      },
      {
        type: 'stats',
        content: 'TANZEEM Architecture',
        items: [
          { label: 'Tier 1', value: 'On-Site Pickup — Enforced 5-minute time limits with progressive fees' },
          { label: 'Tier 2', value: 'Smart Zones — Neighbourhood pickup points, reducing gate congestion by 60%' },
          { label: 'Tier 3', value: 'Neighbourhood Van — Community-driven shuttle service' },
        ],
      },
      {
        type: 'text',
        content: 'Every handoff is QR-verified. Every event is timestamped. Parents can track the full lifecycle: Child Released → Boarded Shuttle → Arrived at Zone → QR Verified → Picked Up.',
      },
      {
        type: 'text',
        content: 'We delivered two complete interfaces: a Parent Mobile App with real-time tracking, progressive fee tracking, smart zone selection, QR verification, and AI-matched carpooling; and an Operations Dashboard with live KPIs, zone capacity management, and analytics.',
      },
      {
        type: 'heading',
        content: 'Why This Matters',
      },
      {
        type: 'text',
        content: "I've competed in 35+ hackathons. Many of them involve cutting-edge technology: AI agents, blockchain protocols. This one was different.",
      },
      {
        type: 'quote',
        content: "The problem wasn't technical. It was human. Millions of families across the UAE deal with school traffic every day.",
      },
      {
        type: 'text',
        content: "The solution didn't need to be the most technically complex — it needed to be the most thoughtfully designed. The best technology disappears into the problem it solves. TANZEEM works not because it's sophisticated, but because it's simple enough that a parent running late can understand it in 10 seconds.",
      },
      {
        type: 'quote',
        content: "That's what good design does.",
      },
    ],
  },
  {
    slug: 'futurehack-cyberlife',
    title: '1st Place — FutureHack by in5',
    subtitle: 'Turning patient data into actionable clinical intelligence. 6 months of in5 residency.',
    date: '2025',
    readTime: '6 min',
    tag: 'Healthcare AI',
    place: '1st',
    event: 'FutureHack by in5',
    prize: '6-Month Residency',
    project: 'CyberLife Technologies',
    gradient: 'from-rose-950 via-red-950 to-zinc-950',
    accentColor: 'rose',
    excerpt: 'An inter-university hackathon hosted by Dubai Knowledge Park, with a challenge from Mediclinic. We built CyberLife — an AI clinical intelligence platform for early Type 2 diabetes detection.',
    achievements: [
      '1st Place — FutureHack Inter-University Hackathon',
      '6 months of in5 residency awarded by VP of in5',
      'CyberLife Technologies — AI Clinical Intelligence Platform',
    ],
    relatedCompetitionId: 2,
    sections: [
      {
        type: 'heading',
        content: 'The Challenge',
      },
      {
        type: 'text',
        content: "FutureHack's first edition was supported by Mediclinic and Smart Salem, featuring live industry challenges across Healthcare & Digital Health, Wellbeing & Preventative Care, and Smart Cities & Future Services.",
      },
      {
        type: 'text',
        content: 'Over three days, participants ideated, built, and pitched solutions. Our challenge came directly from Mediclinic: turn large volumes of patient data into actionable clinical insights.',
      },
      {
        type: 'heading',
        content: 'The Problem',
      },
      {
        type: 'text',
        content: "Type 2 diabetes often goes unnoticed for 2–3 years. By the time it's diagnosed, organ damage may already be underway.",
      },
      {
        type: 'stats',
        content: 'The Scale',
        items: [
          { label: '64%', value: 'of UAE population lives with or is at risk of diabetes' },
          { label: '2–3 yrs', value: 'Type 2 diabetes goes unnoticed on average' },
          { label: '0', value: 'Synthesis tools available to clinicians' },
        ],
      },
      {
        type: 'text',
        content: "The clinical signals exist. They're in blood work, lab reports, wearable data. But they're buried in PDFs and scattered across disconnected systems. Doctors don't have a shortage of data. They have a shortage of synthesis.",
      },
      {
        type: 'quote',
        content: "Doctors don't have a shortage of data. They have a shortage of synthesis.",
      },
      {
        type: 'heading',
        content: 'What We Built',
      },
      {
        type: 'text',
        content: 'We built CyberLife Technologies — an AI-powered clinical intelligence platform that filters and normalises patient data from lab reports, imaging, and wearables into a unified patient view.',
      },
      {
        type: 'text',
        content: 'It applies algorithmic inference to flag potential Type 2 diabetes cases and identify anomalies that manual review might miss. An LLM-powered interface lets clinicians interact with patient data naturally — asking questions, getting AI-assisted insights, and tracking trends over time.',
      },
      {
        type: 'text',
        content: "We designed a full patient dashboard showing glucose trends, HbA1c history, lipid panel, blood pressure, AI-assisted insights with suggested actions, and a care timeline with custody-chain verification. Every insight comes with a data privacy notice: all patient data is processed locally within UAE-approved infrastructure.",
      },
      {
        type: 'heading',
        content: 'The Team & Result',
      },
      {
        type: 'text',
        content: "We didn't just build technology. We built a business. The result: 1st place. And 6 months of in5 residency to continue building.",
      },
      {
        type: 'stats',
        content: 'Team',
        items: [
          { label: 'Erfan Azadi', value: 'Operational Lead' },
          { label: 'Amir Hossein Kazemkhani', value: 'AI Lead' },
          { label: 'Kianaz Karbasian', value: 'Algorithm Developer' },
          { label: 'Moncef Lefkaier', value: 'Scientific Lead' },
        ],
      },
      {
        type: 'heading',
        content: "What's Next",
      },
      {
        type: 'text',
        content: "We're exploring the path from prototype to pilot. The in5 residency gives us 6 months of infrastructure, mentorship, and ecosystem access to validate CyberLife Technologies with real clinical partners.",
      },
      {
        type: 'quote',
        content: "If we can prove this works in one of the most regulated, highest-standard healthcare environments on Earth — then the model scales globally.",
      },
    ],
  },
  {
    slug: 'cs-expo-humai',
    title: '2nd Place — CS Expo',
    subtitle: 'How a competition judge became my industry supervisor.',
    date: '2025',
    readTime: '5 min',
    tag: 'Career',
    place: '2nd',
    event: 'CS Expo',
    prize: 'Secured HUMAI role',
    project: 'University of Birmingham Dubai',
    gradient: 'from-violet-950 via-purple-950 to-zinc-950',
    accentColor: 'violet',
    excerpt: "Competing alongside Master's CS students, I placed 2nd. But the real win was what happened after: a judge offered me a role at his AI startup, which led to my Final Year Project.",
    achievements: [
      '2nd Place — UOBD CS Expo',
      'Secured role at HUMAI (AI startup, JLT, Dubai)',
      'Built n8n AI automation workflows for GTM',
      'Led to NOVA AI — Final Year Industry Project',
    ],
    relatedCompetitionId: 6,
    sections: [
      {
        type: 'heading',
        content: 'The Presentation',
      },
      {
        type: 'text',
        content: "Competing alongside Master's CS students, I placed 2nd at CS Expo — the University of Birmingham Dubai's flagship computer science exhibition where students present their technical projects to an audience of faculty and industry professionals.",
      },
      {
        type: 'text',
        content: "The CS Expo pitch is where your technical work has to stand on its own. No pitch deck theatrics. Just your system, your architecture, and your ability to explain why you made the decisions you made.",
      },
      {
        type: 'text',
        content: "I presented my work. The judges asked hard questions — about trade-offs, about scalability, about what I'd do differently. I answered them honestly. I talked about what worked, what didn't, and what I'd learned.",
      },
      {
        type: 'quote',
        content: 'I placed 2nd. I was proud of the result. But then something happened that mattered more.',
      },
      {
        type: 'heading',
        content: 'The Conversation After',
      },
      {
        type: 'text',
        content: 'One of the judges — Mo — approached me after the presentations. He ran HUMAI, an AI startup based in JLT, Dubai.',
      },
      {
        type: 'text',
        content: 'He offered me a role, not because of my placement, but because of how I thought about problems. The systems thinking. The willingness to go deep into architecture. The ability to communicate complex trade-offs clearly.',
      },
      {
        type: 'text',
        content: "That conversation turned into a part-time role at HUMAI. Over the next months, I worked on AI automation workflows — building the go-to-market automation infrastructure for multiple applications the startup was simultaneously launching.",
      },
      {
        type: 'quote',
        content: "This wasn't demo work. These were pipelines that directly affected how quickly startups could get products to market.",
      },
      {
        type: 'heading',
        content: 'How It Led to My Final Year Project',
      },
      {
        type: 'text',
        content: 'That experience at HUMAI opened a much bigger door. The startup needed an autonomous voice AI system for outbound sales — something that could qualify leads through actual phone conversations without human intervention.',
      },
      {
        type: 'text',
        content: 'Mo suggested I take this on as my Final Year Industry Project. That project became NOVA AI: an autonomous voice agent system for sales.',
      },
      {
        type: 'stats',
        content: 'The Chain',
        items: [
          { label: '2nd Place', value: 'CS Expo podium finish' },
          { label: 'HUMAI', value: 'Role at AI startup, JLT Dubai' },
          { label: 'n8n Workflows', value: 'Production GTM automation' },
          { label: 'NOVA AI', value: 'Final Year Industry Project' },
        ],
      },
      {
        type: 'heading',
        content: 'The Lesson',
      },
      {
        type: 'text',
        content: "Competitions aren't just about winning. They're about being visible. About doing serious work in front of serious people. About the conversations that happen after the results are announced.",
      },
      {
        type: 'quote',
        content: 'One thing connects to the next — but only if you show up and deliver work that\'s worth noticing.',
      },
    ],
  },
  {
    slug: 'sui-blockathon-arenaai',
    title: '3rd Place — AUS × SuiHub Blockathon',
    subtitle: 'Solo. Against full teams of 5–6 people. At SUI Basecamp.',
    date: '2025',
    readTime: '6 min',
    tag: 'Blockchain & AI',
    place: '3rd',
    event: 'AUS × SuiHub Blockathon',
    prize: 'SDK Invitation from SUI Co-Founder',
    project: 'ArenaAI — On-Chain Verifiable AI Agents',
    gradient: 'from-cyan-950 via-sky-950 to-zinc-950',
    accentColor: 'cyan',
    excerpt: "I competed solo at SUI Basecamp — one of the largest blockchain conferences in the region. Against full teams. I built ArenaAI: on-chain verifiable AI agents. The SUI co-founder reached out personally after.",
    achievements: [
      '3rd Place — AUS × ByBit × SuiHub Blockathon',
      'Competed solo against teams of 5–6',
      'ArenaAI — On-Chain Verifiable AI Agents',
      'Invited by Dr. Kostas Kryptos (SUI co-founder) to build the full SDK',
    ],
    relatedCompetitionId: 8,
    sections: [
      {
        type: 'heading',
        content: 'The Setting',
      },
      {
        type: 'text',
        content: "SUI Basecamp is not a university hackathon. It's a professional-grade conference that brings together blockchain builders and investors from all around the world. The hackathon was sponsored by the American University of Sharjah, ByBit (one of the world's largest crypto exchanges), and SuiHub.",
      },
      {
        type: 'text',
        content: 'The room was filled with experienced teams, most had 5–6 people.',
      },
      {
        type: 'quote',
        content: 'I had a laptop and an idea. And the stubbornness to believe it could work.',
      },
      {
        type: 'heading',
        content: 'The Thesis',
      },
      {
        type: 'text',
        content: 'When AI agents start participating in adversarial environments — financial markets, supply chains, competitive games, governance decisions — how do you prove they haven\'t been tampered with?',
      },
      {
        type: 'text',
        content: "How do you know there's no hidden human override on the agent's decision-making? How do you verify that the agent is actually running the algorithm it claims to be running?",
      },
      {
        type: 'text',
        content: "Current AI systems operate on trust. You deploy an agent and hope it does what you think it does. That's not good enough for high-stakes environments.",
      },
      {
        type: 'quote',
        content: "You deploy an agent and hope it does what you think it does. That's not good enough for high-stakes environments.",
      },
      {
        type: 'heading',
        content: 'What I Built',
      },
      {
        type: 'text',
        content: 'So I built ArenaAI — on-chain verifiable AI agents for competitive environments.',
      },
      {
        type: 'text',
        content: 'MVP: a chess engine where every move is cryptographically verified on SUI using zkLogin (zero-knowledge authentication) and Walrus (decentralised storage). Every decision the agent makes is recorded on-chain with a cryptographic proof, verifiable by any third party, and immutable.',
      },
      {
        type: 'stats',
        content: 'ArenaAI Architecture',
        items: [
          { label: 'On-Chain', value: 'Every AI decision recorded with cryptographic proof' },
          { label: 'zkLogin', value: 'Zero-knowledge authentication on SUI' },
          { label: 'Walrus', value: 'Decentralised storage for decision history' },
          { label: 'Immutable', value: 'Full replay of decision history by any third party' },
        ],
      },
      {
        type: 'text',
        content: "Chess is the proof of concept. The real application is anywhere AI agents need to be trusted.",
      },
      {
        type: 'heading',
        content: 'The Pitch',
      },
      {
        type: 'text',
        content: "I pitched solo. No slides designed by a teammate. No demo polished by a frontend developer. Just me, the system, and the argument for why verifiable AI agents are inevitable.",
      },
      {
        type: 'text',
        content: "Hard questions about scalability, gas costs, latency. Honest answers — including what I hadn't solved yet.",
      },
      {
        type: 'text',
        content: '3rd place. Against full teams.',
      },
      {
        type: 'heading',
        content: 'What Happened After',
      },
      {
        type: 'text',
        content: 'After the presentations, Dr. Kostas Kryptos — co-founder of SUI — personally reached out. SUI. One of the largest L1 blockchains. Silicon Valley. Hundreds of millions in funding.',
      },
      {
        type: 'quote',
        content: 'He invited me to build the full ArenaAI SDK.',
      },
      {
        type: 'text',
        content: "That conversation turned into a direct relationship with one of the co-founders of one of the most important blockchain protocols in the world.",
      },
      {
        type: 'text',
        content: "Sometimes the most valuable outcome of a competition isn't the placement. It's the door that opens afterward.",
      },
      {
        type: 'quote',
        content: "The rooms that stretch you the most are the ones where nobody expected you to be competitive. Show up anyway.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
