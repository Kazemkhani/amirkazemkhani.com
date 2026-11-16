import { useEffect, useRef } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Player, type PlayerRef } from "@remotion/player";
import type { WorldId } from "../data/worlds";

function WorldSequence({ world }: { world: WorldId }) {
  const f = useCurrentFrame();
  const colour =
    world === "bayyina"
      ? "#4c927b"
      : world === "marsad"
        ? "#6287d5"
        : "#df8168";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {Array.from({ length: 7 }, (_, i) => {
        const phase = ((f + i * 26) % 180) / 180;
        const scale = interpolate(phase, [0, 1], [0.22, 1.7]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              left: "50%",
              top: "50%",
              border: `${1 + (i % 2)}px solid ${colour}`,
              borderRadius: world === "bayyina" ? "28%" : "50%",
              opacity: Math.sin(phase * Math.PI) * 0.35,
              transform: `translate(-50%,-50%) rotate(${i * 14 + f * 0.14}deg) scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function WorldMotion({
  world,
  paused,
}: {
  world: WorldId;
  paused: boolean;
}) {
  const ref = useRef<PlayerRef>(null),
    host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !paused) ref.current?.play();
      else ref.current?.pause();
    });
    if (host.current) observer.observe(host.current);
    if (paused) ref.current?.pause();
    return () => observer.disconnect();
  }, [paused]);
  return (
    <div ref={host} className="world-motion" aria-hidden="true">
      <Player
        ref={ref}
        component={WorldSequence}
        inputProps={{ world }}
        durationInFrames={180}
        fps={30}
        compositionWidth={900}
        compositionHeight={550}
        loop
        controls={false}
        style={{ width: "100%", height: "100%" }}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
