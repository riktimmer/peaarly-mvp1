"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ---------- Types & storage ---------- */
type ChatSummary = {
  id: string;
  name: string;
  avatar: string; // letter/emoji
  lastText: string;
  lastTs: number;
  unread: number;
};

const CHAT_LIST_KEY = "peaarly.chat.summaries";

/* Seed voor “Recent Chats” wanneer je nog niets hebt */
function seedIfEmpty(): ChatSummary[] {
  let list: ChatSummary[] = [];
  try {
    const raw = localStorage.getItem(CHAT_LIST_KEY);
    list = raw ? (JSON.parse(raw) as ChatSummary[]) : [];
    if (!Array.isArray(list) || list.length === 0) {
      list = [
        {
          id: "liam",
          name: "Liam",
          avatar: "🍊",
          lastText: "Timeboxing werkte top 🙌",
          lastTs: Date.now() - 1000 * 60 * 12,
          unread: 0,
        },
        {
          id: "ava",
          name: "Ava",
          avatar: "🍓",
          lastText: "Morgen 20-min ideation sessie?",
          lastTs: Date.now() - 1000 * 60 * 45,
          unread: 1,
        },
        {
          id: "noah",
          name: "Noah",
          avatar: "🍎",
          lastText: "Thanks voor je pitch feedback!",
          lastTs: Date.now() - 1000 * 60 * 90,
          unread: 0,
        },
      ];
      localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(list));
    }
  } catch {
    // ignore
  }
  return list;
}

function useChatSummaries() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  useEffect(() => {
    try {
      const seeded = seedIfEmpty();
      const raw = localStorage.getItem(CHAT_LIST_KEY);
      const list = raw ? (JSON.parse(raw) as ChatSummary[]) : seeded;
      if (Array.isArray(list)) {
        setChats(list.slice().sort((a, b) => b.lastTs - a.lastTs).slice(0, 6));
      } else {
        setChats(seeded);
      }
    } catch {
      setChats([]);
    }
  }, []);
  return chats;
}

/* ---------- UI helpers ---------- */
function Avatar({
  label,
  ring = false,
}: {
  label: string; // letter/emoji
  ring?: boolean;
}) {
  return (
    <div
      className={`w-12 h-12 rounded-full grid place-items-center font-bold bg-[#F5D48A] text-[color:var(--leaf)] ${
        ring ? "outline outline-2 outline-[rgba(46,125,61,0.25)]" : ""
      }`}
      aria-hidden
    >
      {label}
    </div>
  );
}

function TopicChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(46,125,61,0.08)] text-[color:var(--leaf)] font-semibold text-sm">
      {children}
    </span>
  );
}

function FruitBadge({ fruit }: { fruit: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm bg-white border border-[rgba(0,0,0,0.06)]">
      <span aria-hidden>{fruit}</span>
      <span className="text-[rgba(0,0,0,0.7)]">+1</span>
    </span>
  );
}

/* Dummy feed data */
type FeedItem = {
  id: string;
  author: { name: string; avatar: string };
  text1: string;
  text2?: string;
  topics: string[];
  reactions?: string[]; // fruit-emoji’s
};
const FEED: FeedItem[] = [
  {
    id: "f1",
    author: { name: "Emily", avatar: "E" },
    text1:
      "Vandaag mini stap gezet: 25m deep work op m’n slide deck. Nu ritme vasthouden 🍐",
    text2:
      "Tip: Pomodoro + notifs uit = magie.",
    topics: ["Leadership", "Balance"],
    reactions: ["🍐", "🍊", "🍓"],
  },
  {
    id: "f2",
    author: { name: "Liam", avatar: "🍊" },
    text1: "Eerste week met weekly themes. Helpt focus echt!",
    topics: ["Focus"],
    reactions: ["🍎"],
  },
  {
    id: "f3",
    author: { name: "Ava", avatar: "🍓" },
    text1: "Morgen 20-min ideation—wie wil meedoen?",
    topics: ["Creativity", "Growth"],
    reactions: ["🍇", "🍐"],
  },
];

/* My Activity (speels) */
const MY_ACTIVITY = [
  { icon: "💬", label: "Chats" },
  { icon: "🍐", label: "Drops", count: 2 },
  { icon: "🍊", label: "Oranges", count: 3 },
  { icon: "🍓", label: "Strawbs", count: 1 },
  { icon: "🌳", label: "Streak", count: 4 },
];

