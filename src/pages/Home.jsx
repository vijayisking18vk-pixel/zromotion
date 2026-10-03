import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LOCALITY_POSTS, GUIDE_POSTS } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, HandDrawnArrow } from '../components/ChennaiDoodles';
import { MapPin, Plus, Compass, Instagram, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const reduce = useReducedMotion();

  const filteredPosts = activeTab === 'all'
    ? [...LOCALITY_POSTS, ...GUIDE_POSTS].sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))
    : activeTab === 'localities' ? LOCALITY_POSTS : GUIDE_POSTS;

  const springConfig = { type: 'spring', stiffness: 300, damping: 22 };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      style={{ paddingBottom: '3rem' }}
    >
      <SEOHead
        title="Chennai Rents: The Locality-First Rental & Home Guide for Chennai"
        description="Real rent rates, water reality, flood history, crowdsourced map, and verified direct owner listings in Chennai. Neighborhood by neighborhood."
        canonical="https://www.chennairents.in/"
      />

      {/* ── HERO SECTION ── */}
      <section className="hero-sky-section">
        <div className="container home-hero-grid">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="meta-editorial">OCTOBER 2026 • REGULARLY UPDATED • CHENNAI RENTS EDITORIAL</div>
            <h1 style={{ marginTop: '0.75rem', marginBottom: '0.35rem' }}>
              Renting in Chennai: Locality by Locality
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--c-ripon-red)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1.15rem', lineHeight: 1.35 }}>
              The honest, crowdsourced guide to finding a home in Chennai.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--c-ink-muted)', marginBottom: '1.75rem', maxWidth: '540px', lineHeight: 1.65 }}>
              Real rent rates, tap-water scores, flood history, and verified owner connections. Curated neighborhood by neighborhood with zero broker commissions.
            </p>

            {/* Hero Action Buttons — full-width on mobile, inline on desktop */}
            <div className="hero-cta-group">
              <a href="/listings/index.html" className="btn-dark hero-btn">
                <MapPin size={17} style={{ color: 'var(--c-auto-yellow)', flexShrink: 0 }} />
                <span>Explore Rent &amp; Buy Map</span>
              </a>
              <a href="/listings/list-property.html" className="btn-red hero-btn">
                <Plus size={17} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span>List Property (0% Broker)</span>
              </a>
            </div>
          </motion.div>

          {/* Decorative numeral column — desktop only */}
          <div className="home-numeral-col" style={{ position: 'relative', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              initial={reduce ? false : { scale: 0.85, opacity: 0 }}
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
              <span className="tag-bullet" /> ZERO BROKER RENTALS &amp; SALES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              Direct Connection Between Tenants &amp; Property Owners
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
              Whether you are hunting for an honest rental or listing a vacant flat in Chennai, connect directly with complete transparency and zero middleman fees.
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
                  <span>Browse Feed</span>
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
                    <span><strong>Zero Broker Commission</strong> on lease or sale</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', justifyContent: 'center' }}>
            <HandDrawnArrow width={34} height={34} direction="right" style={{ display: 'inline-block', transform: 'translateY(4px)', flexShrink: 0 }} />
            <h3 style={{ margin: 0, color: 'var(--c-ink)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4 }}>
              Vacant verified homes are posted as Reels on Instagram first.
            </h3>
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
            <span>Follow {INSTAGRAM_HANDLE}</span>
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
                const targetUrl = post.type === 'guide'
                  ? `/guides/${post.slug}`
                  : `/chennai/${post.slug.replace('rent-in-', '')}`;

                return (
                  <motion.article
                    layout
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
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
                          <span className="tag-bullet" /> {post.badge || (post.type === 'locality' ? 'LOCALITY' : 'GUIDE')}
                        </span>
                        {post.waterReality?.score && (
                          <span className="stamp-badge stamp-blue" style={{ fontSize: '0.65rem' }}>
                            Water: {post.waterReality.score}/10
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
                        style={{
                          alignSelf: 'flex-start',
                          fontSize: '0.85rem',
                          minHeight: '38px',
                          padding: '0.45rem 1rem',
                          borderRadius: '6px',
                        }}
                      >
                        <span>Explore {post.type === 'guide' ? 'Guide' : 'Locality'}</span>
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
