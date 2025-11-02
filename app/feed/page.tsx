"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* =========================================================================
   Community Feed – fruitige LinkedIn-vibe
   - Sticky header met filters (Growth, Creativity, Focus, Leadership, Balance)
   - Composer (korte wins/uitnodigingen posten)
   - Fruit-reactions met telling (🍐 default + snel toevoegen)
   - Rijke kaarten (rol, time-ago, topics, acties)
   - Recent Chats + Suggested Topics blijven speels en coherent met home
   - Data lives in localStorage voor levend gevoel (geen backend nodig)
   ========================================================================= */

/* ------------------------------- Types ---------------------------------- */
type ChatSummary = {
  id: string;
  name: string;
  avatar: string; // letter/emoji
  lastText: string;
  lastTs: number;
  unread: number;
};

type Post = {
  id: string;
  author: { name: string; avatar: string; role?: string };
  createdAt: number;
  text: string;
  extra?: string;
  topics: string[];
  fruits: Record<string, number>; // emoji -> count
  comments: number;
  reshared?: boolean;
  image?: string;
};

/* ------------------------------ Storage keys ---------------------------- */
const CHAT_LIST_KEY = "peaarly.chat.summaries";
const FEED_KEY = "peaarly.community.feed.v2";

/* ------------------------------ Helpers --------------------------------- */
const timeAgo = (ts: number) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

/* ----------------------- Seeders (eenmalig per browser) ----------------- */
function seedChatsIfEmpty(): ChatSummary[] {
  let list: ChatSummary[] = [];
  try {
    const raw = localStorage.getItem(CHAT_LIST_KEY);
    list = raw ? (JSON.parse(raw) as ChatSummary[]) : [];
    if (!Array.isArray(list) || list.length === 0) {
      list = [
        { id: "liam", name: "Liam", avatar: "🍊", lastText: "Timeboxing werkte top 🙌", lastTs: Date.now() - 12 * 60_000, unread: 0 },
        { id: "ava", name: "Ava", avatar: "🍓", lastText: "Morgen 20-min ideation sessie?", lastTs: Date.now() - 45 * 60_000, unread: 1 },
        { id: "noah", name: "Noah", avatar: "🍎", lastText: "Thanks voor je pitch feedback!", lastTs: Date.now() - 90 * 60_000, unread: 0 },
      ];
      localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(list));
    }
  } catch { /* ignore */ }
  return list;
}

function seedFeedIfEmpty(): Post[] {
  const demo: Post[] = [
    {
      id: "p1",
      author: { name: "Emily", avatar: "E", role: "Product learner" },
      createdAt: Date.now() - 6 * 60_000,
      text: "Mini-stap gezet: 25m deep work op m’n slide deck. Ritme vasthouden!",
      extra: "Tip: Pomodoro + notifs uit = magie.",
      topics: ["Focus", "Growth"],
      fruits: { "🍐": 8, "🍊": 3, "🍓": 2 },
      comments: 3,
    },
    {
      id: "p2",
      author: { name: "Liam", avatar: "🍊", role: "Ops tinkerer" },
      createdAt: Date.now() - 28 * 60_000,
      text: "Eerste week met weekly themes. Helpt focus echt!",
      topics: ["Focus"],
      fruits: { "🍎": 5, "🍐": 2 },
      comments: 1,
    },
    {
      id: "p3",
      author: { name: "Ava", avatar: "🍓", role: "Design sprinter" },
      createdAt: Date.now() - 50 * 60_000,
      text: "Morgen 20-min ideation — wie haakt aan?",
      topics: ["Creativity", "Growth"],
      fruits: { "🍇": 4, "🍐": 6 },
      comments: 5,
    },
  ];

  try {
    const raw = localStorage.getItem(FEED_KEY);
    const list = raw ? (JSON.parse(raw) as Post[]) : [];
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(FEED_KEY, JSON.stringify(demo));
      return demo;
    }
    return list;
  } catch {
    return demo;
  }
}

/* -------------------------------- Hooks --------------------------------- */
function useChatSummaries() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  useEffect(() => {
    try {
      const seeded = seedChatsIfEmpty();
      const raw = localStorage.getItem(CHAT_LIST_KEY);
      const list = raw ? (JSON.parse(raw) as ChatSummary[]) : seeded;
      setChats(
        Array.isArray(list)
          ? list.slice().sort((a, b) => b.lastTs - a.lastTs).slice(0, 6)
          : seeded
      );
    } catch {
      setChats([]);
    }
  }, []);
  return chats;
}

function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => setPosts(seedFeedIfEmpty()), []);

  const react = (id: string, emoji: string) =>
    setPosts((prev) => {
      const next = prev.map((p) =>
        p.id === id
          ? { ...p, fruits: { ...p.fruits, [emoji]: (p.fruits[emoji] || 0) + 1 } }
          : p
      );
      localStorage.setItem(FEED_KEY, JSON.stringify(next));
      return next;
    });

  const addPost = (text: string, topics: string[]) =>
    setPosts((prev) => {
      const newPost: Post = {
        id: `p${Date.now()}`,
        author: { name: "You", avatar: "🍐", role: "Peear" },
        createdAt: Date.now(),
        text,
        topics,
        fruits: { "🍐": 1 },
        comments: 0,
      };
      const next = [newPost, ...prev];
      localStorage.setItem(FEED_KEY, JSON.stringify(next));
      return next;
    });

  return { posts, react, addPost };
}

/* ------------------------------ UI-bits --------------------------------- */
function Avatar({ label, ring = false }: { label: string; ring?: boolean }) {
  return (
    <div
      className={`w-11 h-11 rounded-full grid place-items-center font-bold bg-[#F5D48A] text-[color:var(--leaf)] ${
        ring ? "outline outline-2 outline-[rgba(46,125,61,0.25)]" : ""
      }`}
      aria-hidden
    >
      {label}
    </div>
  );
}

