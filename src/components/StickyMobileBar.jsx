import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

/**
 * StickyMobileBar
 *
 * Mobile-only (< 768 px) sticky bottom bar with a single "Follow on Instagram"
 * CTA button that pulses via Framer Motion. Respects prefers-reduced-motion.
 *
 * Desktop equivalent: a circular fixed FAB at bottom-right (shown via CSS).
 */
export default function StickyMobileBar() {
  const prefersReduced = useReducedMotion();

  /* Pulse animation only when motion is acceptable */
  const pulseAnimation = prefersReduced
    ? {}
    : { scale: [1, 1.02, 1] };

  const pulseTransition = prefersReduced
    ? {}
    : { duration: 2, repeat: Infinity, ease: 'easeInOut' };

  return (
    <>
      {/* ─── Responsive media-query styles ─────────────────────────── */}
      <style>{`
        .smb-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: var(--c-page-bg, #FDFBF7);
          border-top: 2px solid var(--c-auto-yellow, #F5B800);
          padding: 0.65rem 1rem calc(0.65rem + env(safe-area-inset-bottom));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hide the mobile bar on desktop */
        @media (min-width: 768px) {
          .smb-bar { display: none !important; }
        }

        /* Desktop FAB – hidden on mobile */
        .smb-fab {
          display: none;
        }
        @media (min-width: 768px) {
          .smb-fab {
            position: fixed;
            right: 1.5rem;
            bottom: 1.5rem;
            z-index: 200;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: var(--c-auto-yellow, #F5B800);
            border: 2px solid var(--c-ink, #1E1B18);
            box-shadow: 3px 4px 0 var(--c-ink, #1E1B18);
            color: var(--c-ink, #1E1B18);
            text-decoration: none;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }
          .smb-fab:hover {
            transform: translateY(-2px);
            box-shadow: 3px 6px 0 var(--c-ink, #1E1B18);
          }
          .smb-fab:active {
            transform: translateY(1px);
            box-shadow: 2px 2px 0 var(--c-ink, #1E1B18);
          }
        }
      `}</style>

      {/* ─── Mobile sticky bar ──────────────────────────────────────── */}
      <div className="smb-bar" aria-label="Instagram quick-follow bar">
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          animate={pulseAnimation}
          transition={pulseTransition}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            maxWidth: '440px',
            minHeight: '48px',
            padding: '0.6rem 1.25rem',
            backgroundColor: 'var(--c-auto-yellow)',
            color: 'var(--c-ink)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: '8px',
            border: '2px solid var(--c-ink)',
            boxShadow: '3px 4px 0 var(--c-ink)',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          aria-label={`Follow ${INSTAGRAM_HANDLE} on Instagram`}
        >
          <Instagram size={20} aria-hidden="true" />
          <span>Follow on Instagram</span>
        </motion.a>
      </div>

      {/* ─── Desktop fixed FAB (Instagram icon only) ────────────────── */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="smb-fab"
        aria-label={`Follow ${INSTAGRAM_HANDLE} on Instagram`}
      >
        <Instagram size={22} aria-hidden="true" />
      </a>
    </>
  );
}
