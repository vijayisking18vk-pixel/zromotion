import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CounterItem({ targetValue, suffix, label, sublabel }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * targetValue);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, targetValue]);

  return (
    <div
      ref={ref}
      style={{
        padding: '2rem',
        borderRadius: '20px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        transition: 'transform 0.3s ease, border-color 0.3s ease',
      }}
      className="clickable"
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        <span style={{ color: 'var(--primary-deep)' }}>{count}</span>
        <span>{suffix}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--ink)',
          marginTop: '0.25rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '0.85rem',
          color: 'var(--ink-secondary)',
          lineHeight: 1.4,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
}

export default function ManifestoStats() {
  const manifestoText =
    "We reject the sea of cookie-cutter digital marketing noise. In a hyper-connected world, only signals of genuine distinction survive. We pair high-conviction creative direction with quantitative growth engines to amplify the ideas, ventures, and leaders that shape the future.";
  
  const words = manifestoText.split(' ');

  return (
    <section
      id="manifesto"
      style={{
        padding: 'clamp(5rem, 10vw, 8.5rem) 0',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Mission Manifesto with Word Stagger */}
          <div>
            <div className="signal-badge">
              <span className="signal-pulse-dot" />
              <span>STUDIO MANIFESTO</span>
            </div>

            <h2
              className="section-h2"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                marginBottom: '1.5rem',
              }}
            >
              Quiet noise.<br />
              <span style={{ color: 'var(--primary-deep)' }}>Amplified impact.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                lineHeight: 1.6,
                color: 'var(--ink)',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                marginBottom: '2rem',
              }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.28em',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                color: 'var(--ink-secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '1px',
                  backgroundColor: 'var(--primary-deep)',
                }}
              />
              <span>Engineered in Chennai · Deployed Globally</span>
            </div>
          </div>

          {/* Right Column: 3 Metric Counters */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <CounterItem
              targetValue={100}
              suffix="k+"
              label="Shifts Dispatched"
              sublabel="High-velocity on-demand gig workforce and instant UPI payouts for Ziggers"
            />
            <CounterItem
              targetValue={360}
              suffix="°"
              label="Public Governance"
              sublabel="Constituency intelligence and policy communication systems for Thalaimai 360"
            />
            <CounterItem
              targetValue={100}
              suffix="%"
              label="Verifiable Proofs"
              sublabel="Cryptographic AI skill verification protocol for developer talent on LoopVerse"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
