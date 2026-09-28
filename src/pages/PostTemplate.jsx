import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import ReelEmbed from '../components/ReelEmbed';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, FilterCoffeeDoodle } from '../components/ChennaiDoodles';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';
import { 
  Droplet, 
  CloudRain, 
  Navigation, 
  Utensils, 
  GraduationCap, 
  Building2, 
  Instagram, 
  MapPin, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function PostTemplate() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="container" style={{ paddingBlock: '6rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--c-ripon-red)', marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--c-ink-muted)' }}>
          The rental locality or guide you are looking for has not been written yet or the URL is incorrect.
        </p>
        <Link to="/" className="btn-dark">
          ← Back to Chennai Rents Home
        </Link>
      </div>
    );
  }

  const isLocality = post.type === 'locality';
  const canonicalUrl = `https://chennairents.in/${post.slug}`;
  const seoTitle = `${post.title} | Chennai Rents`;
  const seoDescription = `${post.summary} Discover real rent rates by BHK, water scores, flood history, and vacant homes on Instagram.`;

  const breadcrumbs = [
    { name: 'Home', url: 'https://chennairents.in/' },
    { name: isLocality ? 'Localities' : 'Guides', url: `https://chennairents.in/#${isLocality ? 'localities' : 'guides'}` },
    { name: post.title.split(',')[0], url: canonicalUrl }
  ];

  return (
    <article className="post-landing-page" style={{ paddingBottom: '4rem' }}>
      
      {/* ── SEO JSON-LD & META INJECTION ── */}
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        faqs={post.faqs || []}
        type={post.type}
        breadcrumbs={breadcrumbs}
      />

      {/* ── 1. EXACT SKY-BLUE HERO MATCHING MOCK ── */}
      <section className="hero-sky-section">
        <div className="container">
          
          {/* Visible SEO Breadcrumb (Google Sitelinks booster) */}
          <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to={`/#${isLocality ? 'localities' : 'guides'}`}>
              {isLocality ? 'Localities' : 'Guides'}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--c-ink)', fontWeight: 600 }}>{post.title.split(',')[0]}</span>
          </nav>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              alignItems: 'center',
              gap: '2rem'
            }}
            className="hero-grid"
          >
            {/* Left Content Column */}
            <div style={{ maxWidth: '820px' }}>
              
              {/* Tag: 🟡 LOCALITY GUIDE • WEST CHENNAI */}
              <div className="tag-eyebrow">
                <span className="tag-bullet" />
                <span>{post.badge || 'LOCALITY GUIDE • CHENNAI'}</span>
              </div>

              {/* Main H1 Title (Pure High-Volume Keyword) */}
              <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.4rem', lineHeight: 1.15 }}>
                {post.title.split(',')[0]}
              </h1>

              {/* Clean English Subtitle */}
              <div style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '1.25rem' }}>
                {post.subheading || 'A practical, locality-first rental guide for Chennai'}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  lineHeight: 1.65,
                  color: 'var(--c-ink-muted)',
                  maxWidth: '720px'
                }}
              >
                {post.tagline || post.summary}
              </p>

              {/* Metadata */}
              <div className="meta-editorial">
                {post.updatedDate || 'OCTOBER 2026'} • {post.readTime || '7 MIN READ'} • CHENNAI RENTS EDITORIAL
              </div>

            </div>

            {/* Right Big Numeral "01" (Matches User Screenshot) */}
            <div className="hero-numeral-col" style={{ display: 'none', justifyContent: 'center' }}>
              <div className="editorial-numeral">
                01
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. MARINA BEACH SVG DIVIDER ── */}
      <MarinaDivider />

      {/* ── 3. ARTICLE BODY (Clean, Human, SEO-Structured) ── */}
      <div className="container" style={{ maxWidth: '860px', marginTop: '2.5rem' }}>
        
        {/* Quick Jump / Table of Contents */}
        {isLocality && (
          <div className="quick-jump-box">
            <h4>Quick Jump to Section:</h4>
            <ul className="quick-jump-links">
              <li><a href="#rent-rates">↓ Rent Rates by BHK</a></li>
              <li><a href="#water-flood">↓ Water & Flood Reality</a></li>
              <li><a href="#commute">↓ Metro & Roads</a></li>
              <li><a href="#schools-hospitals">↓ Schools & Hospitals</a></li>
              <li><a href="#food-spots">↓ Food & Markets</a></li>
              <li><a href="#vacant-homes">↓ Vacant Home Reels</a></li>
              <li><a href="#faqs">↓ Local FAQs</a></li>
            </ul>
          </div>
        )}

        {isLocality ? (
          /* LOCALITY POST CONTENT */
          <div>
            
            {/* Rent Ranges Table */}
            <section id="rent-rates" style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--c-ink)' }}>
                Rent in {post.title.split(',')[0].replace('Rent in ', '')}: Typical Rates by BHK
              </h2>
              <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.98rem', marginBottom: '1.25rem' }}>
                If you are looking for a house for rent in {post.title.split(',')[0].replace('Rent in ', '')}, here are the prevailing 2026 rental price trends:
              </p>

              <div className="bhk-table-wrap">
                <table className="bhk-table" aria-label="Rental rates in this locality">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '22%' }}>BHK Type</th>
                      <th scope="col" style={{ width: '38%' }}>Typical Monthly Rent</th>
                      <th scope="col" style={{ width: '40%' }}>What to Expect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.rentRanges?.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 800, color: 'var(--c-ripon-red)' }}>
                          {r.bhk}
                        </td>
                        <td style={{ fontWeight: 800, color: 'var(--c-ink)', fontSize: '1.1rem' }}>
                          {r.range}
                        </td>
                        <td style={{ color: 'var(--c-ink-muted)', fontSize: '0.92rem' }}>
                          {r.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Water & Flooding Ground Reality */}
            <section id="water-flood" style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--c-ink)' }}>
                Water Supply & Monsoon Flooding Ground Reality
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                
                <div className="box-water" style={{ marginBlock: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Droplet size={20} color="var(--c-marina-blue)" />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--c-marina-blue-dk)' }}>
                      Water Score: {post.waterReality?.score}
                    </h3>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem', color: 'var(--c-marina-blue-dk)' }}>
                    {post.waterReality?.status}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {post.waterReality?.detail}
                  </p>
                </div>

                <div className="box-flood" style={{ marginBlock: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CloudRain size={20} color="var(--c-ripon-red)" />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--c-ripon-red)' }}>
                      Flood Risk & Waterlogging Check
                    </h3>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem', color: 'var(--c-ripon-red)' }}>
                    {post.floodCheck?.status}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {post.floodCheck?.detail}
                  </p>
                </div>

              </div>
            </section>

            {/* Commute & Connectivity with Auto Rickshaw Doodle */}
            <section id="commute" style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--c-ink)' }}>
                  Commute: Metro Lines, MTC Buses & Main Roads
                </h2>
                <AutoRickshawDoodle width={90} height={55} />
              </div>
              <div className="content-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h4 style={{ color: 'var(--c-marina-blue)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Navigation size={18} /> Metro Station Connectivity
                  </h4>
                  <p style={{ fontSize: '0.98rem', color: 'var(--c-ink-muted)' }}>{post.commute?.metro}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--c-border-subtle)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--c-temple-green)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Building2 size={18} /> Bus Routes & Bus Stands
                  </h4>
                  <p style={{ fontSize: '0.98rem', color: 'var(--c-ink-muted)' }}>{post.commute?.bus}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--c-border-subtle)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--c-auto-yellow-dk)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <MapPin size={18} /> Road Links & Office Proximity
                  </h4>
                  <p style={{ fontSize: '0.98rem', color: 'var(--c-ink-muted)' }}>{post.commute?.road}</p>
                </div>
              </div>
            </section>

            {/* Schools, Hospitals & Everyday Living */}
            <section id="schools-hospitals" style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--c-ink)' }}>
                Schools, Hospitals & Everyday Conveniences
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                
                <div className="content-card" style={{ padding: '1.25rem' }}>
                  <h4 style={{ color: 'var(--c-ink)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GraduationCap size={18} color="var(--c-ripon-red)" /> Reputed Schools in Area
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.92rem', color: 'var(--c-ink-muted)' }}>
                    {post.amenities?.schools?.map((s, i) => (
                      <li key={i} style={{ marginBottom: '0.35rem' }}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="content-card" style={{ padding: '1.25rem' }}>
                  <h4 style={{ color: 'var(--c-ink)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={18} color="var(--c-temple-green)" /> Multi-Speciality Hospitals
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.92rem', color: 'var(--c-ink-muted)' }}>
                    {post.amenities?.hospitals?.map((h, i) => (
                      <li key={i} style={{ marginBottom: '0.35rem' }}>{h}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </section>

            {/* Food Spots with Filter Coffee Doodle */}
            <section id="food-spots" style={{ marginBottom: '3.5rem', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--c-ink)' }}>
                  Famous Food Spots & Local Markets
                </h2>
                <FilterCoffeeDoodle width={50} height={55} />
              </div>
              <div className="content-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Utensils size={20} color="var(--c-ripon-red)" />
                  <span style={{ fontWeight: 700, color: 'var(--c-ink)' }}>
                    Resident-Favorite Messes & Restaurants
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {post.foodSpots?.map((food, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: '#F8F5EE',
                        border: '1px solid var(--c-border)',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--c-ink)'
                      }}
                    >
                      ☕ {food}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Verdict */}
            <div className="box-notice">
              <h3 style={{ color: 'var(--c-ink)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                Summary Verdict: Who Should Rent in this Locality?
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--c-ink-muted)' }}>
                {post.whoItSuits}
              </p>
            </div>

          </div>
        ) : (
          /* GUIDE POST CONTENT */
          <div className="guide-content">
            {post.guideSections?.map((section, idx) => (
              <section key={idx} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.65rem', color: 'var(--c-ink)', marginBottom: '1rem' }}>
                  {section.heading}
                </h2>
                <div
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: 'var(--c-ink-muted)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        )}

      </div>

      {/* ── 4. VACANT HOMES IN THIS AREA (Instagram Reels) ── */}
      {post.reels && post.reels.length > 0 && (
        <section
          id="vacant-homes"
          style={{
            backgroundColor: '#F8F5EE',
            paddingBlock: '3.5rem',
            marginBlock: '3rem',
            borderTop: '1px solid var(--c-border)',
            borderBottom: '1px solid var(--c-border)',
            scrollMarginTop: '80px'
          }}
        >
          <div className="container">
            
            <div style={{ textAlign: 'center', maxWidth: '640px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="tag-eyebrow" style={{ color: 'var(--c-ripon-red)' }}>
                INSTAGRAM VIDEO TOURS
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', color: 'var(--c-ink)', marginBottom: '0.75rem' }}>
                {isLocality ? `Vacant Homes for Rent in ${post.title.split(',')[0].replace('Rent in ', '')}` : 'Vacant Homes with Fair Deposit'}
              </h2>
              <p style={{ color: 'var(--c-ink-muted)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                New vacant rental homes are posted on our Instagram first. Follow <strong>{INSTAGRAM_HANDLE}</strong> and DM us there for video walkthroughs and direct owner connects.
              </p>
            </div>

            {/* Reels Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                justifyContent: 'center',
                maxWidth: '920px',
                marginInline: 'auto'
              }}
            >
              {post.reels.map((reel) => (
                <ReelEmbed key={reel.id} reel={reel} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark"
                style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
              >
                <Instagram size={18} />
                <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
              </a>
            </div>

          </div>
        </section>
      )}

      {/* ── 5. SHORT FAQ ACCORDION ── */}
      {post.faqs && post.faqs.length > 0 && (
        <section id="faqs" className="container" style={{ maxWidth: '860px', marginBlock: '3rem', scrollMarginTop: '80px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--c-ink)' }}>
            Frequently Asked Questions about Renting in {post.title.split(',')[0].replace('Rent in ', '')}
          </h2>
          <div>
            {post.faqs.map((faq, idx) => (
              <details key={idx} className="clean-faq" open={idx === 0}>
                <summary>
                  {faq.q}
                </summary>
                <div className="faq-body">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. NEARBY AREAS & RELATED GUIDES ── */}
      <section className="container" style={{ maxWidth: '860px', marginTop: '3.5rem' }}>
        <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '2.5rem' }}>
          
          {post.nearbyAreas && post.nearbyAreas.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--c-ink)' }}>
                Compare Other Nearby Chennai Localities
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {post.nearbyAreas.map((area, idx) => (
                  <Link
                    key={idx}
                    to={`/${area.slug}`}
                    className="content-card"
                    style={{
                      padding: '1.15rem',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--c-marina-blue)', fontSize: '1.05rem' }}>
                      Rent in {area.name} →
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)' }}>
                      {area.note}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.relatedGuides && post.relatedGuides.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--c-ink)' }}>
                Essential Rental Guides & Rights in Chennai
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {post.relatedGuides.map((guide, idx) => (
                  <Link
                    key={idx}
                    to={`/${guide.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--c-border)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: 'var(--c-ink)',
                      fontWeight: 600
                    }}
                  >
                    <span>📖 {guide.title}</span>
                    <ArrowRight size={18} color="var(--c-ripon-red)" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Responsive styles for numeral column */}
      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 220px !important;
          }
          .hero-numeral-col {
            display: flex !important;
          }
        }
      `}</style>

    </article>
  );
}
