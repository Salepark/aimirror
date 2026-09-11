import { fal } from "@fal-ai/client";

// fal-ai/flux-pulid default; kept as a named constant so it's easy to tune later.
export const GENERATION_CONFIG = {
  idWeight: 1,
};

let configured = false;

function ensureConfigured() {
  if (configured) return;
  if (!process.env.FAL_KEY) {
    throw new Error("Missing FAL_KEY");
  }
  fal.config({ credentials: process.env.FAL_KEY });
  configured = true;
}

export async function generateWorldPortrait(image: Blob, prompt: string): Promise<string> {
  ensureConfigured();

  const referenceImageUrl = await fal.storage.upload(image);

  const result = await fal.subscribe("fal-ai/flux-pulid", {
    input: {
      prompt,
      reference_image_url: referenceImageUrl,
      id_weight: GENERATION_CONFIG.idWeight,
    },
  });

  const imageUrl = result.data.images[0]?.url;
  if (!imageUrl) {
    throw new Error("fal.ai returned no image");
  }

  return imageUrl;
}
