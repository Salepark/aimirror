"use client";

import { useState } from "react";
import { useLivingPortrait } from "@/hooks/useLivingPortrait";
import LivingStill from "@/components/LivingStill";
import LivingEnding from "@/components/LivingEnding";
import type { LivingEffectConfig } from "@/config/worlds";

const ENABLE_VEO_DEMO = process.env.NEXT_PUBLIC_ENABLE_VEO_DEMO === "true";

interface GeneratedViewProps {
  imageUrl: string;
  worldId?: string;
  worldLabel?: string;
  roleLabel?: string;
  livingEffect?: LivingEffectConfig;
  debugProviderLabel?: string;
  lifeId?: string;
  onRetry: () => void;
}

export default function GeneratedView({
  imageUrl,
  worldId,
  worldLabel,
  roleLabel,
  livingEffect,
  debugProviderLabel,
  lifeId,
  onRetry,
}: GeneratedViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

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

      {ENABLE_VEO_DEMO ? (
        <VeoDemo
          imageUrl={imageUrl}
          worldId={worldId}
          onLoad={() => setIsLoaded(true)}
        />
      ) : worldId && lifeId ? (
        <LivingEnding
          imageUrl={imageUrl}
          worldId={worldId}
          livingEffect={livingEffect}
          lifeId={lifeId}
          onImageLoad={() => setIsLoaded(true)}
        />
      ) : (
        <LivingStill imageUrl={imageUrl} effect={livingEffect} onLoad={() => setIsLoaded(true)} />
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

// Dev/demo-only manual trigger, gated behind NEXT_PUBLIC_ENABLE_VEO_DEMO.
// Visitors in normal mode never see this — see LivingEnding for the
// automatic one-shot experience.
function VeoDemo({
  imageUrl,
  worldId,
  onLoad,
}: {
  imageUrl: string;
  worldId?: string;
  onLoad: () => void;
}) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const living = useLivingPortrait();

  const handleBringAlive = () => {
    if (!worldId) return;
    living.start(imageUrl, worldId, crypto.randomUUID());
  };

  const isAwakening = living.state === "starting" || living.state === "generating";

  return (
    <>
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
        <LivingStill imageUrl={imageUrl} onLoad={onLoad} />
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
          className="absolute bottom-28 rounded-full border border-white/30 px-5 py-1.5 text-[10px] font-light tracking-[0.15em] text-white/50 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          BRING THIS LIFE ALIVE — VEO DEMO
        </button>
      )}
    </>
  );
}
