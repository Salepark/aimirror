import type { ReactNode } from "react";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium tracking-[0.1em] text-white/80">{title}</p>
      <div className="text-[11px] leading-relaxed text-white/55">{children}</div>
    </div>
  );
}

export default function PrivacyDetails() {
  return (
    <div className="space-y-5 text-left">
      <p className="text-xs font-medium tracking-[0.15em] text-white/90">
        AI Mirror 개인정보 처리 안내
      </p>

      <Section title="1) 처리하는 정보">
        <ul className="list-disc space-y-0.5 pl-4">
          <li>카메라로 촬영한 얼굴 이미지</li>
          <li>AI가 생성한 이미지</li>
          <li>AI가 생성한 영상</li>
          <li>서비스 처리 과정에서 생성되는 임시 식별값(lifeId)</li>
        </ul>
      </Section>

      <Section title="2) 이용 목적">
        <ul className="list-disc space-y-0.5 pl-4">
          <li>AI Mirror 체험 제공</li>
          <li>AI 이미지 및 영상 생성</li>
          <li>생성된 결과의 화면 표시 및 일시적 재생</li>
        </ul>
      </Section>

      <Section title="3) 외부 AI 서비스 사용">
        <p>다음과 같은 외부 AI 서비스가 처리를 위해 사용될 수 있습니다.</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>OpenAI — 이미지 생성</li>
          <li>Google Gemini / Veo — 영상 생성</li>
          <li>fal.ai — 대체 이미지 생성 기능이 사용되는 경우</li>
        </ul>
        <p className="mt-1">처리를 위해 이미지 데이터가 외부 AI 서비스로 전송될 수 있습니다.</p>
      </Section>

      <Section title="4) 저장">
        <ul className="list-disc space-y-0.5 pl-4">
          <li>원본 카메라 촬영 이미지는 AI 처리에 필요한 범위에서만 사용됩니다.</li>
          <li>원본 촬영 이미지를 별도의 영구 사용자 갤러리에 저장하지 않습니다.</li>
          <li>생성 영상은 재생을 위해 제한된 기간 저장될 수 있습니다.</li>
          <li>저장된 생성 영상은 비공개(private) 저장소에 보관됩니다.</li>
        </ul>
        <p className="mt-1">생성 영상의 보관기간 정책은 서비스 운영 단계에서 적용됩니다.</p>
      </Section>

      <Section title="5) 동의 거부">
        <p>
          동의를 거부할 수 있으나 얼굴 이미지를 이용하는 서비스의 특성상
          AI Mirror 체험을 이용할 수 없습니다.
        </p>
      </Section>

      <p className="pt-2 text-[10px] italic leading-relaxed text-white/35">
        AI Mirror는 당신의 얼굴을 소유하지 않습니다.
        <br />
        잠시 다른 삶을 보여줄 뿐입니다.
      </p>
    </div>
  );
}
