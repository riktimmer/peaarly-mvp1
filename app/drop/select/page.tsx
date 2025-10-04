"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Badge, PearIcon } from "@/app/components/ui";

const TOPICS = [
  "Time Management","Staying Ahead","Work-life balance","Collaboration",
  "Leadership","Problem solving","Focus","Delivery"
];

export default function SelectPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  function toggle(t: string) {
    setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  }

  function startDrop() {
    if (!selected.length) return;
    sessionStorage.setItem("peaarly.selectedTopics", JSON.stringify(selected));
    router.push("/drop/loading");
  }

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <Card>
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-extrabold">Ready to drop?</h1>
            <PearIcon size={56} tone="lime" />
          </div>
          <p className="mt-1 text-muted">Share your focus areas for the best match</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {TOPICS.map(t => (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`badge border transition ${selected.includes(t) ? "bg-[color:var(--pear-green)] text-white border-[color:var(--pear-green)]" : ""}`}
                aria-pressed={selected.includes(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            className={`btn mt-6 w-full ${selected.length ? "btn-primary" : "btn-secondary opacity-60 cursor-not-allowed"}`}
            onClick={startDrop}
            disabled={!selected.length}
          >
            Start a Drop
          </button>
        </Card>
      </div>
    </main>
  );
}
