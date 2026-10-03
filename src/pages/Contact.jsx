import React from 'react';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { Mail, MapPin, Clock, MessageSquare, Shield } from 'lucide-react';

export default function Contact() {
  const canonicalUrl = 'https://www.chennairents.in/contact/';

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="Contact Chennai Rents | Editorial, Support & Inquiries"
        description="Get in touch with the Chennai Rents team. Reach our editorial desk, report a listing, or submit local rental data."
        canonicalUrl={canonicalUrl}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Contact', url: canonicalUrl }
        ]}
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> GET IN TOUCH
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Contact Chennai Rents
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            Direct Access to Our Chennai Research & Editorial Team
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '640px', marginInline: 'auto', lineHeight: 1.6 }}>
            Whether you have a question about neighbourhood data, want to report an inaccurate listing, or wish to contribute local rental insights, we are here to help.
          </p>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '800px', marginTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Mail size={22} style={{ color: 'var(--c-ripon-red)' }} />
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--c-ink)' }}>Editorial Desk</h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              For research inquiries, fact checks, corrections, and publication partnerships:
            </p>
            <a href="mailto:editor@chennairents.in" style={{ color: 'var(--c-ripon-red)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>
              editor@chennairents.in
            </a>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Shield size={22} style={{ color: 'var(--c-marina-blue)' }} />
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--c-ink)' }}>Trust & Verification</h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              To report suspicious listings, advance deposit fraud, or request urgent listing removal:
            </p>
            <a href="mailto:trust@chennairents.in" style={{ color: 'var(--c-marina-blue)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>
              trust@chennairents.in
            </a>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <MapPin size={22} style={{ color: 'var(--c-temple-green)' }} />
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--c-ink)' }}>Location</h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
              Chennai Rents Editorial Team<br />
              Velachery / OMR Tech Corridor<br />
              Chennai, Tamil Nadu 600042
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={22} style={{ color: 'var(--c-ink)' }} />
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--c-ink)' }}>Operating Hours</h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--c-ink-muted)', lineHeight: 1.6, margin: 0 }}>
              Monday – Saturday<br />
              09:30 AM – 06:30 PM IST<br />
              Online reports monitored 24/7
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
