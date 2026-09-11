export type AppState = "start" | "camera" | "countdown" | "captured" | "error";

export type CameraErrorType = "permission-denied" | "not-found" | "unknown";

export interface CapturedImage {
  dataUrl: string;
  capturedAt: number;
}
