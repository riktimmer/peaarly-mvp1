// app/fruitpick/select/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ALL_TOPICS = [
  "Leadership",
  "Creativity",
  "Balance",
  "Focus",
  "Collaboration",
  "Problem solving",
  "Time management",
  "Delivery",
];

export default function FruitPickSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggle = (t: string) =>
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const goNext = () => {
    const q = selected.join(",");
    router.push(`/fruitpick/loading?topics=${encodeURIComponent(q)}`);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-[var(--pear-green)] mb-2">
        Pick your interests
      </h1>
      <p className="text-muted mb-6">
        Selecteer je focusgebieden voor de beste match.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {ALL_TOPICS.map((t) => {
          const on = selected.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggle(t)}
              className={
                on
                  ? "badge bg-[var(--pear-green)] text-white"
                  : "badge bg-[var(--cream)] text-[var(--leaf)]"
              }
            >
              {on ? "🍐 " : "🍊 "}
              {t}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goNext}
        disabled={selected.length === 0}
        className={`btn btn-primary w-full ${
          selected.length === 0 ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        Start Fruit Pick
      </button>
    </div>
  );
}
