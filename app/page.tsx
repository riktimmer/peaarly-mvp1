"use client";

import Link from "next/link";
import PeearLogo from "./components/PeearLogo";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6 relative overflow-hidden">
      {/* Logo */}
      <div className="mb-8">
        <PeearLogo width={160} height={160} pulse />
      </div>

      {/* Titel en tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-3 tracking-tight">
        Peear
      </h1>
      <p className="text-lg text-green-800 mb-10 leading-relaxed">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* Drie knoppen */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/about"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition"
        >
          About Peear
        </Link>

        <Link
          href="/drop/select"
          className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 rounded-2xl transition"
        >
          Start Pear Drop
        </Link>

        <Link
          href="/fruitpick"
          className="bg-orange-400 hover:bg-orange-500 text-green-900 font-semibold py-3 rounded-2xl transition"
        >
          Start Fruit Pick
        </Link>
      </div>

      {/* Why join sectie */}
      <section className="mt-16 max-w-md text-green-900">
        <h2 className="text-2xl font-semibold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left text-lg">
          <li>🍐 Peer-to-Peer Growth</li>
          <li>🍊 Fresh Perspectives</li>
          <li>🌱 Earn credits by helping others</li>
        </ul>
      </section>

      {/* Zachte achtergrondglow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-green-200/30 rounded-full blur-[120px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </main>
  );
}
