"use client";
import React, { useMemo, useState, useEffect } from "react";

/** Pear Drop – 3 steps: interests -> loading -> match */
export default function DropPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<string[]>([]);

  // simpele demo “matching”
  const candidates = useMemo(
    () => [
      { name: "Emily", role: "Product Manager", tags: ["Creative", "Funny"], fruit: "pear" },
      { name: "Noah", role: "Engineer", tags: ["Analytical", "Calm"], fruit: "orange" },
      { name: "Mia", role: "Marketer", tags: ["Story", "Energy"], fruit: "straw" },
    ],
    []
  );

  // ga van step 2 (loading) automatisch naar 3
  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setStep(3), 1800); // ~1.8s animatie
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        {step === 1 && (
          <Card>
            <div className="flex items-start justify-between mb-2">
              <PearIcon size={64} tone="lime" />
            </div>
            <h1 className="text-2xl font-extrabold">Ready to drop?</h1>
            <p className="mt-1 text-muted">Share your focus areas for the best match</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Time Management","Staying Ahead","Work-life balance","Collaboration","Leadership","Problem solving"].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setSelected((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))
                  }
                  className={`badge border ${selected.includes(t) ? "ring-2 ring-[color:var(--pear-lime)]" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              className="btn btn-primary mt-6 w-full"
              onClick={() => setStep(2)}
              disabled={selected.length === 0}
            >
              Start a Drop
            </button>
          </Card>
        )}

        {step === 2 && (
          <Card className="grid place-items-center">
            <div className="h-48 relative w-full overflow-hidden">
              {/* vallend fruit */}
              <FallingFruit kind="orange" delay={0} left="30%" />
              <FallingFruit kind="straw" delay={150} left="60%" />
              <FallingFruit kind="pear" delay={300} left="45%" />
            </div>
            <h2 className="text-2xl font-extrabold mt-2">Switch to Fruit Pick</h2>
            <p className="text-center text-muted mt-1">
              We are picking your match based on your interests…
            </p>
            <p className="text-xs text-muted mt-3 italic">Hang on tight, your peer is on the way!</p>
          </Card>
        )}

        {step === 3 && (
          <MatchCard candidate={candidates[Math.floor(Math.random() * candidates.length)]} onNext={() => { setSelected([]); setStep(1); }} />
        )}
      </div>
    </main>
  );
}

/* ---------- Pieces ---------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function MatchCard({
  candidate,
  onNext,
}: {
  candidate: { name: string; role: string; tags: string[]; fruit: "pear" | "orange" | "straw" };
  onNext: () => void;
}) {
  const Fruit = candidate.fruit === "pear" ? PearIcon :
                candidate.fruit === "orange" ? OrangeIcon : StrawberryIcon;

  return (
    <Card>
      <p className="text-sm text-muted">You matched with</p>
      <h2 className="text-2xl font-extrabold mt-0.5">{candidate.name}</h2>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-[#F3F7EF] border border-[#D6E6CF] grid place-items-center overflow-hidden">
          <Face />
        </div>
        <div>
          <p className="text-sm text-muted">{candidate.role}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {candidate.tags.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
        <Fruit />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2">
        <a className="btn btn-primary w-full" href="/feed">Start Chat</a>
        <button className="btn w-full" style={{ background: "#FCD34D", color: "var(--leaf)" }} onClick={onNext}>
          Next Drop
        </button>
      </div>
    </Card>
  );
}

/* ---------- Falling fruit ---------- */
function FallingFruit({ kind, delay = 0, left = "50%" }: { kind: "pear" | "orange" | "straw"; delay?: number; left?: string }) {
  const Icon = kind === "pear" ? PearIcon : kind === "orange" ? OrangeIcon : StrawberryIcon;
  return (
    <div
      className="absolute -top-10 animate-fall"
      style={{ animationDelay: `${delay}ms`, left }}
      aria-hidden
    >
      <Icon size={56} />
      {/* een paar lijntjes "speed" */}
      <div className="mx-auto h-10 w-[2px] bg-[#E5EEDC] opacity-70 -mt-2" />
    </div>
  );
}

/* ---------- Simple SVG Icons ---------- */
function PearIcon({ size = 54, tone = "green" as "green" | "lime" }: { size?: number; tone?: "green" | "lime" }) {
  const fill = tone === "lime" ? "#A3D26F" : "#2F7A3E";
  return (<svg width={size} height={size} viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill={fill}/></svg>);
}
function OrangeIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64"><circle cx="32" cy="32" r="18" fill="#F59E0B"/><path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E"/></svg>);
}
function StrawberryIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#EF4444"/>
    <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="#DC2626"/>
  </svg>);
}
function Face() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FFDFAE" />
      <circle cx="9" cy="10" r="1.2" fill="#1C4B2B" />
      <circle cx="15" cy="10" r="1.2" fill="#1C4B2B" />
      <path d="M8 15c1.5 1 3.5 1 5 0" stroke="#1C4B2B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="7" y="6" width="10" height="5" rx="2.5" fill="#2F7A3E" opacity=".2"/>
    </svg>
  );
}
