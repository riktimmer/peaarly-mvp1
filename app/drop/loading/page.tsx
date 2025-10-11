"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, PearIcon } from "../../components/ui";

/** Extra simpele fruiticons voor variatie (naast PearIcon) */
function OrangeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="34" r="18" fill="#F59E0B" />
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E" />
    </svg>
  );
}
function StrawberryIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#EF4444"/>
      <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="#DC2626"/>
    </svg>
  );
}
function AppleIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="26" cy="34" r="16" fill="#EB5757"/>
      <circle cx="40" cy="34" r="16" fill="#E34D4D"/>
      <path d="M33 17c4-2 7-2 10 0-2 4-5 6-10 6-3-3-3-5 0-6z" fill="#2F7A3E"/>
    </svg>
  );
}
function GrapeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      {Array.from({length:7}).map((_,i)=>(
        <circle key={i} cx={22+(i%3)*10} cy={22+Math.floor(i/3)*10} r="5.5" fill="#7C3AED"/>
      ))}
      <rect x="29" y="10" width="4" height="8" rx="2" fill="#265C31"/>
    </svg>
  );
}
function BananaIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M10 36c10 10 27 12 38 2 3-3 5-6 6-9-2 8-8 15-16 18-12 4-22-1-28-11z" fill="#FCD34D" stroke="#EAB308" strokeWidth="2" />
    </svg>
  );
}

/** Intern type + picker */
type Kind = "pear" | "orange" | "straw" | "apple" | "grape" | "banana";
function PickIcon({ kind, size }: { kind: Kind; size?: number }) {
  switch (kind) {
    case "pear":   return <PearIcon size={size ?? 40} />;
    case "orange": return <OrangeIcon size={size ?? 40} />;
    case "straw":  return <StrawberryIcon size={size ?? 40} />;
    case "apple":  return <AppleIcon size={size ?? 40} />;
    case "grape":  return <GrapeIcon size={size ?? 40} />;
    case "banana": return <BananaIcon size={size ?? 42} />;
  }
}

/** Eén vallend fruitje met spin & drift */
function FallingFruit({
  kind,
  delay = 0,
  left = "50%",
  size = 40,
}: {
  kind: Kind;
  delay?: number;
  left?: string;
  size?: number;
}) {
  return (
    <div
      className="absolute -top-12 fall-spin"
      style={{ animationDelay: `${delay}ms`, left }}
      aria-hidden
    >
      <PickIcon kind={kind} size={size} />
    </div>
  );
}

/** De uiteindelijke peer die echt landt en bounce’t op de grond */
function FinalPear() {
  return (
    <div className="absolute -top-16 pear-drop" style={{ left: "48%" }} aria-hidden>
      <PearIcon size={56} />
      <div className="drop-shadow-ring" />
    </div>
  );
}

export default function LoadingPage() {
  const router = useRouter();

  // iets langere laadduur (≈ 3.6s)
  useEffect(() => {
    const t = setTimeout(() => router.push("/drop/match"), 3600);
    return () => clearTimeout(t);
  }, [router]);

  // veel verschillend fruit, verschillende posities en delays
  const fruits: { kind: Kind; left: string; delay: number; size?: number }[] = useMemo(
    () => [
      { kind: "orange", left: "12%", delay: 0 },
      { kind: "grape",  left: "26%", delay: 150 },
      { kind: "apple",  left: "38%", delay: 250 },
      { kind: "banana", left: "64%", delay: 320, size: 46 },
      { kind: "straw",  left: "78%", delay: 420 },
      { kind: "orange", left: "53%", delay: 520 },
      { kind: "grape",  left: "86%", delay: 620 },
      { kind: "apple",  left: "6%",  delay: 700 },
      { kind: "straw",  left: "45%", delay: 820 },
    ],
    []
  );

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <Card className="relative overflow-hidden">
          {/* Animatiezone */}
          <div className="relative h-64 w-full">
            {fruits.map((f, i) => (
              <FallingFruit key={i} kind={f.kind} left={f.left} delay={f.delay} size={f.size}/>
            ))}
            {/* De peer die echt landt */}
            <FinalPear />
            {/* ondergrond */}
            <div className="absolute bottom-4 left-4 right-4 h-2 rounded-full bg-[#E5EEDC]" />
          </div>

          {/* Copy (zonder “Switch to Fruit Pick”) */}
          <h2 className="text-2xl font-extrabold mt-1">We are picking your match based on your interests…</h2>
          <p className="text-center text-muted mt-2">
            Hang on tight, your peer is on the way!
          </p>
        </Card>
      </div>
    </main>
  );
}
