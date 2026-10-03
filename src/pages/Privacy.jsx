import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { Shield, Lock, Eye, Trash2 } from 'lucide-react';

export default function Privacy() {
  const canonicalUrl = 'https://www.chennairents.in/privacy';

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="Privacy Policy | Chennai Rents"
        description="Read the Chennai Rents privacy policy. Learn how we handle property owner details, tenant inquiry data, and protect your privacy under Indian data regulations."
        canonicalUrl={canonicalUrl}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Privacy Policy', url: canonicalUrl }
        ]}
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> PRIVACY & DATA PROTECTION
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            How We Protect Your Personal Information
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '640px', marginInline: 'auto', lineHeight: 1.6 }}>
            Last Updated: October 2026. Chennai Rents respects your privacy and complies with the Digital Personal Data Protection Act (DPDP Act, 2023) of India.
          </p>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '800px', marginTop: '2.5rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--c-ink)' }}>

          <section>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: 'var(--c-ink)' }}>
              1. Information We Collect
            </h2>
            <p>
              Chennai Rents operates as an informational publication and property search tool. We collect personal data strictly when you voluntarily submit it:
            </p>
            <ul style={{ paddingLeft: '1.4rem' }}>
              <li><strong>Property Listing Authors:</strong> Contact phone number, property address, indicative rent, and optional electricity/tax documents for owner verification.</li>
              <li><strong>Anonymous Rental Survey Contributors:</strong> Transacted rent amount, locality, and tenancy terms. Survey data is aggregated anonymously and never tied to personal identities.</li>
              <li><strong>Website Usage Analytics:</strong> Standard non-identifying server logs, browser type, referring pages, and interaction telemetry to improve page speed.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: 'var(--c-ink)' }}>
              2. How We Use and Protect Your Data
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third-party telemarketers, banks, or aggressive real estate aggregators.
            </p>
            <p>
              Your contact phone number is shared with interested tenants only if you explicitly choose to make your listing public on the platform. All sensitive database records are encrypted at rest using industry-standard AES-256 encryption.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: 'var(--c-ink)' }}>
              3. Cookies and Local Storage
            </h2>
            <p>
              We use minimal browser local storage to preserve your language preference (Tamil vs. English) and recent search filters across sessions. We do not use intrusive cross-site tracking cookies.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: 'var(--c-ink)' }}>
              4. Your Right to Erasure & Data Deletion
            </h2>
            <p>
              Under Indian DPDP Act provisions, you have the absolute right to withdraw consent and request immediate deletion of your phone number, name, and property listing from our servers at any time.
            </p>
            <p>
              To execute your right to erasure, visit our dedicated <Link to="/data-deletion" style={{ color: 'var(--c-ripon-red)', fontWeight: 600 }}>Data Deletion Request Page</Link> or email <a href="mailto:privacy@chennairents.in" style={{ color: 'var(--c-ripon-red)' }}>privacy@chennairents.in</a>. All requests are processed within 24 to 48 hours.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}
