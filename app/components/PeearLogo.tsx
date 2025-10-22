"use client";
import * as React from "react";

type Props = {
  width?: number;
  height?: number;
  /** Basiskleur peer (donkergroen) */
  color?: string;
  /** Bladkleur (iets lichter) */
  leafColor?: string;
  className?: string;
  label?: string;
};

const PeearLogo: React.FC<Props> = ({
  width = 148,
  height = 148,
  color = "#106A37",
  leafColor = "#2F8F4E",
  className,
  label = "Peear logo",
}) => {
  return (
    <div className={className} style={{ width, height, lineHeight: 0 }} role="img" aria-label={label}>
      <svg viewBox="0 0 240 260" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        {/* steel */}
        <path d="M150 62c-10 12-26 18-42 18" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* blad (simpel) */}
        <path d="M170 60c-26 -6 -45 3 -55 22c20 6 38 -3 55 -22z" fill={leafColor} />

        {/* peer: flat, emoji-achtig (smalle hals + volle buik) */}
        <path
          d="
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
          "
          fill={color}
        />
      </svg>
    </div>
  );
};

export default PeearLogo;
