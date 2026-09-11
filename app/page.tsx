"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CameraView from "@/components/CameraView";
import FaceGuide from "@/components/FaceGuide";
import CaptureButton from "@/components/CaptureButton";
import Countdown from "@/components/Countdown";
import CapturedView from "@/components/CapturedView";
import { useCamera } from "@/hooks/useCamera";
import { captureFrameToDataUrl } from "@/lib/camera";
import type { AppState, CapturedImage, CameraErrorType } from "@/types/camera";

const COUNTDOWN_SECONDS = 3;
const MIN_READY_DELAY_MS = 1000;
const FLASH_DURATION_MS = 150;

const ERROR_MESSAGES: Record<CameraErrorType, { title: string; body: string }> = {
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

export default function Home() {
  const [appState, setAppState] = useState<AppState>("start");
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
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

  const handleEnter = useCallback(async () => {
    const errorType = await camera.start();
    setMinTimeElapsed(false);
    setAppState(errorType ? "error" : "camera");
  }, [camera]);

  const handleEnterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const handleTransformClick = useCallback(() => {
    setAppState("countdown");
  }, []);

  const handleCountdownComplete = useCallback(() => {
    const video = videoElementRef.current;
    const dataUrl = video ? captureFrameToDataUrl(video) : null;

    setShowFlash(true);
    setTimeout(() => setShowFlash(false), FLASH_DURATION_MS);

    if (dataUrl) {
      setCapturedImage({ dataUrl, capturedAt: Date.now() });
      setAppState("captured");
    } else {
      setAppState("camera");
    }
  }, []);

  const handleRetry = useCallback(() => {
    setCapturedImage(null);
    setMinTimeElapsed(false);
    setAppState("camera");
  }, []);

  const canCapture = camera.isReady && minTimeElapsed;
  const errorInfo = camera.error ? ERROR_MESSAGES[camera.error] : null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black text-white">
      {appState === "start" && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-light tracking-[0.4em]">AI MIRROR</h1>
            <p className="text-sm font-light text-white/70">
              Discover another version of yourself.
            </p>
          </div>
          <button
            type="button"
            onClick={handleEnter}
            className="rounded-full border border-white/60 px-12 py-3 text-sm font-medium tracking-[0.2em]"
          >
            ENTER
          </button>
          <button
            type="button"
            onClick={handleEnterFullscreen}
            className="text-xs font-light tracking-wide text-white/40"
          >
            ENTER FULLSCREEN
          </button>
        </div>
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

      {appState === "captured" && capturedImage && (
        <CapturedView dataUrl={capturedImage.dataUrl} onRetry={handleRetry} />
      )}

      {appState === "error" && errorInfo && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-lg font-medium">{errorInfo.title}</p>
          {errorInfo.body && (
            <p className="text-sm font-light text-white/70">{errorInfo.body}</p>
          )}
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-150"
        style={{ opacity: showFlash ? 0.8 : 0 }}
      />
    </main>
  );
}
