export interface GeneratedImage {
  imageUrl: string;
  createdAt: number;
}

export interface GenerationError {
  message: string;
}

export type LivingPortraitState = "idle" | "starting" | "generating" | "completed" | "error";
