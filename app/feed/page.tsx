"use client";
import React from "react";
import { Card, Badge, AvatarFace, PearIcon, OrangeIcon, StrawberryIcon, HeartIcon, ShareIcon } from "../components/ui";

export default function FeedPage() {
  const posts = [
    { id:1, name:"Mia",   seed: 1, fruit:"pear",   tags:["Leadership","Balance"] },
    { id:2, name:"Rui",   seed: 2, fruit:"orange", tags:["Focus","Delivery"] },
    { id:3, name:"Sofia", seed: 0, fruit:"straw",  tags:["Story","Positioning"] },
  ] as const;

  const topics = [
    { label: "Growth", icon: "🌱" },
    { label: "Creativity", icon: "🍓" },
    { label: "Productivity", icon: "⚡" },
  ];

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-4">
        <header className="flex items-center justify-between py-3">
          <button onClick={()=>history.back()} aria-label="Back" className="text-lg">←</button>
          <h1 className="text-2xl font-extrabold">Community Feed</h1>
          <span>⚙️</span>
        </header>

        <div className="space-y-4">
          {posts.map(p => (
            <Card key={p.id}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-white border border-[#D6E6CF] grid place-items-center overflow-hidden">
                  <AvatarFace size={28} seed={p.seed}/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <div className="h-3 bg-[#F4F6F0] rounded w-4/5 my-2 shimmer"></div>
                  <div className="mt-2 flex flex-wrap gap-2">{p.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
                  <div className="mt-3 flex items-center gap-4 text-[color:var(--ink)]">
                    <HeartIcon/><ShareIcon/>
                  </div>
                </div>
                {p.fruit === "pear" ? <PearIcon size={18}/> : p.fruit === "orange" ? <OrangeIcon size={18}/> : <StrawberryIcon size={18}/>}
              </div>
            </Card>
          ))}

          <Card>
            <h2 className="font-semibold mb-3">Suggested Topics</h2>
            <div className="grid grid-cols-3 gap-3">
              {topics.map(t => (
                <button key={t.label} className="btn btn-secondary hover:shadow-sm active:press">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-lg">{t.icon}</div>
                    <span className="text-xs">{t.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

