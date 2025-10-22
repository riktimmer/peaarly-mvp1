"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Timing & navigation
-------------------------------------------------- */
const DURATION_MS = 5200;            // totale duur van de animatie (pas gerust aan)
const NEXT_STEP   = "/drop/match";   // volgende route

/* -------------------------------------------------
   Fruit "on belt"
-------------------------------------------------- */
type FruitSpec = { emoji: string; offset: number; scale?: number };

export default function LoadingConveyor() {
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  // Navigate when the show ends
  useEffect(() => {
    const t = setTimeout(() => router.push(NEXT_STEP), DURATION_MS);
    return () => clearTimeout(t);
  }, [router]);

  // a11y hint
  useEffect(() => {
    liveRef.current?.append?.("We are matching based on your selected interests.");
  }, []);

  // Build a small set of fruits spaced across the belt
  const fruits = useMemo<FruitSpec[]>(
    () => [
      { emoji: "🍓", offset: 0 },
      { emoji: "🍊", offset: 8 },
      { emoji: "🍎", offset: 16 },
      { emoji: "🍇", offset: 24, scale: 1.05 },
      { emoji: "🍌", offset: 32 },
      { emoji: "🍉", offset: 40, scale: 1.1 },
      { emoji: "🍑", offset: 48 },
      { emoji: "🍒", offset: 56 },
      { emoji: "🍍", offset: 64, scale: 1.05 },
      { emoji: "🍋", offset: 72 },
      { emoji: "🍈", offset: 80 },
      { emoji: "🥝", offset: 88 },
    ],
    []
  );

  return (
    <main className="min-h-screen conveyor-bg text-[color:var(--leaf)]">
      {/* Overlay copy */}
      <div className="container">
        <div className="glass">
          <h1 className="title">
            We’re crafting your best <span className="highlight">Peear</span> match
          </h1>
          <p className="subtitle">Fresh chemistry coming off the line…</p>

          {/* Progress synced to duration */}
          <div className="progress">
            <div className="bar" style={{ animationDuration: `${DURATION_MS}ms` }} />
          </div>
        </div>
      </div>

      {/* Stage: full-width conveyor */}
      <div className="stage" aria-hidden>
        {/* Rails / rollers */}
        <div className="rails top" />
        <div className="belt">
          {/* Belt texture (moves) */}
          <div
            className="belt-surface"
            style={{ animationDuration: `${Math.round(DURATION_MS * 0.95)}ms` }}
          />
          {/* Fruit items moving with the belt */}
          <div
            className="belt-stream"
            style={{ animationDuration: `${Math.round(DURATION_MS * 0.95)}ms` }}
          >
            {fruits.map((f, i) => (
              <span
                key={i}
                className="fruit"
                style={{
                  // offset maps fruit along the path; 0..100%-ish
                  left: `calc(${f.offset}% + ${i * 6}px)`,
                  transform: `translateX(0) translateY(0) scale(${f.scale ?? 1})`,
                }}
              >
                {f.emoji}
              </span>
            ))}

            {/* The hero Peear appears late and falls off the edge */}
            <span
              className="fruit pear hero"
              // sync: enters late so it reaches the end near the finale
              style={{
                animationDelay: `${Math.round(DURATION_MS * 0.38)}ms`,
              }}
              aria-label="peear"
              role="img"
            >
              🍐
            </span>
          </div>
        </div>
        <div className="rails bottom" />

        {/* Catch tray shadow */}
        <div className="tray-shadow" />
      </div>

      {/* screen reader live region */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Styles */}
      <style jsx>{`
        :root {
          --leaf: #0f5132;
          --ink: #0c2a1f;
          --lime: #a7d37c;
          --cream: #fafaf2;
        }

        .conveyor-bg {
          background:
            radial-gradient(1200px 800px at 20% -10%, #ecf6df 0%, transparent 55%),
            radial-gradient(900px 700px at 100% 20%, #f0f8e8 0%, transparent 60%),
            linear-gradient(180deg, #f6f8ef 0%, #fafaf2 100%);
        }

        .container {
          position: relative;
          display: grid;
          place-items: center;
          padding-top: clamp(28px, 6vh, 52px);
        }
        .glass {
          width: min(820px, 92vw);
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(6px);
          border-radius: 20px;
          box-shadow: 0 8px 26px rgba(0,0,0,.06);
          border: 1px solid rgba(0,0,0,.06);
          padding: 18px 18px 14px;
          text-align: center;
        }
        .title {
          font-weight: 800;
          letter-spacing: -0.01em;
          font-size: clamp(1.25rem, 2.4vw, 1.8rem);
          color: var(--leaf);
        }
        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .subtitle {
          margin-top: 4px;
          font-size: .96rem;
          color: rgba(15,81,50,.75);
        }
        .progress {
          margin: 12px auto 2px;
          height: 10px;
          width: min(640px, 86vw);
          background: #EFF5E9;
          border-radius: 9999px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,.05) inset;
        }
        .bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #6CB15A, #A7D37C);
          animation: grow linear forwards;
        }
        @keyframes grow { to { width: 100%; } }

        /* ---- Stage / Conveyor ---- */
        .stage {
          position: relative;
          height: clamp(280px, 45vh, 420px);
          width: 100%;
          display: grid;
          place-items: center;
          margin-top: clamp(16px, 4vh, 28px);
        }
        .rails {
          position: absolute;
          left: 0; right: 0;
          height: 10px;
          background: linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.12));
          box-shadow: 0 2px 6px rgba(0,0,0,.08);
          border-radius: 6px;
          transform: translateZ(0);
        }
        .rails.top    { top: calc(50% - 52px); }
        .rails.bottom { top: calc(50% + 52px); }

        .belt {
          position: absolute;
          left: 6vw; right: 6vw;
          top: 50%;
          height: 88px;
          transform: translateY(-50%);
          border-radius: 14px;
          overflow: hidden;
          background: #1d2a1f;
          box-shadow: 0 10px 24px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.08);
        }

        /* Moving tread texture */
        .belt-surface {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(255,255,255,.09) 0 6px, transparent 6px 26px),
            linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
          opacity: .9;
          animation-name: tread;
          animation-timing-function: linear;
          animation-iteration-count: 1; /* loopt 1x voor controle */
          animation-fill-mode: forwards;
        }
        @keyframes tread {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 1200px 0, 0 0; }
        }

        /* Stream van fruit die met de band meebeweegt */
        .belt-stream {
          position: absolute; inset: 0;
          animation: stream linear 1 forwards;
        }
        @keyframes stream {
          from { transform: translateX(0); }
          to   { transform: translateX(56vw); } /* schuift mee naar rechts */
        }

        .fruit {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 34px;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,.12));
          transition: transform .2s ease;
        }
        .fruit:hover {
          transform: translateY(-52%) scale(1.04);
        }

        /* De held: Peear die aan het einde van de band naar beneden valt */
        .fruit.pear.hero {
          left: 8%;
          font-size: 40px;
          /* Deze zit óók op de stream en beweegt daardoor mee naar rechts */
          animation:
            hero-enter ${Math.round(DURATION_MS * 0.18)}ms ease-out both,
            hero-drop ${Math.round(DURATION_MS * 0.38)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.78)}ms forwards;
        }
        @keyframes hero-enter {
          from { transform: translateY(-50%) scale(.92); opacity: 0; }
          to   { transform: translateY(-50%) scale(1);   opacity: 1; }
        }
        /* valt recht naar beneden, terwijl de stream animatie hem tot de rand brengt */
        @keyframes hero-drop {
          0%   { transform: translateY(-50%) rotate(0deg);   opacity: 1; }
          60%  { transform: translateY(95px)  rotate(14deg); opacity: 1; }
          100% { transform: translateY(130px) rotate(18deg); opacity: .92; }
        }

        .tray-shadow {
          position: absolute; left: 50%; bottom: calc(50% - 86px);
          width: min(680px, 80vw); height: 16px;
          transform: translateX(-50%);
          background: radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.12), transparent 70%);
          filter: blur(4px);
          opacity: .5;
          pointer-events: none;
        }

        /* Reduced motion: no moving belt; just fade + short delay */
        @media (prefers-reduced-motion: reduce) {
          .belt-surface, .belt-stream, .fruit.pear.hero { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
