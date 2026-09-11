"use client";

import { useState } from "react";
import { useLivingPortrait } from "@/hooks/useLivingPortrait";

interface GeneratedViewProps {
  imageUrl: string;
  worldId?: string;
  worldLabel?: string;
  roleLabel?: string;
  debugProviderLabel?: string;
  onRetry: () => void;
}

export default function GeneratedView({
  imageUrl,
  worldId,
  worldLabel,
  roleLabel,
  debugProviderLabel,
  onRetry,
}: GeneratedViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const living = useLivingPortrait();

  const handleBringAlive = () => {
    if (!worldId) return;
    living.start(imageUrl, worldId);
  };

  const isAwakening = living.state === "starting" || living.state === "generating";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
      {!isLoaded && (
        <p className="absolute animate-pulse text-sm font-light tracking-[0.2em] text-white/50">
          CREATING ANOTHER YOU
        </p>
      )}
      {worldLabel && (
        <div className="absolute top-10 flex flex-col items-center gap-1">
          <p className="text-sm font-light tracking-[0.3em] text-white/80">{worldLabel}</p>
          {roleLabel && (
            <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
              {roleLabel}
            </p>
          )}
        </div>
      )}
      {debugProviderLabel && (
        <p className="absolute bottom-28 text-[10px] font-light tracking-[0.2em] text-white/30">
          {debugProviderLabel}
        </p>
      )}

      {living.state === "completed" && living.videoUrl ? (
        <video
          src={living.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoReady(true)}
          className={`max-h-full max-w-full object-contain transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageUrl}
          alt="Cinematic portrait"
          onLoad={() => setIsLoaded(true)}
          className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {isAwakening && (
        <p className="absolute bottom-40 animate-pulse text-xs font-light tracking-[0.2em] text-white/60">
          AWAKENING THIS LIFE...
        </p>
      )}
      {living.state === "error" && living.errorMessage && (
        <p className="absolute bottom-40 text-xs font-light tracking-[0.15em] text-white/50">
          {living.errorMessage}
        </p>
      )}

      {worldId && living.state !== "completed" && (
        <button
          type="button"
          onClick={handleBringAlive}
          disabled={isAwakening}
          className="absolute bottom-28 rounded-full border border-white/40 px-6 py-2 text-xs font-light tracking-[0.15em] text-white/70 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          BRING THIS LIFE ALIVE
        </button>
      )}

      <button
        type="button"
        onClick={onRetry}
        className="absolute bottom-12 rounded-full bg-white px-8 py-4 text-sm font-medium tracking-wide text-black sm:px-10 sm:text-base"
      >
        <span className="sm:hidden">ANOTHER LIFE</span>
        <span className="hidden sm:inline">DISCOVER ANOTHER LIFE</span>
      </button>
    </div>
  );
}
