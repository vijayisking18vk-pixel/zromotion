import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AutoRickshawDoodle,
  RiponBuildingDoodle,
  FilterCoffeeDoodle,
  MallipooGarland,
} from './ChennaiDoodles';

const doodleItems = [
  { Component: AutoRickshawDoodle, width: 85, height: 55, label: 'Chennai Autos' },
  { Component: RiponBuildingDoodle, width: 95, height: 60, label: 'Ripon Building' },
  { Component: FilterCoffeeDoodle, width: 45, height: 50, label: 'Filter Coffee' },
];

export default function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <footer
      style={{
        backgroundColor: '#FAF6EE',
        color: '#1F1A17',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '4rem',
        paddingBottom: '6.5rem', // extra clearance for sticky mobile bar
        borderTop: '1px solid #E9DFC9',
      }}
    >
      {/* Authentic Chennai Skyline Backdrop - Translucent watermark behind all sections */}
      <div
        className="footer-skyline-bg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          overflow: 'hidden',
          zIndex: 0,
          opacity: 0.16,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
        }}
        aria-hidden="true"
      >
        <img
          src="/images/chennai-skyline-footer.png"
          alt="Chennai Skyline"
          style={{
            width: '100%',
            maxWidth: '1240px',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
          }}
        />
      </div>

      {/* Mallipoo Garland - full-width decorative separator */}
      <div
        style={{
          borderBottom: '1px solid #E9DFC9',
          backgroundColor: 'rgba(255, 253, 249, 0.7)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <MallipooGarland />
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', position: 'relative', zIndex: 1 }}>

        {/* Main 3-Column Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid #E9DFC9',
          }}
        >

          {/* Col 1: Brand */}
          <div>
            {/* Image Logo + Tamil Brand Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  background: '#FFFDF9',
                  border: '1px solid #E9DFC9',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(31,26,23,0.04)',
                }}
              >
                <img 
                  src="/chennai-rents-icon-transparent.png" 
                  alt="Chennai Rents" 
                  style={{ 
                    height: '32px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid #E9DFC9', paddingLeft: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', lineHeight: 1.1 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#1F1A17',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Chennai
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      color: 'var(--c-ripon-red)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Rents
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#6B5E55',
                    letterSpacing: '0.04em',
                    marginTop: '2px',
                  }}
                >
                  நம்ம ஊரு வாடகை
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#6B5E55',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.6rem',
              }}
            >
              Locality-First Rental Guide
            </p>

            {/* Tamil brand line */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--c-ripon-red)',
                marginBottom: '1.1rem',
              }}
            >
              நம்ம ஊரு Rents
            </p>

            {/* Privacy badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.5rem 0.9rem',
                backgroundColor: '#FFFDF9',
                border: '1px solid #E9DFC9',
                borderRadius: '10px',
                fontSize: '0.82rem',
                color: '#2E7D4F',
                boxShadow: '0 1px 4px rgba(31,26,23,0.03)',
              }}
            >
              <ShieldCheck size={16} color="#2E7D4F" />
              <span style={{ color: '#3A322C', fontWeight: 500 }}>No tracking here. We do not collect anything on this site.</span>
            </div>
          </div>

          {/* Col 2: Top Locality Guides */}
          <div>
            <h4
              style={{
                color: 'var(--c-ripon-red)',
                marginBottom: '1rem',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 800,
              }}
            >
              Popular Localities
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.92rem',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { to: '/chennai/velachery', label: 'Velachery (South IT)' },
                { to: '/chennai/valasaravakkam', label: 'Valasaravakkam (West)' },
                { to: '/chennai/adyar', label: 'Adyar (Coastal)' },
                { to: '/chennai/sholinganallur', label: 'Sholinganallur (OMR)' },
                { to: '/chennai/porur', label: 'Porur (DLF IT Park)' },
                { to: '/chennai/anna-nagar', label: 'Anna Nagar (North-Central)' },
                { to: '/chennai/rentals', label: 'Browse All Localities →' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="cr-footer-link"
                    style={{
                      color: '#2B2523',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: 'var(--c-ripon-red)', fontWeight: 700 }}>→</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Renting Guides & Trust */}
          <div>
            <h4
              style={{
                color: 'var(--c-ripon-red)',
                marginBottom: '1rem',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 800,
              }}
            >
              Research & Trust
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                fontSize: '0.9rem',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { to: '/listings', label: 'Chennai Rent Map & Live Listings' },
                { to: '/house-rent-in-chennai', label: 'House Rent in Chennai: Guide & Rates' },
                { to: '/guides/advance-deposit-chennai', label: 'Advance Deposit: 10 Months vs Reality' },
                { to: '/guides/tenant-rules-chennai', label: 'Rental Agreements & Tenant Rights' },
                { to: '/methodology', label: 'Research & Data Methodology' },
                { to: '/verification', label: 'Listing Verification Standards' },
                { to: '/corrections', label: 'Corrections & Editorial Policy' },
                { to: '/authors', label: 'Editorial Team & Co-founders' },
                { to: '/about', label: 'About Chennai Rents' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/privacy', label: 'Privacy & Data Deletion' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="cr-footer-link"
                    style={{
                      color: '#2B2523',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: 'var(--c-ripon-red)', fontWeight: 700 }}>→</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Doodle Row - each with whileInView fade and slide animation */}
        <div
          style={{
            paddingBlock: '1.75rem',
            borderBottom: '1px solid #E9DFC9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {doodleItems.map(({ Component, width, height, label }, i) => (
            <motion.div
              key={label}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <Component width={width} height={height} />
              <span
                style={{
                  fontSize: '0.88rem',
                  color: '#1F1A17',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#1F1A17',
              letterSpacing: '0.02em',
            }}
          >
            Made in Chennai, for Chennai{' '}
            <Heart
              size={14}
              fill="var(--c-ripon-red)"
              color="var(--c-ripon-red)"
              style={{ display: 'inline', marginInline: '2px', verticalAlign: 'middle' }}
            />
          </p>
          <p style={{ fontSize: '0.82rem', color: '#6B5E55' }}>
            © {new Date().getFullYear()} Chennai Rents. Purely content and Instagram Reels.
          </p>
        </div>
      </div>

      {/* Embedded Styles for hover and mobile layout */}
      <style>{`
        .cr-footer-link:hover {
          color: var(--c-ripon-red) !important;
          transform: translateX(2px);
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.1fr 1fr 1.1fr !important;
          }
        }
        @media (max-width: 767px) {
          .cr-footer-link {
            padding: 4px 0;
            min-height: 40px;
          }
        }
      `}</style>
    </footer>
  );
}
