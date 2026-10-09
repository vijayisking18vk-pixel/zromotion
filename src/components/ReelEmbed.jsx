import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Instagram, ExternalLink, AlertCircle } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';


/**
 * ReelEmbed
 *
 * Click-to-load Instagram Reel card. Keeps page fast and respects
 * privacy by only mounting the iframe after the user taps "Play".
 *
 * Props:
 *   reel: {
 *     reelId   : string  – short Instagram reel ID (e.g. "DdbmprOsxmq")
 *     title    : string  – card header title
 *     bhk      : string  – e.g. "2 BHK"
 *     locality : string  – neighbourhood label in the footer
 *     poster   : string  – (optional) preview image URL
 *   }
 */
export default function ReelEmbed({ reel }) {
  const prefersReduced = useReducedMotion();

  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'loaded' | 'error'

  const reelId = reel?.reelId ?? extractReelId(reel?.url);
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;

  /* Show a 500 ms spinner before revealing the iframe */
  function handlePlay() {
    if (!embedUrl) { setPhase('error'); return; }
    setPhase('loading');
  }

  useEffect(() => {
    if (phase === 'loading') {
      const t = setTimeout(() => setPhase('loaded'), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  /* Card entrance animation – skip if reduced motion */
  const cardVariants = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
      };

  const cardViewport = { once: true, amount: 0.2 };
  const cardTransition = { duration: 0.5 };

  /* Hover lift – skip if reduced motion */
  const hoverEffect = prefersReduced ? {} : { y: -4 };
  const hoverTransition = prefersReduced
    ? {}
    : { type: 'spring', stiffness: 300, damping: 22 };

  return (
    <motion.div
      {...(prefersReduced
        ? {}
        : {
            initial: cardVariants.initial,
            whileInView: cardVariants.whileInView,
            viewport: cardViewport,
            transition: cardTransition,
          })}
      whileHover={hoverEffect}
      /* spring props live on the component, not the style */
      {...(!prefersReduced && { transition: { ...cardTransition, ...hoverTransition } })}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '380px',
        borderRadius: '12px',
        border: '2px solid var(--c-border)',
        overflow: 'hidden',
        background: 'var(--c-page-bg)',
        boxShadow: '4px 6px 0 var(--c-border)',
      }}
    >
      {/* ── Header bar ────────────────────────────────────────────── */}
      <div
        style={{
          padding: '0.7rem 1rem',
          borderBottom: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--c-header-bg)',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--c-ink)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {reel.title || 'Vacant Home Video Tour'}
        </span>
        {(reel.bhk) && (
          <span
            style={{
              flexShrink: 0,
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              background: 'var(--c-auto-yellow)',
              color: 'var(--c-ink)',
              border: '1.5px solid var(--c-ink)',
            }}
          >
            {reel.bhk}
          </span>
        )}
      </div>

      {/* ── Video area (9:16 aspect ratio) ────────────────────────── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '9 / 16',
          width: '100%',
          background: '#F5ECE1',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        {/* ── IDLE: placeholder ─────────────────────────────────────*/}
        {phase === 'idle' && (
          <button
            onClick={handlePlay}
            aria-label={`Watch home video tour on Instagram: ${reel.title || 'Reel'}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--c-ink)',
            }}
          >
            {/* Optional blurred poster */}
            {reel.poster && (
              <img
                src={reel.poster}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.3,
                  filter: 'blur(2px)',
                }}
              />
            )}

            {/* SVG dashed border — kolam effect */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              aria-hidden="true"
            >
              <rect
                x="10"
                y="10"
                width="calc(100% - 20)"
                height="calc(100% - 20)"
                rx="6"
                ry="6"
                fill="none"
                stroke="var(--c-border)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
              />
            </svg>



            {/* Yellow play button */}
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.1 }}
              whileTap={prefersReduced ? {} : { scale: 0.95 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--c-auto-yellow)',
                border: '2px solid var(--c-ink)',
                boxShadow: '3px 4px 0 var(--c-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                zIndex: 2,
              }}
            >
              <Play size={28} fill="var(--c-ink)" stroke="var(--c-ink)" style={{ marginLeft: '4px' }} />
            </motion.div>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--c-ink)',
                marginBottom: '0.35rem',
                zIndex: 2,
                position: 'relative',
              }}
            >
              Tap to watch this home
            </p>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--c-ink-muted)',
                lineHeight: 1.4,
                zIndex: 2,
                position: 'relative',
                maxWidth: '210px',
              }}
            >
              on Instagram ({INSTAGRAM_HANDLE})
            </p>
          </button>
        )}

        {/* ── LOADING: spinner ──────────────────────────────────────*/}
        {phase === 'loading' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              color: 'var(--c-ink-muted)',
            }}
          >
            {/* Simple CSS spinner */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '3px solid var(--c-border)',
                borderTopColor: 'var(--c-auto-yellow)',
                animation: 'reel-spin 0.75s linear infinite',
              }}
            />
            <style>{`@keyframes reel-spin { to { transform: rotate(360deg); } }`}</style>
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>Loading reel…</span>
          </div>
        )}

        {/* ── LOADED: iframe ────────────────────────────────────────*/}
        {phase === 'loaded' && (
          <iframe
            src={embedUrl}
            title={reel.title || 'Instagram Reel'}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            scrolling="no"
            allowTransparency="true"
            allow="encrypted-media"
            onError={() => setPhase('error')}
          />
        )}

        {/* ── ERROR: fallback ───────────────────────────────────────*/}
        {(phase === 'error' || (!embedUrl && phase !== 'idle')) && (
          <div
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <AlertCircle size={36} color="var(--c-ripon-red)" />
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--c-ink)',
              }}
            >
              Reel preview unavailable
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', lineHeight: 1.4, maxWidth: '220px' }}>
              Watch this vacant home directly on our official Instagram page.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'var(--c-auto-yellow)',
                color: 'var(--c-ink)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: '6px',
                border: '2px solid var(--c-ink)',
                boxShadow: '2px 3px 0 var(--c-ink)',
                textDecoration: 'none',
              }}
            >
              <Instagram size={16} aria-hidden="true" />
              Open {INSTAGRAM_HANDLE}
            </a>
          </div>
        )}
      </div>

      {/* ── Footer bar ────────────────────────────────────────────── */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--c-header-bg)',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontSize: '0.82rem',
            color: 'var(--c-ink-muted)',
            fontFamily: 'var(--font-body)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {reel.locality || 'Chennai'}
        </span>
        <a
          href={reel.url ? reel.url : INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            color: 'var(--c-marina-blue)',
            textDecoration: 'none',
          }}
        >
          Watch on Instagram <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

/**
 * Extracts the short reel ID from a full Instagram reel URL.
 * Returns null if extraction fails.
 */
function extractReelId(url) {
  if (!url) return null;
  try {
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
