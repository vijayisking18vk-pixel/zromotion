import React from 'react';

/**
 * Marina Beach Hand-Drawn SVG Divider
 * Exactly matching the design screenshot:
 * - Red & black Lighthouse on the left
 * - Rolling blue Marina sea wave line
 * - Traditional Tamil catamaran fishing boat in the center
 * - Yellow beach diamond kite on the right
 * - Warm sandy shore curve at the bottom
 */
export default function MarinaDivider({ className = '' }) {
  return (
    <div
      className={`marina-beach-divider ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        backgroundColor: 'var(--c-hero-sky)'
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          maxHeight: '75px'
        }}
        preserveAspectRatio="none"
      >
        {/* Sandy Shore Base */}
        <path
          d="M0 64 C 220 60, 480 72, 720 65 C 940 58, 1080 66, 1200 64 L 1200 80 L 0 80 Z"
          fill="#EFE4C8"
        />

        {/* Gentle Marina Sea Waves */}
        <path
          d="M0 52 C 180 44, 380 58, 620 48 C 840 38, 1040 54, 1200 46"
          stroke="#1F6FA8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Chennai Lighthouse Silhouette (Left Side) */}
        <g transform="translate(85, 20)">
          {/* Base & Column */}
          <path d="M4 34 L7 10 L15 10 L18 34 Z" fill="#B23A2E" />
          <rect x="6" y="16" width="10" height="5" fill="#FDFBF7" />
          {/* Lantern Room */}
          <rect x="6.5" y="5" width="9" height="5" fill="#1E1B18" rx="0.5" />
          <circle cx="11" cy="7.5" r="1.5" fill="#F5B800" />
          {/* Dome Top */}
          <polygon points="5,5 17,5 11,1" fill="#B23A2E" />
        </g>

        {/* Catamaran Fishing Boat (Center) */}
        <g transform="translate(630, 42)">
          {/* Boat Hull */}
          <path d="M0 10 Q 14 15 28 10 Q 30 7 32 10 Q 16 17 0 10 Z" fill="#2B2118" />
          {/* Red Sail */}
          <polygon points="14,9 14,1 24,9" fill="#B23A2E" />
          <line x1="14" y1="10" x2="14" y2="1" stroke="#2B2118" strokeWidth="1" />
        </g>

        {/* Beach Kite (Right Side) */}
        <g transform="translate(1020, 24)">
          {/* Yellow Diamond */}
          <polygon points="8,0 16,8 8,16 0,8" fill="#F5B800" />
          {/* Orange Tail */}
          <path d="M8 16 Q 12 22 7 28 Q 11 34 8 40" stroke="#DE9F00" strokeWidth="1.2" fill="none" />
        </g>
      </svg>
    </div>
  );
}
