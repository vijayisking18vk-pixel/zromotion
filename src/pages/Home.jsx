import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZONES } from '../data/zones';

gsap.registerPlugin(ScrollTrigger);

// Authentic high-resolution architectural photography of Chennai luxury estate (Strictly NO AI)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90&auto=format&fit=crop';

export default function Home() {
  const heroStageRef = useRef(null);
  const heroVisualRef = useRef(null);
  const heroBottomRef = useRef(null);

  // GSAP pinned scroll transition matching Realevate
  useEffect(() => {
    if (!heroStageRef.current || !heroVisualRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroStageRef.current,
          start: 'top top',
          end: '+=110%',
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Hero bottom content & marquee fade out as scroll begins
      tl.to(heroBottomRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.35,
        ease: 'power2.out',
      }, 0);

      tl.to('.cr-marquee-wrap', {
        opacity: 0,
        scale: 0.96,
        duration: 0.32,
        ease: 'power2.out',
      }, 0);

      tl.to('.cr-hero-corner-meta, .cr-hero-scroll-cue', {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.out',
      }, 0);

      // 2. Centered hero visual scales up to fill the viewport
      tl.to(heroVisualRef.current, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: '0px',
        boxShadow: 'none',
        duration: 0.72,
        ease: 'power2.inOut',
      }, 0.14);

      tl.to('.cr-hero-media', {
        scale: 1.08,
        duration: 0.85,
        ease: 'none',
      }, 0.14);
    }, heroStageRef);

    return () => ctx.revert();
  }, []);

  // Staggered opening entrance reveal
  useEffect(() => {
    const revealHero = () => {
      gsap.fromTo(
        heroVisualRef.current,
        { clipPath: 'inset(16% 16% 16% 16%)', scale: 1.18, opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1, duration: 1.35, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.cr-marquee-wrap',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        ['.cr-hero-title', '.cr-hero-price-badge'],
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.05, stagger: 0.18, delay: 0.45, ease: 'power3.out' }
      );
      gsap.fromTo(
        ['.cr-hero-corner-meta', '.cr-hero-scroll-cue'],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.85, ease: 'power2.out' }
      );
    };

    if (document.body.classList.contains('is-ready')) {
      revealHero();
    } else {
      const check = setInterval(() => {
        if (document.body.classList.contains('is-ready')) {
          clearInterval(check);
          revealHero();
        }
      }, 80);
      const fallback = setTimeout(() => { clearInterval(check); revealHero(); }, 2800);
      return () => { clearInterval(check); clearTimeout(fallback); };
    }
  }, []);

  // Scroll reveal observer for subsequent cards & sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const timeout = setTimeout(() => {
      document.querySelectorAll('.cr-reveal').forEach((el) => observer.observe(el));
    }, 120);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const scrollToCollections = (e) => {
    e.preventDefault();
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ background: 'var(--cr-bg)' }}>

      {/* ——— EXACT REALEVATE-STYLE HERO STAGE ——— */}
      <section ref={heroStageRef} className="cr-hero-stage" aria-label="ChennaiRents Hero">
        <div className="cr-hero-top">
          {/* Infinite Horizontal Background Marquee */}
          <div className="cr-marquee-wrap" aria-hidden="true" style={{ opacity: 0 }}>
            <div className="cr-marquee-scroll">
              <div className="cr-marquee-track">
                <span className="cr-marquee-text">Chennai, Elevated</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Homes Worth Renting</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Chennai, Elevated</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Homes Worth Renting</span>
                <span className="cr-marquee-dot">&bull;</span>
              </div>
              <div className="cr-marquee-track" aria-hidden="true">
                <span className="cr-marquee-text">Chennai, Elevated</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Homes Worth Renting</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Chennai, Elevated</span>
                <span className="cr-marquee-dot">&bull;</span>
                <span className="cr-marquee-text">Homes Worth Renting</span>
                <span className="cr-marquee-dot">&bull;</span>
              </div>
            </div>
          </div>

          {/* Centered Framed Architectural Visual */}
          <div className="cr-hero-visual-frame">
            <div className="cr-hero-visual" ref={heroVisualRef} style={{ opacity: 0 }}>
              <img
                src={HERO_IMAGE}
                alt="Chennai luxury villa and architectural estate"
                className="cr-hero-media"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>

        {/* Centered Editorial Bottom Content */}
        <div className="cr-hero-bottom" ref={heroBottomRef}>
          <div className="cr-hero-content">
            <h1 className="cr-hero-title" style={{ opacity: 0 }}>
              Rent Exceptional Homes Across Chennai.
            </h1>
            <div className="cr-hero-price-badge" style={{ opacity: 0 }}>
              Starting from &#x20B9;25,000 / month
            </div>
          </div>
        </div>

        {/* Subtle Corner Metadata */}
        <div className="cr-hero-corner-meta" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="cr-hero-meta-left">ChennaiRents&#174; 2026</span>
          <span className="cr-hero-meta-right">Boutique Residential Agency</span>
        </div>

        {/* Minimal Scroll Cue */}
        <a
          href="#collections"
          onClick={scrollToCollections}
          className="cr-hero-scroll-cue"
          style={{ opacity: 0 }}
          aria-label="Scroll to explore collections"
        >
          <span>Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

      {/* ——— FRAME 2: THE 4 COLLECTIONS AS CARDS (MIRRORING COLLECTION OVERLAY) ——— */}
      <section id="collections" className="cr-section" style={{ background: 'var(--cr-bg)' }}>
        <div className="cr-container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto var(--gap-lg)' }}>
            <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1rem' }}>
              Our Collections
            </p>
            <h2 className="cr-reveal cr-reveal--delay-1" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--cr-ink)',
              marginBottom: '1.25rem'
            }}>
              Four Living Moods Across Chennai.
            </h2>
            <p className="cr-reveal cr-reveal--delay-2" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xl)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--cr-ink-80)'
            }}>
              Instead of endless portal clutter, we organize Chennai by genuine living moods. Select a collection below to discover handpicked homes.
            </p>
          </div>

          {/* 4 Grand Collection Cards (Overlay Style) */}
          <div className="cr-collection-cards">
            {ZONES.map((zone, idx) => (
              <Link
                key={zone.id}
                to={`/${zone.slug}`}
                className={`cr-collection-card cr-reveal cr-reveal--delay-${(idx % 4) + 1}`}
                aria-label={`Explore ${zone.name}`}
              >
                {/* Background Photo */}
                <img
                  src={zone.heroImage}
                  alt={`${zone.name} residence`}
                  className="cr-collection-card__bg"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="cr-collection-card__overlay" aria-hidden="true" />

                {/* Rotating Arrow Indicator */}
                <div className="cr-collection-card__arrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2 13L13 2M13 2H4M13 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card Content */}
                <div className="cr-collection-card__content">
                  <div className="cr-collection-card__monogram">
                    {zone.monogram} &bull; {zone.name}
                  </div>
                  <h3 className="cr-collection-card__title">
                    {zone.name}
                  </h3>
                  <div className="cr-collection-card__price">
                    Starting {zone.pricePfx}{zone.priceFrom}
                  </div>
                  <p className="cr-collection-card__desc">
                    {zone.shortDesc}
                  </p>
                  <span className="cr-collection-card__link">
                    Explore Homes
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FRAME 3: FEATURED RESIDENCES SHOWCASE ——— */}
      <section className="cr-section" style={{ background: 'var(--cr-ink)', color: 'var(--cr-white)' }}>
        <div className="cr-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: 'var(--gap-xl)' }}>
            <div>
              <p className="cr-eyebrow cr-eyebrow--gold cr-reveal" style={{ marginBottom: '1rem' }}>
                Architectural Highlights
              </p>
              <h2 className="cr-reveal cr-reveal--delay-1" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 600,
                color: 'var(--cr-white)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: '680px'
              }}>
                Coastal Villas, Private Compounds & Character Bungalows.
              </h2>
            </div>
            <Link to="/ecr-coastal" className="cr-btn-arrow cr-btn-arrow--light cr-reveal cr-reveal--delay-2">
              Explore ECR Coastal Homes
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* 3 Real Villa Stock Cards */}
          <div className="cr-villas-grid">
            <div className="cr-villa-card cr-reveal">
              <div className="cr-villa-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format&fit=crop"
                  alt="Modern sea-facing private villa with pool along ECR"
                  loading="lazy"
                />
              </div>
              <div className="cr-villa-card__content">
                <div className="cr-villa-card__location">ECR Coastal &bull; Injambakkam</div>
                <h4 className="cr-villa-card__title">The Oceanfront Palm Villa</h4>
                <p className="cr-villa-card__text">
                  Private lap pool, floor-to-ceiling sea-facing glazing, landscaped garden compound, and 24/7 private security.
                </p>
                <div className="cr-villa-card__footer">
                  <div className="cr-villa-card__price">&#x20B9;1,25,000 / month</div>
                  <Link to="/ecr-coastal" className="cr-villa-card__link">
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="cr-villa-card cr-reveal cr-reveal--delay-1">
              <div className="cr-villa-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80&auto=format&fit=crop"
                  alt="Heritage courtyard bungalow in Mylapore"
                  loading="lazy"
                />
              </div>
              <div className="cr-villa-card__content">
                <div className="cr-villa-card__location">City Central &bull; Mylapore</div>
                <h4 className="cr-villa-card__title">Heritage Courtyard Bungalow</h4>
                <p className="cr-villa-card__text">
                  Restored teakwood veranda, central open-to-sky courtyard with Athangudi tiles, shaded fruit trees, and walkable street life.
                </p>
                <div className="cr-villa-card__footer">
                  <div className="cr-villa-card__price">&#x20B9;85,000 / month</div>
                  <Link to="/city-central" className="cr-villa-card__link">
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="cr-villa-card cr-reveal cr-reveal--delay-2">
              <div className="cr-villa-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop"
                  alt="Architectural private villa in Adyar"
                  loading="lazy"
                />
              </div>
              <div className="cr-villa-card__content">
                <div className="cr-villa-card__location">Signature Homes &bull; Adyar</div>
                <h4 className="cr-villa-card__title">The Adyar Garden Estate</h4>
                <p className="cr-villa-card__text">
                  Independent compound with mature banyan trees, double-height living room, separate staff quarters, and dedicated relationship manager.
                </p>
                <div className="cr-villa-card__footer">
                  <div className="cr-villa-card__price">&#x20B9;1,80,000 / month</div>
                  <Link to="/signature-homes" className="cr-villa-card__link">
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FRAME 4: EDITORIAL PHILOSOPHY ——— */}
      <section className="cr-section" style={{ background: 'var(--cr-bg)' }}>
        <div className="cr-container" style={{ maxWidth: '980px', textAlign: 'center' }}>
          <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1.25rem' }}>
            The ChennaiRents Standard
          </p>
          <blockquote
            className="cr-quote cr-reveal cr-reveal--delay-1"
            style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.9rem)', marginBottom: '2.5rem' }}
          >
            "We do not aggregate thousands of listings. We handpick, inspect, and negotiate the homes we would be proud to live in ourselves."
          </blockquote>
          <p className="cr-reveal cr-reveal--delay-2" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            fontWeight: 400,
            lineHeight: 1.82,
            color: 'var(--cr-ink-80)',
            maxWidth: '760px',
            margin: '0 auto 3rem'
          }}>
            Every property in ChennaiRents is verified for fair pricing, clean ownership documentation, and peaceful living. Zero spam calls. Zero hidden broker markups.
          </p>
          <div className="cr-reveal cr-reveal--delay-3">
            <Link to="/about" className="cr-btn cr-btn--gold" style={{ borderRadius: '999px', padding: '1rem 2.5rem' }}>
              Read Our Full Story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ——— FRAME 5: MINIMAL LIST YOUR PROPERTY HUB ——— */}
      <section className="cr-area-finder-band" aria-label="List your property with ChennaiRents">
        <div className="cr-container" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <p className="cr-eyebrow cr-eyebrow--gold cr-reveal" style={{ marginBottom: '1.25rem' }}>
            List Your Property
          </p>

          <h2 className="cr-reveal cr-reveal--delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
            fontWeight: 600,
            color: 'var(--cr-white)',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            marginBottom: '1.25rem'
          }}>
            Have a Home to Rent in Chennai?
          </h2>

          <p className="cr-reveal cr-reveal--delay-2" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            fontWeight: 400,
            color: 'rgba(247, 245, 241, 0.88)',
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75
          }}>
            List your residential villa, apartment, or character bungalow directly on chennairents.in. Zero spam broker calls, verified tenants, and seamless private leasing.
          </p>

          <div className="cr-cta-actions cr-reveal cr-reveal--delay-3">
            <a
              href="https://www.chennairents.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-btn-primary-gold"
            >
              List Your Property on chennairents.in ↗
            </a>

            <a
              href="https://www.instagram.com/chennairents.in/#"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-btn-secondary-light"
            >
              Instagram @chennairents.in ↗
            </a>
          </div>

          {/* Direct Live Contact Info Strip */}
          <div className="cr-cta-contact-strip cr-reveal cr-reveal--delay-4">
            <a
              href="tel:+918838814648"
              className="cr-cta-contact-link"
              title="Call directly"
            >
              <span className="cr-cta-contact-link__label">Direct Line:</span>
              <span className="cr-cta-contact-link__val">+91 88388 14648</span>
            </a>

            <span className="cr-cta-contact-sep" aria-hidden="true">•</span>

            <a
              href="https://wa.me/918838814648"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-cta-contact-link"
              title="Chat on WhatsApp"
            >
              <span className="cr-cta-contact-link__label">WhatsApp:</span>
              <span className="cr-cta-contact-link__val">+91 88388 14648</span>
            </a>

            <span className="cr-cta-contact-sep" aria-hidden="true">•</span>

            <a
              href="mailto:saaiabishek2@gmail.com"
              className="cr-cta-contact-link"
              title="Send email"
            >
              <span className="cr-cta-contact-link__label">Email:</span>
              <span className="cr-cta-contact-link__val">saaiabishek2@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
