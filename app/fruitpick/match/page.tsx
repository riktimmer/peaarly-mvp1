"use client";

import * as React from "react";

/** ─────────────────────────────────────────────────────────────
 *  Kandidaten + types
 *  - avatar: "male" | "female"
 *  - skin/hair worden door de Svg-component ingevuld
 *  - messages: start dummy conversatie
 *  ────────────────────────────────────────────────────────────*/
type Message = { id: string; author: "me" | "them"; text: string; time?: string };

type Person = {
  name: string;
  interests: string[];
  blurb: string;
  avatar: "male" | "female";
  messages: Message[];
};

const CANDIDATES: Person[] = [
  {
    name: "David",
    interests: ["Marketing", "Problem-solving"],
    blurb:
      "Interested in exploring best practices for customer retention.",
    avatar: "male",
    messages: [
      { id: "m1", author: "them", text: "Hey 👋 Leuk je te matchen!" },
      {
        id: "m2",
        author: "them",
        text: "Ik ben benieuwd naar jouw ideeën over klantretentie.",
      },
      { id: "m3", author: "me", text: "Top! Zin om wat cases te sparren?" },
      { id: "m4", author: "them", text: "Zeker! :)" },
    ],
  },
  {
    name: "Amina",
    interests: ["Leadership", "Creativity"],
    blurb:
      "Exploring playful ways to grow teams and spark new ideas.",
    avatar: "female",
    messages: [
      { id: "a1", author: "them", text: "Hoi! 😊 Leuk om te matchen." },
      { id: "a2", author: "them", text: "Werk je veel met peer mentoring?" },
      { id: "a3", author: "me", text: "Ja! Vind het super effectief." },
    ],
  },
];

/** ─────────────────────────────────────────────────────────────
 *  Mannelijke avatar (bruin haar + baardje)
 *  ────────────────────────────────────────────────────────────*/
function MaleAvatar() {
  return (
    <svg
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-40 drop-shadow-sm"
      aria-hidden
    >
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      {/* nek + schouders */}
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      <circle cx="80" cy="85" r="32" fill="#F4CDA5" />
      {/* haar */}
      <path
        d="M48 74c0-24 16-40 32-40s32 12 32 34c-3-2-6-3-9-3s-7 2-9 4c-2-2-5-3-8-3-7 0-13 5-15 11-2-2-6-3-9-3-5 0-9 3-14 7z"
        fill="#603F26"
      />
      {/* baard */}
      <path
        d="M54 90c3 12 11 22 26 22s23-10 26-22c-2 3-5 6-9 6-4 0-7-2-9-5-2 3-5 5-8 5-4 0-7-2-10-6-3 3-5 5-8 5-3 0-6-2-8-5z"
        fill="#603F26"
      />
      {/* ogen */}
      <circle cx="68" cy="82" r="4" fill="#1E1E1E" />
      <circle cx="92" cy="82" r="4" fill="#1E1E1E" />
      {/* wenkbrauwen */}
      <rect x="61" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18" />
      <rect x="85" y="74" width="14" height="2.5" rx="1.25" fill="#3B2A18" />
      {/* neus */}
      <path
        d="M78 82c1 2 2 4 2 7s-1 4-2 4"
        stroke="#C68642"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* glimlach */}
      <path
        d="M70 97c3 3 8 3 12 0"
        stroke="#A45B27"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** ─────────────────────────────────────────────────────────────
 *  Vrouwelijke avatar (donkere huidskleur + bruin haar in bun)
 *  ────────────────────────────────────────────────────────────*/
function FemaleAvatar() {
  return (
    <svg
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-40 drop-shadow-sm"
      aria-hidden
    >
      <circle cx="80" cy="80" r="75" fill="#F9EFD5" />
      {/* nek + bovenkleding */}
      <rect x="55" y="100" width="50" height="20" rx="10" fill="#2F7C57" />
      {/* hoofd */}
      <circle cx="80" cy="86" r="31" fill="#C89058" />
      {/* haar: bun + golvend */}
      <circle cx="100" cy="56" r="10" fill="#5A3A22" />
      <path
        d="M52 82c0-22 16-36 30-36s28 9 30 28c-3-2-6-3-9-3-5 0-9 2-12 5-2-2-5-3-9-3-8 0-13 6-15 12-3-3-6-4-9-4-3 0-5 1-7 1z"
        fill="#5A3A22"
      />
      {/* ogen */}
      <circle cx="68" cy="88" r="3.8" fill="#1E1E1E" />
      <circle cx="92" cy="88" r="3.8" fill="#1E1E1E" />
      {/* wenkbrauwen */}
      <rect x="60.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      <rect x="84.5" y="80" width="15" height="2.5" rx="1.25" fill="#3B2A18" />
      {/* neus */}
      <path
        d="M79 88c1.1 2 1.8 4.2 1.8 6.6s-.8 3.6-1.8 3.6"
        stroke="#8C5B33"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* zachte glimlach */}
      <path
        d="M69 102c4 3.2 9 3.2 13 0"
        stroke="#7C4A2A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* oorbellen subtiel */}
      <circle cx="56" cy="96" r="2.6" fill="#E8D4A8" />
      <circle cx="104" cy="96" r="2.6" fill="#E8D4A8" />
    </svg>
  );
}

