"use client";

import React from "react";

/* ---------- Generic UI ---------- */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function AvatarFace({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FFDFAE" />
      <circle cx="9" cy="10" r="1.2" fill="#1C4B2B" />
      <circle cx="15" cy="10" r="1.2" fill="#1C4B2B" />
      <path d="M8 15c1.5 1 3.5 1 5 0" stroke="#1C4B2B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="7" y="6" width="10" height="5" rx="2.5" fill="#2F7A3E" opacity=".2"/>
    </svg>
  );
}

/* ---------- Fruit Icons ---------- */
export function PearIcon({ size = 54, tone = "green" as "green" | "lime" }: { size?: number; tone?: "green" | "lime" }) {
  const fill = tone === "lime" ? "#A3D26F" : "#2F7A3E";
  return (<svg width={size} height={size} viewBox="0 0 64 64"><path d="M32 20c2-5 6.5-7 9.7-7-1 3.5-1 6 .5 8.3 1.8 2.8 2.7 5.1 2.7 8.3 0 7.2-5.7 12.9-12.9 12.9S19 37 19 29.6c0-3.2.9-5.5 2.7-8.3 1.5-2.3 1.5-4.8.5-8.3 3.2 0 7.7 2 9.8 7z" fill={fill}/></svg>);
}
export function OrangeIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64"><circle cx="32" cy="32" r="18" fill="#F59E0B"/><path d="M42 22c-3 1-6 1-8-2 3-1 6-1 8 2z" fill="#2F7A3E"/></svg>);
}
export function StrawberryIcon({ size = 54 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 20c6 0 10-6 10-6s2 6 8 6c-2 6-9 10-18 10S16 26 14 20c6 0 8-6 8-6s4 6 10 6z" fill="#EF4444"/>
    <path d="M16 30c0 10 7 18 16 18s16-8 16-18S16 26 16 30z" fill="#DC2626"/>
  </svg>);
}
