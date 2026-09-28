import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import { AutoRickshawDoodle, RiponBuildingDoodle, FilterCoffeeDoodle } from './ChennaiDoodles';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--c-temple-green)',
        color: '#FFFFFF',
        position: 'relative',
        marginTop: '4rem',
        paddingTop: '3.5rem',
        paddingBottom: '5.5rem' // extra clearance for sticky mobile bar
      }}
    >
      <div className="container">
        
        {/* Main 3-Column Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Col 1: Brand & Slogan */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Chennai
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--c-auto-yellow)' }}>
                Rents
              </span>
            </div>
            
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-auto-yellow)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Locality-First Rental Guide
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              An honest, locality-first rental guide for Chennai. No brokers, no fake property listings, and no surprise deposit traps.
            </p>
            
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: 'var(--c-auto-yellow)'
              }}
            >
              <ShieldCheck size={16} />
              <span>No tracking here. We do not collect anything.</span>
            </div>
          </div>

          {/* Col 2: Top Locality Guides */}
          <div>
            <h4
              style={{
                color: 'var(--c-auto-yellow)',
                marginBottom: '1rem',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Popular Localities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/rent-in-valasaravakkam" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Rent in Valasaravakkam
                </Link>
              </li>
              <li>
                <Link to="/rent-in-velachery" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Rent in Velachery
                </Link>
              </li>
              <li>
                <Link to="/rent-in-adyar" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Rent in Adyar
                </Link>
              </li>
              <li>
                <Link to="/rent-in-omr" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Rent in OMR IT Corridor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Renting Guides */}
          <div>
            <h4
              style={{
                color: 'var(--c-auto-yellow)',
                marginBottom: '1rem',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Renting Guides
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/advance-deposit-chennai" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Advance Deposit: 10 Months vs Reality
                </Link>
              </li>
              <li>
                <Link to="/tenant-rules-chennai" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → Rental Agreements and Tenant Rights
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  → About Chennai Rents
                </Link>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--c-auto-yellow)', fontWeight: 700 }}
                >
                  → Follow Vacant Homes on Instagram ({INSTAGRAM_HANDLE})
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Handcrafted Chennai Doodles Row (Auto, Ripon, Coffee) */}
        <div
          style={{
            paddingBlock: '1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
            opacity: 0.95
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AutoRickshawDoodle width={85} height={55} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              Chennai Autos
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <RiponBuildingDoodle width={95} height={60} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              Ripon Building
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FilterCoffeeDoodle width={45} height={50} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              Filter Coffee
            </span>
          </div>
        </div>

        {/* Bottom Signature Line */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--c-auto-yellow)',
              letterSpacing: '0.02em'
            }}
          >
            Made with <Heart size={14} fill="var(--c-ripon-red)" color="var(--c-ripon-red)" style={{ display: 'inline', marginInline: '2px', verticalAlign: 'middle' }} /> in Chennai, for Chennai
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} Chennai Rents. Purely content and Instagram Reels.
          </p>
        </div>

      </div>
    </footer>
  );
}