export default function FruitPickMatchPage() {
  // index van actieve kandidaat
  const [idx, setIdx] = React.useState(0);
  const person = CANDIDATES[idx];

  // swipe state
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);
  const start = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const DIST_THRESHOLD = 120;
  const VEL_THRESHOLD = 0.6;

  // chat state (op dezelfde pagina)
  const [showChat, setShowChat] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(person.messages);
  const [input, setInput] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);

  // elke keer als kandidaat wisselt, chat resetten
  React.useEffect(() => {
    setShowChat(false);
    setMessages(CANDIDATES[idx].messages);
    setInput("");
    RESET(true);
  }, [idx]);

  // autoscroll chat
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  const scheduleHere = () => {
    // rechts swipe → toon chat onder profiel
    setShowChat(true);
  };

  const keepSwiping = () => {
    // links swipe → volgende kandidaat
    setIdx((i) => (i + 1) % CANDIDATES.length);
  };

  // pointer handlers (uit wanneer chat open is)
  const onPointerDown = (e: React.PointerEvent) => {
    if (showChat) return; // niet slepen terwijl chat open is
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
    if (!node) {
      onDone();
      return;
    }
    const sign = dir === "right" ? 1 : -1;
    node.style.transition = "transform 220ms ease-out, opacity 220ms ease-out";
    node.style.transform = `translate(${sign * 1000}px, ${dy}px) rotate(${
      sign * 22
    }deg)`;
    node.style.opacity = "0";
    window.setTimeout(onDone, 230);
  };

  const onPointerUp = () => {
    if (!start.current || showChat) return RESET();
    const dt = Math.max(1, performance.now() - start.current.t);
    const vx = dx / dt;
    if (dx > DIST_THRESHOLD || vx > VEL_THRESHOLD) {
      animateOut("right", scheduleHere);
      return;
    }
    if (dx < -DIST_THRESHOLD || vx < -VEL_THRESHOLD) {
      animateOut("left", keepSwiping);
      return;
    }
    RESET();
  };

  const RESET = (instant = false) => {
    setDragging(false);
    setLeaving(null);
    setDx(0);
    setDy(0);
    if (cardRef.current) {
      const n = cardRef.current;
      n.style.transition = instant ? "none" : "transform 180ms ease";
      n.style.transform = "translate(0px, 0px)";
      n.style.opacity = "1";
      if (!instant) {
        setTimeout(() => {
          if (n) n.style.transition = "none";
        }, 190);
      }
    }
  };

  // toetsenbord fallback
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showChat) return;
      if (e.key === "ArrowRight") animateOut("right", scheduleHere);
      if (e.key === "ArrowLeft") animateOut("left", keepSwiping);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showChat]);

  // overlays
  const rotate = Math.max(-18, Math.min(18, dx * 0.08));
  const likeOpacity = Math.max(0, Math.min(1, (dx - 40) / 120));
  const nopeOpacity = Math.max(0, Math.min(1, (-dx - 40) / 120));

  // send chat message
  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), author: "me", text },
    ]);
    setInput("");
    // kleine “respons” na 600ms voor levendigheid
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: "them",
          text: "Klinkt goed! Zullen we morgenmiddag even bellen?",
        },
      ]);
    }, 600);
  };

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
          {/* overlays */}
          {!showChat && (
            <>
              <div
                className="absolute -left-2 top-6 z-20 select-none pointer-events-none"
                style={{ opacity: nopeOpacity }}
              >
                <span className="border-4 border-[#E65B4F] text-[#E65B4F] font-extrabold px-3 py-1 rounded-md rotate-[-12deg]">
                  SKIP
                </span>
              </div>
              <div
                className="absolute -right-2 top-6 z-20 select-none pointer-events-none"
                style={{ opacity: likeOpacity }}
              >
                <span className="border-4 border-[#2E7D32] text-[#2E7D32] font-extrabold px-3 py-1 rounded-md rotate-[12deg]">
                  SCHEDULE
                </span>
              </div>
            </>
          )}

          {/* kaart */}
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
            {/* profiel */}
            <div className="flex flex-col items-center">
              {person.avatar === "male" ? <MaleAvatar /> : <FemaleAvatar />}
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                {person.interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#F7F0DD] text-[var(--ink)] text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-[var(--ink)]/85 text-sm leading-snug">
                {person.blurb}
              </p>
            </div>

            {/* chat inline onder profiel (verschijnt na rechts swipe) */}
            {showChat && (
              <div className="mt-6">
                <h3 className="text-center font-semibold text-[var(--pear-green)] mb-2">
                  Chat with {person.name}
                </h3>
                <div className="bg-[var(--cream)] rounded-2xl p-3 border border-[#E7E2D5] max-h-64 overflow-y-auto">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`my-1 flex ${
                        m.author === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span
                        className={`px-3 py-2 rounded-2xl text-sm leading-snug whitespace-pre-wrap ${
                          m.author === "me"
                            ? "bg-[var(--pear-green)] text-white"
                            : "bg-white text-[var(--ink)] border border-[#E7E2D5]"
                        }`}
                      >
                        {m.text}
                      </span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="mt-2 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMsg();
                    }}
                    placeholder="Type a message…"
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
            )}
          </div>

          {!showChat && (
            <p className="mt-3 text-center text-[var(--ink)]/60 text-sm">
              Swipe <span className="font-semibold">left</span> to keep
              searching • Swipe <span className="font-semibold">right</span> to
              open chat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
