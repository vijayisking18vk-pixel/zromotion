import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Train, ChevronDown, ChevronUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { LOCALITIES, ZONES, getLocalitiesByZone, generateSEOMeta } from '../data/localities';
import { GUIDE_POSTS } from '../data/posts';
import SEOHead from '../components/SEOHead';
import MarinaDivider from '../components/MarinaDivider';
import { AutoRickshawDoodle } from '../components/ChennaiDoodles';

// ─── Animated FAQ Accordion for Category Hubs ────────────────────────────────
function HubFAQAccordionItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="animated-faq" style={{ marginBottom: '0.65rem' }}>
      <button
        className="animated-faq-summary"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        id={`hub-faq-q-${idx}`}
        aria-controls={`hub-faq-a-${idx}`}
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
            id={`hub-faq-a-${idx}`}
            role="region"
            aria-labelledby={`hub-faq-q-${idx}`}
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

// ─── Locality Card ─────────────────────────────────────────────────────────────
function LocalityCard({ locality, index, filterBhk, isPg }) {
  const reduce = useReducedMotion();

  // Find relevant rent range for this BHK or PG
  let highlightRange = null;
  if (filterBhk) {
    const matched = locality.rentRanges.find(r => r.bhk.startsWith(`${filterBhk} BHK`));
    if (matched) highlightRange = `${matched.bhk}: ${matched.range}`;
  } else if (isPg) {
    const matched = locality.rentRanges.find(r => r.bhk.includes('PG') || r.bhk.includes('Bachelor'));
    if (matched) highlightRange = matched.range;
  }

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Link
        to={`/chennai/${locality.slug}`}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          className="content-card"
          style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
            <span className="tag-eyebrow" style={{ margin: 0 }}>
              <span className="tag-bullet" />
              {locality.zone === 'south' ? 'South' : locality.zone === 'west' ? 'West' : locality.zone === 'central' ? 'Central' : locality.zone === 'ecr' ? 'OMR / ECR' : 'Chennai'}
            </span>
            {locality.waterReality?.score && (
              <span className="stamp-badge stamp-blue" style={{ fontSize: '0.65rem' }}>
                💧 {locality.waterReality.score}/10
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--c-ink)' }}>
            {locality.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-ink-muted)', flex: 1, marginBottom: '1rem' }}>
            {locality.tagline}
          </p>

          {/* Rent range preview */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {highlightRange ? (
              <span style={{
                fontSize: '0.78rem', fontWeight: 700,
                background: 'var(--c-sand-light)',
                border: '1.5px solid var(--c-ripon-red)',
                borderRadius: '4px',
                padding: '0.25rem 0.6rem',
                color: 'var(--c-ripon-red)',
              }}>
                {highlightRange}
              </span>
            ) : (
              locality.rentRanges.slice(0, 2).map((r, i) => (
                <span key={i} style={{
                  fontSize: '0.75rem', fontWeight: 700,
                  background: 'var(--c-sand-light)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '4px',
                  padding: '0.2rem 0.5rem',
                  color: 'var(--c-ripon-red)',
                  whiteSpace: 'nowrap',
                }}>
                  {r.bhk}: {r.range.split('–')[0]}+
                </span>
              ))
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-marina-blue)' }}>
            View rentals in {locality.name} <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Zone Section ─────────────────────────────────────────────────────────────
function ZoneSection({ zone, filterBhk, isPg }) {
  const localities = getLocalitiesByZone(zone.id);
  if (!localities.length) return null;
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>{zone.name}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, background: 'var(--c-auto-yellow)', color: 'var(--c-ink)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
          {localities.length} localities
        </span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {localities.map((loc, i) => (
          <LocalityCard key={loc.slug} locality={loc} index={i} filterBhk={filterBhk} isPg={isPg} />
        ))}
      </div>
    </section>
  );
}

// ─── BHK Hub Navigation Pills ─────────────────────────────────────────────────
function BHKHubs({ activeBhk, isPg }) {
  const hubs = [
    { bhk: '1', label: '1 BHK Flats in Chennai', sub: '₹7,000 – ₹16,000', slug: '1-bhk-for-rent' },
    { bhk: '2', label: '2 BHK Flats in Chennai', sub: '₹14,000 – ₹32,000', slug: '2-bhk-for-rent' },
    { bhk: '3', label: '3 BHK Flats in Chennai', sub: '₹24,000 – ₹65,000+', slug: '3-bhk-for-rent' },
    { bhk: 'PG', label: 'PG Accommodation', sub: '₹4,500 – ₹12,000/person', slug: 'pg' },
  ];
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.25rem' }}>Browse by Property Type</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {hubs.map(({ bhk, label, sub, slug }) => {
          const isCurrent = (activeBhk === bhk) || (isPg && bhk === 'PG');
          return (
            <Link key={slug} to={`/chennai/${slug}/`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: isCurrent ? 'var(--c-sand-light)' : '#fff',
                border: isCurrent ? '2px solid var(--c-ripon-red)' : '1.5px solid var(--c-border)',
                borderRadius: '8px',
                padding: '1.15rem 1.25rem',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: isCurrent ? 'var(--c-ripon-red)' : 'var(--c-ink)', marginBottom: '0.35rem' }}>
                  {bhk}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--c-ink)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--c-ink-light)' }}>{sub}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─── Specific Category Knowledge Block ────────────────────────────────────────
const CATEGORY_INTELLIGENCE = {
  '1': {
    heading: '1 BHK Rental Market Overview in Chennai',
    summary: '1 BHK flats in Chennai average 450 to 650 sq.ft. of carpet area. They are predominantly found as independent ground/first-floor portions in residential colonies like Velachery, Porur, Medavakkam, and Chromepet, or as compact studio units in newer OMR developments.',
    stats: [
      { label: 'Typical Size', value: '450 – 650 sq.ft.' },
      { label: 'City Rent Range', value: '₹7,500 – ₹16,000/mo' },
      { label: 'Advance Deposit', value: '3 – 6 Months (Negotiable)' },
      { label: 'Best For', value: 'Single Techies, Couples, Students' },
    ],
    faqs: [
      { q: 'Where can I find the most affordable 1 BHK flats in Chennai?', a: 'Suburban hubs including Chromepet, Tambaram, Medavakkam, and Kelambakkam offer clean 1 BHK portions starting from ₹7,000 to ₹9,500 per month with good rail and road connectivity.' },
      { q: 'Do 1 BHK flats come with covered car parking in Chennai?', a: 'Most standalone 1 BHK units offer dedicated two-wheeler parking. Covered car parking is uncommon for 1 BHKs unless situated in modern high-rise townships along OMR.' },
      { q: 'Are bachelors allowed in 1 BHK flats in Chennai?', a: 'Yes. 1 BHK apartments have the highest bachelor acceptance rate among Chennai landlords, especially in IT-proximate zones like Taramani, Velachery, and Navalur.' },
    ],
  },
  '2': {
    heading: '2 BHK Rental Market Overview in Chennai',
    summary: '2 BHK apartments form the core backbone of Chennai residential rental market (over 55% of all rentals). Sizing ranges from 850 to 1,250 sq.ft. offering two bedrooms, two bathrooms, a living/dining hall, and a kitchen. Ideal for nuclear families, couples, and corporate roommates.',
    stats: [
      { label: 'Typical Size', value: '850 – 1,250 sq.ft.' },
      { label: 'City Rent Range', value: '₹14,000 – ₹32,000/mo' },
      { label: 'Advance Deposit', value: '4 – 6 Months (Standard)' },
      { label: 'Best For', value: 'Families, Techie Roommates, Couples' },
    ],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in prime Chennai tech corridors?', a: 'In Velachery, Perungudi, and Porur, standard 2 BHK builder floors range between ₹18,000 and ₹25,000, while premium gated societies with amenities range from ₹26,000 to ₹34,000.' },
      { q: 'How much are monthly maintenance charges for a 2 BHK in Chennai?', a: 'In standalone buildings with a lift, maintenance averages ₹1,200–₹2,000. In large gated communities with 24/7 security, backup generator, and clubhouse, it ranges from ₹2,500 to ₹4,500.' },
      { q: 'What is the standard advance deposit for a 2 BHK?', a: 'Landlords traditionally ask for 6 to 10 months, but with verifiable corporate employment and bank ECS transfer offers, most deals comfortably close at 4 to 6 months.' },
    ],
  },
  '3': {
    heading: '3 BHK Rental Market Overview in Chennai',
    summary: '3 BHK flats in Chennai typically span 1,400 to 2,200 sq.ft. of living space. They feature master bedrooms with attached baths, dedicated utility balconies, modular kitchens, and mandatory covered car parking. They are heavily clustered in gated communities along OMR, Anna Nagar, Adyar, and Porur.',
    stats: [
      { label: 'Typical Size', value: '1,400 – 2,200 sq.ft.' },
      { label: 'City Rent Range', value: '₹24,000 – ₹65,000+/mo' },
      { label: 'Advance Deposit', value: '4 – 8 Months' },
      { label: 'Best For', value: 'Joint Families, Senior Executives, Roommate Groups' },
    ],
    faqs: [
      { q: 'Can corporate bachelors share a 3 BHK flat in Chennai?', a: 'Yes. Gated townships along OMR (Perungudi, Sholinganallur, Siruseri) and Porur actively welcome 3 or 4 working IT professionals sharing a 3 BHK, dividing the rent down to ₹8,000–₹12,000 per person.' },
      { q: 'Which areas have the best 3 BHK gated communities with amenities?', a: 'OMR Rajiv Gandhi Salai, Anna Nagar West Extension, Porur DLF corridor, and Adyar Shastri Nagar feature Chennai highest-rated gated communities with power backup and clubhouse facilities.' },
    ],
  },
  pg: {
    heading: 'Paying Guest (PG) & Co-Living Market in Chennai',
    summary: 'Chennai PG and co-living facilities cater to hundreds of thousands of IT professionals, college students, and healthcare trainees. Offerings range from budget 3-sharing rooms with home-cooked South Indian meals to fully managed co-living suites with high-speed Wi-Fi, daily housekeeping, and zero maintenance hassles.',
    stats: [
      { label: 'Sharing Bed Rate', value: '₹4,500 – ₹8,500/mo' },
      { label: 'Private Room Rate', value: '₹9,000 – ₹16,000/mo' },
      { label: 'Typical Deposit', value: '1 – 2 Months Only' },
      { label: 'Included Services', value: 'Food (3x), Wi-Fi, Housekeeping' },
    ],
    faqs: [
      { q: 'Where are the largest clusters of PGs in Chennai?', a: 'The largest PG hubs are located around Tidel Park in Taramani, Vijayanagar in Velachery, ELCOT SEZ in Sholinganallur, Tambaram near MCC college, and Vadapalani near media studios.' },
      { q: 'What is included in the monthly PG rent in Chennai?', a: 'Most standard PGs include three South Indian meals daily, high-speed Wi-Fi, electricity (excluding private AC sub-meters), RO drinking water, washing machine access, and weekly room cleaning.' },
      { q: 'What are the typical notice period and deposit rules for Chennai PGs?', a: 'PGs usually require only 1 to 2 months security deposit and a 30-day notice period before vacating.' },
    ],
  },
};

// ─── Main ChennaiHub Component ────────────────────────────────────────────────
export default function ChennaiHub({ bhk, pg }) {
  const reduce = useReducedMotion();
  const activezones = ZONES.filter(z => getLocalitiesByZone(z.id).length > 0);

  const isPg = Boolean(pg);
  const filterBhk = bhk;

  const pageTitle = bhk
    ? `${bhk} BHK Flats for Rent in Chennai | Chennai Rents`
    : isPg
    ? `PG & Hostel for Rent in Chennai | Chennai Rents`
    : `Flats & Houses for Rent in Chennai | Chennai Rents`;
  
  const pageH1 = bhk
    ? `${bhk} BHK Flats for Rent in Chennai`
    : isPg
    ? `PG & Co-Living Accommodation in Chennai`
    : `Flats & Houses for Rent in Chennai`;

  const pageDescription = bhk
    ? `Browse ${bhk} BHK flats and apartments for rent in Chennai. Honest rent rates across all localities, water supply ratings, and direct owner listings.`
    : isPg
    ? `Find PG accommodations and paying guest rooms in Chennai. Locality-by-locality rent ranges, food, amenities, and connectivity.`
    : `Find flats, houses, and PG for rent in Chennai. Explore locality-by-locality rent guides, real rent rates, water reports, and flood history. Verified direct listings.`;

  const canonicalUrl = bhk
    ? `https://www.chennairents.in/chennai/${bhk}-bhk-for-rent/`
    : isPg
    ? `https://www.chennairents.in/chennai/pg/`
    : `https://www.chennairents.in/chennai/rentals/`;

  const intelKey = bhk || (isPg ? 'pg' : null);
  const intelligence = intelKey ? CATEGORY_INTELLIGENCE[intelKey] : null;

  // JSON-LD structured data
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: 'https://www.chennairents.in/' },
      { '@type': 'ListItem', position: 2, name: pageH1, item: canonicalUrl },
    ],
  };

  const schemas = [breadcrumb];
  if (intelligence?.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: intelligence.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        robots="index, follow"
        canonical={canonicalUrl}
        faqs={intelligence?.faqs || []}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        style={{ paddingBottom: '3rem' }}
      >
        {/* ── HERO ── */}
        <section className="hero-sky-section">
          <div className="container home-hero-grid">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '580px' }}
            >
              <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">{bhk ? `${bhk} BHK Rentals` : isPg ? 'PG Rentals' : 'Chennai Rentals'}</span>
              </nav>
              <div className="meta-editorial" style={{ marginTop: '0.75rem' }}>OCTOBER 2026 • LOCALITY-FIRST • CHENNAI RENTS</div>
              <h1 style={{ marginTop: '0.65rem' }}>{pageH1}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--c-ripon-red)', fontWeight: 600, marginBottom: '1rem' }}>
                {bhk
                  ? `Real rates. Verified square footage. Water reports. Across ${LOCALITIES.length} Chennai neighborhoods.`
                  : isPg
                  ? `Clean PG rooms, food ratings, Wi-Fi speeds, and zero-brokerage stays.`
                  : `Real rent rates. Honest water reports. Flood history. Locality by locality.`}
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--c-ink-muted)', maxWidth: '520px' }}>
                {intelligence
                  ? intelligence.summary
                  : `Chennai Rents covers ${LOCALITIES.length}+ localities with genuine ground-truth data on rent ranges, Metro Water supply, flood risk, and commute times , transparent and verified listings.`}
              </p>
            </motion.div>

            <div className="home-numeral-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                initial={reduce ? false : { scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <span className="editorial-numeral">{bhk ? `${bhk}B` : isPg ? 'PG' : 'CR'}</span>
              </motion.div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-10px' }}>
                <AutoRickshawDoodle width={110} height={70} />
              </div>
            </div>
          </div>
        </section>

        <MarinaDivider variant="default" />

        <div className="container" style={{ paddingTop: '2.5rem' }}>
          {/* Quick Metrics Bar if Category View */}
          {intelligence && (
            <section style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                background: '#fff',
                border: '1.5px solid var(--c-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              }}>
                {intelligence.stats.map((s, idx) => (
                  <div key={idx} style={{ textAlign: 'center', borderRight: idx < intelligence.stats.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--c-ink-light)', fontWeight: 700, marginBottom: '0.35rem' }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-ripon-red)', fontFamily: 'var(--font-heading)' }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* BHK Navigation Pills */}
          <BHKHubs activeBhk={bhk} isPg={isPg} />

          {/* Zone-based locality grid */}
          {activezones.map(zone => (
            <ZoneSection key={zone.id} zone={zone} filterBhk={filterBhk} isPg={isPg} />
          ))}

          {/* Category FAQs if on BHK/PG page */}
          {intelligence?.faqs && (
            <section style={{ marginTop: '2rem', marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.25rem' }}>Frequently Asked Questions: {pageH1}</h2>
              <div style={{ maxWidth: '800px' }}>
                {intelligence.faqs.map((f, idx) => (
                  <HubFAQAccordionItem key={idx} q={f.q} a={f.a} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* Guides strip */}
          <section style={{ marginTop: '1rem' }}>
            <h2 style={{ marginBottom: '1.25rem' }}>Chennai Renting Guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {GUIDE_POSTS.slice(0, 6).map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="content-card"
                  style={{ padding: '1.25rem' }}
                >
                  <span className="tag-eyebrow" style={{ margin: 0, marginBottom: '0.65rem', display: 'block' }}>
                    <span className="tag-bullet" />
                    {post.badge || 'GUIDE'}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    <Link to={`/guides/${post.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{post.summary}</p>
                  <Link to={`/guides/${post.slug}/`} className="btn-yellow" style={{ fontSize: '0.82rem', minHeight: '36px', padding: '0.4rem 0.9rem', alignSelf: 'flex-start' }}>
                    Read Guide →
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}
