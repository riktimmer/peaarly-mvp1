import * as React from "react";

type Props = {
  className?: string;
};

/**
 * Peear-logo (speelser, asymmetrische verbindingen)
 * - Opening boven links (geen lijn tussen L-top en R-top)
 * - Subtiele, niet-symmetrische netwerklijnen naar peer
 * - Leaf links; geen steel
 * - Alles in currentColor (werkt met dark mode)
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
      {/* === NODE POSITIES (ter referentie) ===
          L-top:  (95,35)
          R-top:  (165,35)
          R-mid:  (235,95)
          R-low:  (220,190)
          Bot:    (130,245)
          L-low:  (40,190)
          L-mid:  (25,95)
      */}

      {/* === 1) NETWERK — dikke randen (met opening linksboven) === */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        {/* L-mid -> L-top */}
        <path d="M25 95 L95 35" />
        {/* OPEN: GEEN lijn L-top -> R-top */}
        {/* R-top -> R-mid */}
        <path d="M165 35 L235 95" />
        {/* rest */}
        <path d="M235 95 L220 190 L130 245 L40 190 L25 95" />
        {/* lichte middenas */}
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

      {/* === 3) SPEELSE, ASYMMETRISCHE VERBINDINGEN (subtiel) === */}
      <g fill="none" strokeLinecap="round">
        {/* L-top -> linker bovenflank peer (gebogen, dun) */}
        <path
          d="M95 35 C 105 58, 112 76, 120 94"
          stroke="currentColor"
          strokeWidth={4}
          opacity={0.45}
        />
        {/* R-mid -> rechterflank peer (andere kromming, iets dikker) */}
        <path
          d="M235 95 C 208 98, 178 110, 154 125"
          stroke="currentColor"
          strokeWidth={5}
          opacity={0.40}
        />
        {/* L-low -> onderbuik peer (stippellijn, speels) */}
        <path
          d="M40 190 C 78 182, 98 176, 113 170"
          stroke="currentColor"
          strokeWidth={3.5}
          strokeDasharray="6 7"
          opacity={0.42}
        />
        {/* GEEN lijn vanaf R-top — vermijdt symmetrie aan de bovenkant */}
        {/* Optioneel: kleine kortere link van R-low naar rechts-onder van peer (heel subtiel) */}
        <path
          d="M220 190 C 192 182, 170 176, 150 171"
          stroke="currentColor"
          strokeWidth={3}
          opacity={0.28}
        />
      </g>

      {/* === 4) PEER — iets naar links/beneden getranslate, leaf links, geen steel === */}
      <g transform="translate(-10, 10)">
        {/* Peer-vorm (minder ronde onderkant) */}
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
        {/* Leaf links */}
        <path
          fill="currentColor"
          d="
            M114 78
            c -15 -8 -28 -9 -39 -4
            c 6 12 18 20 32 22
            c 4 1 8 -4 7 -10
            Z
          "
        />
      </g>
    </svg>
  );
}
