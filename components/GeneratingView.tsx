import type { WorldPreset } from "@/config/worlds";

interface GeneratingViewProps {
  world: WorldPreset | null;
}

export default function GeneratingView({ world }: GeneratingViewProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black px-6 text-center">
      <p className="animate-pulse text-2xl font-light tracking-[0.3em] text-white">
        CREATING ANOTHER YOU
      </p>
      {world && (
        <p className="text-xs font-light tracking-[0.2em] text-white/50">{world.resultLabel}</p>
      )}
      <p className="text-xs font-light text-white/40">This may take a few moments.</p>
    </div>
  );
}
