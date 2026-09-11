"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LivingEffectConfig } from "@/config/worlds";

interface LivingStillProps {
  imageUrl: string;
  effect?: LivingEffectConfig;
  activationDelay?: number;
  onLoad?: () => void;
}

type OverlayKind = "particles-fall" | "particles-rise" | "rain" | "mist" | "glow" | "shimmer" | "flash";

interface OverlayLayer {
  kind: OverlayKind;
  color: string;
  opacity: number;
  count?: number;
  size?: [number, number];
  durationS?: [number, number];
}

const CAMERA_MOTION_SCALE: Record<string, [number, number]> = {
  "push-in": [1, 1.015],
  "pull-back": [1.02, 1],
  minimal: [1, 1],
};

const CAMERA_MOTION_DURATION_S = 11;
const ACTIVATION_FADE_MS = 2000;
const DEFAULT_ACTIVATION_DELAY_MS = 3000;

// World-specific effect recipes. Kept isolated here so GeneratedView and
// config/worlds.ts never need to know the individual overlay techniques.
const EFFECT_PRESETS: Record<string, OverlayLayer[]> = {
  "florence-dust": [
    { kind: "particles-fall", color: "#f5e6c8", opacity: 0.32, count: 14, size: [1, 3], durationS: [14, 22] },
    { kind: "glow", color: "#ffdca8", opacity: 0.16 },
  ],
  "joseon-snow": [
    { kind: "particles-fall", color: "#ffffff", opacity: 0.5, count: 22, size: [2, 4], durationS: [10, 18] },
    { kind: "mist", color: "#c9d6e0", opacity: 0.1 },
  ],
  "paris-rain": [
    { kind: "rain", color: "#cfe0ee", opacity: 0.2 },
    { kind: "shimmer", color: "#ffdca0", opacity: 0.18 },
    { kind: "glow", color: "#ffcf8a", opacity: 0.14 },
  ],
  "newyork-smoke": [
    { kind: "particles-rise", color: "#cabf9e", opacity: 0.22, count: 9, size: [20, 46], durationS: [16, 26] },
    { kind: "glow", color: "#ffb347", opacity: 0.15 },
  ],
  "seoul-storm": [
    { kind: "rain", color: "#9db5c9", opacity: 0.26 },
    { kind: "flash", color: "#dfe9ff", opacity: 0.35 },
    { kind: "shimmer", color: "#8fd6ff", opacity: 0.14 },
  ],
  "mars-dust": [
    { kind: "particles-fall", color: "#e08a4f", opacity: 0.28, count: 16, size: [1, 3], durationS: [12, 20] },
    { kind: "shimmer", color: "#ffd9a0", opacity: 0.14 },
  ],
  "ink-diffusion": [{ kind: "mist", color: "#f2ede2", opacity: 0.09 }],
  "pop-halftone": [{ kind: "flash", color: "#ffffff", opacity: 0.1 }],
  "baroque-candle": [
    { kind: "particles-fall", color: "#f4d9a0", opacity: 0.18, count: 8, size: [1, 2], durationS: [16, 24] },
    { kind: "glow", color: "#ffb84d", opacity: 0.19 },
  ],
  "unknown-haze": [
    { kind: "particles-rise", color: "#bfe8ff", opacity: 0.28, count: 14, size: [1, 3], durationS: [18, 28] },
    { kind: "mist", color: "#dce9f5", opacity: 0.1 },
    { kind: "glow", color: "#9fd6ff", opacity: 0.13 },
  ],
};

