"use client";

import React, { useState } from "react";
import Link from "next/link";
import PeearLogoV2 from "./components/PeearLogoV2";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#FAFAF2] to-[#FFF7E0] dark:from-[#0f1d14] dark:to-[#183b28] transition-colors duration-500">
      {/* Menu tab rechtsboven */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-green-900 font-semibold shadow-sm border border-green-900/10 transition dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
          {menuOpen && (
            <nav
              role="menu"
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden dark:bg-[#0f261c] dark:ring-white/10"
            >
              <ul className="py-2 text-left">
                <li>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900 dark:text-green-100 dark:hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    About Peear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/drop/select"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900 dark:text-green-100 dark:hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Start Pear Drop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fruitpick"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900 dark:text-green-100 dark:hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Start Fruit Pick
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900 dark:text-green-100 dark:hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Community Feed
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Logo – V2 (bewust andere componentnaam tegen caching) */}
      <div className="mb-8 drop-shadow-lg transition-transform hover:scale-105">
        <PeearLogoV2 width={180} height={180} />
      </div>

      {/* Titel en tagline */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-green-900 dark:text-green-100 mb-3">
        Peear
      </h1>
      <p className="text-lg md:text-xl text-green-800 dark:text-green-200/90 mb-10 leading-relaxed">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* CTA's */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          href="/about"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition shadow-sm dark:bg-green-600 dark:hover:bg-green-500"
        >
          About Peear
        </Link>

        <Link
          href="/drop/select"
          className="bg-[#F0B429] hover:bg-[#E3A21A] text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm dark:bg-[#D99A18] dark:hover:bg-[#C98E15] dark:text-[#102b1f]"
        >
          Start Pear Drop
        </Link>

        <Link
          href="/fruitpick"
          className="bg-[#FF944D] hover:bg-[#FF8533] text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm dark:bg-[#E67E36] dark:hover:bg-[#D8712D] dark:text-[#102b1f]"
        >
          Start Fruit Pick
        </Link>
      </div>

      {/* Why join sectie */}
      <section className="mt-16 max-w-md text-green-900 dark:text-green-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left text-lg">
          <li>🍐 Peer-to-Peer Growth</li>
          <li>🍊 Fresh Perspectives</li>
          <li>🌱 Earn credits by helping others</li>
        </ul>
      </section>

      {/* Fruitige achtergrond accenten */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-[620px] h-[620px] bg-green-300/25 dark:bg-green-900/30 rounded-full blur-[120px] absolute -top-20 -right-24" />
        <div className="w-[520px] h-[520px] bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-[120px] absolute bottom-0 -left-24" />
      </div>
    </main>
  );
}
