"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import PeearLogoV2 from "./components/PeearLogoV2";

/**
 * Peear Home – Night Garden + Social Proof + Fruit Cards + Timeline
 * - Dark mode: diepe paars/indigo met neon-glows
 * - Social proof (per refresh randomisering): peers joined + matches made + global community
 * - 3 visuele fruit-cards i.p.v. lange tekst
 * - Community timeline (dynamisch)
 * - Gouden CTA naar /community
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

// Helper voor random integer binnen bereik (incl. grenzen)
function randInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pearControls = useAnimationControls();
  const [pearTapped, setPearTapped] = useState(false);

  // Social proof – per refresh variabel
  const [peersJoined, setPeersJoined] = useState<number>(24);
  const [matchesMade, setMatchesMade] = useState<number>(75);

  // Community feed
  const [events, setEvents] = useState<CommunityEvent[]>(() => [
    { id: "e1", avatar: "🍐", name: "Lina", action: "just joined", time: "08:12" },
    { id: "e2", avatar: "🍊", name: "Mateo", action: "made a fruitful match", time: "08:09" },
    { id: "e3", avatar: "🍇", name: "Aisha", action: "shared a growth tip", time: "08:05" },
  ]);

  // Adem-animatie logo
  useEffect(() => {
    pearControls.start({
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [pearControls]);

  // Per refresh randomize peersJoined & matchesMade (kleine bandbreedte)
  useEffect(() => {
    setPeersJoined(randInt(20, 32)); // rond 24
    setMatchesMade(randInt(65, 90)); // rond 75
  }, []);

  // Community feed – voeg elke 10s een event toe (max 30)
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
                 text-emerald-900
                 dark:bg-[#0b0714] dark:text-violet-50"
    >
      {/* Night Garden neon glows for dark mode */}
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
                       dark:border-white/10 dark:bg-white/10 dark:text-violet-50 dark:hover:bg-white/15 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_28px_rgba(0,0,0,0.45)]"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          {menuOpen && (
            <nav
              role="menu"
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5
                         dark:bg-[#160a28]/95 dark:ring-white/10 dark:backdrop-blur-sm"
            >
              <ul className="py-2 text-left">
                {[
                  { href: "/about", label: "About Peear" },
                  { href: "/drop/select", label: "Start Pear Drop" },
                  { href: "/fruitpick", label: "Start Fruit Pick" },
                  { href: "/community", label: "Community Feed" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-green-900 hover:bg-green-50 dark:text-violet-50 dark:hover:bg-white/10"
                      role="menuitem"
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
        {/* Logo (tap → shimmer) */}
        <motion.button
          onClick={handlePearTap}
          animate={pearControls}
          whileTap={{ scale: 0.98 }}
          className="mb-6 z-10"
          aria-label="Tap the pear"
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
          Grow together. <span className="inline-block">Stay curious.</span>{" "}
          <span className="inline-block">Be fruitful. 🍐</span>
        </p>

        {/* CTAs */}
        <div className="flex w-full max-w-sm flex-col gap-4">
          <CTA href="/about" tone="green" label="About Peear" />
          <CTA href="/drop/select" tone="amber" label="Start Pear Drop" />
          <CTA href="/fruitpick" tone="orange" label="Start Fruit Pick" />
        </div>

        {/* Social proof (per refresh random) */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatPill icon="🫶" label={`${peersJoined} peers joined today`} />
          <StatPill icon="✨" label={`${matchesMade} fruitful matches made today`} />
          <StatPill icon="🌍" label="Global community" />
        </div>
      </section>

      {/* Why join – visuele fruit cards */}
      <section className="mx-auto mt-16 w-full max-w-2xl">
        <h2 className="mb-5 text-center text-2xl font-bold text-green-900 dark:text-violet-50 md:text-3xl">
          Why join Peear?
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FruitCard
            emoji="🍐"
            title="Social Skilling"
            line="Real growth starts with real people, not systems."
            gradientLight="from-emerald-100 to-emerald-50"
            gradientDark="from-fuchsia-900/40 to-emerald-900/40"
          />
          <FruitCard
            emoji="🍊"
            title="Character > Credentials"
            line="Match on who you are and who you can become."
            gradientLight="from-amber-100 to-orange-50"
            gradientDark="from-rose-900/40 to-amber-900/40"
          />
          <FruitCard
            emoji="🍋"
            title="Fun, fast & human"
            line="Playful formats keep learning alive."
            gradientLight="from-yellow-100 to-lime-50"
            gradientDark="from-indigo-900/40 to-lime-900/40"
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

        {/* Golden Join CTA */}
        <div className="mx-auto mt-6 flex max-w-2xl justify-center">
          <Link
            href="/community"
            className="group relative inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-300 to-amber-400 px-6 py-3 font-extrabold text-amber-950 shadow-lg ring-1 ring-black/5 transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:from-yellow-300 dark:to-amber-300"
          >
            <span className="text-lg">Join the Peear Community</span>
            <span className="text-xl">✨</span>

            {/* Delight: zachte golden glow op hover */}
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 dark:bg-white/10" />
          </Link>
        </div>
      </section>

      {/* Footer vignette */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(60%_40%_at_50%_10%,rgba(255,255,255,0.35),transparent)] dark:[background:radial-gradient(60%_40%_at_50%_10%,rgba(167,139,250,0.12),transparent)]" />
    </main>
  );
}

/** Components **/
function CTA({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: "green" | "amber" | "orange";
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
        whileTap={{ scale: 0.98 }}
        className={`relative isolate w-full rounded-2xl bg-gradient-to-b ${toneClasses} px-6 py-3 text-center text-lg font-semibold tracking-tight shadow-lg ring-1 ring-black/5 transition md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
      >
        {label}
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 dark:bg-white/10" />
      </motion.div>
    </Link>
  );
}

function StatPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-emerald-900 shadow-sm backdrop-blur dark:bg-purple-900/40 dark:text-violet-50">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function FruitCard({
  emoji,
  title,
  line,
  gradientLight,
  gradientDark,
}: {
  emoji: string;
  title: string;
  line: string;
  gradientLight: string;
  gradientDark: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border border-black/5 bg-gradient-to-b ${gradientLight} p-4 text-left shadow-sm backdrop-blur
                  dark:border-white/10 dark:${gradientDark}`}
    >
      <div className="mb-2 text-2xl">{emoji}</div>
      <h3 className="text-lg font-bold text-green-900 dark:text-violet-50">{title}</h3>
      <p className="mt-1 text-sm text-green-900/80 dark:text-violet-100/80">{line}</p>
    </motion.div>
  );
}
