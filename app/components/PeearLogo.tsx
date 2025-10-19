import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  color?: string;        // hoofdkleur voor peer + netwerk
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
  const stroke = color;
  const node = color;
  const soft = "0.55";                     // transparantie diagonalen
  const stem = shade(color, -18);          // iets donkerder voor steel/blad

  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg
        viewBox="0 0 220 220"
        width={width}
        height={height}
        role="img"
        aria-label="Peear logo"
      >
        {/* ===== NETWERK / HEXAGON ===== */}
        <g transform="translate(20,14)">
          <polygon
            points="90,0 180,52 180,150 90,202 0,150 0,52"
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {[ [90,0],[180,52],[180,150],[90,202],[0,150],[0,52] ].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="7" fill={node} />
          ))}
          <g stroke={stroke} strokeOpacity={soft} strokeWidth="4">
            <line x1="0" y1="52" x2="180" y2="150" />
            <line x1="180" y1="52" x2="0" y2="150" />
            <line x1="90" y1="0" x2="90" y2="202" />
          </g>
        </g>

        {/* ===== PEER – emoji-achtig ===== */}
        <g transform="translate(28,18)">
          {/* steel */}
          <path
            d="M112 50c-8 8 -18 12 -28 12"
            stroke={stem}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* blad (los element), rechtsboven, licht gekanteld */}
          <path
            d="M126 46c-18 -4 -31 2 -38 14c14 4 27 -2 38 -14z"
            fill={stem}
          />

          {/* peer-silhouet:
              - smalle hals (boven) die naar rechts helt
              - volle, asymmetrische buik (onder)
              - contour geïnspireerd op 🍐
          */}
          <path
            d="
              M120,64
              C118,50 110,40 98,38
              C90,36 84,39 79,44
              C75,36 66,32 57,33
              C45,35 36,44 34,55
              C33,60 34,66 37,71
              C21,83 12,101 12,120
              C12,154 40,178 78,178
              C116,178 144,154 144,120
              C144,98 133,80 115,72
              C122,70 124,67 120,64
              Z
            "
            fill={color}
          />
        </g>

        {/* optioneel woordmerk */}
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

function shade(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16, G = (f >> 8) & 255, B = f & 255;
  const to = (c: number) => Math.round((t - c) * p) + c;
  return "#" + (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1);
}

export default PeearLogo;
