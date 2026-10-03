import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Menu, X, MapPin, Compass, Plus, BookOpen, Info } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 20;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  const navLinkStyle = ({ isActive }) => ({
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: isActive ? 'var(--c-ripon-red)' : 'var(--c-ink-muted)',
    textDecoration: 'none',
    padding: '0.4rem 0.65rem',
    borderRadius: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease, background-color 0.15s ease',
  });

  return (
    <header
      style={{
        backgroundColor: 'var(--c-header-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        borderBottom: '1px solid var(--c-border)',
        boxShadow: isScrolled ? '0 4px 16px rgba(30, 27, 24, 0.05)' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Main header row */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: '0.6rem',
          minHeight: '64px',
          gap: '0.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Official Brand Logo & Identity */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            flexShrink: 1,
            minWidth: 0,
          }}
          aria-label="Chennai Rents home"
        >
          <img
            src="/chennai-rents-logo-new.jpg"
            alt="Chennai Rents Logo"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              flexShrink: 0,
              mixBlendMode: 'multiply',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderLeft: '1.5px solid var(--c-border)',
              paddingLeft: '0.65rem',
              lineHeight: 1.15,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.22rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                  color: 'var(--c-ink)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                Chennai
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                  color: 'var(--c-auto-yellow-dk)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                Rents
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.65rem',
                color: 'var(--c-ink-muted)',
                letterSpacing: '0.03em',
                lineHeight: 1.2,
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              நம்ம ஊரு வாடகை
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{ display: 'none', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}
          className="cr-desktop-nav"
        >
          <Link
            to="/listings/"
            style={{
              ...navLinkStyle({ isActive: false }),
              color: 'var(--c-ink)',
            }}
          >
            <MapPin size={15} style={{ color: 'var(--c-ripon-red)' }} />
            <span>Map</span>
          </Link>

          <Link
            to="/listings/"
            style={{
              ...navLinkStyle({ isActive: false }),
              color: 'var(--c-ink)',
            }}
          >
            <Compass size={15} style={{ color: 'var(--c-marina-blue)' }} />
            <span>Listings</span>
          </Link>

          <NavLink to="/#localities" style={navLinkStyle}>
            <span>Localities</span>
          </NavLink>

          <NavLink to="/#guides" style={navLinkStyle}>
            <span>Guides</span>
          </NavLink>

          <NavLink to="/about" style={navLinkStyle}>
            <span>About</span>
          </NavLink>

          {/* List Property CTA Button */}
          <a
            href="/listings/list-property.html"
            className="btn-red"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              minHeight: '38px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>List Property</span>
          </a>

          {/* Instagram Button */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.85rem',
              minHeight: '38px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            whileHover={prefersReduced ? {} : { y: -1 }}
            whileTap={prefersReduced ? {} : { y: 0 }}
          >
            <Instagram size={15} />
            <span>Instagram</span>
          </motion.a>
        </nav>

        {/* Mobile menu trigger */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          className="cr-mobile-controls"
        >
          <a
            href="/listings/list-property.html"
            className="btn-red"
            style={{
              padding: '0.38rem 0.75rem',
              fontSize: '0.8rem',
              minHeight: '36px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Plus size={13} />
            <span className="hdr-list-label">List</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--c-card-bg)',
              border: '1.5px solid var(--c-border)',
              borderRadius: '6px',
              padding: '0.42rem',
              cursor: 'pointer',
              color: 'var(--c-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '38px',
              minHeight: '38px',
              flexShrink: 0,
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Auto-rickshaw Stripe: 3px yellow on top, 2px green on bottom */}
      <div className="auto-stripe" aria-hidden="true">
        <div className="auto-stripe-yellow" />
        <div className="auto-stripe-green" />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              backgroundColor: 'var(--c-header-bg)',
              borderBottom: '2px solid var(--c-border)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              boxShadow: '0 12px 28px rgba(30, 27, 24, 0.08)',
            }}
          >
            <a
              href="/listings/list-property.html"
              className="btn-red"
              style={{
                width: '100%',
                justifyContent: 'center',
                minHeight: '46px',
                borderRadius: '8px',
                marginBottom: '0.5rem',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Plus size={16} />
              <span>List Property (Rent or Sell)</span>
            </a>

            <Link
              to="/listings/"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <MapPin size={17} style={{ color: 'var(--c-ripon-red)' }} />
              <span>Chennai Rental & Buy Map</span>
            </Link>

            <Link
              to="/listings/"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={17} style={{ color: 'var(--c-marina-blue)' }} />
              <span>Browse All Listings</span>
            </Link>

            <Link
              to="/#localities"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
            >
              <span>Explore Localities</span>
            </Link>

            <Link
              to="/#guides"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
            >
              <BookOpen size={16} style={{ color: 'var(--c-ink-muted)' }} />
              <span>Tenant Legal Guides</span>
            </Link>

            <Link
              to="/about"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--c-ink)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info size={16} style={{ color: 'var(--c-ink-muted)' }} />
              <span>About Chennai Rents</span>
            </Link>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
              style={{
                justifyContent: 'center',
                minHeight: '44px',
                marginTop: '0.5rem',
                borderRadius: '8px',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Instagram size={17} />
              <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 992px) {
          .cr-desktop-nav { display: flex !important; }
          .cr-mobile-controls { display: none !important; }
        }
        @media (max-width: 991px) {
          .cr-desktop-nav { display: none !important; }
          .cr-mobile-controls { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
