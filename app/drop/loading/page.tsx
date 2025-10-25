"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

/* ---------------------------------------------
   Timing & routing
---------------------------------------------- */
const DURATION_MS = 6200;
const NEXT_STEP = "/drop/match";

/* ---------------------------------------------
   Component
---------------------------------------------- */
export default function LoadingConveyor() {
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => router.push(NEXT_STEP), DURATION_MS);
    return () => clearTimeout(t);
  }, [router]);

  useEffect(() => {
    liveRef.current?.append?.("We are matching based on your selected interests.");
  }, []);

  // ❗ Expliciete emoji-array (geen split!)
  const EMOJIS = useMemo(
    () => [
      "🍓", "🍊", "🍎", "🍏", "🍇", "🍌", "🍉", "🍑", "🍒", "🍍",
      "🍋", "🍈", "🥝", "🥭", "🥥", "🫐", "🍐"
    ],
    []
  );

  // 3 rijen met verschillende snelheden
  const ROWS = useMemo(
    () => [
      { id: "row-a", speed: 1.00, size: 44, y: "28%" },
      { id: "row-b", speed: 0.85, size: 40, y: "50%" },
      { id: "row-c", speed: 1.15, size: 36, y: "72%" },
    ],
    []
  );

  const TILES_PER_ROW = 56; // vult ruim 200% breedte

  return (
    <main className="min-h-screen conveyor-bg text-[color:var(--ink)]">
      {/* Koptekst / Glass */}
      <div className="container">
        <div className="glass">
          <h1 className="title">
            We’re crafting your best <span className="highlight">Peear</span> match
          </h1>
          <p className="subtitle">Fresh chemistry coming off the line…</p>
          <div className="progress">
            <div className="bar" style={{ animationDuration: `${DURATION_MS}ms` }} />
          </div>
        </div>
      </div>

      {/* Conveyor */}
      <div className="stage" aria-hidden>
        <div className="rails top" />
        <div className="belt">
          <div className="belt-surface" />
          {ROWS.map((row, rIndex) => (
            <div
              key={row.id}
              className="row"
              style={
                {
                  "--row-y": row.y,
                  "--row-size": `${row.size}px`,
                  "--row-dur": `${Math.round(DURATION_MS * 1.2 * (2.1 - row.speed))}ms`,
                } as React.CSSProperties
              }
            >
              {/* Twee stripes achter elkaar → naadloze loop */}
              {[0, 1].map((seg) => (
                <div className="rowStripe" key={seg}>
                  {Array.from({ length: TILES_PER_ROW }).map((_, i) => {
                    const fruit = EMOJIS[(i + rIndex * 5 + seg * 13) % EMOJIS.length];
                    return (
                      <span
                        key={`${row.id}-${seg}-${i}`}
                        className="fruit"
                        style={
                          {
                            // Zorgt dat kleur-emoji fonts worden gebruikt
                            fontFamily:
                              'system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "EmojiOne Color", "Noto Emoji", sans-serif',
                            // kleine variatie/jiggle
                            "--jiggle-delay": `${(i % 12) * 80}ms`,
                            "--spin-delay": `${(i % 10) * 120}ms`,
                          } as React.CSSProperties
                        }
                        aria-hidden
                        role="img"
                      >
                        {fruit}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="rails bottom" />
        <div className="tray-shadow" />
      </div>

      {/* SR live region */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Styles */}
      <style jsx>{`
        :root {
          --ink: #0e261c;
          --leaf: #0f5132;
          --cream: #fafaf2;
          --soft: #eaf3e2;
        }

        /* ---------- Backgrounds ---------- */
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
          --ink: #e7f9ee;
          --leaf: #c6f6d5;
          --soft: rgba(255,255,255,0.06);
        }

        /* ---------- Glass Card ---------- */
        .container {
          position: relative;
          display: grid;
          place-items: center;
          padding-top: clamp(28px, 6vh, 52px);
        }
        .glass {
          width: min(860px, 92vw);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(6px);
          border-radius: 22px;
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.06);
          padding: 18px 18px 14px;
          text-align: center;
        }
        :global(.dark) .glass {
          background: rgba(15, 29, 20, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04) inset,
            0 20px 60px rgba(0, 0, 0, 0.35),
            0 0 40px rgba(16, 185, 129, 0.15);
          backdrop-filter: blur(10px);
        }

        .title {
          font-weight: 800;
          letter-spacing: -0.01em;
          font-size: clamp(1.25rem, 2.4vw, 1.9rem);
          color: var(--ink);
        }
        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        :global(.dark) .highlight {
          background: linear-gradient(90deg, #34d399, #bef264);
        }
        .subtitle {
          margin-top: 4px;
          font-size: 0.98rem;
          color: rgba(15, 81, 50, 0.78);
        }
        :global(.dark) .subtitle {
          color: rgba(231, 249, 238, 0.8);
        }

        .progress {
          margin: 12px auto 2px;
          height: 10px;
          width: min(700px, 86vw);
          background: #eff5e9;
          border-radius: 9999px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) inset;
        }
        .bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          animation: grow linear forwards;
        }
        :global(.dark) .progress {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
        }
        :global(.dark) .bar {
          background: linear-gradient(90deg, #34d399, #f59e0b);
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.5);
        }
        @keyframes grow { to { width: 100%; } }

        /* ---------- Stage / Conveyor ---------- */
        .stage {
          position: relative;
          height: clamp(380px, 58vh, 540px);
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
        .rails.top { top: calc(50% - 96px); }
        .rails.bottom { top: calc(50% + 96px); }
        :global(.dark) .rails {
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.08));
          box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset;
        }

        .belt {
          position: absolute;
          left: 4vw; right: 4vw;
          top: 50%;
          height: 192px;
          transform: translateY(-50%);
          border-radius: 22px;
          overflow: hidden;
          background: #eaf3e2;
          border: 1px solid #d8e7cd;
          box-shadow:
            0 14px 28px rgba(0,0,0,.10),
            inset 0 1px 0 rgba(255,255,255,.8),
            inset 0 -20px 30px rgba(108,177,90,.08);
        }
        :global(.dark) .belt {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 0 48px rgba(16,185,129,0.18);
        }

        .belt-surface {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(108,177,90,.18) 0 8px, transparent 8px 28px),
            linear-gradient(180deg, rgba(255,255,255,.8), rgba(255,255,255,.5));
          mix-blend-mode: multiply;
          opacity: .9;
          animation: surface 7s linear infinite;
        }
        @keyframes surface {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 1400px 0, 0 0; }
        }
        :global(.dark) .belt-surface {
          background:
            repeating-linear-gradient(90deg, rgba(52,211,153,.2) 0 8px, transparent 8px 28px),
            linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
          mix-blend-mode: normal;
          opacity: 1;
        }

        /* ---------- Fruit Rows ---------- */
        .row {
          position: absolute; left: 0; right: 0; top: var(--row-y);
          height: var(--row-size);
          transform: translateY(-50%);
          pointer-events: none;
          display: flex;
        }
        .rowStripe {
          width: 200%;
          display: flex; align-items: center;
          gap: 14px; padding-left: 14px;
          animation: stripe var(--row-dur) linear infinite;
        }
        @keyframes stripe {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .fruit {
          display: inline-block;
          font-size: calc(var(--row-size) * 0.9);
          filter: drop-shadow(0 8px 18px rgba(0,0,0,.12));
          transform-origin: 50% 60%;
          animation: jiggle 1.8s ease-in-out infinite alternate;
          animation-delay: var(--jiggle-delay);
        }
        @keyframes jiggle {
          0%   { transform: translateY(-2px) rotate(-1.5deg); }
          100% { transform: translateY( 2px) rotate( 1.5deg); }
        }
        .fruit:nth-child(7n) {
          animation:
            jiggle 1.8s ease-in-out infinite alternate,
            spin 6.5s ease-in-out infinite;
          animation-delay: var(--jiggle-delay), var(--spin-delay);
        }
        @keyframes spin {
          0%, 92% { transform: rotate(0deg); }
          96%     { transform: rotate(12deg); }
          100%    { transform: rotate(0deg); }
        }

        .tray-shadow {
          position: absolute; left: 50%; bottom: calc(50% - 124px);
          width: min(860px, 88vw); height: 18px;
          transform: translateX(-50%);
          background: radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.12), transparent 70%);
          filter: blur(4px); opacity: .5; pointer-events: none;
        }
        :global(.dark) .tray-shadow { opacity: .65; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bar, .belt-surface, .rowStripe, .fruit { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
