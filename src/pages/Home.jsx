import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LOCALITY_POSTS, GUIDE_POSTS } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, HandDrawnArrow } from '../components/ChennaiDoodles';
import { MapPin, Plus, Compass, Instagram, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

const POST_CTA_MAP = {
  'rent-in-valasaravakkam': 'Explore Valasaravakkam',
  'rent-in-velachery': 'Explore Velachery',
  'rent-in-adyar': 'Explore Adyar',
  'advance-deposit-chennai': 'Read Deposit Guide',
  'tenant-rules-chennai': 'Read Agreement Rules',
  'how-to-write-rental-listing': 'Read Listing Playbook',
  'checklist-rental-advance': 'Read Advance Checklist',
  'how-to-list-flat-directly': 'Read Direct Listing Guide',
  'how-to-negotiate-rent': 'Read Negotiation Guide',
  'how-to-price-flat-fairly': 'Read Valuation Guide',
  'best-chennai-areas': 'Read Best Areas Guide',
  'broker-fee-vs-direct-owner': 'Read Broker Comparison',
  'cost-of-living-chennai-2026': 'Read Cost of Living Guide',
  'no-deposit-flats-chennai': 'Read Low Deposit Guide',
  'gated-vs-standalone': 'Read Gated vs Standalone',
  'localities-heating-up': 'Read Market Heatmap',
  'metro-access-rent-premiums': 'Read Metro Impact Report',
  'where-2bhk-moving-fastest': 'Read 2BHK Growth Report',
};

function getPostCta(post) {
  if (POST_CTA_MAP[post.slug]) return POST_CTA_MAP[post.slug];
  if (post.type === 'locality') {
    const name = post.slug.replace('rent-in-', '').split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    return `Explore ${name}`;
  }
  return `Read ${post.title.split(':')[0]}`;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const reduce = useReducedMotion();

  const filteredPosts = activeTab === 'all'
    ? [...LOCALITY_POSTS, ...GUIDE_POSTS].sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))
    : activeTab === 'localities' ? LOCALITY_POSTS : GUIDE_POSTS;

  const springConfig = { type: 'spring', stiffness: 300, damping: 22 };

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      style={{ paddingBottom: '3rem' }}
    >
      <SEOHead
        title="Chennai Rents: Locality-First Rental Guide for Chennai"
        description="Explore real rent rates, water reality, flood history, crowdsourced rental map, and verified direct owner listings in Chennai. Honest locality guides with free listing and follow up."
        canonical="https://www.chennairents.in/"
      />

      {/* ── HERO SECTION ── */}
      <section className="hero-sky-section">
        <div className="container home-hero-grid">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="meta-editorial">OCTOBER 2026 • REGULARLY UPDATED • CHENNAI RENTS EDITORIAL</div>
            <h1 style={{ marginTop: '0.75rem', marginBottom: '0.35rem' }}>
              Renting in Chennai: Locality by Locality
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--c-ripon-red)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1.15rem', lineHeight: 1.35 }}>
              The honest, crowdsourced guide to renting a home in Chennai locality by locality.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--c-ink-muted)', marginBottom: '1.75rem', maxWidth: '540px', lineHeight: 1.65 }}>
              Renting in Chennai made transparent. Real rent rates, tap-water scores, flood history, and verified owner connections curated across every Chennai locality with free listing and follow up.
            </p>

            {/* Hero Action Buttons — full-width on mobile, inline on desktop */}
            <div className="hero-cta-group">
              <a href="/listings/index.html" className="btn-dark hero-btn">
                <MapPin size={17} style={{ color: 'var(--c-auto-yellow)', flexShrink: 0 }} />
                <span>Explore Rent &amp; Buy Map</span>
              </a>
              <Link to="/chennai/rentals" className="btn-yellow hero-btn">
                <Compass size={17} style={{ flexShrink: 0 }} />
                <span>Browse 16 Localities</span>
              </Link>
              <a href="/listings/list-property.html" className="btn-red hero-btn">
                <Plus size={17} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span>List Property (Free Listing &amp; Follow Up)</span>
              </a>
            </div>
          </motion.div>

          {/* Decorative numeral column — desktop only */}
          <div className="home-numeral-col" style={{ position: 'relative', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              initial={false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
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

      {/* ── DUAL HIGHLIGHT SECTION: RENT MAP & LIST PROPERTY ── */}
      <section style={{ backgroundColor: 'var(--c-page-bg)', paddingBlock: '4rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span className="tag-eyebrow" style={{ display: 'inline-flex', marginBottom: '0.4rem' }}>
              <span className="tag-bullet" /> FREE LISTING &amp; FOLLOW UP
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              Direct Connection Between Tenants &amp; Property Owners
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Whether you are hunting for an honest rental or listing a vacant flat in Chennai, connect directly with complete transparency, free listing and follow up.
            </p>
          </div>

          {/* Cards — single col on mobile, 2-col on md+ */}
          <div className="home-cards-grid">
            {/* Card 1: Interactive Crowdsourced Map */}
            <div
              className="content-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--c-hero-sky)',
                    border: '1.5px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: 'var(--c-marina-blue)',
                  }}
                >
                  <MapPin size={22} />
                </div>

                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0 0 0.75rem 0', color: 'var(--c-ink)' }}>
                  Interactive Crowdsourced Rent Map
                </h3>
                <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.97rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Explore actual rent rates pinned anonymously by tenants across Anna Nagar, OMR, Velachery, and Adyar. Spot broker markups and discover verified owner listings.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', fontSize: '0.9rem', color: 'var(--c-ink)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>100% Anonymous</strong> crowdsourced tenant reports</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>Filter by Buy, Sell &amp; Rent</strong> with custom price brackets</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>Pin your own rent</strong> to build local transparency</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="/listings/index.html" className="btn-dark">
                  <span>Launch Live Map</span>
                  <ArrowRight size={15} />
                </a>
                <a href="/listings/listings.html" className="btn-yellow">
                  <Compass size={15} />
                  <span>Browse Listings</span>
                </a>
              </div>
            </div>

            {/* Card 2: Direct Owner Listing */}
            <div
              className="content-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: 'var(--c-border)',
                backgroundColor: 'var(--c-sand-light)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--c-card-bg)',
                      border: '1.5px solid var(--c-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--c-ripon-red)',
                    }}
                  >
                    <Building2 size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      backgroundColor: 'var(--c-auto-yellow)',
                      color: 'var(--c-ink)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    Direct Owner
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0 0 0.75rem 0', color: 'var(--c-ink)' }}>
                  List Your Property Directly
                </h3>
                <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.97rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Have an apartment, independent house, or shared room to rent or sell? Connect directly with verified prospective tenants and buyers across Chennai.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', fontSize: '0.9rem', color: 'var(--c-ink)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>Direct Inquiries</strong> via WhatsApp and Phone</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>Free Listing &amp; Follow Up</strong> on lease or sale</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-temple-green)', flexShrink: 0 }} />
                    <span><strong>Instant Free Submission</strong> with live map pinning</span>
                  </div>
                </div>
              </div>

              <div>
                <a href="/listings/list-property.html" className="btn-red">
                  <Plus size={16} strokeWidth={2.5} />
                  <span>List Property Free</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM COMMUNITY STRIP ── */}
      <section style={{ backgroundColor: 'var(--c-header-bg)', borderBottom: '1px solid var(--c-border)', paddingBlock: '2.25rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', justifyContent: 'center', maxWidth: '580px' }}>
            <HandDrawnArrow width={34} height={34} direction="right" style={{ display: 'inline-block', transform: 'translateY(4px)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: 0, color: 'var(--c-ink)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4 }}>
                Walk-through video tours of vacant homes are published on Instagram first.
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--c-ink-muted)' }}>
                Inspect natural light, layout, parking, and direct owner contact before visiting in person.
              </p>
            </div>
          </div>

          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
            whileHover={reduce ? {} : { y: -1 }}
            whileTap={reduce ? {} : { y: 0 }}
          >
            <Instagram size={17} />
            <span>Watch Video Tours on {INSTAGRAM_HANDLE}</span>
          </motion.a>
        </div>
      </section>

      {/* ── LOCALITIES & GUIDES INDEX ── */}
      <section id="localities" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
            <span className="tag-eyebrow" style={{ marginBottom: '0.4rem' }}>
              <span className="tag-bullet" /> HYPERLOCAL DIRECTORY
            </span>
            <h2 style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
              Explore Chennai Localities &amp; Practical Guides
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1rem', textAlign: 'center', maxWidth: '560px', margin: '0 0 1.25rem 0' }}>
              Rent benchmarks, groundwater realities, flood risk warnings, and local transit details.
            </p>

            {/* Filter Tabs — scroll-safe on small phones */}
            <div className="home-filter-tabs">
              {[
                { id: 'all', label: 'All Articles' },
                { id: 'localities', label: 'Localities' },
                { id: 'guides', label: 'Tenant Guides' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === id ? '#FFFFFF' : 'transparent',
                    boxShadow: activeTab === id ? '0 2px 6px rgba(30, 27, 24, 0.08)' : 'none',
                    color: activeTab === id ? 'var(--c-ink)' : 'var(--c-ink-muted)',
                    fontWeight: activeTab === id ? 800 : 600,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    minHeight: '36px',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid — 1 col mobile, 2 col md, 3 col lg */}
          <motion.div
            layout
            className="home-posts-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => {
                const targetUrl = post.type === 'story'
                  ? `/stories/${post.slug}`
                  : post.type === 'guide'
                  ? `/guides/${post.slug}`
                  : `/chennai/${post.slug.replace('rent-in-', '')}`;

                const cleanScore = post.waterReality?.score
                  ? String(post.waterReality.score).replace(/\s*\/\s*10\s*$/i, '')
                  : null;

                return (
                  <motion.article
                    layout
                    key={post.slug}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ ...springConfig, delay: reduce ? 0 : (idx % 6) * 0.04 }}
                    className="content-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span className="tag-eyebrow" style={{ margin: 0 }}>
                          <span className="tag-bullet" /> {post.badge || (post.type === 'locality' ? 'LOCALITY' : post.type === 'story' ? 'DATA STORY' : 'GUIDE')}
                        </span>
                        {cleanScore && (
                          <span className="stamp-badge stamp-blue" style={{ fontSize: '0.65rem' }}>
                            Water: {cleanScore}/10
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                        <Link to={targetUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </h3>

                      {post.subheading && (
                        <div style={{ color: 'var(--c-ripon-red)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                          {post.subheading}
                        </div>
                      )}

                      <p style={{ fontSize: '0.91rem', color: 'var(--c-ink-muted)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.65 }}>
                        {post.summary}
                      </p>

                      <Link
                        to={targetUrl}
                        className="btn-yellow"
                        aria-label={getPostCta(post)}
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: '0.85rem',
                          minHeight: '38px',
                          padding: '0.45rem 1rem',
                          borderRadius: '6px',
                        }}
                      >
                        <span>{getPostCta(post)}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── LOCALITY RENTAL & GROUND REALITY COMPARISON MATRIX ── */}
      <section style={{ backgroundColor: 'var(--c-sand-light)', paddingBlock: '3.75rem', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="tag-eyebrow" style={{ display: 'inline-flex', marginBottom: '0.4rem' }}>
              <span className="tag-bullet" /> EMPIRICAL BENCHMARKS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              Chennai Locality Rental &amp; Ground Reality Matrix
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Direct comparison of rental brackets, summer groundwater scores, and cyclonic flood history across top residential micro-markets.
            </p>
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '12px', border: '1.5px solid var(--c-border)', background: '#FFFFFF', boxShadow: '0 4px 16px rgba(30, 27, 24, 0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF6EE', borderBottom: '1.5px solid var(--c-border)' }}>
                  <th style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--c-ink)' }}>Locality</th>
                  <th style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--c-ink)' }}>Typical 2 BHK Rent</th>
                  <th style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--c-ink)' }}>Water Reality</th>
                  <th style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--c-ink)' }}>Flood Resilience</th>
                  <th style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--c-ink)' }}>Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Velachery', tag: 'South IT Corridor', rent: '₹18,000 - ₹26,000', water: '6.0 / 10', waterNote: 'Summer tanker reliance', flood: 'Moderate', floodNote: 'Low pockets require checking', slug: 'velachery' },
                  { name: 'Valasaravakkam', tag: 'West Residential Hub', rent: '₹15,000 - ₹22,000', water: '6.5 / 10', waterNote: 'CMWSSB sump + borewell', flood: 'Low to Moderate', floodNote: 'Safe near Kesavardhini', slug: 'valasaravakkam' },
                  { name: 'Adyar', tag: 'Coastal Prime', rent: '₹26,000 - ₹42,000', water: '8.0 / 10', waterNote: 'High coastal water table', flood: 'Low Risk', floodNote: 'Elevated coastal terrain', slug: 'adyar' },
                  { name: 'Sholinganallur', tag: 'OMR Tech Core', rent: '₹20,000 - ₹32,000', water: '5.5 / 10', waterNote: 'Gated RO + private tankers', flood: 'Moderate', floodNote: 'Link road surface run-off', slug: 'sholinganallur' },
                  { name: 'Porur', tag: 'DLF IT Corridor', rent: '₹16,000 - ₹24,000', water: '6.0 / 10', waterNote: 'Deep borewell reliance', flood: 'Moderate', floodNote: 'Avoid lake overflow alleys', slug: 'porur' },
                  { name: 'Anna Nagar', tag: 'North-Central Metro Hub', rent: '₹24,000 - ₹38,000', water: '7.5 / 10', waterNote: 'Grid CMWSSB supply', flood: 'Low Risk', floodNote: 'Engineered avenue drainage', slug: 'anna-nagar' },
                ].map((item, idx) => (
                  <tr key={item.slug} style={{ borderBottom: idx < 5 ? '1px solid var(--c-border)' : 'none', backgroundColor: idx % 2 === 1 ? 'rgba(250, 246, 238, 0.4)' : '#FFFFFF' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 800, color: 'var(--c-ink)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)' }}>{item.tag}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--c-ripon-red)' }}>{item.rent}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="stamp-badge stamp-blue" style={{ fontSize: '0.68rem', marginRight: '6px' }}>{item.water}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)' }}>{item.waterNote}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="stamp-badge stamp-yellow" style={{ fontSize: '0.68rem', marginRight: '6px' }}>{item.flood}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--c-ink-muted)' }}>{item.floodNote}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <Link
                        to={`/chennai/${item.slug}`}
                        aria-label={`View ${item.name} Locality Intelligence`}
                        className="btn-yellow"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', borderRadius: '6px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <span>View {item.name} Data</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RESEARCH METHODOLOGY & VERIFICATION SUMMARY ── */}
      <section style={{ backgroundColor: 'var(--c-page-bg)', paddingBlock: '3.75rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="tag-eyebrow" style={{ display: 'inline-flex', marginBottom: '0.4rem' }}>
              <span className="tag-bullet" /> EDITORIAL INTEGRITY
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              How Locality Rental Data is Verified
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Every rent index and livability score on Chennai Rents is grounded in real tenant disclosures and empirical neighborhood audits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="content-card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--c-hero-sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-marina-blue)', marginBottom: '1rem' }}>
                <CheckCircle2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                Empirical Lease Audits
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                Rental brackets are compiled from actual tenant submissions cross-referenced against closed rental agreements, filtering out inflated broker asking quotes.
              </p>
            </div>

            <div className="content-card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--c-sand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-auto-yellow-dk)', marginBottom: '1rem' }}>
                <Building2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                Ground-Truth Water Audits
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                We track CMWSSB piped water frequency, borewell depth reliability, and peak summer private tanker reliance street-by-street.
              </p>
            </div>

            <div className="content-card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FAF2F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ripon-red)', marginBottom: '1rem' }}>
                <MapPin size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                Micro-Pocket Flood Mapping
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                Elevation vulnerabilities are derived from actual street stagnation levels recorded during Cyclone Michaung and heavy monsoon events.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/methodology" className="btn-dark">
              <span>View Full Data Methodology</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/verification" className="btn-yellow">
              <span>View Listing Verification Framework</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VERIFIED COMMUNITY EXPERIENCES ── */}
      <section style={{ backgroundColor: 'var(--c-sand-light)', paddingBlock: '3.75rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="tag-eyebrow" style={{ display: 'inline-flex', marginBottom: '0.4rem' }}>
              <span className="tag-bullet" /> COMMUNITY EXPERIENCES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              Direct Rentals Across Chennai
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Real Chennai tenants and homeowners connecting directly with free listing and follow up.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            <div className="content-card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="tag-eyebrow" style={{ color: 'var(--c-marina-blue)', marginBottom: '0.75rem', display: 'inline-block' }}>
                  TENANT EXPERIENCE • PORUR
                </span>
                <p style={{ fontSize: '0.96rem', color: 'var(--c-ink)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "Finding an honest 2 BHK near DLF IT Park without paying extra fees seemed impossible until we checked direct owner listings here. We connected with the landlord directly, verified the lease terms, and moved in within a week."
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--c-ink)' }}>Karthik Subramanian</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-muted)' }}>IT Professional, DLF Cybercity</div>
                </div>
                <span className="stamp-badge stamp-green" style={{ fontSize: '0.68rem' }}>Free Listing &amp; Follow Up</span>
              </div>
            </div>

            <div className="content-card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="tag-eyebrow" style={{ color: 'var(--c-temple-green)', marginBottom: '0.75rem', display: 'inline-block' }}>
                  OWNER EXPERIENCE • VALASARAVAKKAM
                </span>
                <p style={{ fontSize: '0.96rem', color: 'var(--c-ink)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "Listing our first-floor flat in Kesavardhini Nagar directly saved us weeks of duplicate broker inquiries. Genuine tenants reached out via WhatsApp, we verified their employment credentials, and completed the rental agreement smoothly."
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--c-ink)' }}>S. Lakshmi Narayanan</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-muted)' }}>Independent Property Owner</div>
                </div>
                <span className="stamp-badge stamp-green" style={{ fontSize: '0.68rem' }}>Direct Tenant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive layout styles scoped to this page */}
      <style>{`
        /* Hero CTA buttons: full-width stacked on mobile, inline on md+ */
        .hero-cta-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }
        .hero-btn {
          width: 100%;
          justify-content: center;
        }
        @media (min-width: 480px) {
          .hero-cta-group {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .hero-btn {
            width: auto;
            justify-content: flex-start;
          }
        }

        /* Cards grid: 1 col mobile, 2 col tablet, auto-fill desktop */
        .home-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .home-cards-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        /* Posts grid: 1 col mobile, 2 col tablet, 3 col desktop */
        .home-posts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 560px) {
          .home-posts-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }
        @media (min-width: 900px) {
          .home-posts-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.75rem;
          }
        }

        /* Filter tabs: pill group, scroll-safe */
        .home-filter-tabs {
          display: flex;
          gap: 0.35rem;
          background: var(--c-sand-light);
          padding: 0.35rem;
          border-radius: 8px;
          border: 1.5px solid var(--c-border);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          max-width: 100%;
        }
        .home-filter-tabs::-webkit-scrollbar { display: none; }
      `}</style>
    </motion.main>
  );
}
