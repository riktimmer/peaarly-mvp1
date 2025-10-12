"use client";

import React from "react";
import { useRouter } from "next/navigation";

const FRUITS = ["🍐", "🍊", "🍎", "🍓", "🍍", "🍇", "🍌", "🍏"];
const AVATARS = ["🧑‍🦱", "🧑‍🦰", "🧑‍🦳", "🧔", "👩‍🦱", "👨‍🦱"];

function Reel({
  value,
  spinning,
}: {
  value: string;
  spinning: boolean;
}) {
  return (
    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-white/90 rounded-md shadow-inner flex items-center justify-center overflow-hidden">
      <div
        className={`text-3xl sm:text-4xl transition-transform duration-200 ${
          spinning ? "animate-pulse" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default function FruitSlotLoading() {
  const router = useRouter();

  // reel states
  const [spinning, setSpinning] = React.useState(false);
  const [r1, setR1] = React.useState("🍐");
  const [r2, setR2] = React.useState("🍊");
  const [r3, setR3] = React.useState("🍎");

  const intervals = React.useRef<number[]>([]);

  // Start: laat alle reels ‘draaien’
  const handleStart = () => {
    if (spinning) return;
    setSpinning(true);

    const setRandomFruit = (setter: (v: string) => void) => {
      return window.setInterval(() => {
        setter(FRUITS[Math.floor(Math.random() * FRUITS.length)]);
      }, 90 + Math.random() * 70);
    };

    intervals.current = [
      setRandomFruit(setR1),
      setRandomFruit(setR2),
      setRandomFruit(setR3),
    ];
  };

  // Stop: stop alle reels, zet in één van de drie een avatar, navigeer daarna
  const handleStop = () => {
    if (!spinning) return;
    setSpinning(false);

    // stop rollen sequentieel voor wat drama
    const clear = (i: number) => window.clearInterval(intervals.current[i]);
    clear(0);
    setTimeout(() => {
      clear(1);
      setTimeout(() => {
        clear(2);
        // in één random reel een avatar
        const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
        const slot = Math.floor(Math.random() * 3);
        if (slot === 0) setR1(avatar);
        if (slot === 1) setR2(avatar);
        if (slot === 2) setR3(avatar);

        // kleine pauze en dan door naar match
        setTimeout(() => {
          router.push("/fruitpick/match");
        }, 900);
      }, 250);
    }, 250);
  };

  // opruimen
  React.useEffect(() => {
    return () => intervals.current.forEach((id) => window.clearInterval(id));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--cream)] flex flex-col items-center px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--pear-green)] mb-6">
        Finding Peears
      </h1>

      {/* ‘kast’ van de slotmachine */}
      <div className="relative bg-[#E9D2A4] rounded-2xl p-4 sm:p-5 shadow-md">
        {/* venster */}
        <div className="bg-[#F7F0DD] rounded-xl p-3 sm:p-4 shadow-inner">
          <div className="flex gap-3 sm:gap-4">
            <Reel value={r1} spinning={spinning} />
            <Reel value={r2} spinning={spinning} />
            <Reel value={r3} spinning={spinning} />
          </div>
        </div>

        {/* hendel voor de sfeer */}
        <div className="absolute right-[-16px] top-1/2 -translate-y-1/2">
          <div className="w-1.5 h-10 bg-[#8F6B45] rounded-full mx-auto" />
          <div className="w-4 h-4 bg-[#E75C4A] rounded-full shadow-sm mx-auto mt-1" />
        </div>
      </div>

      {/* knoppen */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleStart}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--pear-green)] text-white font-semibold px-5 py-3 shadow hover:brightness-95 transition"
        >
          ▶ Start
        </button>
        <button
          onClick={handleStop}
          className="inline-flex items-center gap-2 rounded-full bg-[#F4C33B] text-[#1d3f2c] font-semibold px-5 py-3 shadow hover:brightness-95 transition"
        >
          ■ Stop
        </button>
      </div>

      {/* kleine hint */}
      <p className="mt-6 text-sm text-[var(--ink)]/70">
        Tap <span className="font-semibold">Start</span> to spin &nbsp;•&nbsp;
        Tap <span className="font-semibold">Stop</span> to reveal a match
      </p>
    </div>
  );
}
