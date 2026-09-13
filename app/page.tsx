"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CameraView from "@/components/CameraView";
import FaceGuide from "@/components/FaceGuide";
import CaptureButton from "@/components/CaptureButton";
import Countdown from "@/components/Countdown";
import WorldReveal from "@/components/WorldReveal";
import GeneratingView from "@/components/GeneratingView";
import GeneratedView from "@/components/GeneratedView";
import ErrorView from "@/components/ErrorView";
import ConsentView from "@/components/ConsentView";
import PrivacyModal from "@/components/PrivacyModal";
import { useCamera } from "@/hooks/useCamera";
import { captureFrame } from "@/lib/camera";
import { selectWorld } from "@/lib/randomWorld";
import { getDebugProvider, isProviderDebugActive, PROVIDER_LABELS, type ImageProvider } from "@/lib/imageProvider";
import { WORLDS, type WorldPreset } from "@/config/worlds";
import type { AppState, CameraErrorType } from "@/types/camera";
import type { GeneratedImage, GenerationError } from "@/types/generation";

const COUNTDOWN_SECONDS = 3;
const MIN_READY_DELAY_MS = 1000;
const FLASH_HOLD_MS = 150;
const GENERATION_TIMEOUT_MS = 55_000; // stay under the server's 60s Vercel Hobby cap
const RECENT_WORLDS_LIMIT = 3;

const CAMERA_ERROR_MESSAGES: Record<CameraErrorType, { title: string; body: string }> = {
  "permission-denied": {
    title: "Camera access is required.",
    body: "Please allow camera access in your browser settings.",
  },
  "not-found": {
    title: "No camera was found.",
    body: "",
  },
  unknown: {
    title: "Unable to access the camera.",
    body: "",
  },
};

const GENERATION_ERROR_MESSAGES = {
  network: "Unable to connect to the AI service.",
  api: "Unable to create your portrait.",
  timeout: "The transformation is taking too long.",
} as const;

type GenerationOutcome =
  | { ok: true; imageUrl: string }
  | { ok: false; message: string };

