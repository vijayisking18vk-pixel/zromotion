import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    const el = document.getElementById('journal');
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
          href="#journal"
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

      {/* ——— NEW FRAME: CHENNAI RENTING JOURNAL (BLOGS) ——— */}
      <section id="journal" className="cr-section" style={{ background: 'var(--cr-white)' }}>
        <div className="cr-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: 'var(--gap-xl)' }}>
            <div>
              <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1rem' }}>
                Chennai Renting Journal
              </p>
              <h2 className="cr-reveal cr-reveal--delay-1" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 600,
                color: 'var(--cr-ink)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: '680px'
              }}>
                Insights on living, leasing, and architecture in Chennai.
              </h2>
            </div>
            <Link to="/journal" className="cr-btn-arrow cr-reveal cr-reveal--delay-2" style={{ color: 'var(--cr-ink)', borderColor: 'var(--cr-ink-20)' }}>
              Read All Journals
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="cr-journal-grid">
            {/* Featured Large Article */}
            <a href="#" className="cr-journal-featured cr-reveal">
              <div className="cr-journal-featured__img-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1577903808422-79010fc41961?w=1000&q=80&auto=format&fit=crop" 
                  alt="Reading the Chennai Lease" 
                  loading="lazy" 
                />
              </div>
              <div className="cr-journal-featured__content">
                <div className="cr-journal-meta">Market Insights &bull; October 2026</div>
                <h3 className="cr-journal-featured__title">Navigating the Chennai Premium Rental Market: A Tenant's Guide</h3>
                <p className="cr-journal-featured__excerpt">
                  Understanding maintenance clauses, deposit structures, and what to look for when touring a luxury property in South Chennai's most sought-after neighborhoods.
                </p>
                <span className="cr-journal-read">Read Article &rarr;</span>
              </div>
            </a>

            {/* Stacked Secondary Articles */}
            <div className="cr-journal-stack">
              <a href="#" className="cr-journal-stacked-card cr-reveal cr-reveal--delay-1">
                <div className="cr-journal-stacked-card__img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop" 
                    alt="Minimalist office space" 
                    loading="lazy" 
                  />
                </div>
                <div className="cr-journal-stacked-card__content">
                  <div className="cr-journal-meta">Architecture &bull; September 2026</div>
                  <h4 className="cr-journal-stacked-card__title">The Return of the Courtyard House in Modern Rentals</h4>
                  <span className="cr-journal-read">Read Article &rarr;</span>
                </div>
              </a>

              <a href="#" className="cr-journal-stacked-card cr-reveal cr-reveal--delay-2">
                <div className="cr-journal-stacked-card__img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1542665952-14513db15293?w=600&q=80&auto=format&fit=crop" 
                    alt="Coastal ECR Life" 
                    loading="lazy" 
                  />
                </div>
                <div className="cr-journal-stacked-card__content">
                  <div className="cr-journal-meta">Lifestyle &bull; August 2026</div>
                  <h4 className="cr-journal-stacked-card__title">Why ECR is Becoming Chennai's Most Desired Address</h4>
                  <span className="cr-journal-read">Read Article &rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— NEW FRAME: INSTAGRAM INTEGRATION ——— */}
      <section className="cr-section" style={{ background: 'var(--cr-bg)', borderTop: '1px solid var(--cr-ink-10)' }}>
        <div className="cr-container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto var(--gap-lg)' }}>
            <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1rem' }}>
              @chennairents.in
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
              Follow the ChennaiRents Lifestyle.
            </h2>
            <p className="cr-reveal cr-reveal--delay-2" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xl)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--cr-ink-80)'
            }}>
              Video tours, architectural details, and exclusive previews of our latest properties before they hit the market.
            </p>
          </div>

          {/* 4-Column Instagram Reel Grid */}
          <div className="cr-insta-grid">
            {[
              {
                id: 1,
                img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80&auto=format&fit=crop',
                views: '12.4K',
                desc: 'A walking tour of the Adyar Garden Estate.'
              },
              {
                id: 2,
                img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=500&q=80&auto=format&fit=crop',
                views: '8.2K',
                desc: 'Heritage details in our latest Mylapore listing.'
              },
              {
                id: 3,
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80&auto=format&fit=crop',
                views: '24.1K',
                desc: 'Sunset views from the ECR Oceanfront Villa.'
              },
              {
                id: 4,
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80&auto=format&fit=crop',
                views: '9.6K',
                desc: 'Inside the luxury apartments at Poes Garden.'
              }
            ].map((reel, idx) => (
              <a 
                key={reel.id} 
                href="https://www.instagram.com/chennairents.in/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`cr-insta-card cr-reveal cr-reveal--delay-${(idx % 4) + 1}`}
                aria-label="View Instagram Reel"
              >
                <img src={reel.img} alt="Instagram Video Thumbnail" className="cr-insta-card__bg" loading="lazy" />
                <div className="cr-insta-card__overlay">
                  <div className="cr-insta-card__play">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="cr-insta-card__content">
                  <div className="cr-insta-card__views">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    {reel.views}
                  </div>
                  <p className="cr-insta-card__desc">{reel.desc}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="cr-reveal cr-reveal--delay-3" style={{ textAlign: 'center', marginTop: '3rem' }}>
             <a href="https://www.instagram.com/chennairents.in/#" target="_blank" rel="noopener noreferrer" className="cr-btn cr-btn--outline" style={{ borderRadius: '999px', padding: '1rem 2.5rem' }}>
              Follow @chennairents.in
            </a>
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
