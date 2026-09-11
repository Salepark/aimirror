import { NextResponse } from "next/server";
import { startVeoJob } from "@/lib/veo";
import { WORLDS } from "@/config/worlds";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const image = body?.image;
  const worldId = body?.worldId;

  if (typeof image !== "string" || !image) {
    return NextResponse.json({ error: "A still image is required." }, { status: 400 });
  }

  const world = typeof worldId === "string" ? WORLDS.find((w) => w.id === worldId) : undefined;
  if (!world) {
    return NextResponse.json({ error: "Invalid world selected." }, { status: 400 });
  }

  try {
    const operationName = await startVeoJob({ image, motionPrompt: world.motionPrompt });
    return NextResponse.json({ operationName });
  } catch (error) {
    console.error("Veo start failed:", error);
    return NextResponse.json({ error: "Unable to animate this portrait." }, { status: 502 });
  }
}
