"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-6 py-10 space-y-12">

        {/* Hero sectie */}
        <section className="text-center">
          <div className="flex justify-center mb-4">
            <PearIcon size={80} />
          </div>
          <h1 className="h-hero">Peaarly</h1>
          <p className="mt-3 text-muted">
            A no-nonsense peer mentoring community.  
            Connect with others, grow together, and make learning fruity 🍐
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/drop" className="btn btn-primary w-full">Go to Pear Drop</Link>
            <Link href="/feed" className="btn w-full">Go to Community Feed</Link>
          </div>
        </section>

        {/* Features sectie */}
        <section>
          <h2 className="h-sec mb-4">Why join Peaarly?</h2>
          <ul className="space-y-4">
            <li className="card flex items-center gap-4">
              <PearIcon size={48} />
              <div>
                <p className="font-semibold">Peer-to-Peer Growth</p>
                <p className="text-muted text-sm">Real connections, real learning.</p>
              </div>
            </li>
            <li className="card flex items-center gap-4">
              <OrangeIcon size={48} />
              <div>
                <p className="font-semibold">Fresh Perspectives</p>
                <p className="text-muted text-sm">Bring your ideas, pick new ones.</p>
              </div>
            </li>
            <li className="card flex items-center gap-4">
              <StrawberryIcon size={48} />
              <div>
                <p className="font-semibold">Fun & Fruitful</p>
                <p className="text-muted text-sm">Serious growth with a playful twist.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Call to action */}
        <section className="text-center">
          <h2 className="h-sec">Ready to start?</h2>
          <p className="text-muted">Pick your interests and find your match.</p>
          <Link href="/drop" className="btn btn-primary mt-5 px-8">
            Start a Drop
          </Link>
        </section>
      </div>
    </main>
  );
}

/* ---------- Icons ---------- */
function PearIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <path
        d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z"
        fill="#A3D26F"
      />
    </svg>
  );
}
function OrangeIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="18" fill="#F59E0B" />
      <path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E" />
    </svg>
  );
}
function StrawberryIcon({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <path
        d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z"
        fill="#EF4444"
      />
      <path
        d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z"
        fill="#DC2626"
      />
    </svg>
  );
}
