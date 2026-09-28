import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Light (cream) pages — nav text goes dark
  const isLightPage = ['/', '/about', '/journal', '/contact', '/reach-us'].includes(location.pathname);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Track scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navClass = [
    'cr-nav',
    isLightPage ? 'is-light-page' : '',
    scrolled ? 'is-scrolled' : '',
  ].filter(Boolean).join(' ');

  const linkClass = ({ isActive }) =>
    ['cr-nav__link', isActive ? 'cr-nav__link--active' : ''].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} aria-label="Main navigation">
        {/* LEFT: About + Journal */}
        <div className="cr-nav__col-left">
          <NavLink to="/about"   className={linkClass}>About</NavLink>
          <NavLink to="/journal" className={linkClass}>Journal</NavLink>
        </div>

        {/* CENTER: Logo */}
        <div className="cr-nav__col-center">
          <Link to="/" className="cr-nav__logo" aria-label="ChennaiRents — Home">
            ChennaiRents
          </Link>
        </div>

        {/* RIGHT: CTA + Contact + Hamburger */}
        <div className="cr-nav__col-right">
          <a
            href="https://www.chennairents.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cr-nav__link cr-nav__link--accent cr-nav__link--desktop"
          >
            List Property ↗
          </a>
          <NavLink to="/contact" className={({ isActive }) =>
            ['cr-nav__link', 'cr-nav__link--desktop', isActive ? 'cr-nav__link--active' : ''].filter(Boolean).join(' ')
          }>
            Contact
          </NavLink>

          {/* Hamburger — mobile only */}
          <button
            className="cr-nav__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`cr-nav__burger-bar ${menuOpen ? 'open' : ''}`} />
            <span className={`cr-nav__burger-bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div className={`cr-mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="cr-mobile-menu__inner">
          <nav className="cr-mobile-menu__nav">
            <Link to="/"        className="cr-mobile-menu__link">Home</Link>
            <Link to="/about"   className="cr-mobile-menu__link">About</Link>
            <Link to="/journal" className="cr-mobile-menu__link">Journal</Link>
            <Link to="/contact" className="cr-mobile-menu__link">Contact</Link>
          </nav>
          <div className="cr-mobile-menu__cta">
            <a
              href="https://www.chennairents.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-btn-primary-gold"
            >
              List Property on chennairents.in ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
