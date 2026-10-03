import React from 'react';
import { Link } from 'react-router-dom';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { ShieldCheck, UserCheck, FileCheck, PhoneCall, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function Verification() {
  const canonicalUrl = 'https://www.chennairents.in/verification';

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="Listing Verification & Trust Standards | Chennai Rents"
        description="Discover how Chennai Rents authenticates direct owners, prevents advance fraud, and validates rental listings across Chennai."
        canonicalUrl={canonicalUrl}
        type="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Verification Standards', url: canonicalUrl }
        ]}
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> TRUST & FRAUD PREVENTION
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Listing Verification Standards
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            Zero-Tolerance for Rental Scams & Phantom Properties
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '660px', marginInline: 'auto', lineHeight: 1.6 }}>
            Rental fraud in major metro cities frequently exploits desperate tenants with fake photos, demands for advance UPI transfers, and fabricated identities. Here is how we verify listings.
          </p>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '800px', marginTop: '2.5rem' }}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--c-ink)' }}>

          {/* Verification Protocol */}
          <section>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.85rem', color: 'var(--c-ink)' }}>
              The 4-Step Chennai Rents Verification Protocol
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              
              <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <UserCheck size={20} style={{ color: 'var(--c-temple-green)' }} />
                  <strong style={{ fontSize: '1.05rem' }}>1. Identity Verification</strong>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', margin: 0, lineHeight: 1.55 }}>
                  The listing author’s phone number is verified via automated SMS OTP. Government ID proof (Aadhaar/PAN) is cross-checked during manual editorial review.
                </p>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FileCheck size={20} style={{ color: 'var(--c-marina-blue)' }} />
                  <strong style={{ fontSize: '1.05rem' }}>2. Property Title Validation</strong>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', margin: 0, lineHeight: 1.55 }}>
                  Owners submitting listings must provide a recent TANGEDCO Electricity consumer receipt or property tax assessment number matching the physical address.
                </p>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--c-ripon-red)' }} />
                  <strong style={{ fontSize: '1.05rem' }}>3. Genuine Photo Audit</strong>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', margin: 0, lineHeight: 1.55 }}>
                  All photos and walkthrough videos are audited against reverse-image databases to ensure they are not recycled stock images or stolen from other portals.
                </p>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <PhoneCall size={20} style={{ color: 'var(--c-ink)' }} />
                  <strong style={{ fontSize: '1.05rem' }}>4. Tenant Availability Check</strong>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-muted)', margin: 0, lineHeight: 1.55 }}>
                  Listings older than 30 days are automatically archived unless the owner confirms the property remains vacant and available.
                </p>
              </div>

            </div>
          </section>

          {/* Fraud Advisory */}
          <section style={{ background: '#FFF8F6', border: '1px solid #F0C4BC', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
              <AlertOctagon size={24} style={{ color: 'var(--c-ripon-red)' }} />
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--c-ripon-red)' }}>
                Crucial Advisory: Never Transfer Token Advance Before Physical Inspection
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--c-ink)', margin: 0 }}>
              Scammers frequently pose as army officers, defense personnel, or landlords based out of town who ask for a "gate pass fee" or "token booking deposit" via UPI before showing the house. <strong>Chennai Rents never charges tenants a viewing fee, and genuine landlords will always invite you to view the home in person before asking for a deposit.</strong>
            </p>
          </section>

          {/* Reporting Section */}
          <section>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--c-ink)' }}>
              How to Report a Suspicious Listing
            </h2>
            <p>
              If you encounter an inaccurate rent quote, an unreachable phone number, or an agent masquerading as an owner, please report it immediately:
            </p>
            <ul style={{ paddingLeft: '1.4rem', marginBlock: '0.75rem' }}>
              <li>Click the <strong>"Report this listing"</strong> link on any property card.</li>
              <li>Or email <a href="mailto:trust@chennairents.in" style={{ color: 'var(--c-ripon-red)', fontWeight: 600 }}>trust@chennairents.in</a> with the listing ID.</li>
            </ul>
            <p>
              Reported listings are temporarily hidden and audited by a human editor within 12 hours.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}
