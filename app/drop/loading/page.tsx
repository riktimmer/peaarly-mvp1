"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, PearIcon, OrangeIcon, StrawberryIcon } from "../../components/ui";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/drop/match"), 1800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen pulp text-[color:var(--leaf)]">
      <div className="max-w-md mx-auto px-5 py-6">
        <Card className="grid place-items-center">
          <div className="h-48 relative w-full overflow-hidden">
            <Falling kind="orange" delay={0} left="30%" />
            <Falling kind="straw"  delay={150} left="60%" />
            <Falling kind="pear"   delay={300} left="45%" />
          </div>
          <h2 className="text-2xl font-extrabold mt-2">Switch to Fruit Pick</h2>
          <p className="text-center text-muted mt-1">
            We are picking your match based on your interests…
          </p>
          <p className="text-xs text-muted mt-3 italic">Hang on tight, your peer is on the way!</p>
        </Card>
      </div>
    </main>
  );
}

function Falling({
  kind,
  delay = 0,
  left = "50%",
}: {
  kind: "pear" | "orange" | "straw";
  delay?: number;
  left?: string;
}) {
  const Icon = kind === "pear" ? PearIcon : kind === "orange" ? OrangeIcon : StrawberryIcon;
  return (
    <div className="absolute -top-10 animate-fall" style={{ animationDelay: `${delay}ms`, left }} aria-hidden>
      <Icon size={56} />
      <div className="mx-auto h-10 w-[2px] bg-[#E5EEDC] opacity-70 -mt-2" />
    </div>
  );
}
