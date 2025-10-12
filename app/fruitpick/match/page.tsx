// app/fruitpick/match/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const buddy = {
  name: "Emily",
  adjectives: ["Creative", "Funny"],
  avatarBg: "#F5E6C8",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-sm bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10">
      {children}
    </span>
  );
}

export default function FruitPickMatch() {
  const params = useSearchParams();
  const p = params.get("p") || "";
  const picks = p
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const mapIcon: Record<string, string> = {
    pear: "🍐",
    banana: "🍌",
    strawberry: "🍓",
    grape: "🍇",
    orange: "🍊",
    apple: "🍎",
    peach: "🍑",
    pineapple: "🍍",
  };

  return (
    <main className="min-h-screen bg-[#FFF7E5] text-[var(--ink)] dark:bg-[#0d1c0f] dark:text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-[#FFF0C9] dark:bg-[#112015] shadow-md p-6 text-center">
          <h2 className="text-2xl font-extrabold">You matched with</h2>
          <div className="text-3xl font-extrabold text-[var(--pear-green)] mt-1">Emily</div>

          {/* avatar */}
          <div
            className="w-36 h-36 mx-auto rounded-full flex items-center justify-center mt-4 shadow-inner"
            style={{ background: buddy.avatarBg }}
          >
            {/* vriendelijk hoofdje (emoji-stijl) */}
            <div className="text-6xl">🙂</div>
          </div>

          {/* eigenschappen */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {buddy.adjectives.map((a) => (
              <Chip key={a}>{a}</Chip>
            ))}
          </div>

          {/* je gekozen fruit als tags */}
          <div className="mt-3">
            <div className="opacity-70 text-sm mb-2">Shared tastes</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {picks.length === 0 ? (
                <Chip>🍐 Pear</Chip>
              ) : (
                picks.map((k) => (
                  <Chip key={k}>
                    {mapIcon[k] ?? "🍒"} {k.charAt(0).toUpperCase() + k.slice(1)}
                  </Chip>
                ))
              )}
            </div>
          </div>

          {/* CTA’s */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/feed"
              className="block w-full bg-[var(--pear-green)] text-white rounded-2xl py-3 font-semibold hover:brightness-95 transition"
            >
              Start Chat
            </Link>
            <Link
              href="/fruitpick/select"
              className="block w-full bg-[#F6C85C] text-[var(--ink)] rounded-2xl py-3 font-semibold hover:brightness-95 transition"
            >
              Next Pick
            </Link>
          </div>
        </div>

        <p className="text-center opacity-70 mt-4">
          🍊 Tip: wil je andere vibes? Probeer een nieuwe Fruit Pick.
        </p>
      </div>
    </main>
  );
}

