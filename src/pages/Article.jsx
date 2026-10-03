import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ARTICLES, FEATURED } from './Journal';

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  
  const article = id === 'featured' 
    ? FEATURED 
    : ARTICLES.find(a => a.id.toString() === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const root = pageRef?.current || document;
    const els = root.querySelectorAll('.cr-reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  if (!article) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cr-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--cr-ink)' }}>Article Not Found</h1>
          <button onClick={() => navigate('/')} style={{ marginTop: '2rem', background: 'none', border: 'none', borderBottom: '2px solid var(--cr-ink)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer' }}>Return to Latest</button>
        </div>
      </div>
    );
  }

  const relatedArticles = ARTICLES.filter(a => a.id.toString() !== id).slice(0, 4);
  const sidebarArticles = ARTICLES.filter(a => a.id.toString() !== id).slice(0, 5);

  return (
    <main ref={pageRef} className="cr-vogue-article" style={{ background: 'var(--cr-bg)', minHeight: '100dvh', paddingBottom: 0 }}>
      
      {/* ── ARTICLE MASTHEAD ── */}
      <header style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '3rem', textAlign: 'center' }} className="cr-container cr-reveal">
        <span style={{ 
          display: 'block',
          fontFamily: 'var(--font-ui)', 
          fontSize: 'var(--text-2xs)', 
          fontWeight: 700,
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--cr-gold)',
          marginBottom: '1.5rem'
        }}>
          {article.tag}
        </span>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-h1)', 
          fontWeight: 400,
          color: 'var(--cr-ink)',
          lineHeight: 1.05,
          maxWidth: '1000px',
          margin: '0 auto 2rem'
        }}>
          {article.title}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xl)',
          color: 'var(--cr-ink-80)',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {article.excerpt}
        </p>
      </header>

      {/* ── HERO IMAGE ── */}
      <section className="cr-reveal cr-reveal--delay-1 cr-container" style={{ marginBottom: '4rem' }}>
        <div style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden', borderTop: '4px solid var(--cr-ink)', borderBottom: '4px solid var(--cr-ink)', padding: '4px 0' }}>
          <img 
            src={article.img} 
            alt={article.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* ── ARTICLE CONTENT & SIDEBAR ── */}
      <section className="cr-container cr-reveal" style={{ paddingBottom: '4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '4rem'
        }}>
          
          {/* Main Article Body (Left 8 cols) */}
          <div style={{ gridColumn: window.innerWidth < 1024 ? 'span 12' : 'span 8' }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--cr-ink)',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <p>
                <span style={{ float: 'left', fontSize: 'var(--text-hero)', lineHeight: '0.7', paddingTop: '0.5rem', paddingRight: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--cr-ink)' }}>T</span>
                he landscape of premium rentals in South Chennai is shifting. What was once a market dominated by 
                heavy deposits and opaque negotiations has transformed into a transparent, service-driven experience for those who know where to look. 
                Whether you are exploring the coastal serenity of the East Coast Road or the bustling heart of city central, understanding the nuances of the leasing market is paramount.
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--cr-ink)', margin: '2rem 0 1rem', fontWeight: 400 }}>The Role of Architecture</h2>
              <p>
                Modern living in Chennai is an exercise in balancing heritage with contemporary minimalism. We see a resurgence of 
                traditional elements (courtyards, Athangudi tiles, and cross-ventilation) married seamlessly with high-end modern amenities. 
                When inspecting a luxury property, pay close attention to how natural light moves through the space. The best homes in Chennai 
                are designed to remain cool, maximizing the sea breeze while providing a sanctuary from the city.
              </p>
              
              {/* Massive In-Article Image Pullout */}
              <div style={{ margin: '3rem -2rem', borderTop: '1px solid var(--cr-ink-20)', borderBottom: '1px solid var(--cr-ink-20)', padding: '1rem 0' }}>
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" 
                  alt="Interior Detail" 
                  style={{ width: '100%', objectFit: 'cover', aspectRatio: '16/9' }} 
                />
                <span style={{ display: 'block', marginTop: '1rem', fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--cr-ink-50)', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Natural light flowing through a coastal villa.
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--cr-ink)', margin: '1rem 0', fontWeight: 400 }}>Leasing with Confidence</h2>
              <p>
                A true premium lease agreement protects both the homeowner and the resident. Standard terms now often include clear maintenance 
                SLAs, transparent deposit structures, and strict privacy clauses. Always ensure that property management is handled by a dedicated 
                team rather than an absentee landlord, guaranteeing that your standard of living is maintained throughout your tenure.
              </p>
            </div>
            
            {/* Social Share / Back */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid var(--cr-ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', color: 'var(--cr-ink)' }}>
                ← Back
              </button>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cr-gold)' }}>Share Article</span>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Right 4 cols) */}
          <div style={{ gridColumn: window.innerWidth < 1024 ? 'span 12' : 'span 4' }}>
            <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--text-h3)', 
                borderBottom: '2px solid var(--cr-ink)', 
                paddingBottom: '0.5rem', 
                marginBottom: '2rem',
                textTransform: 'uppercase',
                color: 'var(--cr-ink)'
              }}>
                Trending
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sidebarArticles.map((a, i) => (
                  <Link key={a.id} to={`/journal/${a.id}`} style={{ textDecoration: 'none', borderBottom: '1px solid var(--cr-ink-10)', paddingBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ flexShrink: 0, width: '40px', fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--cr-ink-20)', fontStyle: 'italic', lineHeight: 1 }}>
                      {i + 1}
                    </div>
                    <div>
                      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--cr-gold)', marginBottom: '0.25rem' }}>{a.tag}</span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--cr-ink)', lineHeight: 1.25 }}>{a.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--cr-ink-20)', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--cr-ink)' }}>The Weekly Newsletter</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--cr-ink-50)', marginBottom: '1.5rem' }}>The latest in architecture, lifestyle, and premium renting.</p>
                <button style={{ width: '100%', padding: '1rem', background: 'var(--cr-ink)', color: 'var(--cr-bg)', border: 'none', fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── RELATED STORIES (VOGUE FOOTER GRID) ── */}
      <section className="cr-reveal" style={{ borderTop: '4px solid var(--cr-ink)', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="cr-container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--cr-ink)', marginBottom: '2rem', textTransform: 'uppercase', textAlign: 'center' }}>
            More from Chennai Rents
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            borderTop: '2px solid var(--cr-ink)',
            paddingTop: '2rem'
          }}>
            {relatedArticles.map(a => (
              <Link 
                key={a.id} 
                to={`/journal/${a.id}`} 
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div style={{ overflow: 'hidden', aspectRatio: '3/4', marginBottom: '1rem' }}>
                  <img 
                    src={a.img} 
                    alt={a.title} 
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
                  marginBottom: '0.5rem'
                }}>
                  {a.tag}
                </span>
                <h3 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-xl)', 
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: 'var(--cr-ink)',
                }}>
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
