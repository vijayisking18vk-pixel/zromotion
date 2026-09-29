import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Chennai Hand-Drawn Vector Doodles
 *
 * Existing:
 *   1. AutoRickshawDoodle   — classic yellow & black auto
 *   2. RiponBuildingDoodle  — colonial clock tower
 *   3. FilterCoffeeDoodle   — brass tumbler & davarah
 *
 * New:
 *   4. MallipooGarland      — jasmine flower string
 *   5. KolamPattern         — dot kolam (variants 1-4)
 *   6. HandDrawnArrow       — wobbly arrow (right | down)
 *   7. MtcBusDoodle         — green MTC bus
 *
 * All new doodles support framer-motion whileHover wiggle.
 * Animations are disabled when prefers-reduced-motion is set.
 */

// ─────────────────────────────────────────────────────────────
// Helper: shared hover animation props
// ─────────────────────────────────────────────────────────────
function useWiggleProps(degrees = 4) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return {};
  return {
    whileHover: {
      rotate: [0, -degrees, degrees, -degrees * 0.6, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };
}

// ─────────────────────────────────────────────────────────────
// 1. AutoRickshawDoodle
// ─────────────────────────────────────────────────────────────
export function AutoRickshawDoodle({ width = 120, height = 80, className = '' }) {
  const wiggle = useWiggleProps(4);
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 160 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Chennai Auto Rickshaw Doodle"
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
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
      {/* Side body panel */}
      <path
        d="M55 55 L60 75 L135 75 L140 55 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      {/* Lower chassis / skirt */}
      <path d="M32 75 L38 90 L138 90 L135 75 Z" fill="#1E1B18" />
      {/* Green band stripe */}
      <rect x="58" y="72" width="77" height="4" fill="#2F7D4F" />
      {/* Front Wheel */}
      <circle cx="38" cy="92" r="14" fill="#1E1B18" />
      <circle cx="38" cy="92" r="7" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="2" />
      {/* Rear Wheel */}
      <circle cx="120" cy="92" r="14" fill="#1E1B18" />
      <circle cx="120" cy="92" r="7" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="2" />
      {/* Headlight */}
      <circle cx="23" cy="65" r="5" fill="#FFFFFF" stroke="#1E1B18" strokeWidth="2" />
      {/* Handlebar */}
      <line x1="45" y1="62" x2="52" y2="60" stroke="#1E1B18" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. RiponBuildingDoodle
// ─────────────────────────────────────────────────────────────
export function RiponBuildingDoodle({ width = 140, height = 90, className = '' }) {
  const wiggle = useWiggleProps(3);
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ripon Building Doodle"
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* Main Base Wings */}
      <rect x="15" y="65" width="150" height="45" fill="#B23A2E" stroke="#1E1B18" strokeWidth="2.5" rx="2" />
      {/* White trims */}
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
      {/* Central Clock Tower */}
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
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. FilterCoffeeDoodle
// ─────────────────────────────────────────────────────────────
export function FilterCoffeeDoodle({ width = 70, height = 80, className = '' }) {
  const wiggle = useWiggleProps(5);
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Filter Coffee Davarah Tumbler Doodle"
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* Steam trails */}
      <path d="M42 16 C40 10, 46 8, 44 2" stroke="#82786D" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M52 14 C50 8, 56 6, 54 0" stroke="#82786D" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Brass Davarah */}
      <path
        d="M15 75 Q15 98 50 98 Q85 98 85 75 L82 72 Q50 78 18 72 Z"
        fill="#F5B800"
        stroke="#1E1B18"
        strokeWidth="2.5"
      />
      <ellipse cx="50" cy="74" rx="33" ry="5" fill="#DE9F00" stroke="#1E1B18" strokeWidth="1.5" />
      {/* Brass Tumbler */}
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
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. MallipooGarland — jasmine flower string
// ─────────────────────────────────────────────────────────────
export function MallipooGarland({ width = 200, height = 60, className = '' }) {
  const wiggle = useWiggleProps(4);
  // Flowers placed along the wavy string
  const flowers = [
    { x: 18, y: 32 },
    { x: 42, y: 22 },
    { x: 66, y: 30 },
    { x: 90, y: 20 },
    { x: 114, y: 28 },
    { x: 138, y: 20 },
    { x: 162, y: 30 },
    { x: 182, y: 22 },
  ];

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mallipoo Jasmine Garland Doodle"
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* Wavy string */}
      <path
        d="M8 30 C20 16, 36 38, 52 24 C68 10, 82 38, 98 24 C114 10, 128 38, 144 24 C160 10, 176 36, 192 26"
        stroke="#A8936A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Flowers */}
      {flowers.map(({ x, y }, i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          {/* 5 petals */}
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * 6;
            const py = Math.sin(rad) * 6;
            return (
              <ellipse
                key={angle}
                cx={px}
                cy={py}
                rx="3.5"
                ry="2.5"
                fill="#FDFBF7"
                stroke="#C8B89A"
                strokeWidth="0.8"
                transform={`rotate(${angle}, ${px}, ${py})`}
              />
            );
          })}
          {/* Centre */}
          <circle cx="0" cy="0" r="2.5" fill="#F5B800" />
        </g>
      ))}
      {/* Hanging knots at ends */}
      <circle cx="8" cy="30" r="3" fill="#A8936A" />
      <circle cx="192" cy="26" r="3" fill="#A8936A" />
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. KolamPattern — dot kolam (variants 1–4)
// ─────────────────────────────────────────────────────────────