function TopicChip({ t }: { t: string }) {
  const icon = t.includes("Lead")
    ? "🍊"
    : t.includes("Creat")
    ? "🍓"
    : t.includes("Focus")
    ? "🍎"
    : "🍐";
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(46,125,61,0.08)] text-[color:var(--leaf)] font-semibold text-xs">
      <span aria-hidden>{icon}</span>
      {t}
    </span>
  );
}

function FruitButton({
  emoji,
  count,
  onClick,
}: {
  emoji: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,0,0,0.06)] bg-white/70 px-2.5 py-1 text-sm hover:brightness-95"
      type="button"
      aria-label={`Geef ${emoji}`}
    >
      <span aria-hidden>{emoji}</span>
      <span className="text-[rgba(0,0,0,0.75)]">{count}</span>
    </button>
  );
}

/* -------------------------------- Page ---------------------------------- */
export default function CommunityPage() {
  const chats = useChatSummaries();
  const { posts, react, addPost } = useFeed();
  const [composer, setComposer] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const now = useMemo(() => new Date(), []);

  const visiblePosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.topics.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())));

  const TOPICS = ["All", "Growth", "Creativity", "Focus", "Leadership", "Balance"];

  function submitPost() {
    if (!composer.trim()) return;
    // simpele topic-detectie
    const t = composer.toLowerCase();
    const topics: string[] = [];
    if (t.includes("focus")) topics.push("Focus");
    if (t.includes("lead")) topics.push("Leadership");
    if (t.includes("idea") || t.includes("creat")) topics.push("Creativity");
    if (topics.length === 0) topics.push("Growth");
    addPost(composer.trim(), topics);
    setComposer("");
  }

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6 space-y-6">
        {/* Header + filters */}
        <section className="card sticky top-0 z-20 -mx-5 px-5 pt-4 pb-3 backdrop-blur bg-white/75 border-b border-[rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h1 className="text-[1.6rem] font-extrabold">Community</h1>
            <div className="flex items-center gap-3 text-xl">
              <Link href="/" aria-label="Home">🏠</Link>
              <Link href="/profile" aria-label="Profile">👤</Link>
            </div>
          </div>
          <p className="text-muted mt-1">
            Een plek voor peer growth — geen cv’s, wel karakter. 🍐
          </p>

          <div className="mt-3 flex items-center gap-2 overflow-auto no-scrollbar">
            {TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                  activeFilter === t
                    ? "bg-[#F8E1A6] ring-1 ring-black/5"
                    : "bg-white/70 border border-[rgba(0,0,0,0.06)]"
                }`}
              >
                {t === "All" ? "All" : (
                  <>
                    <span className="mr-1" aria-hidden>
                      {t.includes("Lead") ? "🍊" : t.includes("Creat") ? "🍓" : t.includes("Focus") ? "🍎" : "🍐"}
                    </span>
                    {t}
                  </>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Composer */}
        <section className="card">
          <div className="flex gap-3">
            <Avatar label="🍐" />
            <div className="flex-1">
              <textarea
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                placeholder="Deel een kleine winst, leerpunt of uitnodiging (kort, concreet & menselijk)…"
                className="w-full resize-none rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/70 p-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(46,125,61,0.25)]"
                rows={3}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm text-muted">Tip: 1 zin + 1 topic + 1 call to action.</div>
                <button
                  onClick={submitPost}
                  className="rounded-xl bg-[#F8E1A6] px-4 py-1.5 font-semibold hover:brightness-95"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
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

        {/* Community Feed */}
        <section className="card space-y-4">
          <h2 className="text-[1.15rem] font-extrabold">Community Feed</h2>

          {visiblePosts.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl bg-white/70 border border-[rgba(0,0,0,0.06)] p-3 shadow-sm"
            >
              <div className="flex gap-3">
                <Avatar label={p.author.avatar} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{p.author.name}</div>
                      {p.author.role && (
                        <div className="text-xs text-muted -mt-0.5">{p.author.role}</div>
                      )}
                    </div>
                    <div className="text-xs text-muted">{timeAgo(p.createdAt)}</div>
                  </div>

                  <div className="mt-2 text-[rgba(0,0,0,0.85)]">
                    <p>{p.text}</p>
                    {p.extra && <p className="mt-1">{p.extra}</p>}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.topics.map((t) => (
                      <TopicChip key={`${p.id}-${t}`} t={t} />
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {Object.entries(p.fruits).map(([emoji, count]) => (
                        <FruitButton
                          key={`${p.id}-${emoji}`}
                          emoji={emoji}
                          count={count}
                          onClick={() => react(p.id, emoji)}
                        />
                      ))}
                      {/* Snel een peer geven */}
                      <button
                        onClick={() => react(p.id, "🍐")}
                        className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.06)] bg-white/70 px-2.5 py-1 text-sm hover:brightness-95"
                        aria-label="Geef een peer"
                      >
                        ➕🍐
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[1.05rem] text-[rgba(0,0,0,0.6)]">
                      <button aria-label="Comment">💬 {p.comments}</button>
                      <button aria-label="Reshare">↗</button>
                      <button aria-label="Save">⭐</button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Recent Chats */}
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
                  Nog geen gesprekken. Start een chat vanuit een match en je ziet ‘m hier.
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
                onClick={() => setActiveFilter(t)}
                className="rounded-2xl bg-[#F8E1A6] hover:brightness-95 transition p-3 text-center font-semibold"
                type="button"
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm">{t}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom nav */}
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
