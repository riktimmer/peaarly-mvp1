// app/about/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Peear",
  description:
    "Learn more about Peear: a peer-to-peer mentoring community where character and potential drive growth.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF2] text-green-900">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-900/10 bg-white/70 px-4 py-1 text-sm font-medium">
          🍐 About Peear
        </div>
        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight">
          People first. Potential over prestige.
        </h1>
        <p className="mt-4 text-lg md:text-xl italic text-green-800">
          We put people back at the center of work and growth.
        </p>
      </section>

      {/* Lead quote */}
      <section className="mx-auto max-w-3xl px-6">
        <blockquote className="relative rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-green-900/10">
          <span
            aria-hidden
            className="absolute -top-6 left-6 text-6xl font-black text-green-900/10 select-none"
          >
            “
          </span>
          <p className="text-lg md:text-xl leading-relaxed italic">
            You wouldn’t compare apples to oranges, right? So why compare
            people as if they were the same fruit?
          </p>
        </blockquote>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-10">
        <p className="text-base md:text-lg leading-8 text-green-900/90">
          At Peear, we believe every person is equal in value but never the
          same. The working world often defines people by titles and
          achievements. We believe you are more than a résumé. That’s why we
          put people back at the center of work and growth, connecting you for
          who you are and who you can become.
        </p>

        {/* Divider */}
        <hr className="my-10 border-green-900/10" />

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Character beats credentials
          </h2>
          <p className="text-base md:text-lg leading-8 text-green-900/90">
            Potential matters more than prestige. Whether you’re a CEO or just
            starting out, what counts at Peear is your curiosity, openness, and
            drive to grow. We dream of a world where value is measured in{" "}
            <em>potential</em>, not past achievements.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-10 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">Social Skilling Hub</h2>
          <p className="text-base md:text-lg leading-8 text-green-900/90">
            Peear is a peer-to-peer mentoring community—a place where people
            connect based on character and potential, not job titles. By
            matching peers to learn from and challenge each other, we spark
            real, personal growth. It’s not about climbing a career ladder; it’s
            about branching out, discovering new perspectives, and nurturing
            authentic connections.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mt-10 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">From fruit to forest</h2>
          <p className="text-base md:text-lg leading-8 text-green-900/90">
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
        <p className="mt-10 rounded-2xl bg-white p-5 text-center text-lg md:text-xl italic shadow-sm ring-1 ring-green-900/10">
          Together, we harvest a more fruitful future for all.
        </p>

        {/* CTA row */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/drop"
            className="inline-flex items-center justify-center rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-green-900 hover:bg-yellow-600 transition shadow-sm"
          >
            Start Pear Drop
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-green-900 hover:bg-green-50 transition shadow-sm ring-1 ring-green-900/10"
          >
            Community Feed
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 transition shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
