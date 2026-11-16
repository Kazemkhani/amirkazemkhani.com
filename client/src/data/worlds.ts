export type WorldId = string;
export interface World {
  id: WorldId;
  name: string;
  arabic: string;
  category: string;
  colour: string;
  url: string;
  preview: string;
  film?: string;
  image?: string;
  scene?: string;
  background?: string;
  embeddable?: boolean;
  entryLabel?: string;
  status?: string;
  headline: string;
  description: string;
  context: string;
  limit: string;
  chapters: string[];
}
export const worlds: World[] = [
  {
    id: "bayyina",
    background: "#d5f3e5",
    scene: "/worlds/bayyina-scene.mp4",
    embeddable: true,
    status: "Exhibiting at World Police Summit",
    name: "Bayyina",
    arabic: "بيّنة",
    category: "AI evidence & forensic research",
    colour: "#397e6c",
    url: "https://bayyina.amirkazemkhani.com",
    preview: "https://bayyina.amirkazemkhani.com/twin/",
    film: "/worlds/bayyina-film.mp4",
    headline: "What if the evidence\ncould speak for itself?",
    description:
      "Step into a digital laboratory. Follow an AI summary from a synthetic conversation to a sealed record, then try changing the evidence yourself.",
    context:
      "Exhibiting at the Dubai Police Forensic Science Forum, alongside World Police Summit, 16–18 November 2026 at Dubai World Trade Centre. Presented to officials at the booth.",
    limit:
      "Research prototype. Synthetic English conversations. Not used on casework or by a police force. The seal proves an output is unchanged, not that it was right.",
    chapters: [
      "Walk the laboratory",
      "Follow the evidence",
      "Try the tamper test",
    ],
  },
  {
    id: "marsad",
    background: "#dbe9ff",
    scene: "/worlds/marsad-scene.mp4",
    embeddable: true,
    status: "Dubai Airports hackathon",
    name: "Marsad",
    arabic: "مرصد",
    category: "Aviation & operational intelligence",
    colour: "#4468be",
    url: "https://marsad.amirkazemkhani.com",
    preview: "https://marsad.amirkazemkhani.com/replay/",
    film: "/worlds/marsad-film.mp4",
    headline: "An airport moves.\nOne decision ripples.",
    description:
      "Explore the airfield, follow a fog disruption and see how one decision reaches the teams around it. A shared picture of an airport under pressure.",
    context:
      "Built with Team Visionary for the Dubai Airports hackathon and presented to the CEO of Dubai Airports.",
    limit:
      "Hackathon prototype using synthetic organiser data. The embedded experience uses the recorded replay, rather than implying an operational airport feed.",
    chapters: [
      "Explore the airfield",
      "Replay the disruption",
      "Follow the response",
    ],
  },
  {
    id: "enec",
    background: "#ffe3cf",
    scene: "/worlds/enec-scene.mp4",
    embeddable: true,
    status: "ENEC-track shortlisted project",
    name: "HADHRA",
    arabic: "حضرة",
    category: "Marine systems & energy resilience",
    colour: "#aa4b32",
    url: "https://enec.amirkazemkhani.com",
    preview: "https://enec.amirkazemkhani.com/sims",
    film: "https://enec.amirkazemkhani.com/film/HADHRA-comic-film-105s-v3.mp4",
    headline: "Protect the intake.\nGive the sea back.",
    description:
      "Follow a jellyfish swarm through an interactive coastal world. Diversion units, a guiding fence and a return lock form a proposed system for protecting seawater intakes.",
    context:
      "Shortlisted in the ENEC track of Advanced Technology Pioneers. Presented at the National Science, Technology and Innovation Festival, 10–13 November 2026, ADNEC Centre Al Ain.",
    limit:
      "Engineering concept and digital model. Not yet tested at sea. Modelled behaviour is not a measured real-world result.",
    chapters: [
      "Follow the swarm",
      "Explore the three phases",
      "Try the digital model",
    ],
  },
  {
    id: "nova",
    name: "NOVA Labs",
    arabic: "",
    category: "Voice AI",
    colour: "#7254cb",
    background: "#eae1ff",
    url: "https://novalabs.ae",
    preview: "https://novalabs.ae",
    image: "/worlds/nova.webp",
    status: "Founder & CTO",
    headline: "A conversation.\nA business moving forward.",
    description:
      "Voice agents that answer, qualify and book meetings. My work on the timing, reasoning and infrastructure behind a natural conversation.",
    context:
      "Founded in Dubai. Presented on Falcons of Majlis, India Today and Aaj Tak. Selected for Antler × Dubai Founders HQ.",
    limit:
      "Visit the product to explore its current capabilities. Calling and microphone access happen only in the product, with your permission.",
    chapters: ["Voice agents", "Call workflows", "Evaluation"],
  },
  {
    id: "ruya",
    name: "RUYA",
    arabic: "رؤيا",
    category: "Enterprise AI",
    colour: "#345ce8",
    background: "#e2e6ff",
    embeddable: true,
    url: "https://ruya.amirkazemkhani.com",
    preview: "https://ruya.amirkazemkhani.com",
    image: "/worlds/ruya.webp",
    status: "Enterprise agent platform",
    headline: "One home.\nEvery agent.",
    description:
      "A shared place to find, compare and reuse AI agents. Explore the product that grew out of MIZAN, my government AI registry work.",
    context:
      "Built around an enterprise brief: teams rebuilding the same agents, without a shared way to compare their quality.",
    limit:
      "Product demonstration. Open the site for the current implementation and its stated limits.",
    chapters: ["Agent discovery", "Shared evaluation", "Reuse"],
  },
  {
    id: "samt",
    name: "Samt Health",
    arabic: "سمت",
    category: "Women's health",
    colour: "#a8506d",
    background: "#f8e2e9",
    url: "https://samt.health",
    preview: "https://samt.health",
    image: "/worlds/samt.webp",
    film: "/worlds/samt-film.mp4",
    status: "Co-founder & CTO",
    headline: "A new chapter.\nA clearer direction.",
    description:
      "An Arabic-first companion for women navigating menopause. A product built around language, dignity and clearer conversations about health.",
    context:
      "Selected for Expo City Dubai’s Changemakers programme. Explore the public site and original launch film.",
    limit:
      "The public site describes current availability. This portfolio does not provide medical advice or display patient information.",
    chapters: [
      "Arabic-first design",
      "Personal wellbeing",
      "Clearer conversations",
    ],
  },
  {
    id: "morning",
    name: "The Morning Club",
    arabic: "",
    category: "Consumer product & movement",
    colour: "#75803b",
    background: "#edf1ca",
    url: "https://apps.apple.com/ae/app/the-morning-club/id6761857556",
    preview: "",
    image: "/worlds/morning-0.jpg",
    entryLabel: "View on the App Store",
    status: "Co-founder · product & build",
    headline: "A little movement.\nA different kind of morning.",
    description:
      "The club, in your pocket. A Pilates studio’s member experience, from finding a class to planning the next visit.",
    context:
      "Built for a women’s Pilates club in Abu Dhabi. The app is published on the App Store under Amir Hossein Kazemkhani.",
    limit:
      "The images shown are the app’s public App Store screenshots. Open the listing for current availability.",
    chapters: ["Class discovery", "Studio membership", "Mobile experience"],
  },
  {
    id: "gold",
    name: "Gold Hedge",
    arabic: "",
    category: "Financial infrastructure",
    colour: "#9a701b",
    background: "#f4e9bd",
    url: "mailto:amir@amirkazemkhani.com?subject=Gold%20Hedge%20walkthrough",
    preview: "",
    image: "/worlds/gold.webp",
    entryLabel: "Request a walkthrough",
    status: "Co-founder & CTO · private product",
    headline: "Precision,\nin every transaction.",
    description:
      "The infrastructure behind a physical gold and silver trading platform. Pricing, customer workflows and a ledger built around exact quantities.",
    context:
      "A private build. I led the platform’s technology and implementation. A walkthrough is available on request.",
    limit:
      "The gold sculpture is an illustration. No customer information, live prices or private trading screens are published here.",
    chapters: ["Institutional pricing", "Order workflows", "Exact accounting"],
  },
];

