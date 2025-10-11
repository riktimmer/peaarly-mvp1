import * as React from "react";

type Props = {
  className?: string;
};

/**
 * Peear-logo
 * - Netwerk (hex) met nodes
 * - Speels steeltje dat vanuit het top-node met peer verbindt
 * - Leaf
 * - Peer-vorm verfijnd (minder rond onderkant)
 * - Subtiele extra netwerklijntjes richting peer
 * - Alles in `currentColor` (dark-mode = wit)
 */
export default function PeearLogo({ className = "h-40 w-40" }: Props) {
  return (
    <svg
      viewBox="0 0 260 260"
      role="img"
      aria-label="Peear logo"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === 1) NETWERK STRUCTUUR (hex) === */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        {/* buitenframe */}
        <path d="M130 245 40 190 25 95 95 35 165 35 235 95 220 190 130 245Z" />
        {/* middenkolom licht */}
        <path d="M130 78v164" opacity={0.45} />
      </g>

      {/* === 2) NODES === */}
      {[
        [130, 245],
        [40, 190],
        [25, 95],
        [95, 35],
        [165, 35],
        [235, 95],
        [220, 190],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={10} fill="currentColor" />
      ))}

      {/* === 3) SUBTIELE EXTRA NETWERKLIJNTJES naar de peer (dunner/lichter) === */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.45}
      >
        {/* linksboven node -> linkerschouder peer */}
        <path d="M95 35 C 100 55, 105 70, 118 86" />
        {/* rechtsboven node -> rechterschouder peer */}
        <path d="M165 35 C 160 55, 155 70, 142 86" />
        {/* linker zij-node -> onder buik peer */}
        <path d="M40 190 C 70 182, 90 175, 112 172" />
        {/* rechter zij-node -> onder buik peer */}
        <path d="M220 190 C 190 182, 170 175, 148 172" />
      </g>

      {/* === 4) STEEL als speelse verbinding vanuit top-node (gebogen) === */}
      <path
        d="
          M165 35
          C 155 40, 146 48, 140 59
          C 136 66, 134 74, 133 84
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
        opacity={0.95}
      />

      {/* === 5) LEAF (aan steel) === */}
      <path
        d="
          M151 56
          c 14 -10 28 -12 39 -9
          c -6 12 -18 20 -32 22
          c -4 1 -8 -5 -7 -13
          Z
        "
        fill="currentColor"
      />

      {/* === 6) PEER — verbeterde vorm (minder 'rondje', meer peer) === */}
      {/* contour: iets smallere hals, zachtere buik, eleganter uiteinde */}
      <path
        fill="currentColor"
        d="
          M120 96
          c -7 -15 4 -30 16 -34
          c 10 -3 21 1 26 10
          c 3 5 3 11 2 16
          c 18 6 30 21 33 39
          c 4 24 -10 47 -33 56
          c -23 9 -50 -1 -61 -22
          c -11 -21 -6 -46 12 -60
          c 3 -2 5 -3 5 -5
          Z
        "
      />
    </svg>
  );
}
