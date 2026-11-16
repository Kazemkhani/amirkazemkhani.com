export type WorldId = "bayyina" | "marsad" | "enec";
export interface World {
  id: WorldId;
  name: string;
  arabic: string;
  category: string;
  colour: string;
  url: string;
  preview: string;
  film: string;
  headline: string;
  description: string;
  context: string;
  limit: string;
  chapters: string[];
}
export const worlds: World[] = [
  {
    id: "bayyina",
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
    name: "HADHRA",
    arabic: "حضرة",
    category: "Marine systems & energy resilience",
    colour: "#aa4b32",
    url: "https://enec.amirkazemkhani.com",
    preview: "https://enec.amirkazemkhani.com",
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
];
