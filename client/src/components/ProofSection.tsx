import { ArrowRight } from "lucide-react";
import FalconsEpisode from "./FalconsEpisode";
import Reveal from "./Reveal";
import Pic from "./Pic";

/**
 * Proof — artifacts, not adjectives. The Falcons episode is the centerpiece;
 * one photo, the competition record (every claim enumerable), two real quotes.
 */

const record = [
  { place: "1st", event: "Ruya AI Hackathon", prize: "$12,800", slug: null },
  { place: "1st", event: "FutureHack by in5", prize: "6-month residency", slug: "futurehack-cyberlife" },
  { place: "1st", event: "Dubai Police HQ", prize: "$1,600", slug: "dubai-police-hackathon" },
  { place: "1st", event: "IFZA Scale360", prize: "Internship + lead role", slug: null },
  { place: "2nd", event: "LabLab AI Genesis", prize: "$10,000", slug: null },
  { place: "2nd", event: "CS Expo", prize: "AI engineer role", slug: "cs-expo-humai" },
  { place: "3rd", event: "RTA × GDG Dubai", prize: "$1,400", slug: "rta-gdg-tanzeem" },
  { place: "3rd", event: "SUI Basecamp", prize: "SDK invitation", slug: "sui-blockathon-arenaai" },
];

const quotes = [
  {
    text: "A remarkable blend of technical expertise, interpersonal skills, and leadership qualities that set him apart.",
    name: "Prof. Kashif Rajpoot",
    role: "Professor of Medical AI · Interim Vice Provost",
  },
  {
    text: "A remarkable ability to turn ideas into impactful actions.",
    name: "Hamid Mukhtar",
    role: "Associate Professor",
  },
];

const ProofSection = () => {
  return (
    <section id="proof" className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="section-label mb-4">Proof</p>
          <h2 className="text-heading font-semibold text-foreground mb-4">
            On the record
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-12">
            Pitching NOVA Labs on Falcons of Majlis (India Today &times; Aaj
            Tak). My segment starts at 59:22 — watch it rather than take my
            word for it.
          </p>
        </Reveal>

        {/* Centerpiece — the episode itself */}
        <FalconsEpisode />

        {/* One photo, one neutral line */}
        <Reveal>
          <figure className="mb-16">
            <div className="card-editorial rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] sm:aspect-video overflow-hidden bg-secondary">
                <Pic
                  base="/credibility/amir-jensen-huang-nvidia"
                  widths={[640, 729]}
                  sizes="(min-width: 1024px) 928px, 90vw"
                  alt="Amir Hossein Kazemkhani in conversation with Jensen Huang"
                  width={729}
                  height={1280}
                  imgClassName="w-full h-full object-cover object-[50%_30%]"
                  className="block w-full h-full"
                />
              </div>
              <figcaption className="px-5 py-4 flex items-center justify-between gap-3 border-t border-border/60">
                <p className="text-sm text-foreground/90">
                  In conversation with Jensen Huang
                </p>
                <p className="font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-muted-foreground nums">
                  NVIDIA · UAE 2026
                </p>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* Competition record — one tight, artifact-linked block */}
        <Reveal>
          <div className="mb-16">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
              <h3 className="text-foreground font-medium">
                Competition record
              </h3>
              <p className="font-mono text-xs text-muted-foreground nums">
                8 podium finishes · 35+ hackathons · $25,800+ in prizes
              </p>
            </div>
            <ul className="border-t border-border/60">
              {record.map((r) => (
                <li
                  key={r.event}
                  className="border-b border-border/60 py-3 grid grid-cols-[3rem_1fr_auto] gap-4 items-baseline"
                >
                  <span className="font-mono text-xs text-gold-500 nums">
                    {r.place}
                  </span>
                  <span className="text-sm text-foreground/90">
                    {r.event}
                    <span className="text-muted-foreground">
                      {" — "}
                      {r.prize}
                    </span>
                  </span>
                  {r.slug ? (
                    <a
                      href={`/articles/${r.slug}`}
                      className="group inline-flex items-center gap-1 font-mono text-xs text-gold-500/70 hover:text-gold-500 transition-colors duration-150"
                      data-track={`proof_record_${r.slug}`}
                    >
                      Story
                      <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Two real quotes — LinkedIn recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={0.05 * i}>
              <blockquote className="card-editorial rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <p className="font-serif italic text-lg text-foreground/90 leading-relaxed mb-6 flex-1">
                  &ldquo;{q.text}&rdquo;
                </p>
                <footer>
                  <p className="text-sm font-medium text-foreground">
                    {q.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {q.role} ·{" "}
                    <a
                      href="https://linkedin.com/in/amirkazemkhani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-prose"
                      data-track="proof_quote_linkedin"
                    >
                      via LinkedIn
                    </a>
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
