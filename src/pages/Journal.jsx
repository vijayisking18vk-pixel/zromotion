import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef?.current || document;
    const els = root.querySelectorAll('.cr-reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export const FEATURED = {
  id: 'featured',
  tag: 'MARKET INSIGHTS',
  title: "Navigating the Chennai Premium Rental Market: A Tenant's Guide",
  excerpt: 'Understanding maintenance clauses, deposit structures, and what to look for when touring a luxury property in South Chennai.',
  img: 'https://images.unsplash.com/photo-1577903808422-79010fc41961?w=1600&q=80&auto=format&fit=crop',
};

export const ARTICLES = [
  {
    id: 1,
    tag: 'ARCHITECTURE',
    title: 'The Return of the Courtyard House',
    excerpt: 'How traditional South Indian architectural forms are being reimagined in modern Chennai rentals.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    col: 'span 4',
    aspect: '3/4'
  },
  {
    id: 2,
    tag: 'LIFESTYLE',
    title: "ECR — Chennai's Most Desired Address",
    excerpt: 'Private beaches, buzzing cafes, and serene greenery.',
    img: 'https://images.unsplash.com/photo-1542665952-14513db15293?w=800&q=80&auto=format&fit=crop',
    col: 'span 4',
    aspect: '3/4'
  },
  {
    id: 3,
    tag: 'MARKET INSIGHTS',
    title: 'Reading a Premium Lease Agreement',
    excerpt: "Maintenance clauses, deposit norms, and what fair terms look like.",
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop',
    col: 'span 4',
    aspect: '3/4'
  },
  {
    id: 4,
    tag: 'INTERIORS',
    title: 'Furnishing a Rental: The Minimalist Way',
    excerpt: 'Natural textures, warm light, and negative space — elevating a blank canvas.',
    img: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=1200&q=80&auto=format&fit=crop',
    col: 'span 6',
    aspect: '16/9'
  },
  {
    id: 5,
    tag: 'NEIGHBOURHOOD',
    title: "Adyar vs Velachery",
    excerpt: "A candid comparison of two of Chennai's most competitive rental corridors.",
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop',
    col: 'span 3',
    aspect: '3/4'
  },
  {
    id: 6,
    tag: 'TENANT GUIDE',
    title: 'What Verified Really Means',
    excerpt: 'The difference between a property listed by an owner and one that is certified.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop',
    col: 'span 3',
    aspect: '3/4'
  },
];

const CATEGORIES = ['ALL', 'ARCHITECTURE', 'LIFESTYLE', 'MARKET INSIGHTS', 'INTERIORS', 'NEIGHBOURHOOD'];

