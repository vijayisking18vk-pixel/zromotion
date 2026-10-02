import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle } from '../components/ChennaiDoodles';
import { ExternalLink, CheckCircle, MapPin, Globe, BookOpen, Compass } from 'lucide-react';
import { AUTHOR_INFO } from '../data/rentalGuideData';

export default function AuthorPage() {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_INFO.name,
    url: AUTHOR_INFO.website,
    jobTitle: AUTHOR_INFO.role,
    worksFor: {
      '@type': 'Organization',
      name: 'Chennai Rents',
      url: 'https://chennairents.in',
    },
    sameAs: AUTHOR_INFO.socialProfiles,
    description: AUTHOR_INFO.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
  };

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title={`${AUTHOR_INFO.name}: Founder & Lead Editor | Chennai Rents`}
        description={`Author profile of ${AUTHOR_INFO.name}, Founder and Lead Editorial Reviewer of Chennai Rents. Learn about our crowdsourced methodology and rental transparency standards.`}
        canonicalUrl={`https://chennairents.in/author/${AUTHOR_INFO.slug}`}
        type="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://chennairents.in/' },
          { name: 'Editorial Team', url: 'https://chennairents.in/about' },
          { name: AUTHOR_INFO.name, url: `https://chennairents.in/author/${AUTHOR_INFO.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />

      {/* ── HEADER / BIO HERO ── */}
      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.5rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="seo-breadcrumbs" style={{ marginBottom: '1.25rem' }}>
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/about">About</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{AUTHOR_INFO.name}</span>
          </div>

          <span className="tag-eyebrow">
            <span className="tag-bullet" /> EDITORIAL LEAD & FOUNDER
          </span>

          <h1 style={{ color: 'var(--c-ink)', marginTop: '0.4rem', marginBottom: '0.5rem', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
            {AUTHOR_INFO.name}
          </h1>

          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-ripon-red)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
            {AUTHOR_INFO.role}
          </div>

          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
            {AUTHOR_INFO.bio}
          </p>

          {/* Links and Profiles */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={AUTHOR_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Globe size={16} style={{ color: 'var(--c-auto-yellow)' }} />
              <span>Visit Official Website: www.vijayrajkumar.in</span>
              <ExternalLink size={14} />
            </a>

            <a
              href="https://www.instagram.com/chennairents"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
              style={{ textDecoration: 'none', background: '#fff', color: 'var(--c-ink)', border: '1px solid var(--c-border)' }}
            >
              <span>Follow @chennairents</span>
            </a>
          </div>
        </div>
      </section>

      <MarinaDivider />

      {/* ── EDITORIAL STANDARDS & MISSION ── */}
      <div className="container" style={{ maxWidth: '820px', marginTop: '3rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.65rem', marginBottom: '0.85rem' }}>Editorial Standards & Data Methodology</h2>
            <p style={{ lineHeight: 1.75, color: 'var(--c-ink-muted)', fontSize: '1.05rem' }}>
              Under {AUTHOR_INFO.name}'s stewardship, Chennai Rents was founded on an anti-broker, truth-first philosophy. Rather than scraping outdated classifieds or promoting speculative rent quotes, every locality benchmark, water supply status, and flood report is compiled through direct tenant ground-checks and verified property listings.
            </p>
          </div>

          <div style={{ background: 'var(--c-sand-light)', border: '1px solid var(--c-border)', borderRadius: '10px', padding: '1.5rem 1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.85rem', color: 'var(--c-ink)' }}>Our Publishing Guarantees</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.98rem', color: 'var(--c-ink)' }}><strong>No Broker Paywalls:</strong> We never charge tenants search fees or artificially promote middleman listings over genuine direct-owner flats.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.98rem', color: 'var(--c-ink)' }}><strong>Unvarnished Water Realities:</strong> We candidly document whether an apartment pocket receives piped Chennai Metro Water or incurs summer private tanker expenses.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.98rem', color: 'var(--c-ink)' }}><strong>Historic Flood Screening:</strong> Transparent street-level notes reflecting actual drainage during Cyclone Michaung (2023) and 2015 rainfall events.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.98rem', color: 'var(--c-ink)' }}><strong>Transparent Legal Support:</strong> Educating renters on their rights under the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Curated Publications by {AUTHOR_INFO.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <Link to="/house-for-rent-in-chennai" style={{ textDecoration: 'none' }}>
                <div className="rail-card" style={{ height: '100%', padding: '1.25rem', transition: 'border-color 0.15s ease' }}>
                  <span className="tag-eyebrow" style={{ fontSize: '0.7rem' }}>PILLAR GUIDE</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.4rem 0 0.5rem 0', color: 'var(--c-ink)' }}>Houses for Rent in Chennai</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', margin: 0 }}>The master guide across BHK types, budgets from ₹5k to ₹30k+, and tenant categories.</p>
                </div>
              </Link>

              <Link to="/flats-for-rent-in-adyar-chennai" style={{ textDecoration: 'none' }}>
                <div className="rail-card" style={{ height: '100%', padding: '1.25rem', transition: 'border-color 0.15s ease' }}>
                  <span className="tag-eyebrow" style={{ fontSize: '0.7rem' }}>LOCALITY REPORT</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.4rem 0 0.5rem 0', color: 'var(--c-ink)' }}>Flats for Rent in Adyar</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', margin: 0 }}>Verified rental benchmarks, green avenues, water scores, and Besant Nagar proximity.</p>
                </div>
              </Link>

              <Link to="/guide/advance-deposit-chennai" style={{ textDecoration: 'none' }}>
                <div className="rail-card" style={{ height: '100%', padding: '1.25rem', transition: 'border-color 0.15s ease' }}>
                  <span className="tag-eyebrow" style={{ fontSize: '0.7rem' }}>TENANT RIGHTS</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.4rem 0 0.5rem 0', color: 'var(--c-ink)' }}>Advance Deposit Norms</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', margin: 0 }}>Debunking the 10-month advance myth and negotiating down to 4–6 months safely.</p>
                </div>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
