"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Timing & navigation
-------------------------------------------------- */
const DURATION_MS = 6200;            // langer & meeslepender
const NEXT_STEP   = "/drop/match";   // pas aan naar jouw volgende route

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

  // Veel meer fruit + meer diversiteit
  const fruits = useMemo<FruitSpec[]>(() => {
    const emojis = [
      "🍓","🍊","🍎","🍏","🍇","🍌","🍉","🍑","🍒","🍍","🍋","🍈","🥝","🥭","🥥","🫐",
      "🍐","🍓","🍊","🍎","🍏","🍇","🍌","🍉","🍑","🍒","🍍","🍋","🍈","🥝","🥭","🥥","🫐"
    ];
    // verdeel over de band; offset in %
    return emojis.map((e, i) => ({
      emoji: e,
      offset: (i * 3.1) % 96,           // 0..~96%
      scale: 0.95 + ((i % 5) * 0.03),    // kleine variatie
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
        {/* Rails / rollers */}
        <div className="rails top" />
        <div className="belt">
          {/* Rollers (licht & draaiend) */}
          <div
            className="rollers"
            style={{ animationDuration: `${Math.round(DURATION_MS * 0.95)}ms` }}
          />
          {/* Lichtere band-textuur die beweegt */}
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
                }}
              >
                {f.emoji}
              </span>
            ))}

            {/* De held: Peear die aan het einde van de band naar beneden valt */}
            <span
              className="fruit pear hero"
              // Enter iets later; bereikt dan het einde vlak voor de finale
              style={{ animationDelay: `${Math.round(DURATION_MS * 0.42)}ms` }}
              aria-label="peear"
              role="img"
            >
              🍐
            </span>
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
          width: min(860px, 92vw);
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(6px);
          border-radius: 22px;
          box-shadow: 0 8px 26px rgba(0,0,0,.06);
          border: 1px solid rgba(0,0,0,.06);
          padding: 18px 18px 14px;
          text-align: center;
        }
        .title {
          font-weight: 800;
          letter-spacing: -0.01em;
          font-size: clamp(1.25rem, 2.4vw, 1.9rem);
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
          font-size: .98rem;
          color: rgba(15,81,50,.78);
        }
        .progress {
          margin: 12px auto 2px;
          height: 10px;
          width: min(700px, 86vw);
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

        /* ---- Dominante, lichte conveyor ---- */
        .stage {
          position: relative;
          height: clamp(360px, 58vh, 520px); /* veel dominanter */
          width: 100%;
          display: grid;
          place-items: center;
          margin-top: clamp(16px, 4vh, 28px);
        }
        .rails {
          position: absolute;
          left: 0; right: 0;
          height: 10px;
          background: linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.10));
          box-shadow: 0 2px 6px rgba(0,0,0,.06);
          border-radius: 6px;
        }
        .rails.top    { top: calc(50% - 86px); }
        .rails.bottom { top: calc(50% + 86px); }

        .belt {
          position: absolute;
          left: 4vw; right: 4vw;         /* lekker breed in beeld */
          top: 50%;
          height: 172px;                 /* hoger = dominanter */
          transform: translateY(-50%);
          border-radius: 18px;
          overflow: hidden;
          background: #EAF3E2;           /* ✔︎ lichtere band */
          border: 1px solid #D8E7CD;
          box-shadow:
            0 14px 28px rgba(0,0,0,.10),
            inset 0 1px 0 rgba(255,255,255,.8),
            inset 0 -20px 30px rgba(108,177,90,.08);
        }

        /* Rollers: herhalende highlights die horizontaal bewegen/roteren */
        .rollers {
          position: absolute; inset: 0;
          background:
            radial-gradient(18px 18px at 20px 20px, rgba(255,255,255,.9), rgba(255,255,255,0) 60%) repeat-x,
            radial-gradient(18px 18px at 20px calc(100% - 20px), rgba(255,255,255,.85), rgba(255,255,255,0) 60%) repeat-x;
          background-size: 120px 100%, 120px 100%;
          background-position: 0 0, 60px 0;
          opacity: .45;
          animation-name: rollers;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
        @keyframes rollers {
          from { background-position: 0 0, 60px 0; }
          to   { background-position: 1400px 0, 1460px 0; }
        }

        /* Lichte tread-textuur die mee schuift */
        .belt-surface {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(108,177,90,.18) 0 8px, transparent 8px 28px),
            linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.55));
          mix-blend-mode: multiply;
          animation-name: tread;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          opacity: .9;
        }
        @keyframes tread {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 1400px 0, 0 0; }
        }

        /* Stream van fruit die met de band meebeweegt */
        .belt-stream {
          position: absolute; inset: 0;
          animation: stream linear 1 forwards;
        }
        @keyframes stream {
          from { transform: translateX(0); }
          to   { transform: translateX(70vw); } /* grotere verplaatsing */
        }

        .fruit {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 40px;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,.10));
          transition: transform .2s ease;
        }
        .fruit:hover {
          transform: translateY(calc(-50% - 2px)) scale(1.04);
        }

        /* De held: Peear die aan het einde van de band naar beneden valt */
        .fruit.pear.hero {
          left: 10%;
          font-size: 48px;
          animation:
            hero-enter ${Math.round(DURATION_MS * 0.2)}ms ease-out both,
            hero-drop  ${Math.round(DURATION_MS * 0.42)}ms cubic-bezier(.2,.8,.2,1) ${Math.round(DURATION_MS * 0.78)}ms forwards;
        }
        @keyframes hero-enter {
          from { transform: translateY(-50%) scale(.9); opacity: 0; }
          to   { transform: translateY(-50%) scale(1);   opacity: 1; }
        }
        @keyframes hero-drop {
          0%   { transform: translateY(-50%) rotate(0deg);   opacity: 1; }
          60%  { transform: translateY(130px) rotate(16deg); opacity: 1; }
          100% { transform: translateY(168px) rotate(20deg); opacity: .95; }
        }

        .tray-shadow {
          position: absolute; left: 50%; bottom: calc(50% - 112px);
          width: min(800px, 86vw); height: 18px;
          transform: translateX(-50%);
          background: radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.12), transparent 70%);
          filter: blur(4px);
          opacity: .5;
          pointer-events: none;
        }

        /* Reduced motion: disable complex movement */
        @media (prefers-reduced-motion: reduce) {
          .rollers, .belt-surface, .belt-stream, .fruit.pear.hero, .bar { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
