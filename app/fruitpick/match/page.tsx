"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Person = {
  name: string;
  interests: string[];
  blurb: string;
};

const MATCH: Person = {
  name: "David",
  interests: ["Marketing", "Problem-solving"],
  blurb: "Interested in exploring best practices for customer retention.",
};

// --- 🎨 NIEUWE AVATAR ---
function Avatar() {
  return (
    <svg
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-40 drop-shadow-sm"
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

export default function FruitPickMatchPage() {
  const router = useRouter();
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);
  const start = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const DIST_THRESHOLD = 120;
  const VEL_THRESHOLD = 0.6;

  const schedule = () => router.push("/profile");
  const keepSwiping = () => router.push("/fruitpick/select");

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !start.current) return;
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
    if (!start.current) return RESET();
    const dt = Math.max(1, performance.now() - start.current.t);
    const vx = dx / dt;
    if (dx > DIST_THRESHOLD || vx > VEL_THRESHOLD) {
      animateOut("right", schedule);
      return;
    }
    if (dx < -DIST_THRESHOLD || vx < -VEL_THRESHOLD) {
      animateOut("left", keepSwiping);
      return;
    }
    RESET();
  };

  const RESET = () => {
    setDragging(false);
    setLeaving(null);
    setDx(0);
    setDy(0);
    if (cardRef.current) {
      const n = cardRef.current;
      n.style.transition = "transform 180ms ease";
      n.style.transform = "translate(0px, 0px)";
      n.style.opacity = "1";
      setTimeout(() => {
        if (n) n.style.transition = "none";
      }, 190);
    }
  };

  // toetsenbord fallback
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") animateOut("right", schedule);
      if (e.key === "ArrowLeft") animateOut("left", keepSwiping);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rotate = Math.max(-18, Math.min(18, dx * 0.08));
  const likeOpacity = Math.max(0, Math.min(1, (dx - 40) / 120));
  const nopeOpacity = Math.max(0, Math.min(1, (-dx - 40) / 120));

  return (
    <div className="min-h-screen bg-[var(--cream)] pt-8 pb-12 px-5">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-[var(--pear-green)]">
        You matched with
      </h1>
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[var(--pear-green)] mt-1">
        {MATCH.name}
      </h2>

      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-sm">
          {/* overlays */}
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

          {/* kaart */}
          <div
            ref={cardRef}
            className="bg-white rounded-3xl shadow-md p-6 select-none cursor-grab active:cursor-grabbing"
            style={{
              willChange: "transform",
              touchAction: "none",
              transform:
                leaving === null
                  ? `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`
                  : undefined,
              transition: dragging ? "none" : "transform 180ms ease",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="flex flex-col items-center">
              <Avatar />
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                {MATCH.interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#F7F0DD] text-[var(--ink)] text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-[var(--ink)]/85 text-sm leading-snug">
                {MATCH.blurb}
              </p>
            </div>
          </div>

          <p className="mt-3 text-center text-[var(--ink)]/60 text-sm">
            Swipe <span className="font-semibold">left</span> to keep searching •{" "}
            Swipe <span className="font-semibold">right</span> to schedule a chat
          </p>
        </div>
      </div>
    </div>
  );
}
