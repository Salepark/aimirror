import type { WorldPreset } from "@/config/worlds";

export const IDENTITY_DIRECTIVE = `Use the supplied photograph as the identity reference.

Preserve the person's recognizable facial identity,
age characteristics, ethnicity, distinctive facial proportions,
eyes, nose and mouth.

The result must unmistakably depict the same individual.

Facial identity is the highest preservation priority.

However, do NOT preserve the original clothing,
hairstyle styling, pose, body position,
background, framing or lighting.

Everything except facial identity may be dramatically redesigned.

Do not beautify the person into a generic model.
Do not make the person younger unless the World specifically requires it.

This is not a costume portrait.

Place this same person inside a believable cinematic event
taking place in another time or world.`;

export const CINEMATIC_DIRECTIVE = `Avoid:
passport photography,
ID-photo composition,
plain studio portrait,
static centered pose,
generic AI portrait aesthetics.

Create a cinematic environmental portrait
that suggests a larger story outside the frame.

Same identity.
Completely different life.`;

export function buildOpenAiPrompt(world: WorldPreset): string {
  return [IDENTITY_DIRECTIVE, world.imagePrompt, CINEMATIC_DIRECTIVE].join("\n\n");
}
