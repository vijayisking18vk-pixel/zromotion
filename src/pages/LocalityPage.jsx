import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Train, Bus, Building2, Droplets, AlertTriangle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { getLocalityBySlug, generateSEOMeta, getIndexingDirective, LOCALITIES } from '../data/localities';
import { GUIDE_POSTS } from '../data/posts';
import SEOHead from '../components/SEOHead';
import MarinaDivider from '../components/MarinaDivider';

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="animated-faq" style={{ marginBottom: '0.65rem' }}>
      <button
        className="animated-faq-summary"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        id={`faq-q-${idx}`}
        aria-controls={`faq-a-${idx}`}
      >
        <span>{q}</span>
        {open ? <ChevronUp size={18} style={{ flexShrink: 0, color: 'var(--c-ripon-red)' }} /> : <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--c-ink-light)' }} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-a-${idx}`}
            role="region"
            aria-labelledby={`faq-q-${idx}`}
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

// ─── Water Score Badge ────────────────────────────────────────────────────────
function WaterScoreBadge({ score }) {
  const color = score >= 8 ? 'var(--c-temple-green)' : score >= 6 ? 'var(--c-marina-blue)' : 'var(--c-ripon-red)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      background: color, color: '#fff',
      fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.04em',
      padding: '0.2rem 0.6rem', borderRadius: '4px',
    }}>
      💧 {score}/10
    </span>
  );
}

// ─── Flood Risk Badge ─────────────────────────────────────────────────────────
function FloodBadge({ risk }) {
  const map = {
    'low': { label: 'Low Risk', color: 'var(--c-temple-green)' },
    'low-moderate': { label: 'Low–Moderate', color: 'var(--c-marina-blue)' },
    'moderate': { label: 'Moderate', color: '#F5A623' },
    'moderate-high': { label: 'Moderate–High', color: 'var(--c-ripon-red)' },
    'high-caution': { label: 'High Caution', color: 'var(--c-ripon-red)' },
  };
  const { label, color } = map[risk] || map['moderate'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: color, color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
      ⚠ {label}
    </span>
  );
}

