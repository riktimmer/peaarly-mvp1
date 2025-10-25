"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

const DURATION_MS = 6200;
const NEXT_STEP = "/drop/match";

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

  const EMOJIS = useMemo(
    () => [
      "🍓", "🍊", "🍎", "🍏", "🍇", "🍌", "🍉", "🍑", "🍒", "🍍",
      "🍋", "🍈", "🥝", "🥭", "🥥", "🫐", "🍐"
    ],
    []
  );

  const ROWS = useMemo(
    () => [
      { id: "row-a", speed: 1.0, size: 44, y: "28%" },
      { id: "row-b", speed: 0.85, size: 40, y: "50%" },
      { id: "row-c", speed: 1.15, size: 36, y: "72%" },
    ],
    []
  );

  const TILES_PER_ROW = 56;

  return (
    <main className="min-h-screen conveyor-bg text-[color:var(--ink)]">
      {/* Koptekst */}
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
                            fontFamily:
                              '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                            "--jiggle-delay": `${(i % 12) * 80}ms`,
                          } as React.CSSProperties
                        }
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

      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Styles */}
      <style jsx>{`
        :root {
          --ink: #0e261c;
          --leaf: #0f5132;
          --cream: #fafaf2;
        }

        .conveyor-bg {
          background:
            radial-gradient(1200px 800px at 20% -10%, #ecf6df 0%, transparent 55%),
            linear-gradient(180deg, #f6f8ef 0%, #fafaf2 100%);
        }
        :global(.dark) .conveyor-bg {
          background:
            radial-gradient(1000px 700px at 50% -10%, rgba(34, 86, 58, 0.3), transparent 55%),
            linear-gradient(180deg, #0f1d14 0%, #183b28 100%);
          --ink: #e7f9ee;
        }

        .container {
          display: grid;
          place-items: center;
          padding-top: 60px;
        }
        .glass {
          width: min(860px, 92vw);
          background: rgba(255, 255, 255, 0.85);
          border-radius: 22px;
          backdrop-filter: blur(6px);
          padding: 18px;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
        }
        :global(.dark) .glass {
          background: rgba(20, 40, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 0 40px rgba(16, 185, 129, 0.2);
        }

        .title {
          font-weight: 800;
          font-size: 1.8rem;
          color: var(--ink);
        }
        .highlight {
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          -webkit-background-clip: text;
          color: transparent;
        }
        :global(.dark) .highlight {
          background: linear-gradient(90deg, #34d399, #bef264);
        }
        .subtitle {
          margin-top: 4px;
          font-size: 1rem;
          color: rgba(15, 81, 50, 0.8);
        }
        :global(.dark) .subtitle {
          color: rgba(230, 255, 240, 0.85);
        }

        .progress {
          margin-top: 12px;
          height: 10px;
          width: min(700px, 86vw);
          background: #eff5e9;
          border-radius: 9999px;
          overflow: hidden;
        }
        .bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #6cb15a, #a7d37c);
          animation: grow linear forwards;
        }
        :global(.dark) .progress {
          background: rgba(255, 255, 255, 0.08);
        }
        :global(.dark) .bar {
          background: linear-gradient(90deg, #34d399, #f59e0b);
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.5);
        }
        @keyframes grow { to { width: 100%; } }

        .stage {
          position: relative;
          height: clamp(380px, 58vh, 520px);
          width: 100%;
          display: grid;
          place-items: center;
          margin-top: 24px;
        }
        .rails {
          position: absolute;
          left: 0; right: 0;
          height: 10px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 6px;
        }
        .rails.top { top: calc(50% - 96px); }
        .rails.bottom { top: calc(50% + 96px); }
        :global(.dark) .rails {
          background: rgba(255, 255, 255, 0.12);
        }

        .belt {
          position: absolute;
          left: 4vw; right: 4vw;
          top: 50%;
          height: 192px;
          transform: translateY(-50%);
          border-radius: 22px;
          overflow: hidden;
          background: #edf7e8;
          border: 1px solid #d8e7cd;
          box-shadow: inset 0 -12px 30px rgba(108, 177, 90, 0.1);
        }
        :global(.dark) .belt {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 0 40px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.08) inset;
        }

        .belt-surface {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(108, 177, 90, 0.18) 0 8px, transparent 8px 28px),
            linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
          animation: surface 7s linear infinite;
          opacity: 0.9;
        }
        @keyframes surface {
          from { background-position: 0 0, 0 0; }
          to { background-position: 1400px 0, 0 0; }
        }
        :global(.dark) .belt-surface {
          background:
            repeating-linear-gradient(90deg, rgba(52, 211, 153, 0.2) 0 8px, transparent 8px 28px);
          opacity: 1;
        }

        .row {
          position: absolute;
          left: 0;
          right: 0;
          top: var(--row-y);
          height: var(--row-size);
          transform: translateY(-50%);
          display: flex;
        }
        .rowStripe {
          width: 200%;
          display: flex;
          gap: 14px;
          padding-left: 14px;
          animation: stripe var(--row-dur) linear infinite;
        }
        @keyframes stripe {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .fruit {
          display: inline-block;
          font-size: calc(var(--row-size) * 0.9);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          animation: jiggle 2s ease-in-out infinite alternate;
          animation-delay: var(--jiggle-delay);
        }
        @keyframes jiggle {
          0% { transform: translateY(-1px) rotate(-1.5deg); }
          100% { transform: translateY(1px) rotate(1.5deg); }
        }

        .tray-shadow {
          position: absolute;
          left: 50%;
          bottom: calc(50% - 124px);
          width: min(860px, 88vw);
          height: 18px;
          transform: translateX(-50%);
          background: radial-gradient(50% 100% at 50% 50%, rgba(0, 0, 0, 0.15), transparent 70%);
          filter: blur(4px);
        }
      `}</style>
    </main>
  );
}
