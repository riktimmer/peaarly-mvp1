// app/fruitpick/match/page.tsx
"use client";

import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function FruitPickMatchPage() {
  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <Suspense fallback={<p className="text-[var(--leaf)]">Loading match…</p>}>
        <MatchClient />
      </Suspense>
    </div>
  );
}

function MatchClient() {
  const params = useSearchParams();
  const topics = params.get("topics")?.split(",") ?? [];

  return (
    <div className="card p-6 bg-white rounded-2xl shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-[var(--pear-green)] grid place-items-center text-white text-xl">
          🙂 
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--pear-green)] leading-tight">
            You matched with Emily
          </h1>
          <p className="text-muted text-sm">Product Manager • Amsterdam</p>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {topics.map((t) => (
            <span key={t} className="badge bg-[var(--cream)] text-[var(--leaf)]">
              🍐 {t}
            </span>
          ))}
        </div>
      )}

      <button className="btn btn-primary w-full mb-3">Start Chat</button>
      <button className="btn btn-secondary w-full">Next Drop</button>
    </div>
  );
}
