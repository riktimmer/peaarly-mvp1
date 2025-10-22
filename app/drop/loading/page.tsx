"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* ---------------------------------------------
   Brand timing & next step
---------------------------------------------- */
const DURATION_MS = 3200;               // totale animatieduur (~3.2s)
const NEXT_STEP = "/drop/match";        // pas aan indien jouw volgende route anders is

/* ---------------------------------------------
   Fruit SVGs (licht, kleurrijk)
---------------------------------------------- */
function Orange({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="og" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFB547" />
          <stop offset="100%" stopColor="#F59E0B" />
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
          <stop offset="0" stopColor="#F43F5E" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#22C55E" />
      <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="url(#sg)" />
      <g fill="#FEE2E2" opacity=".85">
        <circle cx="26" cy="35" r="1.2" /><circle cx="32" cy="38" r="1.2" />
        <circle cx="39" cy="34" r="1.2" /><circle cx="45" cy="39" r="1.2" />
        <circle cx="21" cy="40" r="1.2" /><circle cx="34" cy="44" r="1.2" />
      </g>
    </svg>
  );
}
function Apple({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="ag" cx="40%" cy="35%" r="60%">
          <stop offset="0" stopColor="#FF8A8A" />
          <stop offset="1" stopColor="#EB5757" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="34" r="16" fill="url(#ag)" />
      <circle cx="40" cy="34" r="16" fill="#E34D4D" />
      <path d="M33 17c4-2 7-2 10 0-2 4-5 6-10 6-3-3-3-5 0-6z" fill="#2F7A3E" />
    </svg>
  );
}
function Grape({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {[0,1,2,3,4,5,6].map((i)=>(
        <circle key={i} cx={22 + (i%3)*10} cy={22 + Math.floor(i/3)*10} r="6" fill="#7C3AED" />
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31" />
    </svg>
  );
}
function Banana({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M10 36c10 10 27 12 38 2 3-3 5-6 6-9-2 8-8 15-16 18-12 4-22-1-28-11z"
        fill="#FCD34D" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

/* ---------------------------------------------
   Types & helpers
---------------------------------------------- */
type Kind = "orange" | "straw" | "apple" | "grape" | "banana";
type FruitItem = { kind: Kind; left: string; delay: number; dur: number; size?: number };

function FruitIcon({ kind, size }: { kind: Kind; size?: number }) {
  switch (kind) {
    case "orange": return <Orange size={size ?? 44} />;
    case "straw":  return <Strawberry size={size ?? 42} />;
    case "apple":  return <Apple size={size ?? 44} />;
    case "grape":  return <Grape size={size ?? 42} />;
    case "banana": return <Banana size={size ?? 46} />;
  }
}

/* ---------------------------------------------
   Falling Fruit element
---------------------------------------------- */
function FruitFall({ kind, left, delay, dur, size }: FruitItem) {
  return (
    <div
      className="ff"
      style={
        {
          left,
          // @ts-ignore custom props for CSS var
          "--delay": `${delay}ms`,
          "--dur": `${dur}ms`,
          "--sway": Math.random() > 0.5 ? 1 : -1,
          "--rot": `${Math.floor(Math.random() * 36 - 18)}deg`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <FruitIcon kind={kind} size={size} />
    </div>
  );
}

/* ---------------------------------------------
   Big Peear landing (emoji)
---------------------------------------------- */
function LandingPeear() {
  return (
    <div className="lp" aria-hidden>
      <span className="peear-emoji" role="img" aria-label="peear">🍐</span>
      <div className="lp-shadow" />
    </div>
  );
}

/* ---------------------------------------------
   Page
---------------------------------------------- */
export default function LoadingPage() {
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  // Navigate after animation completes
  useEffect(() => {
    const t = setTimeout(() => {
      router.push(NEXT_STEP);
    }, DURATION_MS);
    return () => clearTimeout(t);
  }, [router]);

  // A11y live update
  useEffect(() => {
    liveRef.current?.append?.("Matching based on your interests…");
  }, []);

  const fruits = useMemo<FruitItem[]>(
    () => [
      { kind: "orange", left: "12%", delay: 20,  dur: 1150 },
      { kind: "grape",  left: "26%", delay: 160, dur: 1250 },
      { kind: "apple",  left: "38%", delay: 260, dur: 1200 },
      { kind: "banana", left: "64%", delay: 360, dur: 1150 },
      { kind: "straw",  left: "78%", delay: 440, dur: 1180 },
      { kind: "orange", left: "53%", delay: 520, dur: 1240 },
      { kind: "grape",  left: "86%", delay: 620, dur: 1200 },
      { kind: "apple",  left: "6%",  delay: 700, dur: 1180 },
      { kind: "straw",  left: "45%", delay: 820, dur: 1220 },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F7EE] to-[#FAFAF2] text-[color:var(--leaf)]">
      <div className="max-w-xl mx-auto px-5 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 shadow-sm ring-1 ring-black/5">
          <div className="text-center px-4 pt-6">
            <h1 className="text-2xl md:text-[1.65rem] leading-tight font-extrabold">
              We’re picking your best Peear match…
            </h1>
            <p className="text-[color:var(--ink)]/70 mt-1">
              Hang tight — fresh connections inbound.
            </p>

            {/* Progress bar (sync met DURATION_MS) */}
            <div className="mt-4 h-2 w-full bg-[#EFF5E9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#A7D37C] animate-progress"
                style={{ animationDuration: `${DURATION_MS}ms` }}
              />
            </div>
          </div>

          {/* Animation stage */}
          <div className="relative h-80 w-full mt-4">
            <div className="fruits">
              {fruits.map((f, i) => (
                <FruitFall key={i} {...f} />
              ))}
            </div>
            <LandingPeear />
            <div className="ground" />
          </div>

          {/* A11y live region */}
          <div ref={liveRef} aria-live="polite" className="sr-only" />

          <div className="px-4 pb-6 text-center text-xs text-[color:var(--ink)]/60">
            Matching based on your selected interests…
          </div>
        </div>
      </div>

      {/* Styles scoped to this page */}
      <style jsx>{`
        :root {
          --leaf: #0f5132;
          --cream: #fafaf2;
        }

        .fruits { position: absolute; inset: 0; pointer-events: none; }
        .ff {
          position: absolute; top: -64px;
          animation: fall var(--dur) ease-in var(--delay) forwards,
                     sway calc(var(--dur) * 1.1) ease-in-out var(--delay) forwards,
                     spin var(--dur) linear var(--delay) forwards;
          transform: translateX(0) translateY(0) rotate(var(--rot));
        }

        .lp {
          position: absolute; left: 50%; bottom: 68px; transform: translateX(-50%);
          animation: peear-drop ${Math.round(DURATION_MS * 0.55)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS*0.15)}ms forwards;
        }
        .peear-emoji { display: block; font-size: 96px; line-height: 1; filter: drop-shadow(0 6px 14px rgba(0,0,0,.08)); }
        .lp-shadow {
          position: absolute; left: 50%; bottom: -6px; transform: translateX(-50%);
          width: 88px; height: 14px; border-radius: 9999px; background: rgba(0,0,0,.08);
          animation: shadow ${Math.round(DURATION_MS * 0.55)}ms ease-out ${Math.round(DURATION_MS*0.15)}ms forwards;
        }

        .ground {
          position: absolute; left: 0; right: 0; bottom: 62px; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #E5EEDC 20%, #E5EEDC 80%, transparent 100%);
        }

        @keyframes fall {
          to { transform: translateY(320px) rotate(var(--rot)); opacity: 1; }
        }
        @keyframes sway {
          from { transform: translateX(0) translateY(0) rotate(var(--rot)); }
          to   { transform: translateX(calc(var(--sway) * 18px)) translateY(320px) rotate(var(--rot)); }
        }
        @keyframes spin {
          to { transform: translateX(calc(var(--sway) * 18px)) translateY(320px) rotate(calc(var(--sway) * 1turn)); }
        }

        @keyframes peear-drop {
          0%   { transform: translate(-50%, -220px) scale(.85); }
          70%  { transform: translate(-50%, 0) scale(1.02); }
          100% { transform: translate(-50%, 0) scale(1); }
        }
        @keyframes shadow {
          0%   { transform: translateX(-50%) scaleX(.3); opacity: .0; }
          70%  { transform: translateX(-50%) scaleX(1.05); opacity: .7; }
          100% { transform: translateX(-50%) scaleX(1); opacity: .55; }
        }
        .animate-progress {
          animation-name: grow;
          animation-timing-function: cubic-bezier(.22,1,.36,1);
          animation-fill-mode: forwards;
          width: 0%;
        }
        @keyframes grow { to { width: 100%; } }

        /* Reduced motion: no fancy moves, just timed progress */
        @media (prefers-reduced-motion: reduce) {
          .ff, .lp, .lp-shadow { animation: none !important; }
          .fruits { display: none; }
        }
      `}</style>
    </main>
  );
}