export const earlierWork = [
  {
    name: "Keel",
    category: "Business intelligence",
    description:
      "An interactive operating dashboard concept for self-storage businesses. Explore the public demo.",
    href: "/keel/",
  },
  {
    name: "Kenchi",
    category: "Construction AI",
    description:
      "Computer vision and language models for construction sites. Co-founder.",
    href: "/work/#earlier",
  },
  {
    name: "CyberLife",
    category: "Healthcare AI",
    description:
      "Early disease detection from routine lab data. FutureHack winner on a Mediclinic challenge.",
    href: "/articles/futurehack-cyberlife",
  },
  {
    name: "MIZAN",
    category: "Government AI",
    description:
      "A registry and compliance engine for government AI models, pitched to TDRA representatives.",
    href: "/work/#earlier",
  },
  {
    name: "TANZEEM",
    category: "Smart cities",
    description:
      "School pickup management and QR-verified handover. RTA × GDG Dubai.",
    href: "/articles/rta-gdg-tanzeem",
  },
  {
    name: "ArenaAI",
    category: "Verifiable AI",
    description:
      "AI agents on the SUI network. Built solo and placed third at SUI Basecamp.",
    href: "/articles/sui-blockathon-arenaai",
  },
  {
    name: "Huscribe",
    category: "Voice AI",
    description:
      "WhatsApp-native voice AI that turns conversations into CRM updates, built inside Humai.",
    href: "/articles/cs-expo-humai",
  },
];
