"use client";

interface CameraViewProps {
  videoRef: (node: HTMLVideoElement | null) => void;
  onLoadedMetadata: () => void;
}

export default function CameraView({ videoRef, onLoadedMetadata }: CameraViewProps) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      onLoadedMetadata={onLoadedMetadata}
      className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]"
    />
  );
}
