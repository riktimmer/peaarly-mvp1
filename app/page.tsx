"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

/**
 * Peear Home
 * - Rich gradient (light + dark)
 * - Floating pear logo with Easter egg (tap → golden pear sparkle)
 * - Micro-interaction buttons (juicy bounce + glow in dark mode)
 * - Feature strip + social proof + ambient fruit sprites
 * - Fully responsive & accessible
 */

/** SVGs **/
const PearSVG: React.FC<{ golden?: boolean }> = ({ golden }) => (
  <svg
    viewBox="0 0 200 240"
    className="w-40 h-48 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] md:w-48 md:h-56"
    role="img"
    aria-label={golden ? "Golden pear" : "Pear logo"}
  >
    <defs>
      <radialGradient id="pearShine" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor={golden ? "#FFEAA0" : "#9EE493"} />
        <stop offset="100%" stopColor={golden ? "#E7B400" : "#2E7D32"} />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0" x2="1">
        <stop offset="0%" stopColor={golden ? "#FFEAA0" : "#3FA34D"} />
        <stop offset="100%" stopColor={golden ? "#E7B400" : "#1B5E20"} />
      </linearGradient>
    </defs>
    <g>
      {/* stem */}
      <rect x="96" y="30" width="8" height="28" rx="4" fill={golden ? "#B28900" : "#4E342E"} />
      {/* leaf */}
      <path d="M110 26c28 0 40 24 18 38-18 12-44 4-46-10 6-18 20-28 28-28z" fill="url(#leafGrad)" />
      {/* body */}
      <path
        d="M100 70c-40 0-68 36-64 75 4 41 30 75 64 75s60-34 64-75c4-39-24-75-64-75z"
        fill="url(#pearShine)"
      />
      {/* highlight */}
      <ellipse cx="78" cy="120" rx="18" ry="26" fill={golden ? "#FFF4C8" : "#CFF6C9"} opacity=".55" />
    </g>
  </svg>
);

/** Ambient fruit emoji that drift gently **/
const FRUIT = ["🍐", "🍊", "🍎", "🍇", "🍓", "🍋", "🍒", "🍍"];

const FruitSprite: React.FC<{ i: number }> = ({ i }) => {
  const size = useMemo(() => 16 + Math.round(Math.random() * 18), []);
  const left = useMemo(() => Math.random() * 100, []);
  const delay = useMemo(() => Math.random() * 6, []);
  const duration = useMemo(() => 10 + Math.random() * 10, []);
  const fruit = useMemo(() => FRUIT[i % FRUIT.length], [i]);

  return (
    <motion.span
      className="pointer-events-none select-none absolute top-0 opacity-30 dark:opacity-40"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ y: -20, rotate: 0 }}
      animate={{ y: "110vh", rotate: 15 }}
      transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      {fruit}
    </motion.span>
  );
};

const StatPill: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-emerald-900 shadow-sm backdrop-blur dark:bg-emerald-900/40 dark:text-emerald-50">
    <span className="text-base">{icon}</span>
    <span>{label}</span>
  </div>
);