export default function Journal() {
  const pageRef = useRef(null);
  const [activeCat, setActiveCat] = useState('ALL');
  useScrollReveal(pageRef);

  const filteredArticles = activeCat === 'ALL' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.tag === activeCat);

  const getGridSpan = (span) => window.innerWidth < 768 ? 'span 12' : span;

  return (
    <main ref={pageRef} className="cr-vogue-journal" style={{ background: 'var(--cr-bg)', minHeight: '100dvh', paddingBottom: 0 }}>
      
      {/* ── CATEGORY NAVIGATION (VOGUE STYLE) ── */}
      <nav style={{ 
        borderBottom: '2px solid var(--cr-ink)', 
        position: 'sticky', 
        top: '80px', // Below navbar
        background: 'var(--cr-bg)',
        zIndex: 40
      }}>
        <div className="cr-container" style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '1rem 0', scrollbarWidth: 'none', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-2xs)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: activeCat === cat ? 'var(--cr-gold)' : 'var(--cr-ink)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <div className="cr-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        
        {/* ── VOGUE TOP HERO + SIDEBAR LATEST ── */}
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '2rem',
          borderBottom: '4px solid var(--cr-ink)',
          paddingBottom: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* Main Featured (Left 8 cols) */}
          <div className="cr-reveal" style={{ gridColumn: getGridSpan('span 8') }}>
            <Link to={`/journal/${FEATURED.id}`} style={{ textDecoration: 'none', color: 'var(--cr-ink)', display: 'block', group: 'true' }}>
              <div style={{ overflow: 'hidden', aspectRatio: '16/10', marginBottom: '1.5rem' }}>
                <img 
                  src={FEATURED.img} 
                  alt={FEATURED.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <span style={{ 
                display: 'block',
                fontFamily: 'var(--font-ui)', 
                fontSize: 'var(--text-2xs)', 
                fontWeight: 700,
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: 'var(--cr-gold)', 
                marginBottom: '0.75rem'
              }}>
                {FEATURED.tag}
              </span>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--text-hero)', 
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: 'var(--cr-ink)'
              }}>
                {FEATURED.title}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xl)',
                color: 'var(--cr-ink-80)',
                lineHeight: 1.6,
                maxWidth: '600px'
              }}>
                {FEATURED.excerpt}
              </p>
            </Link>
          </div>

          {/* Sidebar Latest (Right 4 cols) */}
          <div className="cr-reveal cr-reveal--delay-1" style={{ gridColumn: getGridSpan('span 4'), display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--text-h3)', 
              borderBottom: '2px solid var(--cr-ink)', 
              paddingBottom: '0.5rem', 
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              color: 'var(--cr-ink)'
            }}>
              Latest
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {ARTICLES.slice(0, 3).map(a => (
                <Link key={a.id} to={`/journal/${a.id}`} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--cr-ink-20)', paddingBottom: '1.5rem' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                    <img src={a.img} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--cr-gold)', marginBottom: '0.25rem' }}>{a.tag}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 400, color: 'var(--cr-ink)', lineHeight: 1.2 }}>{a.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORIAL GRID ── */}
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
          }}>
            {filteredArticles.map((a, idx) => (
              <Link 
                key={a.id} 
                to={`/journal/${a.id}`} 
                className={`cr-reveal cr-reveal--delay-${(idx % 3) + 1}`}
                style={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  gridColumn: getGridSpan(a.col),
                  borderBottom: '2px solid var(--cr-ink)',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ overflow: 'hidden', marginBottom: '1rem', aspectRatio: a.aspect }}>
                  <img 
                    src={a.img} 
                    alt={a.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                    }} 
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div>
                  <span style={{ 
                    display: 'block',
                    fontFamily: 'var(--font-ui)', 
                    fontSize: 'var(--text-2xs)', 
                    fontWeight: 700,
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em', 
                    color: 'var(--cr-gold)',
                    marginBottom: '0.5rem'
                  }}>
                    {a.tag}
                  </span>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-h3)', 
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: 'var(--cr-ink)',
                    marginBottom: '0.5rem'
                  }}>
                    {a.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--cr-ink-80)',
                    lineHeight: 1.5
                  }}>
                    {a.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* ── INSTAGRAM VIDEO SECTION (VOGUE FOOTER STYLE) ── */}
      <section className="cr-reveal" style={{ borderTop: '4px solid var(--cr-ink)', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="cr-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--text-h2)', 
              fontWeight: 400,
              color: 'var(--cr-ink)',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              Social
            </h2>
            <a 
              href="https://www.instagram.com/chennairents.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--cr-gold)',
                textDecoration: 'none',
              }}
            >
              Follow @chennairents.in
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1px',
            background: 'var(--cr-ink)', // Creates 1px black borders between items
            border: '2px solid var(--cr-ink)'
          }}>
            {[
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
            ].map((img, i) => (
              <a key={i} href="https://www.instagram.com/chennairents.in/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', aspectRatio: '9/16', overflow: 'hidden', background: 'var(--cr-bg)' }}>
                <img 
                  src={img} 
                  alt="Instagram Reel" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--cr-ink)"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
