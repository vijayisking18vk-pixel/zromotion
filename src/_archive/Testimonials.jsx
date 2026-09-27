import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'Zromotion helped us clarify our brand narrative and scale our customer acquisition with genuine precision. Their team operates with high aesthetic discernment and deep commercial accountability.',
      name: 'Elena Rostova',
      title: 'VP Brand & Marketing',
      company: 'Aurelia Skin Labs',
      avatar: '/assets/images/avatar-elena.jpg',
    },
    {
      quote:
        'Finding an agency that masters both creative design and analytical performance marketing is rare. Zromotion unified our messaging and delivered consistent, measurable growth across our core channels.',
      name: 'Marcus Chen',
      title: 'Chief Growth Officer',
      company: 'Nexa Finance Group',
      avatar: '/assets/images/avatar-marcus.jpg',
    },
    {
      quote:
        'Collaborating with Zromotion felt like an authentic creative partnership. They listened carefully to our vision, refined our digital flagship, and elevated our brand perception significantly.',
      name: 'Sofia Lindqvist',
      title: 'Creative Director',
      company: 'Velora Living',
      avatar: '/assets/images/avatar-sofia.jpg',
    },
  ];

  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section
      style={{
        paddingBlock: 'clamp(6rem, 10vw, 10rem)',
        backgroundColor: 'var(--bg-lavender-light)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
          <div className="section-tag">Testimonials</div>
          <h2 className="section-h2">
            Trusted by Founders <br />
            <span style={{ color: 'var(--purple-primary)' }}>and Growth Leaders.</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div
          style={{
            maxWidth: '920px',
            marginInline: 'auto',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            boxShadow: '0 8px 30px rgba(107, 33, 168, 0.04)',
            position: 'relative',
          }}
        >
          <div style={{ color: 'var(--lavender-brand)', marginBottom: '1.5rem' }}>
            <Quote size={44} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.8rem)',
                  fontWeight: 600,
                  lineHeight: 1.45,
                  color: 'var(--purple-heading)',
                  marginBottom: '2.5rem',
                }}
              >
                “{t.quote}”
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--lavender-border)',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--purple-heading)',
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {t.title}, {t.company}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid var(--lavender-border)',
                      background: 'var(--lavender-subtle)',
                      color: 'var(--purple-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--purple-primary)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--lavender-subtle)';
                      e.currentTarget.style.color = 'var(--purple-primary)';
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid var(--lavender-border)',
                      background: 'var(--lavender-subtle)',
                      color: 'var(--purple-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--purple-primary)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--lavender-subtle)';
                      e.currentTarget.style.color = 'var(--purple-primary)';
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
