// app/components/PeearLogo.tsx
import * as React from "react";

type Props = {
  className?: string;
};

/**
 * Inline SVG logo van Peear
 * - gebruikt `currentColor`, dus volgt tekstkleur (light: var(--leaf), dark: white)
 */
export default function PeearLogo({ className = "h-40 w-40" }: Props) {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      aria-label="Peear logo"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        <path d="M128 230 38 188 24 98 96 38 160 38 232 98 218 188 128 230" />
        <path d="M128 72v158" opacity={0.5} />
      </g>
      {[
        [128, 230],
        [38, 188],
        [24, 98],
        [96, 38],
        [160, 38],
        [232, 98],
        [218, 188],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={11} fill="currentColor" />
      ))}
      <path
        fill="currentColor"
        d="
          M128 84
          c -18 -22 -2 -38 10 -41
          c 10 -2 19 2 22 9
          c 3 6 2 13 -1 18
          c 20 8 33 28 33 50
          c 0 31 -25 56 -56 56
          s -56 -25 -56 -56
          c 0 -24 16 -45 38 -52
          c 4 -1 7 -2 10 -4
        "
      />
      <path
        d="
          M154 45
          c 10 -10 22 -14 35 -12
          c -4 12 -14 21 -28 26
          c -6 2 -10 -4 -7 -14
        "
        fill="currentColor"
      />
    </svg>
  );
}
