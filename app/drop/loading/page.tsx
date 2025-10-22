"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Timing & navigation
-------------------------------------------------- */
const DURATION_MS = 3600;          // totale duur van de animatie (~3.6s)
const NEXT_STEP = "/drop/match";   // pas aan naar jouw volgende route

/* -------------------------------------------------
   Minimal, juicy fruit SVGs
-------------------------------------------------- */
function Orange({ size = 42 }: { size?: number }) {
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
function Strawberry({ size = 40 }: { size?: number }) {
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
function Apple({ size = 42 }: { size?: number }) {
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
function Grape({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {[0,1,2,3,4,5,6].map((i)=>(
        <circle key={i} cx={22 + (i%3)*10} cy={22 + Math.floor(i/3)*10} r="6" fill="#7C3AED" />
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31" />
    </svg>
  );
}
function Banana({ size = 44 }: { size?: number }) {
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
type FruitSpec = { kind: Kind; size: number; angle: number };

function Fruit({ spec, radius }: { spec: FruitSpec; radius: number }) {
  const { kind, size, angle } = spec;
  const Comp =
    kind === "orange" ? Orange :
    kind === "straw"  ? Strawberry :
    kind === "apple"  ? Apple :
    kind === "grape"  ? Grape :
    Banana;

  return (
    <div
      className="orbit"
      style={
        {
          // @ts-ignore custom CSS vars
          "--r": `${radius}px`,
          "--angle": `${angle}deg`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="fruit"><Comp size={size} /></div>
    </div>
  );
}

/* -------------------------------------------------
   Page
-------------------------------------------------- */
export default function LoadingPage() {
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  // Navigate after the show
  useEffect(() => {
    const t = setTimeout(() => router.push(NEXT_STEP), DURATION_MS);
    return () => clearTimeout(t);
  }, [router]);

  useEffect(() => {
    liveRef.current?.append?.("Matching based on your selected interests…");
  }, []);

  // Constellation: even spread around the circle
  const fruitRing = useMemo<FruitSpec[]>(() => {
    const kinds: Kind[] = ["orange", "straw", "apple", "grape", "banana"];
    const N = 10;
    return Array.from({ length: N }).map((_, i) => ({
      kind: kinds[i % kinds.length],
      size: [38, 40, 42, 44][i % 4],
      angle: (360 / N) * i,
    }));
  }, []);

  return (
    <main className="min-h-screen fancy-bg text-[color:var(--leaf)]">
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-12">
        {/* Glass card */}
        <div className="rounded-3xl bg-white/80 shadow-sm ring-1 ring-black/5 overflow-hidden backdrop-blur-sm">
          <div className="px-6 pt-8 text-center">
            <h1 className="text-[1.7rem] md:text-[1.9rem] font-extrabold leading-tight">
              We’re crafting your best <span className="highlight">Peear</span> match
            </h1>
            <p className="text-[color:var(--ink)]/70 mt-1">
              Tuning for chemistry, goals, and growth.
            </p>

            {/* Synced progress */}
            <div className="mt-4 h-2 w-full bg-[#EFF5E9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6CB15A] animate-progress"
                style={{ animationDuration: `${DURATION_MS}ms` }}
              />
            </div>
          </div>

          {/* Stage */}
          <div className="relative h-[360px] md:h-[420px]">
            {/* Orbiting fruit that swirl and then converge */}
            <div className="stage">
              {fruitRing.map((spec, idx) => (
                <Fruit key={idx} spec={spec} radius={140} />
              ))}

              {/* Central Peear reveal */}
              <div className="peear">
                <span role="img" aria-label="peear">🍐</span>
                <div className="shadow" />
              </div>

              {/* Subtle grid for polish */}
              <div className="gridlines" aria-hidden />
            </div>
          </div>

          <div className="px-6 pb-8 text-center text-xs text-[color:var(--ink)]/60">
            Matching based on your interests… almost there.
          </div>

          {/* Screenreader live updates */}
          <div ref={liveRef} aria-live="polite" className="sr-only" />
        </div>
      </div>

      {/* Styles scoped to this page */}
      <style jsx>{`
        :root {
          --leaf: #0f5132;
          --ink: #0c2a1f;
          --cream: #fafaf2;
          --lime: #a7d37c;
        }

        .fancy-bg {
          background: radial-gradient(1200px 800px at 20% -10%, #ecf6df 0%, transparent 50%),
                      radial-gradient(900px 700px at 100% 20%, #f0f8e8 0%, transparent 55%),
                      linear-gradient(180deg, #f6f8ef 0%, #fafaf2 100%);
          animation: hue ${Math.round(DURATION_MS * 1.2)}ms ease-in-out infinite alternate;
        }
        @keyframes hue {
          0% { filter: hue-rotate(0deg) saturate(1); }
          100% { filter: hue-rotate(-6deg) saturate(1.05); }
        }

        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Stage */
        .stage { position: absolute; inset: 0; display: grid; place-items: center; }
        .gridlines {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 50% 50%, rgba(108,177,90,.12), transparent 35%),
            repeating-linear-gradient(90deg, rgba(0,0,0,.04) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(0deg, rgba(0,0,0,.04) 0 1px, transparent 1px 40px);
          mask-image: radial-gradient(circle at 50% 60%, black 45%, transparent 85%);
          opacity: .6;
          animation: fadeGrid ${Math.round(DURATION_MS * 0.8)}ms ease-in-out forwards;
        }
        @keyframes fadeGrid {
          0% { opacity: 0; }
          25% { opacity: .6; }
          100% { opacity: .25; }
        }

        /* Orbital fruits */
        .orbit {
          position: absolute; width: 0; height: 0;
          transform: rotate(var(--angle));
          animation:
            swirl ${Math.round(DURATION_MS * 0.45)}ms cubic-bezier(.22,1,.36,1) 50ms forwards,
            converge ${Math.round(DURATION_MS * 0.35)}ms cubic-bezier(.25,.9,.2,1) ${Math.round(DURATION_MS * 0.48)}ms forwards,
            outfade ${Math.round(DURATION_MS * 0.12)}ms linear ${Math.round(DURATION_MS * 0.83)}ms forwards;
        }
        .fruit {
          transform: translateX(var(--r)) rotate(calc(var(--angle) * -1));
          animation: spin ${Math.round(DURATION_MS * 0.55)}ms linear infinite;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,.08));
        }
        @keyframes swirl {
          0% { transform: rotate(var(--angle)); }
          100% { transform: rotate(calc(var(--angle) + 380deg)); }
        }
        @keyframes converge {
          0% { }
          100% { transform: rotate(calc(var(--angle) + 380deg)); }
        }
        @keyframes outfade {
          to { opacity: 0; }
        }
        @keyframes spin {
          to { transform: translateX(var(--r)) rotate(calc(var(--angle) * -1 + 1turn)); }
        }

        /* Peear reveal */
        .peear {
          position: absolute; inset: 0; display: grid; place-items: end center;
          padding-bottom: 78px; opacity: 0;
          animation: showPeear ${Math.round(DURATION_MS * 0.34)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.68)}ms forwards;
        }
        .peear > span {
          font-size: 108px; line-height: 1;
          transform: translateY(20px) scale(.9);
          filter: drop-shadow(0 8px 20px rgba(0,0,0,.10));
          animation: bounceIn ${Math.round(DURATION_MS * 0.32)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.72)}ms forwards;
        }
        .peear .shadow {
          position: absolute; bottom: 64px; left: 50%; width: 110px; height: 16px;
          transform: translateX(-50%) scaleX(.3);
          border-radius: 9999px; background: rgba(0,0,0,.10);
          filter: blur(2px);
          opacity: 0;
          animation: shadowIn ${Math.round(DURATION_MS * 0.3)}ms ease-out ${Math.round(DURATION_MS * 0.76)}ms forwards;
        }
        @keyframes showPeear { to { opacity: 1; } }
        @keyframes bounceIn {
          0%   { transform: translateY(26px) scale(.88); }
          70%  { transform: translateY(0)    scale(1.03); }
          100% { transform: translateY(0)    scale(1); }
        }
        @keyframes shadowIn {
          0%   { opacity: 0; transform: translateX(-50%) scaleX(.3); }
          70%  { opacity: .7; transform: translateX(-50%) scaleX(1.05); }
          100% { opacity: .55; transform: translateX(-50%) scaleX(1); }
        }

        /* Progress animation */
        .animate-progress {
          animation-name: grow;
          animation-timing-function: cubic-bezier(.22,1,.36,1);
          animation-fill-mode: forwards;
          width: 0%;
        }
        @keyframes grow { to { width: 100%; } }

        /* Reduced-motion: keep it classy without motion */
        @media (prefers-reduced-motion: reduce) {
          .orbit, .fruit, .peear, .gridlines { animation: none !important; }
          .fancy-bg { animation: none !important; }
          .stage { display: grid; place-items: center; }
          .peear { opacity: 1; }
          .peear > span { transform: none; }
        }
      `}</style>
    </main>
  );
}
