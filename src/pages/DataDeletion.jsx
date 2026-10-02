import React, { useState } from 'react';
import MarinaDivider from '../components/MarinaDivider';
import SEOHead from '../components/SEOHead';
import { Trash2, CheckCircle2, ShieldAlert, Mail } from 'lucide-react';

export default function DataDeletion() {
  const canonicalUrl = 'https://www.chennairents.in/data-deletion/';
  const [submitted, setSubmitted] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [reason, setReason] = useState('Rented out');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (identifier.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="User Data Deletion Request | Chennai Rents"
        description="Request immediate removal or deletion of your property listing, phone number, and account information from Chennai Rents within 24-48 hours."
        canonicalUrl={canonicalUrl}
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.chennairents.in/' },
          { name: 'Data Deletion', url: canonicalUrl }
        ]}
      />

      <section style={{ backgroundColor: 'var(--c-header-bg)', paddingBlock: '3.5rem 2.2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="tag-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tag-bullet" /> PRIVACY RIGHTS
          </span>
          <h1 style={{ color: 'var(--c-ink)', marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Data Deletion & Listing Removal
          </h1>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ripon-red)', marginBottom: '0.6rem' }}>
            Permanent Removal within 24 to 48 Hours
          </div>
          <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.05rem', maxWidth: '640px', marginInline: 'auto', lineHeight: 1.6 }}>
            Have you found a tenant? Want to permanently delist your property or delete your contact records? Submit your request below.
          </p>
        </div>
      </section>

      <MarinaDivider />

      <div className="container" style={{ maxWidth: '640px', marginTop: '2.5rem' }}>
        {submitted ? (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--c-temple-green)', marginInline: 'auto', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.4rem', color: '#166534', marginBottom: '0.5rem' }}>
              Deletion Request Received
            </h2>
            <p style={{ color: '#15803D', lineHeight: 1.6, margin: 0 }}>
              Your request for <strong>{identifier}</strong> has been logged. Our data protection officer will permanently purge all associated listing records and contact numbers from our production database within <strong>24 to 48 hours</strong>.
            </p>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--c-ink)' }}>
                  Phone Number or Listing ID to Delete *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98400 12345 or LIST-2026-081"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--c-border)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--c-ink)' }}>
                  Reason for Deletion
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--c-border)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    background: '#fff'
                  }}
                >
                  <option value="Rented out">Property has been rented out</option>
                  <option value="Incorrect details">Inaccurate details / price change</option>
                  <option value="Privacy concern">General privacy / withdraw consent</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                <ShieldAlert size={16} style={{ display: 'inline', marginRight: '0.3rem', color: 'var(--c-ripon-red)' }} />
                Deletion requests also trigger an immediate purge of public contact numbers from cached search queries.
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--c-ripon-red)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.85rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Trash2 size={18} /> Submit Deletion Request
              </button>

            </form>
          </div>
        )}
      </div>
    </main>
  );
}
