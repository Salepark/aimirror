export type AppState =
  | "start"
  | "camera"
  | "countdown"
  | "generating"
  | "generated"
  | "error";

export type CameraErrorType = "permission-denied" | "not-found" | "unknown";

export interface CapturedImage {
  dataUrl: string;
  blob: Blob;
  capturedAt: number;
}
