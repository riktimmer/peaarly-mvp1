"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Badge,
  PearIcon,
  AnimatedFruit,
} from "../../components/ui";

/** ---------------------------------------------
 *  ✨ UX intent
 *  - Zoekveld + "Quick picks" voor snelle start
 *  - Max 5 keuzes met duidelijke progress
 *  - Glas-CTA onderin + micro-animaties
 *  - Toegankelijk (role="checkbox", aria-live)
 *  --------------------------------------------- */

const FRUIT_MAP: Record<string, string> = {
  "Time Management": "🍋",
  "Staying Ahead": "🍊",
  "Work-life balance": "🍎",
  "Collaboration": "🍇",
  "Leadership": "🍍",
  "Problem solving": "🍓",
  "Focus": "🍈",
  "Delivery": "🍌",
  "Communication": "🍉",
  "Decision making": "🍑",
  "Strategic thinking": "🥝",
  "Public speaking": "🍒",
};

const ALL_TOPICS = Object.keys(FRUIT_MAP);
const MAX = 5;

export default function SelectPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const count = selected.length;
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  // Restore (optional) previous selection for a smooth return trip
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("peaarly.selectedTopics");
      if (raw) {
        const back = JSON.parse(raw);
        if (Array.isArray(back)) setSelected(back.slice(0, MAX));
      }
    } catch {}
  }, []);

  // Filter topics by query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_TOPICS;
    return ALL_TOPICS.filter((t) => t.toLowerCase().includes(q));
  }, [query]);

  // Quick picks: ongevulde, populaire smaken bovenaan
  const quickPicks = useMemo(() => {
    const order = [
      "Focus",
      "Collaboration",
      "Leadership",
      "Problem solving",
      "Time Management",
      "Communication",
    ];
    return order.filter((t) => !selected.includes(t)).slice(0, 3);
  }, [selected]);

  function toggle(topic: string) {
    setTouched(true);
    setSelected((prev) => {
      const has = prev.includes(topic);
      if (has) {
        return prev.filter((x) => x !== topic);
      }
      if (prev.length >= MAX) {
        // brief haptic-like nudge via aria-live; no intrusive toast
        liveRef.current?.animate?.([{ opacity: 0.4 }, { opacity: 1 }], {
          duration: 180,
          iterations: 1,
          easing: "ease-out",
        });
        return prev;
      }
      setJustAdded(topic);
      setTimeout(() => setJustAdded(null), 450);
      return [...prev, topic];
    });
  }

  function startDrop() {
    if (!selected.length) return;
    sessionStorage.setItem("peaarly.selectedTopics", JSON.stringify(selected));
    router.push("/drop/loading");
  }

  const progressPct = Math.min(100, Math.round((count / MAX) * 100));
  const canContinue = count > 0;

  // Tasteful floaters (decor)
  const floaters = useMemo(
    () => [
      { kind: "pear" as const, left: "7%", delay: 0 },
      { kind: "orange" as const, left: "86%", delay: 220 },
      { kind: "straw" as const, left: "74%", delay: 620 },
    ],
    []
  );

  return (
    <main className="min-h-screen relative text-[color:var(--leaf)]">
      {/* floating fruit */}
      {floaters.map((f, i) => (
        <div key={i} className="hidden sm:block absolute top-10">
          <AnimatedFruit kind={f.kind} motion="float" size={46} delay={f.delay} left={f.left} />
        </div>
      ))}

      {/* Top header */}
      <div className="max-w-xl mx-auto px-5 pt-8 pb-4">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Find your perfect Pear 🍐</h1>
            <p className="text-sm text-[color:var(--ink)]/70">
              Kies tot <strong>{MAX}</strong> interesses — hoe beter je smaak, hoe scherper je match.
            </p>
          </div>
          <div className="shrink-0">
            <PearIcon size={32} tone="lime" />
          </div>
        </header>
      </div>

      {/* Search + Quick picks */}
      <div className="max-w-xl mx-auto px-5">
        <Card className="bg-white/90">
          <div className="flex flex-col gap-3">
            <label htmlFor="topic-search" className="text-sm font-semibold">
              What do you want to grow?
            </label>
            <div className="relative">
              <input
                id="topic-search"
                type="search"
                placeholder="Search topics (e.g., Leadership, Focus)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-[#E3EAD9] bg-white/80 px-4 py-2 outline-none focus:ring-2 focus:ring-[#A7D37C] transition"
              />
              {!!query && (
                <button
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded-lg hover:bg-black/5"
                >
                  ✕
                </button>
              )}
            </div>

            {quickPicks.length > 0 && (
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">Quick picks</p>
                <div className="flex flex-wrap gap-2">
                  {quickPicks.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggle(t)}
                      className="chip chip--ghost hover:-translate-y-[1px] transition"
                      aria-pressed={selected.includes(t)}
                    >
                      <span className="mr-1 inline-block translate-y-[1px]">
                        {FRUIT_MAP[t] || "🍊"}
                      </span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Selector */}
      <div className="max-w-xl mx-auto px-5 pt-4 pb-28 space-y-4">
        <Card className="bg-white/90">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="!bg-[#E7F3E1]">Selected: {count}/{MAX}</Badge>
              <span className="text-xs text-[color:var(--ink)]/70">Select all that apply</span>
            </div>
            {touched && selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="text-xs underline text-[color:var(--ink)]/80 hover:text-[color:var(--ink)]"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Progress */}
          <div className="mt-3 h-2 rounded-full bg-[#EFF5E9] overflow-hidden">
            <div
              className={`h-full transition-[width] duration-300 ${count === 0 ? "bg-[#CFE4B6]" : count < MAX ? "bg-[#A7D37C]" : "bg-[#6CB15A]"}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filtered.map((t) => {
              const active = selected.includes(t);
              const fruit = active ? "🍐" : FRUIT_MAP[t] || "🍊";
              const locked = !active && selected.length >= MAX;
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle(t))}
                  role="checkbox"
                  aria-checked={active}
                  aria-label={`${t}${active ? " selected" : ""}`}
                  disabled={locked}
                  className={`chip ${active ? "chip--active" : "chip--ghost"} ${locked ? "opacity-40 cursor-not-allowed" : "hover:-translate-y-[1px]"} transition relative`}
                >
                  {/* micro pulse when just added */}
                  {justAdded === t && (
                    <span className="absolute -right-1 -top-1 text-xs animate-ping">✨</span>
                  )}
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
            {filtered.length === 0 && (
              <p className="text-sm text-[color:var(--ink)]/60">No topics match “{query}”.</p>
            )}
          </div>

          {/* Preview */}
          {!!selected.length && (
            <div className="mt-5 text-sm">
              <p className="font-semibold mb-2">Your basket</p>
              <div className="flex flex-wrap gap-2">
                {selected.map((t) => (
                  <Badge key={t} className="!bg-[#F4FAEE]">{t}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* live region for screen readers */}
          <div ref={liveRef} aria-live="polite" className="sr-only">
            {count === MAX
              ? `You reached the maximum of ${MAX} selections.`
              : `${count} selected out of ${MAX}.`}
          </div>
        </Card>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-[#E5EEDC] bg-[color:var(--cream)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--cream)]/60">
        <div className="max-w-xl mx-auto px-5 py-3">
          <button
            className={`btn w-full text-center ${canContinue ? "btn-primary hover:shadow-md" : "btn-secondary opacity-60 cursor-not-allowed"} transition`}
            onClick={startDrop}
            disabled={!canContinue}
          >
            <span className={`${canContinue ? "animate-none" : "animate-pulse"}`}>Find my Pear match</span>
          </button>
          {!canContinue ? (
            <p className="mt-1 text-center text-xs text-[color:var(--ink)]/70">
              Select at least one topic to continue
            </p>
          ) : (
            <p className="mt-1 text-center text-xs text-[color:var(--ink)]/60">
              Sweet! {count} selected — juicy matches ahead 🍐
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