async function runGeneration(
  blob: Blob,
  worldId: string,
  provider: ImageProvider
): Promise<GenerationOutcome> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

  try {
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");
    formData.append("worldId", worldId);

    const endpoint = provider === "openai" ? "/api/transform/openai" : "/api/transform";

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("api");

    const result: { imageUrl?: string } = await response.json();
    if (!result.imageUrl) throw new Error("api");

    return { ok: true, imageUrl: result.imageUrl };
  } catch (err) {
    const category =
      err instanceof DOMException && err.name === "AbortError"
        ? "timeout"
        : err instanceof TypeError
          ? "network"
          : "api";
    return { ok: false, message: GENERATION_ERROR_MESSAGES[category] };
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("start");
  const [selectedWorld, setSelectedWorld] = useState<WorldPreset | null>(null);
  const [recentWorldIds, setRecentWorldIds] = useState<string[]>([]);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [generationError, setGenerationError] = useState<GenerationError | null>(null);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [lastProvider, setLastProvider] = useState<ImageProvider | null>(null);
  const [lifeId, setLifeId] = useState<string | null>(null);
  const [consentExperience, setConsentExperience] = useState(false);
  const [consentPromotion, setConsentPromotion] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const generationPromiseRef = useRef<Promise<GenerationOutcome> | null>(null);
  const camera = useCamera();

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoElementRef.current = node;
      camera.setVideoElement(node);
    },
    [camera]
  );

  useEffect(() => {
    if (appState !== "camera") return;
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_READY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [appState]);

  const handleBeginExperience = useCallback(() => {
    setAppState("consent");
  }, []);

  const handleConsentContinue = useCallback(async () => {
    if (!consentExperience) return;
    const errorType = await camera.start();
    setMinTimeElapsed(false);
    setAppState(errorType ? "error" : "camera");
  }, [camera, consentExperience]);

  const handleEnterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const handleTransformClick = useCallback(() => {
    setAppState("countdown");
  }, []);

  const handleCountdownComplete = useCallback(async () => {
    const video = videoElementRef.current;
    const captured = video ? await captureFrame(video) : null;

    setShowFlash(true);
    setTimeout(() => setShowFlash(false), FLASH_HOLD_MS);

    if (!captured) {
      setAppState("camera");
      return;
    }

    const world = selectWorld(WORLDS, recentWorldIds);
    const provider = getDebugProvider();
    setSelectedWorld(world);
    setLastProvider(provider);
    setRecentWorldIds((prev) => [world.id, ...prev].slice(0, RECENT_WORLDS_LIMIT));
    setAppState("worldReveal");

    if (process.env.NODE_ENV !== "production") {
      console.log(`Selected world: ${world.id} | Provider: ${provider}`);
    }

    // Start generation immediately so the API latency overlaps with the
    // WorldReveal animation instead of stacking after it.
    generationPromiseRef.current = runGeneration(captured.blob, world.id, provider);
  }, [recentWorldIds]);

  const handleWorldRevealComplete = useCallback(async () => {
    setAppState("generating");

    const promise = generationPromiseRef.current;
    generationPromiseRef.current = null;
    if (!promise) return;

    const outcome = await promise;
    if (outcome.ok) {
      setGeneratedImage({ imageUrl: outcome.imageUrl, createdAt: Date.now() });
      setLifeId(crypto.randomUUID());
      setAppState("generated");
    } else {
      setGenerationError({ message: outcome.message });
      setAppState("error");
    }
  }, []);

  const handleGenerationRetry = useCallback(() => {
    setSelectedWorld(null);
    setGeneratedImage(null);
    setGenerationError(null);
    setLifeId(null);
    setMinTimeElapsed(false);
    setAppState("camera");
  }, []);

  const canCapture = camera.isReady && minTimeElapsed;
  const cameraErrorInfo = camera.error ? CAMERA_ERROR_MESSAGES[camera.error] : null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black text-white">
      {appState === "start" && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-light tracking-[0.4em]">AI MIRROR</h1>
            <p className="text-xs font-light tracking-[0.3em] text-white/60">
              SAME IDENTITY. DIFFERENT LIFE.
            </p>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/50">
              AI Mirror creates an alternate version of you using AI-generated imagery.
            </p>
          </div>
          <button
            type="button"
            onClick={handleBeginExperience}
            className="rounded-full border border-white/60 px-12 py-3 text-sm font-medium tracking-[0.2em]"
          >
            BEGIN EXPERIENCE
          </button>
          <button
            type="button"
            onClick={handleEnterFullscreen}
            className="text-xs font-light tracking-wide text-white/40"
          >
            ENTER FULLSCREEN
          </button>
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="text-[10px] font-light tracking-[0.2em] text-white/30 underline underline-offset-4"
          >
            PRIVACY
          </button>
        </div>
      )}

      {appState === "consent" && (
        <ConsentView
          consentExperience={consentExperience}
          consentPromotion={consentPromotion}
          onChangeExperience={setConsentExperience}
          onChangePromotion={setConsentPromotion}
          onContinue={handleConsentContinue}
        />
      )}

      {(appState === "camera" || appState === "countdown") && (
        <>
          <CameraView videoRef={setVideoRef} onLoadedMetadata={camera.handleLoadedMetadata} />
          <FaceGuide />
          {appState === "camera" && (
            <CaptureButton disabled={!canCapture} onClick={handleTransformClick} />
          )}
          {appState === "countdown" && (
            <Countdown seconds={COUNTDOWN_SECONDS} onComplete={handleCountdownComplete} />
          )}
        </>
      )}

      {appState === "worldReveal" && selectedWorld && (
        <WorldReveal world={selectedWorld} onComplete={handleWorldRevealComplete} />
      )}

      {appState === "generating" && <GeneratingView world={selectedWorld} />}

      {appState === "generated" && generatedImage && (
        <>
          <GeneratedView
            imageUrl={generatedImage.imageUrl}
            worldId={selectedWorld?.id}
            worldLabel={selectedWorld?.resultLabel}
            roleLabel={selectedWorld?.role}
            livingEffect={selectedWorld?.livingEffect}
            lifeId={lifeId ?? undefined}
            debugProviderLabel={
              lastProvider && isProviderDebugActive() ? PROVIDER_LABELS[lastProvider] : undefined
            }
            onRetry={handleGenerationRetry}
          />
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-light tracking-[0.2em] text-white/25 underline underline-offset-4"
          >
            PRIVACY
          </button>
        </>
      )}

      {appState === "error" &&
        (cameraErrorInfo ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-lg font-medium">{cameraErrorInfo.title}</p>
            {cameraErrorInfo.body && (
              <p className="text-sm font-light text-white/70">{cameraErrorInfo.body}</p>
            )}
          </div>
        ) : (
          generationError && (
            <ErrorView message={generationError.message} onRetry={handleGenerationRetry} />
          )
        ))}

      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}

      <div
        className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-500"
        style={{ opacity: showFlash ? 0.9 : 0 }}
      />
    </main>
  );
}
