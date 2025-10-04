"use client";
import React from "react";

export default function FeedPage() {
  const posts = [
    { id: 1, name: "Mia",  fruit: "pear",    tags: ["Leadership", "Balance"] },
    { id: 2, name: "Rui",  fruit: "orange",  tags: ["Focus", "Delivery"] },
    { id: 3, name: "Sofia",fruit: "pear",    tags: ["Story", "Positioning"] },
  ];
  const topics = [
    { label: "Growth", icon: <SproutIcon/> },
    { label: "Creativity", icon: <StrawberryIcon/> },
    { label: "Productivity", icon: <BoltIcon/> },
  ];

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <TopBar />
      <section className="max-w-md mx-auto px-5 py-4 space-y-4">
        <h1 className="text-2xl font-extrabold">Community Feed</h1>

        {posts.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start gap-3">
              <Avatar name={p.name} />
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <div className="h-3 bg-[#F4F6F0] rounded w-4/5 my-2"></div>
                <div className="h-3 bg-[#F4F6F0] rounded w-2/3"></div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3 text-[color:var(--ink)]">
                  <IconHeart /><IconShare />
                </div>
              </div>
              {p.fruit === "pear" ? <MiniPear/> : <MiniOrange/>}
            </div>
          </Card>
        ))}

        <Card>
          <h2 className="font-semibold mb-3">Suggested Topics</h2>
          <div className="grid grid-cols-3 gap-3">
            {topics.map((t) => (
              <button key={t.label} className="btn btn-secondary">
                <div className="flex flex-col items-center gap-1">
                  <div>{t.icon}</div>
                  <span className="text-xs">{t.label}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <BottomNav />
    </main>
  );
}

/* --- Bits --- */
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
function Avatar({ name }: { name: string }) {
  return (
    <div className="h-10 w-10 rounded-full bg-[#F3F7EF] border border-[#D6E6CF] grid place-items-center overflow-hidden">
      <Face small />
    </div>
  );
}
function TopBar() {
  return (
    <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
      <button onClick={() => history.back()} aria-label="Back" className="text-lg">←</button>
      <div className="flex items-center gap-3"><FilterIcon /></div>
    </div>
  );
}
function BottomNav() {
  const Item = (label: string, href: string, icon: React.ReactNode) => (
    <a href={href} className="flex flex-col items-center text-xs">
      <div className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[#E5EEDC]">{icon}</div>
      <span className="mt-1">{label}</span>
    </a>
  );
  return (
    <nav className="sticky bottom-0 bg-[color:var(--cream)]/90 backdrop-blur border-t border-[#E5EEDC]">
      <div className="max-w-md mx-auto px-6 py-3 grid grid-cols-5 gap-2">
        {Item("Home", "/", <HomeIcon />)}
        {Item("Search", "#", <SearchIcon />)}
        {Item("Drop", "/#peardrop", <PearIcon />)}
        {Item("Messages", "#", <BubbleIcon />)}
        {Item("Profile", "/profile", <UserIcon />)}
      </div>
    </nav>
  );
}

/* --- Icons --- */
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
function PearIcon(){return(<svg width="16" height="16" viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/></svg>)}
function MiniPear(){return(<svg width="12" height="12" viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/></svg>)}
function MiniOrange(){return(<svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#F59E0B"/></svg>)}
function HomeIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-5V12H10v9H5a2 2 0 0 1-2-2v-9z" fill="#1C4B2B"/></svg>)}
function SearchIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#1C4B2B" strokeWidth="2" fill="none"/><path d="M20 20l-3-3" stroke="#1C4B2B" strokeWidth="2"/></svg>)}
function BubbleIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#1C4B2B" d="M4 6h16v10H8l-4 4V6z"/></svg>)}
function UserIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#1C4B2B"/><path d="M4 20a8 8 0 0116 0" fill="#1C4B2B"/></svg>)}
function FilterIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" stroke="#1C4B2B" strokeWidth="2" strokeLinecap="round"/></svg>)}
function IconHeart(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E11D48" d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z"/></svg>)}
function IconShare(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12v8h16v-8M12 4v11M8 8l4-4 4 4" stroke="#1C4B2B" strokeWidth="2" fill="none"/></svg>)}
function StrawberryIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 4c2 0 3-2 3-2s1 2 3 2-2 4-6 4-8-4-6-4 3-2 3-2 1 2 3 2z" fill="#EF4444"/><path d="M6 10c0 4 3 8 6 8s6-4 6-8-12-4-12 0z" fill="#DC2626"/></svg>)}
function SproutIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 20V8M12 8c0-4 5-6 8-4-1 4-5 6-8 4zM12 8C12 4 7 2 4 4c1 4 5 6 8 4z" stroke="#2F7A3E" strokeWidth="2" fill="none"/></svg>)}
function BoltIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" fill="#F59E0B"/></svg>)}
