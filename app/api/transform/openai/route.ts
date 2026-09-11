import { NextResponse } from "next/server";
import { generateOpenAiPortrait } from "@/lib/openai-image";

export const maxDuration = 90;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// v0.3.1b A/B test scope: only the Mars world has an OpenAI-tuned prompt so far.
// Do not migrate the rest of the World presets until Mars proves the approach.
const OPENAI_WORLD_PROMPTS: Partial<Record<string, string>> = {
  "mars-2164": `Use the supplied photograph as the identity reference.

Preserve the person's recognizable facial identity,
age, ethnicity, facial proportions, eyes, nose and mouth.
The result must unmistakably depict the same individual.

Do not preserve the original clothing, hairstyle styling,
pose, background, framing or lighting.

Transform the person into a Mars exploration commander in the year 2164.

The person is wearing a complete advanced Mars EVA suit
with a transparent pressurized helmet and visible protective visor,
life-support systems, technical fabric layers, seals,
communication hardware and realistic environmental equipment.

The helmet is essential.
The person must not appear outdoors on Mars without a sealed helmet.

Show the subject outside a large Martian settlement during an approaching dust storm.

Red dust moves through the scene.
The suit and external equipment show realistic signs of use.

Large habitat structures, exploration vehicles and distant red mountains
are visible in the background.

Use a dramatic three-quarter-body composition.
The person should not stand perfectly centered like a passport portrait.

Use a slightly low cinematic camera angle,
strong Martian sunset rim light,
atmospheric dust,
depth and environmental scale.

The pose should feel purposeful,
as if the person has paused during an active expedition.

Create a premium cinematic science-fiction image,
realistic and believable,
like a still frame from a major feature film.

Avoid:
studio portrait,
passport-photo composition,
plain standing pose,
hoodie,
casual clothing,
unprotected head,
generic futuristic background.

Same identity.
Completely different life.`,
};

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

  const prompt = typeof worldId === "string" ? OPENAI_WORLD_PROMPTS[worldId] : undefined;
  if (!prompt) {
    return NextResponse.json(
      { error: "This world isn't available for the OpenAI test yet." },
      { status: 400 }
    );
  }

  try {
    const start = performance.now();
    const imageUrl = await generateOpenAiPortrait(image, prompt);

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `Provider: openai | Model: gpt-image-2.5-flare | World: ${worldId} | Duration: ${(
          (performance.now() - start) /
          1000
        ).toFixed(1)}s`
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("OpenAI transform failed:", error);
    return NextResponse.json({ error: "Image generation failed." }, { status: 502 });
  }
}
