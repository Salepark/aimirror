import type { CameraErrorType, CapturedImage } from "@/types/camera";

const MAX_LONG_SIDE = 1536;
const JPEG_QUALITY = 0.9;

export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
  audio: false,
};

export function getCameraErrorType(error: unknown): CameraErrorType {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      return "permission-denied";
    }
    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
      return "not-found";
    }
  }
  return "unknown";
}

function getScaledDimensions(width: number, height: number, maxLongSide: number) {
  const longSide = Math.max(width, height);
  if (longSide <= maxLongSide) return { width, height };

  const scale = maxLongSide / longSide;
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

export function captureFrame(video: HTMLVideoElement): Promise<CapturedImage | null> {
  const { videoWidth, videoHeight } = video;
  if (!videoWidth || !videoHeight) return Promise.resolve(null);

  const { width, height } = getScaledDimensions(videoWidth, videoHeight, MAX_LONG_SIDE);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return Promise.resolve(null);

  // Mirror the capture so the saved image matches what the user saw in the preview.
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob ? { blob, capturedAt: Date.now() } : null),
      "image/jpeg",
      JPEG_QUALITY
    );
  });
}
