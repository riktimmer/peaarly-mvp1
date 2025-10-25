"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Timing & navigation
-------------------------------------------------- */
const DURATION_MS = 6200;
const NEXT_STEP = "/drop/match";

/* -------------------------------------------------
   Fruit-model (emoji op de band)
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

  // ✅ Expliciete emoji’s (geen split) + veel variatie
  const fruits = useMemo<FruitSpec[]>(() => {
    const emojis = [
      "🍓","🍊","🍎","🍏","🍇","🍌","🍉","🍑","🍒","🍍","🍋","🍈","🥝","🥭","🥥","🫐","🍐",
      "🍓","🍊","🍎","🍏","🍇","🍌","🍉","🍑","🍒","🍍","🍋","🍈","🥝","🥭","🥥","🫐","🍐"
    ];
    return emojis.map((e, i) => ({
      emoji: e,
      offset: (i * 3.1) % 96,               // 0..~96%
      scale: 0.95 + ((i % 5) * 0.03),
    }));
  }, []);

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

      {/* Stage: dominante, lichte conveyor */}
      <div className="stage" aria-hidden>
        {/* Rails */}
        <div className="rails top" />
        <div className="belt">
          {/* Lichte band-textuur die subtiel beweegt (geen mix-blend!) */}
          <div
            className="belt-surface"
            style={{ animationDuration: `${Math.round(DURATION_MS * 0.95)}ms` }}
          />

          {/* Fruit items die met de band meeschuiven */}
          <div
            className="belt-stream"
            style={{ animationDuration: `${Math.round(DURATION_MS * 0.95)}ms` }}
          >
            {fruits.map((f, i) => (
              <span
                key={`${f.emoji}-${i}`}
                className="fruit"
                style={{
                  left: `calc(${f.offset}% + ${i * 4}px)`,
                  transform: `translateY(-50%) scale(${f.scale ?? 1})`,
                  // 👉 forceren van kleur-emoji fonts zonder grijze achtergrond
                  fontFamily:
                    '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla","EmojiOne Color","Noto Emoji",sans-serif',
                }}
                aria-hidden
                role="img"
              >
                {f.emoji}
              </span>
            ))}

            {/* (optioneel) Held-🍐 die valt – nu uitgezet om het strak te houden */}
            {/* <span className="fruit pear hero" aria-label="peear" role="img">🍐</span> */}
          </div>
        </div>
        <div className="rails bottom" />

        {/* Vangbak-schaduw onder de band */}
        <div className="tray-shadow" />
      </div>

      {/* screen reader live region */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Styles */}
      <style jsx>{`
        :root {
          --leaf: #0f5132;
          --ink: #0c2a1f;
          --cream: #fafaf2;
        }

        .conveyor-bg {
          background:
            radial-gradient(1200px 800px at 20% -10%, #ecf6df 0%, transparent 55%),
            radial-gradient(900px 700px at 100% 20%, #f0f8e8 0%, transparent 60%),
            linear-gradient(180deg, #f6f8ef 0%, #fafaf2 100%);
        }
        :global(.dark) .conveyor-bg {
          background:
            radial-gradient(1200px 820px at 20% -10%, rgba(34,86,58,0.35), transparent 55%),
            radial-gradient(900px 720px at 100% 20%, rgba(161,98,7,0.18), transparent 60%),
            linear-gradient(180deg, #0f1d14 0%, #183b28 100%);
          --leaf: #c6f6d5;
          --ink: #e7f9ee;
        }

        .container {
          position: relative;
          display: grid;
          place-items: center;
          padding-top: clamp(28px, 6vh, 52px);
        }
        .glass {
          width: min(860px, 92vw);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          border-radius: 22px;
          box-shadow: 0 8px 26px rgba(0,0,0,.06);
          border: 1px solid rgba(0,0,0,.06);
          padding: 18px 18px 14px;
          text-align: center;
        }
        :global(.dark) .glass {
          background: rgba(20,40,30,0.60);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 20px 60px rgba(0,0,0,0.35);
        }

        .title {
          font-weight: 800;
          letter-spacing: -0.01em;
          font-size: clamp(1.25rem, 2.4vw, 1.9rem);
          color: var(--ink);
        }
        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        :global(.dark) .highlight { background: linear-gradient(90deg, #34d399, #bef264); }

        .subtitle { margin-top: 4px; font-size: .98rem; color: rgba(15,81,50,.78); }
        :global(.dark) .subtitle { color: rgba(231,249,238,.8); }

        .progress {
          margin: 12px auto 2px;
          height: 10px;
          width: min(700px, 86vw);
          background: #EFF5E9;
          border-radius: 9999px;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.05);
        }
        .bar {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, #6CB15A, #A7D37C);
          animation: grow linear forwards;
        }
        :global(.dark) .progress { background: rgba(255,255,255,.08); }
        :global(.dark) .bar {
          background: linear-gradient(90deg, #34d399, #f59e0b);
          box-shadow: 0 0 16px rgba(34,197,94,.45);
        }
        @keyframes grow { to { width: 100%; } }

        /* ---- Conveyor ---- */
        .stage {
          position: relative;
          height: clamp(360px, 58vh, 520px);
          width: 100%;
          display: grid; place-items: center;
          margin-top: clamp(16px, 4vh, 28px);
        }
        .rails {
          position: absolute; left: 0; right: 0; height: 10px;
          background: linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.10));
          border-radius: 6px;
        }
        .rails.top    { top: calc(50% - 86px); }
        .rails.bottom { top: calc(50% + 86px); }
        :global(.dark) .rails {
          background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.10));
        }

        .belt {
          position: absolute; left: 4vw; right: 4vw; top: 50%;
          height: 172px; transform: translateY(-50%);
          border-radius: 18px; overflow: hidden;
          background: #EAF3E2; border: 1px solid #D8E7CD;
          box-shadow:
            0 14px 28px rgba(0,0,0,.10),
            inset 0 1px 0 rgba(255,255,255,.8);
        }
        :global(.dark) .belt {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 16px 40px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06);
        }

        /* Subtiele strepen – geen mix-blend zodat emoji schoon blijven */
        .belt-surface {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(34, 139, 34, 0.12) 0 10px,
              transparent 10px 28px
            );
          opacity: 1;
          animation: tread linear forwards;
        }
        @keyframes tread {
          from { background-position: 0 0; }
          to   { background-position: 1400px 0; }
        }
        :global(.dark) .belt-surface {
          background:
            repeating-linear-gradient(
              90deg,
              rgba(52, 211, 153, 0.18) 0 10px,
              transparent 10px 28px
            );
        }

        /* Fruitstroom */
        .belt-stream {
          position: absolute; inset: 0;
          animation: stream linear 1 forwards;
        }
        @keyframes stream {
          from { transform: translateX(0); }
          to   { transform: translateX(70vw); } /* grotere verplaatsing */
        }

        .fruit {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          font-size: 40px;
          /* ❌ géén drop-shadow, géén text-shadow → dus ook géén grijze vlekken */
          filter: none; text-shadow: none;
          transition: transform .2s ease;
        }
        .fruit:hover { transform: translateY(calc(-50% - 2px)) scale(1.04); }

        .tray-shadow {
          position: absolute; left: 50%; bottom: calc(50% - 112px);
          width: min(800px, 86vw); height: 18px; transform: translateX(-50%);
          background: radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.12), transparent 70%);
          filter: blur(4px); opacity: .45; pointer-events: none;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .belt-surface, .belt-stream, .bar { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
