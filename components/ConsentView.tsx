"use client";

import { useState } from "react";
import PrivacyDetails from "@/components/PrivacyDetails";

interface ConsentViewProps {
  consentExperience: boolean;
  consentPromotion: boolean;
  onChangeExperience: (value: boolean) => void;
  onChangePromotion: (value: boolean) => void;
  onContinue: () => void;
}

export default function ConsentView({
  consentExperience,
  consentPromotion,
  onChangeExperience,
  onChangePromotion,
  onContinue,
}: ConsentViewProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-black px-6 py-10 text-white">
      <div className="flex w-full max-w-sm flex-1 flex-col items-center gap-6">
        <h1 className="text-lg font-light tracking-[0.3em]">PRIVACY & CONSENT</h1>

        <label className="flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-white/15 p-4 text-left">
          <input
            type="checkbox"
            checked={consentExperience}
            onChange={(event) => onChangeExperience(event.target.checked)}
            className="mt-0.5 h-6 w-6 shrink-0 accent-white"
          />
          <span className="text-sm leading-relaxed text-white/85">
            AI Mirror 체험을 위해 얼굴 이미지를 촬영하고 AI로 처리하는 것에 동의합니다.
          </span>
        </label>

        <label className="flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-white/10 p-4 text-left">
          <input
            type="checkbox"
            checked={consentPromotion}
            onChange={(event) => onChangePromotion(event.target.checked)}
            className="mt-0.5 h-6 w-6 shrink-0 accent-white"
          />
          <span className="text-sm leading-relaxed text-white/60">
            <span className="text-white/40">[선택]</span> 이 체험에서 생성된 이미지 또는 영상을
            AI Mirror 작품 소개, 전시, 연구 기록 또는 홍보에 사용하는 것에 동의합니다.
          </span>
        </label>
        <p className="-mt-3 w-full text-left text-[11px] leading-relaxed text-white/35">
          선택 동의에 동의하지 않아도 AI Mirror 체험에는 아무런 제한이 없습니다.
        </p>

        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-xs font-light tracking-[0.15em] text-white/50 underline underline-offset-4"
        >
          {showDetails ? "닫기" : "자세히 보기 / PRIVACY DETAILS"}
        </button>

        {showDetails && (
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <PrivacyDetails />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!consentExperience}
        className="mt-6 w-full max-w-sm rounded-full bg-white px-8 py-4 text-sm font-medium tracking-[0.2em] text-black transition disabled:cursor-not-allowed disabled:opacity-30"
      >
        CONTINUE
      </button>
    </div>
  );
}
