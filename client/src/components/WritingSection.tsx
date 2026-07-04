import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Writing — 4 curated pieces with hand-written one-line hooks.
 * Curated beats exhaustive; /articles holds the rest.
 */

const picks = [
  {
    slug: "dubai-police-hackathon",
    title: "Winning inside Dubai Police HQ",
    hook: "What it takes when the judges carry badges and evaluate whether your thinking survives the field.",
    date: "2025",
  },
  {
    slug: "futurehack-cyberlife",
    title: "CyberLife and the in5 residency",
    hook: "Flagging Type 2 diabetes from scattered lab data — and what a healthcare build has to prove.",
    date: "2025",
  },
  {
    slug: "sui-blockathon-arenaai",
    title: "Solo against six-person teams",
    hook: "Shipping verifiable on-chain agents alone at SUI Basecamp, and the SDK invitation that followed.",
    date: "2025",
  },
  {
    slug: "cs-expo-humai",
    title: "The demo that became a job",
    hook: "How a 2nd-place project turned into an AI engineering role — competitions as interviews.",
    date: "2025",
  },
];

const WritingSection = () => {
  return (
    <section id="writing" className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="section-label mb-4">Writing</p>
          <h2 className="text-heading font-semibold text-foreground mb-12">
            The stories behind the wins
          </h2>
        </Reveal>

        <ul>
          {picks.map((a, i) => (
            <Reveal key={a.slug} delay={0.04 * i}>
              <li className="border-t border-border/60 last:border-b">
                <a
                  href={`/articles/${a.slug}`}
                  data-track={`writing_${a.slug}`}
                  className="group grid sm:grid-cols-[4rem_1fr_auto] gap-2 sm:gap-6 py-6 items-baseline"
                >
                  <span className="font-mono text-xs text-muted-foreground nums">
                    {a.date}
                  </span>
                  <span>
                    <h3 className="text-foreground font-medium group-hover:text-gold-500 transition-colors duration-150">
                      {a.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {a.hook}
                    </p>
                  </span>
                  <ArrowRight className="hidden sm:block w-4 h-4 text-gold-500/0 transition-all duration-150 group-hover:text-gold-500 self-center" />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8">
            <a
              href="/articles"
              className="link-prose text-sm"
              data-track="writing_all_articles"
            >
              All articles →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default WritingSection;
