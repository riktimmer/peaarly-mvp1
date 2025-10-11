"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Badge,
  PearIcon,
  AnimatedFruit,
} from "../../components/ui";

// Unieke fruit-emoji per thema (ongekozen staat)
const FRUIT_MAP: Record<string, string> = {
  "Time Management": "🍋",
  "Staying Ahead": "🍊",
  "Work-life balance": "🍎",
  "Collaboration": "🍇",
  "Leadership": "🍍",
  "Problem solving": "🍓",
  "Focus": "🍈",
  "Delivery": "🍌",
};

const TOPICS = Object.keys(FRUIT_MAP);

export default function SelectPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const count = selected.length;

  function toggle(topic: string) {
    setSelected((s) => (s.includes(topic) ? s.filter((x) => x !== topic) : [...s, topic]));
  }

  function startDrop() {
    if (!selected.length) return;
    sessionStorage.setItem("peaarly.selectedTopics", JSON.stringify(selected));
    router.push("/drop/loading");
  }

  // zwevende fruitjes voor sfeer
  const floaters = useMemo(
    () => [
      { kind: "pear" as const, left: "6%", delay: 0 },
      { kind: "orange" as const, left: "86%", delay: 200 },
      { kind: "straw" as const, left: "72%", delay: 700 },
    ],
    []
  );

  return (
    <main className="min-h-screen fruit-wall relative text-[color:var(--leaf)]">
      {/* floating fruit */}
      {floaters.map((f, i) => (
        <div key={i} className="hidden sm:block absolute top-10">
          <AnimatedFruit kind={f.kind} motion="float" size={42} delay={f.delay} left={f.left} />
        </div>
      ))}

      <div className="max-w-md mx-auto px-5 pb-28 pt-6 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Ready to drop?</h1>
          <PearIcon size={28} tone="lime" />
        </header>

        <Card className="bg-white/90">
          <p className="text-muted">
            Share your <strong>focus areas</strong> for the best match
          </p>

          {/* teller */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <Badge className="!bg-[#E7F3E1]">Selected: {count}</Badge>
            {/* percentage & progressbalk zijn bewust verwijderd */}
          </div>

          {/* chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const active = selected.includes(t);
              const fruit = active ? "🍐" : FRUIT_MAP[t] || "🍊";
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`chip ${active ? "chip--active" : ""}`}
                  aria-pressed={active}
                >
                  <span className="mr-1 inline-block translate-y-[1px]">{fruit}</span>
                  {t}
                  {active && (
                    <span className="ml-1 inline-block rounded-full bg-white/30 px-1.5 text-[10px]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Preview van selectie */}
          {!!selected.length && (
            <div className="mt-4 text-sm">
              <p className="font-semibold mb-1">Your selection</p>
              <div className="flex flex-wrap gap-2">
                {selected.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Sticky CTA onderin */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-[#E5EEDC] bg-[color:var(--cream)]/95 backdrop-blur">
        <div className="max-w-md mx-auto px-5 py-3">
          <button
            className={`btn w-full text-center ${
              count ? "btn-primary" : "btn-secondary opacity-60 cursor-not-allowed"
            }`}
            onClick={startDrop}
            disabled={!count}
          >
            Start a Drop
          </button>
          {!count && (
            <p className="mt-1 text-center text-xs text-[color:var(--ink)]/70">
              Select at least one topic to continue
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
