import { NextResponse } from "next/server";
import { generateRenaissancePortrait } from "@/lib/fal";

export const maxDuration = 90;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof Blob) || image.size === 0) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
  }

  if (image.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Image file is too large." }, { status: 413 });
  }

  try {
    const start = performance.now();
    const imageUrl = await generateRenaissancePortrait(image);

    if (process.env.NODE_ENV !== "production") {
      console.log(`AI generation: ${((performance.now() - start) / 1000).toFixed(1)}s`);
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("fal.ai transform failed:", error);
    return NextResponse.json({ error: "Image generation failed." }, { status: 502 });
  }
}
