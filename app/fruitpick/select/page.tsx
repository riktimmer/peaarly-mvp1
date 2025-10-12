"use client";

import React from "react";
import { useRouter } from "next/navigation";

type FruitSprite = {
  emoji: string;
  top: number;
  left: number;
  size: number;
  rotate: number;
  opacity: number;
};

const EMOJIS = ["🍐", "🍓", "🍇", "🍎", "🍊", "🍌", "🍍", "🍏"];

function createSprites(n = 46): FruitSprite[] {
  return Array.from({ length: n }, () => ({
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 26 + Math.random() * 28,
    rotate: Math.random() * 50 - 25,
    opacity: 0.85 + Math.random() * 0.15,
  }));
}

export default function FruitPickSelectPage() {
  const router = useRouter();
  const [sprites] = React.useState(() => createSprites());

  return (
    <div className="relative min-h-screen bg-[var(--cream)] overflow-hidden">
      {/* Fruit-achtergrond */}
      <div className="absolute inset-0 pointer-events-none">
        {sprites.map((s, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              fontSize: `${s.size}px`,
              opacity: s.opacity,
              filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.05))",
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>

      {/* CTA - net onder het midden */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <button
          onClick={() => router.push("/fruitpick/loading")}
          className="translate-y-10 w-full max-w-md mx-auto rounded-2xl bg-[var(--pear-green)] text-white font-extrabold py-4 text-lg shadow-md hover:brightness-95 transition"
        >
          Start Fruit Pick
        </button>
      </div>
    </div>
  );
}