/* ---------- Page ---------- */
export default function CommunityPage() {
  const chats = useChatSummaries();
  const now = useMemo(() => new Date(), []);

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6 space-y-6">

        {/* Header */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h1 className="text-[1.6rem] font-extrabold">Community Feed</h1>
            <div className="flex items-center gap-3 text-xl">
              <span aria-hidden>🔍</span>
              <span aria-hidden>🔔</span>
            </div>
          </div>
          <p className="text-muted mt-1">
            What’s happening across the grove 🍐—peers, topics & activity.
          </p>
        </section>

        {/* Active Peers */}
        <section className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.15rem] font-extrabold">Active Peers</h2>
            <Link className="text-sm font-semibold underline" href="/drop/select">
              Start a Drop
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="grid place-items-center gap-1">
                <Avatar label="E" ring />
                <span className="text-xs">🍐</span>
              </div>
              <div className="grid place-items-center gap-1">
                <Avatar label="🍊" />
                <span className="text-xs">🍊</span>
              </div>
              <div className="grid place-items-center gap-1">
                <Avatar label="🍓" />
                <span className="text-xs">🍓</span>
              </div>
              <div className="grid place-items-center gap-1">
                <Avatar label="🍎" />
                <span className="text-xs">🍎</span>
              </div>
            </div>

            <div className="ml-auto text-center">
              <div className="w-12 h-12 rounded-full bg-[rgba(46,125,61,0.08)] grid place-items-center">
                <span aria-hidden>➕</span>
              </div>
              <div className="text-xs mt-1">Connect</div>
            </div>
          </div>
        </section>

        {/* Community posts */}
        <section className="card space-y-4">
          <h2 className="text-[1.15rem] font-extrabold">Community</h2>

          {FEED.map((item, idx) => (
            <article key={item.id} className="rounded-2xl bg-white/60 border border-[rgba(0,0,0,0.06)] p-3">
              <div className="flex gap-3">
                <Avatar label={item.author.avatar} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{item.author.name}</div>
                  <div className="text-sm text-[rgba(0,0,0,0.75)] mt-1">
                    <div>{item.text1}</div>
                    {item.text2 && <div className="mt-0.5">{item.text2}</div>}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.topics.map((t) => (
                      <TopicChip key={t}>
                        {/* klein fruitje prefix op random voor playful effect */}
                        <span aria-hidden>
                          {t.includes("Lead") ? "🍊" : t.includes("Creat") ? "🍓" : t.includes("Focus") ? "🍎" : "🍐"}
                        </span>
                        {t}
                      </TopicChip>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.reactions?.map((r, i) => (
                        <FruitBadge key={`${item.id}-r-${i}`} fruit={r} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[1.1rem] text-[rgba(0,0,0,0.55)]">
                      <button aria-label="Like">♡</button>
                      <button aria-label="Share">↗</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* subtiele divider tussen posts */}
              {idx !== FEED.length - 1 && <div className="divider mt-3" />}
            </article>
          ))}
        </section>

        {/* Recent Chats (uit storage) */}
        <section className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.15rem] font-extrabold">Recent Chats</h2>
            <Link href="/drop/match" className="text-sm font-semibold underline hover:opacity-80">
              Open Emily
            </Link>
          </div>

          {useMemo(
            () =>
              chats.length === 0 ? (
                <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60 p-4 text-sm text-muted">
                  No conversations yet. Start a chat from a match and it’ll show up here.
                </div>
              ) : (
                <ul className="divide-y divide-[rgba(0,0,0,0.06)] rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60">
                  {chats.map((c) => (
                    <li key={c.id} className="p-3 flex items-center gap-3">
                      <Avatar label={c.avatar} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{c.name}</div>
                          <div className="text-xs text-muted">
                            {new Date(c.lastTs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap text-[rgba(0,0,0,0.75)]">
                          {c.lastText}
                        </div>
                      </div>
                      {c.unread > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[color:var(--pear-green)] text-white text-xs font-bold">
                          {c.unread}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ),
            [chats]
          )}
        </section>

        {/* My Activity */}
        <section className="card">
          <h2 className="text-[1.15rem] font-extrabold mb-3">My Activity</h2>
          <div className="flex items-center justify-between">
            {MY_ACTIVITY.map((a) => (
              <div key={a.label} className="grid place-items-center gap-1">
                <div className="text-xl">{a.icon}</div>
                {a.count ? (
                  <div className="text-xs"><b>{a.count}</b></div>
                ) : (
                  <div className="text-xs text-muted">&nbsp;</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Suggested Topics */}
        <section className="card">
          <h2 className="text-[1.15rem] font-extrabold mb-3">Suggested Topics</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { t: "Growth", icon: "🌱" },
              { t: "Creativity", icon: "🍓" },
              { t: "Productivity", icon: "⚡️" },
              { t: "Leadership", icon: "🍊" },
              { t: "Balance", icon: "🍐" },
              { t: "Problem solving", icon: "🍎" },
            ].map(({ t, icon }) => (
              <button
                key={t}
                className="rounded-2xl bg-[#F8E1A6] hover:brightness-95 transition p-3 text-center font-semibold"
                type="button"
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm">{t}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom nav (speels) */}
        <nav className="sticky bottom-3 left-0 right-0 max-w-md mx-auto">
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-[rgba(0,0,0,0.06)] p-3 flex items-center justify-between">
            <Link href="/" aria-label="Home">🏠</Link>
            <button aria-label="Search">🔎</button>
            <Link href="/drop/select" aria-label="New">➕</Link>
            <Link href="/drop/match" aria-label="Chat">💬</Link>
            <Link href="/profile" aria-label="Profile">👤</Link>
          </div>
        </nav>

        <p className="text-center text-muted text-xs">
          Updated {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </main>
  );
}
