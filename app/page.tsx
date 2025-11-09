"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import PeearLogoV2 from "./components/PeearLogoV2";

/**
 * Peear Home – Business Coaching (refined)
 * - Bovenaan 3 CTA-buttons + korte uitleg (zonder emoji)
 * - Roterende subline + dot indicator
 * - Testimonial + Metrics (duidelijk andere stijl dan buttons/why-join)
 * - Why join Peear: terug naar oude copy (zonder icon/emoticon)
 * - Subtiele ambience
 * - Menu -> /feed (404 fix)
 */

const FRUIT = ["🍐", "🍊", "🍎", "🍇", "🍓", "🍋", "🍒", "🍍"];
const SUBLINES = [
  "Real growth starts with real connection.",
  "Conversations that turn ideas into action.",
  "Grow through reflection, not perfection.",
  "Grow your business career through peer-to-peer coaching.",
];

const FruitSprite: React.FC<{ i: number }> = ({ i }) => {
  const size = useMemo(() => 14 + Math.round(Math.random() * 16), []);
  const left = useMemo(() => Math.random() * 100, []);
  const delay = useMemo(() => Math.random() * 8, []);
  const duration = useMemo(() => 18 + Math.random() * 12, []); // langzamer
  const fruit = useMemo(() => FRUIT[i % FRUIT.length], [i]);

  return (
    <motion.span
      className="pointer-events-none select-none absolute top-0 opacity-20 dark:opacity-40"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -20, rotate: 0 }}
      animate={{ y: "110vh", rotate: 8 }}
      transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      {fruit}
    </motion.span>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pearControls = useAnimationControls();
  const [pearTapped, setPearTapped] = useState(false);
  const [sublineIndex, setSublineIndex] = useState(0);

  // “Breathing” pear
  useEffect(() => {
    pearControls.start({
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [pearControls]);

  // Subline-rotatie (rustig)
  useEffect(() => {
    const t = setInterval(() => {
      setSublineIndex((i) => (i + 1) % SUBLINES.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const handlePearTap = () => {
    setPearTapped(true);
    setTimeout(() => setPearTapped(false), 1600);
  };

  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-start p-6 text-center
                 bg-[radial-gradient(120%_120%_at_50%_0%,#FAFAF2_0%,#FFF7E0_40%,#FFFDF5_100%)]
                 text-emerald-900 dark:bg-[#0b0714] dark:text-violet-50"
    >
      {/* Subtle ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hidden dark:block absolute -top-28 -right-24 w-[620px] h-[620px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
        <div className="hidden dark:block absolute bottom-[-120px] -left-24 w-[680px] h-[680px] rounded-full bg-indigo-500/20 blur-[180px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <FruitSprite key={i} i={i} />
        ))}
      </div>

      {/* Menu backdrop */}
      {menuOpen && (
        <button
          aria-label="Close menu backdrop"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Menu */}
      <div className="absolute right-4 top-4 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-black/5 bg-white/85 px-5 py-2.5 font-semibold text-green-900 shadow-sm hover:bg-white
                       dark:border-white/10 dark:bg-white/10 dark:text-violet-50 dark:hover:bg-white/15"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          {menuOpen && (
            <nav
              role="menu"
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-[#160a28]/95 dark:ring-white/10 dark:backdrop-blur-sm"
            >
              <ul className="py-2 text-left">
                {[
                  { href: "/about", label: "About Peear" },
                  { href: "/drop/select", label: "Start Peear Drop" },
                  { href: "/fruitpick", label: "Start Fruit Pick" },
                  { href: "/feed", label: "Community Feed" }, // 404 fix blijft
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-green-900 hover:bg-green-50 dark:text-violet-50 dark:hover:bg-white/10"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center pt-20">
        <motion.button
          onClick={handlePearTap}
          animate={pearControls}
          whileTap={{ scale: 0.98 }}
          className="mb-6 z-10"
        >
          <div className="relative">
            <PeearLogoV2 width={180} height={180} />
            {pearTapped && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 0 12px rgba(255,255,255,0.25) inset" }}
              />
            )}
          </div>
        </motion.button>

        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-green-900 dark:text-violet-100 md:text-5xl">
          Peear
        </h1>

        {/* Roterende subline + dot indicator */}
        <div className="mb-6 h-[64px] max-w-xl overflow-hidden flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={sublineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="text-lg leading-relaxed text-green-800 dark:text-fuchsia-100/90"
            >
              {SUBLINES[sublineIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="mt-3 flex gap-2">
            {SUBLINES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: sublineIndex === i ? 1.3 : 1,
                  opacity: sublineIndex === i ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                className={`h-2 w-2 rounded-full ${
                  sublineIndex === i ? "bg-emerald-700 dark:bg-fuchsia-300" : "bg-emerald-300 dark:bg-fuchsia-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOVENAAN: 3 buttons + korte uitleg */}
        <div className="grid w-full max-w-xl grid-cols-1 gap-3 md:grid-cols-3 text-left">
          <CTAButtonWithSub
            href="/drop/select"
            tone="amber"
            label="Start Peear Drop"
            sub="Find peers based on business goals."
          />
          <CTAButtonWithSub
            href="/fruitpick"
            tone="orange"
            label="Start Fruit Pick"
            sub="Discover unexpected and new peers."
          />
          <CTAButtonWithSub
            href="/about"
            tone="green"
            label="About Peear"
            sub="Why real connection matters."
          />
        </div>

        {/* HUMANITY + FACTS (duidelijk andere stijl) */}
        <section className="mx-auto mt-10 w-full max-w-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Grote quote (contrasterende gradient card) */}
            <motion.blockquote
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="md:col-span-2 rounded-2xl bg-gradient-to-b from-white to-emerald-50/60 p-5 text-left ring-1 ring-emerald-900/10 dark:from-[#151228] dark:to-[#0f0c20] dark:ring-white/10"
            >
              <p className="text-base leading-relaxed text-emerald-950 dark:text-violet-50">
                “I stopped networking — I started connecting.”
              </p>
              <footer className="mt-2 text-xs text-emerald-900/70 dark:text-violet-200/70">
                — Lara, Business Coach
              </footer>
            </motion.blockquote>

            {/* Twee metrics in ghost/outlined stijl */}
            <div className="grid grid-cols-1 gap-4">
              <MetricCard
                value="1,200+"
                title="Trusted professionals"
                desc="Coaches, founders and operators across 20+ countries."
              />
              <MetricCard
                value="80%"
                title="Continue beyond first talk"
                desc="Matches that lead to real collaboration and momentum."
              />
            </div>
          </div>
        </section>
      </section>

      {/* Why join – TERUG NAAR OUDE TEKSTEN */}
      <section className="mx-auto mt-16 w-full max-w-2xl pb-28">
        <h2 className="mb-5 text-center text-2xl font-bold text-green-900 dark:text-violet-50 md:text-3xl">
          Why join Peear?
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SolidInfoCard
            title="Social Skilling"
            line="Real growth starts with real people. Not with systems."
          />
          <SolidInfoCard
            title="Character beats Credentials"
            line="Match on who you are, and can become. Resumes excluded."
          />
          <SolidInfoCard title="Fun, fast & human" line="Playful formats keep learning alive." />
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- Components ------------------------------- */

function CTAButtonWithSub({
  href,
  tone,
  label,
  sub,
}: {
  href: string;
  tone: "green" | "amber" | "orange";
  label: string;
  sub: string;
}) {
  const toneClasses = {
    green:
      "from-emerald-700 to-emerald-800 text-white shadow-emerald-900/20 dark:from-emerald-400 dark:to-emerald-500 dark:text-[#07150f]",
    amber:
      "from-amber-400 to-amber-500 text-emerald-950 shadow-amber-900/10 dark:from-yellow-300 dark:to-yellow-300/90 dark:text-[#102012]",
    orange:
      "from-orange-400 to-orange-500 text-emerald-950 shadow-orange-900/10 dark:from-orange-400 dark:to-orange-300 dark:text-[#101a14]",
  }[tone];

  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        className={`relative isolate h-full rounded-2xl bg-gradient-to-b ${toneClasses} px-5 py-4 text-left shadow-lg ring-1 ring-black/5 transition`}
      >
        <div className="text-base font-extrabold tracking-tight md:text-lg">{label}</div>
        <div className="mt-1 text-xs opacity-85">{sub}</div>
      </motion.div>
    </Link>
  );
}

function MetricCard({
  value,
  title,
  desc,
}: {
  value: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-emerald-900/10 bg-white/70 p-5 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#121129]/60"
    >
      <div className="text-2xl font-extrabold tracking-tight text-emerald-900 dark:text-violet-50">
        {value}
      </div>
      <div className="mt-1 text-sm font-semibold text-emerald-900/90 dark:text-violet-100/90">
        {title}
      </div>
      <div className="mt-1 text-xs text-emerald-900/75 dark:text-violet-200/80">{desc}</div>
    </motion.div>
  );
}

function SolidInfoCard({ title, line }: { title: string; line: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-black/5 bg-white/85 p-4 text-left shadow-sm backdrop-blur hover:shadow-md dark:border-white/10 dark:bg-[#121129]/70"
    >
      <h3 className="text-lg font-bold text-green-900 dark:text-violet-50">{title}</h3>
      <p className="mt-1 text-sm text-green-900/80 dark:text-violet-100/80">{line}</p>
    </motion.div>
  );
}
