// app/about/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Peear",
  description:
    "Peear is a peer-to-peer mentoring community where character and potential drive growth.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#FAFAF2] text-green-900
                     dark:bg-[#0b1410] dark:text-emerald-100">

      {/* Dark ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hidden dark:block absolute -top-24 -right-20 w-[520px] h-[520px] rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="hidden dark:block absolute bottom-0 -left-24 w-[480px] h-[480px] rounded-full bg-yellow-400/12 blur-[140px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-900/10 bg-white/70 px-4 py-1 text-sm font-medium
                        dark:bg-white/10 dark:border-white/15 dark:backdrop-blur-sm dark:text-emerald-100">
          🍐 About Peear
        </div>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-green-900 dark:text-emerald-200">
          People first.<br className="hidden sm:block" /> Potential over prestige.
        </h1>

        <p className="mt-4 text-lg md:text-xl italic text-green-800 dark:text-emerald-200/90">
          We put people back at the center of work and growth.
        </p>
      </section>

      {/* Lead quote */}
      <section className="mx-auto max-w-3xl px-6">
        <blockquote className="relative rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-green-900/10
                               dark:bg-white/[0.06] dark:ring-white/12 dark:backdrop-blur-sm
                               dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_60px_rgba(0,0,0,0.45)]">
          <span aria-hidden className="absolute -top-6 left-6 text-6xl font-black text-green-900/10 select-none dark:text-white/10">“</span>
          <p className="text-lg md:text-xl leading-relaxed italic text-green-900/90 dark:text-emerald-100">
            You wouldn’t compare apples to oranges, right? So why compare
            people as if they were the same fruit?
          </p>
        </blockquote>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-10 space-y-8">
        {/* Intro card */}
        <div className="rounded-3xl p-0 dark:p-6 bg-transparent
                        dark:bg-white/[0.05] dark:ring-1 dark:ring-white/10 dark:backdrop-blur-sm
                        dark:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          <p className="text-base md:text-lg leading-8 text-green-900/90 dark:text-emerald-100/95">
            At Peear, we believe every person is equal in value but never the
            same. The working world often defines people by titles and
            achievements. We believe you are more than a résumé. That’s why we
            put people back at the center of work and growth, connecting you for
            who you are and who you can become.
          </p>
        </div>

        {/* Section 1 */}
        <section className="rounded-3xl p-0 dark:p-6 bg-transparent
                            dark:bg-white/[0.05] dark:ring-1 dark:ring-white/10 dark:backdrop-blur-sm
                            dark:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-emerald-200">Character beats credentials</h2>
          <p className="mt-2 text-base md:text-lg leading-8 text-green-900/90 dark:text-emerald-100/95">
            Potential matters more than prestige. Whether you’re a CEO or just
            starting out, what counts at Peear is your curiosity, openness, and
            drive to grow. We dream of a world where value is measured in <em>potential</em>, not past achievements.
          </p>
        </section>

        {/* Section 2 */}
        <section className="rounded-3xl p-0 dark:p-6 bg-transparent
                            dark:bg-white/[0.05] dark:ring-1 dark:ring-white/10 dark:backdrop-blur-sm
                            dark:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-emerald-200">Social Skilling Hub</h2>
          <p className="mt-2 text-base md:text-lg leading-8 text-green-900/90 dark:text-emerald-100/95">
            Peear is a peer-to-peer mentoring community—a place where people
            connect based on character and potential, not job titles. By
            matching peers to learn from and challenge each other, we spark
            real, personal growth. It’s not about climbing a career ladder; it’s
            about branching out, discovering new perspectives, and nurturing
            authentic connections.
          </p>
        </section>

        {/* Section 3 */}
        <section className="rounded-3xl p-0 dark:p-6 bg-transparent
                            dark:bg-white/[0.05] dark:ring-1 dark:ring-white/10 dark:backdrop-blur-sm
                            dark:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-emerald-200">From fruit to forest</h2>
          <p className="mt-2 text-base md:text-lg leading-8 text-green-900/90 dark:text-emerald-100/95">
            MSc, 1,000 LinkedIn connections, Fortune 500 CEO? On Peear, we don’t
            give a fig. Potential isn’t about cherry-picking a perfect few; it’s
            about embracing the whole orchard. We nurture connections like a
            flourishing forest, where trust grows when peers are curious and
            open, vulnerability becomes the soil where confidence takes root,
            and growth spreads sideways, discovering new perspectives at every
            step.
          </p>
        </section>

        {/* Closing line */}
        <p className="mt-6 rounded-2xl bg-white p-5 text-center text-lg md:text-xl italic shadow-sm ring-1 ring-green-900/10
                      dark:bg-white/[0.06] dark:ring-white/10 dark:backdrop-blur-sm
                      dark:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          Together, we harvest a more fruitful future for all.
        </p>

        {/* CTA’s */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {/* Geel */}
          <Link
            href="/drop/select"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition
                       bg-[#F0B429] text-green-900 hover:bg-[#E3A21A] shadow-sm
                       dark:bg-yellow-300 dark:hover:bg-yellow-200 dark:text-[#0b1310]
                       dark:ring-1 dark:ring-white/15 dark:shadow-[0_0_28px_rgba(250,204,21,0.45)] hover:dark:shadow-[0_0_40px_rgba(250,204,21,0.7)]">
            Start Pear Drop
          </Link>

          {/* Subtle card button */}
          <Link
            href="/community"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition
                       bg-white text-green-900 hover:bg-green-50 shadow-sm ring-1 ring-green-900/10
                       dark:bg-white/10 dark:text-emerald-100 dark:hover:bg-white/15 dark:ring-white/10 dark:backdrop-blur-sm">
            Community Feed
          </Link>

          {/* Groen */}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition
                       bg-green-700 text-white hover:bg-green-800
                       dark:bg-emerald-400 dark:hover:bg-emerald-300 dark:text-[#07150f]
                       dark:ring-1 dark:ring-white/15 dark:shadow-[0_0_28px_rgba(16,185,129,0.45)] hover:dark:shadow-[0_0_40px_rgba(16,185,129,0.7)]">
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
