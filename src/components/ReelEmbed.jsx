import React, { useState } from 'react';
import { Play, Instagram, ExternalLink, AlertCircle } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

/**
 * Click-to-load Instagram Reel Embed
 *
 * Keeps page fast and respects user privacy by only loading
 * the iframe/embed script when the user explicitly clicks/taps.
 */
export default function ReelEmbed({ reel }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Extract clean reel ID from URL (e.g. https://www.instagram.com/reel/DdbmprOsxmq/ -> DdbmprOsxmq)
  const getEmbedUrl = (url) => {
    try {
      const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
      if (match && match[1]) {
        return `https://www.instagram.com/reel/${match[1]}/embed/`;
      }
    } catch {
      // fallback
    }
    return null;
  };

  const embedUrl = getEmbedUrl(reel.url);

  return (
    <div
      className="chennai-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: '270px',
        maxWidth: '360px',
        marginInline: 'auto'
      }}
    >
      {/* Top Header on Card */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--c-sand-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--c-sand-light)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--c-ink)'
          }}
        >
          {reel.title || 'Vacant Home Video Tour'}
        </span>
        <span className="stamp-badge stamp-yellow" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
          {reel.bhk || '2 BHK'}
        </span>
      </div>

      {/* Main Reel Viewer / Placeholder */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '9/16',
          width: '100%',
          backgroundColor: '#F5ECE1',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isLoaded ? (
          /* Click-to-Load Placeholder */
          <button
            onClick={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              color: 'var(--c-ink)',
              position: 'relative'
            }}
            aria-label={`Watch home video tour on Instagram: ${reel.title || 'Reel'}`}
          >
            {/* Background Preview Poster if available */}
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
                  opacity: 0.35,
                  filter: 'blur(1px)'
                }}
              />
            )}

            {/* Subtle Kolam pattern border decoration */}
            <div
              style={{
                position: 'absolute',
                inset: '10px',
                border: '1.5px dashed var(--c-sand-dark)',
                borderRadius: '6px',
                pointerEvents: 'none'
              }}
            />

            {/* Central Play Icon with Instagram styling */}
            <div
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
                transition: 'transform 0.15s ease'
              }}
            >
              <Play size={28} fill="var(--c-ink)" stroke="var(--c-ink)" style={{ marginLeft: '4px' }} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--c-ink)',
                marginBottom: '0.35rem',
                zIndex: 2
              }}
            >
              Tap to watch this home
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--c-ink-muted)',
                lineHeight: 1.3,
                zIndex: 2,
                maxWidth: '220px'
              }}
            >
              Loads directly from Instagram ({INSTAGRAM_HANDLE})
            </p>
          </button>
        ) : hasError || !embedUrl ? (
          /* Error / Removed Reel Fallback */
          <div
            style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <AlertCircle size={36} color="var(--c-ripon-red)" />
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600 }}>
              Reel preview unavailable
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)' }}>
              Watch this vacant home directly on our official Instagram page.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Instagram size={16} />
              <span>Open {INSTAGRAM_HANDLE}</span>
            </a>
          </div>
        ) : (
          /* Official Instagram Embed iframe */
          <iframe
            src={embedUrl}
            title={reel.title || 'Instagram Reel'}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              overflow: 'hidden'
            }}
            scrolling="no"
            allowTransparency={true}
            allow="encrypted-media"
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* Card Footer: Profile link */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--c-header-bg)'
        }}
      >
        <span style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)' }}>
          {reel.locality || 'Chennai'}
        </span>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            color: 'var(--c-marina-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          Watch on {INSTAGRAM_HANDLE} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
