import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES, FEATURED } from './Journal';

export default function Article() {
  const { id } = useParams();
  const pageRef = useRef(null);
  
  const article = id === 'featured' 
    ? FEATURED 
    : ARTICLES.find(a => a.id.toString() === id);

  // Reveal animation for article elements
  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.cr-reveal');
    if (!els || !els.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  if (!article) {
    return (
      <main className="cr-journal-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cr-ink)', marginBottom: '1rem' }}>Article Not Found</h1>
          <Link to="/journal" className="cr-btn cr-btn--gold" style={{ display: 'inline-block', padding: '0.8rem 1.5rem' }}>Back to Journal</Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="cr-article-page" style={{ background: 'var(--cr-bg)', minHeight: '100vh' }}>
      
      {/* ── ARTICLE HEADER ── */}
      <header style={{ 
        paddingTop: 'calc(var(--nav-height) + clamp(4rem, 8vw, 7rem))',
        paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center'
      }}>
        <div className="cr-container" style={{ maxWidth: '800px' }}>
          <Link to="/journal" className="cr-eyebrow cr-reveal" style={{ display: 'inline-block', marginBottom: '2rem', textDecoration: 'none', color: 'var(--cr-ink-80)' }}>
            ← Back to Journal
          </Link>
          <div className="cr-reveal cr-reveal--delay-1" style={{ marginBottom: '1.5rem', color: 'var(--cr-gold)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {article.tag || article.meta} {article.date && ` · ${article.date}`}
          </div>
          <h1 className="cr-reveal cr-reveal--delay-2" style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            lineHeight: 1.1, 
            color: 'var(--cr-ink)',
            marginBottom: '1.5rem'
          }}>
            {article.title}
          </h1>
          <p className="cr-reveal cr-reveal--delay-3" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            color: 'var(--cr-ink-80)',
            lineHeight: 1.7,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {article.excerpt}
          </p>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <section className="cr-reveal cr-reveal--delay-4" style={{ padding: '0 5%', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', overflow: 'hidden', borderRadius: '4px' }}>
          <img 
            src={article.img} 
            alt={article.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ── ARTICLE BODY (MOCK CONTENT) ── */}
      <article className="cr-container cr-reveal" style={{ maxWidth: '720px', paddingBottom: '6rem' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          lineHeight: 1.8,
          color: 'var(--cr-ink)',
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: '3rem', marginBottom: '1.5rem' }}>
            The Core Philosophy
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
          </p>
          <blockquote style={{ 
            borderLeft: '2px solid var(--cr-gold)', 
            paddingLeft: '1.5rem', 
            margin: '2.5rem 0', 
            fontStyle: 'italic',
            fontSize: 'var(--text-xl)',
            color: 'var(--cr-ink-80)'
          }}>
            "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
          </blockquote>
          <p style={{ marginBottom: '2rem' }}>
            Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(27, 35, 64, 0.1)', margin: '4rem 0' }} />

        <div style={{ textAlign: 'center' }}>
          <p className="cr-eyebrow" style={{ marginBottom: '1.5rem' }}>Share this article</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="cr-btn cr-btn--secondary" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
            <Link to="/contact" className="cr-btn cr-btn--gold">Contact Us</Link>
          </div>
        </div>
      </article>

    </main>
  );
}
