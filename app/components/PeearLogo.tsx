import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  color?: string;        // hoofdkleur peer + netwerk
  className?: string;
  showWordmark?: boolean;
};

const PeearLogo: React.FC<PeearLogoProps> = ({
  width = 140,
  height = 140,
  color = "#106A37",
  className,
  showWordmark = false,
}) => {
  const soft = 0.55;                 // transparantie diagonalen
  const stem = shade(color, -18);    // iets donkerder voor steel/blad

  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg
        viewBox="0 0 220 220"
        width={width}
        height={height}
        role="img"
        aria-label="Peear logo"
      >
        {/* NETWERK / HEXAGON */}
        <g transform="translate(20,14)">
          <polygon
            points="90,0 180,52 180,150 90,202 0,150 0,52"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {[ [90,0],[180,52],[180,150],[90,202],[0,150],[0,52] ].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="7" fill={color} />
          ))}
          <g stroke={color} strokeOpacity={soft} strokeWidth="4" fill="none">
            <line x1="0" y1="52" x2="180" y2="150" />
            <line x1="180" y1="52" x2="0" y2="150" />
            <line x1="90" y1="0" x2="90" y2="202" />
          </g>
        </g>

        {/* PEER – emoji-achtig (🍐) */}
        <g transform="translate(34,20)">
          {/* steel */}
          <path
            d="M114 48c-8 10 -20 14 -32 14"
            stroke={stem}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* blad (los) */}
          <path d="M131 46c-18 -4 -32 2 -39 14c15 4 28 -2 39 -14z" fill={stem} />
          {/* peer body: slanke hals (rechtshellend), volle buik beneden */}
          <path
            d="
              M122,64
              C120,51 111,41 99,39
              C91,38 84,41 80,46
              C76,37 66,33 56,34
              C43,36 34,47 33,59
              C32,65 33,70 36,76
              C19,89 10,107 10,126
              C10,162 40,186 80,186
              C120,186 150,162 150,126
              C150,102 138,82 118,74
              C124,71 126,68 122,64 Z
            "
            fill={color}
          />
        </g>

        {showWordmark && (
          <text
            x="110"
            y="214"
            textAnchor="middle"
            fontFamily="'Poppins', ui-sans-serif, system-ui"
            fontWeight="700"
            fontSize="28"
            fill={color}
          >
            Peear
          </text>
        )}
      </svg>
    </div>
  );
};

// kleine helper om een tint donkerder te maken
function shade(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16, G = (f >> 8) & 255, B = f & 255;
  const to = (c: number) => Math.round((t - c) * p) + c;
  return "#" + (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1);
}

export default PeearLogo;
