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
  blurb:
    "Interested in exploring best practices for customer retention.",
};

// Simpele avatar (SVG gezicht)
function Avatar() {
  return (
    <svg viewBox="0 0 120 120" className="w-40 h-40">
      <circle cx="60" cy="60" r="56" fill="#F7E9C6" />
      <circle cx="60" cy="68" r="28" fill="#174A2F" />
      <circle cx="60" cy="48" r="22" fill="#F1C48D" />
      <rect x="44" y="70" width="32" height="8" rx="4" fill="#F1C48D" />
      <circle cx="49" cy="50" r="3.2" fill="#1E1E1E" />
      <circle cx="71" cy="50" r="3.2" fill="#1E1E1E" />
      <path d="M51 41c6-8 22-8 28 0" stroke="#1E1E1E" strokeWidth="4" />
      <path d="M46 60c7 6 21 6 28 0" stroke="#1E1E1E" strokeWidth="3" />
      <path
        d="M34 62c2-12 11-21 26-21s24 9 26 21"
        stroke="#174A2F"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FruitPickMatchPage() {
  const router = useRouter();

  // Drag state
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [leaving, setLeaving] = React.useState<null | "left" | "right">(null);

  // Waar we begonnen + tijdstip (voor velocity)
  const start = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // thresholds
  const DIST_THRESHOLD = 120; // px
  const VEL_THRESHOLD = 0.6;  // px/ms

  const schedule = () => router.push("/profile");
  const keepSwiping = () => router.push("/fruitpick/select");

  const onPointerDown = (e: React.PointerEvent) => {
    // voorkom tekstselectie/scroll tijdens drag
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !start.current) return;
    // horizontaal swipen prioriteren → kleine verticale beweging negeren
    const ndx = e.clientX - start.current.x;
    const ndy = e.clientY - start.current.y;
    setDx(ndx);
    setDy(ndy * 0.25); // demp verticale beweging
  };

  const animateOut = (dir: "left" | "right", onDone: () => void) => {
    setLeaving(dir);
    // laat de kaart “uit beeld” glijden
    const node = cardRef.current;
    if (!node) {
      onDone();
      return;
    }
    const sign = dir === "right" ? 1 : -1;
    node.style.transition = "transform 220ms ease-out, opacity 220ms ease-out";
    node.style.transform = `translate(${sign * 1000}px, ${dy}px) rotate(${sign * 22}deg)`;
    node.style.opacity = "0";

    window.setTimeout(onDone, 230);
  };

  const onPointerUp = () => {
    if (!start.current) return RESET();

    const dt = Math.max(1, performance.now() - start.current.t); // ms
    const vx = dx / dt; // px/ms

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
    // reset eventuele inline styles na animatie
    if (cardRef.current) {
      const n = cardRef.current;
      n.style.transition = "transform 180ms ease";
      n.style.transform = "translate(0px, 0px)";
      n.style.opacity = "1";
      // na de korte reset-transition terug naar none
      setTimeout(() => {
        if (n) n.style.transition = "none";
      }, 190);
    }
  };

  // Keyboard fallback
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        animateOut("right", schedule);
      } else if (e.key === "ArrowLeft") {
        animateOut("left", keepSwiping);
      }
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

      {/* Swipe card */}
      <div className="mt-6 flex justify-center">
        <div
          className="relative w-full max-w-sm"
          // de container hoeft geen handlers; we zetten ze op de kaart zelf
        >
          {/* Overlays */}
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

          {/* Kaart */}
          <div
            ref={cardRef}
            className="bg-white rounded-3xl shadow-md p-6 select-none cursor-grab active:cursor-grabbing"
            style={{
              willChange: "transform",
              touchAction: "none", // belangrijk voor mobiel swipen!
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
