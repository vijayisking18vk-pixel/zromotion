import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { CheckCircle2, History, Send, Mail } from 'lucide-react';

export default function Corrections() {
  const canonicalUrl = 'https://www.chennairents.in/corrections/';

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="Corrections & Editorial Policy | Chennai Rents"
        description="Review our editorial integrity policy, how we fact-check Chennai rental data, and how to submit corrections to our research team."
        canonicalUrl={canonicalUrl}
        type="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Corrections Policy', url: canonicalUrl }
        ]}
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> EDITORIAL INTEGRITY
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Corrections & Fact-Checking Policy
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            Transparency, Accountability & Open Community Review
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '660px', marginInline: 'auto', lineHeight: 1.6 }}>
            Our editorial goal is 100% empirical truth. When facts on the ground change or an inaccuracy is identified, we correct it promptly and transparently.
          </p>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '800px', marginTop: '2.5rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--c-ink)' }}>

          <section>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem', color: 'var(--c-ink)' }}>
              Our Fact-Checking Commitment
            </h2>
            <p>
              Chennai Rents adheres to independent journalistic fact-checking standards. Every rental guide, legal interpretation of the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act (TNRRRL Act), and water availability assessment undergoes internal editorial review prior to publication.
            </p>
            <p>
              We do not accept sponsored content, paid ranking placements for brokers, or undisclosed commercial endorsements.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem', color: 'var(--c-ink)' }}>
              How to Submit a Correction
            </h2>
            <p>
              If you identify an error in a rent estimate, an out-of-date bus route, an incorrect Metro station location, or a discrepancy in flood records, please notify us:
            </p>
            <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={20} style={{ color: 'var(--c-ripon-red)' }} />
                <span><strong>Editorial Desk Email:</strong> <a href="mailto:editor@chennairents.in" style={{ color: 'var(--c-ripon-red)', textDecoration: 'none' }}>editor@chennairents.in</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Send size={20} style={{ color: 'var(--c-marina-blue)' }} />
                <span><strong>Response Window:</strong> Our team reviews and responds to all verification inquiries within <strong>48 hours</strong>.</span>
              </div>
            </div>
            <p style={{ marginTop: '1rem' }}>
              Please include the page URL, the specific sentence or data point in question, and your supporting evidence (e.g., photo of local notice, lease agreement excerpt, or official CMWSSB / CMRL notification).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem', color: 'var(--c-ink)' }}>
              Public Corrections & Revision Log
            </h2>
            <div style={{ borderLeft: '3px solid var(--c-marina-blue)', paddingLeft: '1.25rem' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>October 2026 Audit</p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: 'var(--c-ink-muted)' }}>
                Consolidated locality route canonicals to standard <code>/chennai/[locality]/</code> directories. Refined water reliability scores following completion of new CMWSSB pipeline commissioning in Velachery and Sholinganallur.
              </p>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
