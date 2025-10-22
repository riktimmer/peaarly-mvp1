"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PeearLogo from "./components/PeearLogo";

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  // (Optioneel) Unregister eventuele oude service workers die een oude bundle cachen
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations?.().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    }
  }, []);

  const hardNavigateToDrop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Forceer hard nav (fallback), zelfs als iets de click probeert te hijacken
    e.preventDefault();
    window.location.assign("/drop");
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6">
      {/* Menu knop rechtsboven */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-4 py-2 rounded-full bg-white/70 hover:bg-white shadow-sm border border-green-900/10 text-green-900 font-semibold transition"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
          >
            Menu
          </button>

          {menuOpen && (
            <nav
              id="main-menu"
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden z-50"
              role="menu"
            >
              <ul className="py-2 text-left">
                <li>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                    prefetch={false}
                  >
                    About Peear
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.peear.io/drop"
                    onClick={hardNavigateToDrop}
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    role="menuitem"
                  >
                    Start Pear Drop
                  </a>
                </li>
                <li>
                  <Link
                    href="/fruitpick"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                    prefetch={false}
                  >
                    Start Fruit Pick
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feed"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                    prefetch={false}
                  >
                    Community Feed
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="mb-8 z-10">
        <PeearLogo />
      </div>

      {/* Titel en tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2 tracking-tight z-10">
        Peear
      </h1>
      <p className="text-lg md:text-xl text-green-800 mb-10 z-10">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* Actieknoppen */}
      <div className="flex flex-col gap-4 w-full max-w-sm z-10">
        <Link
          href="/about"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition shadow-sm text-center"
          aria-label="Go to About Peear"
          prefetch={false}
        >
          About Peear
        </Link>

        {/* Hard link + fallback JS naar /drop */}
        <a
          href="https://www.peear.io/drop"
          onClick={hardNavigateToDrop}
          className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm text-center"
          aria-label="Start Pear Drop"
        >
          Start Pear Drop
        </a>

        <Link
          href="/fruitpick"
          className="bg-orange-400 hover:bg-orange-500 text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm text-center"
          aria-label="Start Fruit Pick"
          prefetch={false}
        >
          Start Fruit Pick
        </Link>
      </div>

      {/* Why join sectie */}
      <section className="mt-12 max-w-md text-green-900 z-10">
        <h2 className="text-2xl font-semibold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left">
          <li>🍐 Peer-to-Peer Growth</li>
          <li>🍊 Fresh Perspectives</li>
          <li>🌱 Earn credits by helping others</li>
        </ul>
      </section>

      {/* Inert achtergrond zodat niets kliks onderschept */}
      <div className="absolute inset-0 -z-10 pointer-events-none" />
    </main>
  );
}
