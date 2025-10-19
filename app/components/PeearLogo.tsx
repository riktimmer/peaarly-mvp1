import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  color?: string;       // hoofdkleur (peertje + network)
  className?: string;
  showWordmark?: boolean; // indien true toont “Peear” onder het icoon
};

const PeearLogo: React.FC<PeearLogoProps> = ({
  width = 140,
  height = 140,
  color = "#106A37",
  className,
  showWordmark = false,
}) => {
  // lichtere/donkerdere varianten voor accenten
  const stroke = color;
  const nodeFill = color;
  const edge = color;
  const stem = shade(color, -12);

  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg
        viewBox="0 0 220 220"
        role="img"
        aria-label="Peear logo"
        width={width}
        height={height}
      >
        {/* NETWORK BACKGROUND */}
        <g transform="translate(20,18)">
          {/* Hexagon frame */}
          <polygon
            points="90,0 180,52 180,150 90,202 0,150 0,52"
            fill="none"
            stroke={edge}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Nodes */}
          {[
            [90, 0],
            [180, 52],
            [180, 150],
            [90, 202],
            [0, 150],
            [0, 52],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7.5" fill={nodeFill} />
          ))}
          {/* Cross connections (subtieler) */}
          <g stroke={edge} strokeOpacity="0.65" strokeWidth="4">
            <line x1="0" y1="52" x2="180" y2="150" />
            <line x1="0" y1="150" x2="180" y2="52" />
            <line x1="90" y1="0" x2="90" y2="202" />
          </g>
        </g>

        {/* PEAR SHAPE */}
        <g transform="translate(34,22)">
          {/* steel */}
          <path
            d="M106 43c-9 6-18 9-28 9"
            stroke={stem}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* blad */}
          <path
            d="M118 40c-12 -2 -22 2 -27 11 10 2 19 -2 27 -11z"
            fill={stem}
          />

          {/* peervorm (organisch silhouet) */}
          <path
            d="
              M108,58
              C108,42 97,30 84,30
              C70,30 61,39 58,49
              C40,52 26,68 26,88
              C26,118 50,144 84,144
              C118,144 142,118 142,88
              C142,74 135,62 123,56
              C116,53 111,55 108,58 Z
            "
            fill={color}
          />
        </g>

        {/* Optional wordmark */}
        {showWordmark && (
          <text
            x="110"
            y="212"
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

/**
 * Kleine helper om de kleur iets donkerder of lichter te maken
 */
function shade(hex: string, percent: number) {
  // verwacht #RRGGBB
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const to = (c: number) => Math.round((t - c) * p) + c;
  return (
    "#" +
    (0x1000000 + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1)
  );
}

export default PeearLogo;
