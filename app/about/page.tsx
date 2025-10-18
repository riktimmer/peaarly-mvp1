// app/about/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Peear",
  description: "Learn more about the Peear project.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF2] text-center p-6 text-green-900">
      <h1 className="text-4xl font-bold mb-4">About Peear</h1>
      <p className="max-w-md mb-8">
        Peear is a space for curious people who want to grow together, share insights, 
        and exchange knowledge. Our goal is to make learning more social and rewarding.
      </p>

      <Link
        href="/"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-2xl transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
