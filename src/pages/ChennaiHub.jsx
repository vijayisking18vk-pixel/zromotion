import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Train } from 'lucide-react';
import { LOCALITIES, ZONES, getLocalitiesByZone, generateSEOMeta } from '../data/localities';
import { GUIDE_POSTS } from '../data/posts';
import SEOHead from '../components/SEOHead';
import MarinaDivider from '../components/MarinaDivider';
import { AutoRickshawDoodle } from '../components/ChennaiDoodles';

// ─── Locality Card ─────────────────────────────────────────────────────────────
function LocalityCard({ locality, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Link
        to={`/chennai/${locality.slug}`}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          className="content-card"
          style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
            <span className="tag-eyebrow" style={{ margin: 0 }}>
              <span className="tag-bullet" />
              {locality.zone === 'south' ? 'South' : locality.zone === 'west' ? 'West' : locality.zone === 'central' ? 'Central' : 'Chennai'}
            </span>
            {locality.waterReality?.score && (
              <span className="stamp-badge stamp-blue" style={{ fontSize: '0.65rem' }}>
                💧 {locality.waterReality.score}/10
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--c-ink)' }}>
            {locality.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', flex: 1, marginBottom: '1rem' }}>
            {locality.tagline}
          </p>

          {/* Rent range preview */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {locality.rentRanges.slice(0, 2).map((r, i) => (
              <span key={i} style={{
                fontSize: '0.75rem', fontWeight: 700,
                background: 'var(--c-sand-light)',
                border: '1px solid var(--c-border)',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                color: 'var(--c-ripon-red)',
                whiteSpace: 'nowrap',
              }}>
                {r.bhk}: {r.range.split('–')[0]}+
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-marina-blue)' }}>
            View rentals in {locality.name} <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Zone Section ─────────────────────────────────────────────────────────────
function ZoneSection({ zone }) {
  const localities = getLocalitiesByZone(zone.id);
  if (!localities.length) return null;
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>{zone.name}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, background: 'var(--c-auto-yellow)', color: 'var(--c-ink)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
          {localities.length} localities
        </span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {localities.map((loc, i) => (
          <LocalityCard key={loc.slug} locality={loc} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── BHK Hub Links ────────────────────────────────────────────────────────────
function BHKHubs() {
  const hubs = [
    { bhk: '1', label: '1 BHK Flats for Rent in Chennai', sub: '₹7,000 – ₹20,000', slug: '1-bhk-for-rent' },
    { bhk: '2', label: '2 BHK Flats for Rent in Chennai', sub: '₹12,000 – ₹40,000', slug: '2-bhk-for-rent' },
    { bhk: '3', label: '3 BHK Flats for Rent in Chennai', sub: '₹20,000 – ₹75,000+', slug: '3-bhk-for-rent' },
    { bhk: 'PG', label: 'PG Accommodation in Chennai', sub: '₹4,000 – ₹12,000/person', slug: 'pg' },
  ];
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.25rem' }}>Browse by Property Type</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {hubs.map(({ bhk, label, sub, slug }) => (
          <Link key={slug} to={`/chennai/${slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff',
              border: '1.5px solid var(--c-border)',
              borderRadius: '8px',
              padding: '1.15rem 1.25rem',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-auto-yellow)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(30,27,24,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--c-ripon-red)', marginBottom: '0.35rem' }}>
                {bhk}
              </div>
              <div style={{ fontWeight: 700, color: 'var(--c-ink)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {label.split(' in ')[0]}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)' }}>{sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Main ChennaiHub Component ────────────────────────────────────────────────
export default function ChennaiHub() {
  const reduce = useReducedMotion();
  const meta = generateSEOMeta({ city: 'Chennai' });
  const activezones = ZONES.filter(z => getLocalitiesByZone(z.id).length > 0);

  // JSON-LD breadcrumb
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: 'https://chennairents.in/' },
      { '@type': 'ListItem', position: 2, name: 'Flats for Rent in Chennai', item: 'https://chennairents.in/chennai/rentals' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Flats & Houses for Rent in Chennai | Chennai Rents"
        description="Find flats, houses, and PG for rent in Chennai. Explore locality-by-locality rent guides, real rent rates, water reports, and flood history. No brokerage."
        robots="index, follow"
        canonical="https://chennairents.in/chennai/rentals"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        style={{ paddingBottom: '3rem' }}
      >
        {/* ── HERO ── */}
        <section className="hero-sky-section">
          <div className="container home-hero-grid">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '580px' }}
            >
              <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">Chennai Rentals</span>
              </nav>
              <div className="meta-editorial" style={{ marginTop: '0.75rem' }}>OCTOBER 2026 • LOCALITY-FIRST • CHENNAI RENTS</div>
              <h1 style={{ marginTop: '0.65rem' }}>Flats & Houses for Rent in Chennai</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--c-ripon-red)', fontWeight: 600, marginBottom: '1rem' }}>
                Real rent rates. Honest water reports. Flood history. Locality by locality.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--c-ink-muted)', maxWidth: '520px' }}>
                Chennai Rents covers {LOCALITIES.length}+ localities with genuine ground-truth data on rent ranges, Metro Water supply, flood risk, and commute times — no brokerage, no fake listings.
              </p>
            </motion.div>

            <div className="home-numeral-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                initial={reduce ? false : { scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <span className="editorial-numeral">CR</span>
              </motion.div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-10px' }}>
                <AutoRickshawDoodle width={110} height={70} />
              </div>
            </div>
          </div>
        </section>

        <MarinaDivider variant="default" />

        <div className="container" style={{ paddingTop: '2.5rem' }}>
          {/* BHK Hubs */}
          <BHKHubs />

          {/* Zone-based locality grid */}
          {activezones.map(zone => (
            <ZoneSection key={zone.id} zone={zone} />
          ))}

          {/* Guides strip */}
          <section style={{ marginTop: '1rem' }}>
            <h2 style={{ marginBottom: '1.25rem' }}>Chennai Renting Guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {GUIDE_POSTS.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="content-card"
                  style={{ padding: '1.25rem' }}
                >
                  <span className="tag-eyebrow" style={{ margin: 0, marginBottom: '0.65rem', display: 'block' }}>
                    <span className="tag-bullet" />
                    {post.badge || 'GUIDE'}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    <Link to={`/guide/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{post.summary}</p>
                  <Link to={`/guide/${post.slug}`} className="btn-yellow" style={{ fontSize: '0.82rem', minHeight: '36px', padding: '0.4rem 0.9rem', alignSelf: 'flex-start' }}>
                    Read Guide →
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}
