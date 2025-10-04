"use client";
import React from "react";

export default function FeedPage() {
  const posts = [
    { id:1, name:"Mia",  tags:["Leadership","Balance"] },
    { id:2, name:"Rui",  tags:["Focus","Delivery"] },
    { id:3, name:"Sofia",tags:["Story","Positioning"] },
  ];
  const topics = ["Growth","Creativity","Productivity"];

  return (
    <main className="min-h-screen bg-[#FAFBEF] text-[#1C4B2B]">
      <TopBar />
      <section className="max-w-md mx-auto px-5 py-4 space-y-4">
        <h1 className="text-2xl font-extrabold">Community Feed</h1>

        <div className="space-y-3">
          {posts.map(p=>(
            <Card key={p.id}>
              <div className="flex items-start gap-3">
                <Avatar name={p.name}/>
                <div className="flex-1">
                  <div className="h-3 bg-[#F4F6F0] rounded w-4/5 mb-2"></div>
                  <div className="h-3 bg-[#F4F6F0] rounded w-2/3"></div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-1 rounded-full text-xs bg-[#F4FBEF] border border-[#C8D7C2]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-[#2f3e34]">
                    <IconHeart/><IconShare/>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="font-semibold mb-3">Suggested Topics</h2>
          <div className="grid grid-cols-3 gap-3">
            {topics.map(t=>(
              <button key={t} className="rounded-2xl bg-white text-[#1C4B2B] px-4 py-3 border border-[#C8D7C2] hover:bg-[#F6FBF3]">
                {t}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <BottomNav />
    </main>
  );
}

/* --- UI bits --- */
function Card({children}:{children:React.ReactNode}) {
  return <div className="rounded-[22px] bg-white p-5 border border-[#E5EEDC] shadow-sm">{children}</div>;
}
function Avatar({name}:{name:string}) {
  return <div className="h-10 w-10 rounded-full bg-[#2F7A3E] text-white grid place-items-center text-sm font-bold">{name[0]}</div>;
}
function TopBar(){
  return (
    <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
      <button onClick={()=>history.back()} aria-label="Back" className="text-lg">←</button>
      <div className="flex items-center gap-3"><FilterIcon/></div>
    </div>
  );
}
function BottomNav(){
  const item = (label:string, href:string, icon:React.ReactNode)=>(
    <a href={href} className="flex flex-col items-center text-xs text-[#1C4B2B]">
      <div className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[#E5EEDC]">{icon}</div>
      <span className="mt-1">{label}</span>
    </a>
  );
  return (
    <nav className="sticky bottom-0 bg-[#FAFBEF]/90 backdrop-blur border-t border-[#E5EEDC]">
      <div className="max-w-md mx-auto px-6 py-3 grid grid-cols-5 gap-2">
        {item("Home","/",<HomeIcon/>)}
        {item("Search","#",<SearchIcon/>)}
        {item("Drop","/#peardrop",<PearIcon/>)}
        {item("Messages","#",<BubbleIcon/>)}
        {item("Profile","/profile",<UserIcon/>)}
      </div>
    </nav>
  );
}

/* --- Icons --- */
function PearIcon(){return(<svg width="16" height="16" viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill="#2F7A3E"/></svg>)}
function HomeIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-5V12H10v9H5a2 2 0 0 1-2-2v-9z" fill="#1C4B2B"/></svg>)}
function SearchIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#1C4B2B" strokeWidth="2" fill="none"/><path d="M20 20l-3-3" stroke="#1C4B2B" strokeWidth="2"/></svg>)}
function BubbleIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#1C4B2B" d="M4 5h16v10H7l-3 3V5z"/></svg>)}
function UserIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#1C4B2B"/><path d="M4 20a8 8 0 0116 0" fill="#1C4B2B"/></svg>)}
function FilterIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" stroke="#1C4B2B" strokeWidth="2" strokeLinecap="round"/></svg>)}
function IconHeart(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E11D48" d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z"/></svg>)}
function IconShare(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12v8h16v-8M12 4v11M8 8l4-4 4 4" stroke="#1C4B2B" strokeWidth="2" fill="none"/></svg>)}
