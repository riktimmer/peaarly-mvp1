"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6 text-green-900">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/peear_logo.svg"
          alt="Peear Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Titel */}
      <h1 className="text-4xl font-bold mb-4">About Peear</h1>

      {/* Introductie */}
      <p className="max-w-2xl text-lg mb-6">
        Peear is a growing community built around curiosity, collaboration and shared growth.
        We believe that learning becomes more meaningful when people help each other reach new insights and skills.
      </p>

      {/* Beschrijving */}
      <section className="max-w-2xl mb-6">
        <h2 className="text-2xl font-semibold mb-3">What we do</h2>
        <p className="text-base leading-relaxed">
          Our platform connects curious minds — students, professionals and creatives —
          through peer-to-peer sessions. Members share knowledge, exchange ideas and
          build connections that go beyond traditional learning. Every interaction is a chance
          to grow, both personally and professionally.
        </p>
      </section>

      {/* Missie */}
      <section className="max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-base leading-relaxed">
          To make learning human again. Peear aims to empower people to learn by giving
          and receiving value in an open, supportive network. Together we grow — one
          meaningful exchange at a time.
        </p>
      </section>

      {/* Terugknop */}
      <Link
        href="/"
        className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-2xl transition"
      >
        ← Back to Home
      </Link>
    </main>
  );
}

