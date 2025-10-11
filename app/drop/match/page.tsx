"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/** Interesses uit localStorage ophalen (zoals bij Select-stap opgeslagen) */
function useSelectedInterests() {
  const [interests, setInterests] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("peaarly.selectedInterests");
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      setInterests(Array.isArray(arr) ? arr.slice(0, 6) : []);
    } catch {
      setInterests([]);
    }
  }, []);
  return interests;
}

/** Emily avatar – vrolijk, lang haar + animaties (blink/float/hair sway) */
function EmilyAvatar({ size = 160 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="mx-auto emily-float"
      aria-hidden
    >
      <circle cx="100" cy="100" r="92" fill="#F8E1A6" />
      <ellipse cx="100" cy="150" rx="60" ry="24" fill="#2E7D3D" />
      <path
        className="emily-hair"
        d="
          M45 120
          C40 85, 55 55, 100 55
          C145 55, 160 85, 155 120
          C150 155, 130 165, 100 165
          C70 165, 50 155, 45 120
          Z
        "
        fill="#5D3A28"
      />
      <path
        d="M100 65
           c-24 0 -40 17 -40 40
           c0 27 18 42 40 42
           s40 -15 40 -42
           c0 -23 -16 -40 -40 -40z"
        fill="#F3C49C"
      />
      <circle cx="70" cy="110" r="7" fill="#F2A7A7" opacity=".55" />
      <circle cx="130" cy="110" r="7" fill="#F2A7A7" opacity=".55" />
      <path
        d="M62 102c-3-30 16-42 38-42s41 12 38 42
           c-1 6-3 10-5 13c-4-7-16-17-33-17s-29 10-33 17c-2-3-4-7-5-13z"
        fill="#5D3A28"
      />
      <g className="emily-eyes">
        <ellipse cx="78" cy="110" rx="7" ry="4.2" fill="#2B2B2B" />
        <ellipse cx="122" cy="110" rx="7" ry="4.2" fill="#2B2B2B" />
      </g>
      <path d="M64 100c8-7 18-7 26 0" stroke="#2B2B2B" strokeWidth="4" fill="none" />
      <path d="M110 100c8-7 18-7 26 0" stroke="#2B2B2B" strokeWidth="4" fill="none" />
      <path d="M100 112c0 9-3 12-8 15" stroke="#D09D7B" strokeWidth="3" fill="none" />
      <path
        d="M80 132c12 10 28 10 40 0"
        stroke="#9D533B"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="54" cy="118" r="7" fill="#E9B690" />
      <circle cx="146" cy="118" r="7" fill="#E9B690" />
    </svg>
  );
}

/** Chat types */
type ChatMsg = { id: string; from: "Emily" | "You" | "System"; text: string; ts: number };
type ChatSummary = { id: string; name: string; avatar: string; lastText: string; lastTs: number; unread: number };

/** Helpers voor localStorage */
const CHAT_KEY = "peaarly.chat.emily";
const CHAT_LIST_KEY = "peaarly.chat.summaries";

