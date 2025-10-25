"use client";

import React, { useState } from "react";
import Link from "next/link";
import PeearLogoV2 from "./components/PeearLogoV2";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center p-6
                     bg-gradient-to-b from-[#FAFAF2] to-[#FFF7E0]
                     dark:bg-[#0b1410] dark:via-[#0b1410] dark:to-[#0b1410]">

      {/* Dark-mode ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hidden dark:block absolute -top-24 -right-20 w-[560px] h-[560px] rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="hidden dark:block absolute bottom-0 -left-24 w-[520px] h-[520px] rounded-full bg-yellow-400/12 blur-[140px]" />
      </div>

      {/* Backdrop when menu open */}
      {menuOpen && (
        <button
          aria-label="Close menu backdrop"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Menu */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="px-5 py-2.5 rounded-full bg-white/85 text-green-900 font-semibold shadow-sm border border-black/5
                       hover:bg-white
                       dark:bg-white/10 dark:text-emerald-100 dark:hover:bg-white/15 dark:border-white/10
                       dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_28px_rgba(0,0,0,0.45)]"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          {menuOpen && (
            <nav role="menu"
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden z-50
                         dark:bg-[#0f261c]/95 dark:ring-white/10 dark:backdrop-blur-sm">
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
                      className="block px-4 py-3 text-green-900 hover:bg-green-50
                                 dark:text-emerald-100 dark:hover:bg-white/10"
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

      {/* Logo */}
      <div className="mb-8 drop-shadow-lg transition-transform hover:scale-105 z-10">
        <PeearLogoV2 width={180} height={180} />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-green-900 dark:text-emerald-200 mb-3">
        Peear
      </h1>
      <p className="text-lg md:text-xl text-green-800 dark:text-emerald-200/90 mb-10 leading-relaxed">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {/* Groen */}
        <Link
          href="/about"
          className="py-3 rounded-2xl font-semibold text-white transition
                     bg-green-700 hover:bg-green-800 shadow-sm
                     dark:bg-emerald-400 dark:hover:bg-emerald-300 dark:text-[#07150f]
                     dark:ring-1 dark:ring-white/15 dark:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:dark:shadow-[0_0_46px_rgba(16,185,129,0.7)]">
          About Peear
        </Link>

        {/* Geel */}
        <Link
          href="/drop/select"
          className="py-3 rounded-2xl font-semibold text-green-900 transition
                     bg-[#F0B429] hover:bg-[#E3A21A] shadow-sm
                     dark:bg-yellow-300 dark:hover:bg-yellow-200 dark:text-[#102012]
                     dark:ring-1 dark:ring-white/15 dark:shadow-[0_0_30px_rgba(250,204,21,0.45)] hover:dark:shadow-[0_0_46px_rgba(250,204,21,0.7)]">
          Start Pear Drop
        </Link>

        {/* Oranje */}
        <Link
          href="/fruitpick"
          className="py-3 rounded-2xl font-semibold text-green-900 transition
                     bg-[#FF944D] hover:bg-[#FF8533] shadow-sm
                     dark:bg-orange-400 dark:hover:bg-orange-300 dark:text-[#101a14]
                     dark:ring-1 dark:ring-white/15 dark:shadow-[0_0_30px_rgba(249,115,22,0.45)] hover:dark:shadow-[0_0_46px_rgba(249,115,22,0.7)]">
          Start Fruit Pick
        </Link>
      </div>

      {/* Why join */}
      <section className="mt-16 max-w-md text-green-900 dark:text-emerald-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left text-lg">
          <li>🍐 Peer-to-Peer Growth</li>
          <li>🍊 Fresh Perspectives</li>
          <li>🌱 Earn credits by helping others</li>
        </ul>
      </section>
    </main>
  );
}
