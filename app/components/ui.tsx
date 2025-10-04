"use client";
import React from "react";

/* ---------- Generic UI ---------- */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}
export function Badge({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

/* ---------- Better Avatars (clean SVG, 3 varianten) ---------- */
type Variant = 0 | 1 | 2;
const skin = ["#FFDFAE", "#F8CFA2", "#F3B98C"] as const;
const hair = ["#1C4B2B", "#5C3B2E", "#2F7A3E"] as const;

export function AvatarFace({ size = 40, seed = 0 }: { size?: number; seed?: number }) {
  const v: Variant = (seed % 3) as Variant;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden>
      <defs>
        <clipPath id="round">
          <circle cx="40" cy="40" r="38" />
        </clipPath>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#F3F7EF" stroke="#D6E6CF" />
      <g clipPath="url(#round)">
        {/* shoulders */}
        <path d="M-5 80h90V55C69 48 54 45 40 45S11 48-5 55v25z" fill="#E7F3E1" />
        {/* hair/back */}
        <path d="M13 42c1-16 9-28 27-28s26 12 27 28c-6-5-13-7-27-7s-21 2-27 7z" fill={hair[v]} />
        {/* head */}
        <circle cx="40" cy="40" r="16" fill={skin[v]} />
        {/* hair/front variants */}
        {v === 0 && <path d="M24 38c2-10 9-16 16-16 8 0 14 6 16 16-5-3-11-5-16-5s-11 2-16 5z" fill={hair[v]} />}
        {v === 1 && <path d="M26 34c4-8 9-11 14-11s10 3 14 11c-4-2-9-3-14-3s-10 1-14 3z" fill={hair[v]} />}
        {v === 2 && <path d="M23 37c3-9 8-13 17-13s14 4 17 13c-6-3-10-4-17-4s-11 1-17 4z" fill={hair[v]} />}
        {/* eyes + mouth */}
        <circle cx="34" cy="41" r="1.8" fill="#1C4B2B" />
        <circle cx="46" cy="41" r="1.8" fill="#1C4B2B" />
        <path d="M33 48c3 2 11 2 14 0" stroke="#1C4B2B" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* fringe tint */}
        <rect x="24" y="28" width="32" height="6" rx="3" fill="#000" opacity=".06" />
      </g>
    </svg>
  );
}

/* ---------- Fruit Icons ---------- */
export function PearIcon({ size = 54, tone = "green" as "green" | "lime" }: { size?: number; tone?: "green" | "lime" }) {
  const fill = tone === "lime" ? "#A3D26F" : "#2F7A3E";
  return (<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill={fill}/>
  </svg>);
}
export function OrangeIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <circle cx="32" cy="32" r="18" fill="#F59E0B"/><path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E"/>
  </svg>);
}
export function StrawberryIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
    <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#EF4444"/>
    <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="#DC2626"/>
  </svg>);
}

/* ---------- Animation helpers ---------- */
export function AnimatedFruit({
  kind = "pear",
  motion = "fall",
  size = 56,
  delay = 0,
  left = "50%",
}: {
  kind?: "pear" | "orange" | "straw";
  motion?: "fall" | "float" | "bounce";
  size?: number;
  delay?: number;
  left?: string;
}) {
  const Icon = kind === "pear" ? PearIcon : kind === "orange" ? OrangeIcon : StrawberryIcon;
  const cls =
    motion === "float" ? "animate-float" :
    motion === "bounce" ? "animate-bounce-soft" : "animate-fall";
  return (
    <div className={`absolute ${cls}`} style={{ animationDelay: `${delay}ms`, left }} aria-hidden>
      <Icon size={size} />
    </div>
  );
}

/* tiny icons for UI (optional) */
export function HeartIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E11D48" d="M12 21s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 12c0 4.65-7 9-7 9z"/></svg>)}
export function ShareIcon(){return(<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12v8h16v-8M12 4v11M8 8l4-4 4 4" stroke="#1C4B2B" strokeWidth="2" fill="none"/></svg>)}
