import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle } from '../components/ChennaiDoodles';
import { MapPin, Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="404: Page Not Found | Chennai Rents"
        description="The page you are looking for does not exist on Chennai Rents."
        canonicalUrl="https://chennairents.in/404"
        robots="noindex, nofollow"
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '4rem 3rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> 404 ERROR • NOT FOUND
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginTop: '0.5rem', marginBottom: '0.6rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            This Page Took a Wrong Turn
          </h1>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-ripon-red)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            நம்ம சென்னை வாடகை வழிகாட்டி (Page Not Found)
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '560px', marginInline: 'auto', lineHeight: 1.6 }}>
            The locality guide or rental link you are looking for may have moved or no longer exists. Let's get you back on track.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBlock: '2rem 1.5rem' }}>
            <AutoRickshawDoodle width={140} height={90} />
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/" className="btn-dark" style={{ textDecoration: 'none' }}>
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/chennai/rentals" className="btn-red" style={{ textDecoration: 'none' }}>
              <Compass size={16} />
              <span>Explore Chennai Localities</span>
            </Link>
            <a
              href="/listings/index.html"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--c-header-bg)',
                color: 'var(--c-ink)',
                border: '1.5px solid var(--c-border)',
                borderRadius: 'var(--radius-md, 8px)',
                padding: '0.65rem 1.35rem',
                minHeight: '44px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background-color 0.15s ease',
              }}
            >
              <MapPin size={16} style={{ color: 'var(--c-ripon-red)', flexShrink: 0 }} />
              <span>Explore Rent Map</span>
            </a>
          </div>
        </div>
      </section>

      <MarinaDivider />
    </main>
  );
}
