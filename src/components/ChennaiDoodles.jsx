import React from 'react';

/**
 * Hand-drawn Chennai Vector Doodles:
 * 1. Classic Auto-Rickshaw (Yellow & Black)
 * 2. Historic Ripon Building (Colonial Red & White)
 * 3. Hot Filter Coffee Tumbler & Davarah
 * 4. Chennai Lighthouse
 */

export function AutoRickshawDoodle({ width = 120, height = 80, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Chennai Auto Rickshaw Doodle"
    >
      {/* Auto Canvas Roof */}
      <path
        d="M25 55 C25 22, 45 15, 80 15 C115 15, 135 22, 140 55 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Front Windshield frame */}
      <path
        d="M25 55 L35 75 L60 75 L55 55 Z"
        fill="#EBF3FA"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      {/* Side body panel (Yellow + Black bottom) */}
      <path
        d="M55 55 L60 75 L135 75 L140 55 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      {/* Lower chassis / skirt (Black) */}
      <path
        d="M32 75 L38 90 L138 90 L135 75 Z"
        fill="#1E1B18"
      />
      {/* Green band stripe (MTC / Chennai green) */}
      <rect x="58" y="72" width="77" height="4" fill="#2F7D4F" />

      {/* Front Wheel */}
      <circle cx="38" cy="92" r="14" fill="#1E1B18" />
      <circle cx="38" cy="92" r="7" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="2" />
      {/* Rear Wheel */}
      <circle cx="120" cy="92" r="14" fill="#1E1B18" />
      <circle cx="120" cy="92" r="7" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="2" />

      {/* Round Front Headlight */}
      <circle cx="23" cy="65" r="5" fill="#FFFFFF" stroke="#1E1B18" strokeWidth="2" />
      {/* Handlebar */}
      <line x1="45" y1="62" x2="52" y2="60" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function RiponBuildingDoodle({ width = 140, height = 90, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ripon Building Doodle"
    >
      {/* Main Base Wings */}
      <rect x="15" y="65" width="150" height="45" fill="#B23A2E" stroke="#1E1B18" strokeWidth="2.5" rx="2" />
      {/* White architectural string courses / trims */}
      <line x1="15" y1="80" x2="165" y2="80" stroke="#FDFBF7" strokeWidth="3" />
      <line x1="15" y1="95" x2="165" y2="95" stroke="#FDFBF7" strokeWidth="3" />

      {/* Arched windows row 1 */}
      {[25, 45, 120, 140].map((x) => (
        <path key={x} d={`M${x} 90 C${x} 84, ${x + 8} 84, ${x + 8} 90 L${x + 8} 94 L${x} 94 Z`} fill="#1E1B18" />
      ))}
      {/* Arched windows row 2 */}
      {[25, 45, 120, 140].map((x) => (
        <path key={`top-${x}`} d={`M${x} 74 C${x} 69, ${x + 8} 69, ${x + 8} 74 L${x + 8} 78 L${x} 78 Z`} fill="#1E1B18" />
      ))}

      {/* Central Grand Clock Tower */}
      <rect x="70" y="30" width="40" height="80" fill="#B23A2E" stroke="#1E1B18" strokeWidth="2.5" />
      <line x1="70" y1="48" x2="110" y2="48" stroke="#FDFBF7" strokeWidth="2" />
      <line x1="70" y1="65" x2="110" y2="65" stroke="#FDFBF7" strokeWidth="2" />

      {/* Clock Face */}
      <circle cx="90" cy="56" r="7.5" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="1.5" />
      <line x1="90" y1="56" x2="90" y2="52" stroke="#1E1B18" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="90" y1="56" x2="93" y2="56" stroke="#1E1B18" strokeWidth="1.5" strokeLinecap="round" />

      {/* Dome Roof & Finial */}
      <path d="M72 30 C72 15, 108 15, 108 30 Z" fill="#F5B800" stroke="#1E1B18" strokeWidth="2" />
      <line x1="90" y1="15" x2="90" y2="6" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function FilterCoffeeDoodle({ width = 70, height = 80, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Filter Coffee Davarah Tumbler Doodle"
    >
      {/* Steam trails */}
      <path d="M42 16 C40 10, 46 8, 44 2" stroke="#82786D" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M52 14 C50 8, 56 6, 54 0" stroke="#82786D" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Brass Davarah (Wide bottom bowl) */}
      <path
        d="M15 75 Q15 98 50 98 Q85 98 85 75 L82 72 Q50 78 18 72 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      <ellipse cx="50" cy="74" rx="33" ry="5" fill="#DE9F00" stroke="#1E1B18" strokeWidth="1.5" />

      {/* Brass Tumbler (Glass) */}
      <path
        d="M32 30 L37 76 Q50 80 63 76 L68 30 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      {/* Tumbler Rim & Coffee Foam */}
      <ellipse cx="50" cy="30" rx="18" ry="4" fill="#DE9F00" stroke="#1E1B18" strokeWidth="2" />
      <ellipse cx="50" cy="30" rx="15" ry="3" fill="#6B4226" />
      <ellipse cx="50" cy="29.5" rx="13" ry="2" fill="#EADBC8" opacity="0.8" />
    </svg>
  );
}
