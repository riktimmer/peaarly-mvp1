"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ChatSummary = { id: string; name: string; avatar: string; lastText: string; lastTs: number; unread: number };

const CHAT_LIST_KEY = "peaarly.chat.summaries";

function useChatSummaries() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_LIST_KEY);
      const list = raw ? (JSON.parse(raw) as ChatSummary[]) : [];
      if (Array.isArray(list)) {
        setChats(
          list
            .slice()
            .sort((a, b) => b.lastTs - a.lastTs)
            .slice(0, 6)
        );
      } else {
        setChats([]);
      }
    } catch {
      setChats([]);
    }
  }, []);
  return chats;
}

export default function CommunityPage() {
  const chats = useChatSummaries();

  return (
    <main className="min-h-screen fruit-wall text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6 space-y-6">
        {/* Header / hero */}
        <section className="card">
          <h1 className="text-[1.6rem] font-extrabold">Community Feed</h1>
          <p className="text-muted mt-1">
            What’s happening across the grove 🍐 — topics, peers, and your recent chats.
          </p>
        </section>

        {/* Recent chats */}
        <section className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.15rem] font-extrabold">Recent Chats</h2>
            <Link href="/drop/match" className="text-sm font-semibold underline hover:opacity-80">
              Open Emily
            </Link>
          </div>

          {chats.length === 0 ? (
            <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60 p-4 text-sm text-muted">
              No conversations yet. Start a chat from a match and it’ll show up here.
            </div>
          ) : (
            <ul className="divide-y divide-[rgba(0,0,0,0.06)] rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/60">
              {chats.map((c) => (
                <li key={c.id} className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5D3A28] text-white grid place-items-center font-bold">
                    {c.avatar}
                  </div>
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
          )}
        </section>

        {/* Suggested topics (speels) */}
        <section className="card">
          <h2 className="text-[1.15rem] font-extrabold mb-3">Suggested Topics</h2>
          <div className="flex flex-wrap gap-2">
            {["Growth", "Creativity", "Productivity", "Leadership", "Problem solving"].map((t) => (
              <button key={t} className="badge">{t}</button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
