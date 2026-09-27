import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs({ onOpenContact }) {
  const highlights = [
    {
      title: 'Clear Strategic Thinking',
      desc: 'Every creative decision and campaign dollar is rooted in empirical commercial logic, category analysis, and measurable objectives.',
    },
    {
      title: 'Creative Campaigns',
      desc: 'We reject formulaic templates in favor of original storytelling and visual design systems that capture genuine market attention.',
    },
    {
      title: 'Data-Informed Decisions',
      desc: 'Rigorous multivariate testing, cohort attribution, and real-time analytics continually optimize acquisition costs and conversion rates.',
    },
    {
      title: 'Transparent Communication',
      desc: 'No convoluted agency bureaucracy. You communicate directly with seasoned senior strategists with complete reporting visibility.',
    },
    {
      title: 'Flexible Collaboration',
      desc: 'We integrate seamlessly with your internal leadership and marketing teams as an agile extension of your company.',
    },
    {
      title: 'Long-Term Brand Building',
      desc: 'We balance immediate performance revenue with enduring brand equity, customer loyalty, and sustainable enterprise value.',
    },
  ];

  return (
    <section
      style={{
        paddingBlock: 'clamp(6rem, 10vw, 10rem)',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '850px', marginBottom: '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-tag"
          >
            Why Choose Zromotion
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-h2"
          >
            More Than Marketing. <br />
            <span style={{ color: 'var(--purple-primary)' }}>A Partner for Growth.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtext"
          >
            We focus on meaningful brand distinction that drives sustainable customer retention, price elasticity, and market leadership.
          </motion.p>
        </div>

        {/* 6 Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.8rem',
          }}
          className="why-grid"
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{
                background: 'var(--bg-lavender-light)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '18px',
                padding: '2.2rem 1.8rem',
              }}
            >
              <div style={{ color: 'var(--purple-primary)', marginBottom: '1rem' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--purple-heading)',
                  marginBottom: '0.6rem',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
