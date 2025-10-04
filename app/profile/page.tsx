"use client";
import React from "react";
import { Card, Badge, AvatarFace, PearIcon, OrangeIcon } from "../components/ui";

export default function ProfilePage() {
  const peers = [
    { name: "Ana", seed: 0, fruit: "pear" },
    { name: "Ben", seed: 1, fruit: "pear" },
    { name: "Chloe", seed: 2, fruit: "orange" },
    { name: "Diego", seed: 3, fruit: "pear" },
  ] as const;

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <header className="max-w-md mx-auto px-5 py-5 flex items-center justify-between">
        <PearIcon size={28} />
        <div className="flex gap-4">
          <span title="Notifications">🔔</span>
          <span title="Search">🔎</span>
        </div>
      </header>

      <section className="max-w-md mx-auto px-5 py-4 space-y-4">
        {/* Welcome */}
        <Card className="bg-white/85">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold">Welcome Back!</h1>
              <p className="text-muted text-sm mt-1">Ready to drop a question?</p>
            </div>
            <PearIcon size={56} tone="lime" />
          </div>
          <a href="/drop/select" className="btn btn-primary w-max mt-3">Start a Drop</a>
        </Card>

        {/* Active Peers */}
        <Card>
          <h2 className="font-semibold">Active Peers</h2>
          <div className="mt-4 flex items-center gap-5">
            {peers.map(p => (
              <div key={p.name} className="relative">
                <div className="h-12 w-12 rounded-full bg-white border border-[#D6E6CF] grid place-items-center overflow-hidden">
                  <AvatarFace size={36} seed={p.seed} />
                </div>
                <span className="absolute -bottom-1 -right-1 inline-grid place-items-center h-5 w-5 rounded-full bg-white border border-[#C8D7C2]">
                  {p.fruit === "pear" ? <PearIcon size={12}/> : <OrangeIcon size={12}/>}
                </span>
              </div>
            ))}
            <a className="ml-auto btn btn-secondary text-sm" href="/feed">Connect</a>
          </div>
        </Card>

        {/* Feed preview */}
        <Card>
          <h2 className="font-semibold mb-3">Community Feed</h2>
          <PreviewItem name="Lina" seed={4} tags={["Leadership","Balance"]} />
          <div className="h-px bg-[#EEF5EA] my-3" />
          <PreviewItem name="Rui" seed={5} tags={["Focus","Delivery"]} />
          <a href="/feed" className="underline text-sm mt-3 inline-block">Open full feed →</a>
        </Card>

        {/* My Activity */}
        <Card>
          <h2 className="font-semibold mb-2">My Activity</h2>
          <div className="flex gap-6 text-[color:var(--ink)]">
            <Stat icon="💬" count={2}/>
            <Stat icon="🍐" count={1}/>
            <Stat icon="🍊" count={3}/>
            <Stat icon="🌳" count={1}/>
            <Stat icon="❤️" count={4}/>
          </div>
        </Card>
      </section>
    </main>
  );
}

function PreviewItem({name, seed, tags}:{name:string; seed:number; tags:string[]}) {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 rounded-full bg-white border border-[#D6E6CF] grid place-items-center overflow-hidden">
        <AvatarFace size={28} seed={seed}/>
      </div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <div className="h-3 bg-[#F4F6F0] rounded w-4/5 my-2 shimmer"></div>
        <div className="mt-1 flex flex-wrap gap-2">{tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
      </div>
    </div>
  );
}
function Stat({icon, count}:{icon:string;count:number}) {
  return <div className="flex items-center gap-2"><span>{icon}</span><span>{count}</span></div>;
}

