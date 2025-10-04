"use client";
import React from "react";

export default function ProfilePage() {
  const peers = [
    { name: "Ana", fruit: "pear" },
    { name: "Ben", fruit: "pear" },
    { name: "Chloe", fruit: "orange" },
    { name: "Diego", fruit: "pear" },
  ];

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <Header />
      <section className="max-w-md mx-auto px-5 py-4 space-y-4">

        {/* Welcome Card */}
        <Card className="bg-white/80">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold">Welcome Back!</h1>
              <p className="text-sm text-muted mt-1">
                Ready to drop a question or browse the community?
              </p>
            </div>
            <PearIcon size={56} tone="lime" />
          </div>
          <a href="/#peardrop" className="mt-4 btn btn-primary w-max">Start a Drop</a>
        </Card>

        {/* Active Peers */}
        <Card>
          <h2 className="font-semibold">Active Peers</h2>
          <div className="mt-4 flex items-center gap-4">
            {peers.map((p) => (
              <div key={p.name} className="relative">
                <Avatar name={p.name} />
                <span className="absolute -bottom-1 -right-1 inline-grid place-items-center h-5 w-5 rounded-full bg-white border border-[#C8D7C2]">
                  {p.fruit === "pear" ? <MiniPear /> : <MiniOrange />}
                </span>
              </div>
            ))}
            <a className="ml-auto btn btn-secondary text-sm" href="/feed">Connect</a>
          </div>
        </Card>

        {/* Community Feed Preview */}
        <Card>
          <h2 className="font-semibold mb-3">Community Feed</h2>
          <FeedItem name="Lina" tags={["Leadership", "Balance"]} fruit="orange" />
          <Divider />
          <FeedItem name="Rui" tags={["Focus", "Delivery"]} fruit="pear" />
          <a href="/feed" className="mt-4 inline-block text-sm underline">Open full feed →</a>
        </Card>

        {/* My Activity */}
        <Card>
          <h2 className="font-semibold mb-3">My Activity</h2>
          <div className="flex items-center gap-6 text-[color:var(--ink)]">
            <Stat icon={<BubbleIcon />} count={2} />
            <Stat icon={<PearIcon size={18} />} count={1} />
            <Stat icon={<OrangeIcon />} count={3} />
            <Stat icon={<TreeIcon />} count={1} />
            <Stat icon={<HeartIcon />} count={4} />
          </div>
        </Card>
      </section>
    </main>
  );
}

/* --- Bits --- */
function Header() {
  return (
    <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
      <PearIcon size={24} />
      <div className="flex items-center gap-4">
        <BellIcon />
        <SearchIcon />
      </div>
    </div>
  );
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}
function Divider() {
  return <div className="h-px bg-[#EEF5EA] my-3" />;
}
function Avatar({ name }: { name: string }) {
  return (
    <div className="h-12 w-12 rounded-full bg-[#F3F7EF] border border-[#D6E6CF] grid place-items-center overflow-hidden">
      <Face />
    </div>
  );
}
function FeedItem({ name, tags, fruit }: { name: string; tags: string[]; fruit: "pear" | "orange" }) {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 rounded-full bg-[#F3F7EF] border border-[#D6E6CF] grid place-items-center">
        <Face small />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <div className="h-3 bg-[#F4F6F0] rounded w-4/5 mt-1"></div>
        <div className="h-3 bg-[#F4F6F0] rounded w-3/5 mt-2"></div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>
      <div className="pt-1">{fruit === "pear" ? <MiniPear /> : <MiniOrange />}</div>
    </div>
  );
}
function Stat({ icon, count }: { icon: React.ReactNode; count: number }) {
  return <div className="flex items-center gap-2">{icon}<span>{count}</span></div>;
}

/* --- Icons (simple SVGs) --- */
function Face({ small = false }: { small?: boolean }) {
  const s = small ? 18 : 24;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FFDFAE" />
      <circle cx="9" cy="10" r="1.2" fill="#1C4B2B" />
      <circle cx="15" cy="10" r="1.2" fill="#1C4B2B" />
      <path d="M8 15c1.5 1 3.5 1 5 0" stroke="#1C4B2B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="7" y="6" width="10" height="5" rx="2.5" fill="#2F7A3E" opacity=".2"/>
    </svg>
  );
}
function PearIcon({ size = 20, tone = "green" }: { size?: number; tone?: "green" | "lime" }) {
  const fill = tone === "lime" ? "#A3D26F" : "#2F7A3E";
  return (<svg width={size} height={size} viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill={fill}/></svg>);
}
function MiniPear(){return <PearIcon size={12}/>;}
function OrangeIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#F59E0B"/></svg>)}
function MiniOrange(){return(<svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#F59E0B"/></svg>)}
function TreeIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2l4 6-4 6-4-6 4-6z" fill="#2F7A3E"/><rect x="11" y="14" width="2" height="6" fill="#2F7A3E"/></svg>)}
function HeartIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E11D48" d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z"/></svg>)}
function BubbleIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#2F7A3E" d="M4 6h16v10H8l-4 4V6z"/></svg>)}
function BellIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1C4B2B" d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/></svg>)}
function SearchIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#1C4B2B" strokeWidth="2" fill="none"/><path d="M20 20l-3-3" stroke="#1C4B2B" strokeWidth="2"/></svg>)}

