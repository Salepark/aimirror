import type { WorldPreset } from "@/config/worlds";

export const SAME_SHOT_DIRECTIVE = `Use the supplied photograph as the exact starting frame of this clip.

Preserve the exact same composition, camera angle, framing,
background layout, lighting style, clothing and facial identity
throughout the entire clip.

Do not change the scene. Do not cut. Do not reframe.
Do not make the person walk or leave the frame.
Do not make the person speak.
Do not change facial expression dramatically.
Do not make a large head turn.

Human motion should be minimal: subtle breathing, one natural
blink, very slight eye movement, an extremely small head motion,
and slight clothing or hair movement responding to the environment.

Most of the motion should come from the environment around the
person, not from the person themselves.

This is not a new cinematic shot. This is the same still
photograph quietly continuing to exist for a few seconds.`;

export function buildVeoMotionPrompt(world: WorldPreset): string {
  return `${SAME_SHOT_DIRECTIVE}\n\n${world.motionPrompt}`;
}
