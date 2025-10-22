"use client";
import * as React from "react";

type Props = {
  width?: number;
  height?: number;
};

const PeearLogoV2: React.FC<Props> = ({ width = 140, height = 140 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* steel */}
      <rect x="95" y="30" width="8" height="30" fill="#3B5323" rx="4" />

      {/* blad */}
      <path
        d="M100 28 C125 10 155 30 140 50 C125 70 100 50 100 28 Z"
        fill="#2F8F4E"
      />

      {/* peer body */}
      <path
        d="M100 60
          C80 50 60 80 60 110
          C50 130 40 150 45 180
          C55 220 145 220 155 180
          C160 150 150 130 140 110
          C140 80 120 50 100 60 Z"
        fill="#2E7D32"
      />

      {/* glans */}
      <ellipse cx="85" cy="110" rx="18" ry="40" fill="white" opacity="0.1" />
    </svg>
  );
};

export default PeearLogoV2;
