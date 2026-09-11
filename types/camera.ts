export type AppState =
  | "start"
  | "consent"
  | "camera"
  | "countdown"
  | "worldReveal"
  | "generating"
  | "generated"
  | "error";

export type CameraErrorType = "permission-denied" | "not-found" | "unknown";

export interface CapturedImage {
  blob: Blob;
  capturedAt: number;
}
