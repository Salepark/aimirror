"use client";

import { useEffect, useState } from "react";
import type { WorldPreset } from "@/config/worlds";

interface WorldRevealProps {
  world: WorldPreset;
  onComplete: () => void;
}

type Phase = "searching" | "found" | "reveal";

const PHASE_DURATIONS_MS: Record<Phase, number> = {
  searching: 1000,
  found: 700,
  reveal: 1200,
};

const NEXT_PHASE: Record<Phase, Phase | null> = {
  searching: "found",
  found: "reveal",
  reveal: null,
};

export default function WorldReveal({ world, onComplete }: WorldRevealProps) {
  const [phase, setPhase] = useState<Phase>("searching");

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = NEXT_PHASE[phase];
      if (next) {
        setPhase(next);
      } else {
        onComplete();
      }
    }, PHASE_DURATIONS_MS[phase]);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black px-6 text-center">
      {phase === "searching" && (
        <p className="text-sm font-light tracking-[0.3em] text-white/70">
          SEARCHING POSSIBLE LIVES
        </p>
      )}
      {phase === "found" && (
        <p className="text-sm font-light tracking-[0.3em] text-white/70">WORLD FOUND</p>
      )}
      {phase === "reveal" && (
        <>
          <p className="text-3xl font-light tracking-[0.3em] text-white">{world.title}</p>
          {(world.location || world.year) && (
            <p className="text-sm font-light tracking-[0.2em] text-white/60">
              {[world.location, world.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
