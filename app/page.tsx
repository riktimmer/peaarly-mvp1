"use client";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen pulp">
      <TopNav />

      {/* HERO */}
      <section className="max-w-md mx-auto px-5 pt-6">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="h-hero">Peaarly</h1>
              <p className="mt-2 text-muted">
                A no-nonsense peer mentoring community. Character beats credentials.
              </p>
            </div>
            <BrandPear size={64} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a href="#peardrop" className="btn btn-primary">Go to Pear Drop</a>
            <a href="#fruitpick" className="btn btn-secondary">Go to Fruit Pick</a>
          </div>
        </div>
      </section>

      {/* WHAT */}
      <section className="max-w-md mx-auto px-5">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="h-sec">What is Peaarly?</h2>
            <LeafPear />
          </div>
          <p className="mt-2 text-muted">
            A C2C network for fresh curiosity, openness, and real growth.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Curiosity","Openness","Growth"].map(t => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PEAR DROP */}
      <section id="peardrop" className="max-w-md mx-auto px-5">
        <div className="card">
          <h3 className="h-sec">Enter your interests or challenges</h3>
          <p className="mt-1 text-muted">E.g. leadership, problem solving</p>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <input
              placeholder="Type your topic…"
              className="w-full rounded-xl border border-[#C8D7C2] bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--pear-lime)]"
            />
            <a className="btn btn-primary" href="#match">Start a Drop</a>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <PearBouncy />
            <div className="text-sm text-muted">
              Avg. match time <strong>&lt; 30s</strong>
            </div>
          </div>
        </div>
      </section>

      {/* MATCH PREVIEW */}
      <section id="match" className="max-w-md mx-auto px-5">
        <div className="card">
          <div className="flex items-center gap-3">
            <Orange size={56} />
            <div>
              <p className="text-sm text-muted">You matched with</p>
              <p className="text-xl font-extrabold" style={{color:"var(--leaf)"}}>Emily</p>
              <p className="text-sm text-muted">Product Manager</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Analytical","Mentor","Focus"].map(t => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
          </div>
          <a className="mt-5 btn btn-primary inline-flex" href="#fruitpick">Start Chat</a>
        </div>
      </section>

      {/* FRUIT PICK */}
      <section id="fruitpick" className="max-w-md mx-auto px-5">
        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="h-sec">Fruit Pick</h3>
            <Grapes />
          </div>
          <p className="mt-2 text-muted">Pick the peers that fit your question.</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {["Sofia","Noah","Mia","Rui"].map(name => (
              <div key={name} className="rounded-2xl border border-[#C8D7C2] bg-white p-4">
                <Avatar name={name}/>
                <p className="mt-2 font-semibold" style={{color:"var(--leaf)"}}>{name}</p>
                <button className="mt-3 btn btn-secondary w-full">Pick</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-md mx-auto px-5 pb-14">
        <div className="card">
          <h3 className="h-sec">Join the beta</h3>
          <p className="mt-1 text-muted">Be first to drop a question and pick your peers.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const input = form.elements.namedItem("email") as HTMLInputElement;
              const email = input?.value?.trim();
              if (!email) return;
              const list = JSON.parse(localStorage.getItem("peaarly_beta") || "[]");
              list.push({ email, ts: Date.now() });
              localStorage.setItem("peaarly_beta", JSON.stringify(list));
              input.value = "";
              alert("Thanks! We’ll be in touch.");
            }}
            className="mt-4 grid grid-cols-[1fr_auto] gap-2"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-[#C8D7C2] bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--pear-lime)]"
            />
            <button className="btn btn-primary">Notify me</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ===== UI bits & fruit ===== */
function TopNav(){
  return (
    <div className="max-w-md mx-auto px-5 pt-5 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BrandPear size={28}/>
        <span className="font-semibold" style={{color:"var(--leaf)"}}>Peaarly</span>
      </div>
      <div className="text-sm flex items-center gap-3">
        <a href="/feed" className="hover:underline" style={{color:"var(--leaf)"}}>Feed</a>
        <a href="/profile" className="hover:underline" style={{color:"var(--leaf)"}}>Profile</a>
      </div>
    </div>
  );
}
function Footer(){
  return (
    <footer className="py-8 text-center text-sm" style={{color:"var(--ink)"}}>
      © {new Date().getFullYear()} Peaarly — Equal in value. Never the same.
    </footer>
  );
}

function Card({children}:{children:React.ReactNode}){ return <div className="card">{children}</div>; }
function Avatar({name}:{name:string}){
  return <div className="h-10 w-10 rounded-full bg-[color:var(--pear-green)] text-white grid place-items-center text-sm font-bold">{name[0]}</div>;
}

/* Fruit SVGs */
function BrandPear({size=48}:{size?:number}){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#E7F3E1" stroke="#9FCC8E" />
      <path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/>
      <circle cx="43.5" cy="12.8" r="2.4" fill="#2F7A3E"/>
    </svg>
  );
}
function LeafPear(){
  return (<svg width="44" height="44" viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/></svg>);
}
function PearBouncy(){
  return (<svg width="64" height="64" viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#F3C23C"/></svg>);
}
function Orange({size=54}:{size?:number}){
  return (<svg width={size} height={size} viewBox="0 0 64 64"><circle cx="32" cy="32" r="18" fill="#F59E0B"/><path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E"/></svg>);
}
function Grapes(){
  return (<svg width="40" height="40" viewBox="0 0 64 64">
    {Array.from({length:7}).map((_,i)=>(
      <circle key={i} cx={20+ (i%3)*12} cy={20+ Math.floor(i/3)*12} r="6" fill="#7C3AED" opacity="0.9"/>
    ))}
    <rect x="30" y="6" width="4" height="10" rx="2" fill="#265C31"/>
  </svg>);
}

