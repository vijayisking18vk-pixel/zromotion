import React, { useEffect, useRef } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveSiteIframe from './LiveSiteIframe';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'stjosephs',
    title: 'St. Joseph Group of Institutions',
    website: 'stjosephsgarden.ac.in',
    url: 'https://stjosephsgarden.ac.in/',
    industry: 'Higher Education & Institutional Growth',
    services: ['Digital Strategy', 'Website Optimization & SEO', 'Social Media Management', 'Admissions Campaigns'],
    narrative: 'Crafting innovative, audience-centric digital strategies that drive engagement, growth, and meaningful connections across multiple prestigious institutions.',
    metric: 'Institutional Brand Growth',
    accent: '#8C7AE6',
    image: '/assets/images/stjosephs.jpg',
  },
  {
    id: 'poorvika',
    title: 'Poorvika',
    website: 'instagram.com/poorvika_india',
    url: 'https://www.instagram.com/poorvika_india/',
    industry: 'Content Creation & Social Media',
    services: ['Social Media Content', 'Gadget Launch Campaigns', 'High-Engagement Stories', 'Video Production'],
    narrative: 'Crafting engaging, informative, and persuasive content tailored to a massive customer base, promoting top gadgets, exclusive offers, and flagship store events.',
    metric: 'High-Impact Social Engagement',
    accent: '#E1306C',
    image: '/assets/images/poorvika.jpg',
  },
  {
    id: 'vooki',
    title: 'Vooki',
    website: 'instagram.com/vooki_products',
    url: 'https://www.instagram.com/vooki_products/',
    industry: 'Digital Marketing Strategy & E-commerce',
    services: ['Brand Positioning', 'SEO & Natural Cleaners', 'E-commerce Experience', 'DIY Hacks & Viral Reels'],
    narrative: '“Clean Spaces, Green Planet.” Pioneering eco-friendly brand messaging, high-intent cleaning solutions SEO, and viral user-generated content for safe home hygiene.',
    metric: 'Clean Spaces, Green Planet',
    accent: '#10B981',
    image: '/assets/images/vooki.jpg',
  },
  {
    id: 'rrjcbspares',
    title: 'RR JCB Spares',
    website: 'rrjcbspares.in',
    url: 'https://rrjcbspares.in/',
    industry: 'Website Creation & B2B Architecture',
    services: ['Bespoke Website Creation', 'Custom CMS Architecture', 'B2B Equipment Catalog', 'Responsive Engineering'],
    narrative: 'Complete design and engineering of a bespoke digital platform for an established B2B heavy machinery seller, featuring an intuitive spares catalog and instant quotation workflows.',
    metric: 'Bespoke B2B Spares Platform',
    accent: '#F59E0B',
    image: '/assets/images/rrjcbspares.jpg',
  },
  {
    id: 'unfounded',
    title: 'Unfounded',
    website: 'www.unfounded.in',
    url: 'https://www.unfounded.in',
    industry: 'Venture Lab & AI Studio',
    services: ['Brand Strategy', 'Visual Identity', 'Venture Positioning', 'Flagship Web'],
    narrative: 'High-conviction AI ventures and deep-tech products engineered from first principles in Chennai, shipping globally to redefine intelligent software.',
    metric: 'Global AI Studio Launch',
    accent: '#B9A6F2',
    image: '/assets/images/unfounded.jpg',
  },
  {
    id: 'ziggers',
    title: 'Ziggers',
    website: 'www.ziggers.in',
    url: 'https://www.ziggers.in',
    industry: 'Gig Economy & On-Demand Workforce',
    services: ['Performance Marketing', 'App Store Optimization', 'Social Growth', 'Product UX'],
    narrative: "India's premier on-demand gig jobs and temporary workforce platform connecting businesses with verified catering, event, and delivery staff with same-day UPI payouts.",
    metric: '100k+ Shifts Dispatched',
    accent: '#8C7AE6',
    image: '/assets/images/ziggers.jpg',
  },
  {
    id: 'thalaimai360',
    title: 'Thalaimai 360',
    website: 'www.thalaimai360.com',
    url: 'https://thalaimai360.com',
    industry: 'Executive Leadership & Public Governance',
    services: ['Strategic Communication', 'Public Affairs', 'Narrative Architecture', 'Digital Influence'],
    narrative: 'Elite political advisory and strategic governance firm transforming electoral mandates into measurable public impact across constituencies.',
    metric: '360° Public Governance',
    accent: '#B9A6F2',
    image: '/assets/images/thalaimai360.jpg',
  },
  {
    id: 'loopverse',
    title: 'LoopVerse',
    website: 'www.loopverse.in',
    url: 'https://www.loopverse.in',
    industry: 'AI & Web3 Skill Verification Protocol',
    services: ['Brand Identity', 'Technical SEO', 'Product Launch', 'Developer Community'],
    narrative: 'Cryptographically proven, AI-validated skill verification protocol replacing unverified resumes with verifiable on-chain competency proofs.',
    metric: 'Skill Verification Protocol',
    accent: '#8C7AE6',
    image: '/assets/images/loopverse.jpg',
  },
  {
    id: 'subanesh',
    title: 'Subanesh',
    website: 'subanesh.framer.website',
    url: 'https://subanesh.framer.website/',
    industry: 'Performance Marketing & Lead Systems',
    services: ['SEO Architecture', 'Social Media Campaigns', 'Lead Generation', 'Conversion Strategy'],
    narrative: 'Tailored digital growth systems, high-intent lead generation funnels, and precision SEO architectures engineered to help businesses scale and succeed online.',
    metric: 'High-Intent Lead Engines',
    accent: '#B9A6F2',
    image: '/assets/images/subanesh.jpg',
  },
];

