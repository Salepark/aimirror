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
  const [isSaving, setIsSaving] = useState(false);
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

  // `canplaythrough` is unreliable on some mobile browsers (notably Safari)
  // and can simply never fire for an otherwise perfectly playable video —
  // fall back to revealing anyway after a few seconds so a flaky event
  // doesn't strand the visitor on the still image forever.
  useEffect(() => {
    if (!hasVideo) return;
    const fallback = setTimeout(() => setIsVideoPreloaded(true), 3000);
    return () => clearTimeout(fallback);
  }, [hasVideo]);

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
  const showSaveButton = hasVideo && phase !== "waiting";

  const handleSaveVideo = async () => {
    const videoUrl = living.videoUrl;
    if (!videoUrl || isSaving) return;
    setIsSaving(true);
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error("Download fetch failed");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `ai-mirror-${worldId}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback: open the signed URL directly so the visitor can still
      // save it manually (e.g. long-press on mobile) if the fetch fails.
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsSaving(false);
    }
  };

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
          onLoadedData={() => setIsVideoPreloaded(true)}
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

      {showSaveButton && (
        <button
          type="button"
          onClick={handleSaveVideo}
          disabled={isSaving}
          className="absolute bottom-28 rounded-full border border-white/30 px-5 py-1.5 text-[10px] font-light tracking-[0.15em] text-white/60 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSaving ? "SAVING..." : "SAVE VIDEO"}
        </button>
      )}
    </div>
  );
}
