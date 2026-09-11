import { NextResponse } from "next/server";
import { startVeoJob } from "@/lib/veo";
import { buildVeoMotionPrompt } from "@/lib/veoPrompt";
import { WORLDS } from "@/config/worlds";

export const maxDuration = 60;

// Best-effort guard against duplicate Veo starts for the same lifeId.
// Only holds for the lifetime of a single warm serverless instance — it is
// NOT authoritative across cold starts or multiple instances (no database
// in this version). The primary guard is client-side (start-once ref).
const startedLifeIds = new Map<string, string>(); // lifeId -> operationName

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const image = body?.image;
  const worldId = body?.worldId;
  const lifeId = body?.lifeId;

  if (typeof image !== "string" || !image) {
    return NextResponse.json({ error: "A still image is required." }, { status: 400 });
  }

  if (typeof lifeId !== "string" || !lifeId) {
    return NextResponse.json({ error: "A lifeId is required." }, { status: 400 });
  }

  const world = typeof worldId === "string" ? WORLDS.find((w) => w.id === worldId) : undefined;
  if (!world) {
    return NextResponse.json({ error: "Invalid world selected." }, { status: 400 });
  }

  const existingOperation = startedLifeIds.get(lifeId);
  if (existingOperation) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Veo: reused existing operation for lifeId=${lifeId}`);
    }
    return NextResponse.json({ operationName: existingOperation });
  }

  try {
    const motionPrompt = buildVeoMotionPrompt(world);
    const operationName = await startVeoJob({ worldImage: image, motionPrompt });
    startedLifeIds.set(lifeId, operationName);

    if (process.env.NODE_ENV !== "production") {
      console.log(`Veo generation started: lifeId=${lifeId} world=${world.id}`);
    }

    return NextResponse.json({ operationName });
  } catch (error) {
    console.error("Veo start failed:", error);
    return NextResponse.json({ error: "Unable to animate this portrait." }, { status: 502 });
  }
}
