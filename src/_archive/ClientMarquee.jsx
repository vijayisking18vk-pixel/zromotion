import React from 'react';

const BRANDS = [
  { name: "ST. JOSEPH'S", url: 'https://stjosephsgarden.ac.in/', tag: 'Institutions' },
  { name: 'POORVIKA', url: 'https://www.instagram.com/poorvika_india/', tag: 'Tech Retail' },
  { name: 'VOOKI', url: 'https://www.instagram.com/vooki_products/', tag: 'Eco Cleaning' },
  { name: 'RR JCB SPARES', url: 'https://rrjcbspares.in/', tag: 'B2B Equipment' },
  { name: 'UNFOUNDED', url: 'https://www.unfounded.in', tag: 'AI Studio' },
  { name: 'ZIGGERS', url: 'https://www.ziggers.in', tag: 'Gig Economy' },
  { name: 'THALAIMAI 360', url: 'https://thalaimai360.com', tag: 'Public Governance' },
  { name: 'LOOPVERSE', url: 'https://www.loopverse.in', tag: 'Web3 Protocol' },
  { name: 'SUBANESH', url: 'https://subanesh.framer.website/', tag: 'Lead Systems' },
];

export default function ClientMarquee() {
  // Duplicate array 3 times to create a seamless infinite loop
  const repeatedBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      style={{
        position: 'relative',
        padding: '3rem 0',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderTop: '1px solid var(--surface-border)',
        borderBottom: '1px solid var(--surface-border)',
      }}
    >
      {/* Top subtle label */}
      <div className="container" style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            fontWeight: 600,
          }}
        >
          SELECT CLIENT DEPLOYMENTS & PARTNERSHIPS
        </p>
      </div>

      {/* Marquee Track Container */}
      <div
        className="marquee-container"
        style={{
          display: 'flex',
          overflow: 'hidden',
          userSelect: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            animation: 'marqueeScroll 28s linear infinite',
          }}
        >
          {repeatedBrands.map((brand, idx) => (
            <a
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="marquee-wordmark"
              title={`Visit ${brand.name} (${brand.url})`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2.5rem',
              }}
            >
              <span>{brand.name}</span>
              <span
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--primary)',
                  opacity: 0.7,
                }}
              >
                ✦
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
