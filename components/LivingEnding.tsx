"use client";

// Reserved for a future version's "still image, subtly living" experiment.
// Not wired into the v0.6 demo flow (see LivingVideo) — kept working and
// unimported so it doesn't conflict with the current production path.
import { useEffect, useRef, useState } from "react";
import LivingStill from "@/components/LivingStill";
import { useLivingPortrait } from "@/hooks/useLivingPortrait";
import type { LivingEffectConfig } from "@/config/worlds";

const MINIMUM_STILL_DURATION_MS = 4500;
const TRANSITION_DURATION_MS = 300;

// Local playback phase — driven by timers and the <video> element only.
// Whether we're still waiting on Veo, and whether it failed, are derived
// directly from the `living` hook's state at render time (see below)
// rather than synced into this state, to avoid redundant re-renders.
type PlaybackPhase = "waiting" | "transitioning" | "playing" | "ended";

interface LivingEndingProps {
  imageUrl: string;
  worldId: string;
  livingEffect?: LivingEffectConfig;
  lifeId: string;
  onImageLoad?: () => void;
}

export default function LivingEnding({
  imageUrl,
  worldId,
  livingEffect,
  lifeId,
  onImageLoad,
}: LivingEndingProps) {
  const living = useLivingPortrait();
  const [phase, setPhase] = useState<PlaybackPhase>("waiting");
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const hasStartedRef = useRef(false);
  const stillShownAtRef = useRef(0);
  const waitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start Veo exactly once per lifeId, automatically — no visitor-facing button.
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    stillShownAtRef.current = Date.now();
    living.start(imageUrl, worldId, lifeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasVideo = Boolean(living.videoUrl);
  const failed = living.state === "error";

  // Once the video URL exists and has preloaded enough to play smoothly,
  // wait out whatever remains of the minimum still duration, then crossfade.
  useEffect(() => {
    if (phase !== "waiting" || !hasVideo || !isVideoPreloaded) return;

    const elapsed = Date.now() - stillShownAtRef.current;
    const remaining = Math.max(0, MINIMUM_STILL_DURATION_MS - elapsed);

    waitTimerRef.current = setTimeout(() => {
      setPhase("transitioning");
      const video = videoRef.current;
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
      setTimeout(() => setPhase("playing"), TRANSITION_DURATION_MS);
    }, remaining);

    return () => {
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, [phase, hasVideo, isVideoPreloaded]);

  const showVideo = phase === "transitioning" || phase === "playing" || phase === "ended";
  const showAwakeningText = phase === "waiting" && !failed;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <LivingStill imageUrl={imageUrl} effect={livingEffect} activationDelay={2500} onLoad={onImageLoad} />

      {living.videoUrl && (
        <video
          ref={videoRef}
          src={living.videoUrl}
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setIsVideoPreloaded(true)}
          onEnded={() => setPhase("ended")}
          className={`pointer-events-none absolute inset-0 m-auto max-h-[85vh] max-w-full object-contain transition-opacity duration-300 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {showAwakeningText && (
        <p className="absolute bottom-28 animate-pulse text-xs font-light tracking-[0.2em] text-white/50">
          THIS LIFE IS AWAKENING...
        </p>
      )}
    </div>
  );
}
