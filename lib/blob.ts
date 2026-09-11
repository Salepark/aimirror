import { put, issueSignedToken, presignUrl } from "@vercel/blob";

const SIGNED_URL_TTL_MS = 20 * 60 * 1000; // 20 minutes

// Deterministic, lifeId-only pathname — no upload timestamp folded in, so
// the signed-url route can recompute the exact same path from lifeId alone
// without needing to look anything up.
function getVideoPathname(lifeId: string): string {
  return `ai-mirror/${lifeId}/world.mp4`;
}

// Uploads to a PRIVATE blob. The direct blob URL is never handed to the
// client — playback goes through getSignedVideoUrl()'s short-lived,
// presigned GET URL instead (see app/api/media/signed-url/route.ts).
export async function saveVideoToBlob(
  buffer: Buffer,
  lifeId: string,
  contentType = "video/mp4"
): Promise<void> {
  await put(getVideoPathname(lifeId), buffer, {
    access: "private",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export interface SignedVideoUrl {
  playbackUrl: string;
  expiresAt: number;
}

// Possession of a valid lifeId (a crypto.randomUUID(), ~122 bits of
// entropy) is the only authorization check here — there is no database or
// session binding a lifeId to the browser that requested it. This is a
// deliberate MVP tradeoff: acceptable for ephemeral, non-sensitive preview
// clips, but not a substitute for real per-user access control. See the
// v0.5.4 report for the full limitation.
export async function getSignedVideoUrl(lifeId: string): Promise<SignedVideoUrl> {
  const pathname = getVideoPathname(lifeId);
  const validUntil = Date.now() + SIGNED_URL_TTL_MS;

  const token = await issueSignedToken({
    pathname,
    operations: ["get"],
    validUntil,
  });

  const { presignedUrl } = await presignUrl(
    { clientSigningToken: token.clientSigningToken, delegationToken: token.delegationToken },
    { operation: "get", pathname, access: "private" }
  );

  return { playbackUrl: presignedUrl, expiresAt: validUntil };
}
