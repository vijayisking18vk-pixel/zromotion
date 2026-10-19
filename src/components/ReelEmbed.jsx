import React, { useState } from 'react';
import { Instagram, ExternalLink, Play, X, Film } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

/**
 * ReelEmbed - Clean, Anti-Clumsy Instagram Reel Card
 *
 * Replaces blurry, letterboxed, clipped iframe widgets with a crisp,
 * magazine-quality video walkthrough card. Shows a razor-sharp cover photo,
 * configuration badge, locality tag, and interactive play controls.
 * Users can either watch inline with zero clipped footers or open directly
 * on Instagram with 1 tap.
 */
export default function ReelEmbed({ reel }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const reelId = reel?.reelId ?? extractReelId(reel?.url);
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;
  const directUrl = reel?.url || (reelId ? `https://www.instagram.com/reel/${reelId}/` : INSTAGRAM_URL);

  return (
    <article className="clean-reel-card">
      {/* ── Top Header Bar ── */}
      <div className="clean-reel-header">
        <div className="clean-reel-title-group">
          <span className="clean-reel-live-dot" />
          <span className="clean-reel-title" title={reel?.title}>
            {reel?.title || 'Property Walk-Through'}
          </span>
        </div>

        {reel?.locality && (
          <span className="clean-reel-badge">
            {reel.locality.split(',')[0]}
          </span>
        )}
      </div>
      {/* ── Visual Media Stage ── */}
      <div className="clean-reel-media-stage">
        {isPlaying && embedUrl && !hasError ? (
          <div className="clean-reel-player-box">
            <button
              type="button"
              className="clean-reel-close-btn"
              onClick={() => setIsPlaying(false)}
              aria-label="Return to cover photo"
              title="Return to clean cover photo"
            >
              <X size={14} />
              <span>Cover</span>
            </button>
            <iframe
              src={embedUrl}
              title={reel?.title || 'Instagram Property Walk-Through'}
              className="clean-reel-iframe"
              scrolling="no"
              allow="encrypted-media"
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          <div
            className="clean-reel-cover-box"
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
            aria-label={`Play walk-through tour for ${reel?.title || 'property'}`}
          >
            {/* Crisp High-Res Real Poster Image */}
            <img
              src={reel?.poster || '/images/reels/madipakkam-2bhk.jpg'}
              alt={reel?.title || 'Property walk-through preview'}
              className="clean-reel-poster-img"
              loading="lazy"
            />

            {/* Readability Vignette Gradients */}
            <div className="clean-reel-gradient-top" />
            <div className="clean-reel-gradient-bottom" />

            {/* Top Badge */}
            <div className="clean-reel-badge-top" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
              <span className="clean-reel-tag-pill">{reel?.tag || 'Verified Tour'}</span>
            </div>

            {/* Center Glass Play Button */}
            <div className="clean-reel-play-overlay">
              <div className="clean-reel-play-circle">
                <Play size={26} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '4px' }} />
              </div>
              <span className="clean-reel-play-text">Watch Walk-Through</span>
            </div>

            {/* Bottom Card Overlay Details */}
            <div className="clean-reel-overlay-content">
              <div className="clean-reel-overlay-meta">
                <span>📍 {reel?.landmark || reel?.locality || 'Madipakkam, Chennai'}</span>
                {reel?.bhk && (
                  <span className="clean-reel-overlay-bhk">{reel.bhk}</span>
                )}
              </div>
              {reel?.features && reel.features.length > 0 && (
                <div className="clean-reel-chips-row">
                  {reel.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="clean-reel-chip">{f}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Action Footer ── */}
      <div className="clean-reel-footer">
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="clean-reel-ig-link"
          title={`Watch ${reel?.title || 'reel'} on Instagram`}
        >
          <Instagram size={15} style={{ color: 'var(--c-ripon-red)' }} />
          <span>Watch on Instagram</span>
          <ExternalLink size={12} style={{ opacity: 0.6 }} />
        </a>

        {!isPlaying && embedUrl && (
          <button
            type="button"
            className="clean-reel-play-toggle"
            onClick={() => setIsPlaying(true)}
            title="Play video inline on this page"
          >
            <Film size={13} />
            <span>Play Inline</span>
          </button>
        )}
      </div>

      {/* Scoped CSS for ReelEmbed */}
      <style>{`
        .clean-reel-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          border-radius: 16px;
          border: 1.5px solid var(--c-border);
          background: #FFFFFF;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(31, 26, 23, 0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .clean-reel-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(31, 26, 23, 0.1);
        }

        .clean-reel-header {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--c-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--c-sand-light, #F5EFE1);
          gap: 0.5rem;
          min-height: 46px;
        }

        .clean-reel-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
        }

        .clean-reel-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--c-ripon-red, #B5372B);
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(181, 55, 43, 0.2);
          animation: pulseDot 2s infinite ease-in-out;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .clean-reel-title {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--c-ink, #1F1A17);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .clean-reel-badge {
          font-size: 0.72rem;
          font-weight: 800;
          font-family: var(--font-heading);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          background: var(--c-auto-yellow, #F5B800);
          color: var(--c-ink, #1F1A17);
          border: 1px solid var(--c-ink, #1F1A17);
          flex-shrink: 0;
          text-transform: capitalize;
        }

        .clean-reel-media-stage {
          position: relative;
          width: 100%;
          height: 480px;
          background: #12100E;
          overflow: hidden;
        }

        .clean-reel-cover-box {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          display: block;
        }

        .clean-reel-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .clean-reel-card:hover .clean-reel-poster-img {
          transform: scale(1.03);
        }

        .clean-reel-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }

        .clean-reel-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }

        .clean-reel-play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          pointer-events: none;
        }

        .clean-reel-play-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(18, 16, 14, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 2px solid rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
        }
        .clean-reel-cover-box:hover .clean-reel-play-circle {
          transform: scale(1.1);
          background: var(--c-ripon-red, #B5372B);
          border-color: #FFFFFF;
        }

        .clean-reel-play-text {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: rgba(0, 0, 0, 0.6);
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .clean-reel-overlay-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.15rem 1rem;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          pointer-events: none;
        }

        .clean-reel-tag-pill {
          align-self: flex-start;
          font-size: 0.68rem;
          font-weight: 800;
          font-family: var(--font-heading);
          letter-spacing: 0.03em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          padding: 0.15rem 0.55rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .clean-reel-overlay-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 700;
          font-family: var(--font-heading);
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        .clean-reel-overlay-bhk {
          font-weight: 800;
          color: var(--c-auto-yellow, #F5B800);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          background: rgba(0,0,0,0.4);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .clean-reel-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 0.35rem;
        }

        .clean-reel-chip {
          font-size: 0.68rem;
          font-weight: 700;
          font-family: var(--font-heading);
          background: rgba(18, 16, 14, 0.75);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .clean-reel-player-box {
          position: relative;
          width: 100%;
          height: 100%;
          background: #FFFFFF;
        }

        .clean-reel-close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          background: rgba(18, 16, 14, 0.85);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          padding: 0.25rem 0.6rem;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: background-color 0.15s ease;
        }
        .clean-reel-close-btn:hover {
          background: var(--c-ripon-red, #B5372B);
        }

        .clean-reel-iframe {
          width: 100%;
          height: 480px;
          border: none;
          display: block;
        }

        .clean-reel-footer {
          padding: 0.65rem 0.85rem;
          border-top: 1px solid var(--c-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          gap: 0.5rem;
          min-height: 48px;
        }

        .clean-reel-ig-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--c-ink, #1F1A17);
          text-decoration: none;
          padding: 0.35rem 0.55rem;
          border-radius: 6px;
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .clean-reel-ig-link:hover {
          background: var(--c-sand-light, #F5EFE1);
          color: var(--c-ripon-red, #B5372B);
        }

        .clean-reel-play-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--c-ink, #1F1A17);
          background: var(--c-sand-light, #F5EFE1);
          border: 1px solid var(--c-border);
          border-radius: 6px;
          padding: 0.35rem 0.65rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .clean-reel-play-toggle:hover {
          background: var(--c-auto-yellow, #F5B800);
          border-color: var(--c-ink);
        }
      `}</style>
    </article>
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
