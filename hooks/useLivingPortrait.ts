"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LivingPortraitState } from "@/types/generation";

const POLL_INTERVAL_MS = 9000;
const MAX_POLL_ATTEMPTS = 20; // ~3 minutes at 9s intervals

interface UseLivingPortraitResult {
  state: LivingPortraitState;
  videoUrl: string | null;
  errorMessage: string | null;
  start: (image: string, worldId: string, faceReferenceImage?: string) => void;
}

export function useLivingPortrait(): UseLivingPortraitResult {
  const [state, setState] = useState<LivingPortraitState>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollRef = useRef<(operationName: string, attempt: number) => void>(() => {});

  useEffect(() => {
    pollRef.current = (operationName: string, attempt: number) => {
      timerRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/video/veo/status?operationName=${encodeURIComponent(operationName)}`
          );
          const result = await response.json();

          if (result.status === "completed" && result.videoUrl) {
            setVideoUrl(result.videoUrl);
            setState("completed");
            return;
          }

          if (result.status === "error") {
            setErrorMessage(result.message ?? "Unable to animate this portrait.");
            setState("error");
            return;
          }

          if (attempt >= MAX_POLL_ATTEMPTS) {
            setErrorMessage("The animation is taking too long.");
            setState("error");
            return;
          }

          pollRef.current(operationName, attempt + 1);
        } catch {
          setErrorMessage("Unable to connect to the animation service.");
          setState("error");
        }
      }, POLL_INTERVAL_MS);
    };

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const start = useCallback((image: string, worldId: string, faceReferenceImage?: string) => {
    setState("starting");
    setErrorMessage(null);
    setVideoUrl(null);

    (async () => {
      try {
        const response = await fetch("/api/video/veo/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image, worldId, faceReferenceImage }),
        });
        const result = await response.json();

        if (!response.ok || !result.operationName) {
          setErrorMessage(result.error ?? "Unable to animate this portrait.");
          setState("error");
          return;
        }

        setState("generating");
        pollRef.current(result.operationName, 1);
      } catch {
        setErrorMessage("Unable to connect to the animation service.");
        setState("error");
      }
    })();
  }, []);

  return { state, videoUrl, errorMessage, start };
}