// Each variant is a set of {dots, lines} defining a simple kolam
const KOLAM_VARIANTS = {
  1: {
    // 3×3 diamond kolam
    dots: [
      [50, 10], [30, 30], [50, 30], [70, 30],
      [10, 50], [30, 50], [50, 50], [70, 50], [90, 50],
      [30, 70], [50, 70], [70, 70],
      [50, 90],
    ],
    lines: [
      'M50 10 L30 30 L10 50 L30 70 L50 90 L70 70 L90 50 L70 30 Z',
      'M30 30 L50 50 L70 30',
      'M30 70 L50 50 L70 70',
      'M10 50 L50 50',
      'M90 50 L50 50',
    ],
  },
  2: {
    // 4-petal lotus kolam
    dots: [
      [50, 10], [10, 50], [50, 90], [90, 50], [50, 50],
      [30, 30], [70, 30], [30, 70], [70, 70],
    ],
    lines: [
      'M50 10 C30 30, 10 30, 10 50 C10 70, 30 70, 50 90 C70 70, 90 70, 90 50 C90 30, 70 30, 50 10 Z',
      'M30 30 C40 40, 60 40, 70 30',
      'M30 70 C40 60, 60 60, 70 70',
      'M10 50 C20 40, 20 60, 10 50',
      'M90 50 C80 40, 80 60, 90 50',
    ],
  },
  3: {
    // Star of David kolam
    dots: [
      [50, 8], [22, 26], [78, 26],
      [8, 50], [50, 50], [92, 50],
      [22, 74], [78, 74], [50, 92],
    ],
    lines: [
      'M50 8 L78 74 L22 74 Z',
      'M50 92 L22 26 L78 26 Z',
      'M8 50 L92 50',
      'M50 8 L50 92',
    ],
  },
  4: {
    // Concentric squares kolam
    dots: [
      [50, 10], [90, 50], [50, 90], [10, 50],
      [50, 28], [72, 50], [50, 72], [28, 50],
      [50, 50],
    ],
    lines: [
      'M50 10 L90 50 L50 90 L10 50 Z',
      'M50 28 L72 50 L50 72 L28 50 Z',
      'M50 10 L50 28',
      'M90 50 L72 50',
      'M50 90 L50 72',
      'M10 50 L28 50',
    ],
  },
};

