"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Timing & navigation
-------------------------------------------------- */
const DURATION_MS = 6400;            // run time (~6.4s) — langer & meeslepender
const NEXT_STEP   = "/drop/match";   // pas aan naar je volgende route

/* -------------------------------------------------
   Juicy fruit SVGs
-------------------------------------------------- */
function Orange({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="og" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFC45A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="34" r="18" fill="url(#og)" />
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E" />
    </svg>
  );
}
function Strawberry({ size = 38 }: { size?: number }) {
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
      </g>
    </svg>
  );
}
function Apple({ size = 40 }: { size?: number }) {
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
function Grape({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {[0,1,2,3,4,5,6].map((i)=>(
        <circle key={i} cx={22 + (i%3)*10} cy={22 + Math.floor(i/3)*10} r="6" fill="#7C3AED" />
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31" />
    </svg>
  );
}
function Banana({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M10 36c10 10 27 12 38 2 3-3 5-6 6-9-2 8-8 15-16 18-12 4-22-1-28-11z"
        fill="#FCD34D" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

/* -------------------------------------------------
   Types & helpers
-------------------------------------------------- */
type Kind = "orange" | "straw" | "apple" | "grape" | "banana";
type FruitSpec = { kind: Kind; size: number; angle: number; ring: 1|2|3 };

const COMP = {
  orange: Orange,
  straw: Strawberry,
  apple: Apple,
  grape: Grape,
  banana: Banana,
} as const;

function Fruit({ spec, radius }: { spec: FruitSpec; radius: number }) {
  const { kind, size, angle, ring } = spec;
  const Comp = COMP[kind];
  const dir = ring === 2 ? -1 : 1; // middelste ring tegengesteld
  return (
    <div
      className={`orbit ring-${ring}`}
      style={
        {
          // @ts-ignore CSS vars
          "--r": `${radius}px`,
          "--angle": `${angle}deg`,
          "--dir": dir,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="fruit">
        <Comp size={size} />
      </div>
    </div>
  );
}

/* -------------------------------------------------
   Page
-------------------------------------------------- */
export default function LoadingPage() {
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => router.push(NEXT_STEP), DURATION_MS);
    return () => clearTimeout(t);
  }, [router]);

  useEffect(() => {
    liveRef.current?.append?.("Matching based on your selected interests…");
  }, []);

  // Bouw 3 ringen met 10–12 fruit per ring
  const fruitRing = useMemo<FruitSpec[]>(() => {
    const kinds: Kind[] = ["orange", "straw", "apple", "grape", "banana"];
    const ringCounts = [12, 12, 12]; // kun je verhogen tot 14/16 voor nog voller
    const out: FruitSpec[] = [];
    ringCounts.forEach((count, ringIdx) => {
      for (let i = 0; i < count; i++) {
        out.push({
          kind: kinds[(i + ringIdx) % kinds.length],
          size: [36, 38, 40, 42][(i + ringIdx) % 4],
          angle: (360 / count) * i,
          ring: (ringIdx + 1) as 1|2|3,
        });
      }
    });
    return out;
  }, []);

  return (
    <main className="min-h-screen fancy-bg text-[color:var(--leaf)]">
      {/* Fullscreen stage */}
      <div className="stage">
        {/* Parallax rings */}
        <div className="ring ring-1">
          {fruitRing.filter(f => f.ring === 1).map((spec, i) => (
            <Fruit key={`r1-${i}`} spec={spec} radius={220} />
          ))}
        </div>
        <div className="ring ring-2">
          {fruitRing.filter(f => f.ring === 2).map((spec, i) => (
            <Fruit key={`r2-${i}`} spec={spec} radius={300} />
          ))}
        </div>
        <div className="ring ring-3">
          {fruitRing.filter(f => f.ring === 3).map((spec, i) => (
            <Fruit key={`r3-${i}`} spec={spec} radius={380} />
          ))}
        </div>

        {/* Center Peear reveal */}
        <div className="peear">
          <span role="img" aria-label="peear">🍐</span>
          <div className="shadow" />
        </div>

        {/* Soft grid gloss */}
        <div className="gridlines" aria-hidden />
      </div>

      {/* Copy & progress — overlay bovenop */}
      <div className="overlay">
        <h1 className="title">We’re crafting your best <span className="highlight">Peear</span> match</h1>
        <p className="subtitle">Dancing data. Fresh chemistry. Almost there…</p>

        <div className="progress">
          <div className="bar" style={{ animationDuration: `${DURATION_MS}ms` }} />
        </div>
      </div>

      {/* SR live */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Page-scoped styles */}
      <style jsx>{`
        :root {
          --leaf: #0f5132;
          --ink: #0c2a1f;
          --lime: #a7d37c;
        }

        .fancy-bg {
          background:
            radial-gradient(1200px 800px at 10% -10%, #e9f6d8 0%, transparent 55%),
            radial-gradient(1000px 700px at 110% 20%, #f0f8e8 0%, transparent 60%),
            linear-gradient(180deg, #f6f8ef 0%, #fafaf2 100%);
          animation: hueShift ${Math.round(DURATION_MS * 1.4)}ms ease-in-out infinite alternate;
        }
        @keyframes hueShift {
          from { filter: hue-rotate(0deg) saturate(1.0); }
          to   { filter: hue-rotate(-8deg) saturate(1.08); }
        }

        .stage {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .ring { position: absolute; inset: 0; }
        .orbit {
          position: absolute;
          width: 0; height: 0;
          transform: rotate(var(--angle));
          filter: drop-shadow(0 8px 18px rgba(0,0,0,.08));
          animation:
            swirl var(--swirlDur) linear var(--swirlDelay, 0ms) infinite,
            converge ${Math.round(DURATION_MS * 0.35)}ms cubic-bezier(.25,.9,.2,1) ${Math.round(DURATION_MS * 0.64)}ms forwards;
        }
        .fruit {
          transform: translateX(var(--r)) rotate(calc(var(--angle) * -1));
          will-change: transform;
        }

        /* ring-speeds + directions (parallax) */
        .ring-1 .orbit { --swirlDur: ${Math.round(DURATION_MS * 1.0)}ms; }
        .ring-2 .orbit { --swirlDur: ${Math.round(DURATION_MS * 0.8)}ms; }
        .ring-3 .orbit { --swirlDur: ${Math.round(DURATION_MS * 1.2)}ms; }

        @keyframes swirl {
          to { transform: rotate(calc(var(--angle) + (var(--dir) * 1turn))); }
        }

        @keyframes converge {
          0%   { transform: rotate(var(--angle)); opacity: 1; }
          100% { transform: rotate(var(--angle)); opacity: .15; }
        }

        .peear {
          position: absolute;
          display: grid;
          place-items: end center;
          inset: 0;
          padding-bottom: 90px;
          opacity: 0;
          animation: reveal ${Math.round(DURATION_MS * 0.35)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.68)}ms forwards;
        }
        .peear > span {
          font-size: 122px;
          transform: translateY(24px) scale(.9);
          filter: drop-shadow(0 10px 24px rgba(0,0,0,.12));
          animation: bounceIn ${Math.round(DURATION_MS * 0.32)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.72)}ms forwards;
        }
        .peear .shadow {
          position: absolute; bottom: 76px; left: 50%;
          width: 128px; height: 18px; border-radius: 9999px;
          transform: translateX(-50%) scaleX(.3);
          background: rgba(0,0,0,.12);
          filter: blur(2px);
          opacity: 0;
          animation: shadowIn ${Math.round(DURATION_MS * 0.3)}ms ease-out ${Math.round(DURATION_MS * 0.76)}ms forwards;
        }
        @keyframes reveal { to { opacity: 1; } }
        @keyframes bounceIn {
          0%   { transform: translateY(28px) scale(.88); }
          70%  { transform: translateY(0)    scale(1.04); }
          100% { transform: translateY(0)    scale(1); }
        }
        @keyframes shadowIn {
          0%   { opacity: 0; transform: translateX(-50%) scaleX(.3); }
          70%  { opacity: .75; transform: translateX(-50%) scaleX(1.05); }
          100% { opacity: .6; transform: translateX(-50%) scaleX(1); }
        }

        .gridlines {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 50% 50%, rgba(108,177,90,.12), transparent 38%),
            repeating-linear-gradient(90deg, rgba(0,0,0,.04) 0 1px, transparent 1px 38px),
            repeating-linear-gradient(0deg,  rgba(0,0,0,.04) 0 1px, transparent 1px 38px);
          mask-image: radial-gradient(circle at 50% 60%, black 45%, transparent 85%);
          opacity: .35;
          animation: gridFade ${Math.round(DURATION_MS * 0.8)}ms ease-in-out forwards;
        }
        @keyframes gridFade {
          0% { opacity: 0; } 25% { opacity: .35; } 100% { opacity: .2; }
        }

        .overlay {
          position: fixed; inset: 0;
          display: grid; place-items: end center;
          padding: 32px 20px 28px;
          pointer-events: none; /* animatie primair; tekst niet klikbaar */
          text-align: center;
          color: var(--leaf);
        }
        .title {
          position: absolute; top: 32px; left: 50%; transform: translateX(-50%);
          font-weight: 800; letter-spacing: -0.01em;
          font-size: clamp(1.3rem, 2.6vw, 2rem);
          text-shadow: 0 2px 10px rgba(255,255,255,.6);
        }
        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .subtitle {
          position: absolute; top: 72px; left: 50%; transform: translateX(-50%);
          font-size: .95rem; color: rgba(15,81,50,.75);
          text-shadow: 0 1px 8px rgba(255,255,255,.7);
        }
        .progress {
          position: relative; width: min(680px, 86vw); height: 10px;
          background: #EFF5E9; border-radius: 9999px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,.04) inset;
        }
        .bar {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, #6CB15A, #A7D37C);
          animation-name: grow; animation-timing-function: cubic-bezier(.22,1,.36,1);
          animation-fill-mode: forwards;
        }
        @keyframes grow { to { width: 100%; } }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .fancy-bg, .orbit, .peear, .gridlines, .bar { animation: none !important; }
          .peear { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
