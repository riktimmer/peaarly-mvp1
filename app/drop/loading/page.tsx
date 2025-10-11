"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* ── Peer (strakke frisse variant in lijn met andere fruit) ─────────────── */
function PearBig({ size = 110 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="pearG" cx="42%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#CDEB83" />
          <stop offset="100%" stopColor="#4FA45A" />
        </radialGradient>
        <radialGradient id="pearHi" cx="70%" cy="28%" r="24%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.60)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect
        x="30.5"
        y="6"
        width="3"
        height="9"
        rx="1.5"
        fill="#3A6B3F"
        transform="rotate(-12 32 10.5)"
      />
      <path
        d="M33 8c6.8-.6 10.3 2.4 9 6.6-1.2 3.8-6.3 4.7-11 3.2-3-.9-2.8-3.8-.9-6.5 1.3-1.8 1.9-2.9 2.9-3.3z"
        fill="#66A766"
      />

      <path
        d="M32 18
           c 3.2 -5.8 9.3 -7.6 13.8 -4.6
           c 3.0 2.0 4.2 5.1 4.2 9.0
           c 0   3.1 -1.0 5.9 -2.3 8.1
           c 4.1 5.4 6.1 9.8 6.1 16.0
           c 0  13.0 -9.7 22.5 -22.8 22.5
           c -13.1 0 -22.8 -9.5 -22.8 -22.5
           c 0  -6.2 2.0 -10.6 6.1 -16.0
           c -1.3 -2.2 -2.3 -5.0 -2.3 -8.1
           c 0  -3.9 1.2 -7.0 4.2 -9.0
           C 22.7 10.4 28.8 12.2 32 18 Z"
        fill="url(#pearG)"
      />
      <ellipse
        cx="46"
        cy="26"
        rx="8"
        ry="10"
        fill="url(#pearHi)"
        transform="rotate(-12 46 26)"
      />
      <path
        d="M32 18
           c 3.2 -5.8 9.3 -7.6 13.8 -4.6
           c 3.0 2.0 4.2 5.1 4.2 9.0
           c 0   3.1 -1.0 5.9 -2.3 8.1
           c 4.1 5.4 6.1 9.8 6.1 16.0
           c 0  13.0 -9.7 22.5 -22.8 22.5
           c -13.1 0 -22.8 -9.5 -22.8 -22.5
           c 0  -6.2 2.0 -10.6 6.1 -16.0
           c -1.3 -2.2 -2.3 -5.0 -2.3 -8.1
           c 0  -3.9 1.2 -7.0 4.2 -9.0
           C 22.7 10.4 28.8 12.2 32 18 Z"
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.9"
      />
    </svg>
  );
}

