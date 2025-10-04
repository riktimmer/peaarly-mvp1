"use client";

import React, { useMemo } from "react";
import { Card, Badge, AvatarFace, PearIcon, OrangeIcon, StrawberryIcon } from "../../components/ui";

export default function MatchPage() {
  const topics: string[] = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("peaarly.selectedTopics") || "[]");
    } catch {
      return [];
    }
  }, []);

  const candidate = {
    name: "Emily",
    role: "Product Manager",
    tags: ["Creative", "Funny"],
    fruit: "pear" as const,
  };

  const Fruit =
    candidate.fruit === "pear" ? PearIcon : candidate.fruit === "orange" ? OrangeIcon : StrawberryIcon;

  function nextDrop() {
    sessionStorage.removeItem("peaarly.selectedTopics");
    location.href = "/drop/select";
  }

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <Card>
          <p className="text-sm text-muted">You matched with</p>
          <h2 className="text-2xl font-extrabold">Emily</h2>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-[#F3F7EF] border border-[#D6E6CF] grid place-items-center overflow-hidden">
              <AvatarFace size={28} />
            </div>
            <div>
              <p className="text-sm text-muted">{candidate.role}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {candidate.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <Fruit />
          </div>

          {!!topics.length && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Based on your interests:</p>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-2">
            <a className="btn btn-primary w-full" href="/feed">Start Chat</a>
            <button className="btn w-full" style={{ background: "#FCD34D", color: "var(--leaf)" }} onClick={nextDrop}>
              Next Drop
            </button>
          </div>
        </Card>
      </div>
    </main>
  );
}
