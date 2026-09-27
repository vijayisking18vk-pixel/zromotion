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

/* ---- Pillar content ---- */
const PILLARS = [
  {
    num: '01',
    title: 'Neighbourhood Fit',
    text: 'We match tenants to the right micro-location, factoring school zones, IT corridor commute times, coastal lifestyle preferences, and neighbourhood character before a single property is shown.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'Verified Value',
    text: 'Every home in our portfolio is personally inspected, fairly priced, and free of hidden broker markups. What you see is what you pay. Fully transparent, no surprises at signing.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'Move-In Ready',
    text: 'Furnishing, utility connections, and rental agreements are handled before you arrive. We exist to reduce the friction between finding a home and actually living in it.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'Ongoing Support',
    text: 'A single point of contact for maintenance, renewals, and landlord communication for the entire duration of your tenancy. This is a relationship, not a transaction.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop',
  },
];

/* ---- Inline styles as shared objects ---- */
const S = {
  page: { background: 'var(--cr-bg)' },
  darkSection: { background: 'var(--cr-ink)' },
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xl)',
    fontWeight: 400,
    lineHeight: 1.82,
    color: 'var(--cr-ink)',
    maxWidth: '720px',
  },
  processText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xl)',
    fontWeight: 400,
    lineHeight: 1.82,
    color: 'var(--cr-ink)',
    maxWidth: '540px',
  },
  introHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h1)',
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: 'var(--cr-ink)',
    maxWidth: '860px',
  },
  philoHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h3)',
    fontWeight: 500,
    fontStyle: 'italic',
    color: 'var(--cr-ink)',
    maxWidth: '600px',
    lineHeight: 1.35,
  },
  ctaHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h1)',
    fontWeight: 600,
    color: 'var(--cr-white)',
    letterSpacing: '-0.02em',
    lineHeight: 1.08,
    textAlign: 'center',
  },
};

export default function About() {
  useScrollReveal();

  return (
    <main style={S.page}>

      {/* FRAME 1 — INTRO */}
      <section className="cr-about-intro cr-container">
        <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1rem' }}>About Us</p>
        <div className="cr-scroll-cue cr-reveal cr-reveal--delay-1" style={{ marginBottom: '4rem' }}>
          <span className="cr-scroll-cue__line" />
          <span>Scroll</span>
        </div>
        <h1 className="cr-reveal cr-reveal--delay-2" style={S.introHeading}>
          ChennaiRents is a boutique rental agency, matching discerning tenants and landlords across the city's most livable neighbourhoods.
        </h1>
      </section>

      {/* FRAME 2 — DUO IMAGE */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2px',
          height: 'clamp(380px, 52vh, 680px)',
        }}
      >
        <div style={{ overflow: 'hidden' }} className="cr-reveal">
          <img
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=80&auto=format&fit=crop"
            alt="A warm Chennai apartment interior"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ overflow: 'hidden' }} className="cr-reveal cr-reveal--delay-2">
          <img
            src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1000&q=80&auto=format&fit=crop"
            alt="Architectural texture and warm natural light"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* FRAME 3 — PHILOSOPHY QUOTE */}
      <section
        className="cr-section"
        style={{
          background: 'var(--cr-ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="cr-container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <blockquote
            className="cr-quote cr-quote--light cr-reveal"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}
          >
            "We find the city's most livable homes, for people who actually live in them."
          </blockquote>
          <p
            className="cr-quote-attribution cr-reveal cr-reveal--delay-2"
            style={{ color: 'rgba(247,245,241,0.35)' }}
          >
            ChennaiRents
          </p>
        </div>
      </section>

      {/* FRAME 4 — VALUE PILLARS */}
      <section className="cr-section" style={S.page}>
        <div className="cr-container">
          <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '0.75rem' }}>Philosophy</p>
          <p className="cr-reveal cr-reveal--delay-1" style={{ ...S.philoHeading, marginBottom: 'var(--gap-xl)' }}>
            Four commitments we make to every tenant and landlord we work with.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5rem, 10vw, 8rem)' }}>
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className={`cr-pillar${i % 2 !== 0 ? ' cr-pillar--reverse' : ''} cr-reveal`}
              >
                <div className="cr-pillar__image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="cr-pillar__number">{p.num}</div>
                  <h3 className="cr-pillar__title">{p.title}</h3>
                  <p className="cr-pillar__text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 5 — PROCESS */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '58vh',
          alignItems: 'stretch',
        }}
      >
        <div
          className="cr-reveal"
          style={{
            padding: 'var(--gap-xl)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--cr-bg)',
          }}
        >
          <p className="cr-eyebrow" style={{ marginBottom: '1.5rem' }}>How We Work</p>
          <p style={S.processText}>
            We source homes through our private landlord network. Most never appear on any portal. We inspect, verify pricing, and photograph each one before it enters our portfolio. Then we shortlist three to five homes for your specific brief, no endless scrolling, and handle everything from first viewing to move-in day and beyond.
          </p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&auto=format&fit=crop"
            alt="A sunlit residential courtyard"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      </section>

      {/* FRAME 6 — CTA BAND */}
      <section className="cr-cta-band">
        <h2 className="cr-reveal" style={S.ctaHeading}>
          Better homes.<br />Better living.
        </h2>
        <Link
          to="/contact"
          className="cr-btn-arrow cr-btn-arrow--light cr-reveal cr-reveal--delay-2"
        >
          Find your home
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      {/* FRAME 7 — NEXT TEASER */}
      <Link to="/ecr-coastal" className="cr-next-teaser" aria-label="Next: ECR Coastal">
        <div className="cr-next-teaser__bg">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop"
            alt="ECR Coastal preview"
            loading="lazy"
          />
        </div>
        <div className="cr-next-teaser__overlay" aria-hidden="true" />
        <div className="cr-next-teaser__content">
          <div>
            <p className="cr-next-teaser__label">Next Collection</p>
            <p className="cr-next-teaser__name">ECR Coastal</p>
          </div>
          <div className="cr-next-teaser__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>

    </main>
  );
}
