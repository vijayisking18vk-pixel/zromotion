import React, { useEffect, useState } from 'react';

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
    }, 80);
    return () => clearTimeout(timeout);
  }, []);
}

export default function Contact() {
  useScrollReveal();
  const [emailCopied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('saaiabishek2@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <main style={{ background: 'var(--cr-bg)', minHeight: '100vh' }}>

      {/* FRAME 1 — EDITORIAL HEADER */}
      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + clamp(4rem, 8vw, 7rem))',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div className="cr-container" style={{ maxWidth: '1080px' }}>
          <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1.25rem' }}>
            Direct Contact
          </p>
          <h1
            className="cr-reveal cr-reveal--delay-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: 'var(--cr-ink)',
              maxWidth: '780px',
            }}
          >
            Direct Access.
          </h1>
          <p
            className="cr-reveal cr-reveal--delay-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xl)',
              fontWeight: 400,
              color: 'var(--cr-ink-80)',
              maxWidth: '740px',
              marginTop: '1.25rem',
              lineHeight: 1.75
            }}
          >
            Direct, private communication for verified residential rentals, property listings, and villa tours across Chennai. No mock forms, zero broker spam.
          </p>
        </div>
      </section>

      {/* FRAME 2 — PRODUCTION CONTACT CHANNELS */}
      <section style={{ paddingBottom: 'clamp(5rem, 8vw, 7.5rem)' }}>
        <div className="cr-container" style={{ maxWidth: '1080px' }}>

          <div className="cr-reach-grid">
            
            {/* 1. Direct Phone Call */}
            <div className="cr-reach-card cr-reach-card--phone cr-reveal">
              <span className="cr-reach-card__badge">Direct Phone Line</span>
              <h3 className="cr-reach-card__title">+91 88388 14648</h3>
              <p className="cr-reach-card__text">
                Direct phone line for immediate inquiries, residential leasing consultations, and scheduling private villa tours.
              </p>
              <div className="cr-reach-card__actions">
                <a
                  href="tel:+918838814648"
                  className="cr-reach-card__btn"
                  title="Call +91 88388 14648 directly"
                >
                  Call Now ↗
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Concierge */}
            <div className="cr-reach-card cr-reach-card--whatsapp cr-reveal cr-reveal--delay-1">
              <span className="cr-reach-card__badge" style={{ color: '#25D366' }}>WhatsApp Concierge</span>
              <h3 className="cr-reach-card__title">Chat on WhatsApp</h3>
              <p className="cr-reach-card__text">
                Fastest channel for immediate availability updates, location pins, high-resolution interior photos, and instant support.
              </p>
              <div className="cr-reach-card__actions">
                <a
                  href="https://wa.me/918838814648"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cr-reach-card__btn cr-reach-card__btn--whatsapp"
                  title="Open WhatsApp chat"
                >
                  Message +91 88388 14648 ↗
                </a>
              </div>
            </div>

            {/* 3. Direct Email */}
            <div className="cr-reach-card cr-reach-card--email cr-reveal cr-reveal--delay-2">
              <span className="cr-reach-card__badge">Official Correspondence</span>
              <h3 className="cr-reach-card__title" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.85rem)', wordBreak: 'break-all' }}>
                saaiabishek2@gmail.com
              </h3>
              <p className="cr-reach-card__text">
                Send property specifications, corporate lease requirements, formal agreements, or partnership proposals.
              </p>
              <div className="cr-reach-card__actions">
                <a
                  href="mailto:saaiabishek2@gmail.com"
                  className="cr-reach-card__btn"
                  title="Send email to saaiabishek2@gmail.com"
                >
                  Send Email ↗
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cr-reach-card__btn cr-reach-card__btn--secondary"
                  title="Copy email address"
                >
                  {emailCopied ? 'Copied ✓' : 'Copy Address'}
                </button>
              </div>
            </div>

            {/* 4. Instagram Profile */}
            <div className="cr-reach-card cr-reach-card--insta cr-reveal cr-reveal--delay-3">
              <span className="cr-reach-card__badge" style={{ color: '#E1306C' }}>Video Tours</span>
              <h3 className="cr-reach-card__title">@chennairents.in</h3>
              <p className="cr-reach-card__text">
                Explore reel walkthroughs, aerial property tours, architectural previews, and newly available homes across Chennai.
              </p>
              <div className="cr-reach-card__actions">
                <a
                  href="https://www.instagram.com/chennairents.in/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cr-reach-card__btn"
                  title="View ChennaiRents on Instagram"
                >
                  Open Instagram ↗
                </a>
              </div>
            </div>

            {/* 5. Full Width Banner — Official Listings Portal */}
            <div className="cr-reach-card cr-reach-card--full cr-reveal cr-reveal--delay-4">
              <span className="cr-reach-card__badge">Listings Portal</span>
              <h3 className="cr-reach-card__title">List Your Residential Property</h3>
              <p className="cr-reach-card__text" style={{ maxWidth: '720px' }}>
                Own an apartment, beachside villa, or heritage bungalow in Chennai? List your home on our portal at chennairents.in for verified tenants, structured tenancy terms, and zero broker interference.
              </p>
              <div className="cr-reach-card__actions">
                <a
                  href="https://www.chennairents.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cr-btn-primary-gold"
                  title="Open official chennairents.in portal"
                >
                  Visit chennairents.in ↗
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
