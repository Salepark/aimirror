import { NextResponse } from "next/server";
import { getSignedVideoUrl } from "@/lib/blob";

// crypto.randomUUID() shape only — this is the entire access check (see
// lib/blob.ts's getSignedVideoUrl doc comment for the tradeoff this implies).
const LIFE_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lifeId = searchParams.get("lifeId");

  if (!lifeId || !LIFE_ID_PATTERN.test(lifeId)) {
    return NextResponse.json({ error: "A valid lifeId is required." }, { status: 400 });
  }

  try {
    const { playbackUrl, expiresAt } = await getSignedVideoUrl(lifeId);
    return NextResponse.json({ playbackUrl, expiresAt });
  } catch (error) {
    console.error("Signed URL generation failed:", error);
    return NextResponse.json({ error: "Unable to prepare playback." }, { status: 502 });
  }
}
