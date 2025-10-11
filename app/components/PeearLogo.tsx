import * as React from "react";

type Props = {
  className?: string;
};

/**
 * Verbeterd Peear-logo:
 *  - Peer-figuur duidelijker (licht asymmetrisch)
 *  - Netwerk behouden
 *  - Volgt tekstkleur (light: var(--leaf), dark: white)
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
      {/* Netwerkstructuur */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        <path d="M130 245 40 190 25 95 95 35 165 35 235 95 220 190 130 245Z" />
        <path d="M130 75v170" opacity={0.5} />
      </g>
      {/* Verbinding nodes */}
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

      {/* Peer-vorm in het midden */}
      <path
        fill="currentColor"
        d="
          M120 110
          c -10 -18 0 -32 10 -36
          c 8 -4 18 -1 22 6
          c 3 5 3 12 1 16
          c 25 6 35 28 30 52
          c -6 27 -30 44 -56 40
          c -27 -4 -45 -30 -39 -57
          c 4 -18 15 -31 32 -36
          Z
        "
      />

      {/* Steeltje en blad */}
      <path
        fill="currentColor"
        d="
          M152 68
          c 8 -12 20 -16 32 -13
          c -5 10 -14 17 -26 20
          c -4 1 -7 -3 -6 -7
          Z
        "
      />
    </svg>
  );
}
