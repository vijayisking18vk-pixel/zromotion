import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getPostBySlug, LOCALITY_POSTS, GUIDE_POSTS } from '../data/posts';
import MarinaDivider from '../components/MarinaDivider';
import ReelEmbed from '../components/ReelEmbed';
import SEOHead from '../components/SEOHead';
import { 
  AutoRickshawDoodle, 
  FilterCoffeeDoodle, 

  HandDrawnArrow,
  MtcBusDoodle 
} from '../components/ChennaiDoodles';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';
import { Instagram } from 'lucide-react';

// Reusable animated section wrapper
function AnimatedSection({ children, reduce, className = "", style = {} }) {
  if (reduce) {
    return <section className={className} style={style}>{children}</section>;
  }
  return (
    <motion.section 
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// Custom Animated Accordion
function AnimatedFAQ({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="animated-faq">
      <button 
        className="animated-faq-summary" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{faq.q}</span>
        <motion.span 
          animate={reduce ? {} : { rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block', flexShrink: 0, color: 'var(--c-marina-blue)', fontSize: '1.2rem' }}
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div className="animated-faq-body">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PostTemplate() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Post Not Found</h2>
        <p>Sorry, we couldn't find that guide or locality.</p>
        <Link to="/" className="btn-dark" style={{ marginTop: '2rem' }}>Return to Home</Link>
      </main>
    );
  }

  const isLocality = post.type === 'locality';
  const isStory = post.type === 'story';
  const mainTitle = post.title.split(',')[0];
  const canonicalUrl = isStory
    ? `https://www.chennairents.in/stories/${slug}`
    : isLocality
    ? `https://www.chennairents.in/chennai/${slug.replace('rent-in-', '')}`
    : `https://www.chennairents.in/guides/${slug}`;

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEOHead 
        title={`${post.title} | ${isStory ? 'Data Story' : isLocality ? 'Rent' : 'Guide'} | Chennai Rents`}
        description={post.summary}
        type="article"
        canonical={canonicalUrl}
        faqs={post.faqs || []}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: isStory ? 'Data Stories' : isLocality ? 'Localities' : 'Guides', url: isStory ? 'https://www.chennairents.in/listings' : isLocality ? 'https://www.chennairents.in/chennai/rentals' : 'https://www.chennairents.in/#guides' },
          { name: post.title, url: canonicalUrl }
        ]}
      />

      {/* ── HERO SECTION ── */}
      <section className="hero-sky-section">
        <div className="container hero-grid">
          <motion.div 
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="seo-breadcrumbs">
              <Link to="/">Home</Link> / 
              <span style={{ color: 'var(--c-ink)' }}>{isStory ? 'Data Stories' : isLocality ? 'Localities' : 'Guides'}</span> / 
              <span style={{ color: 'var(--c-ink)', fontWeight: 600 }}>{mainTitle}</span>
            </div>
            
            <span className="tag-eyebrow">
              <span className="tag-bullet" /> {post.badge || (isLocality ? 'LOCALITY GUIDE' : 'RENTING GUIDE')}
            </span>
            
            <h1 style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>{mainTitle}</h1>
            
            {post.subheading && (
              <p style={{ fontSize: '1.25rem', color: 'var(--c-ripon-red)', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                {post.subheading}
              </p>
            )}
            
            <p style={{ fontSize: '1.1rem', color: 'var(--c-ink)', maxWidth: '640px' }}>
              {post.summary || post.tagline}
            </p>
            
            <div className="meta-editorial" style={{ marginTop: '2rem' }}>
              {post.readTime ? post.readTime.toUpperCase() : '5 MIN READ'} • UPDATED: {post.updatedDate}
            </div>
          </motion.div>

          <div className="hero-numeral-col">
            <motion.div 
              initial={reduce ? false : { scale: 0.8, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="editorial-numeral">
                {isLocality ? '0' + (LOCALITY_POSTS.findIndex(p => p.slug === slug) + 1) : 'G'}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <MarinaDivider variant="default" />

      {/* ── MAIN CONTENT & DESKTOP SIDE RAIL ── */}
      <div className="post-layout">
        
        <main className="post-main">
          
          {/* Quick Jump (TOC) */}
          <AnimatedSection reduce={reduce}>
            <div className="quick-jump-box">
              <h4>Quick Jump</h4>
              <nav className="quick-jump-links">
                {isLocality && (
                  <>
                    <a href="#rent-rates">Rent Rates</a>
                    <a href="#water-flood">Water & Flooding</a>
                    <a href="#commute">Commute</a>
                  </>
                )}
                {!isLocality && post.guideSections?.map((sec, i) => (
                  <a key={i} href={`#guide-${i}`}>{sec.heading}</a>
                ))}
                {post.reels?.length > 0 && <a href="#vacant-homes">Vacant Homes (Reels)</a>}
                {post.faqs?.length > 0 && <a href="#faq">FAQs</a>}
              </nav>
            </div>
          </AnimatedSection>

          {/* LOCALITY CONTENT */}
          {isLocality && (
            <>
              {/* Rent Rates */}
              {post.rentRanges && (
                <AnimatedSection reduce={reduce} style={{ marginTop: '3rem' }}>
                  <h2 id="rent-rates" style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Average Rent in {mainTitle}
                  </h2>
                  <div className="bhk-table-wrap">
                    <table className="bhk-table">
                      <thead>
                        <tr>
                          <th>Configuration</th>
                          <th>Typical Monthly Rent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.rentRanges.map((range, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 600 }}>{range.bhk}</td>
                            <td>{range.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--c-ink-light)' }}>
                    *These are ground-reality asking rates (including typical maintenance) directly from owners as of late 2026, avoiding inflated broker listings.
                  </p>
                </AnimatedSection>
              )}

              {/* Water & Flooding */}
              {post.waterReality && (
                <AnimatedSection reduce={reduce} style={{ marginTop: '3.5rem' }}>
                  <h2 id="water-flood" style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Water & Flood Reality
                  </h2>
                  
                  <div className="box-water">
                    <h3 style={{ color: 'var(--c-marina-blue-dk)', fontSize: '1.1rem' }}> Summer Water Reality ({post.waterReality.score}/10)</h3>
                    <p style={{ color: 'var(--c-ink)', marginBottom: 0, marginTop: '0.5rem' }}>{post.waterReality.detail}</p>
                  </div>
                  
                  <div className="box-flood">
                    <h3 style={{ color: 'var(--c-ripon-red)', fontSize: '1.1rem' }}>🌧️ Monsoon Flood Check</h3>
                    <p style={{ color: 'var(--c-ink)', marginBottom: 0, marginTop: '0.5rem' }}>{post.floodCheck.detail}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Commute */}
              {post.commute && (
                <AnimatedSection reduce={reduce} style={{ marginTop: '3.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: 0, opacity: 0.6 }}>
                    <AutoRickshawDoodle width={70} height={45} />
                  </div>
                  <h2 id="commute" style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Commute & Transport
                  </h2>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {Object.entries(post.commute).map(([key, value], i) => (
                      <li key={i}>
                        <strong style={{ textTransform: 'capitalize' }}>{key}: </strong>
                        {value}
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              {/* Food Spots */}
              {post.foodSpots && (
                <AnimatedSection reduce={reduce} style={{ marginTop: '3.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-5px', right: 0, opacity: 0.8 }}>
                    <FilterCoffeeDoodle width={50} height={55} />
                  </div>
                  <h2 id="food" style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Local Food Spots
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {post.foodSpots.map((spot, i) => (
                      <span key={i} style={{ backgroundColor: '#F8F5EE', padding: '0.4rem 0.85rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}>
                        {spot}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Who it suits */}
              {post.whoItSuits && (
                <AnimatedSection reduce={reduce} style={{ marginTop: '3.5rem' }}>
                  <div className="box-notice" style={{ backgroundColor: '#FAF7F2', borderColor: 'var(--c-ink)', borderRadius: '8px', borderLeftWidth: '6px' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>Who should rent here?</h3>
                    <p style={{ marginBottom: 0, marginTop: '0.5rem', color: 'var(--c-ink)' }}>{post.whoItSuits}</p>
                  </div>
                </AnimatedSection>
              )}
            </>
          )}

          {/* GUIDE CONTENT */}
          {!isLocality && post.guideSections && (
            <div style={{ marginTop: '2rem' }}>
              {post.guideSections.map((section, idx) => (
                <AnimatedSection key={idx} reduce={reduce} style={{ marginTop: '3.5rem' }}>
                  <h2 id={`guide-${idx}`} style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    {section.heading}
                  </h2>
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                  {section.alertBox && (
                    <div className={section.alertBox.type === 'warning' ? 'box-flood' : 'box-notice'}>
                      <p style={{ margin: 0, color: 'var(--c-ink)', fontWeight: 500 }}>{section.alertBox.text}</p>
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* ── REELS (VACANT HOMES) ── */}
          {post.reels?.length > 0 && (
            <AnimatedSection reduce={reduce} style={{ marginTop: '4rem', padding: '3rem 0', backgroundColor: '#F8F5EE', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>

              
              <div style={{ paddingInline: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 id="vacant-homes" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Vacant Homes in {mainTitle}
                </h2>
                <p>We post genuine, verified vacant homes as video walk-throughs on our Instagram.</p>
              </div>

              <div className="reels-row-mobile">
                {post.reels.map((reel) => (
                  <div key={reel.id} className="reel-snap-item">
                    <ReelEmbed reel={reel} />
                  </div>
                ))}
              </div>

              <div style={{ paddingInline: '1.5rem', marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                <motion.a 
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark instagram-pulse"
                  style={{ borderRadius: '30px' }}
                  whileHover={reduce ? {} : { scale: 1.05 }}
                  whileTap={reduce ? {} : { scale: 0.95 }}
                >
                  <Instagram size={18} />
                  <span>Follow @chennai_rents for new homes</span>
                </motion.a>
                <HandDrawnArrow width={40} height={40} direction="right" style={{ transform: 'rotate(180deg) translateY(5px)' }} />
              </div>
            </AnimatedSection>
          )}

          {/* ── FAQS ── */}
          {post.faqs?.length > 0 && (
            <AnimatedSection reduce={reduce} style={{ marginTop: '4rem' }}>
              <h2 id="faq" style={{ borderBottom: '2px solid var(--c-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                Frequently Asked Questions
              </h2>
              <div>
                {post.faqs.map((faq, i) => (
                  <AnimatedFAQ key={i} faq={faq} />
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* ── EDITORIAL & LEGAL DISCLAIMER ── */}
          <div style={{ marginTop: '2.5rem', padding: '1.25rem', backgroundColor: '#FAF7F2', borderRadius: '8px', borderLeft: '4px solid var(--c-auto-yellow)', fontSize: '0.85rem', color: 'var(--c-ink-muted)', lineHeight: 1.6 }}>
            <strong>Editorial & Consumer Advisory:</strong> Rental benchmarks, water observations, and tenancy norms published on Chennai Rents are compiled for transparency from local contributors and public records. They do not constitute formal legal counsel. For specific lease disputes or contract registration, refer to the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act (TNRRRL Act) or consult a qualified legal advocate.
          </div>

        </main>

        {/* ── DESKTOP SIDE RAIL ── */}
        <aside className="side-rail">
          {post.nearbyAreas?.length > 0 && (
            <div className="rail-card">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MtcBusDoodle width={24} height={18} /> Nearby Areas
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {post.nearbyAreas.map((area, i) => {
                  const areaPost = LOCALITY_POSTS.find(p => p.slug === area.slug);
                  return (
                    <Link key={i} to={`/chennai/${area.slug.replace('rent-in-', '')}`} className="rail-link">
                      {area.name} {areaPost?.waterReality?.score && <span style={{ color: 'var(--c-marina-blue)', fontSize: '0.75rem', fontWeight: 500, marginLeft: '0.4rem' }}>Water: {areaPost.waterReality.score}/10</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {post.relatedGuides?.length > 0 && (
            <div className="rail-card">
              <h4>Related Guides</h4>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {post.relatedGuides.map((guide, i) => (
                  <Link key={i} to={`/guides/${guide.slug}`} className="rail-link">
                    {guide.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Always show popular guides */}
          <div className="rail-card" style={{ backgroundColor: '#FAF7F2', borderColor: 'var(--c-auto-yellow)' }}>
            <h4 style={{ borderColor: 'var(--c-auto-yellow-dk)', color: 'var(--c-ink)' }}>Must Read</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {GUIDE_POSTS.slice(0, 3).map((guide, i) => (
                <Link key={i} to={`/guides/${guide.slug}`} className="rail-link" style={{ borderColor: 'var(--c-border)' }}>
                  {guide.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>

      </div>

      <MarinaDivider variant="compact" />

      {/* ── BOTTOM MOBILE LINKS ── */}
      <div className="container hide-desktop" style={{ paddingBlock: '3rem', borderTop: '1px solid var(--c-border)' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>Explore More</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {post.nearbyAreas?.map((area, i) => (
            <Link
              key={`mob-near-${i}`}
              to={`/chennai/${area.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F8F5EE',
                color: 'var(--c-ink)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md, 8px)',
                padding: '0.65rem 1rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.92rem',
              }}
            >
               {area.name}
            </Link>
          ))}
          {post.relatedGuides?.map((guide, i) => (
            <Link
              key={`mob-guide-${i}`}
              to={`/guides/${guide.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#EBF3FA',
                color: 'var(--c-marina-blue-dk)',
                border: '1px solid var(--c-marina-blue)',
                borderRadius: 'var(--radius-md, 8px)',
                padding: '0.65rem 1rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.92rem',
              }}
            >
               {guide.title}
            </Link>
          ))}
        </div>
      </div>

    </motion.article>
  );
}
