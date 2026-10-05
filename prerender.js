/**
 * Chennai Rents — Static Site Pre-Renderer (SSG Engine)
 *
 * Pre-renders all indexable routes using the EXACT React components
 * (App.jsx, Header.jsx, Footer.jsx, Home.jsx, LocalityPage.jsx, etc.).
 *
 * Guarantees 100% VISUAL FIDELITY while generating pure static HTML
 * with crawlable <title>, <meta description>, <link rel="canonical">,
 * <meta name="robots">, Open Graph, Twitter cards, and Schema.org JSON-LD.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.chennairents.in';
const DIST_DIR = path.resolve(__dirname, 'dist');
const SSR_DIR = path.resolve(__dirname, 'dist-ssr');

// Import data definitions
import { LOCALITIES, generateSEOMeta, parseIntent, getIndexingDirective } from './src/data/localities.js';
import { POSTS } from './src/data/posts.js';
import { CHENNAI_RENT_HUB_DATA, SUPPORTING_RENTAL_PAGES, AUTHOR_INFO } from './src/data/rentalGuideData.js';
import { VELACHERY_PAGES, VELACHERY_GEO } from './src/data/velacheryLandingPages.js';
import { VALASARAVAKKAM_PAGES, VALASARAVAKKAM_GEO } from './src/data/valasaravakkamLandingPages.js';
import { ADYAR_PAGES, ADYAR_GEO } from './src/data/adyarLandingPages.js';
import { SHOLINGANALLUR_PAGES, SHOLINGANALLUR_GEO } from './src/data/sholinganallurLandingPages.js';
import { PORUR_PAGES, PORUR_GEO } from './src/data/porurLandingPages.js';
import { ANNA_NAGAR_PAGES, ANNA_NAGAR_GEO } from './src/data/annaNagarLandingPages.js';

const LOCALITY_FACETS = [
  'flats-for-rent',
  '1-bhk-for-rent',
  '2-bhk-for-rent',
  '3-bhk-for-rent',
  'pg',
  'fully-furnished-flats-for-rent',
  'flats-for-rent-under-20000',
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function runPrerender() {
  console.log('----------------------------------------------------');
  console.log('🚀 Starting Pre-rendering (SSG) for Chennai Rents...');

  const ssrBundlePath = path.join(SSR_DIR, 'entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('❌ SSR bundle not found at', ssrBundlePath);
    process.exit(1);
  }

  const { render } = await import(`file://${ssrBundlePath}`);

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Base dist/index.html template not found');
    process.exit(1);
  }

  let baseTemplate = fs.readFileSync(templatePath, 'utf8');

  // Inline CSS into <style> to eliminate render-blocking stylesheet requests
  const assetsDir = path.join(DIST_DIR, 'assets');
  let inlinedStyles = '';
  if (fs.existsSync(assetsDir)) {
    const cssFiles = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.css'));
    for (const cssFile of cssFiles) {
      const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
      inlinedStyles += cssContent + '\n';
    }
  }

  if (inlinedStyles) {
    baseTemplate = baseTemplate.replace(
      /<link\s+[^>]*href="\/assets\/[^"]+\.css"[^>]*\/?>/i,
      `<style id="cr-critical-css">${inlinedStyles}</style>`
    );
    console.log(`📦 Successfully inlined ${inlinedStyles.length} bytes of compiled CSS (0 render-blocking stylesheets)!`);
  }

  // Build the complete route list
  const routes = [];

  // 1. Core pages
  routes.push({
    path: '/',
    title: 'Chennai Rents: Locality-First Rental Guide for Chennai',
    description: 'Explore real rent rates, water reality, flood history, crowdsourced rental map, and verified direct owner listings in Chennai. Honest locality guides with zero broker fees.',
    canonical: `${DOMAIN}/`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Chennai Rents',
        url: DOMAIN,
        description: 'Locality-first rental guide and verified listings for Chennai',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${DOMAIN}/chennai/{search_term_string}/`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Chennai Rents',
        url: DOMAIN,
        logo: `${DOMAIN}/chennai-rents-official-logo.jpg`,
        sameAs: ['https://www.instagram.com/chennairents/'],
        areaServed: {
          '@type': 'City',
          name: 'Chennai',
          sameAs: 'https://en.wikipedia.org/wiki/Chennai',
        },
      },
    ],
  });

  routes.push({
    path: '/about',
    title: 'About Chennai Rents: Why We Built an Honest Rental Guide',
    description: 'Learn why Chennai Rents was founded: to replace spammy listing portals with honest locality rental intelligence and verified listings in Chennai.',
    canonical: `${DOMAIN}/about`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Chennai Rents',
        url: `${DOMAIN}/about`,
        description: 'Why Chennai Rents was founded to create rental transparency for Chennai.',
      },
    ],
  });

  // E-E-A-T & Trust Pages
  routes.push({
    path: '/methodology',
    title: 'Research Methodology & Data Verification | Chennai Rents',
    description: 'How Chennai Rents collects empirical rental rates, evaluates ground-level water resilience, and verifies direct owner listings in Chennai.',
    canonical: `${DOMAIN}/methodology`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Chennai Rents Research Methodology',
        url: `${DOMAIN}/methodology`,
        description: 'Empirical data collection, ground-truth water scoring, and flood elevation modeling methodology.',
      },
    ],
  });

  routes.push({
    path: '/verification',
    title: 'Listing Verification Policy & Anti-Fraud Standards | Chennai Rents',
    description: 'Chennai Rents 4-step verification framework: owner property tax and EB bill matching, zero fake listings, and reporting mechanisms.',
    canonical: `${DOMAIN}/verification`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Chennai Rents Listing Verification Framework',
        url: `${DOMAIN}/verification`,
        description: 'Comprehensive 4-step physical and digital verification framework for direct owner listings.',
      },
    ],
  });

  routes.push({
    path: '/corrections',
    title: 'Editorial Corrections & Fact-Checking Policy | Chennai Rents',
    description: 'Chennai Rents policy for editorial corrections, empirical data updates, and 48-hour revision turnarounds.',
    canonical: `${DOMAIN}/corrections`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Chennai Rents Corrections and Fact-Checking Policy',
        url: `${DOMAIN}/corrections`,
        description: 'Public protocol for data corrections, community reporting, and editorial transparency.',
      },
    ],
  });

  routes.push({
    path: '/contact',
    title: 'Contact Editorial & Trust Desk | Chennai Rents',
    description: 'Reach the Chennai Rents editorial desk, submit locality research corrections, or report listing fraud directly.',
    canonical: `${DOMAIN}/contact`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Chennai Rents Editorial Desk',
        url: `${DOMAIN}/contact`,
        description: 'Direct communication channels for editorial inquiries, data corrections, and listing support.',
      },
    ],
  });

  routes.push({
    path: '/privacy',
    title: 'Privacy Policy | Chennai Rents',
    description: 'Privacy policy and data governance practices of Chennai Rents under the Digital Personal Data Protection Act 2023.',
    canonical: `${DOMAIN}/privacy`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: `${DOMAIN}/privacy`,
      },
    ],
  });

  routes.push({
    path: '/data-deletion',
    title: 'Data Deletion & Listing Removal Request | Chennai Rents',
    description: 'Submit a request to delete your personal data or remove a verified property listing from Chennai Rents.',
    canonical: `${DOMAIN}/data-deletion`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Data Deletion Request',
        url: `${DOMAIN}/data-deletion`,
      },
    ],
  });

  routes.push({
    path: '/chennai/rentals',
    title: 'Flats & Houses for Rent in Chennai | Chennai Rents',
    description: 'Find flats, houses, and PG for rent in Chennai. Explore locality-by-locality rent guides, real rent rates, water reports, and flood history. Verified direct listings.',
    canonical: `${DOMAIN}/chennai/rentals`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Flats for Rent in Chennai', item: `${DOMAIN}/chennai/rentals` },
        ],
      },
    ],
  });

  routes.push({
    path: '/chennai/1-bhk-for-rent',
    title: '1 BHK Flats for Rent in Chennai | Chennai Rents',
    description: 'Browse 1 BHK flats and apartments for rent in Chennai. Honest rent rates across all localities, water supply ratings, and direct owner listings.',
    canonical: `${DOMAIN}/chennai/1-bhk-for-rent`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: '1 BHK in Chennai', item: `${DOMAIN}/chennai/1-bhk-for-rent` },
        ],
      },
    ],
  });

  routes.push({
    path: '/chennai/2-bhk-for-rent',
    title: '2 BHK Flats for Rent in Chennai | Chennai Rents',
    description: 'Browse 2 BHK flats and apartments for rent in Chennai. Honest rent rates across all localities, water supply ratings, and direct owner listings.',
    canonical: `${DOMAIN}/chennai/2-bhk-for-rent`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: '2 BHK in Chennai', item: `${DOMAIN}/chennai/2-bhk-for-rent` },
        ],
      },
    ],
  });

  routes.push({
    path: '/chennai/3-bhk-for-rent',
    title: '3 BHK Flats for Rent in Chennai | Chennai Rents',
    description: 'Browse 3 BHK flats and apartments for rent in Chennai. Honest rent rates across all localities, water supply ratings, and direct owner listings.',
    canonical: `${DOMAIN}/chennai/3-bhk-for-rent`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: '3 BHK in Chennai', item: `${DOMAIN}/chennai/3-bhk-for-rent` },
        ],
      },
    ],
  });

  routes.push({
    path: '/chennai/pg',
    title: 'PG & Hostel for Rent in Chennai | Chennai Rents',
    description: 'Find PG accommodations and paying guest rooms in Chennai. Locality-by-locality rent ranges, food, amenities, and connectivity.',
    canonical: `${DOMAIN}/chennai/pg`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'PG in Chennai', item: `${DOMAIN}/chennai/pg` },
        ],
      },
    ],
  });

  routes.push({
    path: '/house-for-rent-in-chennai',
    title: CHENNAI_RENT_HUB_DATA.title,
    description: CHENNAI_RENT_HUB_DATA.metaDescription,
    canonical: `${DOMAIN}/house-for-rent-in-chennai`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: CHENNAI_RENT_HUB_DATA.h1,
        description: CHENNAI_RENT_HUB_DATA.metaDescription,
        datePublished: '2026-06-01',
        dateModified: '2026-10-02',
        author: {
          '@type': 'Person',
          name: AUTHOR_INFO.name,
          url: AUTHOR_INFO.website,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Chennai Rents',
          url: DOMAIN,
          logo: `${DOMAIN}/chennai-rents-official-logo.jpg`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
          { '@type': 'ListItem', position: 3, name: CHENNAI_RENT_HUB_DATA.h1, item: `${DOMAIN}/house-for-rent-in-chennai` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: CHENNAI_RENT_HUB_DATA.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  // Supporting rental guide pages
  SUPPORTING_RENTAL_PAGES.forEach((sp) => {
    routes.push({
      path: `/${sp.slug}`,
      title: sp.title,
      description: sp.description,
      canonical: `${DOMAIN}/${sp.slug}`,
      robots: 'index, follow',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: sp.h1,
          description: sp.description,
          author: {
            '@type': 'Person',
            name: AUTHOR_INFO.name,
            url: AUTHOR_INFO.website,
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/house-for-rent-in-chennai` },
            { '@type': 'ListItem', position: 3, name: sp.h1, item: `${DOMAIN}/${sp.slug}` },
          ],
        },
      ],
    });
  });

  // Author profile page
  routes.push({
    path: '/author/vijayrajkumar',
    title: `${AUTHOR_INFO.name}: Founder & Lead Editor | Chennai Rents`,
    description: `Author profile of ${AUTHOR_INFO.name}, Founder and Lead Editorial Reviewer of Chennai Rents.`,
    canonical: `${DOMAIN}/author/vijayrajkumar`,
    robots: 'index, follow',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: AUTHOR_INFO.name,
        url: AUTHOR_INFO.website,
        sameAs: AUTHOR_INFO.socialProfiles,
        jobTitle: AUTHOR_INFO.role,
      },
    ],
  });

  // 2. Locality hub pages (/chennai/:locality and /flats-for-rent-in-:locality-chennai)
  LOCALITIES.forEach((locality) => {
    const meta = generateSEOMeta({ locality });
    const canonical = `${DOMAIN}/chennai/${locality.slug}`;

    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: meta.h1, item: canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
    ];

    if (locality.faqs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: locality.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    // Canonical pattern: /chennai/:locality
    routes.push({
      path: `/chennai/${locality.slug}`,
      title: meta.title,
      description: meta.description,
      canonical,
      robots: 'index, follow',
      schema: schemas,
    });

    // Legacy pattern: /flats-for-rent-in-:locality-chennai (prerendered with canonical pointing to /chennai/:locality)
    routes.push({
      path: `/flats-for-rent-in-${locality.slug}-chennai`,
      title: meta.title,
      description: meta.description,
      canonical,
      robots: 'index, follow',
      schema: schemas,
    });

    // 3. Locality facets
    LOCALITY_FACETS.forEach((facet) => {
      const facetMeta = generateSEOMeta({ locality, intent: facet });
      const parsed = parseIntent(facet);
      const pageType = parsed.key || 'locality';
      const count = locality.listingCount?.[pageType] ?? locality.listingCount?.total ?? 0;
      const indexDirective = getIndexingDirective(pageType, count);
      const facetCanonical = `${DOMAIN}/chennai/${locality.slug}/${facet}`;

      const facetBreadcrumbs = [
        { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
        { '@type': 'ListItem', position: 3, name: locality.name, item: canonical },
        { '@type': 'ListItem', position: 4, name: facetMeta.h1, item: facetCanonical },
      ];

      routes.push({
        path: `/chennai/${locality.slug}/${facet}`,
        title: facetMeta.title,
        description: facetMeta.description,
        canonical: facetCanonical,
        robots: indexDirective,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: facetBreadcrumbs,
          },
        ],
      });
    });
  });

  // 3b. Velachery Programmatic SEO Landing Pages (19 long-form micro-markets)
  VELACHERY_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Velachery', item: `${DOMAIN}/chennai/velachery` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: VELACHERY_GEO.latitude,
          longitude: VELACHERY_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${VELACHERY_GEO.geoBoundingBox.south} ${VELACHERY_GEO.geoBoundingBox.west} ${VELACHERY_GEO.geoBoundingBox.north} ${VELACHERY_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Velachery',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: VELACHERY_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 25,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/velachery/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 3c. Valasaravakkam Programmatic SEO Landing Pages (19 long-form micro-markets)
  VALASARAVAKKAM_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Valasaravakkam', item: `${DOMAIN}/chennai/valasaravakkam` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: VALASARAVAKKAM_GEO.latitude,
          longitude: VALASARAVAKKAM_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${VALASARAVAKKAM_GEO.geoBoundingBox.south} ${VALASARAVAKKAM_GEO.geoBoundingBox.west} ${VALASARAVAKKAM_GEO.geoBoundingBox.north} ${VALASARAVAKKAM_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Valasaravakkam',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: VALASARAVAKKAM_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 25,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/valasaravakkam/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 3d. Adyar Programmatic SEO Landing Pages (19 long-form micro-markets)
  ADYAR_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Adyar', item: `${DOMAIN}/chennai/adyar` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: ADYAR_GEO.latitude,
          longitude: ADYAR_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${ADYAR_GEO.geoBoundingBox.south} ${ADYAR_GEO.geoBoundingBox.west} ${ADYAR_GEO.geoBoundingBox.north} ${ADYAR_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Adyar',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: ADYAR_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 25,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/adyar/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 3e. Sholinganallur Programmatic SEO Landing Pages (19 long-form micro-markets)
  SHOLINGANALLUR_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Sholinganallur', item: `${DOMAIN}/chennai/sholinganallur` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SHOLINGANALLUR_GEO.latitude,
          longitude: SHOLINGANALLUR_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${SHOLINGANALLUR_GEO.geoBoundingBox.south} ${SHOLINGANALLUR_GEO.geoBoundingBox.west} ${SHOLINGANALLUR_GEO.geoBoundingBox.north} ${SHOLINGANALLUR_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sholinganallur',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: SHOLINGANALLUR_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 28,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/sholinganallur/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 3f. Porur Programmatic SEO Landing Pages (19 long-form micro-markets)
  PORUR_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Porur', item: `${DOMAIN}/chennai/porur` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: PORUR_GEO.latitude,
          longitude: PORUR_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${PORUR_GEO.geoBoundingBox.south} ${PORUR_GEO.geoBoundingBox.west} ${PORUR_GEO.geoBoundingBox.north} ${PORUR_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Porur',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: PORUR_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 30,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/porur/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 3g. Anna Nagar Programmatic SEO Landing Pages (19 long-form micro-markets)
  ANNA_NAGAR_PAGES.forEach((page) => {
    const breadcrumbs = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals` },
      { '@type': 'ListItem', position: 3, name: 'Anna Nagar', item: `${DOMAIN}/chennai/anna-nagar` },
      { '@type': 'ListItem', position: 4, name: page.h1, item: page.canonical },
    ];

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: page.h1,
        description: page.metaDescription,
        url: page.canonical,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: ANNA_NAGAR_GEO.latitude,
          longitude: ANNA_NAGAR_GEO.longitude,
        },
        geoWithin: {
          '@type': 'GeoShape',
          box: `${ANNA_NAGAR_GEO.geoBoundingBox.south} ${ANNA_NAGAR_GEO.geoBoundingBox.west} ${ANNA_NAGAR_GEO.geoBoundingBox.north} ${ANNA_NAGAR_GEO.geoBoundingBox.east}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Anna Nagar',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
          postalCode: ANNA_NAGAR_GEO.pincode,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: page.priceRange.min,
          highPrice: page.priceRange.max,
          offerCount: 35,
        },
      },
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/chennai/anna-nagar/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
      canonical: page.canonical,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      schema: schemas,
    });
  });

  // 4. Guide posts (/guides/:slug and /guide/:slug)
  POSTS.filter((p) => p.type === 'guide').forEach((post) => {
    const canonical = `${DOMAIN}/guides/${post.slug}`;
    const postDesc = post.description || post.summary || post.tagline;
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: postDesc,
        publisher: {
          '@type': 'Organization',
          name: 'Chennai Rents',
          url: DOMAIN,
          logo: `${DOMAIN}/chennai-rents-official-logo.jpg`,
        },
        author: {
          '@type': 'Organization',
          name: 'Chennai Rents Editorial Team',
        },
        datePublished: '2026-06-01',
        dateModified: '2026-10-01',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${DOMAIN}/#guides` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      },
    ];

    if (post.faqs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/guides/${post.slug}`,
      title: `${post.title} | Chennai Rents`,
      description: postDesc,
      canonical,
      robots: 'index, follow',
      schema: schemas,
    });

    routes.push({
      path: `/guide/${post.slug}`,
      title: `${post.title} | Chennai Rents`,
      description: postDesc,
      canonical,
      robots: 'index, follow',
      schema: schemas,
    });
  });

  // 5. Data stories (/stories/:slug)
  POSTS.filter((p) => p.type === 'story').forEach((story) => {
    const canonical = `${DOMAIN}/stories/${story.slug}`;
    const storyDesc = story.description || story.summary || story.tagline;
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: story.title,
        description: storyDesc,
        publisher: {
          '@type': 'Organization',
          name: 'Chennai Rents',
          url: DOMAIN,
          logo: `${DOMAIN}/chennai-rents-official-logo.jpg`,
        },
        author: {
          '@type': 'Organization',
          name: 'Chennai Rents Editorial Team',
        },
        datePublished: '2026-06-01',
        dateModified: '2026-10-01',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Stories', item: `${DOMAIN}/listings` },
          { '@type': 'ListItem', position: 3, name: story.title, item: canonical },
        ],
      },
    ];

    if (story.faqs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: story.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    routes.push({
      path: `/stories/${story.slug}`,
      title: `${story.title} | Chennai Rents`,
      description: storyDesc,
      canonical,
      robots: 'index, follow',
      schema: schemas,
    });
  });

  // 6. 404 page
  routes.push({
    path: '/404',
    title: '404: Page Not Found | Chennai Rents',
    description: 'The requested page could not be found.',
    canonical: `${DOMAIN}/404`,
    robots: 'noindex, nofollow',
    schema: [],
  });

  console.log(`Generated route plan for ${routes.length} pages.`);

  let renderedCount = 0;

  for (const r of routes) {
    let appHtml = '';
    try {
      appHtml = render(r.path);
    } catch (renderErr) {
      console.error(`⚠️ Error rendering ${r.path}:`, renderErr.message);
      continue;
    }

    // Inject into template
    let html = baseTemplate;

    // Replace root content
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Update <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(r.title)}</title>`);

    // Update meta description
    if (html.includes('name="description"')) {
      html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(r.description)}" />`);
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(r.description)}" />\n</head>`);
    }

    // Update canonical link
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${r.canonical}" />`);
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${r.canonical}" />\n</head>`);
    }

    // Update robots meta
    if (html.includes('name="robots"')) {
      html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/i, `<meta name="robots" content="${r.robots}" />`);
    } else {
      html = html.replace('</head>', `  <meta name="robots" content="${r.robots}" />\n</head>`);
    }

    // Update og:title, og:description, og:url
    html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(r.title)}" />`);
    html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(r.description)}" />`);
    html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${r.canonical}" />`);

    // Update twitter:title, twitter:description
    html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(r.title)}" />`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(r.description)}" />`);

    // Inject Schema.org JSON-LD
    if (r.schema && r.schema.length > 0) {
      const schemaTag = `\n  <script id="chennai-rents-schema" type="application/ld+json">\n${JSON.stringify(r.schema, null, 2)}\n  </script>`;
      html = html.replace('</head>', `${schemaTag}\n</head>`);
    }

    // Write file
    let targetFile;
    if (r.path === '/') {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else if (r.path === '/404') {
      targetFile = path.join(DIST_DIR, '404.html');
    } else {
      const cleanPath = r.path.startsWith('/') ? r.path.slice(1) : r.path;
      const targetDir = path.join(DIST_DIR, cleanPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      targetFile = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFile, html, 'utf8');
    renderedCount++;
  }

  // Clean up temporary SSR directory
  try {
    fs.rmSync(SSR_DIR, { recursive: true, force: true });
  } catch (e) {
    // Ignore cleanup errors
  }

  console.log(`✅ Successfully pre-rendered ${renderedCount} static HTML pages!`);
  console.log('----------------------------------------------------');
}

runPrerender().catch((err) => {
  console.error('❌ Fatal error in prerender:', err);
  process.exit(1);
});
