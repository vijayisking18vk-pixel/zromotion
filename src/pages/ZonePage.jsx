import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ZONE_MAP, getNextZone } from '../data/zones';

/* ---- Scroll reveal ---- */
function useScrollReveal() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
      );
      document.querySelectorAll('.cr-reveal').forEach((el) => observer.observe(el));
      // Return disconnect inside timeout — cleanup happens in outer return
    }, 80);
    return () => clearTimeout(timeout);
  }, []);
}

/* ---- Draggable Horizontal Slider ---- */
function HorizontalSlider({ images }) {
  const trackRef    = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);

  const onDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onUp = () => { isDragging.current = false; };
  const onMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const slide = (dir) =>
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  return (
    <div className="cr-slider">
      <div
        ref={trackRef}
        className="cr-slider__track"
        style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onMouseMove={onMove}
      >
        {images.map((src, i) => (
          <div key={i} className="cr-slider__item">
            <img src={src} alt={`Property ${i + 1}`} loading="lazy" draggable="false" />
          </div>
        ))}
      </div>
      <div className="cr-slider__controls">
        <button className="cr-slider__btn" onClick={() => slide(-1)} aria-label="Previous">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M9 11L5 7.5L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="cr-slider__btn" onClick={() => slide(1)} aria-label="Next">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M6 4L10 7.5L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---- Shared text styles ---- */
const S = {
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xl)',
    fontWeight: 400,
    lineHeight: 1.82,
    color: 'var(--cr-ink)',
    maxWidth: '720px',
  },
  zoneHeroHeadline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h1)',
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: 'var(--cr-white)',
    maxWidth: '860px',
    marginBottom: '1.5rem',
  },
  ctaHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
    color: 'var(--cr-white)',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    lineHeight: 1.1,
  },
  sectionHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h1)',
    fontWeight: 600,
    color: 'var(--cr-white)',
    letterSpacing: '-0.02em',
    lineHeight: 1.08,
    textAlign: 'center',
  },
};

export default function ZonePage({ slug }) {
  const zone     = ZONE_MAP[slug];
  const nextZone = getNextZone(slug);
  useScrollReveal();

  if (!zone) return null;

  return (
    <main style={{ background: 'var(--cr-bg)' }}>

      {/* FRAME 1 — ZONE HERO */}
      <section className="cr-zone-hero">
        <div className="cr-zone-hero__bg">
          <img src={zone.heroImage} alt={`${zone.name} aerial view`} loading="eager" />
        </div>
        <div className="cr-zone-hero__content cr-container">
          <p
            className="cr-eyebrow cr-eyebrow--gold cr-reveal"
            style={{ marginBottom: '1.25rem' }}
          >
            {zone.name}
          </p>
          <h1 className="cr-reveal cr-reveal--delay-1" style={S.zoneHeroHeadline}>
            {zone.headline}
          </h1>
          <p
            className="cr-reveal cr-reveal--delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-2xs)',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--cr-gold)',
            }}
          >
            Starting from {zone.pricePfx}{zone.priceFrom}
          </p>
          <div
            className="cr-scroll-cue cr-reveal cr-reveal--delay-3"
            style={{ color: 'rgba(247,245,241,0.4)' }}
          >
            <span className="cr-scroll-cue__line" style={{ background: 'rgba(247,245,241,0.25)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(247,245,241,0.4)',
              }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* FRAME 2 — POSITIONING + SLIDER */}
      <section className="cr-section" style={{ background: 'var(--cr-bg)' }}>
        <div className="cr-container">
          <p className="cr-body cr-reveal" style={{ ...S.bodyText, marginBottom: 'var(--gap-xl)' }}>
            {zone.positioning}
          </p>
          <div className="cr-reveal cr-reveal--delay-1">
            <HorizontalSlider images={zone.galleryImages} />
          </div>
        </div>
      </section>

      {/* FRAME 3 — CREDIBILITY QUOTE (dark) */}
      <section
        style={{
          background: 'var(--cr-ink)',
          padding: 'var(--section-pad-v) 0',
        }}
      >
        <div
          className="cr-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--gap-xl)',
            alignItems: 'center',
          }}
        >
          <div>
            <blockquote
              className="cr-quote cr-quote--light cr-reveal"
              style={{ marginBottom: '0' }}
            >
              {zone.credibilityQuote}
            </blockquote>
            <p
              className="cr-quote-attribution cr-reveal cr-reveal--delay-2"
              style={{ color: 'rgba(247,245,241,0.32)' }}
            >
              {zone.credibilitySource}
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '3px',
              height: 'clamp(300px, 44vh, 540px)',
            }}
          >
            <div style={{ overflow: 'hidden' }} className="cr-reveal">
              <img
                src={zone.credibilityImage}
                alt={`${zone.name} property exterior`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div style={{ overflow: 'hidden' }} className="cr-reveal cr-reveal--delay-2">
              <img
                src={zone.credibilityInset}
                alt={`${zone.name} detail`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 4 — VALUE PILLARS */}
      <section className="cr-section" style={{ background: 'var(--cr-bg)' }}>
        <div className="cr-container">
          <p className="cr-eyebrow cr-reveal" style={{ marginBottom: 'var(--gap-xl)' }}>
            Why {zone.name}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 7rem)' }}>
            {zone.values.map((v, i) => (
              <div
                key={v.num}
                className={`cr-pillar${i % 2 !== 0 ? ' cr-pillar--reverse' : ''} cr-reveal`}
              >
                <div className="cr-pillar__image">
                  <img src={zone.pillarImages[i]} alt={v.title} loading="lazy" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="cr-pillar__number">{v.num}</div>
                  <h3 className="cr-pillar__title">{v.title}</h3>
                  <p className="cr-pillar__text">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 5 — LIFESTYLE QUOTE over full-bleed image */}
      <section
        style={{
          position: 'relative',
          minHeight: '58vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(27,35,64,0.68)',
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <img
          src={zone.lifestyleImage}
          alt={`${zone.name} lifestyle`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          className="cr-container"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '760px' }}
        >
          <blockquote
            className="cr-quote cr-quote--light cr-reveal"
            style={{ fontStyle: 'italic', fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}
          >
            {zone.lifestyleQuote}
          </blockquote>
        </div>
      </section>

      {/* FRAME 6 — CLOSING CTA */}
      <section className="cr-cta-band">
        <h2 className="cr-reveal" style={S.ctaHeading}>
          {zone.closingLine}
        </h2>
        <Link
          to="/contact"
          className="cr-btn-arrow cr-btn-arrow--light cr-reveal cr-reveal--delay-2"
        >
          Speak With Us
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      {/* FRAME 7 — NEXT ZONE TEASER */}
      {nextZone && (
        <Link
          to={`/${nextZone.slug}`}
          className="cr-next-teaser"
          aria-label={`Next collection: ${nextZone.name}`}
        >
          <div className="cr-next-teaser__bg">
            <img src={nextZone.heroImage} alt={`${nextZone.name} preview`} loading="lazy" />
          </div>
          <div className="cr-next-teaser__overlay" aria-hidden="true" />
          <div className="cr-next-teaser__content">
            <div>
              <p className="cr-next-teaser__label">Next Collection</p>
              <p className="cr-next-teaser__name">{nextZone.name}</p>
            </div>
            <div className="cr-next-teaser__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>
      )}

    </main>
  );
}
