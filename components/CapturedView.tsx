interface CapturedViewProps {
  dataUrl: string;
  onRetry: () => void;
}

export default function CapturedView({ dataUrl, onRetry }: CapturedViewProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
      <p className="absolute top-10 text-sm font-light tracking-[0.3em] text-white/80">
        THIS IS YOU
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt="Captured portrait"
        className="max-h-full max-w-full object-contain"
      />
      <button
        type="button"
        onClick={onRetry}
        className="absolute bottom-12 rounded-full bg-white px-10 py-4 text-base font-medium tracking-wide text-black"
      >
        Try Again
      </button>
    </div>
  );
}
