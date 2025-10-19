import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  color?: string;        // hoofdkleur
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
  const stem = shade(color, -18);   // iets donkerder dan peer
  const edgesSoft = "0.55";         // transparantie diagonalen

  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg
        viewBox="0 0 220 220"
        width={width}
        height={height}
        role="img"
        aria-label="Peear logo"
      >
        {/* ===== NETWORK / HEXAGON ===== */}
        <g transform="translate(20,14)">
          <polygon
            points="90,0 180,52 180,150 90,202 0,150 0,52"
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* nodes */}
          {[ [90,0],[180,52],[180,150],[90,202],[0,150],[0,52] ].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="7" fill={node}/>
          ))}
          {/* zachte diagonalen en vertical */}
          <g stroke={stroke} strokeOpacity={edgesSoft} strokeWidth="4">
            <line x1="0" y1="52" x2="180" y2="150" />
            <line x1="180" y1="52" x2="0" y2="150" />
            <line x1="90" y1="0" x2="90" y2="202" />
          </g>
        </g>

        {/* ===== PEER (duidelijk vollere onderkant + slanke hals) ===== */}
        <g transform="translate(24,20)">
          {/* steel – apart van de peer */}
          <path
            d="M118 48c-6 8 -16 12 -26 12"
            stroke={stem}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* blad – los element */}
          <path
            d="M130 44c-14 -3 -26 2 -32 12c12 3 23 -2 32 -12z"
            fill={stem}
          />

          {/* peer-silhouet:
              - duidelijke bolling onder (rond 120/126)
              - smalle hals (rond 74–86)
              - topkopje net onder de steel
          */}
          <path
            d="
              M116,58
              C114,44 105,34 93,34
              C83,34 76,39 72,47
              C62,49 54,56 48,65
              C40,77 36,91 36,104
              C36,136 62,160 98,160
              C134,160 160,136 160,104
              C160,88 154,74 143,65
              C137,60 130,57 124,56
              C121,56 118,57 116,58
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