export default function Home() {
  const [golden, setGolden] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const pearControls = useAnimationControls();

  // Gentle breathing motion
  useEffect(() => {
    pearControls.start({
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [pearControls]);

  // Social proof counter (fake but delightful)
  useEffect(() => {
    const base = 12 + Math.floor(Math.random() * 20);
    setJoinCount(base);
    const t = setInterval(() => setJoinCount((c) => c + (Math.random() > 0.6 ? 1 : 0)), 4000);
    return () => clearInterval(t);
  }, []);

  // Easter egg: tap pear → golden for 1.6s
  const triggerGolden = () => {
    setGolden(true);
    setTimeout(() => setGolden(false), 1600);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#FFF6E7_0%,#F3FBF4_35%,#F9FFF7_100%)] text-emerald-900 dark:bg-[radial-gradient(120%_120%_at_50%_-10%,#0c1b17_0%,#062018_50%,#03130f_100%)] dark:text-emerald-50">
      {/* Ambient fruit */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <FruitSprite key={i} i={i} />
        ))}
      </div>

      {/* Content container */}
      <main className="relative mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-16 md:pt-24">
        {/* Menu stub (keeps your existing menu top-right space) */}
        <div className="absolute right-6 top-6">
          <Link
            href="#menu"
            className="rounded-full bg-white/70 px-5 py-2 text-sm font-semibold text-emerald-800 shadow-md backdrop-blur hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-emerald-900/50 dark:text-emerald-50 dark:hover:bg-emerald-900/70"
          >
            Menu
          </Link>
        </div>

        {/* Logo + heading */}
        <motion.button
          onClick={triggerGolden}
          animate={pearControls}
          whileTap={{ scale: 0.98 }}
          className="mt-4"
          aria-label="Tap the pear"
        >
          <PearSVG golden={golden} />
        </motion.button>

        <div className="mt-6 text-center">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">Peear</h1>
          <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-emerald-800/90 dark:text-emerald-100/90">
            Grow together. <span className="inline-block">Stay curious.</span> <span className="inline-block">Be fruitful. 🍐</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col gap-4">
          <CTAButton href="/about" label="About Peear" emoji="ℹ️" tone="green" />
          <CTAButton href="/drop" label="Start Pear Drop" emoji="🍐" tone="amber" />
          <CTAButton href="/pick" label="Start Fruit Pick" emoji="🍊" tone="orange" />
        </div>

        {/* Social proof */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <StatPill icon="🫶" label={`${joinCount} peers joined today`} />
          <StatPill icon="✨" label={`$${(joinCount * 3).toFixed(0)} credits earned`} />
          <StatPill icon="🌍" label="Global community" />
        </div>

        {/* Feature trio */}
        <section className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard icon="🍏" title="Peer Growth" desc="Match on character & potential, not titles." />
          <FeatureCard icon="🍊" title="Fresh Perspectives" desc="Learn by sharing real challenges." />
          <FeatureCard icon="🍇" title="Earn Credits" desc="Help others, harvest rewards." />
        </section>

        {/* Footer blurb */}
        <p className="mt-10 text-center text-sm text-emerald-800/70 dark:text-emerald-100/60">
          Tip: tap the pear for a golden surprise ✨
        </p>
      </main>

      {/* Soft vignette / glow for dark-mode richness */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(60%_40%_at_50%_10%,rgba(255,255,255,0.35),transparent)] dark:[background:radial-gradient(60%_40%_at_50%_10%,rgba(62,255,197,0.07),transparent)]" />
    </div>
  );
}

/** Components **/
function CTAButton({ href, label, emoji, tone }: { href: string; label: string; emoji: string; tone: "green" | "amber" | "orange" }) {
  const toneClasses = {
    green:
      "from-emerald-700 to-emerald-800 text-white shadow-emerald-900/20 dark:from-emerald-500 dark:to-emerald-600",
    amber:
      "from-amber-400 to-amber-500 text-emerald-950 shadow-amber-900/10 dark:from-amber-300 dark:to-amber-400",
    orange:
      "from-orange-400 to-orange-500 text-emerald-950 shadow-orange-900/10 dark:from-orange-300 dark:to-orange-400",
  }[tone];

  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`relative isolate w-full rounded-2xl bg-gradient-to-b ${toneClasses} px-6 py-4 text-center text-lg font-extrabold tracking-tight shadow-lg ring-1 ring-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:text-xl`}
      >
        <span className="mr-2">{emoji}</span>
        {label}
        {/* juicy shine */}
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 dark:bg-white/10" />
      </motion.div>
    </Link>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-emerald-900/5 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-emerald-50/10 dark:bg-emerald-900/30"
    >
      <div className="mb-1 text-2xl">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-100/80">{desc}</p>
    </motion.div>
  );
}
