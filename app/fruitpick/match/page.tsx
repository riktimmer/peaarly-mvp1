"use client";

import * as React from "react";

/* ───────────────── Types ───────────────── */
type Message = { id: string; author: "me" | "them"; text: string; time?: string };
type AvatarKey =
  | "male" | "maleCurly" | "maleBaldBeard"
  | "female" | "femaleBob" | "femaleCurly" | "femaleHijab";

type Person = {
  name: string;
  interests: string[];
  blurb: string;
  avatar: AvatarKey;
  messages: Message[];
};

/* ─────────────── Helpers ─────────────── */
const shuffle = <T,>(arr: T[]) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-[#F7F0DD] text-[var(--ink)] text-sm font-semibold">
    {children}
  </span>
);

/* avatars accepteren nu className voor grootte */
type AvatarProps = { className?: string };

/* ─────────────── Avatars (7 varianten) ─────────────── */
function MaleAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
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
function FemaleAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
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
function MaleCurlyAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#EBC69B" />
      <path d="M46 75c0-18 16-32 34-32 15 0 24 6 30 17-3-1-5-2-8-2-6 0-10 3-12 6-3-3-6-5-10-5-7 0-13 4-16 10-3-1-6-1-9 0s-6 3-9 6z" fill="#3D2B1F"/>
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
function MaleBaldBeardAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#B57949" />
      <path d="M48 76c0-20 14-30 32-30s32 10 32 30" fill="#B57949"/>
      <path d="M50 92c4 14 15 24 30 24s26-10 30-24c-4 4-8 6-12 6-5 0-9-2-12-6-3 4-7 6-11 6-5 0-9-2-13-6-3 4-7 6-12 6-4 0-7-2-10-6z" fill="#2B1D13"/>
      <circle cx="68" cy="83" r="4" fill="#1E1E1E"/>
      <circle cx="92" cy="83" r="4" fill="#1E1E1E"/>
      <rect x="60.5" y="75" width="14" height="2.5" rx="1.25" fill="#2B1D13"/>
      <rect x="85.5" y="75" width="14" height="2.5" rx="1.25" fill="#2B1D13"/>
      <path d="M70 98c4 3 8 3 12 0" stroke="#2B1D13" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function FemaleBobAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="86" r="31" fill="#F2CFB4" />
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
function FemaleCurlyAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="86" r="31" fill="#AE7649" />
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
function FemaleHijabAvatar({ className = "w-40 h-40" }: AvatarProps) {
  return (
    <svg viewBox="0 0 160 160" className={`${className} drop-shadow-sm`} aria-hidden>
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      <path d="M38 108c4-28 20-50 42-50s38 22 42 50c-12 8-27 13-42 13s-30-5-42-13z" fill="#2E6D64"/>
      <rect x="55" y="102" width="50" height="18" rx="9" fill="#2F7C57" />
      <circle cx="80" cy="86" r="26" fill="#D9AE82"/>
      <path d="M52 92c8-10 18-16 28-16s20 6 28 16" stroke="#234F4A" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <circle cx="69" cy="92" r="3.5" fill="#1E1E1E"/>
      <circle cx="91" cy="92" r="3.5" fill="#1E1E1E"/>
      <path d="M80 94c1 2 1.6 4 1.6 6.2S81 103 80 103" stroke="#8C5B33" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 107c4 2.6 9 2.6 13 0" stroke="#7C4A2A" strokeWidth="2.3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

const AVATARS: Record<AvatarKey, React.FC<AvatarProps>> = {
  male: MaleAvatar,
  maleCurly: MaleCurlyAvatar,
  maleBaldBeard: MaleBaldBeardAvatar,
  female: FemaleAvatar,
  femaleBob: FemaleBobAvatar,
  femaleCurly: FemaleCurlyAvatar,
  femaleHijab: FemaleHijabAvatar,
};

/* ─────────────── Pool (geshuffled) ─────────────── */
const POOL: Person[] = [
  { name: "David", interests: ["Marketing", "Problem-solving"], blurb: "Interested in exploring best practices for customer retention.", avatar: "male",
    messages: [{ id: "d1", author: "them", text: "Hey 👋 Leuk je te matchen!" }, { id: "d2", author: "them", text: "Zin om over klantretentie te sparren?" }, { id: "d3", author: "me", text: "Altijd! Ik heb net een leuke case." }] },
  { name: "Amina", interests: ["Leadership", "Creativity"], blurb: "Exploring playful ways to grow teams and spark new ideas.", avatar: "female",
    messages: [{ id: "a1", author: "them", text: "Hoi! 😊 Peer-to-peer fan hier." }, { id: "a2", author: "me", text: "Same! Welke onderwerpen vind jij leuk?" }] },
  { name: "Lucas", interests: ["Product", "Data"], blurb: "Loves A/B tests and pragmatic product thinking.", avatar: "maleCurly",
    messages: [{ id: "l1", author: "them", text: "Hi! Testen + meten = ❤️" }, { id: "l2", author: "me", text: "Helemaal mee eens!" }] },
  { name: "Noah", interests: ["Engineering", "Mentoring"], blurb: "Enjoys pair programming and clean design.", avatar: "maleBaldBeard",
    messages: [{ id: "n1", author: "them", text: "Hoi! Zin in een korte tech jam?" }] },
  { name: "Sofia", interests: ["UX", "Growth"], blurb: "Mixes research with playful experiments.", avatar: "femaleBob",
    messages: [{ id: "s1", author: "them", text: "Hoi! Ik ben benieuwd naar jouw UX-cases." }] },
  { name: "Maya", interests: ["Community", "Storytelling"], blurb: "Building spaces where ideas can grow.", avatar: "femaleCurly",
    messages: [{ id: "m1", author: "them", text: "Hee! Werk je veel met communities?" }] },
  { name: "Samira", interests: ["Leadership", "Ops"], blurb: "Calm ops, clear teams, kind leadership.", avatar: "femaleHijab",
    messages: [{ id: "sm1", author: "them", text: "Hi! Ik ben fan van rustige processen." }] },
];

/* ─────────────── Page ─────────────── */
export default function FruitPickMatchPage() {
  const [list] = React.useState<Person[]>(() => shuffle(POOL));
  const [idx, setIdx] = React.useState(0);
  const person = list[idx];

  // swipe & anim
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);
  const start = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const DIST_THRESHOLD = 120;
  const VEL_THRESHOLD = 0.6;

  // chat bottom sheet
  const [showChat, setShowChat] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(person.messages);
  const [input, setInput] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // candidate change → reset
  React.useEffect(() => {
    setShowChat(false);
    setMessages(list[idx].messages);
    setInput("");
    RESET(true);
  }, [idx, list]);

  // focus & autoscroll wanneer chat opent
  React.useEffect(() => {
    if (showChat) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showChat]);

  // autoscroll bij nieuw bericht
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scheduleHere = () => setShowChat(true);                 // rechts → open sheet
  const keepSwiping = () => setIdx((i) => (i + 1) % list.length); // links → volgende

  // pointer handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (showChat) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !start.current || showChat) return;
    const ndx = e.clientX - start.current.x;
    const ndy = e.clientY - start.current.y;
    setDx(ndx);
    setDy(ndy * 0.25);
  };
  const animateOut = (dir: "left" | "right", onDone: () => void) => {
    setLeaving(dir);
    const node = cardRef.current;
    if (!node) { onDone(); return; }
    const sign = dir === "right" ? 1 : -1;
    node.style.transition = "transform 220ms ease-out, opacity 220ms ease-out";
    node.style.transform = `translate(${sign * 1000}px, ${dy}px) rotate(${sign * 22}deg)`;
    node.style.opacity = "0";
    window.setTimeout(onDone, 230);
  };
  const onPointerUp = () => {
    if (!start.current || showChat) return RESET();
    const dt = Math.max(1, performance.now() - start.current.t);
    const vx = dx / dt;
    if (dx > DIST_THRESHOLD || vx > VEL_THRESHOLD) { animateOut("right", scheduleHere); return; }
    if (dx < -DIST_THRESHOLD || vx < -VEL_THRESHOLD) { animateOut("left", keepSwiping); return; }
    RESET();
  };
  const RESET = (instant = false) => {
    setDragging(false); setLeaving(null); setDx(0); setDy(0);
    if (cardRef.current) {
      const n = cardRef.current;
      n.style.transition = instant ? "none" : "transform 180ms ease";
      n.style.transform = "translate(0px, 0px)"; n.style.opacity = "1";
      if (!instant) setTimeout(() => { if (n) n.style.transition = "none"; }, 190);
    }
  };

  // keyboard fallback (uit als chat open is)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showChat) return;
      if (e.key === "ArrowRight") animateOut("right", scheduleHere);
      if (e.key === "ArrowLeft") animateOut("left", keepSwiping);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showChat]);

  const rotate = Math.max(-18, Math.min(18, dx * 0.08));
  const likeOpacity = Math.max(0, Math.min(1, (dx - 40) / 120));
  const nopeOpacity = Math.max(0, Math.min(1, (-dx - 40) / 120));

  // chat send
  const genId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: genId(), author: "me", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: genId(), author: "them", text: "Klinkt goed! Morgenmiddag even bellen?" },
      ]);
    }, 600);
  };

  const AvatarComp = AVATARS[person.avatar];

  return (
    <div className="min-h-screen bg-[var(--cream)] pt-8 pb-14 px-5">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-[var(--pear-green)]">
        You matched with
      </h1>
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[var(--pear-green)] mt-1">
        {person.name}
      </h2>

      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-sm">
          {!showChat && (
            <>
              <div className="absolute -left-2 top-6 z-20 select-none pointer-events-none" style={{ opacity: nopeOpacity }}>
                <span className="border-4 border-[#E65B4F] text-[#E65B4F] font-extrabold px-3 py-1 rounded-md rotate-[-12deg]">
                  SKIP
                </span>
              </div>
              <div className="absolute -right-2 top-6 z-20 select-none pointer-events-none" style={{ opacity: likeOpacity }}>
                <span className="border-4 border-[#2E7D32] text-[#2E7D32] font-extrabold px-3 py-1 rounded-md rotate-[12deg]">
                  CHAT
                </span>
              </div>
            </>
          )}

          <div
            ref={cardRef}
            className={`bg-white rounded-3xl shadow-md p-6 select-none ${
              showChat ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            }`}
            style={{
              willChange: "transform",
              touchAction: "none",
              transform:
                leaving === null && !showChat
                  ? `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`
                  : undefined,
              transition: dragging ? "none" : "transform 180ms ease",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Profiel */}
            <div className="flex flex-col items-center">
              <AvatarComp />
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                {person.interests.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <p className="mt-4 text-center text-[var(--ink)]/85 text-sm leading-snug">
                {person.blurb}
              </p>
            </div>
          </div>

          {!showChat && (
            <p className="mt-3 text-center text-[var(--ink)]/60 text-sm">
              Swipe <span className="font-semibold">left</span> to keep searching •{" "}
              Swipe <span className="font-semibold">right</span> to open chat
            </p>
          )}
        </div>
      </div>

      {/* ───────── Bottom Sheet Chat met avatar-header ───────── */}
      {showChat && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
          <div className="w-full max-w-sm bg-white rounded-t-3xl shadow-xl border border-[#E7E2D5] h-[65vh] flex flex-col">
            {/* header met mini avatar + naam */}
            <div className="pt-3 pb-2 px-4 sticky top-0 bg-white z-10">
              <div className="mx-auto h-1.5 w-10 rounded-full bg-black/10 mb-3" />
              <div className="flex items-center justify-center gap-2">
                <div className="shrink-0 rounded-full ring-2 ring-[var(--pear-green)]/20 overflow-hidden">
                  <AvatarComp className="w-10 h-10" />
                </div>
                <h3 className="text-center font-semibold text-[var(--pear-green)]">
                  Chat with {person.name}
                </h3>
              </div>
            </div>

            {/* berichten */}
            <div className="flex-1 overflow-y-auto px-3 pb-2">
              <div className="space-y-1">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.author === "me" ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`px-3 py-2 rounded-2xl text-sm leading-snug whitespace-pre-wrap ${
                        m.author === "me"
                          ? "bg-[var(--pear-green)] text-white"
                          : "bg-[var(--cream)] text-[var(--ink)] border border-[#E7E2D5]"
                      }`}
                    >
                      {m.text}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* input */}
            <div className="p-3 border-t border-[#E7E2D5] flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder={`Message ${person.name}…`}
                className="flex-1 rounded-xl border border-[#E7E2D5] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--leaf)]/40"
              />
              <button
                onClick={sendMsg}
                className="rounded-xl bg-[var(--pear-green)] text-white px-4 py-2 text-sm font-semibold hover:brightness-95 active:translate-y-px"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
