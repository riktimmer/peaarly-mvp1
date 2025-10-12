"use client";

import * as React from "react";

/* ────────────────────────────────────────────────────────────
   Types
────────────────────────────────────────────────────────────── */
type Message = { id: string; author: "me" | "them"; text: string; time?: string };
type AvatarKey =
  | "male"
  | "maleCurly"
  | "maleBaldBeard"
  | "female"
  | "femaleBob"
  | "femaleCurly"
  | "femaleHijab";

type Person = {
  name: string;
  interests: string[];
  blurb: string;
  avatar: AvatarKey;
  messages: Message[];
};

/* ────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────── */
const shuffle = <T,>(arr: T[]) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ────────────────────────────────────────────────────────────
   SVG Avatar-basis
   - Alle avatars delen dezelfde compositie (achtergrond/nek),
     maar hebben andere haar/baard/kleuren/hoofddoek etc.
   - Formaat: 160x160, zachte kleuren passend bij je UI.
────────────────────────────────────────────────────────────── */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-[#F7F0DD] text-[var(--ink)] text-sm font-semibold">
    {children}
  </span>
);

/* 1) Man – bruin haar + baard (bestond al, iets opgepoetst) */
function MaleAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#F4CDA5" />
      <path d="M48 74c0-24 16-40 32-40s32 12 32 34c-3-2-6-3-9-3s-7 2-9 4c-2-2-5-3-8-3-7 0-13 5-15 11-2-2-6-3-9-3-5 0-9 3-14 7z" fill="#603F26"/>
      <path d="M54 90c3 12 11 22 26 22s23-10 26-22c-2 3-5 6-9 6-4 0-7-2-9-5-2 3-5 5-8 5-4 0-7-2-10-6-3 3-5 5-8 5-3 0-6-2-8-5z" fill="#603F26"/>
      <circle cx="68" cy="82" r="4" fill="#1E1E1E" />
      <circle cx="92" cy="82" r="4" fill="#1E1E1E" />
      <rect x="61" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18" />
      <rect x="85" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18" />
      <path d="M78 82c1 2 2 4 2 7s-1 4-2 4" stroke="#C68642" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 97c3 3 8 3 12 0" stroke="#A45B27" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 2) Vrouw – donkere huidskleur, bun (bestond, gepolijst) */
function FemaleAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="86" r="31" fill="#C89058" />
      <circle cx="100" cy="56" r="10" fill="#5A3A22" />
      <path d="M52 82c0-22 16-36 30-36s28 9 30 28c-3-2-6-3-9-3-5 0-9 2-12 5-2-2-5-3-9-3-8 0-13 6-15 12-3-3-6-4-9-4-3 0-5 1-7 1z" fill="#5A3A22"/>
      <circle cx="68" cy="88" r="3.8" fill="#1E1E1E" />
      <circle cx="92" cy="88" r="3.8" fill="#1E1E1E" />
      <rect x="60.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      <rect x="84.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      <path d="M79 88c1.1 2 1.8 4.2 1.8 6.6s-.8 3.6-1.8 3.6" stroke="#8C5B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M69 102c4 3.2 9 3.2 13 0" stroke="#7C4A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="56" cy="96" r="2.6" fill="#E8D4A8" />
      <circle cx="104" cy="96" r="2.6" fill="#E8D4A8" />
    </svg>
  );
}

/* 3) Man – krullen, tan */
function MaleCurlyAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#EBC69B" />
      {/* krullen */}
      <path d="M46 75c0-18 16-32 34-32 15 0 24 6 30 17-3-1-5-2-8-2-6 0-10 3-12 6-3-3-6-5-10-5-7 0-13 4-16 10-3-1-6-1-9 0s-6 3-9 6z" fill="#3D2B1F"/>
      {/* snor/baardje licht */}
      <path d="M60 92c3 8 9 14 20 14s16-6 19-14c-3 2-5 3-8 3-3 0-6-2-8-4-2 2-5 4-8 4-3 0-5-1-7-3-3 2-5 3-8 0z" fill="#3D2B1F"/>
      <circle cx="68" cy="82" r="4" fill="#1E1E1E"/>
      <circle cx="92" cy="82" r="4" fill="#1E1E1E"/>
      <rect x="61" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18"/>
      <rect x="85" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18"/>
      <path d="M78 82c1 2 2 4 2 7s-1 4-2 4" stroke="#C68642" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 97c3 3 8 3 12 0" stroke="#A45B27" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 4) Man – kaal + volle baard (donkere huid) */
function MaleBaldBeardAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#B57949" />
      {/* kaal hoofd */}
      <path d="M48 76c0-20 14-30 32-30s32 10 32 30" fill="#B57949"/>
      {/* volle baard */}
      <path d="M50 92c4 14 15 24 30 24s26-10 30-24c-4 4-8 6-12 6-5 0-9-2-12-6-3 4-7 6-11 6-5 0-9-2-13-6-3 4-7 6-12 6-4 0-7-2-10-6z" fill="#2B1D13"/>
      <circle cx="68" cy="83" r="4" fill="#1E1E1E"/>
      <circle cx="92" cy="83" r="4" fill="#1E1E1E"/>
      <rect x="60.5" y="75" width="14" height="2.5" rx="1.25" fill="#2B1D13"/>
      <rect x="85.5" y="75" width="14" height="2.5" rx="1.25" fill="#2B1D13"/>
      <path d="M70 98c4 3 8 3 12 0" stroke="#2B1D13" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 5) Vrouw – bob kapsel, lichte huid */
function FemaleBobAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="86" r="31" fill="#F2CFB4" />
      {/* bob kapsel */}
      <path d="M50 86c0-18 12-30 30-30s30 10 30 28c-5-3-9-5-14-5-6 0-10 2-14 6-4-4-8-6-14-6-5 0-9 2-18 7z" fill="#493326"/>
      <circle cx="68" cy="88" r="3.8" fill="#1E1E1E" />
      <circle cx="92" cy="88" r="3.8" fill="#1E1E1E" />
      <rect x="61" y="80" width="14" height="2.5" rx="1.25" fill="#3B2A18"/>
      <rect x="85" y="80" width="14" height="2.5" rx="1.25" fill="#3B2A18"/>
      <path d="M79 88c1 2 1.8 4 1.8 6.4s-.6 3.6-1.6 3.6" stroke="#BE8B62" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M69 102c4 3 9 3 13 0" stroke="#A56C44" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 6) Vrouw – krullend haar, donkere huid */
function FemaleCurlyAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="86" r="31" fill="#AE7649" />
      {/* krullen */}
      <path d="M48 82c0-18 14-30 32-30s28 8 32 23c-3-2-6-3-10-3-6 0-11 3-14 7-3-3-7-5-12-5-7 0-12 4-15 9-3-2-6-2-13-1z" fill="#3A281D"/>
      <circle cx="68" cy="88" r="3.8" fill="#1E1E1E" />
      <circle cx="92" cy="88" r="3.8" fill="#1E1E1E" />
      <rect x="60.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      <rect x="84.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      <path d="M79 88c1.1 2 1.8 4.2 1.8 6.6s-.8 3.6-1.8 3.6" stroke="#8C5B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M69 102c4 3.2 9 3.2 13 0" stroke="#7C4A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 7) Vrouw – hijab */
function FemaleHijabAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 drop-shadow-sm" aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      {/* hijab */}
      <path d="M38 108c4-28 20-50 42-50s38 22 42 50c-12 8-27 13-42 13s-30-5-42-13z" fill="#2E6D64"/>
      <rect x="55" y="102" width="50" height="18" rx="9" fill="#2F7C57" />
      <circle cx="80" cy="86" r="26" fill="#D9AE82"/>
      {/* rand hijab */}
      <path d="M52 92c8-10 18-16 28-16s20 6 28 16" stroke="#234F4A" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* ogen/neus/mond */}
      <circle cx="69" cy="92" r="3.5" fill="#1E1E1E"/>
      <circle cx="91" cy="92" r="3.5" fill="#1E1E1E"/>
      <path d="M80 94c1 2 1.6 4 1.6 6.2S81 103 80 103" stroke="#8C5B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 107c4 2.6 9 2.6 13 0" stroke="#7C4A2A" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* Mapje voor makkelijk renderen op basis van key */
const AVATARS: Record<AvatarKey, React.FC> = {
  male: MaleAvatar,
  maleCurly: MaleCurlyAvatar,
  maleBaldBeard: MaleBaldBeardAvatar,
  female: FemaleAvatar,
  femaleBob: FemaleBobAvatar,
  femaleCurly: FemaleCurlyAvatar,
  femaleHijab: FemaleHijabAvatar,
};

/* ────────────────────────────────────────────────────────────
   Kandidaten-POOL  (wordt geshuffled bij laden)
────────────────────────────────────────────────────────────── */
const POOL: Person[] = [
  {
    name: "David",
    interests: ["Marketing", "Problem-solving"],
    blurb: "Interested in exploring best practices for customer retention.",
    avatar: "male",
    messages: [
      { id: "d1", author: "them", text: "Hey 👋 Leuk je te matchen!" },
      { id: "d2", author: "them", text: "Zin om over klantretentie te sparren?" },
      { id: "d3", author: "me", text: "Altijd! Ik heb net een leuke case." },
    ],
  },
  {
    name: "Amina",
    interests: ["Leadership", "Creativity"],
    blurb: "Exploring playful ways to grow teams and spark new ideas.",
    avatar: "female",
    messages: [
      { id: "a1", author: "them", text: "Hoi! 😊 Peer-to-peer fan hier." },
      { id: "a2", author: "me", text: "Same! Welke onderwerpen vind jij leuk?" },
    ],
  },
  {
    name: "Lucas",
    interests: ["Product", "Data"],
    blurb: "Loves A/B tests and pragmatic product thinking.",
    avatar: "maleCurly",
    messages: [
      { id: "l1", author: "them", text: "Hi! Testen + meten = ❤️" },
      { id: "l2", author: "me", text: "Helemaal mee eens!" },
    ],
  },
  {
    name: "Noah",
    interests: ["Engineering", "Mentoring"],
    blurb: "Enjoys pair programming and clean design.",
    avatar: "maleBaldBeard",
    messages: [
      { id: "n1", author: "them", text: "Hoi! Zin in een korte tech jam?" },
    ],
  },
  {
    name: "Sofia",
    interests: ["UX", "Growth"],
    blurb: "Mixes research with playful experiments.",
    avatar: "femaleBob",
    messages: [
      { id: "s1", author: "them", text: "Hoi! Ik ben benieuwd naar jouw UX-cases." },
    ],
  },
  {
    name: "Maya",
    interests: ["Community", "Storytelling"],
    blurb: "Building spaces where ideas can grow.",
    avatar: "femaleCurly",
    messages: [
      { id: "m1", author: "them", text: "Hee! Werk je veel met communities?" },
    ],
  },
  {
    name: "Samira",
    interests: ["Leadership", "Ops"],
    blurb: "Calm ops, clear teams, kind leadership.",
    avatar: "femaleHijab",
    messages: [
      { id: "sm1", author: "them", text: "Hi! Ik ben fan van rustige processen." },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Page component
   - Randomize pool bij mount
   - Swipe: links = skip, rechts = chat
   - Chat inline met dummy data
────────────────────────────────────────────────────────────── */
export default function FruitPickMatchPage() {
  // random lijst
  const [list] = React.useState<Person[]>(() => shuffle(POOL));
  const [idx, setIdx] = React.useState(0);
  const person = list[idx];

  // swipe+anim
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);
  const start
