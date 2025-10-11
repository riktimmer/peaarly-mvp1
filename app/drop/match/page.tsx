"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/** Kleine helper om interesses uit localStorage te halen */
function useSelectedInterests() {
  const [interests, setInterests] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("peaarly.selectedInterests");
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      setInterests(Array.isArray(arr) ? arr.slice(0, 6) : []);
    } catch {
      setInterests([]);
    }
  }, []);
  return interests;
}

/** Emily avatar – SVG met subtiele float + knipper animatie via CSS */
function EmilyAvatar({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className="mx-auto emily-float"
      aria-hidden
    >
      {/* achtergrondcirkel */}
      <circle cx="80" cy="80" r="72" fill="#F5D48A" />
      {/* nek/borst */}
      <ellipse cx="80" cy="120" rx="48" ry="18" fill="#2E7D3D" />
      {/* hoofdvorm */}
      <path
        d="M80 38c-20 0-34 14-34 34 0 23 15 36 34 36s34-13 34-36c0-20-14-34-34-34z"
        fill="#F3C49C"
      />
      {/* haar */}
      <path
        d="M52 74c-3-25 8-34 28-34 19 0 31 9 28 34-3 15-6 18-6 18s-6-10-22-10-22 10-22 10-3-3-6-18z"
        fill="#643B23"
      />
      {/* ogen (knipper animatie met mask) */}
      <g className="emily-eyes">
        <ellipse cx="62" cy="78" rx="6" ry="4" fill="#2B2B2B" />
        <ellipse cx="98" cy="78" rx="6" ry="4" fill="#2B2B2B" />
      </g>
      {/* wenkbrauwen */}
      <path d="M54 70c6-6 14-6 20 0" stroke="#2B2B2B" strokeWidth="3" fill="none" />
      <path d="M86 70c6-6 14-6 20 0" stroke="#2B2B2B" strokeWidth="3" fill="none" />
      {/* neus */}
      <path d="M80 78c0 7-2 10-6 12" stroke="#CC9F7E" strokeWidth="3" fill="none" />
      {/* mondje */}
      <path d="M66 102c9 6 19 6 28 0" stroke="#9D533B" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* oor(tjes) */}
      <circle cx="44" cy="86" r="6" fill="#E9B690" />
      <circle cx="116" cy="86" r="6" fill="#E9B690" />
    </svg>
  );
}

export default function MatchPage() {
  const interests = useSelectedInterests();

  // dummy terugval als iemand direct navigeert naar /drop/match
  const fallback = useMemo(
    () => ["Creative", "Funny", "Leadership", "Problem solving"],
    []
  );

  const tags = interests.length ? interests : fallback;

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <section className="card relative overflow-hidden">
          <header className="text-center mb-4">
            <h1 className="text-[1.35rem] font-extrabold leading-tight">
              You matched with
            </h1>
            <div className="text-[1.6rem] font-extrabold -mt-1">Emily</div>
          </header>

          <EmilyAvatar />

          {/* interesses/chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(46,125,61,0.12)] text-[color:var(--leaf)] font-semibold text-[0.95rem]"
              >
                {/* klein fruit-icoon per tag voor playful feel */}
                <span aria-hidden>🍐</span>
                {t}
              </span>
            ))}
            {/* klein rond “+” bubble als er meer is */}
            {tags.length > 4 && (
              <span className="w-6 h-6 rounded-full bg-[rgba(46,125,61,0.12)] grid place-items-center font-bold">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* call-to-actions */}
          <div className="mt-6 space-y-3 px-2">
            <button
              type="button"
              className="btn-primary w-full text-[1.15rem] py-3 rounded-2xl"
              onClick={() => alert("Opening chat with Emily… (stub)")}
            >
              Start Chat
            </button>

            <Link
              href="/drop/select"
              className="block text-center w-full bg-[#F5D48A] hover:brightness-95 transition rounded-2xl py-3 font-extrabold text-[1.05rem]"
            >
              Next Drop
            </Link>
          </div>

          {/* subtiele footnote */}
          <p className="text-center text-muted text-sm mt-4">
            Based on your interests:{" "}
            <span className="font-semibold">
              {tags.join(" · ")}
            </span>
          </p>
        </section>
      </div>
    </main>
  );
}
