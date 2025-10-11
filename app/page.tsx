"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[rgba(255,253,246,1)] text-[color:var(--leaf)] dark:bg-[#0F1A0E] dark:text-white transition-colors duration-500">
      {/* Fruitige achtergrond */}
      <div className="absolute inset-0 overflow-hidden fruit-bg select-none pointer-events-none">
        <span className="fruit" style={{ top: "10%", left: "15%" }}>🍊</span>
        <span className="fruit" style={{ top: "20%", left: "70%" }}>🍓</span>
        <span className="fruit" style={{ top: "65%", left: "10%" }}>🍎</span>
        <span className="fruit" style={{ top: "75%", left: "80%" }}>🍐</span>
        <span className="fruit" style={{ top: "45%", left: "45%" }}>🍋</span>
      </div>

      <div className="relative z-10 max-w-md mx-auto text-center px-5 pt-12 pb-20">
        {/* LOGO — background-image + dark-mode switch */}
        <div aria-label="Peear logo" className="peear-logo mx-auto mb-6" />

        {/* Titel + tagline */}
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Peear</h1>
        <p className="text-[1.05rem] text-muted mb-8 dark:text-gray-300">
          Grow together. Stay curious. Be fruitful. 🍐
        </p>

        {/* CTA’s */}
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

      {/* Styles: robuuste logo-switch én hard override op blending */}
      <style jsx global>{`
        /* Zorg dat ALLE blends/inverts weg zijn, ongeacht eerdere CSS */
        .peear-logo,
        img[alt="Peear logo"],
        #brandLogo {
          mix-blend-mode: normal !important;
          filter: none !important;
        }

        /* Component styles */
        .peear-logo {
          width: 180px;
          height: 180px;
          background: url('/logo-peear.png?v=9') center / contain no-repeat;
          border-radius: 12px;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        @media (prefers-color-scheme: dark) {
          .peear-logo {
            background-image: url('/logo-peear-dark.png?v=9');
            filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.12));
          }
        }

        /* Fruit-animatie (onveranderd) */
        .fruit {
          position: absolute;
          font-size: 2.2rem;
          opacity: 0.2;
          animation: floatFruit 12s ease-in-out infinite;
        }
        @keyframes floatFruit {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
      `}</style>
    </main>
  );
}
