"use client";
import React from "react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#FAFBEF] text-[#1C4B2B]">
      <Header />
      <section className="max-w-md mx-auto px-5 py-4 space-y-4">
        {/* Welcome */}
        <Card>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold">Welcome Back!</h1>
            <PearIcon size={44} tone="lime" />
          </div>
          <a href="/#peardrop" className="mt-3 inline-flex btn-primary">Start a Drop</a>
        </Card>

        {/* Active peers */}
        <Card>
          <h2 className="font-semibold">Active Peers</h2>
          <div className="mt-3 flex items-center gap-3">
            {["Ana","Ben","Chloe","Diego"].map((n,i)=>(
              <div key={n} className="relative">
                <div className="h-10 w-10 rounded-full bg-[#2F7A3E] text-white grid place-items-center text-sm font-bold">
                  {n.slice(0,1)}
                </div>
                <span className="absolute -bottom-1 -right-1 inline-grid place-items-center h-4 w-4 rounded-full bg-white border border-[#C8D7C2]">
                  {i%2===0 ? <SmallFruit kind="pear"/> : <SmallFruit kind="orange"/>}
                </span>
              </div>
            ))}
            <button className="ml-auto text-sm btn-secondary">Connect</button>
          </div>
        </Card>

        {/* Community feed preview */}
        <Card>
          <h2 className="font-semibold mb-2">Community Feed</h2>
          <FeedItem name="Lina" tags={["Leadership","Balance"]}/>
          <FeedItem name="Rui"  tags={["Focus","Delivery"]}/>
        </Card>

        {/* My Activity */}
        <Card>
          <h2 className="font-semibold mb-3">My Activity</h2>
          <div className="flex items-center gap-5 text-[#2f3e34]">
            <Activity icon={<Bubble/>} count={2}/>
            <Activity icon={<PearIcon size={16}/>} count={1}/>
            <Activity icon={<OrangeIcon/>} count={3}/>
            <Activity icon={<TreeIcon/>} count={1}/>
            <Activity icon={<HeartIcon/>} count={4}/>
          </div>
        </Card>
      </section>
    </main>
  );
}

/* --- UI Bits --- */
function Header() {
  return (
    <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
      <PearIcon size={24}/>
      <div className="flex items-center gap-4 text-[#1C4B2B]">
        <BellIcon/><SearchIcon/>
      </div>
    </div>
  );
}
function Card({children}:{children:React.ReactNode}) {
  return <div className="rounded-[22px] bg-white p-5 border border-[#E5EEDC] shadow-sm">{children}</div>;
}
function FeedItem({name,tags}:{name:string;tags:string[]}) {
  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <Avatar name={name}/>
      <div className="flex-1">
        <div className="h-3 bg-[#F4F6F0] rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-[#F4F6F0] rounded w-1/2"></div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(t=> <span key={t} className="px-2 py-1 rounded-full text-xs bg-[#F4FBEF] border border-[#C8D7C2]">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
function Avatar({name}:{name:string}) {
  return <div className="h-10 w-10 rounded-full bg-[#2F7A3E] text-white grid place-items-center text-sm font-bold">{name[0]}</div>;
}
function Activity({icon,count}:{icon:React.ReactNode;count:number}) {
  return <div className="flex items-center gap-2">{icon}<span className="text-sm">{count}</span></div>;
}

/* --- Icons --- */
function PearIcon({size=20,tone="green"}:{size?:number;tone?: "green"|"lime"}) {
  const fill = tone==="lime" ? "#A3D26F" : "#2F7A3E";
  return (<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill={fill}/></svg>);
}
function OrangeIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#F59E0B"/></svg>)}
function SmallFruit({kind}:{kind:"pear"|"orange"}){return kind==="pear"? <PearIcon size={12}/> : <OrangeIcon/>}
function TreeIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2l4 6-4 6-4-6 4-6z" fill="#2F7A3E"/><rect x="11" y="14" width="2" height="6" fill="#2F7A3E"/></svg>)}
function HeartIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E11D48" d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z"/></svg>)}
function Bubble(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#2F7A3E" d="M4 5h16v10H7l-3 3V5z"/></svg>)}
function BellIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1C4B2B" d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/></svg>)}
function SearchIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#1C4B2B" strokeWidth="2" fill="none"/><path d="M20 20l-3-3" stroke="#1C4B2B" strokeWidth="2"/></svg>)}
