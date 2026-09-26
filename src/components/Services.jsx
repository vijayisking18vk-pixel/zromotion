import React from 'react';
import { Compass, TrendingUp, Share2, Code2, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Compass,
    number: '01',
    title: 'Brand Strategy & Resonance',
    tag: 'Category Creation',
    description:
      'We architect unmistakable brand identities, positioning theses, and editorial design systems that command authority and turn commodity products into category leaders.',
    deliverables: ['Positioning Thesis', 'Visual Identity Systems', 'Narrative Architecture', 'Brand Monograph'],
  },
  {
    icon: TrendingUp,
    number: '02',
    title: 'Performance Marketing',
    tag: 'Quantitative Growth',
    description:
      'Precision acquisition engines across paid social, search, and app marketplaces engineered with strict unit-economic discipline and algorithmic attribution.',
    deliverables: ['Multi-Channel Paid Funnels', 'App Store Optimization (ASO)', 'Conversion Rate Optimization', 'Retention Loops'],
  },
  {
    icon: Share2,
    number: '03',
    title: 'Content & Social Distribution',
    tag: 'Viral Authority',
    description:
      'High-signal creative direction, founder-led social distribution, and cinematic short-form media designed to capture cultural attention and build enduring trust.',
    deliverables: ['Editorial Content Systems', 'Cinematic Motion Assets', 'Founder Thought Leadership', 'Community Engineering'],
  },
  {
    icon: Code2,
    number: '04',
    title: 'Web & Product Engineering',
    tag: 'Interactive Flagships',
    description:
      'Next-generation digital flagships blending fluid 3D interactions, tactile micro-animations, and blistering performance that convert visitors into diehard advocates.',
    deliverables: ['React / Next.js Flagships', 'Three.js / WebGL Tactility', 'Technical SEO Architecture', 'Micro-Interactions'],
  },
];

export default function Services({ onOpenContact }) {
  return (
    <section
      id="services"
      style={{
        padding: 'clamp(5rem, 10vw, 8.5rem) 0',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <div className="signal-badge">
              <span className="signal-pulse-dot" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="section-h2" style={{ marginBottom: 0 }}>
              Engineered to amplify.<br />
              <span style={{ color: 'var(--primary-deep)' }}>Built to scale.</span>
            </h2>
          </div>

          <p className="section-subtext" style={{ maxWidth: '440px' }}>
            A disciplined, full-funnel suite of creative and quantitative capabilities designed for ambitious founders, high-growth startups, and visionary leaders.
          </p>
        </div>

        {/* 4-Card Liquid Morphing Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {SERVICES.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="liquid-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px',
                }}
              >
                {/* Subtle radial glow orb on hover */}
                <div className="liquid-glow" />

                {/* Top Bar: Icon + Number */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--surface-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-deep)',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--ink-muted)',
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Tag */}
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--primary-deep)',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {service.tag}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                      marginBottom: '1rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.75rem',
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Deliverables tags */}
                <div
                  style={{
                    borderTop: '1px solid var(--surface-border)',
                    paddingTop: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}
                >
                  {service.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--ink)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--surface-border)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
          }}
        >
          <button
            onClick={onOpenContact}
            className="btn btn-secondary"
            style={{
              padding: '1rem 2.2rem',
            }}
          >
            <span>Discuss Custom Scope</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
