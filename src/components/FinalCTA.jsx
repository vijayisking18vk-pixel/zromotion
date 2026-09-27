import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles, Mail } from 'lucide-react';

function MagneticButton({ children, onClick, className = '', style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.35;
    const deltaY = (clientY - centerY) * 0.35;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        ...style,
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function FinalCTA({ onOpenContact }) {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(7rem, 14vw, 13rem)',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--surface-border)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Liquid lavender orb glow in background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(350px, 60vw, 750px)',
          height: 'clamp(350px, 60vw, 750px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185, 166, 242, 0.45) 0%, rgba(246, 244, 255, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
          
          {/* Badge */}
          <div className="signal-badge" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
            <span className="signal-pulse-dot" />
            <span>INITIATE PARTNERSHIP</span>
          </div>

          {/* Massive Kinetic Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
              marginBottom: '2rem',
              userSelect: 'none',
            }}
          >
            LET'S TALK.
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto 3.5rem auto',
            }}
          >
            Have an ambitious venture, category-defining product, or governance mandate? Let's engineer your brand's enduring market momentum.
          </p>

          {/* Magnetic CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <MagneticButton
              onClick={onOpenContact}
              className="btn btn-primary"
              style={{
                padding: '1.35rem 3rem',
                fontSize: '1rem',
              }}
            >
              <span>Launch Your Signal</span>
              <ArrowUpRight size={20} />
            </MagneticButton>

            <a
              href="mailto:hello@zromotion.agency?subject=Venture%20Inquiry%20-%20Zromotion"
              className="btn btn-secondary"
              style={{
                padding: '1.35rem 2.6rem',
                fontSize: '0.95rem',
              }}
            >
              <Mail size={18} color="var(--primary-deep)" />
              <span>hello@zromotion.agency</span>
            </a>
          </div>

          {/* Live Studio Note */}
          <div
            style={{
              marginTop: '4rem',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}
          >
            Accepting Q4 2026 / 2027 Client Partnerships
          </div>

        </div>
      </div>
    </section>
  );
}