// ─── Rent Range Table ─────────────────────────────────────────────────────────
function RentTable({ rentRanges }) {
  return (
    <div className="bhk-table-wrap">
      <table className="bhk-table" aria-label="Rent ranges by BHK type">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Rent Range</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rentRanges.map((row, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700, color: 'var(--c-ink)', whiteSpace: 'nowrap' }}>{row.bhk}</td>
              <td style={{ fontWeight: 700, color: 'var(--c-ripon-red)', whiteSpace: 'nowrap' }}>{row.range}</td>
              <td style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Related Intent Links ─────────────────────────────────────────────────────
function RelatedIntentLinks({ locality }) {
  const intents = [
    { label: `1 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/1-bhk-for-rent` },
    { label: `2 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/2-bhk-for-rent` },
    { label: `3 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/3-bhk-for-rent` },
    { label: `PG in ${locality.name}`, path: `/chennai/${locality.slug}/pg` },
    { label: `Furnished flats in ${locality.name}`, path: `/chennai/${locality.slug}/fully-furnished-flats-for-rent` },
    { label: `Flats under ₹20,000 in ${locality.name}`, path: `/chennai/${locality.slug}/flats-for-rent-under-20000` },
  ];
  return (
    <div className="quick-jump-box">
      <h4>Search in {locality.name}</h4>
      <ul className="quick-jump-links" role="list">
        {intents.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Nearby Localities Section ────────────────────────────────────────────────
function NearbyLocalities({ localities }) {
  if (!localities?.length) return null;
  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '1rem' }}>
        Nearby Localities to Explore
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {localities.map(({ slug, name, note }) => (
          <Link
            key={slug}
            to={`/chennai/${slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: '#fff', border: '1px solid var(--c-border)',
              borderRadius: '8px', padding: '0.85rem 1rem',
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-marina-blue)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontWeight: 700, color: 'var(--c-ink)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                → {name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)' }}>{note}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
function LocalityStructuredData({ locality, meta }) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: 'https://chennairents.in/' },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: 'https://chennairents.in/chennai/rentals' },
      { '@type': 'ListItem', position: 3, name: meta.h1, item: `https://chennairents.in/chennai/${locality.slug}` },
    ],
  };
  const faqSchema = locality.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locality.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}

// ─── Main LocalityPage Component ──────────────────────────────────────────────
export default function LocalityPage() {
  const { locality: localitySlug } = useParams();
  const reduce = useReducedMotion();

  const locality = getLocalityBySlug(localitySlug);

  // 404 → redirect to Chennai hub
  if (!locality) {
    return <Navigate to="/chennai/rentals" replace />;
  }

  const meta = generateSEOMeta({ locality });
  const indexDirective = getIndexingDirective('locality', locality.listingCount?.total || 0);

  // Sidebar: other popular localities
  const sidebarLocalities = LOCALITIES.filter(l => l.slug !== localitySlug).slice(0, 8);

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        robots={indexDirective}
        canonical={`https://chennairents.in/chennai/${locality.slug}`}
      />
      <LocalityStructuredData locality={locality} meta={meta} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        {/* ── HERO SECTION ── */}
        <section className="hero-sky-section" style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
          <div className="container">
            {/* Breadcrumbs */}
            <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/chennai/rentals">Chennai</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{locality.name}</span>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', alignItems: 'start' }}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="tag-eyebrow">
                  <span className="tag-bullet" />
                  {locality.zone === 'south' ? 'South Chennai' : locality.zone === 'west' ? 'West Chennai' : locality.zone === 'central' ? 'Central Chennai' : 'Chennai'}
                </span>
                <h1 style={{ marginTop: '0.5rem' }}>{meta.h1}</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--c-ripon-red)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {locality.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center' }}>
                  <WaterScoreBadge score={locality.waterReality.score} />
                  <FloodBadge risk={locality.floodCheck.risk} />
                  {locality.nearbyMetro?.[0] && (
                    <span className="stamp-badge stamp-blue" style={{ fontSize: '0.72rem' }}>
                      🚇 {locality.nearbyMetro[0].name.split('(')[0].trim()}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <MarinaDivider variant="default" />

        {/* ── MAIN CONTENT ── */}
        <div className="post-layout">
          <main className="post-main">

            {/* Quick Search Intent Links */}
            <RelatedIntentLinks locality={locality} />

            {/* Rent Ranges */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2>Rental Rates in {locality.name}</h2>
              <p style={{ marginBottom: '1rem' }}>{locality.description}</p>
              <RentTable rentRanges={locality.rentRanges} />
            </section>

            {/* Water Reality */}
            <section style={{ marginBottom: '2rem' }}>
              <h2>Water Supply in {locality.name}</h2>
              <div className="box-water">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <Droplets size={18} style={{ color: 'var(--c-marina-blue)' }} />
                  <strong>{locality.waterReality.status}</strong>
                  <WaterScoreBadge score={locality.waterReality.score} />
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{locality.waterReality.detail}</p>
              </div>
            </section>

            {/* Flood Check */}
            <section style={{ marginBottom: '2rem' }}>
              <h2>Flood Check — {locality.name}</h2>
              <div className="box-flood">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <AlertTriangle size={18} style={{ color: 'var(--c-ripon-red)' }} />
                  <FloodBadge risk={locality.floodCheck.risk} />
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{locality.floodCheck.detail}</p>
              </div>
            </section>

            {/* Commute */}
            <section style={{ marginBottom: '2rem' }}>
              <h2>Commute & Connectivity</h2>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {locality.commute.metro && (
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', padding: '0.85rem', background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                    <Train size={18} style={{ color: 'var(--c-marina-blue)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Metro / MRTS:</strong> {locality.commute.metro}</p>
                  </div>
                )}
                {locality.commute.bus && (
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', padding: '0.85rem', background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                    <Bus size={18} style={{ color: 'var(--c-temple-green)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>MTC Bus:</strong> {locality.commute.bus}</p>
                  </div>
                )}
                {locality.commute.road && (
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', padding: '0.85rem', background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                    <MapPin size={18} style={{ color: 'var(--c-ripon-red)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>By Road:</strong> {locality.commute.road}</p>
                  </div>
                )}
              </div>
            </section>

            {/* IT Parks */}
            {locality.nearbyItParks?.length > 0 && (
              <section style={{ marginBottom: '2rem' }}>
                <h2>Nearby IT Parks & Business Hubs</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {locality.nearbyItParks.map((park, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.4rem 0.85rem',
                      background: 'var(--c-sand-light)',
                      border: '1px solid var(--c-border)',
                      borderRadius: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--c-ink)',
                    }}>
                      <Building2 size={14} style={{ color: 'var(--c-marina-blue)' }} />
                      {park}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {locality.faqs?.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
                <h2>Frequently Asked Questions — Renting in {locality.name}</h2>
                <div style={{ marginTop: '1rem' }}>
                  {locality.faqs.map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} idx={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Nearby Localities */}
            <NearbyLocalities localities={locality.nearbyLocalities} />

            {/* Related Guides */}
            {locality.relatedGuides?.length > 0 && (
              <section style={{ marginTop: '2.5rem' }}>
                <h2>Useful Rental Guides</h2>
                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
                  {locality.relatedGuides.map(({ slug, title }) => (
                    <Link
                      key={slug}
                      to={`/guide/${slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        background: '#fff', border: '1px solid var(--c-border)',
                        borderRadius: '8px',
                        transition: 'all 0.15s ease',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-auto-yellow)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--c-ink)', fontSize: '0.95rem' }}>{title}</span>
                        <ArrowRight size={16} style={{ color: 'var(--c-ink-light)', flexShrink: 0 }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </main>

          {/* ── SIDE RAIL ── */}
          <aside className="side-rail" aria-label="Related localities">
            <div className="rail-card">
              <h4>Popular Localities</h4>
              {sidebarLocalities.map(l => (
                <Link key={l.slug} to={`/chennai/${l.slug}`} className="rail-link">
                  {l.name}
                </Link>
              ))}
            </div>
            <div className="rail-card">
              <h4>Search by BHK</h4>
              {['1', '2', '3'].map(bhk => (
                <Link key={bhk} to={`/chennai/${locality.slug}/${bhk}-bhk-for-rent`} className="rail-link">
                  {bhk} BHK in {locality.name}
                </Link>
              ))}
              <Link to={`/chennai/${locality.slug}/pg`} className="rail-link">
                PG in {locality.name}
              </Link>
            </div>
            <div className="rail-card">
              <h4>Renting Guides</h4>
              {GUIDE_POSTS.slice(0, 3).map(g => (
                <Link key={g.slug} to={`/guide/${g.slug}`} className="rail-link">
                  {g.title.split(':')[0]}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </motion.div>
    </>
  );
}
