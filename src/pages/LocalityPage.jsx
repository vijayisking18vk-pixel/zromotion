import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  MapPin, 
  Train, 
  Bus, 
  Building2, 
  Droplets, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Info,
  Calendar,
  Compass,
  Plus
} from 'lucide-react';
import { getLocalityBySlug, generateSEOMeta, getIndexingDirective, parseIntent, LOCALITIES } from '../data/localities';
import { GUIDE_POSTS } from '../data/posts';
import { AUTHOR_INFO } from '../data/rentalGuideData';
import SEOHead from '../components/SEOHead';
import MarinaDivider from '../components/MarinaDivider';
import { VELACHERY_PAGES_MAP } from '../data/velacheryLandingPages';
import VelacheryLandingPage from './VelacheryLandingPage';

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="animated-faq" style={{ marginBottom: '0.65rem' }}>
      <button
        className="animated-faq-summary"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        id={`faq-q-${idx}`}
        aria-controls={`faq-a-${idx}`}
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
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        background: color,
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        padding: '0.2rem 0.6rem',
        borderRadius: '4px',
      }}
    >
       {score}/10
    </span>
  );
}

// ─── Flood Risk Badge ─────────────────────────────────────────────────────────
function FloodBadge({ risk }) {
  const map = {
    low: { label: 'Low Risk', color: 'var(--c-temple-green)' },
    'low-moderate': { label: 'Low–Moderate', color: 'var(--c-marina-blue)' },
    moderate: { label: 'Moderate', color: '#F5A623' },
    'moderate-high': { label: 'Moderate–High', color: 'var(--c-ripon-red)' },
    'high-caution': { label: 'High Caution', color: 'var(--c-ripon-red)' },
  };
  const { label, color } = map[risk] || map['moderate'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        background: color,
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: 800,
        padding: '0.2rem 0.6rem',
        borderRadius: '4px',
      }}
    >
      ⚠ {label}
    </span>
  );
}

