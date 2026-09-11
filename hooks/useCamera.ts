"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CAMERA_CONSTRAINTS, getCameraErrorType } from "@/lib/camera";
import type { CameraErrorType } from "@/types/camera";

interface UseCameraResult {
  setVideoElement: (node: HTMLVideoElement | null) => void;
  handleLoadedMetadata: () => void;
  isReady: boolean;
  error: CameraErrorType | null;
  start: () => Promise<CameraErrorType | null>;
  stop: () => void;
}

export function useCamera(): UseCameraResult {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<CameraErrorType | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsReady(false);
  }, []);

  const setVideoElement = useCallback((node: HTMLVideoElement | null) => {
    videoElementRef.current = node;
    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
    }
  }, []);

  const start = useCallback(async (): Promise<CameraErrorType | null> => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);
      streamRef.current = stream;
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
      }
      return null;
    } catch (err) {
      const errorType = getCameraErrorType(err);
      setError(errorType);
      return errorType;
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => setIsReady(true), []);

  useEffect(() => stop, [stop]);

  return { setVideoElement, handleLoadedMetadata, isReady, error, start, stop };
}
