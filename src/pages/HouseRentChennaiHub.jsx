import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  Building, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Plus
} from 'lucide-react';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle } from '../components/ChennaiDoodles';
import { CHENNAI_RENT_HUB_DATA, SUPPORTING_RENTAL_PAGES, AUTHOR_INFO } from '../data/rentalGuideData';
import { LOCALITIES } from '../data/localities';
import { GUIDE_POSTS } from '../data/posts';

function FAQAccordionItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="animated-faq" style={{ marginBottom: '0.65rem' }}>
      <button
        className="animated-faq-summary"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        id={`faq-h-q-${idx}`}
        aria-controls={`faq-h-a-${idx}`}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp size={18} style={{ flexShrink: 0, color: 'var(--c-ripon-red)' }} />
        ) : (
          <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--c-ink-light)' }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-h-a-${idx}`}
            role="region"
            aria-labelledby={`faq-h-q-${idx}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="animated-faq-body">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HouseRentChennaiHub({ customSlug }) {
  const { slug: routeSlug } = useParams();
  const activeSlug = customSlug || routeSlug || 'house-for-rent-in-chennai';
  const reduce = useReducedMotion();

  // Check if we are on the main hub or a supporting sub-page
  const supportingPage = SUPPORTING_RENTAL_PAGES.find((p) => p.slug === activeSlug);
  const isSupporting = Boolean(supportingPage);

  const title = isSupporting ? supportingPage.title : CHENNAI_RENT_HUB_DATA.title;
  const h1 = isSupporting ? supportingPage.h1 : CHENNAI_RENT_HUB_DATA.h1;
  const description = isSupporting ? supportingPage.description : CHENNAI_RENT_HUB_DATA.metaDescription;
  const canonicalUrl = `https://www.chennairents.in/${activeSlug}`;

  // Structured data (BreadcrumbList + Article + FAQPage)
  const breadcrumbList = [
    { name: 'Home', url: 'https://www.chennairents.in/' },
    { name: 'Chennai Rentals', url: 'https://www.chennairents.in/chennai/rentals' },
    { name: h1, url: canonicalUrl },
  ];

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: h1,
      description: description,
      datePublished: '2026-06-01',
      dateModified: '2026-10-02',
      author: {
        '@type': 'Person',
        name: AUTHOR_INFO.name,
        url: AUTHOR_INFO.website,
        sameAs: AUTHOR_INFO.socialProfiles,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Chennai Rents',
        url: 'https://chennairents.in',
        logo: 'https://chennairents.in/chennai-rents-official-logo.jpg',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbList.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: CHENNAI_RENT_HUB_DATA.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{ paddingBottom: '4rem' }}
    >
      <SEOHead
        title={title}
        description={description}
        canonical={canonicalUrl}
        robots="index, follow"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

      {/* ── HERO HEADER ── */}
      <section className="hero-sky-section" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
        <div className="container">
          <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/chennai/rentals">Chennai Rentals</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{isSupporting ? supportingPage.h1 : 'Houses for Rent'}</span>
          </nav>

          <div style={{ maxWidth: '820px', marginTop: '0.5rem' }}>
            <span className="tag-eyebrow">
              <span className="tag-bullet" /> PILLAR RENTAL GUIDE • CHENNAI HOUSING
            </span>
            <h1 style={{ marginTop: '0.45rem', marginBottom: '0.5rem', fontSize: 'clamp(1.9rem, 4vw, 2.75rem)' }}>
              {h1}
            </h1>

            {/* Author byline and transparency metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBlock: '0.75rem 1.25rem', fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>
              <span>Reviewed by <a href={AUTHOR_INFO.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-ripon-red)', fontWeight: 700, textDecoration: 'none' }}>{AUTHOR_INFO.name}</a> (<Link to={`/author/${AUTHOR_INFO.slug}`} style={{ color: 'var(--c-marina-blue)', textDecoration: 'none' }}>Editorial Bio</Link>)</span>
              <span>•</span>
              <span>Last Reviewed: {CHENNAI_RENT_HUB_DATA.lastReviewed}</span>
              <span>•</span>
              <span style={{ color: 'var(--c-temple-green)', fontWeight: 700 }}>✓ Verified Chennai Market Data</span>
            </div>

            {/* Direct answer box */}
            <div style={{
              background: 'var(--c-sand-light)',
              border: '1px solid var(--c-border)',
              borderLeft: '4px solid var(--c-ripon-red)',
              borderRadius: '8px',
              padding: '1.15rem 1.35rem',
              lineHeight: 1.65,
              fontSize: '1.02rem',
              color: 'var(--c-ink)',
            }}>
              {isSupporting ? supportingPage.description : CHENNAI_RENT_HUB_DATA.directAnswer}
            </div>

            {/* Quick action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href="/listings/index.html" className="btn-dark" style={{ textDecoration: 'none' }}>
                <MapPin size={16} style={{ color: 'var(--c-auto-yellow)' }} />
                <span>Explore Interactive Rent Map</span>
              </a>
              <Link to="/chennai/rentals" className="btn-red" style={{ textDecoration: 'none' }}>
                <span>Browse All Localities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarinaDivider />

      {/* ── TWO-COLUMN EDITORIAL CONTENT LAYOUT ── */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="post-layout-grid">
          
          {/* Main article content column */}
          <article className="post-main" style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>

            {/* 1. Budget Breakdown */}
            <section id="budget">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>House Rentals in Chennai by Budget</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                Rental prices in Chennai differ drastically between central heritage avenues (Adyar, T. Nagar), tech corridors (OMR, Guindy), and western growth belts (Porur, Valasaravakkam).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {CHENNAI_RENT_HUB_DATA.budgets.map((b) => (
                  <div
                    key={b.budget}
                    style={{
                      background: '#fff',
                      border: '1px solid var(--c-border)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--c-ripon-red)', fontFamily: 'var(--font-heading)' }}>
                          {b.budget}
                        </span>
                        <span style={{ fontSize: '0.75rem', background: 'var(--c-sand-light)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: 'var(--c-ink-muted)' }}>
                          Monthly
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--c-ink)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                        {b.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-ink-light)', marginBottom: '0.5rem' }}>
                        Common in: {b.typicalAreas.join(', ')}
                      </div>
                      <Link
                        to={`/${b.slug}`}
                        style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-marina-blue)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        Explore {b.budget} Guide <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. BHK Breakdown with rates table */}
            <section id="bhk">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>House Rentals in Chennai by BHK Type</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                Whether you need a compact single professional flat or a multi-generational independent house, here are the real prevailing benchmarks across Chennai.
              </p>

              <div className="bhk-table-wrap">
                <table className="bhk-table" aria-label="Chennai Rent Rates by BHK Type">
                  <thead>
                    <tr>
                      <th scope="col">BHK & Unit Type</th>
                      <th scope="col">Indicative Monthly Rent</th>
                      <th scope="col">Suitability & What Affects Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHENNAI_RENT_HUB_DATA.bhkTypes.map((b) => (
                      <tr key={b.type}>
                        <td style={{ fontWeight: 700, color: 'var(--c-ink)' }}>
                          <Link to={`/${b.slug}`} style={{ color: 'var(--c-ink)', textDecoration: 'none' }}>
                            {b.type}
                          </Link>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--c-ripon-red)', whiteSpace: 'nowrap' }}>
                          {b.range}
                        </td>
                        <td style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>
                          {b.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--c-ink-light)', marginTop: '0.65rem', fontStyle: 'italic' }}>
                * Indicative ranges based on internal crowdsourced listings across South, Central, and West Chennai. Rent fluctuates with furnishing, Metro Water connection, parking, and building amenities.
              </p>
            </section>

            {/* 3. Tenant-Type Guidance */}
            <section id="tenant-types">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>Rentals for Families, Bachelors & Shared Living</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {CHENNAI_RENT_HUB_DATA.tenantTypes.map((t) => (
                  <div key={t.title} style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: 'var(--c-ink)' }}>{t.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                      {t.summary}
                    </p>
                    <Link to={`/${t.slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-marina-blue)', textDecoration: 'none' }}>
                      View {t.title} Guide →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Popular Localities Cluster */}
            <section id="localities">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>Explore Chennai Rental Localities</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                Inspect real tap-water scores, flood history, and indicative rent tables for all primary Chennai rental hubs:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {LOCALITIES.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/flats-for-rent-in-${loc.slug}-chennai`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        background: '#fff',
                        border: '1px solid var(--c-border)',
                        borderRadius: '6px',
                        padding: '0.85rem 1rem',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--c-marina-blue)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--c-border)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div style={{ fontWeight: 700, color: 'var(--c-ink)', fontSize: '0.95rem' }}>
                        → {loc.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--c-ink-light)', marginTop: '2px' }}>
                        {loc.tagline.split('.')[0]}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 5. How to Rent Without Brokers */}
            <section id="without-brokers">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>{CHENNAI_RENT_HUB_DATA.howToRentWithoutBrokers.heading}</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1rem', lineHeight: 1.65 }}>
                {CHENNAI_RENT_HUB_DATA.howToRentWithoutBrokers.summary}
              </p>

              <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem 1.5rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {CHENNAI_RENT_HUB_DATA.howToRentWithoutBrokers.tips.map((tip, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--c-ink)' }}>
                      <CheckCircle2 size={17} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. Marketplace Comparison & Safety (Addressing OLX / Classified queries) */}
            <section id="marketplace-comparison">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>{CHENNAI_RENT_HUB_DATA.marketplaceComparison.heading}</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1rem', lineHeight: 1.65 }}>
                {CHENNAI_RENT_HUB_DATA.marketplaceComparison.summary}
              </p>

              <div style={{ background: 'var(--c-sand-light)', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--c-ink)', marginBottom: '0.65rem' }}>Tenant Safety Guidelines</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {CHENNAI_RENT_HUB_DATA.marketplaceComparison.safetyGuidelines.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--c-ink)' }}>
                      <AlertTriangle size={16} style={{ color: 'var(--c-auto-yellow-dk)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 7. Tenant Inspection Checklist */}
            <section id="checklist">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>Rental Checklist for Chennai Tenants</h2>
              <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                Follow this sequential checklist before transferring a token deposit or signing an 11-month rental deed:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {CHENNAI_RENT_HUB_DATA.tenantChecklist.map((c) => (
                  <div key={c.step} style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '6px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{
                      background: 'var(--c-ripon-red)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {c.step}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', color: 'var(--c-ink)' }}>{c.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--c-ink-muted)', margin: 0, lineHeight: 1.55 }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. FAQs */}
            <section id="faqs">
              <h2 style={{ fontSize: '1.65rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
              {CHENNAI_RENT_HUB_DATA.faqs.map((f, i) => (
                <FAQAccordionItem key={i} q={f.q} a={f.a} idx={i} />
              ))}
            </section>

            {/* 9. Soft CTA */}
            <div style={{
              background: 'var(--c-sand-light)',
              border: '1.5px solid var(--c-border)',
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '1rem',
            }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--c-ink)' }}>
                Looking for a Rental Home in Chennai?
              </h3>
              <p style={{ color: 'var(--c-ink-muted)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.6, fontSize: '0.98rem' }}>
                Browse our crowdsourced interactive map to check street-by-street water quality, flood history, and direct property owner connections across Chennai.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/listings/index.html" className="btn-dark" style={{ textDecoration: 'none' }}>
                  <MapPin size={16} style={{ color: 'var(--c-auto-yellow)' }} />
                  <span>Explore Rent Map</span>
                </a>
                <a href="/listings/list-property.html" className="btn-red" style={{ textDecoration: 'none' }}>
                  <Plus size={16} />
                  <span>List Your Property (Free)</span>
                </a>
              </div>
            </div>

          </article>

          {/* Sidebar Rail */}
          <aside className="post-sidebar">
            <div className="rail-card">
              <h4>Quick Navigation</h4>
              <a href="#budget" className="rail-link">Rentals by Budget</a>
              <a href="#bhk" className="rail-link">Rentals by BHK Type</a>
              <a href="#tenant-types" className="rail-link">Families & Bachelors</a>
              <a href="#localities" className="rail-link">Explore Localities</a>
              <a href="#without-brokers" className="rail-link">Renting Without Brokers</a>
              <a href="#checklist" className="rail-link">10-Point Checklist</a>
              <a href="#faqs" className="rail-link">Rental FAQs</a>
            </div>

            <div className="rail-card">
              <h4>Browse by BHK</h4>
              <Link to="/1-bhk-house-for-rent-in-chennai" className="rail-link">1 BHK Houses for Rent</Link>
              <Link to="/2-bhk-house-for-rent-in-chennai" className="rail-link">2 BHK Houses for Rent</Link>
              <Link to="/independent-house-for-rent-in-chennai" className="rail-link">Independent Houses</Link>
              <Link to="/co-living-in-chennai" className="rail-link">Co-Living & PG Options</Link>
            </div>

            <div className="rail-card">
              <h4>Browse by Budget</h4>
              <Link to="/house-for-rent-in-chennai-under-5000" className="rail-link">Under ₹5,000 / month</Link>
              <Link to="/house-for-rent-in-chennai-under-7000" className="rail-link">Under ₹7,000 / month</Link>
              <Link to="/individual-house-for-rent-in-chennai-under-8000" className="rail-link">Under ₹8,000 / month</Link>
              <Link to="/house-for-rent-in-chennai-under-10000" className="rail-link">Under ₹10,000 / month</Link>
            </div>

            <div className="rail-card">
              <h4>Rental Legal Guides</h4>
              {GUIDE_POSTS.map((g) => (
                <Link key={g.slug} to={`/guides/${g.slug}`} className="rail-link">
                  {g.title.split(':')[0]}
                </Link>
              ))}
            </div>

            <div className="rail-card" style={{ background: 'var(--c-sand-light)' }}>
              <h4>Editorial Review</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)', margin: '0 0 0.5rem 0' }}>
                Maintained & verified by {AUTHOR_INFO.name}.
              </p>
              <a
                href={AUTHOR_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--c-ripon-red)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                {AUTHOR_INFO.website.replace('https://', '')} <ExternalLink size={12} />
              </a>
            </div>
          </aside>

        </div>
      </div>
    </motion.main>
  );
}
