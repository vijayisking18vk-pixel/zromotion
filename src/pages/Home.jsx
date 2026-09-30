import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LOCALITY_POSTS, GUIDE_POSTS } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, RiponBuildingDoodle, FilterCoffeeDoodle, HandDrawnArrow } from '../components/ChennaiDoodles';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const reduce = useReducedMotion();
  
  const filteredPosts = activeTab === 'all' 
    ? [...LOCALITY_POSTS, ...GUIDE_POSTS].sort((a,b) => b.updatedDate.localeCompare(a.updatedDate))
    : activeTab === 'localities' ? LOCALITY_POSTS : GUIDE_POSTS;

  const springConfig = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{ paddingBottom: '3rem' }}
    >
      <SEOHead 
        title="Chennai Rents: The Locality-First Rental Guide for Chennai"
        description="Real rent rates, water reality, flood history, and vacant home video tours in Chennai. Neighborhood by neighborhood, no brokers, no fake listings."
      />

      {/* ── HERO SECTION ── */}
      <section className="hero-sky-section">
        <div className="container home-hero-grid">
          
          <motion.div 
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '580px' }}
          >
            <div className="meta-editorial">OCTOBER 2026 • REGULARLY UPDATED • CHENNAI RENTS EDITORIAL</div>
            <h1 style={{ marginTop: '0.75rem', marginBottom: '0.25rem' }}>
              Renting in Chennai: Locality by Locality
            </h1>
            <p style={{ fontSize: '1.3rem', color: 'var(--c-ripon-red)', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
              The honest guide to finding a rental home in Chennai.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--c-ink-muted)', marginBottom: '1.5rem', maxWidth: '540px' }}>
              Real rent rates, water reality, flood history, and Instagram reels of vacant homes. Neighborhood by neighborhood, no brokers, no fake listings.
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

      {/* ── BROWSE LISTINGS CTA STRIP ── */}
      <section style={{ backgroundColor: '#0d0d0d', paddingBlock: '3rem', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>Direct Owner Rentals Map</h2>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '1rem' }}>
            Browse actual rent rates shared by tenants, and contact flat owners directly with zero broker fees.
          </p>
          <a
            href="/listings/"
            style={{
              backgroundColor: '#ff3e00',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 8px 24px rgba(255, 62, 0, 0.4)',
              display: 'inline-block'
            }}
          >
            Launch Interactive Map
          </a>
        </div>
      </section>

      {/* ── INSTAGRAM CALLOUT STRIP ── */}
      <section style={{ backgroundColor: 'var(--c-sand-light)', borderBottom: '1px solid var(--c-border)', borderTop: '1px solid var(--c-border)', paddingBlock: '2.5rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <HandDrawnArrow width={40} height={40} direction="right" style={{ display: 'inline-block', transform: 'translateY(5px)' }} />
            <h3 style={{ margin: 0, color: 'var(--c-ink)', fontSize: '1.15rem' }}>Vacant homes are posted as Reels on Instagram first.</h3>
          </div>
          
          <motion.a 
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark instagram-pulse"
            style={{ borderRadius: '30px', paddingInline: '1.5rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={18} />
            <span>Follow {INSTAGRAM_HANDLE}</span>
          </motion.a>
          
        </div>
      </section>

      {/* ── INDEX SECTION ── */}
      <section id="localities" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ textAlign: 'center' }}>Explore Chennai Localities & Guides</h2>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--c-sand-light)', padding: '0.4rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid var(--c-border)' }}>
              {['all', 'localities', 'guides'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTab === tab ? '#FFFFFF' : 'transparent',
                    boxShadow: activeTab === tab ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    color: activeTab === tab ? 'var(--c-ink)' : 'var(--c-ink-light)',
                    fontWeight: activeTab === tab ? 700 : 500,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.75rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => {
                const rotations = [-0.5, 0.3, -0.2, 0.4, -0.3, 0.2];
                const rotation = rotations[idx % 6];
                
                return (
                  <motion.article
                    layout
                    key={post.slug}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ ...springConfig, delay: reduce ? 0 : (idx % 8) * 0.05 }}
                    viewport={{ once: true, amount: 0.1 }}
                    whileHover={reduce ? {} : { y: -5, boxShadow: '0 12px 32px rgba(30,27,24,0.08)' }}
                    className="content-card"
                    style={{ display: 'flex', flexDirection: 'column', transform: `rotate(${rotation}deg)` }}
                  >

                    
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span className="tag-eyebrow" style={{ margin: 0 }}>
                          <span className="tag-bullet" /> {post.badge || (post.type === 'locality' ? 'LOCALITY' : 'GUIDE')}
                        </span>
                        {post.waterReality?.score && (
                          <span className="stamp-badge stamp-blue" style={{ fontSize: '0.65rem' }}>💧 {post.waterReality.score}/10</span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
                        <Link to={`/${post.type === 'guide' ? 'guide' : 'rent'}/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      {post.subheading && (
                        <div style={{ color: 'var(--c-ripon-red)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                          {post.subheading}
                        </div>
                      )}
                      
                      <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                        {post.summary}
                      </p>

                      <Link 
                        to={`/${post.type === 'guide' ? 'guide' : 'rent'}/${post.slug}`} 
                        className="btn-yellow"
                        style={{ alignSelf: 'flex-start', fontSize: '0.85rem', minHeight: '38px', padding: '0.4rem 1rem' }}
                      >
                        Read {post.type === 'guide' ? 'Guide' : 'Locality'} →
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
      
    </motion.main>
  );
}
