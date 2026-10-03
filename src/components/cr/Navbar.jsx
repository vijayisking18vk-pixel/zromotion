import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = [
    'cr-nav',
    'is-light-page',
    scrolled ? 'is-scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} style={{
        background: 'var(--cr-bg)',
        borderBottom: '2px solid var(--cr-ink)', // Vogue thick bottom border
        transition: 'all 0.3s ease',
        padding: '0 2rem',
        height: '80px'
      }} aria-label="Main navigation">
        
        {/* LEFT: Hamburger & Menu */}
        <div className="cr-nav__col-left" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button
            className="cr-nav__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ color: 'var(--cr-ink)', position: 'relative', zIndex: 100, display: 'flex' }}
          >
            <span className={`cr-nav__burger-bar ${menuOpen ? 'open' : ''}`} style={{ height: '2px', background: 'var(--cr-ink)' }} />
            <span className={`cr-nav__burger-bar ${menuOpen ? 'open' : ''}`} style={{ height: '2px', background: 'var(--cr-ink)' }} />
          </button>
          
          <NavLink to="/" className="cr-nav__link--desktop" style={{ 
            fontFamily: 'var(--font-ui)', 
            fontSize: 'var(--text-2xs)', 
            letterSpacing: '0.1em', 
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--cr-ink)'
          }}>
            Latest
          </NavLink>
        </div>

        {/* CENTER: Vogue Style Logo */}
        <div className="cr-nav__col-center">
          <Link to="/" className="cr-nav__logo" style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'var(--text-h2)', 
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: 'var(--cr-ink)',
            textTransform: 'uppercase'
          }} aria-label="ChennaiRents Home">
            ChennaiRents
          </Link>
        </div>

        {/* RIGHT: Contact */}
        <div className="cr-nav__col-right" style={{ justifyContent: 'flex-end' }}>
          <NavLink to="/contact" className="cr-nav__link--desktop" style={{ 
            fontFamily: 'var(--font-ui)', 
            fontSize: 'var(--text-2xs)', 
            letterSpacing: '0.1em', 
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--cr-ink)'
          }}>
            Contact
          </NavLink>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div className={`cr-mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} style={{ background: 'var(--cr-bg)', zIndex: 90 }}>
        <div className="cr-mobile-menu__inner" style={{ borderTop: '2px solid var(--cr-ink)' }}>
          <nav className="cr-mobile-menu__nav" style={{ paddingTop: '4rem' }}>
            <Link to="/" className="cr-mobile-menu__link" style={{ color: 'var(--cr-ink)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'var(--text-h1)' }}>Latest</Link>
            <Link to="/contact" className="cr-mobile-menu__link" style={{ color: 'var(--cr-ink)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'var(--text-h1)' }}>Contact</Link>
          </nav>
        </div>
      </div>
    </>
  );
}
