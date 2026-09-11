import { put } from "@vercel/blob";

// Stable, non-random pathname per lifeId so a retried upload (e.g. a
// duplicate status poll) simply overwrites the same object instead of
// creating a second copy.
export async function saveVideoToBlob(
  buffer: Buffer,
  lifeId: string,
  contentType = "video/mp4"
): Promise<string> {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const pathname = `ai-mirror/${yyyy}/${mm}/${lifeId}/world.mp4`;

  const result = await put(pathname, buffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return result.url;
}
