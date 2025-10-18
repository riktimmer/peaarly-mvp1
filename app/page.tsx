"use client";

import Link from "next/link";
import React from "react";
import PeeearLogo from "./components/PeeearLogo"; // import de logo-component

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <PeeearLogo width={120} height={120} /> {/* gebruik de component */}
      </div>

      {/* Titel en tagline */}
      <h1 className="text-4xl font-bold text-green-900 mb-2">Peear</h1>
      <p className="text-lg text-green-800 mb-10">
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
          href="/drop"
          className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 rounded-2xl transition"
        >
          Drop Now 🍐
        </Link>

        <Link
          href="/fruitpick"
          className="bg-orange-400 hover:bg-orange-500 text-green-900 font-semibold py-3 rounded-2xl transition"
        >
          Fruit Pick 🍊
        </Link>
      </div>

      {/* Why join sectie */}
      <section className="mt-12 max-w-md text-green-900">
        <h2 className="text-2xl font-semibold mb-4">Why join Peear?</h2>
        <ul className="space-y-2 text-left">
          <li>🍐 Peer-to-Peer Growth</li>
          <li>🍊 Fresh Perspectives</li>
          <li>🌱 Earn credits by helping others</li>
        </ul>
      </section>
    </main>
  );
}
