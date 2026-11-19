import {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { ArrowUpRight, Play, X, Expand } from "lucide-react";
import ProjectCredential from "./ProjectCredential";
import ProductLogo from "./ProductLogo";
import WordReveal from "./WordReveal";
import type { World } from "../data/worlds";
const WorldMotion = lazy(() => import("./WorldMotion"));
export default function WorldChapter({
  world,
  paused,
  onEnter,
  onFilm,
}: {
  world: World;
  paused: boolean;
  onEnter: (e: MouseEvent<HTMLAnchorElement>, w: World) => void;
  onFilm: (e: MouseEvent<HTMLButtonElement>, w: World) => void;
}) {
  const section = useRef<HTMLElement>(null),
    video = useRef<HTMLVideoElement>(null),
    control = useRef<HTMLButtonElement>(null),
    exitControl = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(false),
    [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (!entry.isIntersecting) {
          video.current?.pause();
          setInteractive(false);
        } else if (!paused) video.current?.play().catch(() => {});
      },
      { rootMargin: "150px" },
    );
    io.observe(el);
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, -r.top / Math.max(1, el.offsetHeight - innerHeight)),
        );
        el.style.setProperty("--travel", String(paused ? 0.65 : progress));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [paused]);
  useEffect(() => {
    if (paused) video.current?.pause();
    else if (near) video.current?.play().catch(() => {});
  }, [paused, near]);
  useEffect(() => {
    if (!interactive) return;
    function close(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setInteractive(false);
        requestAnimationFrame(() => control.current?.focus());
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [interactive]);
  return (
    <article
      id={world.id}
      ref={section}
      className={`world-chapter chapter-${world.id} ${interactive ? "is-interactive" : ""}`}
      style={
        {
          "--world-colour": world.colour,
          "--world-bg": world.background || "#e8f2ed",
        } as CSSProperties
      }
    >
      <div className="chapter-stage">
        <div className="chapter-grid" aria-hidden="true" />
        <div className="chapter-heading">
          <ProjectCredential world={world} />
          <div className="chapter-record">
            {world.proof.map((p) => (
              <div key={p.label}>
                <strong>{p.value}</strong>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
        {["marsad", "nova", "samt"].includes(world.id) && (
          <div
            className={`chapter-brand-sculpture sculpture-${world.id}`}
            aria-hidden="true"
          >
            <div className="brand-relief">
              {[0, 1, 2, 3, 4].map((layer) => (
                <div
                  key={layer}
                  className="brand-layer"
                  style={{ "--layer": layer } as CSSProperties}
                >
                  <ProductLogo id={world.id} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="chapter-copy">
          <div className="chapter-name" role="img" aria-label={world.name}>
            <ProductLogo id={world.id} />
          </div>
          <p className="project-role">{world.role}</p>
          <h2>
            {world.headline.split("\n").map((line, i) => (
              <span key={line}>
                {i === 1 ? (
                  <em>
                    <WordReveal
                      text={line}
                      variant="sculpted"
                      paused={paused}
                    />
                  </em>
                ) : (
                  <WordReveal text={line} variant="sculpted" paused={paused} />
                )}
                <br />
              </span>
            ))}
          </h2>
          <p className="chapter-description">{world.description}</p>
          <div className="chapter-actions">
            <a
              href={world.url}
              className="enter-button"
              onClick={(e) => onEnter(e, world)}
            >
              {world.entryLabel || `Enter ${world.name}`}
              <ArrowUpRight size={18} />
            </a>
            {world.film && (
              <button onClick={(e) => onFilm(e, world)}>
                <Play size={14} fill="currentColor" />
                Watch the film
              </button>
            )}
          </div>
          <div className="chapter-tags">
            {world.chapters.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="chapter-visual">
          {near && (
            <Suspense fallback={null}>
              <WorldMotion world={world.id} paused={paused} />
            </Suspense>
          )}
          {world.id === "morning" ? (
            <div className="phone-world">
              {[0, 1, 2].map((i) => (
                <img
                  key={i}
                  src={`/worlds/morning-${i}.jpg`}
                  alt={`The Morning Club App Store screenshot ${i + 1}`}
                  width="320"
                  height="480"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <div
              className="scene-plane"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--pointer-x",
                  `${e.clientX - r.left}px`,
                );
                e.currentTarget.style.setProperty(
                  "--pointer-y",
                  `${e.clientY - r.top}px`,
                );
              }}
            >
              {interactive ? (
                <>
                  <div className="demo-toolbar">
                    <button
                      ref={exitControl}
                      onClick={() => {
                        setInteractive(false);
                        requestAnimationFrame(() => control.current?.focus());
                      }}
                    >
                      <X size={15} />
                      Back to the portfolio
                    </button>
                    <a href={world.preview} target="_blank" rel="noreferrer">
                      Open full screen
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <iframe
                    title={`${world.name} interactive product`}
                    src={world.preview}
                    allow="fullscreen"
                  />
                  <button
                    className="demo-exit-after"
                    onClick={() => {
                      setInteractive(false);
                      requestAnimationFrame(() => control.current?.focus());
                    }}
                  >
                    Leave {world.name} and return to the portfolio
                  </button>
                </>
              ) : world.scene && near ? (
                <video
                  ref={video}
                  src={world.scene}
                  poster={world.image || `/worlds/${world.id}.webp`}
                  muted
                  loop
                  playsInline
                  autoPlay={!paused}
                  preload="none"
                />
              ) : (
                <img
                  src={world.image || `/worlds/${world.id}.webp`}
                  alt={
                    world.imageAlt ||
                    (world.id === "gold"
                      ? "Decorative gold sculpture, private product walkthrough available"
                      : `${world.name} actual product`)
                  }
                  width="1440"
                  height="900"
                  loading="lazy"
                />
              )}
              {!interactive && (
                <a
                  className="scene-entry"
                  href={world.url}
                  onClick={(e) => onEnter(e, world)}
                  aria-label={world.entryLabel || `Enter ${world.name}`}
                >
                  <span className="scene-pointer" aria-hidden="true">
                    {world.id === "cyberlife"
                      ? "Read"
                      : world.id === "gold" ? "Explore" : "Enter"}
                    <ArrowUpRight size={22} />
                  </span>
                </a>
              )}
              {world.embeddable && !interactive && (
                <button
                  ref={control}
                  className="take-control"
                  onClick={() => {
                    setInteractive(true);
                    requestAnimationFrame(() => {
                      window.scrollTo({
                        top: section.current?.offsetTop ?? 0,
                        behavior: "instant",
                      });
                      exitControl.current?.focus({ preventScroll: true });
                    });
                  }}
                >
                  <Expand size={16} />
                  Take control of the real demo
                  <span>Interactive. Right here.</span>
                </button>
              )}
            </div>
          )}
          <p className="scene-caption">
            {world.id === "cyberlife"
              ? "Exhibition card / read the project story"
              : world.id === "gold"
                ? "Illustration / private build"
                : world.id === "morning"
                  ? "Actual App Store screenshots"
                  : world.scene
                    ? "Actual product footage / click to explore"
                    : "Actual product interface"}
          </p>
        </div>
        <div className="chapter-bottom">
          <p>{world.context}</p>
          <details>
            <summary>
              Project status & limits <span>+</span>
            </summary>
            <p>{world.limit}</p>
          </details>
        </div>
      </div>
    </article>
  );
}
