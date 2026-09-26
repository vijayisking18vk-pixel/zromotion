import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientMarquee from './components/ClientMarquee';
import ManifestoStats from './components/ManifestoStats';
import PortfolioRail from './components/PortfolioRail';
import Services from './components/Services';
import Process from './components/Process';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import CaseStudyModal from './components/CaseStudyModal';

const CASE_STUDIES = {
  stjosephs: {
    id: 'stjosephs',
    title: 'St. Joseph Group of Institutions',
    website: 'stjosephsgarden.ac.in',
    url: 'https://stjosephsgarden.ac.in/',
    industry: 'Higher Education & Institutional Growth',
    services: 'Comprehensive Digital Strategies, Website Optimization & SEO, Social Media Management, Event Promotions',
    summary:
      'Crafting innovative, audience-centric digital strategies that drive engagement, growth, and meaningful connections across multiple prestigious institutions.',
    image: '/assets/images/stjosephs.jpg',
    metric: 'Institutional Brand & Admissions Growth',
    challenge:
      "During tenure with the St. Joseph Group of Institutions, spearheaded digital marketing initiatives to enhance the institution's brand presence across various online platforms while managing multi-campus institutional identities.",
    solution:
      'Developed and implemented tailored digital marketing strategies for multiple institutions within the group, optimized websites for organic SEO and user experience, cultivated vibrant student and alumni communities across social media, and orchestrated targeted promotions for admissions drives and academic events.',
    impact:
      'Delivered heightened search visibility and organic web traffic, expanded admissions inquiries, and positioned St. Joseph Group of Institutions as a premier educational powerhouse.',
  },
  poorvika: {
    id: 'poorvika',
    title: 'Poorvika',
    website: 'instagram.com/poorvika_india',
    url: 'https://www.instagram.com/poorvika_india/',
    client: 'Echovme',
    industry: 'Content Creation & Social Media',
    services: 'Content Creation for Social Media, Digital Campaigns, Gadget Promotions, High-Engagement Storytelling',
    summary:
      'Creating impactful, audience-focused content that informs, inspires, and drives meaningful engagement for Poorvika, a leading mobile and electronics retailer.',
    image: '/assets/images/poorvika.jpg',
    metric: 'High-Impact Social Engagement',
    challenge:
      'As part of the content creation efforts for Poorvika, a leading mobile and electronics retailer, the focus was crafting engaging, informative, and persuasive content tailored to a massive and diverse customer base across competitive retail categories.',
    solution:
      'Crafted innovative, audience-centric digital strategies and social media content: designed creative posts, viral videos, and real-time stories to promote the latest gadgets, exclusive festive offers, and store events, ensuring peak audience engagement across Instagram, Facebook, and Twitter.',
    impact:
      'Drove record-breaking engagement metrics, amplified social reach for product launches, and established Poorvika as a trusted, relatable electronics destination across South India.',
  },
  vooki: {
    id: 'vooki',
    title: 'Vooki',
    website: 'instagram.com/vooki_products',
    url: 'https://www.instagram.com/vooki_products/',
    client: 'vooki',
    industry: 'Digital Marketing Strategy & E-commerce',
    services: 'Digital Marketing Strategy, Brand Positioning, SEO & Content Marketing, Social Media Growth',
    summary:
      'Crafting an innovative, audience-centric digital marketing strategy, eco-friendly brand positioning, and viral social media marketing for Vooki safe cleaning solutions.',
    image: '/assets/images/vooki.jpg',
    metric: 'Clean Spaces, Green Planet',
    challenge:
      'Vooki needed to distinguish its non-toxic, safe cleaning solutions from conventional chemical products, establish authoritative search visibility, and build high-conversion digital shopping touchpoints.',
    solution:
      '1. Brand Positioning & Messaging: Highlighted Vooki\'s eco-friendly, non-toxic USP with the core tagline "Clean Spaces, Green Planet". 2. Website Optimization & SEO: Targeted keywords like "eco-friendly cleaning products" and "safe home cleaners", streamlining e-commerce checkout. 3. Content Marketing & Social Media: Developed viral DIY cleaning hacks, user-generated content (UGC), before-and-after cleaning transformations, and high-energy Instagram Reels across Instagram, Facebook, and Pinterest.',
    impact:
      'Significantly increased brand awareness, accelerated direct-to-consumer e-commerce adoption, and created a loyal, green-living community around safe home hygiene.',
  },
  rrjcbspares: {
    id: 'rrjcbspares',
    title: 'RR JCB Spares',
    website: 'rrjcbspares.in',
    url: 'https://rrjcbspares.in/',
    client: 'RR JCB Spares',
    industry: 'Website Creation & B2B Architecture',
    services: 'Bespoke Website Creation, Custom CMS Architecture, B2B Equipment Catalog, Responsive Engineering',
    summary:
      'Complete design and engineering of a bespoke digital platform for an established B2B heavy machinery seller, featuring an intuitive spares catalog and seamless inquiry workflows.',
    image: '/assets/images/rrjcbspares.jpg',
    metric: 'Bespoke B2B Spares Platform',
    challenge:
      'RR JCB Spares required a modern, elegant, and user-friendly website that would attract heavy machinery contractors and fleet operators, showcase their extensive spare parts inventory, and enable quick inquiries.',
    solution:
      'Delivered a bespoke responsive website engineered with modern web technologies for peak speed and usability. Implemented a user-friendly Content Management System (CMS) allowing rapid parts catalog updates, showcased heavy machinery components with crisp technical imagery, and built a streamlined inquiry funnel across desktop and mobile.',
    impact:
      'Empowered contractors and repair workshops to source parts with zero friction, dramatically increasing inbound inquiries and solidifying RR JCB Spares’ reputation across the industrial sector.',
  },
  unfounded: {
    id: 'unfounded',
    title: 'Unfounded',
    website: 'www.unfounded.in',
    url: 'https://www.unfounded.in',
    industry: 'Venture Lab & AI Studio',
    services: 'Brand Strategy, Visual Identity, Venture Positioning, Digital Flagship',
    summary:
      'High-conviction AI ventures and deep-tech products engineered from first principles in Chennai, shipping globally to redefine intelligent software.',
    image: '/assets/images/unfounded.jpg',
    metric: 'Global AI Studio Launch',
    challenge:
      'Unfounded is a frontier venture lab building what doesn’t exist. They required an elite, high-conviction digital identity, narrative architecture, and visual system reflecting deep-tech engineering and global ambition.',
    solution:
      'We engineered a minimalist architectural brand language, editorial digital monograph, and strategic venture thesis positioning their Chennai studio as a world-class incubation powerhouse for global software.',
    impact:
      'Successfully positioned Unfounded as a tier-one AI venture lab, attracting visionary founders, strategic capital, and global engineering talent.',
  },
  ziggers: {
    id: 'ziggers',
    title: 'Ziggers',
    website: 'www.ziggers.in',
    url: 'https://www.ziggers.in',
    industry: 'Gig Economy & On-Demand Workforce',
    services: 'Performance Marketing, App Store Optimization, Social Growth, Product UX',
    summary:
      "India's premier on-demand gig jobs and temporary workforce platform connecting businesses with verified catering, event, driver, and delivery staff with same-day UPI payouts.",
    image: '/assets/images/ziggers.jpg',
    metric: '100k+ Shifts Dispatched',
    challenge:
      'Hospitality and event organizers face acute short-term staffing deficits, while gig workers endure opaque scheduling and delayed wages. Ziggers needed a trusted, high-velocity acquisition funnel.',
    solution:
      'We built hyper-localized performance acquisition funnels, App Store optimization (ASO), and viral worker onboarding loops across Chennai, Bangalore, and major metropolitan hubs.',
    impact:
      'Dispatched over 100,000 verified shifts, achieved a 4.8★ app rating across 1,200+ reviews, and positioned Ziggers as India’s leading on-demand gig workforce app.',
  },
  thalaimai360: {
    id: 'thalaimai360',
    title: 'Thalaimai 360',
    website: 'www.thalaimai360.com',
    url: 'https://thalaimai360.com',
    industry: 'Executive Leadership & Public Governance',
    services: 'Strategic Communication, Public Affairs, Narrative Architecture, Digital Influence',
    summary:
      'Elite political advisory and strategic governance firm transforming electoral mandates into measurable public impact across constituencies.',
    image: '/assets/images/thalaimai360.jpg',
    metric: '360° Public Governance',
    challenge:
      'Bridging the critical divide between grassroots political mandates and institutional governance execution for elected representatives and ministers in Tamil Nadu.',
    solution:
      'Architected a 360° leadership communication framework, constituency intelligence dashboards, citizen grievance tracking workflows, and policy narrative positioning.',
    impact:
      'Empowered political leaders with data-driven governance intelligence, constituent trust audits, and enduring democratic mandates.',
  },
  loopverse: {
    id: 'loopverse',
    title: 'LoopVerse',
    website: 'www.loopverse.in',
    url: 'https://www.loopverse.in',
    industry: 'AI & Web3 Skill Verification Protocol',
    services: 'Brand Identity, Technical SEO, Product Launch, Developer Community',
    summary:
      'Cryptographically proven, AI-validated skill verification protocol replacing unverified resumes with verifiable on-chain competency proofs.',
    image: '/assets/images/loopverse.jpg',
    metric: 'Skill Verification Protocol',
    challenge:
      'Global tech companies spend billions sifting through unverified resumes and fraudulent skill claims, while top developers lack verifiable proof of capability.',
    solution:
      'Crafted a minimalist, high-trust developer brand identity, interactive protocol documentation, and global technical SEO architecture for Web3 & AI talent.',
    impact:
      'Established LoopVerse as the trusted cryptographic skill verification protocol, enabling seamless talent validation across AI and blockchain ecosystems.',
  },
  subanesh: {
    id: 'subanesh',
    title: 'Subanesh',
    website: 'subanesh.framer.website',
    url: 'https://subanesh.framer.website/',
    industry: 'Performance Marketing & Lead Systems',
    services: 'SEO Architecture, Social Media Campaigns, Lead Generation, Conversion Funnels',
    summary:
      'Tailored digital growth systems, high-intent lead generation funnels, and precision SEO architectures engineered to help businesses scale and succeed online.',
    image: '/assets/images/subanesh.jpg',
    metric: 'High-Intent Lead Engines',
    challenge:
      'Modern businesses face rising customer acquisition costs and low organic search visibility, making it difficult to generate predictable, qualified inbound pipeline.',
    solution:
      'Engineered a full-funnel digital marketing ecosystem combining technical SEO, high-converting responsive landing experiences, targeted social campaigns, and automated lead capture workflows.',
    impact:
      'Drove substantial organic keyword rankings, expanded qualified lead generation pipelines, and established an authoritative digital presence for sustainable growth.',
  },
};

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    // Lenis buttery smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links smooth scrolling integration
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -70 });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handleAnchorClick);
    });

    return () => {
      lenis.destroy();
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  const activeProject = selectedProjectId ? CASE_STUDIES[selectedProjectId] : null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* 2.8% Faint Film-Grain Overlay across whole page */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Spring Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navbar with Pinterest Brand Mark */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Main Single-Scroll Experience */}
      <main>
        {/* 1. Hero with 3D Lavender Liquid-Metal Blob ("The Signal") */}
        <Hero onOpenContact={() => setContactOpen(true)} />

        {/* 2. Client Marquee: Outlined Purple Wordmarks filling on hover */}
        <ClientMarquee />

        {/* 3. Manifesto & Animated Stats Strip */}
        <ManifestoStats />

        {/* 4. Portfolio Rail: GSAP Pinned Horizontal Scroll */}
        <PortfolioRail onSelectProject={(id) => setSelectedProjectId(id)} />

        {/* 5. Services: 4-Card Liquid Morph Hover Grid */}
        <Services onOpenContact={() => setContactOpen(true)} />

        {/* 6. Process: Vertical Pinned Timeline with Signal Wire Scrub */}
        <Process />

        {/* 7. CTA: Massive "LET'S TALK" Headline with Magnetic Button */}
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer repeating brand mark & links */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* In-depth Interactive Modals */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CaseStudyModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
        onOpenContact={() => {
          setSelectedProjectId(null);
          setContactOpen(true);
        }}
      />
    </div>
  );
}
