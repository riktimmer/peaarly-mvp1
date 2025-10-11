"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[rgba(255,253,246,1)] text-[color:var(--leaf)] dark:bg-[#0F1A0E] dark:text-white transition-colors duration-500">
      {/* Zwevend fruit op achtergrond */}
      <div className="absolute inset-0 overflow-hidden fruit-bg select-none pointer-events-none">
        <span className="fruit" style={{ top: "10%", left: "15%" }}>🍊</span>
        <span className="fruit" style={{ top: "20%", left: "70%" }}>🍓</span>
        <span className="fruit" style={{ top: "65%", left: "10%" }}>🍎</span>
        <span className="fruit" style={{ top: "75%", left: "80%" }}>🍐</span>
        <span className="fruit" style={{ top: "45%", left: "45%" }}>🍋</span>
      </div>

      <div className="relative z-10 max-w-md mx-auto text-center px-5 pt-12 pb-20">
        {/* LOGO – automatische light/dark switch */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <picture>
            {/* witte versie voor dark mode */}
            <source srcSet="/logo-peear-dark.png" media="(prefers-color-scheme: dark)" />
            {/* groene standaardversie voor light mode */}
            <img
              src="/logo-peear.png"
              alt="Peear logo"
              width={180}
              height={180}
              className="mx-auto drop-shadow-sm bg-transparent rounded-lg transition-all duration-500"
            />
          </picture>
        </div>

        {/* Titel + tagline */}
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Peear</h1>
        <p className="text-[1.05rem] text-muted mb-8 dark:text-gray-300">
          Grow together. Stay curious. Be fruitful. 🍐
        </p>

        {/* CTA knoppen */}
        <div className="flex flex-col gap-4 mt-10">
          <Link
            href="/drop/select"
            className="btn-primary py-3 rounded-2xl text-lg font-bold shadow-sm"
          >
            Go to Pear Drop
          </Link>
          <Link
            href="/feed"
            className="bg-[#F5D48A] text-[color:var(--leaf)] font-bold py-3 rounded-2xl text-lg hover:brightness-95 transition shadow-sm dark:bg-[#FFD26E] dark:text-[#0F1A0E]"
          >
            Go to Community Feed
          </Link>
        </div>

        {/* Why join Peear */}
        <section className="mt-16 space-y-5">
          <h2 className="text-[1.25rem] font-extrabold">Why join Peear?</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🍐</span>
              <span className="font-semibold">Peer-to-Peer Growth</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🍊</span>
              <span className="font-semibold">Fresh Perspectives</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🍓</span>
              <span className="font-semibold">Fun & Fruitful Learning</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-sm text-muted flex items-center justify-center gap-2 dark:text-gray-400">
          <span>Made with 🍐 🍓 🍊 by Peear</span>
        </footer>
      </div>
    </main>
  );
}
