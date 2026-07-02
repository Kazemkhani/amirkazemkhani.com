import { Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/lib/meta";
import { withUtm } from "@/lib/utm";

/**
 * /work-with-me — fresh, claim-safe implementation of the conversion-page
 * intent (supersedes PR #4). Three engagement types, proof links, process,
 * contact. Booking button renders only when VITE_CAL_URL is configured.
 */

const engagements = [
  {
    title: "Voice agents on your phone lines",
    body: "Through NOVA Labs: an AI agent that answers, qualifies, and books meetings over the phone — greeting, discovery, pitch, close. We scope your call flows, deploy a pilot, and iterate on real transcripts until it holds a conversation you'd put your name on.",
    linkLabel: "Talk to the live agent",
    href: withUtm("https://novalabs.ae/live", "work_with_me"),
    external: true,
    track: "wwm_engagement_voice",
  },
  {
    title: "AI product engineering, end to end",
    body: "Architecture through shipped software: multi-agent systems, LLM pipelines, real-time voice, and the unglamorous parts — tests, observability, deployment. I've built under founders' constraints (my own included) and ship working systems, not decks.",
    linkLabel: "See the work",
    href: "/#work",
    external: false,
    track: "wwm_engagement_product",
  },
  {
    title: "Speaking & workshops",
    body: "Voice AI in practice, building in the Gulf, and what running real sales calls teaches you about agent design. Formats from a 20-minute talk to a hands-on afternoon.",
    linkLabel: "Watch me on stage",
    href: "/#proof",
    external: false,
    track: "wwm_engagement_speaking",
  },
];

const proofLinks = [
  { label: "Falcons of Majlis — the episode, from 59:22", href: "/#proof" },
  { label: "Competition record — 8 podium finishes, $25,800+", href: "/#proof" },
  { label: "The long-form stories", href: "/articles" },
];

const steps = [
  {
    n: "01",
    title: "Write to me",
    body: "One email: what you're building, where it hurts, timeline. I reply personally.",
  },
  {
    n: "02",
    title: "Scoping call",
    body: "30 minutes. We work out whether this is a fit and what a first slice looks like.",
  },
  {
    n: "03",
    title: "Proposal",
    body: "Scope, timeline, price — in writing, no surprises. Small first milestone so you can judge the work before committing.",
  },
];

export default function WorkWithMe() {
  usePageMeta(
    "Work with me — Amir Kazemkhani",
    "Voice agents on your phone lines, AI product engineering end to end, and speaking on voice AI. Founder of NOVA Labs, Dubai.",
  );

  const calUrl = import.meta.env.VITE_CAL_URL;

  return (
    <main id="main" className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Intro */}
        <Reveal>
          <p className="section-label mb-4">Work with me</p>
          <h1 className="text-hero font-semibold text-foreground mb-6">
            Three ways this usually goes.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-16 max-w-xl">
            I&rsquo;m Amir — founder of{" "}
            <a
              href={withUtm("https://novalabs.ae", "work_with_me")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-prose"
              data-track="wwm_nova_link"
            >
              NOVA Labs
            </a>{" "}
            in Dubai. I take on a small number of engagements alongside
            building the company.
          </p>
        </Reveal>

        {/* Engagements */}
        <div className="space-y-10 mb-20">
          {engagements.map((e, i) => (
            <Reveal key={e.title} delay={0.04 * i}>
              <div className="border-t border-border/60 pt-8">
                <h2 className="text-subheading font-medium text-foreground mb-3">
                  {e.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {e.body}
                </p>
                <a
                  href={e.href}
                  {...(e.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-1.5 text-sm text-gold-500 hover:text-gold-400 transition-colors duration-150"
                  data-track={e.track}
                >
                  {e.linkLabel}
                  {e.external ? (
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  )}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Proof */}
        <Reveal>
          <div className="mb-20">
            <p className="section-label mb-6">Before you email</p>
            <ul className="space-y-3">
              {proofLinks.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    className="link-prose text-sm"
                    data-track="wwm_proof_link"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Process */}
        <Reveal>
          <div className="mb-20">
            <p className="section-label mb-6">Process</p>
            <ol className="grid sm:grid-cols-3 gap-8">
              {steps.map((s) => (
                <li key={s.n}>
                  <p className="font-mono text-xs text-gold-500 nums mb-2">
                    {s.n}
                  </p>
                  <h3 className="text-foreground font-medium mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal>
          <div className="border-t border-border/60 pt-10">
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
              The fastest way to start is a plain email — what you&rsquo;re
              building and where voice or AI fits. I&rsquo;ll tell you honestly
              if I&rsquo;m not the right person.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:amir@amirkazemkhani.com?subject=Working%20together"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-150"
                data-track="wwm_email"
              >
                <Mail className="w-4 h-4" />
                amir@amirkazemkhani.com
              </a>
              {calUrl && (
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold-500/40 text-gold-500 font-medium rounded-full hover:border-gold-500 transition-colors duration-150"
                  data-track="wwm_booking"
                >
                  Book a call
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
