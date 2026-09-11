import { NextResponse } from "next/server";
import { generateWorldPortrait } from "@/lib/fal";
import { WORLDS } from "@/config/worlds";

export const maxDuration = 90;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");
  const worldId = formData.get("worldId");

  if (!(image instanceof Blob) || image.size === 0) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
  }

  if (image.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Image file is too large." }, { status: 413 });
  }

  const world = typeof worldId === "string" ? WORLDS.find((w) => w.id === worldId) : undefined;
  if (!world) {
    return NextResponse.json({ error: "Invalid world selected." }, { status: 400 });
  }

  try {
    const start = performance.now();
    const imageUrl = await generateWorldPortrait(image, world.imagePrompt);

    if (process.env.NODE_ENV !== "production") {
      console.log(`Generation completed for "${world.id}": ${((performance.now() - start) / 1000).toFixed(1)}s`);
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("fal.ai transform failed:", error);
    return NextResponse.json({ error: "Image generation failed." }, { status: 502 });
  }
}
