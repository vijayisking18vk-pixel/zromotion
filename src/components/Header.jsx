import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 40;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  const navLinkStyle = ({ isActive }) => ({
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: isActive ? 'var(--c-ripon-red)' : 'var(--c-ink-muted)',
    textDecoration: 'none',
    padding: '0.35rem 0.5rem',
    transition: 'color 0.15s ease',
  });

  // Pulsing glow animation for the Instagram button
  const glowAnimation = prefersReduced
    ? {}
    : {
        animate: {
          boxShadow: [
            '0 0 0 0 rgba(245,184,0,0)',
            '0 0 0 8px rgba(245,184,0,0.3)',
            '0 0 0 0 rgba(245,184,0,0)',
          ],
        },
        transition: {
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  return (
    <header
      style={{
        backgroundColor: 'var(--c-header-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        borderBottom: '1px solid var(--c-border)',
      }}
    >
      {/* Main header row */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: isScrolled ? '0.4rem' : '0.75rem',
          transition: 'padding-block 0.25s ease',
        }}
      >
        {/* Logo & Brand Line */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}
          aria-label="நம்ம ஊரு Rents — Chennai Rents home"
        >
          <img 
            src="/chennai-rents-icon-transparent.png" 
            alt="Chennai Rents" 
            style={{ 
              height: isScrolled ? '38px' : '46px',
              width: 'auto',
              transition: 'height 0.25s ease',
              objectFit: 'contain',
              display: 'block'
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid var(--c-border)', paddingLeft: '0.85rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1rem',
                color: 'var(--c-ink)',
                lineHeight: 1.2
              }}
            >
              நம்ம ஊரு
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                color: 'var(--c-auto-yellow-dk)',
                lineHeight: 1
              }}
            >
              Rents
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }}
          className="cr-desktop-nav"
        >
          <a href="/listings/index.html" style={{ ...navLinkStyle({ isActive: false }), color: 'var(--c-ink)' }}>
            🗺️ Chennai Map (Rent & Buy)
          </a>
          <a href="/listings/listings.html" style={{ ...navLinkStyle({ isActive: false }), color: 'var(--c-ink)' }}>
            📋 Listings
          </a>
          <NavLink to="/#localities" style={navLinkStyle}>
            Localities
          </NavLink>
          <NavLink to="/#guides" style={navLinkStyle}>
            Guides
          </NavLink>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>

          {/* List Property CTA Button */}
          <a
            href="/listings/list-property.html"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 800,
              backgroundColor: 'var(--c-ripon-red)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '0.45rem 1.1rem',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(178, 58, 46, 0.25)',
              transition: 'transform 0.15s ease',
            }}
          >
            <span>+ List (Rent / Sell)</span>
          </a>

          {/* Instagram Button — motion.a with pulsing glow */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
            style={{ borderRadius: '6px', padding: '0.45rem 1rem', fontSize: '0.88rem' }}
            {...glowAnimation}
          >
            <Instagram size={16} />
            <span>Instagram</span>
          </motion.a>
        </nav>

        {/* Mobile controls */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          className="cr-mobile-controls"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--c-border)',
              borderRadius: '6px',
              padding: '0.4rem',
              cursor: 'pointer',
              color: 'var(--c-ink)',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Auto-rickshaw Stripe: 3px yellow on top, 2px green on bottom */}
      <div className="auto-stripe" aria-hidden="true">
        <div className="auto-stripe-yellow" />
        <div className="auto-stripe-green" />
      </div>

      {/* Mobile Drawer — animated with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              backgroundColor: 'var(--c-header-bg)',
              borderBottom: '2px solid var(--c-auto-yellow)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(30, 27, 24, 0.08)',
            }}
          >
            <a
              href="/listings/list-property.html"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                backgroundColor: 'var(--c-ripon-red)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                minHeight: '48px',
                borderRadius: '8px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(178, 58, 46, 0.25)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              💼 + List Property (Rent or Sell)
            </a>
            <a
              href="/listings/index.html"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              🗺️ Chennai Map (Rent & Buy)
            </a>
            <a
              href="/listings/listings.html"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              📋 Browse All Listings
            </a>
            <Link
              to="/#localities"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
            >
              📍 Localities & Rents
            </Link>
            <Link
              to="/#guides"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
            >
              📖 Tenant Guides
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.5rem',
              }}
            >
              ℹ️ About Chennai Rents
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
              style={{ justifyContent: 'center', minHeight: '48px', marginTop: '0.5rem' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Instagram size={18} />
              <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .cr-desktop-nav { display: flex !important; }
          .cr-mobile-controls { display: none !important; }
        }
      `}</style>
    </header>
  );
}
