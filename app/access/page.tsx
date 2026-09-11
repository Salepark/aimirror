"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!code || submitting) return;

    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const redirect = searchParams.get("redirect") || "/";
        router.replace(redirect);
        router.refresh();
        return;
      }

      setError(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-10 bg-black px-6 text-center text-white">
      <div className="space-y-3">
        <h1 className="text-4xl font-light tracking-[0.4em]">AI MIRROR</h1>
        <p className="text-xs font-light tracking-[0.3em] text-white/50">PRIVATE PREVIEW</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <label htmlFor="access-code" className="text-sm font-light tracking-[0.2em] text-white/70">
          ENTER ACCESS CODE
        </label>
        <input
          id="access-code"
          type="password"
          autoFocus
          autoComplete="off"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(false);
          }}
          className="w-64 rounded-full border border-white/30 bg-transparent px-6 py-3 text-center text-sm tracking-[0.3em] text-white outline-none focus:border-white/70"
        />
        <button
          type="submit"
          disabled={!code || submitting}
          className="rounded-full border border-white/60 px-12 py-3 text-sm font-medium tracking-[0.2em] transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          ENTER
        </button>
        {error && (
          <p className="text-xs font-light tracking-[0.15em] text-red-400/80">
            INVALID ACCESS CODE
          </p>
        )}
      </form>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessForm />
    </Suspense>
  );
}
