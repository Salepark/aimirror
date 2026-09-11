export type AppState =
  | "start"
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
