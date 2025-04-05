import React from 'react';

const BabblySvg = (props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-32 h-12 ${props.className || ''}`}
    {...props}
  >
    <defs>
      {/* Text gradient that works well with dark blue backgrounds */}
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5CFFFA" />
        <stop offset="100%" stopColor="#38C0FF" />
      </linearGradient>
    </defs>
    
    {/* Main text with gradient and FF Avance font family */}
    <text
      x="100"
      y="38"
      fontFamily="'FF Avance', sans-serif"
      fontSize="36"
      fontWeight="bold"
      textAnchor="middle"
      fill="url(#textGradient)"
    >
      BABBLY
    </text>
  </svg>
);

export default BabblySvg;