/* ── Overige fruitsoorten ───────────────────────────────────────────────── */
function Orange({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="og" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFB547" /><stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="34" r="18" fill="url(#og)" />
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E" />
    </svg>
  );
}
function Strawberry({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="#F43F5E" /><stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#22C55E"/>
      <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="url(#sg)"/>
      <g fill="#FEE2E2" opacity=".8">
        <circle cx="26" cy="35" r="1.2"/><circle cx="32" cy="38" r="1.2"/><circle cx="39" cy="34" r="1.2"/>
        <circle cx="45" cy="39" r="1.2"/><circle cx="21" cy="40" r="1.2"/><circle cx="34" cy="44" r="1.2"/>
      </g>
    </svg>
  );
}
function Apple({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="ag" cx="40%" cy="35%" r="60%">
          <stop offset="0" stopColor="#FF8A8A"/><stop offset="1" stopColor="#EB5757"/>
        </radialGradient>
      </defs>
      <circle cx="26" cy="34" r="16" fill="url(#ag)"/>
      <circle cx="40" cy="34" r="16" fill="#E34D4D"/>
      <path d="M33 17c4-2 7-2 10 0-2 4-5 6-10 6-3-3-3-5 0-6z" fill="#2F7A3E"/>
    </svg>
  );
}
function Grape({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {[0,1,2,3,4,5,6].map((i)=>(
        <circle key={i} cx={22+(i%3)*10} cy={22+Math.floor(i/3)*10} r="6" fill="#7C3AED"/>
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31"/>
    </svg>
  );
}
function Banana({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M10 36c10 10 27 12 38 2 3-3 5-6 6-9-2 8-8 15-16 18-12 4-22-1-28-11z" fill="#FCD34D" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

type Kind = "orange" | "straw" | "apple" | "grape" | "banana";
function Icon({ kind, size }: { kind: Kind; size?: number }) {
  switch (kind) {
    case "orange": return <Orange size={size ?? 44} />;
    case "straw":  return <Strawberry size={size ?? 42} />;
    case "apple":  return <Apple size={size ?? 44} />;
    case "grape":  return <Grape size={size ?? 42} />;
    case "banana": return <Banana size={size ?? 46} />;
  }
}

/* ── Eén vallend fruit ─────────────────────────────────────────────────── */
function FruitFall({ kind, left, delay, dur, size }: { kind: Kind; left: string; delay: number; dur: number; size?: number }) {
  return (
    <div
      className="ff"
      style={{
        left,
        // @ts-ignore
        "--delay": `${delay}ms`,
        "--dur": `${dur}ms`,
        "--sway": `${Math.random() > 0.5 ? 1 : -1}`,
        "--rot": `${Math.random() * 40 - 20}deg`,
      }}
      aria-hidden
    >
      <Icon kind={kind} size={size} />
    </div>
  );
}

/* ── Grote peer die landt ──────────────────────────────────────────────── */
function LandingPear({ onLand }: { onLand: () => void }) {
  useEffect(() => {
    const t = setTimeout(onLand, 2300);
    return () => clearTimeout(t);
  }, [onLand]);
  return (
    <div className="lp" aria-hidden>
      <PearBig />
      <div className="lp-shadow" />
    </div>
  );
}

/* ── Pagina ─────────────────────────────────────────────────────────────── */
export default function LoadingPage() {
  const router = useRouter();
  const [hideOthers, setHideOthers] = useState(false);

  useEffect(() => {
    const to = setTimeout(() => router.push("/drop/match"), 4200);
    return () => clearTimeout(to);
  }, [router]);

  const fruits = useMemo(
    () => [
      { kind: "orange", left: "12%", delay: 0,   dur: 1400 },
      { kind: "grape",  left: "26%", delay: 120, dur: 1500 },
      { kind: "apple",  left: "38%", delay: 240, dur: 1600 },
      { kind: "banana", left: "64%", delay: 320, dur: 1500 },
      { kind: "straw",  left: "78%", delay: 420, dur: 1450 },
      { kind: "orange", left: "53%", delay: 520, dur: 1550 },
      { kind: "grape",  left: "86%", delay: 620, dur: 1500 },
      { kind: "apple",  left: "6%",  delay: 700, dur: 1500 },
      { kind: "straw",  left: "45%", delay: 820, dur: 1550 },
    ],
    []
  );

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <div className="relative overflow-hidden card">
          <div className="text-center px-2 pt-2">
            <h1 className="text-[1.6rem] leading-tight font-extrabold">
              We are picking your match based on your interests…
            </h1>
            <p className="text-muted mt-1 text-[0.95rem]">
              Hang on tight, your peer is on the way!
            </p>
          </div>

          <div className="relative h-72 w-full mt-3">
            <div className={`fruits ${hideOthers ? "fade-out" : ""}`}>
              {fruits.map((f, i) => (
                <FruitFall key={i} kind={f.kind} left={f.left} delay={f.delay} dur={f.dur} />
              ))}
            </div>
            <LandingPear onLand={() => setHideOthers(true)} />
            <div className="ground" />
          </div>
        </div>
      </div>
    </main>
  );
}
