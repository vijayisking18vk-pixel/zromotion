import React, { useEffect, useRef } from 'react';

export default function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    const els = pageRef.current.querySelectorAll('.cr-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} style={{ background: 'var(--cr-bg)', minHeight: '100dvh', paddingTop: 'var(--nav-height)' }}>
      
      {/* ── MASTHEAD ── */}
      <header className="cr-reveal cr-container" style={{ paddingTop: '8vh', paddingBottom: '4vh', borderBottom: '4px solid var(--cr-ink)', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-hero)', 
          fontWeight: 400,
          color: 'var(--cr-ink)',
          letterSpacing: '-0.01em',
          lineHeight: 1,
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Contact
        </h1>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-2xs)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--cr-gold)'
        }}>
          Get in touch with the editor
        </p>
      </header>

      {/* ── CONTACT GRID (VOGUE STYLE) ── */}
      <section className="cr-container cr-reveal" style={{ paddingBottom: '8rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '4rem'
        }}>
          
          {/* Main Info Column */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ borderBottom: '1px solid var(--cr-ink-20)', paddingBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cr-ink)', marginBottom: '0.5rem' }}>
                Direct Email
              </h2>
              <a href="mailto:saaiabishek2@gmail.com" style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--text-h2)', 
                color: 'var(--cr-ink)', 
                textDecoration: 'none' 
              }}>
                saaiabishek2@gmail.com
              </a>
            </div>

            <div style={{ borderBottom: '1px solid var(--cr-ink-20)', paddingBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cr-ink)', marginBottom: '0.5rem' }}>
                Phone & WhatsApp
              </h2>
              <a href="tel:+918838814648" style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--text-h2)', 
                color: 'var(--cr-ink)', 
                textDecoration: 'none' 
              }}>
                +91 88388 14648
              </a>
            </div>

            <div style={{ borderBottom: '1px solid var(--cr-ink-20)', paddingBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cr-ink)', marginBottom: '0.5rem' }}>
                Instagram
              </h2>
              <a href="https://www.instagram.com/chennairents.in/" target="_blank" rel="noopener noreferrer" style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--text-h2)', 
                color: 'var(--cr-ink)', 
                textDecoration: 'none' 
              }}>
                @chennairents.in
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ gridColumn: 'span 4' }}>
            <div style={{ padding: '3rem 2rem', background: 'var(--cr-ink-10)', border: '1px solid var(--cr-ink-20)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: '1rem', color: 'var(--cr-ink)' }}>Office Hours</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--cr-ink-80)', marginBottom: '0.5rem' }}>Monday – Friday</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--cr-ink-80)', marginBottom: '2rem' }}>10:00 AM – 6:00 PM (IST)</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', marginBottom: '1rem', color: 'var(--cr-ink)' }}>Press & Media</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--cr-ink-80)' }}>For all editorial inquiries, please email us directly with "Press" in the subject line.</p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
