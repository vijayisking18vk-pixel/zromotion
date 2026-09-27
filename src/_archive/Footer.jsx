import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--surface-border)',
        paddingTop: 'clamp(4.5rem, 8vw, 6.5rem)',
        paddingBottom: '3rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--surface-border)',
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginBottom: '1.25rem',
                cursor: 'pointer',
              }}
            >
              <img
                src="/assets/images/zromotion-logo.png"
                alt="Zromotion"
                style={{
                  height: '32px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </a>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--ink-secondary)',
                lineHeight: 1.65,
                maxWidth: '340px',
                marginBottom: '1.5rem',
              }}
            >
              A minimalist digital marketing and venture acceleration studio. We amplify what matters through high-resonance brand authority and quantitative growth engines.
            </p>

            <button
              onClick={scrollToTop}
              className="btn btn-secondary"
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.75rem',
                gap: '0.5rem',
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--primary-deep)',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href="#work" style={{ color: 'var(--ink)', fontSize: '0.92rem', transition: 'color 0.2s' }}>
                Portfolio Rail
              </a>
              <a href="#manifesto" style={{ color: 'var(--ink)', fontSize: '0.92rem', transition: 'color 0.2s' }}>
                Signal Manifesto
              </a>
              <a href="#services" style={{ color: 'var(--ink)', fontSize: '0.92rem', transition: 'color 0.2s' }}>
                Capabilities
              </a>
              <a href="#process" style={{ color: 'var(--ink)', fontSize: '0.92rem', transition: 'color 0.2s' }}>
                5-Phase Protocol
              </a>
              <button
                onClick={onOpenContact}
                style={{
                  textAlign: 'left',
                  color: 'var(--primary-deep)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                }}
              >
                Initiate Signal ↗
              </button>
            </div>
          </div>

          {/* Studio Hubs */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--primary-deep)',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              Studio Presence
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: 'var(--ink-secondary)' }}>
              <span>✦ Chennai &bull; Tamil Nadu, India</span>
              <span>✦ New York &bull; 450 Lexington Ave</span>
              <span>✦ London &bull; 18 Soho Square</span>
              <a
                href="mailto:hello@zromotion.agency"
                style={{
                  color: 'var(--primary-deep)',
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Mail size={15} />
                <span>hello@zromotion.agency</span>
              </a>
            </div>
          </div>

          {/* Deployed Brands */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--primary-deep)',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              Live Deployments
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem' }}>
              <a href="https://stjosephsgarden.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                St. Joseph's &rarr;
              </a>
              <a href="https://www.instagram.com/poorvika_india/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Poorvika &rarr;
              </a>
              <a href="https://www.instagram.com/vooki_products/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Vooki &rarr;
              </a>
              <a href="https://rrjcbspares.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                RR JCB Spares &rarr;
              </a>
              <a href="https://www.unfounded.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Unfounded &rarr;
              </a>
              <a href="https://www.ziggers.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Ziggers &rarr;
              </a>
              <a href="https://thalaimai360.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Thalaimai 360 &rarr;
              </a>
              <a href="https://www.loopverse.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                LoopVerse &rarr;
              </a>
              <a href="https://subanesh.framer.website/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>
                Subanesh &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2rem',
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            color: 'var(--ink-muted)',
          }}
        >
          <div>&copy; {new Date().getFullYear()} Zromotion Agency LLC. All rights reserved. We amplify what matters.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Protocol</a>
            <a href="#">Terms of Engagement</a>
            <a href="#">Security & Verification</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
