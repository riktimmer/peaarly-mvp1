// app/fruitpick/loading/page.tsx
"use client";

import React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FruitPickLoadingPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Suspense fallback={<p className="text-[var(--leaf)]">Loading…</p>}>
        <LoadingClient />
      </Suspense>
    </div>
  );
}

function LoadingClient() {
  const params = useSearchParams();
  const router = useRouter();

  // Voorbeeld: leest topics uit de query (?topics=...)
  const topics = params.get("topics")?.split(",") ?? [];

  React.useEffect(() => {
    // Simuleer laadtijd → hier kun je je fruit-animatie laten draaien
    const t = setTimeout(() => {
      const q = topics.length ? `?topics=${encodeURIComponent(topics.join(","))}` : "";
      router.replace(`/fruitpick/match${q}`);
    }, 1800);
    return () => clearTimeout(t);
  }, [router, topics]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-[var(--stem)] mb-2">
        We’re picking your best match…
      </h2>
      <p className="text-muted mb-6">Hang on tight, your peer is on the way!</p>

      {/* Placeholder voor je vallend-fruit animatie */}
      <div className="w-64 h-40 mx-auto rounded-xl bg-[var(--cream)] shadow-inner flex items-center justify-center">
        <span className="animate-pulse text-3xl">🍐 🍓 🍊 🍇</span>
      </div>
    </div>
  );
}
