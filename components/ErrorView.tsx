interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black px-6 text-center">
      <p className="text-lg font-medium text-white">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-white px-10 py-4 text-base font-medium tracking-wide text-black"
      >
        Try Again
      </button>
    </div>
  );
}
