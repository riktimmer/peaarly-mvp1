"use client";
import * as React from "react";

/** Steady Pear – minimal logo met optionele pulse-animatie en network-dots */
type Props = {
  width?: number;
  height?: number;
  /** Basiskleur (donkergroen) */
  color?: string;
  /** Lichtere accentkleur voor gradient/highlight (optioneel) */
  accent?: string;
  /** Laat het logo zacht ‘ademen’ (98%↔102%) */
  pulse?: boolean;
  /** Toon speelse network-dots/lines ín de peer (uit = clean) */
  showNetwork?: boolean;
  className?: string;
  /** aria-label override */
  label?: string;
};

const PeearLogo: React.FC<Props> = ({
  width = 148,
  height = 148,
  color = "#106A37",
  accent = "#7FDB9A",
  pulse = true,
  showNetwork = false,
  className,
  label = "Peear logo",
}) => {
  // iets donkerder voor steel/blad
  const darker = darken(color, 18);

  return (
    <div
      className={className}
      style={{ width, height, lineHeight: 0, display: "inline-block" }}
      aria-label={label}
      role="img"
    >
      <svg
        viewBox="0 0 240 260"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* zachte diepte + highlight */}
          <radialGradient id="pearGlow" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>

          {/* zachte ambient glow onder de peer */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dy="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0.22
                      0 0 0 0 0.14
                      0 0 0 0.35 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ClipPath zodat network-lijntjes binnen de peer vallen */}
          <clipPath id="pearClip">
            <path d={PEAR_PATH} />
          </clipPath>
        </defs>

        {/* container om te schalen voor de ‘pulse’ */}
        <g filter="url(#softShadow)" className={pulse ? "pear-pulse" : ""}>
          {/* steel */}
          <path
            d="M150 62c-10 12-26 18-42 18"
            stroke={darker}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* blad */}
          <path
            d="M170 60c-26 -6 -45 3 -55 22c20 6 38 -3 55 -22z"
            fill={darker}
          />

          {/* body (solide) */}
          <path d={PEAR_PATH} fill={color} stroke={color} strokeWidth="8" />

          {/* highlight */}
          <ellipse cx="98" cy="132" rx="56" ry="74" fill="url(#pearGlow)" />

          {/* optioneel: network-lijntjes + nodes ín de peer */}
          {showNetwork && (
            <g clipPath="url(#pearClip)">
              <g transform="translate(36,102) rotate(-10 84 56)">
                {H_LINES.map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="0"
                    y1={y}
                    x2="168"
                    y2={y}
                    stroke={darker}
                    strokeOpacity="0.45"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                ))}
                {V_LINES.map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="112"
                    stroke={darker}
                    strokeOpacity="0.45"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                ))}
              </g>
              <g
                stroke={darker}
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              >
                <line x1="88" y1="134" x2="122" y2="102" />
                <line x1="122" y1="102" x2="152" y2="118" />
                <line x1="152" y1="118" x2="132" y2="166" />
                <line x1="88" y1="134" x2="72" y2="182" />
                <line x1="72" y1="182" x2="112" y2="202" />
                <line x1="112" y1="202" x2="132" y2="166" />
              </g>
              {[{ x: 122, y: 102 }, { x: 152, y: 118 }, { x: 132, y: 166 },
                { x: 88, y: 134 }, { x: 72, y: 182 }, { x: 112, y: 202 }].map(
                (n, i) => (
                  <circle key={i} cx={n.x} cy={n.y} r="5.6" fill={darker} />
                )
              )}
            </g>
          )}
        </g>

        {/* inline CSS voor pulse-animatie */}
        <style>{`
          .pear-pulse {
            transform-origin: 120px 140px; /* centrum peer */
            animation: peear-breathe 3s ease-in-out infinite;
          }
          @keyframes peear-breathe {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default PeearLogo;

/* ===== Helpers & Shape data ===== */

// organische peer (smalle hals + volle buik), afgeleid van jouw referentie
const PEAR_PATH =
  `
    M152,74
    C150,56 136,44 120,44
    C110,44 102,48 96,56
    C89,46 74,44 62,50
    C48,56 40,70 41,84
    C42,92 45,100 50,108
    C30,122 20,144 20,168
    C20,210 58,236 110,236
    C162,236 200,210 200,168
    C200,140 186,118 166,110
    C172,100 170,84 152,74
    Z
  `;

const H_LINES = [0, 28, 56, 84, 112];
const V_LINES = [0, 42, 84, 126, 168];

function darken(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const p = percent / 100;
  const R = (f >> 16) & 255,
    G = (f >> 8) & 255,
    B = f & 255;
  const to = (c: number) => Math.max(0, Math.min(255, Math.round(c * (1 - p))));
  return (
    "#" + ((1 << 24) + (to(R) << 16) + (to(G) << 8) + to(B)).toString(16).slice(1)
  );
}
