import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type CSSProperties,
  type PointerEvent,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  X,
  Pause,
  MoveUpRight,
} from "lucide-react";
import { worlds, type World } from "../data/worlds";
import WritingSection from "../components/WritingSection";
import FalconsEpisode from "../components/FalconsEpisode";
import { usePageMeta, SITE_TITLE, SITE_DESCRIPTION } from "../lib/meta";
import "../portfolio.css";

const PortalScene = lazy(() => import("../components/PortalScene"));
const WorldMotion = lazy(() => import("../components/WorldMotion"));
type Experience = { world: World; mode: "demo" | "film" };

export default function Home() {
  usePageMeta(SITE_TITLE, SITE_DESCRIPTION);
  const reduced = useReducedMotion();
  const [pause, setPause] = useState(false);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [portal, setPortal] = useState<{
    world: World;
    x: number;
    y: number;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const trigger = useRef<HTMLElement | null>(null);
  const paused = !!reduced || pause;
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    function reset() {
      setPortal(null);
      clearTimeout(timer.current);
    }
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);
  function cancelPortal() {
    clearTimeout(timer.current);
    window.stop();
    setPortal(null);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!portal) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancelPortal();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [portal]);
  function enter(e: MouseEvent<HTMLAnchorElement>, world: World) {
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      paused ||
      e.detail === 0
    )
      return;
    e.preventDefault();
    if (portal) return;
    trigger.current = e.currentTarget;
    setPortal({ world, x: e.clientX, y: e.clientY });
    timer.current = setTimeout(() => {
      window.location.assign(world.url);
    }, 900);
  }
  function attract(e: PointerEvent<HTMLButtonElement>) {
    if (paused || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--pointer-x",
      `${e.clientX - box.left}px`,
    );
    e.currentTarget.style.setProperty(
      "--pointer-y",
      `${e.clientY - box.top}px`,
    );
  }
  function open(
    e: MouseEvent<HTMLButtonElement>,
    world: World,
    mode: "demo" | "film",
  ) {
    trigger.current = e.currentTarget;
    setExperience({ world, mode });
  }
  return (
    <main id="main" className={`portfolio ${paused ? "motion-paused" : ""}`}>
      <section className="portfolio-hero" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> Independent builder. Based in Dubai.
          </p>
          <h1>
            I build things
            <br />
            you can <em>step into.</em>
          </h1>
          <p className="hero-intro">
            I’m Amir Hossein Kazemkhani. I turn complex problems into working AI
            systems and interactive worlds. Come inside a few of them.
          </p>
          <a href="#work" className="pill-button dark">
            Explore the worlds <ArrowDown size={16} />
          </a>
          <div className="hero-signature">
            <img
              src="/assets/images/amir-profile-640.webp"
              alt="Amir Hossein Kazemkhani"
              width="44"
              height="44"
            />
            <div>
              <span>Engineer. Founder. Always building.</span>
              <a href="https://novalabs.ae">
                Currently building NOVA Labs <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit-line orbit-one" />
          <div className="orbit-line orbit-two" />
          <img
            className="sculpture-fallback"
            src="/worlds/portals.webp"
            alt=""
            width="1200"
            height="1050"
          />
          <Suspense fallback={null}>
            <PortalScene paused={paused} />
          </Suspense>
          <a className="world-label label-bayyina" href="#bayyina">
            <span className="label-dot teal" /> Bayyina{" "}
            <ArrowUpRight size={13} />
          </a>
          <a className="world-label label-marsad" href="#marsad">
            <span className="label-dot blue" /> Marsad{" "}
            <ArrowUpRight size={13} />
          </a>
          <a className="world-label label-enec" href="#enec">
            <span className="label-dot coral" /> HADHRA{" "}
            <ArrowUpRight size={13} />
          </a>
          <span className="art-caption">
            A small universe of things I’ve built.
          </span>
        </div>
        <div className="hero-bottom">
          <span>Selected work / 2026</span>
          <span>Three worlds. Real demos. Your curiosity.</span>
          <button
            onClick={() => setPause(!pause)}
            aria-pressed={paused}
            disabled={!!reduced}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
            {reduced
              ? "Reduced motion"
              : paused
                ? "Play motion"
                : "Pause motion"}
          </button>
        </div>
      </section>

      <section id="work" className="worlds-section">
        <div className="section-heading">
          <p className="eyebrow">01 / Enter the work</p>
          <h2>
            Ideas are interesting.
            <br />
            <em>Working worlds are better.</em>
          </h2>
          <p>
            Explore a live demo here, watch the film, or follow a portal into
            the full experience.
          </p>
        </div>
        {worlds.map((world, index) => (
          <article
            key={world.id}
            id={world.id}
            className={`project-world ${world.id}`}
            style={{ "--world-colour": world.colour } as CSSProperties}
          >
            <div className="world-heading">
              <span className="world-index">0{index + 1}</span>
              <p>{world.category}</p>
              <span lang="ar" dir="rtl">
                {world.arabic}
              </span>
            </div>
            <div className="world-layout">
              <div className="world-copy">
                <p className="world-name">{world.name}</p>
                <h3>
                  {world.headline.split("\n").map((line, i) => (
                    <span key={line}>
                      {i === 1 ? <em>{line}</em> : line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p className="world-description">{world.description}</p>
                <div className="world-actions">
                  <a
                    className="pill-button world-enter"
                    href={world.url}
                    onClick={(e) => enter(e, world)}
                  >
                    Enter {world.name}
                    <ArrowUpRight size={17} />
                  </a>
                  <button
                    className="text-button"
                    onClick={(e) => open(e, world, "film")}
                  >
                    <Play size={13} fill="currentColor" /> Watch the film
                  </button>
                </div>
                <ol className="world-chapters">
                  {world.chapters.map((chapter, i) => (
                    <li key={chapter}>
                      <span>0{i + 1}</span>
                      {chapter}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="world-preview">
                <Suspense fallback={null}>
                  <WorldMotion world={world.id} paused={paused} />
                </Suspense>
                <button
                  className="product-window"
                  onPointerMove={attract}
                  onClick={(e) => open(e, world, "demo")}
                  aria-label={`Explore ${world.name} live preview`}
                >
                  <span className="window-bar">
                    <span className="window-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{world.url.replace("https://", "")}</span>
                    <ArrowUpRight size={12} />
                  </span>
                  <img
                    src={`/worlds/${world.id}.webp`}
                    alt={`${world.name} actual product interface`}
                    width="1440"
                    height="900"
                    loading="lazy"
                  />
                  <span className="local-cursor" aria-hidden="true">
                    Explore
                    <ArrowUpRight size={15} />
                  </span>
                  <span className="preview-cta">
                    Explore the real demo <MoveUpRight size={15} />
                  </span>
                </button>
                <span className="preview-caption">
                  Actual product capture. Click to interact.
                </span>
              </div>
            </div>
            <div className="world-footnote">
              <p>{world.context}</p>
              <p>{world.limit}</p>
            </div>
            {world.id === "enec" && (
              <details className="festival-context">
                <summary>
                  At NSTI Festival: the people and the programme <span>+</span>
                </summary>
                <p>
                  The festival welcomed Sarah bint Yousef Al Amiri, Minister of
                  Education; Dr Sultan Al Neyadi, Minister of State for Youth
                  Affairs; Eng Mohammed Al Qasim, Undersecretary of the Ministry
                  of Education; and Dr Mohamed Alkhemairi, Chief Business
                  Development Officer at ASPIRE and Acting Executive Director of
                  ATRC.
                </p>
                <p>
                  Our team presented HADHRA as an ENEC-track shortlisted
                  project. The names above describe festival attendance.
                </p>
                <a
                  href="https://www.wam.ae/en/article/c38h498-8th-national-science-technology-and-innovation"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the official festival report <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://moe.gov.ae/en/mediacenter/news/Pages/Under-the-patronage-of-HH-Sheikh-Hazza-bin-Zayed-Al-Nahyan-the-8th-NSTI-Festival-launches-with-the-participation-of-615-stu.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  Opening ceremony report <ArrowUpRight size={13} />
                </a>
              </details>
            )}
          </article>
        ))}
        <a className="more-work" href="/work">
          More of what I’m building <ArrowUpRight size={17} />
        </a>
      </section>

      <section id="proof" className="field-section">
        <div className="section-heading">
          <p className="eyebrow">02 / Beyond the screen</p>
          <h2>
            Built at a desk.
            <br />
            <em>Put in front of people.</em>
          </h2>
          <p>
            From a festival stand to the airfield operations brief, the
            interesting part is what happens when someone tries it.
          </p>
        </div>
        <div className="field-grid">
          <figure className="field-photo">
            <img
              src="/credibility/amir-falcons-stage-pitch-solo-1120.webp"
              alt="Amir presenting NOVA Labs on Falcons of Majlis"
              width="1120"
              height="746"
              loading="lazy"
            />
            <figcaption>
              <span>On stage, with NOVA Labs.</span>
              <span>Falcons of Majlis</span>
            </figcaption>
          </figure>
          <div className="field-notes">
            <p className="eyebrow">A few places the work has taken me</p>
            <a
              href="https://worldpolicesummit.com/side-events/forensic-science-forum/"
              target="_blank"
              rel="noreferrer"
            >
              <span>16–18 NOV 2026</span>
              <h3>
                Forensic Science Forum
                <ArrowUpRight size={18} />
              </h3>
              <p>
                Exhibiting Bayyina at World Police Summit, Dubai World Trade
                Centre.
              </p>
            </a>
            <a
              href="https://challengeon.atrc.ae/en/challenges/atp2026"
              target="_blank"
              rel="noreferrer"
            >
              <span>10–13 NOV 2026</span>
              <h3>
                NSTI Festival
                <ArrowUpRight size={18} />
              </h3>
              <p>HADHRA, shortlisted in the ENEC track. ADNEC Centre Al Ain.</p>
            </a>
            <a href="https://marsad.amirkazemkhani.com">
              <span>NOVEMBER 2026</span>
              <h3>
                Dubai Airports
                <ArrowUpRight size={18} />
              </h3>
              <p>Marsad, built with Team Visionary and presented to the CEO.</p>
            </a>
          </div>
        </div>
        <details className="episode-details">
          <summary>
            Watch my NOVA Labs pitch on Falcons of Majlis <Play size={15} />
          </summary>
          <FalconsEpisode />
        </details>
      </section>
      <WritingSection />
      <section id="contact" className="contact-section">
        <p className="eyebrow">04 / The next thing</p>
        <h2>
          Have a problem
          <br />
          worth <em>building for?</em>
        </h2>
        <a href="/work-with-me" className="pill-button dark">
          Let’s make something real <ArrowUpRight size={18} />
        </a>
        <p>
          AI systems, ambitious prototypes and products people can actually use.
        </p>
        <div className="contact-orbit" aria-hidden="true" />
      </section>

      <Dialog.Root
        open={!!experience}
        onOpenChange={(value) => {
          if (!value) setExperience(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="experience-backdrop" />
          <Dialog.Content
            className="experience-dialog"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              trigger.current?.focus();
            }}
          >
            <div className="experience-header">
              <div>
                <Dialog.Title>
                  {experience?.world.name}{" "}
                  <span>
                    /{" "}
                    {experience?.mode === "film"
                      ? "The film"
                      : "Interactive preview"}
                  </span>
                </Dialog.Title>
                <Dialog.Description>
                  {experience?.world.limit}
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="icon-button"
                aria-label="Close experience"
              >
                <X size={22} />
              </Dialog.Close>
            </div>
            {experience?.mode === "film" ? (
              <video
                key={experience.world.id}
                src={experience.world.film}
                controls
                playsInline
                autoPlay
                preload="metadata"
              />
            ) : experience ? (
              <iframe
                title={`${experience.world.name} interactive demo`}
                src={experience.world.preview}
                allow="fullscreen"
                referrerPolicy="no-referrer"
              />
            ) : null}
            <div className="experience-footer">
              <span>
                {experience?.mode === "demo"
                  ? "You are exploring the actual product."
                  : "Original project film."}
              </span>
              <a href={experience?.world.url} target="_blank" rel="noreferrer">
                Open the full experience <ArrowUpRight size={14} />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {portal && (
        <div
          className="portal-transition"
          role="status"
          aria-live="polite"
          style={
            {
              "--portal-x": `${portal.x}px`,
              "--portal-y": `${portal.y}px`,
              "--portal-colour": portal.world.colour,
            } as CSSProperties
          }
        >
          <div className="portal-fractures" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <div className="portal-tunnel">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <p>
            Entering {portal.world.name}
            <span>A different world awaits.</span>
          </p>
          <button className="portal-cancel" onClick={cancelPortal}>
            Stay here <X size={14} />
          </button>
        </div>
      )}
    </main>
  );
}
