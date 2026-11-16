import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type CSSProperties,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  X,
} from "lucide-react";
import { worlds, earlierWork, type World } from "../data/worlds";
import ProjectCredential from "../components/ProjectCredential";
import WorldChapter from "../components/WorldChapter";
import WritingSection from "../components/WritingSection";
import FalconsEpisode from "../components/FalconsEpisode";
import { usePageMeta, SITE_TITLE, SITE_DESCRIPTION } from "../lib/meta";
import "../portfolio.css";
const Universe = lazy(() => import("../components/Universe"));
export default function Home() {
  usePageMeta(SITE_TITLE, SITE_DESCRIPTION);
  const reduced = useReducedMotion();
  const [pause, setPause] = useState(false),
    [active, setActive] = useState(0),
    [film, setFilm] = useState<World | null>(null),
    [portal, setPortal] = useState<{
      world: World;
      x: number;
      y: number;
    } | null>(null);
  const trigger = useRef<HTMLElement | null>(null),
    timer = useRef<ReturnType<typeof setTimeout>>();
  const paused = !!reduced || pause;
  useEffect(() => {
    const reset = () => {
      setPortal(null);
      clearTimeout(timer.current);
    };
    window.addEventListener("pageshow", reset);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("pageshow", reset);
    };
  }, []);
  function cancel() {
    clearTimeout(timer.current);
    window.stop();
    setPortal(null);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!portal) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancel();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [portal]);
  function enter(e: MouseEvent<HTMLAnchorElement>, world: World) {
    if (
      !world.url.startsWith("https://") ||
      paused ||
      e.detail === 0 ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey
    )
      return;
    e.preventDefault();
    if (portal) return;
    trigger.current = e.currentTarget;
    setPortal({ world, x: e.clientX, y: e.clientY });
    timer.current = setTimeout(() => location.assign(world.url), 1400);
  }
  function showFilm(e: MouseEvent<HTMLButtonElement>, world: World) {
    trigger.current = e.currentTarget;
    setFilm(world);
  }
  const selected = worlds[active];
  return (
    <main id="main" className={`portfolio ${paused ? "motion-paused" : ""}`}>
      <section
        className="universe-hero"
        id="hero"
        style={
          {
            "--active-colour": selected.colour,
            "--active-bg": selected.background,
          } as CSSProperties
        }
      >
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-identity mono">
          <span className="status-dot" /> AMIR HOSSEIN KAZEMKHANI{" "}
          <span>Dubai, UAE</span>
        </div>
        <div className="hero-title">
          <p className="mono">AI founder & technology leader</p>
          <h1>
            AI founder.
            <br />
            <em>Hands-on CTO.</em>
          </h1>
          <p>
            I lead the technology behind ventures in voice AI, aviation,
            forensic research and health. From funding and incubation to
            products in people’s hands.
          </p>
          <div className="hero-evidence">
            <a href="/work/#earlier">
              <strong>AED 2M</strong>
              <span>Raised at Kenchi</span>
              <small>Co-founder</small>
            </a>
            <a href="#samt">
              <strong>AED 25K</strong>
              <span>Programme grant</span>
              <small>Samt Health</small>
            </a>
            <a href="/articles/dubai-police-hackathon">
              <strong>1st place</strong>
              <span>Dubai Police HQ</span>
              <small>Hackathon</small>
            </a>
          </div>
          <a href="#work" className="hero-scroll">
            Scroll into the work <ArrowDown size={16} />
          </a>
        </div>
        <div className="universe-view">
          <img
            className="universe-fallback"
            src={selected.image || `/worlds/${selected.id}.webp`}
            alt=""
          />
          <Suspense fallback={null}>
            <Universe active={active} paused={paused} onSelect={setActive} />
          </Suspense>
        </div>
        <div className="active-world">
          <div>
            <ProjectCredential world={selected} />
            <span className="mono selected-index">
              {String(active + 1).padStart(2, "0")} / SELECTED WORLD
            </span>
            <a className="selected-project" href={`#${selected.id}`}>
              {selected.name}
              <ArrowDown size={18} />
            </a>
            <p className="selected-role">{selected.role}</p>
          </div>
          <div className="gallery-controls">
            <button
              aria-label="Previous project"
              onClick={() =>
                setActive((active - 1 + worlds.length) % worlds.length)
              }
            >
              <ArrowLeft size={17} />
            </button>
            <button
              aria-label="Next project"
              onClick={() => setActive((active + 1) % worlds.length)}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <div className="universe-instruction mono">
          Drag the gallery. Choose a world. Go inside.
        </div>
        <div className="world-dock" aria-label="Choose a project">
          {worlds.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="dock-dot" style={{ background: w.colour }} />
              {w.name}
              <span className="dock-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <div className="hero-meta mono">
          <span>Eight product worlds. More in the archive.</span>
          <button
            onClick={() => setPause(!pause)}
            disabled={!!reduced}
            aria-pressed={paused}
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
      <section
        className="credential-strip"
        aria-label="Exhibitions, programmes and presentations"
      >
        {[worlds[0], worlds[1], worlds[2], worlds[5], worlds[3]].map((w) => (
          <ProjectCredential key={w.id} world={w} />
        ))}
      </section>
      <section
        id="work"
        className="world-journey"
        aria-label="Explore the product worlds"
      >
        <div className="journey-opening">
          <span className="mono">ENTER THE WORK / 01–08</span>
          <h2>
            The ventures. The evidence.
            <br />
            <em>Step inside the work.</em>
          </h2>
          <p>
            Each project has its own world. Watch it move, take control of a
            real demo, or follow it through to the full product.
          </p>
          <div className="journey-line" aria-hidden="true" />
        </div>
        {worlds.map((world) => (
          <WorldChapter
            key={world.id}
            world={world}
            paused={paused}
            onEnter={enter}
            onFilm={showFilm}
          />
        ))}
      </section>
      <section id="archive" className="archive-section">
        <div className="archive-heading">
          <p className="mono">THE REST OF THE STORY</p>
          <h2>
            More questions.
            <br />
            <em>More things built.</em>
          </h2>
          <p>
            Construction, healthcare, government, mobility and developer tools.
            The rest of the work belongs here too.
          </p>
        </div>
        <div className="archive-list">
          {earlierWork.map((p, i) => (
            <a href={p.href} key={p.name}>
              <span className="mono">{String(i + 9).padStart(2, "0")}</span>
              <div>
                <span className="archive-category">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
              <ArrowUpRight size={25} />
            </a>
          ))}
        </div>
      </section>
      <section id="proof" className="proof-section">
        <div className="proof-heading">
          <p className="mono">BEYOND THE SCREEN</p>
          <h2>
            Built. Shown.
            <br />
            <em>Put to the test.</em>
          </h2>
        </div>
        <div className="proof-images">
          <figure>
            <img
              src="/credibility/amir-falcons-stage-shetty-group-1120.webp"
              alt="Amir on Falcons of Majlis with the investor panel"
              width="1120"
              height="829"
              loading="lazy"
            />
            <figcaption>Falcons of Majlis / India Today × Aaj Tak</figcaption>
          </figure>
          <figure>
            <img
              src="/credibility/amir-jensen-huang-nvidia-640.webp"
              alt="Amir in conversation with Jensen Huang"
              width="640"
              height="1124"
              loading="lazy"
            />
            <figcaption>In conversation with Jensen Huang / NVIDIA</figcaption>
          </figure>
        </div>
        <div className="event-record">
          <article>
            <p className="mono">16–18 NOVEMBER 2026 / DUBAI</p>
            <h3>
              Forensic Science Forum.
              <br />
              World Police Summit.
            </h3>
            <p>
              Exhibiting Bayyina at Dubai World Trade Centre and presenting the
              research prototype to officials at the booth.
            </p>
            <a
              href="https://worldpolicesummit.com/side-events/forensic-science-forum/"
              target="_blank"
              rel="noreferrer"
            >
              The forum <ArrowUpRight size={14} />
            </a>
          </article>
          <article>
            <p className="mono">10–13 NOVEMBER 2026 / AL AIN</p>
            <h3>
              ATRC shortlisted.
              <br />
              NSTI Festival.
            </h3>
            <p>
              Presented HADHRA through Advanced Technology Pioneers at ADNEC
              Centre Al Ain. Festival attendees included Sarah bint Yousef Al
              Amiri, Dr Sultan Al Neyadi, Eng Mohammed Al Qasim and Dr Mohamed
              Alkhemairi.
            </p>
            <p className="event-note">
              These names describe festival attendance, not individual
              endorsement.
            </p>
            <a
              href="https://www.wam.ae/en/article/c38h498-8th-national-science-technology-and-innovation"
              target="_blank"
              rel="noreferrer"
            >
              Festival report <ArrowUpRight size={14} />
            </a>
          </article>
        </div>
        <details className="episode-details">
          <summary>
            Watch my NOVA Labs pitch on Falcons of Majlis <Play size={16} />
          </summary>
          <FalconsEpisode />
        </details>
      </section>
      <WritingSection />
      <section id="contact" className="contact-section">
        <div className="contact-mesh" aria-hidden="true" />
        <p className="mono">THE NEXT WORLD STARTS WITH A CONVERSATION.</p>
        <h2>
          What should
          <br />
          we <em>build next?</em>
        </h2>
        <a href="/work-with-me" className="enter-button">
          Let’s make it happen
          <ArrowUpRight size={20} />
        </a>
        <a className="email-link" href="mailto:amir@amirkazemkhani.com">
          amir@amirkazemkhani.com
        </a>
      </section>
      <Dialog.Root
        open={!!film}
        onOpenChange={(v) => {
          if (!v) setFilm(null);
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
                <Dialog.Title>{film?.name} / The film</Dialog.Title>
                <Dialog.Description>{film?.limit}</Dialog.Description>
              </div>
              <Dialog.Close className="icon-button" aria-label="Close film">
                <X size={22} />
              </Dialog.Close>
            </div>
            {film && (
              <video
                src={film.film}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            )}
            <a
              className="film-external"
              href={film?.url}
              target="_blank"
              rel="noreferrer"
            >
              Open the full project
              <ArrowUpRight size={16} />
            </a>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {portal && (
        <div
          className="portal-transition"
          style={
            {
              "--jump-colour": portal.world.colour,
              "--jump-bg": portal.world.background,
              "--origin-x": `${portal.x}px`,
              "--origin-y": `${portal.y}px`,
            } as CSSProperties
          }
        >
          <div className="event-horizon">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <div className="fractured-world" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => {
              const x = (i % 4) * 25,
                y = Math.floor(i / 4) * 34;
              return (
                <div
                  key={i}
                  style={
                    {
                      backgroundImage: `url(${portal.world.image || `/worlds/${portal.world.id}.webp`})`,
                      clipPath: `polygon(${x}% ${y}%,${x + 25}% ${y + 3}%,${x + 27}% ${y + 34}%,${x - 2}% ${y + 32}%)`,
                      "--i": i,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
          <div className="arrival-copy" role="status">
            <span className="mono">YOU’RE ENTERING</span>
            <p>{portal.world.name}</p>
            <span>Continue your journey inside the product.</span>
          </div>
          <button className="portal-cancel" onClick={cancel}>
            Stay here
            <X size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
