"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, PearIcon } from "../../components/ui";

/* Extra fruiticonen (compacte, nette SVG’s) */
function Orange({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="og" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFB547"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </radialGradient>
      </defs>
      <circle cx="32" cy="34" r="18" fill="url(#og)" />
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E" />
    </svg>
  );
}
function Strawberry({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="#F43F5E" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#22C55E"/>
      <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="url(#sg)"/>
      <g fill="#FEE2E2" opacity=".8">
        <circle cx="26" cy="35" r="1.2"/><circle cx="32" cy="38" r="1.2"/><circle cx="39" cy="34" r="1.2"/>
        <circle cx="45" cy="39" r="1.2"/><circle cx="21" cy="40" r="1.2"/><circle cx="34" cy="44" r="1.2"/>
      </g>
    </svg>
  );
}
function Apple({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="ag" cx="40%" cy="35%" r="60%">
          <stop offset="0" stopColor="#FF8A8A"/>
          <stop offset="1" stopColor="#EB5757"/>
        </radialGradient>
      </defs>
      <circle cx="26" cy="34" r="16" fill="url(#ag)"/>
      <circle cx="40" cy="34" r="16" fill="#E34D4D"/>
      <path d="M33 17c4-2 7-2 10 0-2 4-5 6-10 6-3-3-3-5 0-6z" fill="#2F7A3E"/>
    </svg>
  );
}
function Grape({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {[0,1,2,3,4,5,6].map((i)=>(
        <circle key={i} cx={22+(i%3)*10} cy={22+Math.floor(i/3)*10} r="6" fill="#7C3AED"/>
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31"/>
    </svg>
  );
}
function Banana({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M10 36c10 10 27 12 38 2 3-3 5-6 6-9-2 8-8 15-16 18-12 4-22-1-28-11z" fill="#FCD34D" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

type Kind = "pear" | "orange" | "straw" | "apple" | "grape" | "banana";
function Icon({ kind, size }: { kind: Kind; size?: number }) {
  switch (kind) {
    case "pear":   return <PearIcon size={size ?? 44} />;
    case "orange": return <Orange size={size ?? 44} />;
    case "straw":  return <Strawberry size={size ?? 42} />;
    case "apple":  return <Apple size={size ?? 44} />;
    case "grape":  return <Grape size={size ?? 42} />;
    case "banana": return <Banana size={size ?? 46} />;
  }
}

/* Eén vallend fruit met curved path + sway + spin via CSS-variabelen */
function FruitFall({
  kind, left, delay, dur, size,
}: { kind: Kind; left: string; delay: number; dur: number; size?: number }) {
  return (
    <div
      className="ff"
      style={{
        left,
        // variabelen voor animatie
        // @ts-ignore
        "--delay": `${delay}ms`,
        "--dur": `${dur}ms`,
        "--sway": `${Math.random() > 0.5 ? 1 : -1}`,
        "--rot": `${Math.random() * 40 - 20}deg`,
      }}
      aria-hidden
    >
      <Icon kind={kind} size={size} />
    </div>
  );
}

/* De peer die zichtbaar op de grond landt (met bounce) */
function LandingPear({ onLand }: { onLand: () => void }) {
  // roep onLand net na de “impact”
  useEffect(() => {
    const t = setTimeout(onLand, 2300); // gelijk aan impactmoment in CSS
    return () => clearTimeout(t);
  }, [onLand]);

  return (
    <div className="lp" aria-hidden>
      <PearIcon size={58} />
      <div className="lp-shadow" />
    </div>
  );
}

/* Confetti burst */
function Confetti({ show = false }: { show: boolean }) {
  if (!show) return null;
  const pieces = Array.from({ length: 28 }).map((_, i) => {
    const hue = 20 + (i * 13) % 320;
    const x = (i - 14) * 6;      // horizontale spreiding
    const d = 40 + (i % 5) * 60; // verschillende delays
    return (
      <div
        key={i}
        className="confetti"
        style={{
          // @ts-ignore
          "--x": `${x}px`,
          "--hue": `${hue}`,
          "--cdelay": `${d}ms`,
        }}
      />
    );
  });
  return <div className="confetti-wrap">{pieces}</div>;
}

export default function LoadingPage() {
  const router = useRouter();
  const [boom, setBoom] = useState(false);

  // langere load (≈ 4.2s), confetti eerder bij impact
  useEffect(() => {
    const to = setTimeout(() => router.push("/drop/match"), 4200);
    return () => clearTimeout(to);
  }, [router]);

  const fruits = useMemo(
    () =>
      [
        { kind: "orange", left: "12%", delay: 0,   dur: 1400 },
        { kind: "grape",  left: "26%", delay: 120, dur: 1500 },
        { kind: "apple",  left: "38%", delay: 240, dur: 1600 },
        { kind: "banana", left: "64%", delay: 320, dur: 1500 },
        { kind: "straw",  left: "78%", delay: 420, dur: 1450 },
        { kind: "orange", left: "53%", delay: 520, dur: 1550 },
        { kind: "grape",  left: "86%", delay: 620, dur: 1500 },
        { kind: "apple",  left: "6%",  delay: 700, dur: 1500 },
        { kind: "straw",  left: "45%", delay: 820, dur: 1550 },
      ] as Array<{kind: Kind; left: string; delay: number; dur: number}>,
    []
  );

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <Card className="relative overflow-hidden">
          {/* TEXT — nadrukkelijker */}
          <div className="text-center px-2 pt-2">
            <h1 className="text-[1.6rem] leading-tight font-extrabold">
              We are picking your match based on your interests…
            </h1>
            <p className="text-muted mt-1 text-[0.95rem]">
              Hang on tight, your peer is on the way!
            </p>
          </div>

          {/* ANIMATIE ZONE */}
          <div className="relative h-72 w-full mt-3">
            {fruits.map((f, i) => (
              <FruitFall key={i} kind={f.kind} left={f.left} delay={f.delay} dur={f.dur} />
            ))}
            <LandingPear onLand={() => setBoom(true)} />
            <div className="ground" />
          </div>

          {/* CONFETTI */}
          <Confetti show={boom} />
        </Card>
      </div>
    </main>
  );
}
