import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import HeroBackgroundBubble from './HeroBackgroundBubble';

const headlineText = "WE AMPLIFY WHAT MATTERS";
const words = headlineText.split(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { y: 60, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero({ onOpenContact }) {
  const heroRef = useRef(null);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4rem',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Isolated Hero Background Bubble with Pointer Parallax & Scroll Animation */}
      <HeroBackgroundBubble containerRef={heroRef} />

      {/* Hero Foreground Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', pointerEvents: 'auto' }}>
        
        {/* Kinetic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', marginBottom: '1.8rem' }}
        >
          <div className="signal-badge">
            <span className="signal-pulse-dot" />
            <span>THE SIGNAL // VENTURE & BRAND ACCELERATION</span>
          </div>
        </motion.div>

        {/* Giant Kinetic Stagger Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7.8vw, 7.2rem)',
            fontWeight: 700,
            lineHeight: 0.96,
            letterSpacing: '-0.04em',
            color: 'var(--ink)',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.35em',
            userSelect: 'none',
          }}
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              style={{
                display: 'inline-block',
                color: word === 'MATTERS' ? 'var(--primary-deep)' : 'var(--ink)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
            color: 'var(--ink-secondary)',
            maxWidth: '680px',
            margin: '0 auto 2.75rem auto',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          A minimalist digital marketing and venture acceleration studio. We transform raw vision into high-resonance brand authority, viral acquisition systems, and category-defining growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#work"
            onClick={handleScrollToWork}
            className="btn btn-primary"
            style={{ minWidth: '180px' }}
          >
            <span>See Our Work</span>
            <ArrowDownRight size={18} />
          </a>

          <button
            onClick={onOpenContact}
            className="btn btn-secondary"
            style={{ minWidth: '180px' }}
          >
            <span>Initiate Signal</span>
            <Sparkles size={16} color="var(--primary-deep)" />
          </button>
        </motion.div>

        {/* Sub-Footer Metric Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            marginTop: '4.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.5rem',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--ink-muted)',
            flexWrap: 'wrap',
          }}
        >
          <span>✦ Chennai & Global Studio</span>
          <span>✦ 5 Flagship Deployments</span>
          <span>✦ 100k+ Dispatched Shifts</span>
        </motion.div>

      </div>
    </section>
  );
}
