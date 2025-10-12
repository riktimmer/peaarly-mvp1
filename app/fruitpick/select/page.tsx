// app/fruitpick/select/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type FruitSprite = {
  emoji: string;
  top: number;     // in %
  left: number;    // in %
  size: number;    // in px
  rotate: number;  // in deg
  opacity: number; // 0.7..1
};

const EMOJIS = ["🍐", "🍓", "🍇", "🍎", "🍊", "🍌", "🍍", "🍏"];

function makeSprites(count = 28): FruitSprite[] {
  const arr: FruitSprite[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      top: 4 + Math.random() * 92,   // rand(4..96%)
      left: 4 + Math.random() * 92,  // rand(4..96%)
      size: 22 + Math.round(Math.random() * 22), // 22..44px
      rotate: Math.round(Math.random() * 40) - 20, // -20..20 deg
      opacity: 0.75 + Math.random() * 0.25,        // 0.75..1
    });
  }
  return arr;
}

export default function FruitPickSelectPage() {
  const router = useRouter();
  const [sprites] = React.useState(() => makeSprites(34)); // eenmaal genereren

  const start = () => {
    // Je kunt hier topics meegeven als je wilt:
    // router.push(`/fruitpick/loading?topics=${encodeURIComponent("Creativity,Leadership")}`);
    router.push("/fruitpick/loading");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      {/* Kaart */}
      <div className="relative w-full max-w-sm rounded-[28px] overflow-hidden shadow-lg">
        {/* Gele basis-achtergrond + subtiele vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 100% at 50% 0%, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0) 40%), var(--cream, #FFF7E6)",
          }}
        />

        {/* Fruit-collage */}
        <div className="absolute inset-0 pointer-events-none">
          {sprites.map((s, idx) => (
            <span
              key={idx}
              style={{
                position: "absolute",
                top: `${s.top}%`,
                left: `${s.left}%`,
                transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
                fontSize: `${s.size}px`,
                opacity: s.opacity,
                filter: "drop-shadow(0 1px 0 rgba(0,0,0,.05))",
              }}
            >
              {s.emoji}
            </span>
          ))}
        </div>

        {/* Onderste balk zodat de knop leesbaar is boven de fruitjes */}
        <div className="absolute left-0 right-0 bottom-0 pb-4 pt-8 px-4 bg-gradient-to-t from-[rgba(255,247,230,0.95)] to-transparent" />

        {/* Start-knop */}
        <div className="relative z-10 px-5 pb-5">
          <button
            onClick={start}
            className="w-full btn btn-primary text-base md:text-lg"
          >
            Start Fruit Pick
          </button>
        </div>

        {/* Ronde hoeken visueel (backgroundlaag al rond, dit is extra netjes) */}
        <div className="absolute inset-0 ring-1 ring-black/5 rounded-[28px] pointer-events-none" />
      </div>
    </div>
  );
}
