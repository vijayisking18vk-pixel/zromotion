import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function SelectedWork({ onSelectProject }) {
  const projects = [
    {
      id: 'unfounded',
      title: 'Unfounded',
      website: 'www.unfounded.in',
      url: 'https://www.unfounded.in',
      industry: 'Venture Lab & AI Studio',
      services: 'Brand Strategy, Visual Identity, Venture Positioning, Digital Flagship',
      summary:
        'High-conviction AI ventures and deep-tech products engineered from first principles in Chennai, shipping globally to redefine intelligent software.',
      image: '/assets/images/unfounded.jpg',
      metric: 'Global AI Venture Launch',
    },
    {
      id: 'ziggers',
      title: 'Ziggers',
      website: 'www.ziggers.in',
      url: 'https://www.ziggers.in',
      industry: 'Gig Economy & On-Demand Workforce',
      services: 'Performance Marketing, App Store Optimization, Social Growth, Product UX',
      summary:
        "India's premier on-demand gig jobs and temporary workforce platform connecting businesses with verified catering, event, and delivery staff with same-day UPI payouts.",
      image: '/assets/images/ziggers.jpg',
      metric: '100k+ Shifts Dispatched',
    },
    {
      id: 'thalaimai360',
      title: 'Thalaimai 360',
      website: 'www.thalaimai360.com',
      url: 'https://thalaimai360.com',
      industry: 'Executive Leadership & Public Governance',
      services: 'Strategic Communication, Public Affairs, Narrative Architecture, Digital Influence',
      summary:
        'Elite political advisory and strategic governance firm transforming electoral mandates into measurable public impact across constituencies.',
      image: '/assets/images/thalaimai360.jpg',
      metric: '360° Public Governance',
    },
    {
      id: 'loopverse',
      title: 'LoopVerse',
      website: 'www.loopverse.in',
      url: 'https://www.loopverse.in',
      industry: 'AI & Web3 Skill Verification Protocol',
      services: 'Brand Identity, Technical SEO, Product Launch, Developer Community',
      summary:
        'Cryptographically proven, AI-validated skill verification protocol replacing unverified resumes with verifiable on-chain competency proofs.',
      image: '/assets/images/loopverse.jpg',
      metric: 'Skill Verification Protocol',
    },
  ];

  return (
    <section
      id="work"
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
            Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-h2"
          >
            Digital Work Designed <br />
            <span style={{ color: 'var(--purple-primary)' }}>to Make an Impact.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtext"
          >
            Selected client case studies showcasing our strategic, creative, and performance marketing collaborations.
          </motion.p>
        </div>

        {/* 2-Column Minimalist Case Study Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
          }}
          className="work-grid"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (idx % 2) * 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Media Card */}
              <div
                onClick={() => onSelectProject(project.id)}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'var(--bg-lavender-light)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.8rem',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />

                {/* Metric Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--purple-heading)',
                    background: 'rgba(255, 255, 255, 0.92)',
                    border: '1px solid var(--lavender-border)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '100px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 15px rgba(107, 33, 168, 0.08)',
                  }}
                >
                  {project.metric}
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--purple-primary)',
                    fontWeight: 600,
                  }}
                >
                  {project.industry}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <h3
                  onClick={() => onSelectProject(project.id)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                    fontWeight: 700,
                    color: 'var(--purple-heading)',
                    lineHeight: 1.2,
                    cursor: 'pointer',
                  }}
                >
                  {project.title}
                </h3>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    background: 'var(--bg-lavender-light)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--purple-primary)';
                    e.currentTarget.style.borderColor = 'var(--purple-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <span>{project.website}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1.2rem',
                }}
              >
                {project.summary}
              </p>

              <div
                onClick={() => onSelectProject(project.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--purple-primary)',
                  cursor: 'pointer',
                }}
              >
                <span>View Case Study</span>
                <ArrowUpRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
