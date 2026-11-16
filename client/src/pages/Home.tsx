import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type CSSProperties,
  Fragment,
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
import ProductLogo from "../components/ProductLogo";
import WordReveal from "../components/WordReveal";
import { additionalCredentials, formatAED } from "../data/recognition";
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
        <div className="hero-title">
          <p className="mono">Dubai, UAE</p>
          <h1>
            <WordReveal text="AI founder." variant="sculpted" paused={paused} />
            <br />
            <em>
              <WordReveal
                text="Hands-on CTO."
                variant="sculpted"
                paused={paused}
                delay={0.12}
              />
            </em>
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
            <a href="#recognition" className="hero-award hero-award-ifza">
              <img src="/credentials/ifza.png" alt="IFZA" />
              <strong>1st place</strong>
              <span>Scale360 Hackathon</span>
              <small>Internship awarded</small>
            </a>
            <a href="#recognition" className="hero-award hero-award-mission">
              <img
                src="/credentials/us-mission.png"
                alt="U.S. Mission to the UAE, hackathon partner"
              />
              <strong>US$12,800</strong>
              <span>RUYA AI Hackathon</span>
              <small>Prize package · U.S. Mission partner event</small>
            </a>
          </div>
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
            <a
              className="selected-project"
              href={`#${selected.id}`}
              aria-label={`Explore ${selected.name}`}
            >
              <ProductLogo id={selected.id} />
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
        <div className="universe-instruction mono">Drag to explore</div>
        <div className="world-dock" aria-label="Choose a project">
          {worlds.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={w.name}
              title={w.name}
            >
              <ProductLogo id={w.id} />
            </button>
          ))}
        </div>
        <div className="hero-meta mono">
          <a href="#archive">
            View all projects <ArrowDown size={12} />
          </a>
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
        {additionalCredentials.map((item) => (
          <ProjectCredential key={item.id} world={item} />
        ))}
      </section>
      <section
        id="recognition"
        className="recognition-section"
        aria-label="Awards and programmes"
      >
        <div className="recognition-heading">
          <h2>
            <WordReveal
              text="Awards & recognition"
              variant="sculpted"
              paused={paused}
            />
          </h2>
        </div>
        <div className="award-grid">
          <article className="award-card award-ifza">
            <img
              className="award-logo"
              src="/credentials/ifza.png"
              alt="IFZA"
              loading="lazy"
            />
            <h3>
              <WordReveal text="1st place" variant="sculpted" paused={paused} />
            </h3>
            <p className="award-title">IFZA Scale360 Hackathon</p>
            <p>
              Awarded an internship at IFZA, Dubai’s free-zone business
              community.
            </p>
            <a href="https://ifza.com/en/" target="_blank" rel="noreferrer">
              About IFZA <ArrowUpRight size={16} />
            </a>
          </article>
          <article className="award-card award-ruya">
            <img
              className="award-logo mission-logo"
              src="/credentials/us-mission.png"
              alt="U.S. Mission to the UAE event partner"
              loading="lazy"
            />
            <h3>
              <WordReveal text="US$12,800" variant="sculpted" paused={paused} />
            </h3>
            <p className="award-title">RUYA AI Hackathon</p>
            <p>
              Prize package: US$10,000 cash, US$1,000 AWS credits and US$1,800
              ElevenLabs subscriptions.
            </p>
            <p className="award-detail">
              Built in five hours. Organised in partnership with the U.S.
              Mission to the UAE and American University in Dubai.
            </p>
            <a
              href="https://luma.com/li841jkv"
              target="_blank"
              rel="noreferrer"
            >
              The event & prizes <ArrowUpRight size={16} />
            </a>
          </article>
          <article className="award-card award-airports">
            <img
              className="award-logo"
              src="/credentials/dubai-airports.svg"
              alt="Dubai Airports"
              loading="lazy"
            />
            <h3>
              <WordReveal
                text={formatAED(30000)}
                variant="sculpted"
                paused={paused}
              />
            </h3>
            <p className="award-title">Dubai Airports hackathon</p>
            <p>
              Marsad won a prize and was presented to the CEO of Dubai Airports.
            </p>
            <a href="#marsad">
              Explore Marsad <ArrowDown size={16} />
            </a>
          </article>
          <article id="cyberlife" className="award-card award-cyberlife">
            <img
              className="award-logo"
              src="/credentials/mediclinic.svg"
              alt="Mediclinic"
              loading="lazy"
            />
            <h3>
              <WordReveal text="CyberLife" variant="sculpted" paused={paused} />
            </h3>
            <p className="award-title">1st place · FutureHack by in5</p>
            <p>
              Mediclinic’s Digital Innovation Director offered a
              proof-of-concept contract.
            </p>
            <p className="award-detail">
              UEP award, University of Birmingham Dubai. Part of the Mohammed
              Bin Rashid Innovation Fund incubator programme.
            </p>
            <a href="/articles/futurehack-cyberlife">
              Read about CyberLife <ArrowUpRight size={16} />
            </a>
          </article>
        </div>
        <p className="currency-note">
          Awards and funding are shown in their original currency. The RUYA
          prize package includes cash, credits and subscriptions.
        </p>
      </section>
      <section
        id="work"
        className="world-journey"
        aria-label="Explore the product worlds"
      >
        <div className="journey-opening">
          <h2>
            <WordReveal
              text="Explore the projects."
              variant="sculpted"
              paused={paused}
            />
          </h2>
          <div className="project-formats">
            <span>
              <WordReveal
                text="Watch the films."
                variant="sculpted"
                paused={paused}
              />
            </span>
            <span>
              <WordReveal
                text="Try the products."
                variant="sculpted"
                paused={paused}
              />
            </span>
          </div>
        </div>
        {worlds.map((world) => (
          <Fragment key={world.id}>
            <WorldChapter
              world={world}
              paused={paused}
              onEnter={enter}
              onFilm={showFilm}
            />
            {world.id === "nova" && (
              <section
                className="nova-broadcast"
                aria-label="NOVA Labs on Falcons of Majlis"
              >
                <div className="broadcast-heading">
                  <ProductLogo id="nova" />
                  <h2>
                    <WordReveal
                      text="The NOVA pitch."
                      variant="sculpted"
                      paused={paused}
                    />
                  </h2>
                  <p>Falcons of Majlis</p>
                  <span className="broadcast-network">
                    India Today × Aaj Tak
                  </span>
                  <a
                    href="https://www.youtube.com/watch?v=t8sjQKTm5m4&t=3562s"
                    target="_blank"
                    rel="noreferrer"
                  >
                    My pitch starts at <strong>59:22</strong>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <FalconsEpisode paused={paused} />
              </section>
            )}
          </Fragment>
        ))}
      </section>
      <section id="archive" className="archive-section">
        <div className="archive-heading">
          <h2>
            <WordReveal
              text="More projects"
              variant="sculpted"
              paused={paused}
            />
          </h2>
          <p>
            Construction, healthcare, government, mobility and developer tools.
          </p>
        </div>
        <div className="archive-list">
          {earlierWork.map((p) => (
            <a href={p.href} key={p.name}>
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
          <h2>
            <WordReveal
              text="Talks & appearances"
              variant="sculpted"
              paused={paused}
            />
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
      </section>
      <WritingSection />
      <section id="contact" className="contact-section">
        <div className="contact-mesh" aria-hidden="true" />
        <p className="mono">Get in touch</p>
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
