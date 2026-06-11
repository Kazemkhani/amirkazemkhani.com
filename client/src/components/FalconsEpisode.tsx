import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * FalconsEpisode — cinematic lazy embed of the Falcons of Majlis episode.
 *
 * Performance + UX contract (ported from the novalabs.ae billboard):
 *   - No YouTube bytes on load: a lightweight i.ytimg.com poster facade only.
 *   - At ~45% scroll-into-view, the youtube-nocookie iframe is injected with
 *     MUTED autoplay at start=3540 (59:00 — Amir's segment). Browser autoplay
 *     policy requires mute; a gold "Tap to unmute" chip un-mutes via the
 *     YT postMessage API (enablejsapi=1).
 *   - Explicit play-button click = user gesture, so it injects WITH sound.
 *   - Video pauses when scrolled out of view and resumes when back in view.
 *   - prefers-reduced-motion / Save-Data users keep the facade (click-to-play
 *     with sound still works); nothing autoplays for them.
 */

const VIDEO_ID = "t8sjQKTm5m4";
const START_SECONDS = 3540; // 59:00 — Amir's segment

const buildSrc = (muted: boolean) =>
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?start=${START_SECONDS}` +
  `&autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1` +
  (muted ? "&mute=1" : "");

const FalconsEpisode = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const startedRef = useRef(false);

  // "idle" = facade only; "muted" = injected by scroll; "sound" = injected by click
  const [mode, setMode] = useState<"idle" | "muted" | "sound">("idle");
  const [showUnmute, setShowUnmute] = useState(false);

  const ytCommand = (func: "playVideo" | "pauseVideo" | "unMute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: "" }),
      "*",
    );
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !("IntersectionObserver" in window)) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduced || saveData) return; // facade stays; explicit play still works

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            // Muted autoplay only — browser policy.
            startedRef.current = true;
            setMode("muted");
            setShowUnmute(true);
          } else if (iframeRef.current) {
            ytCommand(e.isIntersecting ? "playVideo" : "pauseVideo");
          }
        });
      },
      { threshold: 0.45 },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  const handlePlayClick = () => {
    // Explicit user gesture: start WITH sound.
    startedRef.current = true;
    setMode("sound");
    setShowUnmute(false);
  };

  const handleUnmute = () => {
    ytCommand("unMute");
    setShowUnmute(false);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="mb-10 md:mb-14"
      data-track="falcons_episode_embed"
      data-testid="falcons-episode"
    >
      <div className="card-editorial rounded-2xl overflow-hidden">
        <div
          ref={frameRef}
          className="relative aspect-video bg-secondary"
          data-testid="falcons-episode-frame"
        >
          {/* Poster facade — zero YouTube bytes until needed */}
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt="Falcons of Majlis episode — Amir Hossein Kazemkhani pitching NOVA Labs"
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover saturate-[0.92] transition-opacity duration-500 ${
              mode === "idle" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
          {/* Cinematic vignette over the poster */}
          {mode === "idle" && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20"
            />
          )}

          {mode !== "idle" && (
            <iframe
              ref={iframeRef}
              src={buildSrc(mode === "muted")}
              title="Falcons of Majlis — Amir's segment (starts at 59:00)"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              className="absolute inset-0 w-full h-full border-0"
              data-testid="falcons-episode-iframe"
            />
          )}

          {mode === "idle" && (
            <button
              type="button"
              onClick={handlePlayClick}
              aria-label="Play the Falcons of Majlis episode — Amir's segment starts at 59 minutes"
              data-testid="falcons-play"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-gold-500/40 bg-background/75 backdrop-blur-md text-foreground text-sm md:text-base font-medium transition-all duration-300 hover:scale-[1.04] hover:border-gold-500/80 hover:bg-background/90 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-background text-[11px] pl-0.5"
              >
                ▶
              </span>
              <span>
                Watch the segment{" "}
                <span className="font-mono text-gold-500">· 59:00</span>
              </span>
            </button>
          )}

          {showUnmute && (
            <button
              type="button"
              onClick={handleUnmute}
              data-testid="falcons-unmute"
              className="absolute right-3 bottom-3 md:right-4 md:bottom-4 px-4 py-2 rounded-full border border-gold-500/50 bg-background/80 backdrop-blur-md text-foreground text-xs md:text-sm cursor-pointer transition-colors duration-300 hover:border-gold-500 hover:bg-background/95"
            >
              <span aria-hidden="true">🔊</span> Tap to unmute
            </button>
          )}
        </div>

        <figcaption className="px-5 md:px-8 py-5 md:py-6">
          <p className="font-display text-lg md:text-xl font-semibold text-foreground">
            The episode, in full
          </p>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-500 mt-2">
            Falcons of Majlis — India Today × Aaj Tak · segment from 59:00
          </p>
        </figcaption>
      </div>
    </motion.figure>
  );
};

export default FalconsEpisode;