function saveChat(messages: ChatMsg[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  // samenvatting updaten
  const last = messages[messages.length - 1];
  const summary: ChatSummary = {
    id: "emily",
    name: "Emily",
    avatar: "E",
    lastText: last?.text ?? "Say hi 👋",
    lastTs: last?.ts ?? Date.now(),
    unread: 0,
  };
  let list: ChatSummary[] = [];
  try {
    list = JSON.parse(localStorage.getItem(CHAT_LIST_KEY) || "[]");
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  const others = list.filter((c) => c.id !== "emily");
  localStorage.setItem(CHAT_LIST_KEY, JSON.stringify([summary, ...others]));
}

/** Scripted “dummy” dialoog (meerdere rondes) */
function scriptedReplies(tags: string[]): string[] {
  const first = tags[0];
  const second = tags[1];
  return [
    `Hey! Thanks for dropping a pear 😄. Leuk om je te ontmoeten!`,
    tags.length
      ? `Ik zie dat je focust op ${first}${second ? ` & ${second}` : ""}. Zullen we daar een mini-plan voor maken?`
      : `Waar wil jij je vooral op richten?`,
    `Wat ging er afgelopen week al goed? Iets kleins dat je wilt vasthouden?`,
    `Nice. En één concrete actie voor deze week? Iets dat in 20–30 min kan.`,
    `Top! Wil je dat ik je vrijdag even ping om te checken hoe het ging?`,
    `Awesome 🍐. We bouwen zo stap voor stap momentum.`
  ];
}

export default function MatchPage() {
  const interests = useSelectedInterests();
  const fallback = useMemo(
    () => ["Creative", "Funny", "Leadership", "Problem solving"],
    []
  );
  const tags = interests.length ? interests : fallback;

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    if (!chatOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [chatOpen, messages, typing]);

  // persist chat
  useEffect(() => {
    if (chatOpen && typeof window !== "undefined") {
      saveChat(messages);
    }
  }, [messages, chatOpen]);

  const pushMsg = (from: ChatMsg["from"], text: string, delay = 0) => {
    setTimeout(() => {
      setMessages((m) => [...m, { id: `${Date.now()}-${Math.random()}`, from, text, ts: Date.now() }]);
    }, delay);
  };

  const openChat = () => {
    if (chatOpen) return;
    const now = Date.now();
    const seed: ChatMsg[] = [
      { id: "s1", from: "System", text: "You're now connected with Emily 🍐", ts: now },
    ];
    setMessages(seed);
    setChatOpen(true);

    const lines = scriptedReplies(tags);
    let accDelay = 300;
    lines.forEach((line, idx) => {
      accDelay += 600 + Math.min(1600, line.length * 15);
      setTimeout(() => setTyping(true), accDelay - 450);
      pushMsg("Emily", line, accDelay);
      setTimeout(() => setTyping(false), accDelay + 50);
    });
  };

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    pushMsg("You", txt, 0);
    setInput("");

    // “bot” reageert contextueel
    const followups = [
      "Klinkt goed! Welke eerste stap maakt dit 10% makkelijker?",
      "Heb je iemand in je omgeving die je even kan ‘accountability pingen’?",
      "Als je het klein knipt, wat kun je vanmiddag al doen in 15 minuten?",
      "Love it. Zal ik je volgende week even checken hoe het ging?"
    ];
    const line = followups[Math.floor(Math.random() * followups.length)];
    setTyping(true);
    pushMsg("Emily", line, 900);
    setTimeout(() => setTyping(false), 920);
  };

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <section className="card relative overflow-hidden">
          <header className="text-center mb-4">
            <h1 className="text-[1.35rem] font-extrabold leading-tight">
              You matched with
            </h1>
            <div className="text-[1.6rem] font-extrabold -mt-1">Emily</div>
          </header>

          <EmilyAvatar />

          {/* interesses/chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(46,125,61,0.12)] text-[color:var(--leaf)] font-semibold text-[0.95rem]"
              >
                <span aria-hidden>🍐</span>
                {t}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="w-6 h-6 rounded-full bg-[rgba(46,125,61,0.12)] grid place-items-center font-bold">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* CTA's */}
          <div className="mt-6 space-y-3 px-2">
            <button
              type="button"
              className="btn-primary w-full text-[1.05rem] py-3 rounded-2xl"
              onClick={openChat}
            >
              Start Chat
            </button>

            <Link
              href="/drop/select"
              className="block text-center w-full bg-[#F5D48A] hover:brightness-95 transition rounded-2xl py-3 font-extrabold text-[1.05rem]"
            >
              Next Drop
            </Link>
          </div>

          {/* Chat panel */}
          {chatOpen && (
            <div className="mt-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/70 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#5D3A28] text-white grid place-items-center">
                  E
                </div>
                <div className="font-semibold">Emily</div>
                <div className="text-muted text-sm">· live</div>
              </div>

              <div
                ref={scrollRef}
                className="h-56 overflow-y-auto rounded-xl bg-white/60 p-3 space-y-2"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-[0.95rem] ${
                      m.from === "You"
                        ? "ml-auto bg-[rgba(46,125,61,0.12)]"
                        : m.from === "Emily"
                        ? "bg-white border border-[rgba(0,0,0,0.06)]"
                        : "mx-auto bg-[rgba(0,0,0,0.04)] text-muted"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}

                {typing && (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)]">
                    <span className="typing">
                      <span></span><span></span><span></span>
                    </span>
                    <span className="text-muted text-sm">Emily is typing…</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[rgba(46,125,61,0.25)]"
                />
                <button
                  onClick={send}
                  className="px-4 py-2 rounded-xl bg-[color:var(--pear-green)] text-white font-semibold hover:brightness-95 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-muted text-sm mt-4">
            Based on your interests:{" "}
            <span className="font-semibold">{tags.join(" · ")}</span>
          </p>
        </section>
      </div>
    </main>
  );
}