// ─── Rent Range Table ─────────────────────────────────────────────────────────
function RentTable({ locality, rentRanges }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Rental Rates in {locality.name}</h2>
      <p style={{ color: 'var(--c-ink-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
        Prevailing indicative rental ranges across different property types in {locality.name}, Chennai:
      </p>

      <div className="bhk-table-wrap">
        <table className="bhk-table" aria-label={`Rent ranges by BHK type in ${locality.name}`}>
          <thead>
            <tr>
              <th scope="col">Home Type</th>
              <th scope="col">Indicative Monthly Rent</th>
              <th scope="col">What Affects the Price</th>
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

      <div style={{
        background: 'var(--c-sand-light)',
        border: '1px solid var(--c-border)',
        borderRadius: '6px',
        padding: '0.85rem 1rem',
        marginTop: '0.75rem',
        fontSize: '0.84rem',
        color: 'var(--c-ink-muted)',
        lineHeight: 1.55,
      }}>
        <strong>Methodology Note:</strong> These are indicative ranges, not guaranteed quotes. Rent and availability can change quickly based on building age, furnishing, parking slots, and exact cross-street. Confirm the current rent, deposit, maintenance, water arrangements, and notice terms directly from the listing before visiting.
      </div>
    </div>
  );
}

// ─── Quick Facts Card ─────────────────────────────────────────────────────────
function QuickFactsCard({ locality }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>Quick Facts: {locality.name} Rental Profile</h2>
      <div style={{
        background: '#fff',
        border: '1px solid var(--c-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <div className="bhk-table-wrap">
          <table className="bhk-table" style={{ margin: 0 }}>
            <tbody>
              <tr>
                <th style={{ width: '28%', fontWeight: 700 }}>Locality</th>
                <td>{locality.name}, Chennai (Pincode: {locality.pincode})</td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Rental Profile</th>
                <td>Builder floor apartments, independent house portions, gated communities, PG/co-living options</td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Typical Residents</th>
                <td>Families, IT & corporate professionals, college students, bachelors where permitted</td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Water Situation</th>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <WaterScoreBadge score={locality.waterReality?.score || 7} />
                    <span>{locality.waterReality?.status} (Verify summer tanker reliance with owner)</span>
                  </span>
                </td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Flood Screening</th>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <FloodBadge risk={locality.floodCheck?.risk || 'moderate'} />
                    <span>{locality.floodCheck?.detail}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Public Transport</th>
                <td>
                  {locality.commute?.metro && <div>• Metro/MRTS: {locality.commute.metro}</div>}
                  {locality.commute?.bus && <div>• MTC Bus: {locality.commute.bus}</div>}
                </td>
              </tr>
              <tr>
                <th style={{ fontWeight: 700 }}>Editorial Review</th>
                <td>
                  October 2026 • Verified by <a href={AUTHOR_INFO.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-ripon-red)', fontWeight: 700, textDecoration: 'none' }}>{AUTHOR_INFO.name}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Search Controls / Related Intent Links ───────────────────────────────────
function RelatedIntentLinks({ locality, activeIntent }) {
  const intents = [
    { label: `1 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/1-bhk-for-rent` },
    { label: `2 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/2-bhk-for-rent` },
    { label: `3 BHK in ${locality.name}`, path: `/chennai/${locality.slug}/3-bhk-for-rent` },
    { label: `PG in ${locality.name}`, path: `/chennai/${locality.slug}/pg` },
    { label: `Furnished flats in ${locality.name}`, path: `/chennai/${locality.slug}/fully-furnished-flats-for-rent` },
    { label: `Flats under ₹20,000 in ${locality.name}`, path: `/chennai/${locality.slug}/flats-for-rent-under-20000` },
  ];
  return (
    <div className="quick-jump-box" style={{ marginBottom: '2.5rem' }}>
      <h4>Filter & Search in {locality.name}</h4>
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

// ─── Tenant-Type Guidance ─────────────────────────────────────────────────────
function TenantTypeGuidance({ locality }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>Tenant Guidance for {locality.name}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem 0', color: 'var(--c-ink)' }}>For Families</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
            Family rentals in {locality.name} benefit from quiet inner residential roads, nearby schools, and local grocery markets. Prioritize 1st or 2nd floor units with covered car parking and dedicated water sumps.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem 0', color: 'var(--c-ink)' }}>For Bachelors & IT Pros</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
            While traditional independent bungalows may prefer families, builder floors along main commercial roads and newer apartment complexes actively welcome working professionals with steady company credentials.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem 0', color: 'var(--c-ink)' }}>For Co-Living & PGs</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
            Co-living facilities and managed PGs in {locality.name} include high-speed Wi-Fi, food, and housekeeping. Typical deposits range from 1 to 2 months rent compared to 6–10 months for unfurnished flats.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── 7-Step Rental Checklist ──────────────────────────────────────────────────
function RentalChecklist({ locality }) {
  const steps = [
    'Fix maximum total monthly budget including building maintenance and summer tanker bills.',
    'Map peak-hour travel times to your workplace, school, or transit terminals.',
    'Confirm tenancy preference (family vs bachelor rules) with the landlord before visiting.',
    'Inspect tap water taste, borewell yield, mobile network signal, and backup power.',
    'Ask for rent, security advance, notice period, and painting deduction terms in writing.',
    'Walk through the property in daylight and inspect ceiling dampness or plinth levels.',
    'Never transfer token booking amounts via UPI before identity check and key verification.',
  ];

  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem' }}>How to Choose a Rental in {locality.name}</h2>
      <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem 1.5rem' }}>
        <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {steps.map((s, i) => (
            <li key={i} style={{ fontSize: '0.92rem', color: 'var(--c-ink)', lineHeight: 1.55 }}>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Nearby Localities Section ────────────────────────────────────────────────
function NearbyLocalities({ localities }) {
  if (!localities?.length) return null;
  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', marginBottom: '1rem' }}>
        Nearby Localities to Explore
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {localities.map(({ slug, name, note }) => (
          <Link
            key={slug}
            to={`/chennai/${slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--c-border)',
                borderRadius: '8px',
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

// ─── Main LocalityPage Component ──────────────────────────────────────────────
export default function LocalityPage({ localitySlug: propSlug }) {
  const params = useParams();
  const reduce = useReducedMotion();

  // Support both explicit prop, /chennai/:locality, and /flats-for-rent-in-:locality-chennai
  let rawSlug = propSlug || params.locality;
  if (!rawSlug && params['*']) {
    rawSlug = params['*'];
  }
  if (rawSlug && rawSlug.startsWith('flats-for-rent-in-')) {
    rawSlug = rawSlug.replace('flats-for-rent-in-', '').replace('-chennai', '');
  }

  const intent = params.intent;
  const locality = getLocalityBySlug(rawSlug);

  // 404 → redirect to Chennai hub
  if (!locality) {
    return <Navigate to="/chennai/rentals" replace />;
  }

  // Velachery Programmatic SEO Landing Pages
  if (locality.slug === 'velachery' && intent && VELACHERY_PAGES_MAP[intent]) {
    return <VelacheryLandingPage data={VELACHERY_PAGES_MAP[intent]} />;
  }

  const meta = generateSEOMeta({ locality, intent });
  const parsed = parseIntent(intent);
  const pageType = parsed.key || 'locality';
  const listingCount = locality.listingCount?.[pageType] ?? locality.listingCount?.total ?? 0;
  const indexDirective = getIndexingDirective(pageType, listingCount);
  
  // Consistent canonical URL
  const canonicalUrl = intent
    ? `https://www.chennairents.in/chennai/${locality.slug}/${intent}`
    : `https://www.chennairents.in/chennai/${locality.slug}`;

  // Sidebar: other popular localities
  const sidebarLocalities = LOCALITIES.filter((l) => l.slug !== locality.slug).slice(0, 8);

  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.chennairents.in/' },
    { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: 'https://www.chennairents.in/chennai/rentals' },
    { '@type': 'ListItem', position: 3, name: locality.name, item: `https://www.chennairents.in/chennai/${locality.slug}` },
  ];
  if (intent) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 4,
      name: meta.h1,
      item: canonicalUrl,
    });
  }

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1,
      description: meta.description,
      datePublished: '2026-06-01',
      dateModified: '2026-10-02',
      author: {
        '@type': 'Person',
        name: AUTHOR_INFO.name,
        url: AUTHOR_INFO.website,
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
      itemListElement: breadcrumbs,
    },
  ];

  if (locality.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: locality.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        robots={indexDirective}
        canonical={canonicalUrl}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        {/* ── 1. & 2. HERO / HEADER SECTION ── */}
        <section className="hero-sky-section" style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
          <div className="container">
            {/* Breadcrumbs */}
            <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/chennai/rentals">Chennai Rentals</Link>
              <span aria-hidden="true">›</span>
              {intent ? (
                <>
                  <Link to={`/flats-for-rent-in-${locality.slug}-chennai`}>{locality.name}</Link>
                  <span aria-hidden="true">›</span>
                  <span aria-current="page">{intent.replace(/-/g, ' ')}</span>
                </>
              ) : (
                <span aria-current="page">{locality.name}</span>
              )}
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

                {/* Author attribution & review timestamp */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>
                  <span>Reviewed by <a href={AUTHOR_INFO.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-ripon-red)', fontWeight: 700, textDecoration: 'none' }}>{AUTHOR_INFO.name}</a></span>
                  <span>•</span>
                  <span>Updated October 2026</span>
                  <span>•</span>
                  <span>Verified Locality Intel</span>
                </div>

                {/* Badges strip */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <WaterScoreBadge score={locality.waterReality?.score || 7} />
                  <FloodBadge risk={locality.floodCheck?.risk || 'moderate'} />
                  {locality.pincode && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--c-ink-light)', background: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--c-border)' }}>
                      PIN {locality.pincode}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <MarinaDivider variant="default" />

        {/* ── MAIN CONTENT & SIDEBAR GRID ── */}
        <div className="container" style={{ marginTop: '2.5rem', marginBottom: '4rem' }}>
          <div className="post-layout-grid">
            <main className="post-main">

              {/* 3. Quick Facts Card */}
              <QuickFactsCard locality={locality} />

              {/* 4. Search Controls & BHK Links */}
              <RelatedIntentLinks locality={locality} activeIntent={intent} />

              {/* 5. Locality Overview */}
              <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>About Renting in {locality.name}</h2>
                <p style={{ lineHeight: 1.75, color: 'var(--c-ink)', fontSize: '1.02rem', marginBottom: '1rem' }}>
                  {locality.description}
                </p>
              </section>

              {/* 6. Rental Rates Table */}
              <RentTable locality={locality} rentRanges={locality.rentRanges} />

              {/* 7. Water & Utilities */}
              <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>Water Reality & Utilities</h2>
                <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <Droplets size={18} style={{ color: 'var(--c-marina-blue)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--c-ink)' }}>{locality.waterReality?.status}</span>
                  </div>
                  <p style={{ color: 'var(--c-ink-muted)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                    {locality.waterReality?.detail} Ask the owner or apartment association whether summer water tanker charges are included in maintenance or billed separately. Verify separate TANGEDCO electricity meters before finalizing.
                  </p>
                </div>
              </section>

              {/* 8. Flood & Monsoon Check */}
              <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>Flood & Monsoon Screening</h2>
                <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <AlertTriangle size={18} style={{ color: '#F5A623' }} />
                    <span style={{ fontWeight: 700, color: 'var(--c-ink)' }}>Historical Rainfall Observation</span>
                  </div>
                  <p style={{ color: 'var(--c-ink-muted)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                    {locality.floodCheck?.detail} Flood exposure can vary street by street. Before signing, visit the property after rainfall, check road height relative to the compound gate, and ask about ground-floor or basement parking drainage.
                  </p>
                </div>
              </section>

              {/* 9. Commute & Connectivity */}
              {locality.commute && (
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>Commute & Connectivity</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {locality.commute.metro && (
                      <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <Train size={18} style={{ color: 'var(--c-ripon-red)', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--c-ink)' }}>Metro & MRTS</div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>{locality.commute.metro}</div>
                        </div>
                      </div>
                    )}
                    {locality.commute.bus && (
                      <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <Bus size={18} style={{ color: 'var(--c-auto-yellow-dk)', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--c-ink)' }}>Bus Connectivity</div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>{locality.commute.bus}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 10. Nearby Hubs */}
              {locality.nearbyItParks?.length > 0 && (
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>Nearby IT Parks & Work Hubs</h2>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {locality.nearbyItParks.map((park) => (
                      <span
                        key={park}
                        style={{
                          background: 'var(--c-sand-light)',
                          border: '1px solid var(--c-border)',
                          borderRadius: '20px',
                          padding: '0.35rem 0.85rem',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--c-ink)',
                        }}
                      >
                         {park}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* 11. Tenant-Type Guidance */}
              <TenantTypeGuidance locality={locality} />

              {/* 12. 7-Step Rental Checklist */}
              <RentalChecklist locality={locality} />

              {/* 13. FAQs */}
              {locality.faqs?.length > 0 && (
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.45rem', marginBottom: '1rem' }}>
                    Frequently Asked Questions about Renting in {locality.name}
                  </h2>
                  {locality.faqs.map(({ q, a }, i) => (
                    <FAQItem key={i} q={q} a={a} idx={i} />
                  ))}
                </section>
              )}

              {/* 14. Nearby Localities Module */}
              <NearbyLocalities localities={locality.nearbyLocalities} />

              {/* 16. Soft CTA */}
              <div style={{
                background: 'var(--c-sand-light)',
                border: '1px solid var(--c-border)',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                marginTop: '3rem',
              }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--c-ink)' }}>
                  Looking for a Rental Home in {locality.name}?
                </h3>
                <p style={{ color: 'var(--c-ink-muted)', maxWidth: '560px', margin: '0 auto 1.5rem auto', lineHeight: 1.6, fontSize: '0.98rem' }}>
                  Browse our crowdsourced interactive map to check street-by-street water quality, flood history, and direct property owner connections in {locality.name}.
                </p>
                <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/listings/index.html" className="btn-dark" style={{ textDecoration: 'none' }}>
                    <MapPin size={16} style={{ color: 'var(--c-auto-yellow)' }} />
                    <span>Explore {locality.name} Map</span>
                  </a>
                  <a href="/listings/list-property.html" className="btn-red" style={{ textDecoration: 'none' }}>
                    <Plus size={16} />
                    <span>List Property (0% Brokerage)</span>
                  </a>
                </div>
              </div>

            </main>

            {/* 15. Rental Guides Side Panel */}
            <aside className="post-sidebar">
              <div className="rail-card">
                <h4>Popular Localities</h4>
                {sidebarLocalities.map((l) => (
                  <Link key={l.slug} to={`/flats-for-rent-in-${l.slug}-chennai`} className="rail-link">
                    {l.name}
                  </Link>
                ))}
              </div>

              <div className="rail-card">
                <h4>Search by BHK</h4>
                {['1', '2', '3'].map((bhk) => (
                  <Link key={bhk} to={`/chennai/${locality.slug}/${bhk}-bhk-for-rent`} className="rail-link">
                    {bhk} BHK in {locality.name}
                  </Link>
                ))}
                <Link to={`/chennai/${locality.slug}/pg`} className="rail-link">
                  PG in {locality.name}
                </Link>
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
                  Reviewed by {AUTHOR_INFO.name}.
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
      </motion.div>
    </>
  );
}
