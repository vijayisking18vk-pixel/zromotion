import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import LiveSiteIframe from './LiveSiteIframe';

export default function CaseStudyModal({ project, onClose, onOpenContact }) {
  if (!project) return null;

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
            maxWidth: '880px',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative',
            boxShadow: '0 30px 70px rgba(20, 16, 24, 0.2)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Case Study"
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
              transition: 'background 0.2s',
              zIndex: 30,
            }}
          >
            <X size={18} />
          </button>

          {/* Industry badge */}
          <div className="signal-badge">
            <span className="signal-pulse-dot" />
            <span>{project.industry}</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '0.4rem',
              letterSpacing: '-0.03em',
            }}
          >
            {project.title}
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.8rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'var(--primary-deep)', fontWeight: 600, fontSize: '0.95rem' }}>
              ✦ {project.metric}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--ink-secondary)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--surface-border)',
                padding: '0.25rem 0.75rem',
                borderRadius: '100px',
              }}
            >
              <span>{project.website}</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Actual Live Website Homepage Embedded Frame */}
          <div
            style={{
              height: '460px',
              marginBottom: '2.5rem',
            }}
          >
            <LiveSiteIframe
              url={project.url}
              title={project.title}
              domain={project.website}
              desktopWidth={1200}
              initialInteractive={true}
              imageFallback={project.image}
            />
          </div>

          {/* Strategic Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                The Strategic Challenge
              </h3>
              <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {project.challenge || project.summary}
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                The Signal Solution
              </h3>
              <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {project.solution ||
                  'Zromotion overhauled their digital messaging architecture, designed an editorial identity system, and engineered a performance marketing acquisition funnel synchronized across high-intent channels.'}
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                Measurable Impact & Resonance
              </h3>
              <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {project.impact || `Delivered ${project.metric} and established lasting category leadership.`}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '220px' }}
            >
              <span>Engineer a Similar Impact</span>
              <ArrowUpRight size={18} />
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ minWidth: '180px' }}
            >
              <span>Visit Live URL</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
