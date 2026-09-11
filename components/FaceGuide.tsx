export default function FaceGuide() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6">
      <div className="h-[58vh] max-h-[520px] w-[38vh] max-w-[340px] rounded-[50%] border-2 border-white/70" />
      <p className="text-sm font-light tracking-wide text-white/80">
        Step into the frame
      </p>
    </div>
  );
}
