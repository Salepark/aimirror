"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  seconds: number;
  onComplete: () => void;
}

export default function Countdown({ seconds, onComplete }: CountdownProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  if (count <= 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="text-[160px] font-thin text-white drop-shadow-lg">{count}</span>
    </div>
  );
}
