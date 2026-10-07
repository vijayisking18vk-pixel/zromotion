import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  ShieldCheck, 
  Droplets, 
  Umbrella, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Compass, 
  Building2, 
  Train, 
  ExternalLink,
  Plus,
  Home as HomeIcon,
  BadgePercent,
  Layers,
  Sparkles
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import MarinaDivider from '../components/MarinaDivider';
import { AUTHOR_INFO } from '../data/rentalGuideData';
import { VELACHERY_GEO } from '../data/velacheryLandingPages';

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FAQItem({ q, a, idx }) {
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
        id={`faq-q-${idx}`}
        aria-controls={`faq-a-${idx}`}
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
            id={`faq-a-${idx}`}
            role="region"
            aria-labelledby={`faq-q-${idx}`}
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

// ─── Main VelacheryLandingPage Component ──────────────────────────────────────
export default function VelacheryLandingPage({ data }) {
  const reduce = useReducedMotion();

  if (!data) return null;

  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.chennairents.in/' },
    { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: 'https://www.chennairents.in/chennai/rentals' },
    { '@type': 'ListItem', position: 3, name: 'Velachery', item: 'https://www.chennairents.in/chennai/velachery' },
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
        latitude: VELACHERY_GEO.latitude,
        longitude: VELACHERY_GEO.longitude,
      },
      geoWithin: {
        '@type': 'GeoShape',
        box: `${VELACHERY_GEO.geoBoundingBox.south} ${VELACHERY_GEO.geoBoundingBox.west} ${VELACHERY_GEO.geoBoundingBox.north} ${VELACHERY_GEO.geoBoundingBox.east}`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Velachery',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
        postalCode: VELACHERY_GEO.pincode,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: data.priceRange.min,
        highPrice: data.priceRange.max,
        offerCount: 30,
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

  // Pre-grouped lateral link clusters for topical authority mesh
  const typologyLinks = [
    { label: '1RK Studio Rooms', slug: '1rk-for-rent-in-velachery' },
    { label: '1 BHK Flats', slug: '1bhk-flats-for-rent-in-velachery' },
    { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-velachery' },
    { label: '3 BHK Flats', slug: '3bhk-flats-for-rent-in-velachery' },
    { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-velachery' },
    { label: 'Furnished Flats', slug: 'furnished-flats-for-rent-in-velachery' },
  ];

  const demographicLinks = [
    { label: '1 BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-velachery' },
    { label: '2 BHK for Bachelors', slug: '2bhk-flats-for-bachelors-in-velachery' },
    { label: 'Bachelor Flats Hub', slug: 'flats-for-bachelors-in-velachery' },
    { label: '2 BHK for Family', slug: '2bhk-flats-for-family-in-velachery' },
    { label: '3 BHK for Family', slug: '3bhk-flats-for-family-in-velachery' },
    { label: 'Family Flats Hub', slug: 'flats-for-family-in-velachery' },
    { label: 'Co-Living in Velachery', slug: 'co-living-in-velachery' },
    { label: 'PG for Men', slug: 'pg-for-men-in-velachery' },
    { label: 'PG for Women', slug: 'pg-for-women-in-velachery' },
  ];

  const budgetLinks = [
    { label: 'Flats Under ₹10,000', slug: 'flats-for-rent-under-10000-in-velachery' },
    { label: 'Flats Under ₹15,000', slug: 'flats-for-rent-under-15000-in-velachery' },
    { label: 'Flats Under ₹20,000', slug: 'flats-for-rent-under-20000-in-velachery' },
  ];

  const southChennaiNeighbors = [
    { name: 'Adyar', slug: 'adyar' },
    { name: 'Thiruvanmiyur', slug: 'thiruvanmiyur' },
    { name: 'OMR IT Corridor', slug: 'omr' },
    { name: 'Perungudi', slug: 'perungudi' },
    { name: 'Guindy', slug: 'guindy' },
    { name: 'Madipakkam', slug: 'madipakkam' },
    { name: 'Medavakkam', slug: 'medavakkam' },
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: '#FAF6EE', color: 'var(--c-ink)', minHeight: '100vh', paddingBottom: '3.5rem' }}
      >
        {/* Top Accent Strip */}
        <div style={{ height: '3px', background: 'var(--c-ripon-red)', width: '100%' }} />

        {/* ── 1. HERO & BREADCRUMBS ── */}
        <header className="hero-sky-section" style={{ paddingTop: '1.75rem', paddingBottom: '2.25rem', borderBottom: '1px solid var(--c-border)' }}>
          <div className="container" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1rem' }}>
            {/* Breadcrumb Hierarchy */}
            <nav className="seo-breadcrumbs" aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--c-ink-light)', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Link to="/" style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/chennai/rentals" style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>Chennai Rentals</Link>
              <span aria-hidden="true">›</span>
              <Link to="/chennai/velachery" style={{ color: 'var(--c-ink-light)', textDecoration: 'none' }}>Velachery</Link>
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
                South Chennai Hub
              </span>
              <span style={{ 
                background: 'var(--c-temple-green)', 
                color: '#fff', 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px' 
              }}>
                ✓ Free Listing &amp; Follow Up
              </span>
              <span style={{ 
                background: '#FFFDF9', 
                color: 'var(--c-ink-muted)', 
                border: '1px solid var(--c-border)', 
                fontSize: '0.72rem', 
                fontWeight: 600, 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px' 
              }}>
                PIN 600042
              </span>
              <span style={{ 
                background: '#FFFDF9', 
                color: 'var(--c-marina-blue)', 
                border: '1px solid var(--c-border)', 
                fontSize: '0.72rem', 
                fontWeight: 600, 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px' 
              }}>
                GCC Zone 13
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

        {/* ── 2. QUICK FINANCIAL & INFRASTRUCTURE SNAPSHOT ── */}
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
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-ink)', marginTop: '0.2rem' }}>
                {data.depositNorm}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                Refundable standard
              </div>
            </div>

            <div style={{ borderRight: '1px solid var(--c-border-subtle)', paddingRight: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                OMR IT Corridor Transit
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-marina-blue)', marginTop: '0.2rem' }}>
                10 - 15 Mins
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                Ascendas / Ramanujan City
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                Water Supply Rating
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-temple-green)', marginTop: '0.2rem' }}>
                7.2 / 10 Reliability
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)', marginTop: '0.2rem' }}>
                MetroWater + Borewell
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. MAIN CONTENT BODY & DYNAMICS ── */}
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2.5rem' }}>

            {/* Neighborhood Pockets / Micro-Clusters */}
            {data.neighborhoodPockets && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <MapPin size={22} style={{ color: 'var(--c-ripon-red)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                    Prime Neighborhood Pockets & Micro-Markets
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                  {data.neighborhoodPockets.map((pocket, idx) => (
                    <div key={idx} style={{ 
                      background: '#FAF6EE', 
                      border: '1px solid var(--c-border-subtle)', 
                      borderRadius: '10px', 
                      padding: '1.15rem' 
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--c-ink)', marginBottom: '0.4rem' }}>
                        {pocket.name}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>
                        {pocket.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Prime Neighborhoods (Simple string text if no structured pockets) */}
            {data.primeNeighborhoods && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <MapPin size={22} style={{ color: 'var(--c-ripon-red)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                    Recommended Residential Enclaves in Velachery
                  </h2>
                </div>
                <p style={{ color: 'var(--c-ink-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                  {data.primeNeighborhoods}
                </p>
              </section>
            )}

            {/* Community Pockets if present */}
            {data.communityPockets && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Family Community Clusters & Pockets
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                  {data.communityPockets.map((p, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1.15rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--c-ink)', marginBottom: '0.4rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>{p.detail}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Pockets if present */}
            {data.popularPockets && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Popular Rental Corridors
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                  {data.popularPockets.map((p, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1.15rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--c-ink)', marginBottom: '0.4rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>{p.detail}</div>
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
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Velachery Rental Market Snapshot
                </h2>
                <p style={{ color: 'var(--c-ink-light)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Prevailing benchmarks across builder floors and residential societies in Velachery:
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF6EE', borderBottom: '2px solid var(--c-border)' }}>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink)', fontWeight: 700 }}>Unit Typology</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ripon-red)', fontWeight: 700 }}>Monthly Rent Range</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)', fontWeight: 700 }}>Typical Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.marketSnapshot.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--c-ink)' }}>{row.type}</td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>{row.rent}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)' }}>{row.deposit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {data.maintenanceNote && (
                  <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#FAF6EE', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>
                    💡 <strong>Maintenance Benchmark:</strong> {data.maintenanceNote}
                  </div>
                )}
              </section>
            )}

            {/* Inventory Types Table if present */}
            {data.inventoryTypes && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Available Inventory Configurations & Pricing
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF6EE', borderBottom: '2px solid var(--c-border)' }}>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink)', fontWeight: 700 }}>Configuration</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ripon-red)', fontWeight: 700 }}>Monthly Rent</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)', fontWeight: 700 }}>Deposit Expectation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.inventoryTypes.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--c-ink)' }}>{row.type}</td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>{row.rent}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)' }}>{row.deposit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Demographic Breakdown Table if present */}
            {data.demographicBreakdown && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Demographic Breakdown & Rates
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF6EE', borderBottom: '2px solid var(--c-border)' }}>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink)', fontWeight: 700 }}>Occupancy Profile</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ripon-red)', fontWeight: 700 }}>Monthly Rent Range</th>
                        <th style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)', fontWeight: 700 }}>Deposit Norm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.demographicBreakdown.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--c-ink)' }}>{row.type}</td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>{row.rent}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--c-ink-muted)' }}>{row.deposit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Key Advantages or Standard Features Grid */}
            {(data.keyAdvantages || data.standardFeatures) && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1.25rem' }}>
                  {data.keyAdvantages ? 'Key Living Advantages' : 'Standard Specifications & Features'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                  {(data.keyAdvantages || data.standardFeatures).map((item, idx) => (
                    <div key={idx} style={{ 
                      padding: '1.15rem', 
                      background: '#FAF6EE', 
                      border: '1px solid var(--c-border-subtle)', 
                      borderRadius: '10px' 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--c-temple-green)' }} />
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-ink)' }}>
                          {item.title}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Roommate Economics / Per-Person Sharing Cost Breakdown */}
            {data.roommateEconomics && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Roommate Economics & Split Calculations
                </h2>
                <p style={{ color: 'var(--c-ink-light)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Estimated monthly split for working roommates sharing an apartment in Velachery:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {data.roommateEconomics.map((item, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-light)', textTransform: 'uppercase', fontWeight: 600 }}>{item.metric}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-ripon-red)', marginTop: '0.3rem' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Financials Checklist if present */}
            {data.financials && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Financials & Expected Costs
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {data.financials.map((fin, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1rem' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--c-ink-light)', fontWeight: 600, textTransform: 'uppercase' }}>{fin.label}</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--c-ink)', marginTop: '0.25rem' }}>{fin.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Target Tenants Profile if present */}
            {data.targetTenants && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Ideal Tenant Profiles
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                  {data.targetTenants.map((t, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1.15rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--c-ink)', marginBottom: '0.4rem' }}>{t.title}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inventory Checklist if present */}
            {data.inventoryChecklist && (
              <section style={{ 
                background: '#FFFDF9', 
                border: '1px solid var(--c-border)', 
                borderRadius: '14px', 
                padding: '1.75rem',
                marginBottom: '1rem' 
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  Furnishing Inventory Checklist
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {data.inventoryChecklist.map((c, idx) => (
                    <div key={idx} style={{ background: '#FAF6EE', border: '1px solid var(--c-border-subtle)', borderRadius: '10px', padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.25rem' }}>{c.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 4. MONSOON READINESS & ELEVATION INTEL ── */}
            <section style={{ 
              background: '#FFFDF9', 
              border: '1px solid var(--c-border)', 
              borderRadius: '14px', 
              padding: '1.75rem',
              marginBottom: '1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Umbrella size={24} style={{ color: 'var(--c-marina-blue)' }} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--c-ink)', margin: 0 }}>
                  Monsoon Readiness & Elevation Guidance
                </h2>
              </div>
              <p style={{ color: 'var(--c-ink-muted)', lineHeight: 1.75, fontSize: '0.98rem', marginBottom: '1.25rem' }}>
                {data.monsoonReadiness || 'Micro-elevation is critical in Velachery. Following storm drain infrastructure upgrades by the Greater Chennai Corporation (GCC) along Velachery Main Road and 100 Feet Bypass Road, rainwater clearing efficiency has dramatically increased. When renting, prioritize properties with stilt parking raised at least 2.5 to 3 feet above road crest level.'}
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '1rem',
                background: '#FAF6EE',
                border: '1px solid var(--c-border-subtle)',
                borderRadius: '10px',
                padding: '1.25rem'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--c-temple-green)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    ✓ High-Ridge Pockets
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                    Dhandeeswaram Nagar, Vijaya Nagar elevated avenues, northern Tansi Nagar, and AGS Colony are naturally high ground.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--c-marina-blue)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    ⚡ Power & Inverter Backup
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                    Check if the building has a dedicated DG generator or if the unit comes wired with dual inverter bypass lines.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--c-ripon-red)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    🏗 Plinth Height Rule
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                    Always ensure the building entry ramp sits 2.5 to 3 feet above the asphalt road crest to protect parked vehicles.
                  </div>
                </div>
              </div>
            </section>

            {/* ── 5. DIRECT OWNER CTA BANNER ── */}
            <div style={{ 
              background: '#FFFDF9', 
              border: '2px dashed var(--c-border)', 
              borderRadius: '16px', 
              padding: '2rem 1.5rem', 
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <span style={{ 
                background: 'var(--c-sand-light)', 
                color: 'var(--c-ripon-red)', 
                fontSize: '0.78rem', 
                fontWeight: 700, 
                padding: '0.3rem 0.8rem', 
                borderRadius: '999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Direct Owner Connection • Free Listing &amp; Follow Up
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-ink)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                Browse Verified Direct Owner Homes in Velachery
              </h3>
              <p style={{ color: 'var(--c-ink-muted)', maxWidth: '620px', margin: '0 auto 1.5rem auto', lineHeight: 1.6, fontSize: '0.98rem' }}>
                Connect directly with property owners with free listing and follow up. View geo-tagged floor plans, street elevations, and direct owner WhatsApp contacts.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="/listings/index.html" 
                  className="btn-dark" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--c-ink)',
                    color: '#fff',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  <MapPin size={18} style={{ color: 'var(--c-auto-yellow)' }} />
                  <span>Open Velachery Map</span>
                </a>
                <a 
                  href="/listings/list-property.html" 
                  className="btn-red" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--c-ripon-red)',
                    color: '#fff',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  <Plus size={18} />
                  <span>List Your Property Free</span>
                </a>
              </div>
            </div>

            {/* Kolam Divider */}
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <MarinaDivider />
            </div>

            {/* ── 6. HIGH-INTENT FAQ SECTION ── */}
            {data.faqs && data.faqs.length > 0 && (
              <section style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
                  Frequently Asked Questions about {data.h1}
                </h2>
                <p style={{ color: 'var(--c-ink-light)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  Practical tenant queries answered based on verified ground-truth data from Velachery residents:
                </p>
                <div>
                  {data.faqs.map(({ q, a }, idx) => (
                    <FAQItem key={idx} q={q} a={a} idx={idx} />
                  ))}
                </div>
              </section>
            )}

            {/* ── 7. LATERAL INTERNAL LINKING MESH (SEO Topically Clustered) ── */}
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
                  Explore Velachery Rental Network
                </h2>
              </div>
              <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Navigate across configurations, bachelor/family typologies, budget brackets, and neighboring South Chennai residential pockets:
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
                      to={`/chennai/velachery/${item.slug}`}
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
                      to={`/chennai/velachery/${item.slug}`}
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
                      to={`/chennai/velachery/${item.slug}`}
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

              {/* Group D: Adjacent South Chennai Hubs */}
              <div>
                <h3 style={{ fontSize: '0.92rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Adjacent South Chennai Localities
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {southChennaiNeighbors.map((item) => (
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
            </section>

          </div>
        </div>
      </motion.div>
    </>
  );
}
