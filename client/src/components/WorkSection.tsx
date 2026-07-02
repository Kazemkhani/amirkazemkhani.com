import { ArrowUpRight, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { withUtm } from "../lib/utm";

/**
 * Work — one NOVA Labs card + the strongest real projects.
 * Every card links somewhere real (doctrine: no dead-end cards).
 */

const projects = [
  {
    title: "CyberLife",
    line: "AI diabetes detection for Mediclinic — flags Type 2 cases from scattered lab data.",
    proof: "1st · FutureHack by in5",
    href: "/articles/futurehack-cyberlife",
    track: "work_cyberlife",
  },
  {
    title: "ArenaAI",
    line: "On-chain verifiable AI agents on SUI — built solo against six-person teams.",
    proof: "3rd · SUI Basecamp",
    href: "/articles/sui-blockathon-arenaai",
    track: "work_arenaai",
  },
  {
    title: "TANZEEM",
    line: "Smart school-pickup management for the RTA — QR-verified custody handoff.",
    proof: "3rd · RTA × GDG Dubai",
    href: "/articles/rta-gdg-tanzeem",
    track: "work_tanzeem",
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="section-label mb-4">Work</p>
          <h2 className="text-heading font-semibold text-foreground mb-12">
            What I&rsquo;m building
          </h2>
        </Reveal>

        {/* NOVA Labs — the one company card */}
        <Reveal delay={0.05}>
          <a
            href={withUtm("https://novalabs.ae/live", "work")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="work_nova_card"
            className="group block card-editorial rounded-2xl p-8 md:p-10 mb-16"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="max-w-2xl">
                <p className="font-mono text-xs tracking-[0.14em] uppercase text-gold-500 mb-3">
                  NOVA Labs
                </p>
                <p className="text-xl md:text-2xl font-medium text-foreground leading-snug text-balance">
                  Voice agents that run sales calls end to end — greeting,
                  discovery, pitch, close.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-gold-500 font-medium whitespace-nowrap">
                Talk to it
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        </Reveal>

        {/* Selected projects — one-liners, artifact-linked */}
        <ul>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}>
              <li className="border-t border-border/60 last:border-b">
                <a
                  href={p.href}
                  data-track={p.track}
                  className="group grid md:grid-cols-12 gap-2 md:gap-6 py-6 items-baseline"
                >
                  <h3 className="md:col-span-3 text-foreground font-medium">
                    {p.title}
                  </h3>
                  <p className="md:col-span-6 text-sm text-muted-foreground leading-relaxed">
                    {p.line}
                  </p>
                  <p className="md:col-span-3 font-mono text-xs text-gold-500/80 nums md:text-right whitespace-nowrap">
                    {p.proof}
                    <ArrowRight
                      aria-hidden="true"
                      className="inline-block ml-2 w-3 h-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </p>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkSection;
