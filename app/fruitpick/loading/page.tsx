// app/fruitpick/loading/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Piece = { emoji: string; left: number; size: number; delay: number; dur: number };

const SMALL_FRUITS = ["🍎", "🍌", "🍊", "🍓", "🍇", "🍍", "🍑"];

export default function FruitPickLoading() {
  const router = useRouter();
  const params = useSearchParams();
  const p = params.get("p") || "";

  const fruits = useMemo<Piece[]>(
    () =>
      new Array(14).fill(0).map((_, i) => ({
        emoji: SMALL_FRUITS[i % SMALL_FRUITS.length],
        left: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,
        delay: Math.random() * 0.9,
        dur: Math.random() * 1.2 + 1.6,
      })),
    []
  );

  const [hideOthers, setHideOthers] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHideOthers(true), 1800);
    const t2 = setTimeout(() => {
      router.push(`/fruitpick/match?p=${encodeURIComponent(p)}`);
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [p, router]);

  return (
    <main className="min-h-screen bg-[#FFF7E5] dark:bg-[#0d1c0f] text-[var(--ink)] dark:text-white flex items-center justify-center">
      <div className="relative w-[380px] h-[540px] rounded-3xl bg-[#FFF0C9] dark:bg-[#112015] shadow-md overflow-hidden">
        {/* Titel */}
        <div className="absolute top-4 left-5 right-5 z-10">
          <h2 className="text-xl font-extrabold">We’re picking based on your tastes…</h2>
          <p className="opacity-70">Hang on tight, your peer is on the way! 🍐</p>
        </div>

        {/* Vallende kleine fruits */}
        <div className={`absolute inset-0 ${hideOthers ? "opacity-0 transition-opacity duration-400" : ""}`}>
          {fruits.map((f, idx) => (
            <span
              key={idx}
              style={{
                left: `${f.left}%`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.dur}s`,
                fontSize: `${f.size}px`,
              }}
              className="absolute top-[-40px] animate-[fall_linear_forwards]"
            >
              {f.emoji}
            </span>
          ))}
        </div>

        {/* Grote peer */}
        <span className="absolute left-1/2 -translate-x-1/2 top-[-120px] text-[110px] animate-[fallPear_ease-out_forwards_1.9s]">
          🍐
        </span>

        {/* “Grond” */}
        <div className="absolute bottom-0 left-4 right-4 h-1.5 bg-black/10 dark:bg-white/10 rounded-full" />
      </div>

      {/* keyframes inline */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-80px); opacity: .9; }
          100% { transform: translateY(520px); opacity: .95; }
        }
        .animate-[fall_linear_forwards] {
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        @keyframes fallPear {
          0% { transform: translateX(-50%) translateY(-130px) scale(1); }
          85% { transform: translateX(-50%) translateY(390px) scale(1.05); }
          100% { transform: translateX(-50%) translateY(390px) scale(1); }
        }
        .animate-[fallPear_ease-out_forwards_1.9s] {
          animation-name: fallPear;
          animation-duration: 1.9s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </main>
  );
}

