import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cream text-[var(--ink)] dark:bg-[#0d1c0f] dark:text-white">
      {/* Logo */}
      <img
        src="/logo-peear.png"
        alt="Peear logo"
        className="h-32 w-auto mb-6 dark:hidden"
      />
      <img
        src="/logo-peear-dark.png"
        alt="Peear logo dark"
        className="h-32 w-auto mb-6 hidden dark:block"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Peear</h1>
      <p className="mb-10 text-center text-lg">
        Grow together. Stay curious. Be fruitful. 🍐
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-72">
        <Link
          href="/drop/select"
          className="bg-[var(--pear-green)] text-white rounded-2xl py-4 font-semibold text-center hover:brightness-95 transition"
        >
          Go to Pear Drop
        </Link>

        <Link
          href="/feed"
          className="bg-[#F8DA90] text-[var(--ink)] rounded-2xl py-4 font-semibold text-center hover:brightness-95 transition"
        >
          Go to Community Feed
        </Link>

        {/* Nieuwe knop: FRUIT PICK 🍓 */}
        <Link
          href="/fruitpick"
          className="bg-[#F6C85C] text-[var(--ink)] rounded-2xl py-4 font-semibold text-center hover:brightness-95 transition"
        >
          Go to Fruit Pick 🍓
        </Link>
      </div>

      <div className="mt-12 text-center space-y-3">
        <h2 className="text-2xl font-semibold">Why join Peear?</h2>
        <p>🍐 Peer-to-Peer Growth</p>
        <p>🍊 Fresh Perspectives</p>
        <p>🍓 Fun & Fruitful Learning</p>
      </div>
    </main>
  );
}
