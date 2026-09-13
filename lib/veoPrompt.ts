import type { WorldPreset } from "@/config/worlds";

export const SAME_SHOT_DIRECTIVE = `Use the supplied photograph as the exact starting frame of this 8-second clip.

This is one continuous cinematic shot — never a new scene.
Keep the same person, the same face, the same world and the same
location for the entire 8 seconds.

Do not cut. Do not jump to a different place.
Do not turn the subject into a different person.
Do not make the person speak or show dialogue.
Do not distort or deform the subject's face or body.

The subject should perform one short, clear, believable action
appropriate to their world — not stay frozen, but also not move
erratically. Camera movement, if any, should be a slow push-in,
pull-back, or gentle tracking move that matches the mood of the
world.

Shape the 8 seconds as a single small scene:
- 0-2s: continue naturally from the starting frame, settling into motion.
- 2-6s: the main cinematic action for this world happens.
- 6-8s: the action settles into a natural resting beat, as if the shot
  could continue a moment longer.

The person's facial identity must remain clearly recognizable as the
same individual from the starting frame throughout the entire clip.`;

export function buildVeoMotionPrompt(world: WorldPreset): string {
  return `${SAME_SHOT_DIRECTIVE}\n\n${world.motionPrompt}`;
}
