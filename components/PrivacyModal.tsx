"use client";

import PrivacyDetails from "@/components/PrivacyDetails";

interface PrivacyModalProps {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 px-6 py-10">
      <div className="flex max-h-full w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-white/10 bg-black p-5">
        <PrivacyDetails />
        <button
          type="button"
          onClick={onClose}
          className="mt-6 self-center rounded-full border border-white/40 px-8 py-2.5 text-xs font-light tracking-[0.2em] text-white/80"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
