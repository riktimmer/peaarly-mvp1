"use client";
import Link from "next/link";
import { PearIcon, OrangeIcon, StrawberryIcon } from "./components/ui";

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
            <Link href="/drop/select" className="btn btn-primary w-full">
              Go to Pear Drop
            </Link>
            <Link href="/feed" className="btn w-full">
              Go to Community Feed
            </Link>
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
          <Link href="/drop/select" className="btn btn-primary mt-5 px-8">
            Start a Drop
          </Link>
        </section>
      </div>
    </main>
  );
}

