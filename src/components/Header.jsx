import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Menu, X, MapPin, Compass, Plus, Info, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, supabase } from '../config';
import { GoogleSignInButton } from './GoogleSignInButton';

const AUTH_SESSION_KEY = 'cr_google_profile';

export function Header() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setUser(parsed);
          return;
        }
        sessionStorage.removeItem(AUTH_SESSION_KEY);
      }
    } catch {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data?.session?.user;
      if (sessionUser) {
        const meta = sessionUser.user_metadata || {};
        setUser({
          name: meta.full_name || meta.name || sessionUser.email?.split('@')[0],
          given_name: meta.given_name || null,
          picture: meta.avatar_url || meta.picture || null,
        });
      }
    }).catch(() => {});
  }, []);

  const handleLoginSuccess = (userData) => {
    const expiresAt = userData.exp ? userData.exp * 1000 : Date.now() + 3600 * 1000;
    const profile = {
      name: userData.name,
      given_name: userData.given_name,
      picture: userData.picture,
      expiresAt,
    };
    setUser(profile);
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      window.google?.accounts?.id?.disableAutoSelect();
      supabase.auth.signOut().catch(() => {});
    } catch {
      // Ignore cleanup errors
    }
  };

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
          <picture style={{ display: 'block', flexShrink: 0, height: '42px' }}>
            <source
              type="image/webp"
              srcSet="/chennai-rents-logo-new-42w.webp 1x, /chennai-rents-logo-new-84w.webp 2x, /chennai-rents-logo-new-126w.webp 3x"
            />
            <source
              type="image/jpeg"
              srcSet="/chennai-rents-logo-new-42w.jpg 1x, /chennai-rents-logo-new-84w.jpg 2x, /chennai-rents-logo-new-126w.jpg 3x"
            />
            <img
              src="/chennai-rents-logo-new-42w.jpg"
              srcSet="/chennai-rents-logo-new-42w.jpg 1x, /chennai-rents-logo-new-84w.jpg 2x, /chennai-rents-logo-new-126w.jpg 3x"
              alt="Chennai Rents Logo"
              width="42"
              height="42"
              decoding="async"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                background: 'transparent',
                mixBlendMode: 'multiply',
                borderRadius: '4px',
              }}
            />
          </picture>
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
            to="/listings"
            style={{
              ...navLinkStyle({ isActive: false }),
              color: 'var(--c-ink)',
              textDecoration: 'none',
            }}
          >
            <MapPin size={15} style={{ color: 'var(--c-ripon-red)' }} />
            <span>Map</span>
          </Link>

          <a
            href="/listings/listings.html"
            style={{
              ...navLinkStyle({ isActive: false }),
              color: 'var(--c-ink)',
            }}
          >
            <Compass size={15} style={{ color: 'var(--c-marina-blue)' }} />
            <span>Listings</span>
          </a>

          <NavLink to="/chennai/rentals" style={navLinkStyle}>
            <span>Localities</span>
          </NavLink>
          <NavLink to="/about" style={navLinkStyle}>
            <Info size={15} style={{ color: 'var(--c-ink-muted)' }} />
            <span>About</span>
          </NavLink>

          {/* List Property CTA Button */}
          <a
            href="/listings/list-property.html"
            style={{
              ...navLinkStyle({ isActive: false }),
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              minHeight: '38px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--c-ripon-red)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
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

          {/* Google Sign-Up / Authenticated User Profile */}
          {user ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.3rem 0.65rem',
                backgroundColor: 'var(--c-card-bg)',
                border: '1.5px solid var(--c-border)',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}
            >
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--c-border)',
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--c-ink)',
                }}
              >
                Welcome, {user.given_name || user.name}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                title="Sign out"
                aria-label="Sign out"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.2rem',
                  cursor: 'pointer',
                  color: 'var(--c-ink-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <GoogleSignInButton
              id="google-btn"
              onLoginSuccess={(userData) => handleLoginSuccess(userData)}
              text="signup_with"
              size="medium"
            />
          )}
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
            {/* Mobile Google Auth Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '0.6rem',
                marginBottom: '0.25rem',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
            >
              {user ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'var(--c-card-bg)',
                    border: '1.5px solid var(--c-border)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--c-ink)',
                      }}
                    >
                      Welcome, {user.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--c-border)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.6rem',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--c-ink-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <GoogleSignInButton
                  id="google-btn-mobile"
                  onLoginSuccess={(userData) => handleLoginSuccess(userData)}
                  text="signup_with"
                  size="large"
                />
              )}
            </div>

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
            >
              <Plus size={16} />
              <span>List Property (Rent or Sell)</span>
            </a>

            <Link
              to="/listings"
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
              <span>Chennai Rental &amp; Buy Map</span>
            </Link>

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
                gap: '8px',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={17} style={{ color: 'var(--c-marina-blue)' }} />
              <span>Browse Listings</span>
            </a>

            <Link
              to="/chennai/rentals"
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
                borderBottom: '1px solid var(--c-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info size={16} style={{ color: 'var(--c-ink-muted)' }} />
              <span>About Chennai Rents</span>
            </Link>

            <Link
              to="/contact"
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
              <span>Contact Us</span>
            </Link>

            {/* Instagram */}
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

export default Header;
