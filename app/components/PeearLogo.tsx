import * as React from "react";

type Props = {
  className?: string;
};

/**
 * Peear-logo (versie met opening bovenin links)
 * - Bovenste horizontale rand is open (geen lijn tussen (95,35) en (165,35))
 * - Peer iets naar links/beneden verschoven zodat hij netjes “temidden” valt
 * - Leaf aan de linkerkant
 * - Geen steel
 * - Subtiele, dunne netwerklijntjes naar peer
 * - Alles gebruikt currentColor (werkt automatisch in dark mode)
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
      {/* === NODE COORDS (vaste posities) === */}
      {/*  (x,y):
          L-top:  (95,35)
          R-top:  (165,35)
          R-mid:  (235,95)
          R-low:  (220,190)
          Bot:    (130,245)
          L-low:  (40,190)
          L-mid:  (25,95)
      */}

      {/* === 1) NETWERK — randen (met opening aan de bovenkant links) === */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      >
        {/* van L-mid naar L-top */}
        <path d="M25 95 L95 35" />
        {/* OPENING tussen L-top (95,35) en R-top (165,35) → GEEN lijn hier */}
        {/* van R-top naar R-mid */}
        <path d="M165 35 L235 95" />
        {/* rest van de hex */}
        <path d="M235 95 L220 190 L130 245 L40 190 L25 95" />
        {/* lichte verticale middenlijn voor structuur */}
        <path d="M130 78v164" opacity={0.45} />
      </g>

      {/* === 2) NODES === */}
      {[
        [130, 245], // bottom
        [40, 190],  // left-low
        [25, 95],   // left-mid
        [95, 35],   // left-top
        [165, 35],  // right-top
        [235, 95],  // right-mid
        [220, 190], // right-low
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={10} fill="currentColor" />
      ))}

      {/* === 3) SUBTIELE EXTRA NETWERKLIJNTJES NAAR DE PEER (dunner/lichter) === */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.45}
      >
        {/* linksboven node -> linkerschouder peer */}
        <path d="M95 35 C 102 56, 110 74, 118 94" />
        {/* rechtsboven node -> rechterschouder peer */}
        <path d="M165 35 C 158 56, 150 74, 142 94" />
        {/* linker zij-node -> onder buik peer */}
        <path d="M40 190 C 70 182, 90 176, 112 170" />
        {/* rechter zij-node -> onder buik peer */}
        <path d="M220 190 C 190 182, 170 176, 148 170" />
      </g>

      {/* === 4) PEER — iets naar links/beneden geplaatst via translate === */}
      <g transform="translate(-10, 10)">
        {/* Peer-vorm (gepolijst; minder rond onderzijde) */}
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

        {/* Leaf — links i.p.v. rechts */}
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
