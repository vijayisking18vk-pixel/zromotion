import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CollectionOverlay from './CollectionOverlay';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const location = useLocation();

  // Pages with cream/light background — nav switches to dark text (Home, About, Contact, Reach Us)
  const isLightPage = ['/', '/about', '/contact', '/reach-us'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setOverlayOpen(false);
  }, [location.pathname]);

  // Keyboard: Escape to close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOverlayOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navClass = [
    'cr-nav',
    isLightPage ? 'is-light-page' : '',
    scrolled ? 'is-scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} aria-label="Main navigation">
        {/* Left column: About */}
        <div className="cr-nav__col-left">
          <Link to="/about" className="cr-nav__link">
            About
          </Link>
        </div>

        {/* Center column: Brand Logo */}
        <div className="cr-nav__col-center">
          <Link to="/" className="cr-nav__logo" aria-label="ChennaiRents home">
            ChennaiRents
          </Link>
        </div>

        {/* Right column: List Property, Contact & Collections Button */}
        <div className="cr-nav__col-right">
          <a
            href="https://www.chennairents.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-nav__link cr-nav__link--accent"
            title="List your residential property on chennairents.in"
          >
            List Property ↗
          </a>
          <Link to="/contact" className="cr-nav__link">
            Contact
          </Link>
          <button
            className="cr-nav__collections-btn"
            onClick={() => setOverlayOpen(true)}
            aria-expanded={overlayOpen}
            aria-haspopup="dialog"
            aria-label="Our Collections"
          >
            <span>Our Collections</span>
            <svg className="cr-nav__grid-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect width="4" height="4" fill="currentColor"/>
              <rect x="8" width="4" height="4" fill="currentColor"/>
              <rect y="8" width="4" height="4" fill="currentColor"/>
              <rect x="8" y="8" width="4" height="4" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>

      <CollectionOverlay isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  );
}
