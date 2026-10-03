import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { ShieldCheck, Droplets, AlertTriangle, Database, Calendar, Award } from 'lucide-react';
import { AUTHOR_INFO } from '../data/rentalGuideData';

export default function Methodology() {
  const canonicalUrl = 'https://www.chennairents.in/methodology';

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="Research & Data Methodology: Rent, Water & Flood Scoring | Chennai Rents"
        description="Learn how Chennai Rents calculates median rental rates, water availability scores, and monsoon flood risk ratings across Chennai neighbourhoods."
        canonicalUrl={canonicalUrl}
        type="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Methodology', url: canonicalUrl }
        ]}
      />

      {/* Header */}
      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> EDITORIAL & DATA STANDARDS
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Our Research & Data Methodology
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            How Chennai Rents Measures Real Neighbourhood Realities
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '660px', marginInline: 'auto', lineHeight: 1.6 }}>
            Every rent range, water rating, and flood advisory on Chennai Rents is grounded in empirical local surveys, tenant feedback, and municipal benchmarks.
          </p>
          <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', fontSize: '0.88rem', color: 'var(--c-ink-muted)' }}>
            <span>Lead Researcher: <Link to="/author/vijayrajkumar" style={{ color: 'var(--c-ripon-red)', fontWeight: 600, textDecoration: 'none' }}>{AUTHOR_INFO.name}</Link></span>
            <span>•</span>
            <span>Last Updated: October 2026</span>
          </div>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '800px', marginTop: '2.5rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--c-ink)' }}>

          {/* Section 1: Rent Data Collection */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <Database size={24} style={{ color: 'var(--c-ripon-red)' }} />
              <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--c-ink)' }}>
                1. How We Collect and Calculate Rental Rates
              </h2>
            </div>
            <p>
              Unlike commercial listing aggregators that publish inflated asking prices set by brokers, Chennai Rents estimates rental figures based on <strong>transacted rents</strong>. Our dataset is assembled through three distinct verification channels:
            </p>
            <ul style={{ paddingLeft: '1.4rem', marginBlock: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Direct Tenancy Review:</strong> Quarterly anonymous survey responses from active tenants across 14 Chennai zones sharing actual signed lease amounts, maintenance charges, and advance deposits.</li>
              <li><strong>Owner-Direct Submissions:</strong> Real listings vetted through our zero-brokerage platform where title deeds and recent utility bills confirm realistic asking prices.</li>
              <li><strong>Local On-Ground Checks:</strong> Direct field visits and local Resident Welfare Association (RWA) consultations in high-velocity neighbourhoods like Velachery, Porur, OMR, and Valasaravakkam.</li>
            </ul>
            <p>
              We report indicative rent ranges (e.g., 25th percentile to 75th percentile) rather than single misleading averages, reflecting variance caused by building age, dedicated car parking, elevator access, and cross-street elevation.
            </p>
          </section>

          {/* Section 2: Water Supply Scoring */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <Droplets size={24} style={{ color: 'var(--c-marina-blue)' }} />
              <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--c-ink)' }}>
                2. Water Supply Reality Scoring (1 to 10 Scale)
              </h2>
            </div>
            <p>
              Water security is the single most critical factor for renters in Chennai. Our proprietary 10-point Water Score evaluates three core dimensions:
            </p>
            <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem', marginBlock: '0.75rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--c-temple-green)' }}>Score 8.0 – 10.0 (High Reliability):</strong> Piped Chennai Metro Water (CMWSSB) delivered daily or on reliable alternate days; sweet potable groundwater table; minimal tanker reliance even during May–July peak summer. (e.g., Adyar, Gandhi Nagar, Shastri Nagar).
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--c-marina-blue)' }}>Score 6.0 – 7.9 (Moderate Reliability):</strong> CMWSSB supply supplemented by deep borewells. Private water tankers required primarily during extreme drought months (₹1,200–₹1,800 per load shared by residents). (e.g., Velachery Dhandeeswaram, Valasaravakkam, Taramani).
              </div>
              <div>
                <strong style={{ color: 'var(--c-ripon-red)' }}>Score Below 6.0 (High Tanker Reliance):</strong> Limited or absent municipal pipeline infrastructure; high total dissolved solids (TDS) or brackish borewell water; permanent reliance on 12,000-litre private tankers throughout the year.
              </div>
            </div>
          </section>

          {/* Section 3: Flood Risk Assessment */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <AlertTriangle size={24} style={{ color: 'var(--c-ripon-red)' }} />
              <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--c-ink)' }}>
                3. Flood Risk & Monsoon Waterlogging Assessment
              </h2>
            </div>
            <p>
              Chennai experienced historic catastrophic rainfall events in December 2015 and Cyclone Michaung in December 2023. Our flood classifications do not paint whole pin codes with a broad brush; instead, they distinguish elevated ridges from low-lying natural catchment basins:
            </p>
            <ul style={{ paddingLeft: '1.4rem', marginBlock: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Topographic Plinth Inspection:</strong> Ground elevation relative to the nearest arterial stormwater drains (SWD) and surplus lake canals (e.g., Velachery lake surplus, Porur lake outflow, Pallikaranai marsh).</li>
              <li><strong>Cyclonic Stagnation Records:</strong> Verified field observations during Cyclone Michaung (2023) documenting street-level drainage velocity (drained within 6 hours vs. stagnant for 48+ hours).</li>
              <li><strong>Floor-Level Recommendations:</strong> Actionable tenant guidance specifying which specific micro-streets require renting on the 1st floor or above.</li>
            </ul>
          </section>

          {/* Section 4: Review Schedule */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <Calendar size={24} style={{ color: 'var(--c-ink)' }} />
              <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--c-ink)' }}>
                4. Quarterly Fact-Checking & Review Schedule
              </h2>
            </div>
            <p>
              All locality profiles, rental ranges, and transit maps are audited on a quarterly basis. When new infrastructure opens, such as Chennai Metro Phase 2 corridors or new stormwater drain channels, neighbourhood guides are immediately updated.
            </p>
            <p>
              To suggest a correction or submit recent rent transaction data for your street, visit our <Link to="/corrections" style={{ color: 'var(--c-ripon-red)', fontWeight: 600 }}>Corrections & Editorial Policy</Link> page or email <a href="mailto:editor@chennairents.in" style={{ color: 'var(--c-ripon-red)' }}>editor@chennairents.in</a>.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}
