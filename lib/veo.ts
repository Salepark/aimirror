import { GoogleGenAI, GenerateVideosOperation, VideoGenerationReferenceType } from "@google/genai";

const VEO_MODEL = "veo-3.1-generate-preview";
const GOOGLE_API_KEY_HEADER = "x-goog-api-key";

let client: GoogleGenAI | null = null;

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  return apiKey;
}

function getClient(): GoogleGenAI {
  if (client) return client;
  client = new GoogleGenAI({ apiKey: getApiKey() });
  return client;
}

async function resolveImageInput(image: string): Promise<{ imageBytes: string; mimeType: string }> {
  const dataUrlMatch = image.match(/^data:([^;]+);base64,(.+)$/);
  if (dataUrlMatch) {
    return { mimeType: dataUrlMatch[1], imageBytes: dataUrlMatch[2] };
  }

  const response = await fetch(image);
  if (!response.ok) {
    throw new Error(`Failed to fetch reference image: ${response.status}`);
  }
  const mimeType = response.headers.get("content-type") ?? "image/png";
  const buffer = Buffer.from(await response.arrayBuffer());
  return { mimeType, imageBytes: buffer.toString("base64") };
}

export interface StartVeoJobInput {
  // The generated World still image. Always required: used as the sole
  // first-frame reference in plain mode, or as the "world" asset reference
  // (clothing/scene) alongside the face reference in identity mode.
  worldImage: string;
  // The original camera capture. When present, switches to Veo's
  // referenceImages mode for stronger facial identity preservation.
  // referenceImages and a first-frame `image` cannot be combined in the
  // same request (see @google/genai's GenerateVideosConfig.referenceImages
  // doc comment), so identity mode omits `source.image` entirely.
  faceReferenceImage?: string;
  motionPrompt: string;
}

export async function startVeoJob({
  worldImage,
  faceReferenceImage,
  motionPrompt,
}: StartVeoJobInput): Promise<string> {
  const ai = getClient();

  if (faceReferenceImage) {
    const [faceImage, worldRefImage] = await Promise.all([
      resolveImageInput(faceReferenceImage),
      resolveImageInput(worldImage),
    ]);

    const operation = await ai.models.generateVideos({
      model: VEO_MODEL,
      source: {
        prompt: motionPrompt,
      },
      config: {
        referenceImages: [
          { image: faceImage, referenceType: VideoGenerationReferenceType.ASSET },
          { image: worldRefImage, referenceType: VideoGenerationReferenceType.ASSET },
        ],
        aspectRatio: "9:16",
        durationSeconds: 8,
        resolution: "720p",
        personGeneration: "allow_adult",
        numberOfVideos: 1,
      },
    });

    if (!operation.name) {
      throw new Error("Veo did not return an operation name");
    }

    return operation.name;
  }

  const { imageBytes, mimeType } = await resolveImageInput(worldImage);

  const operation = await ai.models.generateVideos({
    model: VEO_MODEL,
    source: {
      prompt: motionPrompt,
      image: {
        imageBytes,
        mimeType,
      },
    },
    config: {
      aspectRatio: "9:16",
      durationSeconds: 4,
      resolution: "720p",
      personGeneration: "allow_adult",
      numberOfVideos: 1,
    },
  });

  if (!operation.name) {
    throw new Error("Veo did not return an operation name");
  }

  return operation.name;
}

export type VeoJobStatus =
  | { status: "generating" }
  | { status: "completed"; videoUrl: string }
  | { status: "error"; message: string };

export async function checkVeoJob(operationName: string): Promise<VeoJobStatus> {
  const ai = getClient();

  const operation = new GenerateVideosOperation();
  operation.name = operationName;

  const updated = await ai.operations.getVideosOperation({ operation });

  if (!updated.done) {
    return { status: "generating" };
  }

  if (updated.error) {
    return { status: "error", message: "Veo generation failed." };
  }

  const video = updated.response?.generatedVideos?.[0]?.video;
  if (!video) {
    return { status: "error", message: "Veo returned no video." };
  }

  const videoUrl = await resolveVideoUrl(video);
  return { status: "completed", videoUrl };
}

async function resolveVideoUrl(video: {
  uri?: string;
  videoBytes?: string;
  mimeType?: string;
}): Promise<string> {
  const mimeType = video.mimeType ?? "video/mp4";

  if (video.videoBytes) {
    return `data:${mimeType};base64,${video.videoBytes}`;
  }

  if (video.uri) {
    const response = await fetch(video.uri, {
      headers: { [GOOGLE_API_KEY_HEADER]: getApiKey() },
    });
    if (!response.ok) {
      throw new Error(`Failed to download Veo video: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }

  throw new Error("Veo video has neither uri nor videoBytes");
}
