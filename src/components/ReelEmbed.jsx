import React, { useState } from 'react';
import { Instagram, ExternalLink, AlertCircle } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

/**
 * ReelEmbed
 *
 * Clean, properly proportioned Instagram Reel card that respects
 * Instagram's minimum embed geometry (326px+ width, 560px height)
 * so the profile header and video controls never clip or overlap.
 */
export default function ReelEmbed({ reel }) {
  const [hasError, setHasError] = useState(false);

  const reelId = reel?.reelId ?? extractReelId(reel?.url);
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;
  const directUrl = reel?.url || (reelId ? `https://www.instagram.com/reel/${reelId}/` : INSTAGRAM_URL);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '380px',
        borderRadius: '14px',
        border: '1.5px solid var(--c-border)',
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: 'var(--shadow-card, 0 4px 16px rgba(30, 27, 24, 0.06))',
      }}
    >
      {/* Top editorial bar */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--c-header-bg)',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--c-ripon-red)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 800,
              color: 'var(--c-ink)',
              whiteSpace: 'nowrap',
            }}
          >
            {reel?.title || 'Featured Property Tour'}
          </span>
        </div>

        {reel?.bhk && (
          <span
            style={{
              flexShrink: 0,
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              background: 'var(--c-auto-yellow)',
              color: 'var(--c-ink)',
              border: '1px solid var(--c-ink)',
            }}
          >
            {reel.bhk}
          </span>
        )}
      </div>

      {/* Instagram Embed Frame - sized to prevent header clipping */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '560px',
          background: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {!hasError && embedUrl ? (
          <iframe
            src={embedUrl}
            title={reel?.title || 'Instagram Property Walk-Through'}
            style={{
              width: '100%',
              height: '560px',
              border: 'none',
              display: 'block',
            }}
            scrolling="no"
            allowTransparency="true"
            allow="encrypted-media"
            onError={() => setHasError(true)}
          />
        ) : (
          <div
            style={{
              height: '100%',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              background: 'var(--c-page-bg)',
            }}
          >
            <AlertCircle size={36} color="var(--c-ripon-red)" />
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--c-ink)',
                margin: 0,
              }}
            >
              Reel preview unavailable
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)', lineHeight: 1.5, maxWidth: '240px', margin: 0 }}>
              Watch this property walk-through directly on our official Instagram page.
            </p>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow"
              style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}
            >
              <Instagram size={16} />
              <span>Open {INSTAGRAM_HANDLE}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function extractReelId(url) {
  if (!url) return null;
  try {
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
