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

// Dev convenience: force a provider via ?provider=openai for A/B testing.
// Never surfaced in the production UI.
export function getDebugProvider(): ImageProvider {
  if (typeof window === "undefined") return "pulid";
  return new URLSearchParams(window.location.search).get("provider") === "openai"
    ? "openai"
    : "pulid";
}

export function isProviderDebugActive(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("provider");
}