function usePrefersReducedMotion(): boolean {
  // Starts false (matching SSR output) and is only ever updated post-mount,
  // in the effect below — reading matchMedia during render would make the
  // client's first render diverge from the server-rendered HTML.
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: must read matchMedia client-side only, after hydration.
    setPrefersReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

interface Particle {
  key: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: string;
}

function generateParticles(layer: OverlayLayer): Particle[] {
  const count = layer.count ?? 12;
  const [minSize, maxSize] = layer.size ?? [1, 3];
  const [minDuration, maxDuration] = layer.durationS ?? [14, 22];

  return Array.from({ length: count }, (_, index) => ({
    key: index,
    left: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    duration: minDuration + Math.random() * (maxDuration - minDuration),
    delay: Math.random() * -maxDuration,
    driftX: `${(Math.random() * 6 - 3).toFixed(1)}%`,
  }));
}

function ParticleLayer({
  layer,
  rise,
  intensity,
}: {
  layer: OverlayLayer;
  rise: boolean;
  intensity: number;
}) {
  // Starts empty (matching SSR output) and is populated only after mount —
  // Math.random() must never run during a server/client render pass, or the
  // hydrated markup won't match what the server sent.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: Math.random must run client-side only, after hydration.
    setParticles(generateParticles(layer));
  }, [layer]);

  return (
    <>
      {particles.map((particle) => (
        <span
          key={particle.key}
          className="absolute rounded-full blur-[0.5px]"
          style={{
            left: `${particle.left}%`,
            top: rise ? "auto" : "-5%",
            bottom: rise ? "-5%" : "auto",
            width: particle.size,
            height: particle.size,
            backgroundColor: layer.color,
            boxShadow: `0 0 ${particle.size * 2}px ${layer.color}`,
            animation: `${rise ? "living-rise" : "living-fall"} ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            // @ts-expect-error -- CSS custom properties aren't in the style typings
            "--living-opacity": layer.opacity * intensity,
            "--living-drift-x": particle.driftX,
          }}
        />
      ))}
    </>
  );
}

function RainLayer({ layer, intensity }: { layer: OverlayLayer; intensity: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: layer.opacity * intensity,
        backgroundImage: `repeating-linear-gradient(115deg, transparent 0, transparent 3px, ${layer.color} 3px, ${layer.color} 4px, transparent 4px, transparent 22px)`,
        animation: "living-rain-scroll 0.6s linear infinite",
      }}
    />
  );
}

function MistLayer({ layer, intensity }: { layer: OverlayLayer; intensity: number }) {
  return (
    <div
      className="absolute -inset-x-1/4 inset-y-0"
      style={{
        opacity: layer.opacity * intensity,
        background: `radial-gradient(ellipse at 30% 40%, ${layer.color} 0%, transparent 60%), radial-gradient(ellipse at 75% 65%, ${layer.color} 0%, transparent 55%)`,
        animation: "living-mist-drift 26s ease-in-out infinite alternate",
      }}
    />
  );
}

function GlowLayer({ layer, intensity }: { layer: OverlayLayer; intensity: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${layer.color} 0%, transparent 65%)`,
        animation: "living-glow-pulse 8s ease-in-out infinite",
        // @ts-expect-error -- CSS custom properties aren't in the style typings
        "--living-glow-min": layer.opacity * 0.5 * intensity,
        "--living-glow-max": layer.opacity * intensity,
      }}
    />
  );
}

function ShimmerLayer({ layer, intensity }: { layer: OverlayLayer; intensity: number }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ opacity: intensity }}
    >
      <div
        className="absolute -inset-y-1/4 w-1/3"
        style={{
          background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)`,
          opacity: layer.opacity,
          animation: "living-shimmer-sweep 13s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function FlashLayer({ layer, intensity }: { layer: OverlayLayer; intensity: number }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 8000;
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setFlash(true);
        setTimeout(() => {
          if (!cancelled) setFlash(false);
        }, 180);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-150"
      style={{
        backgroundColor: layer.color,
        opacity: flash ? layer.opacity * intensity : 0,
      }}
    />
  );
}

function EffectOverlay({ preset, intensity }: { preset: OverlayLayer[]; intensity: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {preset.map((layer, index) => {
        switch (layer.kind) {
          case "particles-fall":
            return <ParticleLayer key={index} layer={layer} rise={false} intensity={intensity} />;
          case "particles-rise":
            return <ParticleLayer key={index} layer={layer} rise intensity={intensity} />;
          case "rain":
            return <RainLayer key={index} layer={layer} intensity={intensity} />;
          case "mist":
            return <MistLayer key={index} layer={layer} intensity={intensity} />;
          case "glow":
            return <GlowLayer key={index} layer={layer} intensity={intensity} />;
          case "shimmer":
            return <ShimmerLayer key={index} layer={layer} intensity={intensity} />;
          case "flash":
            return <FlashLayer key={index} layer={layer} intensity={intensity} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function LivingStill({
  imageUrl,
  effect,
  activationDelay = DEFAULT_ACTIVATION_DELAY_MS,
  onLoad,
}: LivingStillProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activated, setActivated] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  useEffect(() => {
    // Cached images can finish loading before React attaches the onLoad
    // listener, in which case the load event never fires — check manually.
    if (imgRef.current?.complete) handleLoad();
  }, [handleLoad]);

  useEffect(() => {
    if (!isLoaded || prefersReducedMotion) return;
    const timer = setTimeout(() => setActivated(true), activationDelay);
    return () => clearTimeout(timer);
  }, [isLoaded, activationDelay, prefersReducedMotion]);

  const preset = effect ? EFFECT_PRESETS[effect.type] : undefined;
  const intensity = effect?.intensity ?? 1;
  const [scaleStart, scaleEnd] = CAMERA_MOTION_SCALE[effect?.cameraMotion ?? "minimal"];
  const showMotion = activated && !prefersReducedMotion;

  return (
    <div
      data-living-still
      className="relative flex h-full w-full items-center justify-center"
    >
      <div
        className="relative inline-block"
        style={{
          transform: `scale(${showMotion ? scaleEnd : scaleStart})`,
          transition: `transform ${CAMERA_MOTION_DURATION_S}s ease-out`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Cinematic portrait"
          onLoad={handleLoad}
          className={`block max-h-[85vh] max-w-full object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {preset && (
          <div
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: showMotion ? 1 : 0,
              transitionDuration: `${ACTIVATION_FADE_MS}ms`,
            }}
          >
            <EffectOverlay preset={preset} intensity={intensity} />
          </div>
        )}
      </div>
    </div>
  );
}
