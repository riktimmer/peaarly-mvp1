"use client";

import React, { useState } from "react";
import Link from "next/link";

// LET OP: dit is de juiste bestandsnaam in je repo (PeearLogo.tsx)
import PeearLogo from "./components/PeearLogo";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6">
      {/* Menu tab rechtsboven */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="px-4 py-2 rounded-full bg-white/70 hover:bg-white shadow-sm border border-green-900/10 text-green-900 font-semibold transition"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>

          {menuOpen && (
            <nav
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
              role="menu"
            >
              <ul className="py-2 text-left">
                <li>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    About Peear.io
                  </Link>
                </li>
                <li>
                  <Link
                    href="/drop"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Start Peear Drop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fruitpick"
                    className="block px-4 py-2 hover:bg-green-50 text-green-900"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Start Fruit Pick
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="mb-8">
        <PeearLogo width={120} height={120} />
      </div>

      {/* Titel en tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2 tracking-tight">
        Peear
      </h1>
      <p className="text-lg md:text-xl text-green-800 mb-10">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* Drie knoppen */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          href="/about"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition shadow-sm"
        >
          About Peear.io
        </Link>

        <Link
          href="/drop"
          className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm"
        >
          Start Peear Drop
        </Link>

        <Link
          href="/fruitpick"
          className="bg-orange-400 hover:bg-orange-500 text-green-900 font-semibold py-3 rounded-2xl transition shadow-sm"
        >
          Start Fruit Pick
        </Link>
      </div>

      {/* Why join sectie */}
      <section className="mt-12 max-w-md text-green-900">
        <h2 className="text-2xl font-semibold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left">
