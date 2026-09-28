import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ---- Shared scroll reveal ---- */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('.cr-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ---- Inline styles as shared objects ---- */
const S = {
  page: { background: 'var(--cr-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  introHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    color: 'var(--cr-ink)',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center'
  },
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xl)',
    fontWeight: 400,
    lineHeight: 1.82,
    color: 'var(--cr-ink-80)',
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center'
  },
  ctaHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
    color: 'var(--cr-white)',
    letterSpacing: '-0.02em',
    lineHeight: 1.08,
    textAlign: 'center',
    marginBottom: '2rem'
  },
};

export default function About() {
  useScrollReveal();

  return (
    <main style={S.page}>

      {/* INTRO HERO */}
      <section className="cr-section cr-container" style={{ paddingTop: 'calc(var(--nav-height) + 6rem)', paddingBottom: '4rem' }}>
        <p className="cr-eyebrow cr-reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>About Us</p>
        <h1 className="cr-reveal cr-reveal--delay-1" style={S.introHeading}>
          A simple way to tag your property and connect with the right tenants.
        </h1>
      </section>

      {/* EDITORIAL IMAGE & TEXT */}
      <section className="cr-section cr-container" style={{ paddingBottom: '8rem' }}>
        <div style={{ overflow: 'hidden', borderRadius: '4px', marginBottom: '4rem', aspectRatio: '16/7' }} className="cr-reveal cr-reveal--delay-2">
          <img
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80&auto=format&fit=crop"
            alt="A warm Chennai apartment interior"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <p className="cr-reveal cr-reveal--delay-3" style={S.bodyText}>
          Chennai Rents simplifies the rental experience. We provide a seamless, premium platform where landlords can effortlessly list their homes, and tenants can easily find and connect with them directly. No clutter, no endless scrolling—just beautiful homes and genuine connections.
        </p>
      </section>

      {/* CTA BAND */}
      <section className="cr-cta-band" style={{ marginTop: 'auto' }}>
        <h2 className="cr-reveal" style={S.ctaHeading}>
          Ready to get started?
        </h2>
        
        <div className="cr-cta-actions cr-reveal cr-reveal--delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://www.chennairents.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn-primary-gold"
          >
            List Your Property ↗
          </a>

          <Link to="/contact" className="cr-btn-secondary-light">
            Contact Us
          </Link>
        </div>
      </section>

    </main>
  );
}
