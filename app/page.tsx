"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import PeearLogoV2 from "./components/PeearLogoV2";

/**
 * Peear Home – Business Coaching (v-next)
 * - (3) Pillars i.p.v. knoppen (editorial style)
 * - (4) Human quotes onder de pillars
 * - (5) Social proof = betekenisvol bewijs (geen fruit-stats)
 * - (6) Subtielere ambience + breathing pulse
 * - (7) Why join: intro + abstracte iconen
 * - Subline rotatie + dot-indicator behouden
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
      {/* Hero breathing pulse */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-emerald-300/20 dark:bg-fuchsia-500/15 blur-3xl"
        animate={{ scale: [1, 1.04, 1], opacity: [0.55, 0.7, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hidden dark:block absolute -top-28 -right-24 w-[620px] h-[620px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
        <div className="hidden dark:block absolute bottom-[-120px] -left-24 w-[680px] h-[680px] rounded-full bg-indigo-500/20 blur-[180px]" />
      </div>

      {/* Subtiele ambient fruit (minder, langzamer) */}
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

        {/* Kleine emotionele tagline boven 'Peear' (optioneel, compact) */}
        <p className="mb-2 text-sm text-emerald-800/80 dark:text-fuchsia-100/70">
          The human way to grow your business.
        </p>

        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-green-900 dark:text-violet-100 md:text-5xl">
          Peear
        </h1>

        {/* Roterende subline + dot indicator */}
        <div className="mb-5 h-[64px] max-w-xl overflow-hidden flex flex-col items-center">
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

        {/* (3) Pillars – editorial style */}
        <div className="grid w-full max-w-xl grid-cols-1 gap-3 text-left md:grid-cols-3">
          <Pillar
            href="/drop/select"
            tone="amber"
            title="Drop your growth goal"
            line="Find peers based on your business goals."
          />
          <Pillar
            href="/fruitpick"
            tone="orange"
            title="Discover unexpected peers"
            line="Meet spontaneous matches."
          />
          <Pillar
            href="/about"
            tone="green"
            title="Why real connection matters"
            line="Learn how we spark real growth."
          />
        </div>

        {/* (4) Moment of humanity – korte quotes */}
        <section className="mx-auto mt-8 w-full max-w-xl">
          <h3 className="mb-3 text-left text-sm font-semibold tracking-wide text-emerald-900/80 dark:text-violet-100/80">
            What Peears are saying
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <QuoteCard
              quote="I stopped networking — I started connecting."
              author="Lara"
              role="Business Coach"
            />
            <QuoteCard
              quote="It’s like meeting your next mentor, by accident."
              author="Noah"
              role="Founder"
            />
          </div>
        </section>

        {/* (5) Betekenisvolle social proof */}
        <section className="mx-auto mt-8 w-full max-w-xl">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ProofCard
              title="Trusted by 1,200+ professionals"
              line="Coaches, founders and operators across 20+ countries."
            />
            <ProofCard
              title="80% continue beyond the first talk"
              line="Matches that lead to real collaboration and momentum."
            />
          </div>
        </section>
      </section>

      {/* (7) Why join – intro + abstracte iconen */}
      <section className="mx-auto mt-16 w-full max-w-2xl pb-28">
        <p className="mb-2 text-sm text-emerald-900/80 dark:text-violet-100/80">
          Real growth happens when peers coach peers. That’s why Peear is built around three principles:
        </p>
        <h2 className="mb-5 text-center text-2xl font-bold text-green-900 dark:text-violet-50 md:text-3xl">
          Why join Peear?
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PrincipleCard icon="🌿" title="People-based learning" line="Real growth starts with real people. Not with systems." />
          <PrincipleCard icon="💬" title="Character > credentials" line="Match on who you are and can become." />
          <PrincipleCard icon="⚡" title="Human energy" line="Playful formats keep learning alive." />
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- Components ------------------------------- */

function Pillar({
  href,
  tone,
  title,
  line,
}: {
  href: string;
  tone: "green" | "amber" | "orange";
  title: string;
  line: string;
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
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{ y: -2 }}
        className={`relative isolate h-full rounded-2xl bg-gradient-to-b ${toneClasses} px-5 py-4 text-left shadow-lg ring-1 ring-black/5 transition`}
      >
        <div className="text-base font-extrabold tracking-tight md:text-lg">{title}</div>
        <div className="mt-0.5 text-xs italic opacity-80">{line}</div>
      </motion.div>
    </Link>
  );
}

function QuoteCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-black/5 bg-white/85 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#121129]/70"
    >
      <p className="text-sm text-green-900/90 dark:text-violet-50/90">“{quote}”</p>
      <footer className="mt-2 text-xs text-emerald-900/70 dark:text-violet-200/70">
        — {author}, {role}
      </footer>
    </motion.blockquote>
  );
}

function ProofCard({ title, line }: { title: string; line: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-black/5 bg-white/85 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#121129]/70"
    >
      <h4 className="text-base font-bold text-green-900 dark:text-violet-50">{title}</h4>
      <p className="mt-1 text-xs text-green-900/80 dark:text-violet-100/80">{line}</p>
    </motion.div>
  );
}

function PrincipleCard({ icon, title, line }: { icon: string; title: string; line: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-black/5 bg-white/85 p-4 text-left shadow-sm backdrop-blur hover:shadow-md dark:border-white/10 dark:bg-[#121129]/70"
    >
      <div className="mb-1 text-xl">{icon}</div>
      <h3 className="text-lg font-bold text-green-900 dark:text-violet-50">{title}</h3>
      <p className="mt-1 text-sm text-green-900/80 dark:text-violet-100/80">{line}</p>
    </motion.div>
  );
}
