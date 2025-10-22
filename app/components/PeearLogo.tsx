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
      <svg viewBox="0 0 220 220" width={width} height={height} role="img" aria-label="Peear logo">
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

        {/* PEER – emoji-achtige vorm (smalle hals + volle buik) */}
        <g transform="translate(30,18)">
          {/* steel (los) */}
          <path
            d="M112 50c-9 10-22 15-34 15"
            stroke={stem}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* blad (los, lichte draai) */}
          <path d="M130 46c-19 -5 -33 2 -41 15c16 4 30 -3 41 -15z" fill={stem} />

          {/* peer body */}
          <path
            d="
              M132,74
              C130,58 118,46 102,46
              C92,46 86,49 82,54    /* smalle hals */
              C74,56 66,61 60,69
              C50,82 46,98 46,114   /* linkerkant bolling */
              C46,152 76,176 110,176
              C144,176 174,152 174,114
              C174,95 166,81 154,71  /* rechter schouder */
              C146,64 138,61 130,62
              C132,66 133,70 132,74  /* top-lobje */
              Z
            "
            fill={color}
          />
        </g>

        {showWordmark && (
          <text
            x="110" y="214" textAnchor="middle"
            fontFamily="'Poppins', ui-sans-serif, system-ui"
            fontWeight="700" fontSize="28" fill={color}
          >
            Peear
          </text>
        )}
      </svg>
    </div>
  );
};

// kleine helper om de kleur iets donkerder te maken
function shade(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16, G = (f >> 8) & 255, B = f & 255;
  const to = (c: number) => Math.round((t - c) * p) + c;
  return "#" + (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1);
}

export default PeearLogo;
