"use client";

import { useEffect, useRef, useState } from "react";
import { useLivingPortrait } from "@/hooks/useLivingPortrait";

const TRANSITION_DURATION_MS = 300;

// Local playback phase — driven by the <video> element only. Whether we're
// still waiting on Veo, and whether it failed, are derived directly from the
// `living` hook's state at render time (see below) rather than synced into
// this state.
type PlaybackPhase = "waiting" | "revealing" | "playing" | "ended";

interface LivingVideoProps {
  imageUrl: string;
  worldId: string;
  lifeId: string;
  onImageLoad?: () => void;
}

// The v0.6 demo ending: no "barely moving" still-photo illusion (see
// LivingStill/LivingEnding for that, reserved for a future version) — this
// shows the OpenAI still while the full 8-second Veo clip generates, then
// autoplays it once, with no visitor-facing button anywhere in the flow.
export default function LivingVideo({ imageUrl, worldId, lifeId, onImageLoad }: LivingVideoProps) {
  const living = useLivingPortrait();
  const [phase, setPhase] = useState<PlaybackPhase>("waiting");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const hasStartedRef = useRef(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start Veo exactly once per lifeId, automatically — no visitor-facing button.
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    living.start(imageUrl, worldId, lifeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    onImageLoad?.();
  };

  useEffect(() => {
    // Cached images can finish loading before React attaches the onLoad
    // listener, in which case the load event never fires — check manually.
    if (imgRef.current?.complete) handleImageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasVideo = Boolean(living.videoUrl);
  const failed = living.state === "error";

  // Once the video has preloaded enough to play smoothly, crossfade
  // immediately — there is no minimum still-display duration in this flow.
  useEffect(() => {
    if (phase !== "waiting" || !hasVideo || !isVideoPreloaded) return;

    const revealTimer = setTimeout(() => {
      setPhase("revealing");
      const video = videoRef.current;
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
      setTimeout(() => setPhase("playing"), TRANSITION_DURATION_MS);
    }, 0);

    return () => clearTimeout(revealTimer);
  }, [phase, hasVideo, isVideoPreloaded]);

  const showVideo = phase === "revealing" || phase === "playing" || phase === "ended";
  const showWaitingText = phase === "waiting" && !failed;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Cinematic portrait"
        onLoad={handleImageLoad}
        className={`max-h-[85vh] max-w-full object-contain transition-opacity duration-300 ${
          isImageLoaded && !showVideo ? "opacity-100" : "opacity-0"
        }`}
      />

      {living.videoUrl && (
        <video
          ref={videoRef}
          src={living.videoUrl}
          autoPlay
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

      {showWaitingText && (
        <p className="absolute bottom-28 animate-pulse text-xs font-light tracking-[0.2em] text-white/50">
          THIS LIFE IS BECOMING REAL...
        </p>
      )}
    </div>
  );
}
