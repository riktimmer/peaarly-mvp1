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

function makeSprites(count = 40): FruitSprite[] {
  const arr: FruitSprite[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 28 + Math.random() * 28,
      rotate: Math.random() * 50 - 25,
      opacity: 0.8 + Math.random() * 0.2,
    });
  }
  return arr;
}

export default function FruitPickSelectPage() {
  const router = useRouter();
  const [sprites] = React.useState(() => makeSprites(46));

  const start = () => {
    router.push("/fruitpick/loading");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--cream)] px-3 py-8">
      {/* Telefoon-achtig frame */}
      <div className="relative w-full max-w-[420px] aspect-[9/16] bg-[var(--cream)] rounded-[36px] overflow-hidden shadow-lg">
        {/* Fruit achtergrond */}
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

        {/* Knop met hogere positie */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 pt-16 bg-gradient-to-t from-[rgba(255,247,230,0.95)] to-transparent">
          <button
            onClick={start}
            className="w-full rounded-2xl bg-[var(--pear-green)] text-white font-extrabold py-4 text-lg shadow-md hover:brightness-95 transition"
          >
            Start Fruit Pick
          </button>
        </div>
      </div>
    </div>
  );
}
