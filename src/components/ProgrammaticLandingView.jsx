import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Droplets, 
  Umbrella, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Train, 
  Plus,
  Home as HomeIcon
} from 'lucide-react';
import SEOHead from './SEOHead';
import { AUTHOR_INFO } from '../data/rentalGuideData';

// --- Reusable FAQ Accordion Item ----------------------------------------------
function FAQItem({ q, a, idx, localitySlug }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div 
      className="animated-faq" 
      style={{ 
        marginBottom: '0.75rem',
        background: '#FFFDF9',
        border: '1px solid var(--c-border)',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <button
        className="animated-faq-summary"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        id={`faq-${localitySlug}-q-${idx}`}
        aria-controls={`faq-${localitySlug}-a-${idx}`}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.1rem 1.25rem',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          fontSize: '1.02rem',
          fontWeight: 600,
          color: 'var(--c-ink)',
          cursor: 'pointer',
          gap: '1rem'
        }}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp size={20} style={{ flexShrink: 0, color: 'var(--c-ripon-red)' }} />
        ) : (
          <ChevronDown size={20} style={{ flexShrink: 0, color: 'var(--c-ink-light)' }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${localitySlug}-a-${idx}`}
            role="region"
            aria-labelledby={`faq-${localitySlug}-q-${idx}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div 
              className="animated-faq-body"
              style={{
                padding: '0 1.25rem 1.25rem 1.25rem',
                color: 'var(--c-ink-muted)',
                lineHeight: 1.7,
                fontSize: '0.98rem',
                borderTop: '1px solid var(--c-border-subtle)'
              }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Programmatic Landing View Component ---------------------------------
export default function ProgrammaticLandingView({
  data,
  geo,
  localityName,
  localitySlug,
  eyebrowBadge = 'Chennai Prime Residential Zone',
  transitBadge = 'Transit Connected Hub',
  transitSnapshot = { title: 'Transit Access', value: '3 - 8 Mins', desc: 'Arterial Corridor' },
  waterSnapshot = { score: '7.5 / 10', desc: 'Metro Water & Borewell' },
  pocketsHeading,
  pocketsSubheading,
  benchmarksHeading,
  neighborHeading,
  neighborLocalities = []
}) {
  const reduce = useReducedMotion();

  if (!data) return null;

  const resolvedPocketsHeading = pocketsHeading || `${localityName} Micro-Market Hubs & Avenues`;
  const resolvedPocketsSubheading = pocketsSubheading || `Distinguished residential pockets and streets across ${localityName}:`;
  const resolvedBenchmarksHeading = benchmarksHeading || `Current Rental Market Benchmarks in ${localityName}`;
  const resolvedNeighborHeading = neighborHeading || `Adjacent ${localityName} Neighborhoods`;

  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.chennairents.in/' },
    { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: 'https://www.chennairents.in/chennai/rentals' },
    { '@type': 'ListItem', position: 3, name: localityName, item: `https://www.chennairents.in/chennai/${localitySlug}` },
    { '@type': 'ListItem', position: 4, name: data.h1, item: data.canonical },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: data.h1,
      description: data.metaDescription,
      url: data.canonical,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo?.latitude || 13.0827,
        longitude: geo?.longitude || 80.2707,
      },
      geoWithin: geo?.geoBoundingBox ? {
        '@type': 'GeoShape',
        box: `${geo.geoBoundingBox.south} ${geo.geoBoundingBox.west} ${geo.geoBoundingBox.north} ${geo.geoBoundingBox.east}`,
      } : undefined,
      address: {
        '@type': 'PostalAddress',
        addressLocality: localityName,
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
        postalCode: geo?.pincode || '600001',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: data.priceRange.min,
        highPrice: data.priceRange.max,
        offerCount: 25,
      },
    },
  ];

  if (data.faqs && data.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  // Lateral internal link clusters
  const typologyLinks = [
    { label: 'All Flats for Rent', slug: `flats-for-rent-in-${localitySlug}` },
    { label: '1RK Studio Rooms', slug: `1rk-for-rent-in-${localitySlug}` },
    { label: '1 BHK Flats', slug: `1bhk-flats-for-rent-in-${localitySlug}` },
    { label: '2 BHK Flats', slug: `2bhk-flats-for-rent-in-${localitySlug}` },
    { label: '3 BHK Flats', slug: `3bhk-flats-for-rent-in-${localitySlug}` },
    { label: 'Independent Houses', slug: `independent-houses-for-rent-in-${localitySlug}` },
    { label: 'Furnished Flats', slug: `furnished-flats-for-rent-in-${localitySlug}` },
  ];

  const demographicLinks = [
    { label: '1 BHK for Bachelors', slug: `1bhk-flats-for-bachelors-in-${localitySlug}` },
    { label: '2 BHK for Bachelors', slug: `2bhk-flats-for-bachelors-in-${localitySlug}` },
    { label: 'Bachelor Flats Hub', slug: `flats-for-bachelors-in-${localitySlug}` },
    { label: '2 BHK for Family', slug: `2bhk-flats-for-family-in-${localitySlug}` },
    { label: '3 BHK for Family', slug: `3bhk-flats-for-family-in-${localitySlug}` },
    { label: 'Family Flats Hub', slug: `flats-for-family-in-${localitySlug}` },
    { label: 'Co-Living Spaces', slug: `co-living-in-${localitySlug}` },
    { label: 'PG for Men', slug: `pg-for-men-in-${localitySlug}` },
    { label: 'PG for Women', slug: `pg-for-women-in-${localitySlug}` },
  ];

  const budgetLinks = [
    { label: 'Flats Under ₹10,000', slug: `flats-for-rent-under-10000-in-${localitySlug}` },
    { label: 'Flats Under ₹15,000', slug: `flats-for-rent-under-15000-in-${localitySlug}` },
    { label: 'Flats Under ₹20,000', slug: `flats-for-rent-under-20000-in-${localitySlug}` },
  ];

  return (
    <>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical={data.canonical}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: '#FAF6EE', color: 'var(--c-ink)', minHeight: '100vh', paddingBottom: '3.5rem' }}
      >
        {/* Top Accent Strip */}
        <div style={{ height: '3px', background: 'var(--c-ripon-red)', width: '100%' }} />

        {/* --- 1. HERO & BREADCRUMBS --- */}
        <header className="hero-sky-section" style={{ paddingTop: '1.75rem', paddingBottom: '2.25rem', borderBottom: '1px solid var(--c-border)' }}>
          <div className="container" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1rem' }}>
            {/* Breadcrumb Hierarchy */}
            <nav className="seo-breadcrumbs" aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--c-ink-light)', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Link to="/" style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/chennai/rentals" style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>Chennai Rentals</Link>
              <span aria-hidden="true">›</span>
              <Link to={`/chennai/${localitySlug}`} style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>{localityName}</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page" style={{ color: 'var(--c-ripon-red)', fontWeight: 600 }}>{data.h1}</span>
            </nav>

            {/* Eyebrow & Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ 
                background: 'var(--c-ripon-red)', 
                color: '#fff', 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                letterSpacing: '0.04em', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {eyebrowBadge}
              </span>
              <span style={{ 
                background: 'var(--c-temple-green)', 
                color: '#fff', 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px' 
              }}>
                ✓ 0% Broker Commission
              </span>
              {geo?.pincode && (
                <span style={{ 
                  background: '#FFFDF9', 
                  color: 'var(--c-ink-muted)', 
                  border: '1px solid var(--c-border)', 
                  fontSize: '0.72rem', 
                  fontWeight: 600, 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px' 
                }}>
                  PIN {geo.pincode}
                </span>
              )}
              <span style={{ 
                background: '#FFFDF9', 
                color: 'var(--c-marina-blue)', 
                border: '1px solid var(--c-border)', 
                fontSize: '0.72rem', 
                fontWeight: 600, 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px' 
              }}>
                {transitBadge}
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(1.75rem, 3.8vw, 2.5rem)', 
              fontWeight: 700, 
              color: 'var(--c-ink)', 
              lineHeight: 1.25, 
              marginBottom: '0.85rem' 
            }}>
              {data.h1}
            </h1>

            <p style={{ 
              fontSize: '1.05rem', 
              color: 'var(--c-ink-muted)', 
              lineHeight: 1.7, 
              maxWidth: '860px', 
              marginBottom: '1.5rem' 
            }}>
              {data.leadParagraph}
            </p>

            {/* Author Attribution Bar */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.65rem', 
              flexWrap: 'wrap', 
              fontSize: '0.86rem', 
              color: 'var(--c-ink-light)', 
              paddingTop: '0.5rem',
              borderTop: '1px dashed var(--c-border)'
            }}>
              <span>Reviewed by <a href={AUTHOR_INFO.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-ripon-red)', fontWeight: 700, textDecoration: 'none' }}>{AUTHOR_INFO.name}</a></span>
              <span>•</span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Verified Direct Owners Only</span>
            </div>
          </div>
        </header>

        {/* --- 2. QUICK FINANCIAL & INFRASTRUCTURE SNAPSHOT --- */}
        <section style={{ maxWidth: '1160px', margin: '-1.5rem auto 2.5rem auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '1rem',
            background: '#FFFDF9',
            border: '1px solid var(--c-border)',
            borderRadius: '14px',
            padding: '1.25rem',
            boxShadow: '0 4px 16px rgba(31, 26, 23, 0.03)'
          }}>
            <div style={{ borderRight: '1px solid var(--c-border-subtle)', paddingRight: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                Rental Price Range
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--c-ripon-red)', marginTop: '0.2rem' }}>
                {data.priceRange.display}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                Per month indicative
              </div>
            </div>

            <div style={{ borderRight: '1px solid var(--c-border-subtle)', paddingRight: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                Security Deposit
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--c-ink)', marginTop: '0.2rem' }}>
                {data.depositNorm}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                Standard advance norm
              </div>
            </div>

            <div style={{ borderRight: '1px solid var(--c-border-subtle)', paddingRight: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                {transitSnapshot.title}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--c-marina-blue)', marginTop: '0.2rem' }}>
                {transitSnapshot.value}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                {transitSnapshot.desc}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                Water Supply Rating
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--c-temple-green)', marginTop: '0.2rem' }}>
                {waterSnapshot.score}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                {waterSnapshot.desc}
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. MAIN CONTENT BODY --- */}
        <div className="container" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Neighborhood Breakdown Cards */}
            {data.neighborhoodPockets && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem',
                boxShadow: '0 2px 10px rgba(31, 26, 23, 0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin size={22} style={{ color: 'var(--c-ripon-red)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                    {resolvedPocketsHeading}
                  </h2>
                </div>
                <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {resolvedPocketsSubheading}
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {data.neighborhoodPockets.map((pocket, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: '#FAF6EE', 
                        border: '1px solid var(--c-border-subtle)', 
                        borderRadius: '10px', 
                        padding: '1.15rem' 
                      }}
                    >
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--c-ripon-red)', marginBottom: '0.45rem' }}>
                        {pocket.name}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
                        {pocket.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Market Snapshot Table */}
            {data.marketSnapshot && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <HomeIcon size={22} style={{ color: 'var(--c-ripon-red)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                    {resolvedBenchmarksHeading}
                  </h2>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF6EE', borderBottom: '2px solid var(--c-border)' }}>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ink)' }}>Property Typology</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>Average Monthly Rent</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ink-muted)' }}>Advance Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.marketSnapshot.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--c-ink)' }}>{row.type}</td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>{row.rent}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)' }}>{row.deposit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {data.maintenanceNote && (
                  <div style={{ 
                    marginTop: '1.25rem', 
                    padding: '0.85rem 1.15rem', 
                    background: '#FAF6EE', 
                    borderRadius: '8px', 
                    border: '1px dashed var(--c-border)',
                    fontSize: '0.88rem',
                    color: 'var(--c-ink-muted)'
                  }}>
                    ℹ️ <strong>Maintenance Guideline:</strong> {data.maintenanceNote}
                  </div>
                )}
              </section>
            )}

            {/* Feature Highlights / Advantage Cards */}
            {(data.keyAdvantages || data.featuresList) && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1.25rem' }}>
                  Property Features & Resident Insights
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {(data.keyAdvantages || data.featuresList).map((item, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        padding: '1.25rem', 
                        background: '#FAF6EE', 
                        borderRadius: '10px', 
                        border: '1px solid var(--c-border-subtle)' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--c-temple-green)' }} />
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                          {item.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Co-living Tariffs and Inclusions */}
            {data.tariffDetails && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1.25rem' }}>
                  Co-Living Room Sharing Tariffs
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {data.tariffDetails.map((plan, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', background: '#FAF6EE', borderRadius: '10px', border: '1px solid var(--c-border)' }}>
                      <div style={{ fontWeight: 700, color: 'var(--c-ink)' }}>{plan.sharing}</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-ripon-red)', margin: '0.35rem 0' }}>{plan.tariff}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)' }}>{plan.desc}</div>
                    </div>
                  ))}
                </div>

                {data.amenitiesIncluded && (
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--c-ink)' }}>All-Inclusive Amenities Package:</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
                      {data.amenitiesIncluded.map((amenity, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--c-ink)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Furnished Checklist */}
            {data.includedChecklist && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Furnished Apartment Checklist
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                  {data.includedChecklist.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--c-ink)' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Monsoon Readiness and Water Supply */}
            {data.monsoonReadiness && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '16px', 
                padding: '2rem 1.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Umbrella size={22} style={{ color: 'var(--c-marina-blue)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                    Monsoon Resilience & Water Reality
                  </h2>
                </div>
                <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {data.monsoonReadiness}
                </p>
              </section>
            )}

            {/* FAQ Accordion Section */}
            {data.faqs && data.faqs.length > 0 && (
              <section style={{ marginTop: '0.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Frequently Asked Questions
                </h2>
                <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  Hyper-local answers for renters and landlords in {localityName}:
                </p>

                <div>
                  {data.faqs.map((faq, idx) => (
                    <FAQItem key={idx} q={faq.q} a={faq.a} idx={idx} localitySlug={localitySlug} />
                  ))}
                </div>
              </section>
            )}

            {/* Contextual Internal Linking Grid */}
            <section style={{ 
              background: '#FFFDF9', 
              border: '1px solid var(--c-border)', 
              borderRadius: '16px', 
              padding: '2rem 1.5rem',
              marginTop: '1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Compass size={22} style={{ color: 'var(--c-ripon-red)' }} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                  Explore {localityName} Rental Network
                </h2>
              </div>
              <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Navigate across configurations, bachelor/family typologies, budget brackets, and neighboring residential pockets:
              </p>

              {/* Group A: By Typology */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.92rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  By Unit Typology
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {typologyLinks.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/chennai/${localitySlug}/${item.slug}`}
                      style={{
                        padding: '0.45rem 0.85rem',
                        background: item.slug === data.slug ? 'var(--c-ink)' : '#FAF6EE',
                        color: item.slug === data.slug ? '#fff' : 'var(--c-ink)',
                        border: '1px solid var(--c-border)',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: item.slug === data.slug ? 700 : 500,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group B: By Demographics */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.92rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  By Tenant Profile & Demographics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {demographicLinks.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/chennai/${localitySlug}/${item.slug}`}
                      style={{
                        padding: '0.45rem 0.85rem',
                        background: item.slug === data.slug ? 'var(--c-ink)' : '#FAF6EE',
                        color: item.slug === data.slug ? '#fff' : 'var(--c-ink)',
                        border: '1px solid var(--c-border)',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: item.slug === data.slug ? 700 : 500,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group C: By Budget */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.92rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  By Monthly Rental Budget
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {budgetLinks.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/chennai/${localitySlug}/${item.slug}`}
                      style={{
                        padding: '0.45rem 0.85rem',
                        background: item.slug === data.slug ? 'var(--c-ink)' : '#FAF6EE',
                        color: item.slug === data.slug ? '#fff' : 'var(--c-ink)',
                        border: '1px solid var(--c-border)',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: item.slug === data.slug ? 700 : 500,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group D: Adjacent Localities */}
              {neighborLocalities.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.92rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {resolvedNeighborHeading}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {neighborLocalities.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/chennai/${item.slug}`}
                        style={{
                          padding: '0.45rem 0.85rem',
                          background: '#FAF6EE',
                          color: 'var(--c-ink)',
                          border: '1px solid var(--c-border)',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          fontWeight: 500,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

          </div>
        </div>
      </motion.div>
    </>
  );
}
