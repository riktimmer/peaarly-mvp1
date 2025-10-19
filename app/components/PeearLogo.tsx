import * as React from "react";

export type PeearLogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

const PeearLogo: React.FC<PeearLogoProps> = ({
  width = 120,
  height = 120,
  className,
}) => {
  return (
    <div className={className} style={{ width, height, lineHeight: 0 }}>
      <svg
        viewBox="0 0 180 180"
        role="img"
        aria-label="Peear logo"
        width={width}
        height={height}
      >
        {/* Hexagon-achtige achtergrond */}
        <g
          transform="translate(35,15)"
          stroke="#106A37"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="55,0 110,32 110,95 55,127 0,95 0,32" />
          <circle cx="55" cy="0" r="4" fill="#106A37" />
          <circle cx="110" cy="32" r="4" fill="#106A37" />
          <circle cx="110" cy="95" r="4" fill="#106A37" />
          <circle cx="55" cy="127" r="4" fill="#106A37" />
          <circle cx="0" cy="95" r="4" fill="#106A37" />
          <circle cx="0" cy="32" r="4" fill="#106A37" />
        </g>

        {/* Peertje in het midden */}
        <g transform="translate(45,35)">
          <path
            d="M48 18c6 0 11-5 11-11 0-3-1-5-2-7 5 1 9 6 9 12 0 4-1 7-3 9 11 9 18 24 18 38 0 23-18 41-41 41S0 82 0 59c0-17 10-33 26-40 5-2 10-2 15-2h7z"
            fill="#106A37"
          />
          <path
            d="M80 7c-6 3-12 5-18 5"
            stroke="#0C4F28"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default PeearLogo;