export function KolamPattern({ width = 100, height = 100, variant = 1, className = '' }) {
  const wiggle = useWiggleProps(3);
  const data = KOLAM_VARIANTS[variant] || KOLAM_VARIANTS[1];

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Kolam Pattern Variant ${variant}`}
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* Lines */}
      {data.lines.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#B23A2E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {/* Dots */}
      {data.dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#1E1B18" />
      ))}
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. HandDrawnArrow — wobbly curved arrow
// ─────────────────────────────────────────────────────────────
export function HandDrawnArrow({ width = 80, height = 60, direction = 'right', className = '' }) {
  const wiggle = useWiggleProps(5);

  // Wobbly arrow paths — slightly imperfect to look hand-drawn
  const rightArrow = {
    shaft: 'M8 32 C18 28, 36 36, 52 30 C58 28, 64 29, 70 30',
    head: 'M62 22 L72 30 L62 40',
  };
  const downArrow = {
    shaft: 'M32 8 C28 18, 36 36, 30 52 C28 58, 29 64, 30 70',
    head: 'M22 62 L30 72 L40 62',
  };

  const arrow = direction === 'down' ? downArrow : rightArrow;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Hand-drawn arrow pointing ${direction}`}
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* Slight shadow/duplicate for hand-drawn look */}
      <path
        d={arrow.shaft}
        stroke="#C8B89A"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
        transform="translate(1.5, 1.5)"
      />
      {/* Main shaft */}
      <path
        d={arrow.shaft}
        stroke="#1E1B18"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d={arrow.head}
        stroke="#1E1B18"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small hook at tail for hand-drawn feel */}
      {direction !== 'down' && (
        <path d="M8 32 C6 30, 5 28, 7 26" stroke="#1E1B18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      {direction === 'down' && (
        <path d="M32 8 C30 6, 28 5, 26 7" stroke="#1E1B18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. MtcBusDoodle — classic green Chennai MTC bus
// ─────────────────────────────────────────────────────────────
export function MtcBusDoodle({ width = 160, height = 90, className = '' }) {
  const wiggle = useWiggleProps(3);

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 200 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Chennai MTC Bus Doodle"
      style={{ cursor: 'default', display: 'block' }}
      {...wiggle}
    >
      {/* ── Bus Body — green ── */}
      <rect x="10" y="20" width="178" height="70" rx="6" fill="#2F7D4F" stroke="#1E1B18" strokeWidth="2.5" />

      {/* ── Roof Dome ── */}
      <path
        d="M10 26 C10 20, 18 18, 188 18 C196 18, 188 26, 188 26 Z"
        fill="#246840"
        stroke="#1E1B18"
        strokeWidth="1.5"
      />

      {/* ── Yellow stripe band ── */}
      <rect x="10" y="58" width="178" height="12" fill="#F5B800" />
      {/* Route board above stripe */}
      <rect x="20" y="50" width="90" height="8" rx="1" fill="#FDFBF7" stroke="#1E1B18" strokeWidth="1" />
      <text
        x="65"
        y="57"
        textAnchor="middle"
        fontSize="5"
        fill="#1E1B18"
        fontFamily="monospace"
        fontWeight="bold"
      >
        MTC CHENNAI
      </text>

      {/* ── Front Face ── */}
      {/* Windshield */}
      <rect x="152" y="26" width="30" height="22" rx="2" fill="#A8D8F0" stroke="#1E1B18" strokeWidth="1.5" />
      {/* Windshield wiper */}
      <line x1="155" y1="46" x2="178" y2="38" stroke="#1E1B18" strokeWidth="1.2" strokeLinecap="round" />
      {/* Headlight */}
      <rect x="178" y="48" width="10" height="6" rx="2" fill="#F5B800" stroke="#1E1B18" strokeWidth="1" />
      {/* Front grille */}
      <rect x="156" y="72" width="30" height="14" rx="1" fill="#1E1B18" />
      {[160, 166, 172, 178].map((x) => (
        <line key={x} x1={x} y1="72" x2={x} y2="86" stroke="#2F7D4F" strokeWidth="1.5" />
      ))}
      {/* Bumper */}
      <rect x="185" y="78" width="5" height="8" rx="1" fill="#4A433B" />

      {/* ── Passenger Windows ── */}
      {[18, 44, 70, 96, 122].map((x) => (
        <rect key={x} x={x} y="26" width="20" height="16" rx="2" fill="#A8D8F0" stroke="#1E1B18" strokeWidth="1.5" />
      ))}

      {/* ── Door (left side) ── */}
      <rect x="30" y="58" width="16" height="24" rx="1" fill="#246840" stroke="#1E1B18" strokeWidth="1.5" />
      {/* Door handle */}
      <circle cx="44" cy="70" r="1.8" fill="#F5B800" />

      {/* ── Bottom chassis rail ── */}
      <rect x="10" y="86" width="178" height="4" rx="1" fill="#1E1B18" opacity="0.4" />

      {/* ── Wheels ── */}
      {/* Front wheel */}
      <circle cx="164" cy="92" r="14" fill="#1E1B18" stroke="#4A433B" strokeWidth="1.5" />
      <circle cx="164" cy="92" r="8" fill="#4A433B" />
      <circle cx="164" cy="92" r="4" fill="#FDFBF7" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={164 + Math.cos(rad) * 4}
            y1={92 + Math.sin(rad) * 4}
            x2={164 + Math.cos(rad) * 8}
            y2={92 + Math.sin(rad) * 8}
            stroke="#FDFBF7"
            strokeWidth="1.2"
          />
        );
      })}
      {/* Rear wheel */}
      <circle cx="46" cy="92" r="14" fill="#1E1B18" stroke="#4A433B" strokeWidth="1.5" />
      <circle cx="46" cy="92" r="8" fill="#4A433B" />
      <circle cx="46" cy="92" r="4" fill="#FDFBF7" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={46 + Math.cos(rad) * 4}
            y1={92 + Math.sin(rad) * 4}
            x2={46 + Math.cos(rad) * 8}
            y2={92 + Math.sin(rad) * 8}
            stroke="#FDFBF7"
            strokeWidth="1.2"
          />
        );
      })}

      {/* ── MTC logo badge ── */}
      <rect x="130" y="62" width="18" height="6" rx="1" fill="#1E1B18" />
      <text x="139" y="67" textAnchor="middle" fontSize="4.5" fill="#F5B800" fontFamily="monospace" fontWeight="bold">
        MTC
      </text>
    </motion.svg>
  );
}