export default function PortfolioRail({ onSelectProject }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Pin on screens wider than 960px
    if (window.innerWidth < 960) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="portfolio-rail-section"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Sticky Header / Section Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div className="signal-badge">
          <span className="signal-pulse-dot" />
          <span>SELECTED CLIENT DEPLOYMENTS</span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="portfolio-rail-track"
        style={{ width: `${PROJECTS.length * 100}vw` }}
      >
        {PROJECTS.map((project, idx) => (
          <div key={project.id} className="portfolio-rail-panel">
            <div
              style={{
                width: '100%',
                maxWidth: '1280px',
                height: '84vh',
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(360px, 1.3fr)',
                gap: 'clamp(2rem, 3.5vw, 3.5rem)',
                alignItems: 'center',
                backgroundColor: 'var(--surface)',
                borderRadius: '32px',
                border: '1px solid var(--surface-border)',
                padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                boxShadow: '0 20px 50px rgba(185, 166, 242, 0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background index watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(6rem, 12vw, 10rem)',
                  fontWeight: 800,
                  color: 'rgba(185, 166, 242, 0.12)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                0{idx + 1}
              </div>

              {/* Left Column: Narrative & Meta */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                {/* Industry Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--primary-deep)',
                    backgroundColor: '#FFFFFF',
                    padding: '0.35rem 0.9rem',
                    borderRadius: '100px',
                    width: 'fit-content',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--surface-border)',
                  }}
                >
                  <span>{project.industry}</span>
                </div>

                {/* Project Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {project.title}
                </h3>

                {/* Impact Metric Pill */}
                <div
                  style={{
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    color: 'var(--primary-deep)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>✦</span>
                  <span>{project.metric}</span>
                </div>

                {/* Narrative */}
                <p
                  style={{
                    fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    maxWidth: '460px',
                  }}
                >
                  {project.narrative}
                </p>

                {/* Service Chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.45rem',
                    marginBottom: '2rem',
                  }}
                >
                  {project.services.map((service, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-display)',
                        color: 'var(--ink)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--surface-border)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Visit Live Site Outbound Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.8rem' }}
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={15} />
                  </a>

                  {/* Open In-depth Case Study Modal */}
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="btn btn-secondary"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.8rem' }}
                  >
                    <span>Case Monograph</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Right Column: Actual Live Website Homepage Embedded Iframe */}
              <div
                style={{
                  height: '100%',
                  minHeight: '440px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <LiveSiteIframe
                  url={project.url}
                  title={project.title}
                  domain={project.website}
                  desktopWidth={1200}
                  imageFallback={project.image}
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
