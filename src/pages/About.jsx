import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { AutoRickshawDoodle, RiponBuildingDoodle, FilterCoffeeDoodle } from '../components/ChennaiDoodles';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function About() {
  return (
    <main style={{ paddingBottom: '3rem' }}>
      
      {/* ── SEO JSON-LD & META INJECTION ── */}
      <SEOHead
        title="About Chennai Rents: Why We Built an Honest Rental Guide"
        description="Learn why Chennai Rents was founded: to replace spammy listing portals with honest locality rental intelligence and Instagram Reels in Chennai."
        canonicalUrl="https://www.chennairents.in/about"
        type="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'About', url: 'https://www.chennairents.in/about' }
        ]}
      />

      {/* ── HEADER ── */}
      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> ABOUT CHENNAI RENTS
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Why We Started Chennai Rents
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.5rem' }}>
            Locality-First Rental Intelligence for Chennai
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '640px', marginInline: 'auto' }}>
            An independent, locality-first rental publication built for everyone moving to or relocating within Chennai.
          </p>
        </div>
      </section>

      <MarinaDivider />

      {/* ── BACKSTORY & LOCAL MANIFESTO ── */}
      <div className="container" style={{ maxWidth: '780px', marginTop: '2.5rem' }}>
        
        <article
          style={{
            fontSize: '1.12rem',
            lineHeight: 1.8,
            color: 'var(--c-ink)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ flex: 1, minWidth: '280px' }}>
              If you have ever landed at Chennai Central with two heavy suitcases, hailed an auto-rickshaw to Velachery or Porur, 
              and spent three weekends listening to brokers demand one month brokerage plus ten months of advance deposit in cash, 
              you already know why Chennai Rents exists.
            </p>
            <AutoRickshawDoodle width={100} height={65} />
          </div>

          <p>
            Renting in Chennai has always been a unique experience. On one hand, you have the warmth of house owners who send you 
            steaming hot sweet pongal on festive mornings and treat you like family. On the other hand, you have the shock of discovering 
            that your street floods up to knee-level every November, or that your tap water turns brackish by May, forcing you to dial 
            private water tanker lorries every three days.
          </p>

          <div className="box-notice" style={{ padding: '1.5rem 1.75rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--c-ink)', marginBottom: '0.5rem' }}>
              The Anti-Broker, Direct Rental Philosophy
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--c-ink-muted)' }}>
              Traditional property listing portals are broken: packed with expired photos, phantom broker intermediaries, 
              and robotic algorithms that do not know the difference between Dhandeeswaram Nagar and Baby Nagar. 
              Chennai Rents rejects that middleman model. Instead of broker listings, we provide honest locality research 
              and a free, direct owner rental map connecting real tenants and owners directly with free listing and follow up.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--c-ink)' }}>
              What We Do Instead
            </h2>
            <RiponBuildingDoodle width={85} height={55} />
          </div>

          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--c-ink-muted)' }}>
            <li>
              <strong style={{ color: 'var(--c-ink)' }}>1. Locality-First Intelligence:</strong> Honest guides for every Chennai neighborhood covering rent averages, metro routes, school zones, and genuine water and flood history.
            </li>
            <li>
              <strong style={{ color: 'var(--c-ink)' }}>2. Instagram Video Reels:</strong> When a verified vacant home becomes available, we record a walk-through video reel and post it on <strong>{INSTAGRAM_HANDLE}</strong>. You see the actual sunlight, the bathroom tiles, the car park, and the street before deciding to visit.
            </li>
            <li>
              <strong style={{ color: 'var(--c-ink)' }}>3. Respect for Privacy:</strong> We do not track you. No cookies, no ad retargeting, no phone number harvesting.
            </li>
          </ul>

          <div className="box-water" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div style={{ maxWidth: '520px' }}>
              <h3 style={{ color: 'var(--c-marina-blue-dk)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Connect with us on Instagram
              </h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.25rem', color: 'var(--c-ink-muted)' }}>
                Looking for a home in Chennai right now? Watch our daily Reels or send us a DM on Instagram.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark"
              >
                <Instagram size={18} />
                <span>{INSTAGRAM_HANDLE} on Instagram</span>
              </a>
            </div>
            <FilterCoffeeDoodle width={60} height={65} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/" className="btn-dark" style={{ backgroundColor: 'transparent', color: 'var(--c-ink) !important', border: '1px solid var(--c-border)' }}>
              ← Return to Chennai Rents Home
            </Link>
          </div>

        </article>

      </div>

    </main>
  );
}
