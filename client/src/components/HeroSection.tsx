import { motion, useReducedMotion } from "framer-motion";
import { HeroPathDecor } from "./PathDecor";
import Pic from "./Pic";
import { withUtm } from "../lib/utm";

/**
 * Hero — identity in one declarative sentence, plus the first-person "Now"
 * block (which replaced the skills wall). NOVA appears as a plain inline
 * prose link. The press hairline is the permanent, quiet successor to the
 * decayed TVBadgeRibbon.
 */

const EASE = "easeOut";

const HeroSection = () => {
  const reduce = useReducedMotion();
  const y = reduce ? 0 : 10;
  const enter = (delay: number) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.24, delay, ease: EASE },
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Signature gold path — hero-only draw-in accent */}
      <HeroPathDecor />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — the sentence (leads on every viewport) */}
          <div className="lg:col-span-7">
            <motion.p {...enter(0)} className="section-label mb-6">
              Amir Kazemkhani &middot; Founder, NOVA Labs &middot; Dubai
            </motion.p>

            <motion.h1
              {...enter(0.05)}
              className="text-hero font-semibold text-foreground mb-6 max-w-xl"
            >
              I build voice agents that run{" "}
              <span className="text-gradient-gold">real sales calls</span>.
            </motion.h1>

            <motion.p
              {...enter(0.1)}
              className="text-muted-foreground max-w-xl leading-relaxed mb-4"
            >
              Founder of{" "}
              <a
                href={withUtm("https://novalabs.ae", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-prose"
                data-track="hero_nova_link"
              >
                NOVA Labs
              </a>{" "}
              in Dubai — AI that answers, qualifies, and books meetings over
              the phone. I raised{" "}
              <span className="text-foreground/90 nums">$1M at 21</span>.
            </motion.p>

            <motion.p
              {...enter(0.15)}
              className="text-muted-foreground/80 max-w-xl leading-relaxed mb-10"
            >
              Most evenings I&rsquo;m listening back to call recordings, hunting
              for the pause that makes a machine sound human.
            </motion.p>

            {/* Press hairline — permanent, quiet, verified */}
            <motion.p
              {...enter(0.2)}
              className="font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-gold-500/90 border-y border-border/60 py-3 max-w-xl nums flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
            >
              <span>
                Featured on Falcons of Majlis &middot; India Today &times; Aaj
                Tak
              </span>
              <a
                href="/#proof"
                className="text-foreground/80 underline decoration-gold-500/40 underline-offset-4 hover:decoration-gold-500 transition-[text-decoration-color] duration-150 whitespace-nowrap"
                data-track="hero_press_watch"
              >
                Watch &darr;
              </a>
            </motion.p>

            <motion.p
              {...enter(0.25)}
              className="mt-8 text-sm text-muted-foreground"
            >
              <a
                href="mailto:amir@amirkazemkhani.com"
                className="link-prose"
                data-track="hero_email"
              >
                amir@amirkazemkhani.com
              </a>
              {" · "}
              <a
                href={withUtm("https://linkedin.com/in/amirkazemkhani", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-prose"
                data-track="hero_follow_linkedin"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                href={withUtm("https://github.com/Kazemkhani", "hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-prose"
                data-track="hero_follow_github"
              >
                GitHub
              </a>
            </motion.p>
          </div>

          {/* RIGHT — founder portrait (the person is the proof) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.figure
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]"
            >
              <div className="card-editorial rounded-2xl overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <Pic
                    base="/credibility/amir-falcons-stage-pitch-solo"
                    widths={[640, 1120]}
                    sizes="(min-width: 1024px) 440px, 90vw"
                    alt="Amir Hossein Kazemkhani pitching NOVA Labs on the Falcons of Majlis stage"
                    width={1125}
                    height={839}
                    priority
                    imgClassName="w-full h-full object-cover"
                    className="block w-full h-full"
                  />
                </div>
                <figcaption className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3 border-t border-border/60">
                  <p className="font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-gold-500">
                    Falcons of Majlis
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-muted-foreground nums">
                    2026
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>

        {/* NOW — first-person prose, the skills wall's replacement */}
        <motion.div
          {...enter(0.3)}
          className="mt-20 lg:mt-28 max-w-2xl"
          data-track="hero_now_block"
        >
          <p className="section-label mb-4">Now</p>
          <p className="text-muted-foreground leading-relaxed">
            NOVA runs on a four-agent state machine on LiveKit — greeting,
            discovery, pitch, close — held honest by 334 automated tests
            across nine suites. Before this I was the sole technical
            co-founder of a $1M-funded AI construction startup in the Y
            Combinator network, and grew a research product to 147 paying
            users. Along the way: eight podium finishes across 35+
            hackathons — the stories are{" "}
            <a href="/#writing" className="link-prose">
              below
            </a>
            . I&rsquo;m finishing Computer Science with AI at the University
            of Birmingham Dubai.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
