import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ---- Shared scroll reveal via IntersectionObserver ---- */
function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef?.current || document;
    const els = root.querySelectorAll('.cr-reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export const FEATURED = {
  id: 'featured',
  meta: 'Market Insights · October 2026',
  title: "Navigating the Chennai Premium Rental Market: A Tenant's Guide",
  excerpt: 'Understanding maintenance clauses, deposit structures, and what to look for when touring a luxury property in South Chennai — before you sign a single document.',
  img: 'https://images.unsplash.com/photo-1577903808422-79010fc41961?w=1600&q=80&auto=format&fit=crop',
};

export const ARTICLES = [
  {
    id: 1,
    tag: 'Architecture',
    date: 'Sep 2026',
    title: 'The Return of the Courtyard House',
    excerpt: 'How traditional South Indian architectural forms are being reimagined in modern Chennai rentals.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Lifestyle',
    date: 'Aug 2026',
    title: "ECR — Chennai's Most Desired Address",
    excerpt: 'Private beaches, buzzing cafes, and serene greenery: why the East Coast Road corridor is redefining luxury living.',
    img: 'https://images.unsplash.com/photo-1542665952-14513db15293?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Market Insights',
    date: 'Jul 2026',
    title: 'Reading a Premium Lease Agreement',
    excerpt: "Maintenance clauses, deposit norms, and what fair terms look like in today's Chennai rental market.",
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'Interiors',
    date: 'Jun 2026',
    title: 'Furnishing a Rental: The Minimalist Way',
    excerpt: 'Natural textures, warm light, and negative space — elevating a blank canvas into a home worth living in.',
    img: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    tag: 'Neighbourhood',
    date: 'May 2026',
    title: "Adyar vs Velachery: The Commuter's Guide",
    excerpt: "A candid comparison of two of Chennai's most competitive rental corridors for working professionals.",
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    tag: 'Tenant Guide',
    date: 'Apr 2026',
    title: 'What Verified Really Means in Chennai Rentals',
    excerpt: 'The difference between a property listed by an owner and one that has been genuinely inspected and certified.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop',
  },
];

export default function Journal() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  return (
    <main ref={pageRef} className="cr-journal-page">

      {/* ── MASTHEAD ── */}
      <header className="cr-journal-masthead cr-container">
        <p className="cr-eyebrow cr-reveal" style={{ marginBottom: '1.5rem' }}>The Journal</p>
        <h1 className="cr-journal-masthead__title cr-reveal cr-reveal--delay-1">
          Thoughts on living, leasing &amp; architecture in Chennai.
        </h1>
        <p className="cr-journal-masthead__sub cr-reveal cr-reveal--delay-2">
          Guides, insights, and neighbourhood stories — written for people who take their homes seriously.
        </p>
      </header>

      {/* ── FEATURED ARTICLE ── */}
      <section className="cr-journal-featured-wrap cr-container cr-reveal cr-reveal--delay-3">
        <Link to={`/journal/${FEATURED.id}`} className="cr-journal-feature" tabIndex={0}>
          <div className="cr-journal-feature__img">
            <img src={FEATURED.img} alt={FEATURED.title} loading="lazy" />
          </div>
          <div className="cr-journal-feature__body">
            <span className="cr-journal-tag">{FEATURED.meta}</span>
            <h2 className="cr-journal-feature__title">{FEATURED.title}</h2>
            <p className="cr-journal-feature__excerpt">{FEATURED.excerpt}</p>
            <span className="cr-journal-cta">Read Article →</span>
          </div>
        </Link>
      </section>

      {/* ── DIVIDER ── */}
      <div className="cr-container">
        <hr className="cr-journal-rule" />
      </div>

      {/* ── GRID ── */}
      <section className="cr-container cr-journal-grid-section">
        <div className="cr-journal-article-grid">
          {ARTICLES.map((a, idx) => (
            <Link
              key={a.id}
              to={`/journal/${a.id}`}
              className={`cr-journal-card cr-reveal cr-reveal--delay-${(idx % 3) + 1}`}
              tabIndex={0}
            >
              <div className="cr-journal-card__img">
                <img src={a.img} alt={a.title} loading="lazy" />
              </div>
              <div className="cr-journal-card__body">
                <div className="cr-journal-card__meta">
                  <span className="cr-journal-tag">{a.tag}</span>
                  <span className="cr-journal-date">{a.date}</span>
                </div>
                <h3 className="cr-journal-card__title">{a.title}</h3>
                <p className="cr-journal-card__excerpt">{a.excerpt}</p>
                <span className="cr-journal-cta">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="cr-journal-bottom cr-container cr-reveal">
        <p className="cr-eyebrow" style={{ marginBottom: '1rem' }}>Stay Updated</p>
        <p className="cr-journal-bottom__text">
          Follow <a href="https://www.instagram.com/chennairents.in/" target="_blank" rel="noopener noreferrer" className="cr-journal-bottom__ig">@chennairents.in</a> on Instagram for property tours, neighbourhood guides, and stories from Chennai's finest homes.
        </p>
        <div className="cr-journal-bottom__actions">
          <a
            href="https://www.instagram.com/chennairents.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-btn cr-btn--gold"
            style={{ borderRadius: '999px', padding: '0.9rem 2rem' }}
          >
            Follow on Instagram ↗
          </a>
          <Link
            to="/contact"
            className="cr-btn cr-btn--secondary"
            style={{ borderRadius: '999px', padding: '0.9rem 2rem' }}
          >
            Reach Us Directly
          </Link>
        </div>
      </section>

    </main>
  );
}
