import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedServices, setSelectedServices] = useState(['Brand Strategy & Resonance']);
  const [selectedBudget, setSelectedBudget] = useState('$25k - $50k');

  const servicesList = [
    'Brand Strategy & Resonance',
    'Performance Marketing',
    'Content & Social Systems',
    'Web & Product Engineering',
    'Venture Positioning',
    'App Store Optimization (ASO)',
  ];

  const budgetOptions = ['< $25,000', '$25k - $50k', '$50k - $100k', '$100,000+'];

  const toggleService = (svc) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter((s) => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(20, 16, 24, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--surface-border)',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative',
            boxShadow: '0 30px 70px rgba(20, 16, 24, 0.2)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Contact Dialog"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <div>
              <div className="signal-badge">
                <span className="signal-pulse-dot" />
                <span>INITIATE SIGNAL // DIRECT INQUIRY</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.03em',
                }}
              >
                Transmit your project scope.
              </h2>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.96rem', marginBottom: '2.5rem' }}>
                We review every inquiry personally and respond within 24 hours from our Chennai studio.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="form-two-col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Vance"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '12px',
                        background: 'var(--surface)',
                        border: '1px solid var(--surface-border)',
                        color: 'var(--ink)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '12px',
                        background: 'var(--surface)',
                        border: '1px solid var(--surface-border)',
                        color: 'var(--ink)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    Company / Venture URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://yourbrand.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      background: 'var(--surface)',
                      border: '1px solid var(--surface-border)',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Service Selection Chips */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                    Capabilities Required
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {servicesList.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          style={{
                            padding: '0.45rem 0.9rem',
                            borderRadius: '100px',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: isSelected ? 'var(--primary-deep)' : 'var(--surface)',
                            color: isSelected ? '#FFFFFF' : 'var(--ink)',
                            border: isSelected ? '1px solid var(--primary-deep)' : '1px solid var(--surface-border)',
                          }}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                    Anticipated Investment Scope
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {budgetOptions.map((opt) => {
                      const isSelected = selectedBudget === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setSelectedBudget(opt)}
                          style={{
                            padding: '0.45rem 0.9rem',
                            borderRadius: '100px',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: isSelected ? 'var(--ink)' : 'var(--surface)',
                            color: isSelected ? '#FFFFFF' : 'var(--ink)',
                            border: isSelected ? '1px solid var(--ink)' : '1px solid var(--surface-border)',
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    Project Narrative & Objectives
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your venture, current traction, and what you aim to achieve..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      background: 'var(--surface)',
                      border: '1px solid var(--surface-border)',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', paddingBlock: '1.1rem', marginTop: '0.5rem' }}
                >
                  {loading ? (
                    <span>Transmitting Signal...</span>
                  ) : (
                    <>
                      <span>Transmit Signal</span>
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success confirmation */
            <div style={{ textAlign: 'center', paddingBlock: '2.5rem 1.5rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--surface)',
                  border: '1px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'var(--primary-deep)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.75rem',
                }}
              >
                Signal Received.
              </h3>
              <p
                style={{
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '440px',
                  margin: '0 auto 2.5rem auto',
                }}
              >
                Thank you for reaching out. Our strategy team will analyze your venture scope and reply within 24 hours.
              </p>

              <button onClick={handleReset} className="btn btn-secondary">
                <span>Done</span>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
