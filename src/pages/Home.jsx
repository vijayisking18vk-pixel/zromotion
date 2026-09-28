import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOCALITY_POSTS, GUIDE_POSTS } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, RiponBuildingDoodle, FilterCoffeeDoodle } from '../components/ChennaiDoodles';
import { 
  MapPin, 
  BookOpen, 
  Droplet, 
  Instagram
} from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main style={{ paddingBottom: '3rem' }}>
      
      {/* ── SEO JSON-LD & META INJECTION ── */}
      <SEOHead
        title="Chennai Rents: The Locality-First Rental Guide for Chennai"
        description="Chennai Rents is an honest, locality-first guide to renting homes in Chennai. Real 1 BHK, 2 BHK, 3 BHK rent rates, water scores, flood history, and Instagram vacant home reels."
        canonicalUrl="https://chennairents.in/"
        type="website"
      />

      {/* ── HERO BANNER MATCHING MOCK STYLE ── */}
      <section className="hero-sky-section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              alignItems: 'center',
              gap: '2rem'
            }}
            className="home-hero-grid"
          >
            <div style={{ maxWidth: '820px' }}>
              
              {/* Top Eyebrow */}
              <div className="tag-eyebrow">
                <span className="tag-bullet" />
                <span>CHENNAI RENTAL INTELLIGENCE • LOCALITY-FIRST</span>
              </div>

              {/* Main H1 Title */}
              <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
                Renting in Chennai: Locality by Locality
              </h1>

              {/* Subtitle in clean English */}
              <div style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '1.25rem' }}>
                The honest, ground-reality guide to finding a rental home in Chennai
              </div>

              {/* Intro copy */}
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  lineHeight: 1.65,
                  color: 'var(--c-ink-muted)',
                  maxWidth: '720px'
                }}
              >
                A practical, honest guide to rent rates, water reality, flood history, and daily living across Chennai neighborhoods. No fake listings, no brokers, and no tracking.
              </p>

              {/* Meta Editorial */}
              <div className="meta-editorial">
                OCTOBER 2026 • REGULARLY UPDATED • CHENNAI RENTS EDITORIAL
              </div>

            </div>

            {/* Right Numeral & Chennai Doodles */}
            <div className="home-numeral-col" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="editorial-numeral">
                CR
              </div>
              <AutoRickshawDoodle width={110} height={70} />
            </div>

          </div>
        </div>
      </section>

      {/* ── MARINA BEACH DIVIDER ── */}
      <MarinaDivider />

      {/* ── CHENNAI CULTURAL INTRO STRIP ── */}
      <div className="container" style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
        <div
          style={{
            backgroundColor: '#F8F5EE',
            border: '1px solid var(--c-border)',
            borderRadius: '8px',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', maxWidth: '680px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--c-auto-yellow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c-ink)',
                flexShrink: 0
              }}
            >
              <Instagram size={24} />
            </div>
            <div>
              <h3 style={{ color: 'var(--c-ink)', fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                Vacant homes are posted as Reels on our Instagram
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                Watch verified video walkthroughs of homes across Chennai neighborhoods. Follow <strong>{INSTAGRAM_HANDLE}</strong> to view real sunlight, parking, and street surroundings.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
            style={{ fontSize: '0.92rem', padding: '0.6rem 1.25rem' }}
          >
            <span>Follow {INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>

      {/* ── BLOG INDEX: LOCALITIES & GUIDES ── */}
      <section className="container" id="localities" style={{ paddingBlock: '1.5rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', color: 'var(--c-ink)' }}>
              Explore Chennai Localities & Guides
            </h2>
            <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.95rem' }}>
              Select a neighborhood or read essential rental advice
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              className={activeTab === 'all' ? 'btn-dark' : 'btn-yellow'}
              style={{ padding: '0.45rem 1rem', fontSize: '0.88rem', cursor: 'pointer' }}
            >
              All Articles ({LOCALITY_POSTS.length + GUIDE_POSTS.length})
            </button>
            <button
              onClick={() => setActiveTab('localities')}
              className={activeTab === 'localities' ? 'btn-dark' : 'btn-yellow'}
              style={{ padding: '0.45rem 1rem', fontSize: '0.88rem', cursor: 'pointer' }}
            >
              Localities ({LOCALITY_POSTS.length})
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={activeTab === 'guides' ? 'btn-dark' : 'btn-yellow'}
              style={{ padding: '0.45rem 1rem', fontSize: '0.88rem', cursor: 'pointer' }}
            >
              Guides ({GUIDE_POSTS.length})
            </button>
          </div>
        </div>

        {/* ── 1. LOCALITIES SECTION ── */}
        {(activeTab === 'all' || activeTab === 'localities') && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={22} color="var(--c-marina-blue)" />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--c-ink)' }}>
                  Chennai Localities
                </h3>
              </div>
              <RiponBuildingDoodle width={80} height={50} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {LOCALITY_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="content-card"
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="tag-eyebrow" style={{ marginBottom: 0 }}>
                      <span className="tag-bullet" /> {post.badge}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', fontWeight: 600 }}>
                      {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem', lineHeight: 1.25 }}>
                    <Link to={`/${post.slug}`} style={{ color: 'var(--c-ink)', textDecoration: 'none' }}>
                      {post.title.split(',')[0]}
                    </Link>
                  </h3>

                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.75rem' }}>
                    {post.subheading}
                  </p>

                  <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {post.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--c-border-subtle)', paddingTop: '0.85rem', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--c-temple-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Droplet size={14} /> Water Score: {post.waterReality?.score}
                    </span>
                    <Link to={`/${post.slug}`} className="btn-dark" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
                      Read Guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ── 2. RENTING GUIDES SECTION ── */}
        {(activeTab === 'all' || activeTab === 'guides') && (
          <div id="guides">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={22} color="var(--c-ripon-red)" />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--c-ink)' }}>
                  Renting Guides & Advice
                </h3>
              </div>
              <FilterCoffeeDoodle width={45} height={50} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {GUIDE_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="content-card"
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="tag-eyebrow" style={{ marginBottom: 0 }}>
                      <span className="tag-bullet" /> {post.badge}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)', fontWeight: 600 }}>
                      {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem', lineHeight: 1.25 }}>
                    <Link to={`/${post.slug}`} style={{ color: 'var(--c-ink)', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.75rem' }}>
                    {post.subheading}
                  </p>

                  <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {post.summary}
                  </p>

                  <div style={{ borderTop: '1px solid var(--c-border-subtle)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <Link to={`/${post.slug}`} className="btn-dark" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
                      Read Guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </section>

      <style>{`
        @media (min-width: 900px) {
          .home-hero-grid {
            grid-template-columns: 1fr 200px !important;
          }
          .home-numeral-col {
            display: flex !important;
          }
        }
      `}</style>

    </main>
  );
}
