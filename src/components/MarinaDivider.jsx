import React from 'react';

/**
 * Marina Beach SVG Divider — upgraded
 * - viewBox 1200×120, rich scene
 * - CSS @keyframe animations: wave-float, bob (catamaran), sway (kite)
 * - Jasmine flower garland along the sandy shore
 * - Detailed red-and-white lighthouse (left)
 * - Catamaran boat with red sail (center)
 * - Diamond kite with tail (right)
 * - variant='default' → 120px tall | variant='compact' → 80px tall
 * - prefers-reduced-motion: disables all animations
 */

const STYLES = `
  @keyframes wave-float {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }
  @keyframes bob {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes sway {
    0%   { transform: rotate(-8deg); }
    50%  { transform: rotate(8deg); }
    100% { transform: rotate(-8deg); }
  }
  .marina-wave-group {
    animation: wave-float 5s ease-in-out infinite;
    transform-origin: center bottom;
  }
  .marina-boat {
    animation: bob 3s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center bottom;
  }
  .marina-kite {
    animation: sway 4s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: 8px 0px;
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
  }
`;

export default function MarinaDivider({ variant = 'default', className = '' }) {
  const height = variant === 'compact' ? 80 : 120;

  return (
    <div
      className={`marina-beach-divider ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        backgroundColor: 'transparent',
      }}
      aria-hidden="true"
    >
      <style>{STYLES}</style>
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'block',
        }}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Sea gradient */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F6FA8" />
            <stop offset="100%" stopColor="#5A9EC7" />
          </linearGradient>
          {/* Sky gradient behind everything */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D6EAF8" />
            <stop offset="100%" stopColor="#EAF4FB" />
          </linearGradient>
        </defs>

        {/* Sky background */}
        <rect x="0" y="0" width="1200" height="120" fill="url(#skyGrad)" />

        {/* ── Animated Wave Group ── */}
        <g className="marina-wave-group">
          {/* Deep sea fill */}
          <path
            d="M0 72 C150 60, 320 80, 500 68 C680 56, 860 76, 1050 65 C1130 60, 1170 68, 1200 66 L1200 120 L0 120 Z"
            fill="url(#seaGrad)"
          />
          {/* Wave crest line 1 */}
          <path
            d="M0 72 C150 60, 320 80, 500 68 C680 56, 860 76, 1050 65 C1130 60, 1170 68, 1200 66"
            stroke="#FDFBF7"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          {/* Wave crest line 2 — offset */}
          <path
            d="M0 80 C200 70, 400 86, 600 76 C800 66, 1000 82, 1200 74"
            stroke="#FDFBF7"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.35"
          />
          {/* Foam dots */}
          {[80, 260, 450, 640, 820, 1010, 1150].map((x) => (
            <circle key={x} cx={x} cy={72} r="3" fill="#FDFBF7" opacity="0.45" />
          ))}
        </g>

        {/* ── Sandy Shore ── */}
        <path
          d="M0 96 C220 90, 480 102, 720 95 C940 88, 1080 98, 1200 95 L1200 120 L0 120 Z"
          fill="#EFE4C8"
        />
        {/* Shore wave line */}
        <path
          d="M0 96 C220 90, 480 102, 720 95 C940 88, 1080 98, 1200 95"
          stroke="#D4C4A0"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />

        {/* ── Jasmine Garland along shore ── */}
        {/* Wavy string */}
        <path
          d="M0 103 C60 100, 120 106, 180 103 C240 100, 300 106, 360 103 C420 100, 480 106, 540 103 C600 100, 660 106, 720 103 C780 100, 840 106, 900 103 C960 100, 1020 106, 1080 103 C1140 100, 1180 104, 1200 102"
          stroke="#C8A87A"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Jasmine flowers — alternating white and yellow circles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 30 + i * 60;
          const y = i % 2 === 0 ? 103 : 103 + (i % 3 === 0 ? -2 : 2);
          const color = i % 3 === 0 ? '#F5B800' : '#FDFBF7';
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4.5" fill={color} stroke="#C8A87A" strokeWidth="1" />
              <circle cx={x} cy={y} r="1.5" fill="#F5B800" opacity="0.9" />
            </g>
          );
        })}

        {/* ── Lighthouse (Left) — detailed ── */}
        <g transform="translate(105, 12)">
          {/* Base plinth */}
          <rect x="0" y="78" width="30" height="8" rx="1" fill="#EFE4C8" stroke="#1E1B18" strokeWidth="1.5" />
          {/* Tower body — tapered */}
          <path d="M5 78 L8 28 L22 28 L25 78 Z" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="1.8" />
          {/* Red band 1 */}
          <path d="M6 55 L7.5 44 L22.5 44 L24 55 Z" fill="#B23A2E" />
          {/* Red band 2 */}
          <path d="M8 78 L8.5 68 L21.5 68 L22 78 Z" fill="#B23A2E" />
          {/* Balcony railing */}
          <rect x="7" y="27" width="16" height="3" rx="0.5" fill="#4A433B" />
          <line x1="10" y1="27" x2="10" y2="30" stroke="#4A433B" strokeWidth="1.2" />
          <line x1="15" y1="27" x2="15" y2="30" stroke="#4A433B" strokeWidth="1.2" />
          <line x1="20" y1="27" x2="20" y2="30" stroke="#4A433B" strokeWidth="1.2" />
          {/* Lantern room */}
          <rect x="8" y="16" width="14" height="12" rx="1" fill="#1E1B18" stroke="#4A433B" strokeWidth="1.5" />
          {/* Light glow */}
          <circle cx="15" cy="22" r="4.5" fill="#F5B800" opacity="0.9" />
          <circle cx="15" cy="22" r="2.5" fill="#FDFBF7" />
          {/* Light rays */}
          <line x1="15" y1="16" x2="15" y2="12" stroke="#F5B800" strokeWidth="1.5" opacity="0.6" />
          <line x1="20" y1="18" x2="23" y2="15" stroke="#F5B800" strokeWidth="1.5" opacity="0.6" />
          <line x1="10" y1="18" x2="7" y2="15" stroke="#F5B800" strokeWidth="1.5" opacity="0.6" />
          {/* Dome cap */}
          <path d="M8 16 C8 8, 22 8, 22 16 Z" fill="#B23A2E" stroke="#1E1B18" strokeWidth="1.5" />
          {/* Finial spike */}
          <line x1="15" y1="8" x2="15" y2="2" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15" cy="2" r="1.8" fill="#F5B800" />
          {/* Door at base */}
          <path d="M11 78 L11 68 C11 65, 19 65, 19 68 L19 78 Z" fill="#4A433B" />
          <circle cx="17" cy="73" r="1" fill="#F5B800" />
          {/* Window slit */}
          <rect x="12.5" y="50" width="5" height="8" rx="1" fill="#F5B800" opacity="0.8" />
        </g>

        {/* ── Catamaran Boat (Center, animated) ── */}
        <g transform="translate(580, 48)">
          <g className="marina-boat">
            {/* Hulls — two logs lashed together */}
            <path
              d="M0 24 Q20 30 40 24 Q42 20 44 24 Q22 32 0 24 Z"
              fill="#5C3D2E"
              stroke="#1E1B18"
              strokeWidth="1.5"
            />
            <path
              d="M4 28 Q22 34 42 28"
              stroke="#3D2B1F"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Cross-beams */}
            <line x1="10" y1="24" x2="10" y2="20" stroke="#8B6242" strokeWidth="2" />
            <line x1="34" y1="24" x2="34" y2="20" stroke="#8B6242" strokeWidth="2" />
            <line x1="10" y1="20" x2="34" y2="20" stroke="#8B6242" strokeWidth="2" />
            {/* Mast */}
            <line x1="22" y1="20" x2="22" y2="-18" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
            {/* Red sail */}
            <path d="M22 -18 L22 18 L42 12 Z" fill="#B23A2E" stroke="#8B1A10" strokeWidth="1" opacity="0.95" />
            {/* White sail highlight */}
            <path d="M22 -10 L34 8 L22 10 Z" fill="#FDFBF7" opacity="0.2" />
          </g>
        </g>

        {/* ── Diamond Kite (Right, animated) ── */}
        <g transform="translate(985, 14)">
          {/* Kite string from shore */}
          <path
            d="M70 90 Q60 60, 28 32"
            stroke="#1E1B18"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 3"
            opacity="0.5"
          />
          <g className="marina-kite">
            {/* Diamond shape */}
            <polygon points="28,0 56,28 28,56 0,28" fill="#F5B800" stroke="#1E1B18" strokeWidth="2" />
            {/* Cross sticks */}
            <line x1="28" y1="0" x2="28" y2="56" stroke="#1E1B18" strokeWidth="1.5" opacity="0.5" />
            <line x1="0" y1="28" x2="56" y2="28" stroke="#1E1B18" strokeWidth="1.5" opacity="0.5" />
            {/* Colour panels */}
            <polygon points="28,0 56,28 28,28" fill="#DE9F00" opacity="0.6" />
            <polygon points="28,28 56,28 28,56" fill="#F5B800" opacity="0.8" />
            {/* Tail */}
            <path
              d="M28 56 Q36 68 24 78 Q32 88 26 98"
              stroke="#B23A2E"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tail bows */}
            {[0, 1, 2].map((i) => {
              const points = [
                { x: 32, y: 62 },
                { x: 26, y: 82 },
                { x: 29, y: 96 },
              ];
              return (
                <circle
                  key={i}
                  cx={points[i].x}
                  cy={points[i].y}
                  r="3.5"
                  fill={i % 2 === 0 ? '#2F7D4F' : '#B23A2E'}
                />
              );
            })}
          </g>
        </g>

        {/* ── Distant Sailing Ships on Horizon ── */}
        <g opacity="0.35">
          <path d="M350 68 Q360 72 370 68 L365 68 L360 56 Z" fill="#4A433B" />
          <line x1="360" y1="68" x2="360" y2="56" stroke="#4A433B" strokeWidth="1" />
        </g>
        <g opacity="0.3">
          <path d="M900 66 Q913 70 926 66 L920 66 L913 52 Z" fill="#4A433B" />
          <line x1="913" y1="66" x2="913" y2="52" stroke="#4A433B" strokeWidth="1" />
        </g>

        {/* ── Seagulls ── */}
        <g stroke="#1E1B18" strokeWidth="1.2" fill="none" opacity="0.5">
          <path d="M200 30 Q205 26, 212 30" />
          <path d="M215 34 Q220 30, 227 34" />
          <path d="M750 22 Q756 18, 763 22" />
          <path d="M770 26 Q776 22, 783 26" />
          <path d="M1120 30 Q1125 26, 1132 30" />
        </g>
      </svg>
    </div>
  );
}
