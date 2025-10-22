import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  color?: string;      // hoofdkleur van de peer
  className?: string;
  showWordmark?: boolean;
};

const PeearLogo: React.FC<PeearLogoProps> = ({
  width = 140,
  height = 140,
  color = "#106A37", // Peear donkergroen
  className,
  showWordmark = false,
}) => {
  const stem = shade(color, -20);   // iets donkerder voor steel/blad
  const light = shade(color, +38);  // subtiele highlight-tint

  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg viewBox="0 0 240 260" width={width} height={height} role="img" aria-label="Peear logo">
        <defs>
          {/* zachte highlight */}
          <radialGradient id="gloss" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor={light} stopOpacity="0.9" />
            <stop offset="60%" stopColor={light} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* STEEL */}
        <path
          d="M144 40c-10 12-26 18-42 18"
          stroke={stem}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* BLAD */}
        <path
          d="M168 38c-26 -6 -45 3 -55 22c20 6 38 -3 55 -22z"
          fill={stem}
        />

        {/* PEER — solide vorm */}
        <path
          d="
            M150,64
            C148,50 136,40 120,40
            C110,40 102,44 96,52
            C90,44 76,42 64,48
            C50,54 42,68 43,82
            C44,90 47,98 52,105
            C32,120 22,142 22,166
            C22,206 58,232 110,232
            C162,232 198,206 198,166
            C198,138 184,116 164,108
            C170,100 170,82 150,64
            Z
          "
          fill={color}
          stroke={color}
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* HIGHLIGHT (subtiel, geeft body) */}
        <ellipse cx="97" cy="126" rx="52" ry="70" fill="url(#gloss)" />

        {showWordmark && (
          <text
            x="120" y="252" textAnchor="middle"
            fontFamily="'Poppins', ui-sans-serif, system-ui"
            fontWeight="800" fontSize="28"
            fill={color}
          >
            Peear
          </text>
        )}
      </svg>
    </div>
  );
};

/** kleine helper om kleur lichter/donkerder te maken */
function shade(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16, G = (f >> 8) & 255, B = f & 255;
  const to = (c: number) => Math.round((t - c) * p) + c;
  return "#" + (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1);
}

export default PeearLogo;
