interface CaptureButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export default function CaptureButton({ disabled, onClick }: CaptureButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-white px-10 py-4 text-base font-medium tracking-wide text-black transition disabled:cursor-not-allowed disabled:opacity-40"
    >
      Transform Me
    </button>
  );
}
