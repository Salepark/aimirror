import type { WorldPreset } from "@/config/worlds";

export function getRandomWorld(worlds: WorldPreset[], excludeIds: string[] = []): WorldPreset {
  const candidates = worlds.filter((world) => !excludeIds.includes(world.id));

  const pool = candidates.length > 0 ? candidates : worlds;
  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
}

// Dev convenience: force a world via ?world=<id> for testing individual presets.
// Falls back to a random pick when absent or the id doesn't match a preset.
function getDebugWorldId(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("world");
}

export function selectWorld(worlds: WorldPreset[], excludeIds: string[] = []): WorldPreset {
  const debugId = getDebugWorldId();
  const debugWorld = debugId ? worlds.find((world) => world.id === debugId) : undefined;

  return debugWorld ?? getRandomWorld(worlds, excludeIds);
}
