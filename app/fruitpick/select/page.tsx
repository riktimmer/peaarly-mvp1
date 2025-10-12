// app/fruitpick/select/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Fruit = {
  key: string;
  label: string;
  icon: string;
};

const FRUITS: Fruit[] = [
  { key: "pear", label: "Pear", icon: "🍐" },
  { key: "banana", label: "Banana", icon: "🍌" },
  { key: "strawberry", label: "Strawberry", icon: "🍓" },
  { key: "grape", label: "Grape", icon: "🍇" },
  { key: "orange", label: "Orange", icon: "🍊" },
  { key: "apple", label: "Apple", icon: "🍎" },
  { key: "peach", label: "Peach", icon: "🍑" },
  { key: "pineapple", label: "Pineapple", icon: "🍍" },
];

export default function FruitPickSelect() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const canStart = selected.length > 0;

  const summary = useMemo(
    () => FRUITS.filter((f) => selected.includes(f.key)).map((f) => f.label),
    [selected]
  );

  const start = () => {
    const qs = selected.join(",");
    router.push(`/fruitpick/loading?p=${encodeURIComponent(qs)}`);
  };

  return (
    <main className="min-h-screen bg-[#FFF7E5] text-[var(--ink)] dark:bg-[#0d1c0f] dark:text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative bg-[#FFF0C9] dark:bg-[#112015] rounded-3xl shadow-md p-5 overflow-hidden">
          {/* optioneel achtergrondpatroon */}
          <img
            src="/fruit-background.png"
            alt=""
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20"
          />

          <div className="relative">
            <h1 className="text-2xl font-extrabold mb-2">Ready to pick?</h1>
            <p className="mb-4">
              Kies je favoriete fruit vibes — dan zoeken we de leukste match.
            </p>

            {/* Chips */}
            <div className="grid grid-cols-2 gap-3">
              {FRUITS.map((f) => {
                const active = selected.includes(f.key);
                return (
                  <button
                    key={f.key}
                    onClick={() => toggle(f.key)}
                    className={[
                      "flex items-center gap-2 rounded-2xl border px-3 py-3 text-left transition",
                      active
                        ? "bg-[var(--pear-green)] text-white border-[var(--pear-green)]"
                        : "bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-white",
                    ].join(" ")}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className="font-semibold">{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected summary */}
            <div className="mt-5">
              <div className="text-sm opacity-70 mb-1">Your selection</div>
              <div className="flex flex-wrap gap-2">
                {summary.length === 0 ? (
                  <span className="opacity-50">Nothing yet…</span>
                ) : (
                  summary.map((s) => (
                    <span
                      key={s}
                      className="bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-3 py-1 text-sm"
                    >
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-5">
              <button
                onClick={start}
                disabled={!canStart}
                className={[
                  "w-full py-4 rounded-2xl font-semibold transition shadow-sm",
                  canStart
                    ? "bg-[var(--pear-green)] text-white hover:brightness-95"
                    : "bg-black/10 dark:bg-white/10 text-black/40 dark:text-white/40 cursor-not-allowed",
                ].join(" ")}
              >
                Start Fruit Pick
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center opacity-70">
          🍍 Tip: kies minimaal 1 fruit om te starten.
        </p>
      </div>
    </main>
  );
}

