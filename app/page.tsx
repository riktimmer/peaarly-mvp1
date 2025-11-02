"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import PeearLogoV2 from "./components/PeearLogoV2";

/**
 * Peear Home – fruitige hero, social proof en live community-strip
 * - Menu linkt naar /feed (404 fix)
 * - Donkere modus glow
 * - Kleine UX-scherpstellingen
 */

const FRUIT = ["🍐", "🍊", "🍎", "🍇", "🍓", "🍋", "🍒", "🍍"];

const FruitSprite: React.FC<{ i: number }> = ({ i }) => {
  const size = useMemo(() => 16 + Math.round(Math.random() * 18), []);
  const left = useMemo(() => Math.random() * 100, []);
  const delay = useMemo(() => Math.random() * 6, []);
  const duration = useMemo(() => 10 + Math.random() * 10, []);
  const fruit = useMemo(() => FRUIT[i % FRUIT.length], [i]);

  return (
    <motion.span
      className="pointer-events-none select-none absolute top-0 opacity-30 dark:opacity-50"
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

type CommunityEvent = { id: string; avatar: string; name: string; action: string; time: string };
const NAMES = ["Lina", "Mateo", "Aisha", "Noah", "Kai", "Zoe", "Amir", "Mila", "Jules", "Aria"];
const ACTIONS = [
  "just joined",
  "made a fruitful match",
  "shared a growth tip",
  "gave kudos",
  "started a peer session",
];
const AVATARS = ["🍐", "🍊", "🍎", "🍇", "🍓", "🍋", "🍒", "🍍"];

function randomEvent(): CommunityEvent {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  const ts = new Date();
  const time = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { id: `${ts.getTime()}-${Math.random()}`, avatar, name, action, time };
}

function randInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pearControls = useAnimationControls();
  const [pearTapped, setPearTapped] = useState(false);
  const [peersJoined, setPeersJoined] = useState<number>(25);
  const [matchesMade, setMatchesMade] = useState<number>(88);
  const [events, setEvents] = useState<CommunityEvent[]>(() => [
    { id: "e1", avatar: "🍐", name: "Lina", action: "just joined", time: "08:12" },
    { id: "e2", avatar: "🍊", name: "Mateo", action: "made a fruitful match", time: "08:09" },
    { id: "e3", avatar: "🍇", name: "Aisha", action: "shared a growth tip", time: "08:05" },
  ]);

  // “Breathing” pear
  useEffect(() => {
    pearControls.start({
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [pearControls]);

  // Willekeurige aantallen bij load
  useEffect(() => {
    setPeersJoined(randInt(22, 28));
    setMatchesMade(randInt(80, 95));
  }, []);

  // Live community ticker
  useEffect(() => {
    const t = setInterval(() => {
      setEvents((prev) => {
        const next = [randomEvent(), ...prev];
        return next.slice(0, 30);
      });
    }, 10000);
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
      {/* Dark glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hidden dark:block absolute -top-28 -right-24 w-[620px] h-[620px] rounded-full bg-fuchsia-500/20 blur-[160px]" />
        <div className="hidden dark:block absolute bottom-[-120px] -left-24 w-[680px] h-[680px] rounded-full bg-indigo-500/25 blur-[180px]" />
        <div className="hidden dark:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-emerald-400/20 blur-[160px]" />
      </div>

      {/* Ambient fruit */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 14 }).map((_, i) => (
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
                  { href: "/drop/select", label: "Start Pear Drop" },
                  { href: "/fruitpick", label: "Start Fruit Pick" },
                  // ✅ aangepast van /community naar /feed
                  { href: "/feed", label: "Community Feed" },
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
        <p className="mb-8 max-w-md text-lg leading-relaxed text-green-800 dark:text-fuchsia-100/90">
          Grow together. Stay curious. Be fruitful. 🍐
        </p>

        {/* CTA’s */}
        <div className="flex w-full max-w-sm flex-col gap-4">
          <CTA href="/about" tone="green" label="About Peear" />
          <CTA href="/drop/select" tone="amber" label="Start Pear Drop" />
          <CTA href="/fruitpick" tone="orange" label="Start Fruit Pick" />
        </div>

        {/* Social proof */}
        <div className="mt-8 w-full max-w-md mx-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <StatPill icon="🍉" label={`${peersJoined} peers joined today`} glow />
            <StatPill icon="🥝" label="Global community" glow />
          </div>
          <div>
            <StatPill icon="🍌" label={`${matchesMade} fruitful matches today`} />
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto mt-16 w-full max-w-2xl">
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
          <SolidInfoCard
            title="Fun, fast & human"
            line="Playful formats keep learning alive."
          />
        </div>
      </section>

      {/* Community timeline */}
      <section className="mx-auto mt-16 w-full max-w-2xl pb-28">
        <div className="sticky top-0 z-10 mb-3 -mx-6 border-b border-black/5 bg-white/70 px-6 py-3 backdrop-blur dark:border-white/10 dark:bg-[#0b0714]/80">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <h3 className="text-left text-xl font-bold text-green-900 dark:text-violet-100">
              Community
            </h3>
            <span className="text-sm text-green-900/70 dark:text-fuchsia-200/80">Live updates</span>
          </div>
        </div>

        <ul className="space-y-3">
          {events.map((ev) => (
            <li
              key={ev.id}
              className="rounded-2xl border border-black/5 bg-white/80 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#160a28]/60"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-xl shadow-sm dark:bg-fuchsia-500/20 dark:text-fuchsia-200">
                  {ev.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-green-900 dark:text-violet-100">{ev.name}</p>
                    <span className="text-sm text-green-800/70 dark:text-fuchsia-200/70">
                      {ev.time}
                    </span>
                  </div>
                  <p className="text-green-900/90 dark:text-violet-50/90">{ev.action}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Gouden CTA */}
        <div className="mx-auto mt-6 flex max-w-2xl justify-center">
          <Link
            href="/feed"
            className="group relative inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-300 to-amber-400 px-6 py-3 font-extrabold text-amber-950 shadow-lg ring-1 ring-black/5 transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:from-yellow-300 dark:to-amber-300"
          >
            <span className="text-lg">Join the Peear Community</span>
            <span className="text-xl">✨</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------- Components ------------------------------- */
function CTA({ href, label, tone }: { href: string; label: string; tone: "green" | "amber" | "orange" }) {
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
        whileTap={{ scale: 0.98 }}
        className={`relative isolate w-full rounded-2xl bg-gradient-to-b ${toneClasses} px-6 py-3 text-center text-lg font-semibold tracking-tight shadow-lg ring-1 ring-black/5 transition md:text-xl`}
      >
        {label}
      </motion.div>
    </Link>
  );
}

function StatPill({ icon, label, glow }: { icon: string; label: string; glow?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-emerald-900 shadow-sm backdrop-blur dark:text-violet-50 ${
        glow ? "dark:shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "dark:bg-purple-900/40"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
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
