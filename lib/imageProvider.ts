export type ImageProvider = "pulid" | "openai";

export interface GeneratePortraitInput {
  image: File | Blob;
  prompt: string;
}

export interface GeneratePortraitResult {
  imageUrl?: string;
  imageBase64?: string;
  provider: ImageProvider;
  durationMs: number;
}

export const PROVIDER_LABELS: Record<ImageProvider, string> = {
  pulid: "FLUX · PULID",
  openai: "OPENAI · GPT-IMAGE-2.5 FLARE",
};

// v0.4: OpenAI is the primary engine. PuLID stays selectable as a dev fallback.
export const DEFAULT_PROVIDER: ImageProvider = "openai";

// Dev convenience: force a provider via ?provider=pulid to fall back to PuLID.
// Never surfaced in the production UI.
export function getDebugProvider(): ImageProvider {
  if (typeof window === "undefined") return DEFAULT_PROVIDER;
  return new URLSearchParams(window.location.search).get("provider") === "pulid"
    ? "pulid"
    : DEFAULT_PROVIDER;
}

export function isProviderDebugActive(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("provider");
}
