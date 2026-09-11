import OpenAI from "openai";

const OPENAI_MODEL = "gpt-image-2.5-flare";
const OPENAI_SIZE = "1024x1536";
const OPENAI_QUALITY = "medium";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (client) return client;
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function generateOpenAiPortrait(image: Blob, prompt: string): Promise<string> {
  const openai = getClient();

  const response = await openai.images.edit({
    image,
    prompt,
    model: OPENAI_MODEL,
    size: OPENAI_SIZE,
    quality: OPENAI_QUALITY,
  });

  const base64 = response.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error("OpenAI returned no image");
  }

  return `data:image/png;base64,${base64}`;
}
