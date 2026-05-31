import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Mail } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import NewsletterInline from "@/components/NewsletterInline";
import { submitDiscoveryLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";

// Cal.com booking link — set VITE_CAL_URL in Vercel project settings.
// Defaults to amirkazemkhani's discovery event; page handles missing routes
// gracefully so the site is never broken even before env vars are wired.
const CAL_URL =
  (import.meta.env.VITE_CAL_URL as string | undefined) ||
  "https://cal.com/amirkazemkhani/discovery";
const DIRECT_EMAIL = "amir@amirkazemkhani.com";

const META_TITLE =
  "Work with Amir — Voice AI builds + advisory · amirkazemkhani.com";
const META_DESCRIPTION =
  "Book a 30-minute discovery call. Voice AI builds, infrastructure advisory, and fractional CTO for AI startups. Based in Dubai.";

/** Reusable word-reveal animation matching ContactSection / HeroSection patterns. */
function WordReveal({
  text,
  delay = 0,
  isInView,
  className = "",
}: {
  text: string;
  delay?: number;
  isInView: boolean;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.05,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className={`inline-block mr-[0.25em] ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/** Sets document title + meta description for this page; resets on unmount. */
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute("content") ?? null;
    if (descEl) descEl.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (descEl && prevDesc !== null) descEl.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}

// ── 1. Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-[orbDrift1_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/3 rounded-full blur-3xl animate-[orbDrift2_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 lg:pt-20 pb-16 text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-gold-500/90 mb-6 lg:mb-8"
        >
          // CURRENT FOCUS &middot; NOVA LABS VOICE AI / VENTURES
        </motion.p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-8">
          {"I build voice AI agents that close enterprise leads in Arabic, Hindi, and English from Dubai."
            .split(" ")
            .map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.04,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className={`inline-block mr-[0.2em] ${
                  ["Arabic,", "Hindi,", "English"].includes(word)
                    ? "text-gradient-gold"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl lg:mx-0 mx-auto leading-relaxed"
        >
          Currently shipping ~800ms outbound voice for UAE pipelines. Closed
          books: rare. Open until end of Q3 for two engagements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <MagneticButton strength={0.2}>
            <a
              href="#book"
              className="inline-block px-7 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300"
              data-track="wwm_hero_book"
            >
              Book a discovery call
            </a>
          </MagneticButton>
          <a
            href="#the-work"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-border text-foreground/80 font-medium rounded-full hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
          >
            See the work
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground/40 animate-[fadeIn_0.6s_2s_both]">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

// ── 2. The work ─────────────────────────────────────────────────────────────
type Engagement = {
  code: string;
  name: string;
  problem: string;
  outcome: string;
};

const engagements: Engagement[] = [
  {
    code: "01",
    name: "Voice agent build",
    problem: "Outbound voice agent for your sales pipeline.",
    outcome:
      "From discovery to deployed agent in 4–6 weeks. PDPA + TCPA compliant. Mumbai or UAE datacenter.",
  },
  {
    code: "02",
    name: "AI infrastructure advisory",
    problem: "Voice + agent architecture review.",
    outcome:
      "Two-week sprint. You walk away with a deployed prototype and a build vs. buy verdict.",
  },
  {
    code: "03",
    name: "Fractional CTO for AI startups",
    problem: "0→1 technical leadership for non-technical founders.",
    outcome:
      "Most efficient when you've raised seed and need someone who has shipped before.",
  },
];

function TheWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="the-work"
      className="py-24 lg:py-32 border-t border-border/50"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          The work
        </motion.p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 max-w-2xl">
          <WordReveal
            text="Three things I do — well."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <div className="grid gap-6 md:gap-8">
          {engagements.map((e, i) => (
            <motion.article
              key={e.code}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group card-editorial rounded-2xl p-6 sm:p-8 md:p-10 grid md:grid-cols-12 gap-4 md:gap-8"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-gold-500/80">
                  {e.code}
                </span>
              </div>
              <div className="md:col-span-10">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {e.name}
                </h3>
                <p className="text-foreground/80 text-base sm:text-lg mb-2">
                  {e.problem}
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {e.outcome}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Proof ─────────────────────────────────────────────────────────────────
type Proof = { label: string; line: string; slug: string };

const proofs: Proof[] = [
  {
    label: "Dubai Police HQ",
    line: "First place inside Dubai Police Headquarters. Judges carry badges.",
    slug: "dubai-police-hackathon",
  },
  {
    label: "NVIDIA · Jensen Huang",
    line: "In conversation with Jensen Huang on voice AI at NVIDIA, 2026.",
    slug: "sui-blockathon-arenaai",
  },
  {
    label: "Falcons of Majlis",
    line: "Pitched NOVA Labs solo on India Today × Aaj Tak.",
    slug: "futurehack-cyberlife",
  },
];

function Proof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 border-t border-border/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          Proof
        </motion.p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl">
          <WordReveal
            text="Credibility isn't claimed. It's earned in rooms that matter."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="editorial-divider mb-10"
        />

        <ul className="space-y-6">
          {proofs.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="grid sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
            >
              <span className="sm:col-span-4 font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-gold-500/90">
                {p.label}
              </span>
              <a
                href={`/articles/${p.slug}`}
                className="sm:col-span-8 text-foreground/85 hover:text-gold-400 transition-colors duration-300 inline-flex items-baseline gap-2 group"
              >
                <span>{p.line}</span>
                <ArrowRight className="w-3.5 h-3.5 self-center text-gold-500/70 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── 4. Process ───────────────────────────────────────────────────────────────
type Step = { code: string; name: string; detail: string };

const steps: Step[] = [
  {
    code: "STEP 01",
    name: "Discovery call",
    detail: "30 minutes, free. We figure out if this is a fit at all.",
  },
  {
    code: "STEP 02",
    name: "Scoped proposal",
    detail: "Three business days. Fixed scope, fixed price, no surprises.",
  },
  {
    code: "STEP 03",
    name: "Sprint or build",
    detail: "Two-week sprint or four-to-six-week build. Weekly check-ins.",
  },
  {
    code: "STEP 04",
    name: "Handoff + ongoing",
    detail: "Documentation, runbook, and a retainer option if you want one.",
  },
];

function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 border-t border-border/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          Process
        </motion.p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 max-w-2xl">
          <WordReveal
            text="How it actually runs."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <ol className="grid gap-px bg-border/40">
          {steps.map((s, i) => (
            <motion.li
              key={s.code}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              className="bg-background py-6 sm:py-8 px-2 sm:px-4 grid sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
            >
              <span className="sm:col-span-3 font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase text-gold-500/80">
                {s.code}
              </span>
              <span className="sm:col-span-3 font-display text-lg sm:text-xl font-semibold text-foreground">
                {s.name}
              </span>
              <span className="sm:col-span-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {s.detail}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── 5. Booking widget ────────────────────────────────────────────────────────
/**
 * Booking section — primary CTA opens Cal.com in a new tab; secondary path is
 * a discovery-form fallback that POSTs directly to HubSpot Forms API with the
 * visitor's first-touch UTM attached. Mailto stays as last-resort.
 *
 * Why both: ~20% of senior buyers don't book inside a calendar widget on first
 * touch — they want to send a note describing the problem first. The form
 * captures them without breaking the brand voice (no popup, no modal).
 */
function BookingWidget() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    problem: "",
  });
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.email.includes("@")) {
      setError("Name and email required.");
      setState("error");
      return;
    }
    setState("submitting");
    setError(null);
    try {
      await submitDiscoveryLead(form);
      trackEvent("Discovery Lead Submit", { surface: "work-with-me-form" });
      setState("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed.");
      setState("error");
    }
  }

  return (
    <section
      id="book"
      className="py-24 lg:py-32 border-t border-border/50"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          Book
        </motion.p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
          <WordReveal
            text="Thirty minutes. No deck."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
          className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Tell me the problem in plain English. I&apos;ll tell you whether
          I&apos;m the right person for it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.55,
            type: "spring",
            stiffness: 150,
            damping: 14,
          }}
          className="mb-6 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <MagneticButton strength={0.2}>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("Cal Booking Click", { surface: "work-with-me" })
              }
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors duration-300 text-base sm:text-lg"
              data-track="wwm_booking_primary"
            >
              <Mail className="w-5 h-5" />
              Book a 30-minute discovery call
            </a>
          </MagneticButton>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-border text-foreground/80 font-medium rounded-full hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300"
            data-track="wwm_form_toggle"
          >
            {showForm ? "Hide form" : "Send a note instead"}
          </button>
        </motion.div>

        {showForm && state !== "ok" && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={onSubmit}
            className="text-left max-w-xl mx-auto grid gap-3 mt-8"
          >
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50"
            />
            <input
              required
              type="email"
              placeholder="Work email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50"
            />
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50"
              />
              <input
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="What problem are you trying to solve?"
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              className="px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold-500/50 resize-none"
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-gold-500 text-background font-semibold rounded-full hover:bg-gold-400 transition-colors disabled:opacity-60"
            >
              {state === "submitting" ? "Sending..." : "Send the note"}
              {state !== "submitting" && <ArrowRight className="w-4 h-4" />}
            </button>
            {error && (
              <p className="text-xs text-red-400/80" role="alert">
                {error}
              </p>
            )}
          </motion.form>
        )}

        {state === "ok" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold-400 mt-6"
          >
            Got it. I&apos;ll reply within two business days from Dubai.
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75 }}
          className="text-sm text-muted-foreground mt-10"
        >
          Direct email if both are broken:{" "}
          <a
            href={`mailto:${DIRECT_EMAIL}`}
            className="text-foreground/80 hover:text-gold-500 transition-colors underline-offset-4 hover:underline"
          >
            {DIRECT_EMAIL}
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ── 5b. Newsletter strip ─────────────────────────────────────────────────────
function NewsletterStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 lg:py-24 border-t border-border/50 bg-gold-500/[0.02]"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          The NOVA Signal
        </motion.p>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
          <WordReveal
            text="Not ready to talk yet? Read what I'm shipping."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <NewsletterInline surface="work-with-me" />
        </motion.div>
      </div>
    </section>
  );
}

// ── 6. What I won't do ───────────────────────────────────────────────────────
const filters: string[] = [
  "I will not build voice agents for crypto trading, gambling, or adult-industry pipelines.",
  "I will not do hourly billing for builds. Fixed scope or monthly retainer — both protect us.",
  "I will not start work without a signed engagement letter. Protects you as much as it protects me.",
];

function WontDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 border-t border-border/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="section-label mb-4"
        >
          What I won&apos;t do
        </motion.p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10 max-w-3xl">
          <WordReveal
            text="The wrong fit costs both of us more than a polite no."
            delay={0.15}
            isInView={isInView}
          />
        </h2>

        <ul className="space-y-4 max-w-3xl">
          {filters.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="flex gap-3 items-baseline text-foreground/85 text-base sm:text-lg leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-gold-500/70 mt-1"
              >
                —
              </span>
              <span>{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── 7. Footer CTA ────────────────────────────────────────────────────────────
function FooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 border-t border-border/50" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-xl sm:text-2xl md:text-3xl text-foreground/90 leading-snug mb-6"
        >
          Want to start small?{" "}
          <a
            href="/articles"
            className="text-gold-500 hover:text-gold-400 underline-offset-8 hover:underline transition-colors"
          >
            Read the case studies.
          </a>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-muted-foreground"
        >
          Or email{" "}
          <a
            href={`mailto:${DIRECT_EMAIL}`}
            className="text-foreground/80 hover:text-gold-500 transition-colors underline-offset-4 hover:underline"
          >
            {DIRECT_EMAIL}
          </a>{" "}
          if you&apos;d rather skip the form.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="editorial-divider-center mt-12"
        />
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function WorkWithMe() {
  usePageMeta(META_TITLE, META_DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.a>
      </div>

      <Hero />
      <TheWork />
      <Proof />
      <Process />
      <BookingWidget />
      <NewsletterStrip />
      <WontDo />
      <FooterCTA />
    </div>
  );
}
