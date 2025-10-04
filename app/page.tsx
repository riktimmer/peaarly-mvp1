"use client";

import React from "react";

/** Peaarly – Landing (Hero + What + Pear Drop + Fruit Pick + CTA) */
export default function Page() {
  return (
    <main className="min-h-screen bg-[#F4F6F0]">
      <TopNav />

      {/* HERO */}
      <section className="max-w-md mx-auto px-5 py-8">
        <Card>
          <div className="flex items-center justify-between">
            <BrandPear />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-[#1C4B2B] tracking-tight">
            Peaarly
          </h1>
          <p className="mt-2 text-[#2f3e34]">
            A no-nonsense peer mentoring community. We connect you based on who you are and the future you bring.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a href="#peardrop" className="btn-primary">Go to Pear Drop</a>
            <a href="#fruitpick" className="btn-secondary">Go to Fruit Pick</a>
          </div>
        </Card>
      </section>

      {/* WHAT IS PEAARLY */}
      <section className="max-w-md mx-auto px-5">
        <Card>
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="text-[#1C4B2B] text-lg"
            >
              ←
            </button>
            <SmallPear />
          </div>

          <h2 className="mt-2 text-2xl font-extrabold text-[#1C4B2B]">What is Peaarly?</h2>
          <p className="mt-2 text-[#2f3e34]">
            A C2C network for fresh curiosity, openness, and real growth.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3">
            <a href="#peardrop" className="btn-primary">Go to Pear Drop</a>
            <a href="#fruitpick" className="btn-secondary">Go to Fruit Pick</a>
          </div>
        </Card>
      </section>

      {/* PEAR DROP */}
      <section id="peardrop" className="max-w-md mx-auto px-5">
        <Card>
          <h3 className="text-2xl font-extrabold text-[#1C4B2B]">Enter your interests or challenges</h3>
          <p className="mt-2 text-[#2f3e34]">E.g. leadership, problem solving</p>

          <div className="mt-4">
            <input
              placeholder="Type your topic…"
              className="w-full rounded-xl border border-[#C8D7C2] bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F7A3E]"
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <MediumPear />
            <a className="btn-primary" href="#match">Start a Drop</a>
          </div>
        </Card>
      </section>

      {/* MATCH PREVIEW */}
      <section id="match" className="max-w-md mx-auto px-5">
        <Card>
          <div className="flex items-center gap-3">
            <Orange />
            <div>
              <p className="text-sm text-[#2f3e34]">You matched with</p>
              <p className="text-xl font-extrabold text-[#1C4B2B]">Emily</p>
              <p className="text-sm text-[#2f3e34]">Product Manager</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Analytical", "Mentor", "Focus"].map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full text-xs bg-[#E7F3E1] text-[#1C4B2B]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a className="mt-6 btn-primary inline-flex" href="#fruitpick">Start Chat</a>
        </Card>
      </section>

      {/* FRUIT PICK */}
      <section id="fruitpick" className="max-w-md mx-auto px-5">
        <Card>
          <h3 className="text-2xl font-extrabold text-[#1C4B2B]">Fruit Pick</h3>
          <p className="mt-2 text-[#2f3e34]">
            Pick the peers that fit your question. Equal in value. Never the same.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {["Sofia","Noah","Mia","Rui"].map((name) => (
              <div key={name} className="rounded-2xl border border-[#C8D7C2] bg-white p-4">
                <div className="h-8 w-8 rounded-full bg-[#2F7A3E] text-white grid place-items-center text-xs font-bold">
                  {name.slice(0,2).toUpperCase()}
                </div>
                <p className="mt-2 font-semibold text-[#1C4B2B]">{name}</p>
                <button className="mt-3 btn-secondary w-full">Pick</button>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className="max-w-md mx-auto px-5 pb-12">
        <Card>
          <h3 className="text-2xl font-extrabold text-[#1C4B2B]">Join the beta</h3>
          <p className="mt-2 text-[#2f3e34]">Be first to drop a question and pick your peers.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We’ll be in touch."); }}
            className="mt-4 flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-[#C8D7C2] bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F7A3E]"
            />
            <button className="btn-primary">Notify me</button>
          </form>
        </Card>
      </section>

      <footer className="py-8 text-center text-sm text-[#2f3e34]">
        © {new Date().getFullYear()} Peaarly — Character beats credentials.
      </footer>
    </main>
  );
}

/* ---------- UI bits ---------- */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] bg-white p-5 shadow-sm border border-[#DDE7D8] mb-6">
      {children}
    </div>
  );
}

function TopNav() {
  return (
    <div className="max-w-md mx-auto px-5 pt-5 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BrandPear small />
        <span className="font-semibold text-[#1C4B2B]">Peaarly</span>
      </div>
      <div className="text-sm">
        <a href="#peardrop" className="text-[#1C4B2B] hover:underline">Pear Drop</a>
        <span className="mx-2 text-[#9fb59a]">•</span>
        <a href="#fruitpick" className="text-[#1C4B2B] hover:underline">Fruit Pick</a>
      </div>
    </div>
  );
}

function BrandPear({ small = false }: { small?: boolean }) {
  const size = small ? 28 : 48;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <rect x="2" y="2" width="60" height="60" rx="12" fill="#E7F3E1" stroke="#9FCC8E" />
      <path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/>
      <circle cx="43.5" cy="12.8" r="2.4" fill="#2F7A3E"/>
    </svg>
  );
}

function SmallPear() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden>
      <path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/>
    </svg>
  );
}

function MediumPear() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden>
      <path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#F3C23C"/>
      <rect x="1" y="1" width="62" height="62" rx="16" fill="none" />
    </svg>
  );
}

function Orange() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="18" fill="#F59E0B"/>
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E"/>
    </svg>
  );
}

/* Buttons */
declare global { interface HTMLElementTagNameMap { } }
