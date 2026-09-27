import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const STEPS = [
  {
    phase: '01',
    title: 'Signal Discovery & Category Audit',
    timeframe: 'Weeks 1-2',
    description:
      'We deconstruct your category landscape, analyze competitive blind spots, and unearth the unique resonance signals that will distinguish your brand from market noise.',
    signals: ['Competitor Moat Audit', 'Audience Psychographics', 'Value Proposition Stress-Test'],
  },
  {
    phase: '02',
    title: 'Strategic Architecture & Positioning',
    timeframe: 'Weeks 3-4',
    description:
      'Crafting the positioning thesis, visual identity monographs, quantitative growth models, and message frameworks that establish unquestioned market authority.',
    signals: ['Brand Monograph', 'Acquisition Channel Matrix', 'Creative Direction Deck'],
  },
  {
    phase: '03',
    title: 'Build & Full-Stack Deployment',
    timeframe: 'Weeks 5-7',
    description:
      'High-velocity creative production: interactive flagships, high-converting funnel infrastructure, cinematic motion assets, and programmatic ad matrices.',
    signals: ['WebGL / Next.js Flagships', 'Multi-Variant Ad Creative', 'Attribution Tracking'],
  },
  {
    phase: '04',
    title: 'Coordinated Launch & Blitz',
    timeframe: 'Week 8',
    description:
      'Orchestrated multi-channel amplification blitz designed to create maximum cultural impact, high-volume initial adoption, and rapid viral distribution.',
    signals: ['PR & Founder Amplification', 'Paid Media Blitz', 'Live Conversion Tuning'],
  },
  {
    phase: '05',
    title: 'Algorithmic Scale & Compounding',
    timeframe: 'Ongoing',
    description:
      'Continuous quantitative experimentation, algorithmic CAC reduction, retention loop engineering, and compounding long-term brand equity.',
    signals: ['LTV/CAC Algorithmic Optimization', 'Iterative Creative Refresh', 'Market Dominance'],
  },
];

export default function Process() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Lightswind Scroll Timeline scroll tracking
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 40%', 'end 85%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const newIndex = Math.floor(v * STEPS.length);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < STEPS.length) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  const getCardVariants = (index) => {
    const isEven = index % 2 === 0;
    return {
      initial: {
        opacity: 0,
        x: isEven ? -40 : 40,
        y: 20,
      },
      whileInView: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: true, margin: '-60px' },
    };
  };

  return (
    <section
      id="process"
      ref={scrollRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8.5rem) 0',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid var(--surface-border)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header - Unchanged Brand Typography & Styling */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 5rem auto' }}>
          <div className="signal-badge">
            <span className="signal-pulse-dot" />
            <span>THE 5-PHASE SIGNAL PROTOCOL</span>
          </div>
          <h2 className="section-h2">
            How we transmit<br />
            <span style={{ color: 'var(--primary-deep)' }}>compounding momentum.</span>
          </h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            A disciplined, linear methodology designed to eliminate guesswork, accelerate validation, and systematically scale your brand's market resonance.
          </p>
        </div>

        {/* Lightswind Scroll Timeline Container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="timeline-root"
        >
          {/* Base Background Track Line */}
          <div
            className="timeline-track-base"
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              width: '2px',
              backgroundColor: 'var(--surface-border)',
              zIndex: 1,
            }}
          />

          {/* Lightswind Dynamic Filled Progress Line */}
          <motion.div
            className="timeline-track-fill"
            style={{
              position: 'absolute',
              top: '20px',
              width: '2px',
              height: progressHeight,
              background: 'linear-gradient(to bottom, #8C7AE6 0%, #B9A6F2 100%)',
              boxShadow: '0 0 14px rgba(140, 122, 230, 0.6), 0 0 24px rgba(185, 166, 242, 0.4)',
              zIndex: 2,
              borderRadius: '9999px',
            }}
          />

          {/* Lightswind Traveling Glow Comet at the head of the progress line */}
          <motion.div
            className="timeline-comet"
            style={{
              position: 'absolute',
              top: progressHeight,
              zIndex: 10,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(140,122,230,0.95) 0%, rgba(185,166,242,0.6) 45%, rgba(185,166,242,0) 70%)',
                boxShadow: `
                  0 0 16px 4px rgba(140, 122, 230, 0.7),
                  0 0 28px 8px rgba(185, 166, 242, 0.5),
                  0 0 42px 14px rgba(185, 166, 242, 0.3)
                `,
              }}
              animate={{
                scale: [1, 1.35, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Timeline Events: Alternating on desktop, left-aligned on mobile */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4.5rem',
              position: 'relative',
              zIndex: 5,
            }}
          >
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isPassed = idx <= activeIndex;

              return (
                <div
                  key={step.phase}
                  className={`timeline-row ${isEven ? 'row-even' : 'row-odd'}`}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {/* Central Node Indicator */}
                  <div
                    className="timeline-node"
                    style={{
                      position: 'absolute',
                      zIndex: 20,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: isPassed ? '2px solid var(--primary-deep)' : '2px solid var(--surface-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: isPassed ? 'var(--primary-deep)' : 'var(--ink-muted)',
                        transition: 'border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease',
                      }}
                      animate={
                        isPassed
                          ? {
                              scale: [1, 1.15, 1],
                              boxShadow: [
                                '0 0 0px rgba(140,122,230,0)',
                                '0 0 20px rgba(140,122,230,0.6)',
                                '0 0 0px rgba(140,122,230,0)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        repeat: isPassed ? Infinity : 0,
                        repeatDelay: 2.5,
                        ease: 'easeInOut',
                      }}
                    >
                      {step.phase}
                    </motion.div>
                  </div>

                  {/* Step Content Card */}
                  <motion.div
                    className="timeline-card-wrapper"
                    variants={getCardVariants(idx)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: '-60px' }}
                    style={{
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '24px',
                        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                        boxShadow: '0 10px 30px rgba(185, 166, 242, 0.08)',
                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                      }}
                      className="clickable"
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '0.8rem',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                            fontWeight: 700,
                            color: 'var(--ink)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {step.title}
                        </h3>

                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--primary-deep)',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--surface-border)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '100px',
                          }}
                        >
                          {step.timeframe}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--ink-secondary)',
                          lineHeight: 1.65,
                          marginBottom: '1.25rem',
                        }}
                      >
                        {step.description}
                      </p>

                      {/* Signals List */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        {step.signals.map((signal, sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-display)',
                              color: 'var(--ink)',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid var(--surface-border)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                            }}
                          >
                            ✦ {signal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive Layout CSS: Alternating on desktop, left-aligned on mobile */}
      <style>{`
        @media (min-width: 900px) {
          .timeline-track-base,
          .timeline-track-fill {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          .timeline-comet {
            left: 50% !important;
          }
          .timeline-node {
            left: 50% !important;
            top: 50% !important;
          }
          .row-even {
            justify-content: flex-start !important;
          }
          .row-even .timeline-card-wrapper {
            margin-right: calc(50% + 40px) !important;
            width: calc(50% - 40px) !important;
          }
          .row-odd {
            justify-content: flex-end !important;
          }
          .row-odd .timeline-card-wrapper {
            margin-left: calc(50% + 40px) !important;
            width: calc(50% - 40px) !important;
          }
        }

        @media (max-width: 899px) {
          .timeline-track-base,
          .timeline-track-fill {
            left: 24px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-comet {
            left: 24px !important;
          }
          .timeline-node {
            left: 24px !important;
            top: 36px !important;
          }
          .timeline-card-wrapper {
            padding-left: 64px !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
