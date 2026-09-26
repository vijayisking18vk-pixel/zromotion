import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { num: '50+', label: 'Brands Elevated' },
    { num: '100+', label: 'Campaigns Delivered' },
    { num: '12+', label: 'Industries Served' },
    { num: '4.9/5', label: 'Client Satisfaction' },
  ];

  return (
    <section
      id="about"
      style={{
        paddingBlock: 'clamp(6rem, 10vw, 10rem)',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="section-tag"
          >
            About Zromotion
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-h2"
          >
            Creative thinking. Clear strategy. <br />
            <span style={{ color: 'var(--purple-primary)' }}>Measurable growth.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
              lineHeight: 1.7,
              color: 'var(--text-charcoal)',
              marginBottom: '3.5rem',
              maxWidth: '820px',
            }}
          >
            Zromotion helps businesses build stronger brands and connect with the right audience through thoughtful strategy, engaging creative work, and performance-focused digital marketing.
          </motion.p>
        </div>

        {/* Minimal Statistics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                background: 'var(--bg-lavender-light)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '2rem 1.8rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--purple-heading)',
                  lineHeight: 1,
                  marginBottom: '0.6rem',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
