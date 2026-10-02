/**
 * Chennai Rents — Static Site Pre-Renderer (SSG Engine)
 * 
 * Generates fully populated, semantic, crawler-ready HTML for every indexable URL.
 * Injects raw <h1>, introductory copy, real HTML <table> for rents, 
 * accurate canonical tags (with trailing slashes), and valid Schema.org JSON-LD.
 * 
 * Guarantees Googlebot and social bots see complete content without JavaScript execution.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { LOCALITIES, generateSEOMeta } from './src/data/localities.js';
import { POSTS } from './src/data/posts.js';
import { RENT_DATA, formatINR } from './src/data/rentData.js';

const DOMAIN = 'https://chennairents.in';
const DIST_DIR = path.resolve(__dirname, 'dist');

// Read the base index.html built by Vite
const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

// Extract CSS and JS asset links from the built template
const assetMatches = baseHtml.match(/<link rel="stylesheet"[^>]*>|<script type="module"[^>]*><\/script>/gi) || [];
const assetTags = assetMatches.join('\n    ');

/**
 * Escapes HTML characters safely
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates the common site header HTML
 */
function renderHeader() {
  return `
    <header class="site-header" style="border-bottom: 1px solid var(--c-border, #e5e7eb); padding: 1rem 0; background: #fff;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; alignItems: center;">
        <a href="/" style="text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
          <strong style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; color: #111827; letter-spacing: -0.02em;">Chennai Rents</strong>
        </a>
        <nav aria-label="Main Navigation" style="display: flex; gap: 1.25rem; align-items: center;">
          <a href="/chennai/rentals/" style="text-decoration: none; color: #374151; font-weight: 600; font-size: 0.95rem;">Localities</a>
          <a href="/data/chennai-rent-report-2026/" style="text-decoration: none; color: #374151; font-weight: 600; font-size: 0.95rem;">2026 Rent Report</a>
          <a href="/guides/pg-vs-co-living-vs-1bhk-chennai/" style="text-decoration: none; color: #374151; font-weight: 600; font-size: 0.95rem;">Rental Guides</a>
          <a href="/listings/index.html" style="text-decoration: none; background: #C8102E; color: #fff; padding: 0.4rem 0.9rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">View Map</a>
        </nav>
      </div>
    </header>
  `;
}

/**
 * Generates the common site footer HTML
 */
function renderFooter() {
  return `
    <footer class="site-footer" style="border-top: 1px solid var(--c-border, #e5e7eb); padding: 2.5rem 0; background: #fafafa; margin-top: 4rem;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
          <div>
            <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; margin: 0 0 0.75rem 0; font-size: 1.1rem;">Chennai Rents</h4>
            <p style="font-size: 0.88rem; color: #6b7280; line-height: 1.6;">
              Locality-first rental intelligence, verified tenant rates, flood checks, and direct owner listings across Chennai.
            </p>
          </div>
          <div>
            <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; margin: 0 0 0.75rem 0; font-size: 0.95rem;">Top Neighbourhoods</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.88rem; line-height: 1.8;">
              <li><a href="/chennai/tambaram/" style="text-decoration: none; color: #374151;">Rent in Tambaram</a></li>
              <li><a href="/chennai/chromepet/" style="text-decoration: none; color: #374151;">Rent in Chromepet</a></li>
              <li><a href="/chennai/valasaravakkam/" style="text-decoration: none; color: #374151;">Rent in Valasaravakkam</a></li>
              <li><a href="/chennai/velachery/" style="text-decoration: none; color: #374151;">Rent in Velachery</a></li>
              <li><a href="/chennai/porur/" style="text-decoration: none; color: #374151;">Rent in Porur</a></li>
            </ul>
          </div>
          <div>
            <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; margin: 0 0 0.75rem 0; font-size: 0.95rem;">Research & Data</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.88rem; line-height: 1.8;">
              <li><a href="/data/chennai-rent-report-2026/" style="text-decoration: none; color: #374151;">Chennai Rent Report 2026</a></li>
              <li><a href="/guides/pg-vs-co-living-vs-1bhk-chennai/" style="text-decoration: none; color: #374151;">PG vs Co-Living vs 1 BHK</a></li>
              <li><a href="/guide/advance-deposit-chennai/" style="text-decoration: none; color: #374151;">10 Months Advance Myth</a></li>
              <li><a href="/guide/tenant-rules-chennai/" style="text-decoration: none; color: #374151;">Tenant Rights & TNRRRL Act</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid #e5e7eb; margin-top: 2rem; padding-top: 1rem; font-size: 0.82rem; color: #9ca3af; text-align: center;">
          &copy; 2026 Chennai Rents (https://chennairents.in). Ground-truth Chennai real estate data.
        </div>
      </div>
    </footer>
  `;
}

/**
 * Builds the full pre-rendered HTML page document
 */
function createFullPage({
  title,
  description,
  canonicalUrl,
  robots = 'index, follow',
  jsonLd = null,
  bodyHtml = '',
  ogType = 'website',
  ogImage = 'https://chennairents.in/chennai-rents-official-logo.jpg'
}) {
  const jsonLdScript = jsonLd
    ? `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en-IN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#F5B800" />
    
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Chennai Rents" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- Open Graph -->
    <meta property="og:type" content="${ogType}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Chennai Rents" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${ogImage}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Google Fonts: Plus Jakarta Sans (Headings) + Inter (Body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/chennai-rents-logo.png" />
    <link rel="apple-touch-icon" href="/chennai-rents-official-logo.jpg" />

    ${jsonLdScript}

    ${assetTags}
  </head>
  <body>
    <div id="root">
      ${renderHeader()}
      ${bodyHtml}
      ${renderFooter()}
    </div>
  </body>
</html>`;
}

/**
 * Generates the authentic HTML rent table
 */
function buildRentTableHtml(locality) {
  const verifiedData = RENT_DATA[locality.slug];

  if (verifiedData && verifiedData.rents?.length > 0) {
    const rowsHtml = verifiedData.rents.map(r => `
      <tr>
        <td style="font-weight: 700; color: #111827; white-space: nowrap;">${escapeHtml(r.type)}</td>
        <td style="font-weight: 800; color: #C8102E; white-space: nowrap;">${formatINR(r.median)}/mo</td>
        <td style="font-weight: 600; color: #111827; white-space: nowrap;">${formatINR(r.min)} – ${formatINR(r.max)}</td>
        <td style="font-size: 0.88rem; color: #4b5563;">
          <strong style="color: #00875A;">(${r.reports} verified reports)</strong> ${escapeHtml(r.note)}
        </td>
      </tr>
    `).join('');

    return `
      <div class="bhk-table-wrap" style="overflow-x: auto; margin: 1.5rem 0;">
        <table class="bhk-table" style="width: 100%; border-collapse: collapse; text-align: left;" aria-label="Verified rent ranges in ${escapeHtml(locality.name)}">
          <caption style="text-align: left; padding: 0.5rem 0; font-size: 0.88rem; color: #6b7280;">
            Verified rental medians and realistic price bands in ${escapeHtml(locality.name)}, Chennai
          </caption>
          <thead>
            <tr style="border-bottom: 2px solid #e5e7eb; background: #f9fafb;">
              <th scope="col">Property Type</th>
              <th scope="col">Typical / Median Rent</th>
              <th scope="col">Realistic Range</th>
              <th scope="col">Verified Reports & Notes</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #6b7280; border-top: 1px dashed #e5e7eb; padding-top: 0.5rem;">
          <strong>Data Basis:</strong> Updated ${verifiedData.updated} based on ${verifiedData.reports} verified local tenant reports in ${escapeHtml(locality.name)}. Figures reflect actual rent paid, excluding maintenance charges.
        </div>
      </div>
    `;
  }

  // Fallback to locality.rentRanges
  const fallbackRows = locality.rentRanges.map(r => `
    <tr>
      <td style="font-weight: 700; color: #111827;">${escapeHtml(r.bhk)}</td>
      <td style="font-weight: 700; color: #C8102E;">${escapeHtml(r.range)}</td>
      <td style="font-size: 0.88rem; color: #4b5563;">${escapeHtml(r.note)}</td>
    </tr>
  `).join('');

  return `
    <div class="bhk-table-wrap" style="overflow-x: auto; margin: 1.5rem 0;">
      <table class="bhk-table" style="width: 100%; border-collapse: collapse; text-align: left;" aria-label="Rent ranges in ${escapeHtml(locality.name)}">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb; background: #f9fafb;">
            <th scope="col" style="padding: 0.75rem 1rem;">Property Type</th>
            <th scope="col" style="padding: 0.75rem 1rem;">Rent Range</th>
            <th scope="col" style="padding: 0.75rem 1rem;">Notes</th>
          </tr>
        </thead>
        <tbody>
          ${fallbackRows}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Pre-renders all pages
 */
async function prerender() {
  console.log('🚀 Starting Pre-rendering Static HTML (SSG Engine)...');

  // Track rendered files
  let renderedCount = 0;

  function writeRoute(routePath, htmlContent) {
    const cleanPath = routePath.replace(/^\/|\/$/g, '');
    let targetFile;

    if (!cleanPath) {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else {
      const targetDir = path.join(DIST_DIR, cleanPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      targetFile = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFile, htmlContent, 'utf8');
    renderedCount++;
  }

  // 1. Homepage (/)
  {
    const title = 'Chennai Rents: The Locality-First Rental Guide for Chennai';
    const description = 'Chennai Rents: The #1 locality-first guide to renting homes in Chennai. Real 1 BHK, 2 BHK, 3 BHK rent rates, water reality, flood checks, and verified tenant reports.';
    const canonicalUrl = `${DOMAIN}/`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Chennai Rents',
          url: `${DOMAIN}/`,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${DOMAIN}/chennai/{search_term_string}/`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Organization',
          name: 'Chennai Rents',
          url: `${DOMAIN}/`,
          logo: `${DOMAIN}/chennai-rents-logo.png`
        }
      ]
    };

    const localityCardsHtml = LOCALITIES.map(l => `
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.25rem;">
        <h3 style="margin: 0 0 0.4rem 0;"><a href="/chennai/${l.slug}/" style="text-decoration: none; color: #111827;">${escapeHtml(l.name)}</a></h3>
        <p style="font-size: 0.88rem; color: #6b7280; margin: 0 0 0.75rem 0;">${escapeHtml(l.tagline)}</p>
        <a href="/chennai/${l.slug}/" style="font-weight: 700; color: #0056B3; font-size: 0.85rem; text-decoration: none;">View ${escapeHtml(l.name)} Rates & Guide →</a>
      </div>
    `).join('');

    const bodyHtml = `
      <main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #C8102E; text-transform: uppercase; letter-spacing: 0.05em;">Locality-First Real Estate Intelligence</span>
          <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-family: 'Plus Jakarta Sans', sans-serif; margin: 0.5rem 0 1rem 0; color: #111827;">
            Renting in Chennai, Locality by Locality
          </h1>
          <p style="font-size: 1.15rem; color: #4b5563; max-width: 720px; margin: 0 auto; line-height: 1.6;">
            Real crowdsourced rent rates by BHK, Palar & Metro Water reliability scores, Cyclone Michaung flood history, and zero-brokerage owner listings.
          </p>
          <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/data/chennai-rent-report-2026/" style="background: #111827; color: #fff; padding: 0.6rem 1.25rem; border-radius: 6px; text-decoration: none; font-weight: 700;">Read 2026 Rent Report</a>
            <a href="/chennai/rentals/" style="border: 1px solid #d1d5db; color: #111827; padding: 0.6rem 1.25rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Explore Localities</a>
          </div>
        </div>

        <section style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 1.25rem;">Explore Chennai Rental Neighbourhoods</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
            ${localityCardsHtml}
          </div>
        </section>

        <section style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 2rem; margin-bottom: 3rem;">
          <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-top: 0;">Verified Chennai Tenant Guides</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1rem;">
            <div>
              <h3 style="font-size: 1.1rem; margin: 0 0 0.5rem 0;"><a href="/guides/pg-vs-co-living-vs-1bhk-chennai/" style="text-decoration: none; color: #0056B3;">PG vs Co-Living vs 1 BHK in Chennai</a></h3>
              <p style="font-size: 0.88rem; color: #6b7280; margin: 0;">Comprehensive breakdown of real costs, deposits, rules, and food inclusions.</p>
            </div>
            <div>
              <h3 style="font-size: 1.1rem; margin: 0 0 0.5rem 0;"><a href="/guide/advance-deposit-chennai/" style="text-decoration: none; color: #0056B3;">The 10-Month Advance Deposit Myth</a></h3>
              <p style="font-size: 0.88rem; color: #6b7280; margin: 0;">How to negotiate deposits down to 4-6 months with employment proof and TNRRRL rights.</p>
            </div>
            <div>
              <h3 style="font-size: 1.1rem; margin: 0 0 0.5rem 0;"><a href="/guide/tenant-rules-chennai/" style="text-decoration: none; color: #0056B3;">Chennai Rental Agreements & Tenant Law</a></h3>
              <p style="font-size: 0.88rem; color: #6b7280; margin: 0;">Mandatory clauses, painting deduction limits, and electricity meter protections.</p>
            </div>
          </div>
        </section>
      </main>
    `;

    writeRoute('/', createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml }));
  }

  // 2. City Hub (/chennai/rentals/)
  {
    const title = 'Flats & Houses for Rent in Chennai — Locality Directory | Chennai Rents';
    const description = 'Complete directory of flats, houses, and PGs for rent across Chennai localities. Verified rent data, water scores, flood history, and direct owner listings.';
    const canonicalUrl = `${DOMAIN}/chennai/rentals/`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: 'Chennai Rents', url: `${DOMAIN}/` }
    };

    const localityListHtml = LOCALITIES.map(l => `
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.25rem;">
        <h3 style="margin: 0 0 0.35rem 0;"><a href="/chennai/${l.slug}/" style="text-decoration: none; color: #111827;">${escapeHtml(l.name)}</a></h3>
        <p style="font-size: 0.9rem; color: #4b5563; margin: 0 0 0.75rem 0;">${escapeHtml(l.tagline)}</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="/chennai/${l.slug}/1-bhk-for-rent/" style="font-size: 0.8rem; background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; text-decoration: none; color: #374151;">1 BHK</a>
          <a href="/chennai/${l.slug}/2-bhk-for-rent/" style="font-size: 0.8rem; background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; text-decoration: none; color: #374151;">2 BHK</a>
          <a href="/chennai/${l.slug}/bachelors/" style="font-size: 0.8rem; background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; text-decoration: none; color: #374151;">Bachelors</a>
          <a href="/chennai/${l.slug}/co-living-pg/" style="font-size: 0.8rem; background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; text-decoration: none; color: #374151;">PG</a>
        </div>
      </div>
    `).join('');

    const bodyHtml = `
      <main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
          <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
          <span>Chennai Rentals</span>
        </nav>
        <h1 style="font-size: 2.2rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin-bottom: 0.5rem;">
          Flats & Houses for Rent in Chennai — Locality Directory
        </h1>
        <p style="font-size: 1.1rem; color: #4b5563; max-width: 800px; line-height: 1.6; margin-bottom: 2.5rem;">
          Find authentic rental benchmarks across 13 major Chennai hubs. Compare verified median rents, suburban railway and metro access, Palar/Metro water supplies, and cyclone flood safety.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
          ${localityListHtml}
        </div>
      </main>
    `;

    writeRoute('/chennai/rentals/', createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml }));
  }

  // 3. High-Authority Assets: Chennai Rent Report 2026 (/data/chennai-rent-report-2026/)
  {
    const title = 'Chennai Rent Report 2026 — Market Data, Medians & Locality Comparisons | Chennai Rents';
    const description = 'Comprehensive 2026 Chennai rental market report: city-wide median rents, Tambaram vs Chromepet, Valasaravakkam vs Porur, deposit norms, water supply impact, and Metro Phase 2 effects.';
    const canonicalUrl = `${DOMAIN}/data/chennai-rent-report-2026/`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Data & Reports', item: canonicalUrl },
            { '@type': 'ListItem', position: 3, name: 'Chennai Rent Report 2026', item: canonicalUrl }
          ]
        },
        {
          '@type': 'Article',
          headline: 'Chennai Rental Market Data & Locality Report 2026',
          description,
          datePublished: '2026-10-01T00:00:00+05:30',
          dateModified: '2026-10-01T00:00:00+05:30',
          author: { '@type': 'Organization', name: 'Chennai Rents Research Team' }
        },
        {
          '@type': 'Dataset',
          name: 'Chennai Rental Rates & Median Rent Dataset 2026',
          description: 'Crowdsourced, tenant-verified rental price points across 13 major Chennai residential clusters.',
          url: canonicalUrl
        }
      ]
    };

    const bodyHtml = `
      <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem;">
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
          <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
          <span>Chennai Rent Report 2026</span>
        </nav>
        <span style="font-size: 0.85rem; font-weight: 800; color: #C8102E; text-transform: uppercase; letter-spacing: 0.04em;">Empirical Market Intelligence &bull; October 2026</span>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin: 0.5rem 0 1rem 0;">
          Chennai Rental Market Data & Locality Report 2026
        </h1>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.6; margin-bottom: 2rem;">
          A ground-truth, data-backed analysis of actual rents paid across Chennai neighbourhoods. Based on 240+ verified tenant submissions, tenancy registrations, and municipal water scorecards.
        </p>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif;">1. City-Wide Median Rent Benchmarks (2026)</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;" aria-label="City-wide rental benchmark table">
            <tr style="border-bottom: 2px solid #e5e7eb; background: #f9fafb;">
              <th style="padding: 0.75rem 1rem;">Unit Type</th>
              <th style="padding: 0.75rem 1rem;">City Median</th>
              <th style="padding: 0.75rem 1rem;">Suburban Range (GST / West)</th>
              <th style="padding: 0.75rem 1rem;">IT Corridor Range (OMR / Guindy)</th>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>1 BHK</strong></td>
              <td style="padding: 0.75rem 1rem; font-weight: 800; color: #C8102E;">₹10,500/mo</td>
              <td style="padding: 0.75rem 1rem;">₹6,000 – ₹10,000</td>
              <td style="padding: 0.75rem 1rem;">₹11,000 – ₹16,000</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>2 BHK</strong></td>
              <td style="padding: 0.75rem 1rem; font-weight: 800; color: #C8102E;">₹18,000/mo</td>
              <td style="padding: 0.75rem 1rem;">₹9,500 – ₹16,500</td>
              <td style="padding: 0.75rem 1rem;">₹17,000 – ₹28,000</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>3 BHK</strong></td>
              <td style="padding: 0.75rem 1rem; font-weight: 800; color: #C8102E;">₹29,000/mo</td>
              <td style="padding: 0.75rem 1rem;">₹15,000 – ₹25,000</td>
              <td style="padding: 0.75rem 1rem;">₹26,000 – ₹45,000</td>
            </tr>
          </table>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif;">2. Key Locality Head-to-Head Comparisons</h2>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin-top: 1rem;">
            <h3 style="margin-top: 0; color: #0056B3;">Tambaram vs Chromepet (South GST Corridor)</h3>
            <p style="font-size: 0.95rem; color: #4b5563; line-height: 1.6;">
              Chromepet commands an 8% to 12% premium over Tambaram due to closer airport access, retail centers, and MIT campus. 2 BHK median in Chromepet is ₹13,000 vs ₹12,000 in Tambaram. Tambaram offers more spacious independent houses and larger student/bachelor accommodations near MCC.
            </p>
            <div style="display: flex; gap: 1rem;">
              <a href="/chennai/tambaram/" style="font-weight: 700; color: #0056B3;">Tambaram Rates →</a>
              <a href="/chennai/chromepet/" style="font-weight: 700; color: #0056B3;">Chromepet Rates →</a>
            </div>
          </div>

          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin-top: 1rem;">
            <h3 style="margin-top: 0; color: #0056B3;">Valasaravakkam vs Porur (West Arcot Corridor)</h3>
            <p style="font-size: 0.95rem; color: #4b5563; line-height: 1.6;">
              Porur is the primary employment driver anchored by DLF Cybercity (2 BHK median ₹19,000). Valasaravakkam provides a peaceful residential haven 3.5 km away with 2 BHK median at ₹17,000 and upcoming Metro Line 4 connectivity.
            </p>
            <div style="display: flex; gap: 1rem;">
              <a href="/chennai/valasaravakkam/" style="font-weight: 700; color: #0056B3;">Valasaravakkam Rates →</a>
              <a href="/chennai/porur/" style="font-weight: 700; color: #0056B3;">Porur Rates →</a>
            </div>
          </div>
        </section>
      </main>
    `;

    writeRoute('/data/chennai-rent-report-2026/', createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml, ogType: 'article' }));
  }

  // 4. High-Authority Assets: PG vs Co-Living Guide (/guides/pg-vs-co-living-vs-1bhk-chennai/)
  {
    const title = 'PG vs Co-Living vs 1 BHK in Chennai: Cost, Deposits & Rules (2026 Guide) | Chennai Rents';
    const description = 'Detailed comparison of PG, modern co-living, and 1 BHK flats in Chennai. Breakdown of real monthly costs, advance deposits, food & EB inclusions, rules, and best localities.';
    const canonicalUrl = `${DOMAIN}/guides/pg-vs-co-living-vs-1bhk-chennai/`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Renting Guides', item: canonicalUrl },
            { '@type': 'ListItem', position: 3, name: 'PG vs Co-Living vs 1 BHK Chennai', item: canonicalUrl }
          ]
        },
        {
          '@type': 'Article',
          headline: 'PG vs Co-Living vs 1 BHK in Chennai: Cost, Deposits, Rules & Best Areas (2026)',
          description,
          datePublished: '2026-10-01T00:00:00+05:30',
          dateModified: '2026-10-01T00:00:00+05:30',
          author: { '@type': 'Organization', name: 'Chennai Rents Editorial Desk' }
        }
      ]
    };

    const bodyHtml = `
      <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem;">
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
          <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
          <span>PG vs Co-Living vs 1 BHK</span>
        </nav>
        <span style="font-size: 0.85rem; font-weight: 800; color: #C8102E; text-transform: uppercase; letter-spacing: 0.04em;">Tenant Decision Matrix &bull; October 2026</span>
        <h1 style="font-size: clamp(2rem, 4vw, 2.5rem); font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin: 0.5rem 0 1rem 0;">
          PG vs Co-Living vs 1 BHK in Chennai: Cost, Deposits & What You Really Get
        </h1>
        <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.6; margin-bottom: 2rem;">
          Moving to Chennai for work or college? Before committing your advance deposit, understand the hidden costs of food, electricity tariffs, security deposits, and curfew rules across traditional PGs, managed co-living, and independent 1 BHK apartments.
        </p>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif;">Comparison Matrix (2026 Benchmarks)</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;" aria-label="Comparison Table">
            <tr style="border-bottom: 2px solid #e5e7eb; background: #f9fafb;">
              <th style="padding: 0.75rem 1rem;">Feature</th>
              <th style="padding: 0.75rem 1rem;">Traditional PG</th>
              <th style="padding: 0.75rem 1rem;">Managed Co-Living</th>
              <th style="padding: 0.75rem 1rem;">Independent 1 BHK</th>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>Monthly Cost</strong></td>
              <td style="padding: 0.75rem 1rem; color: #C8102E; font-weight: 700;">₹5,000 – ₹9,000</td>
              <td style="padding: 0.75rem 1rem; color: #C8102E; font-weight: 700;">₹9,000 – ₹16,000</td>
              <td style="padding: 0.75rem 1rem; color: #C8102E; font-weight: 700;">₹7,500 – ₹15,000</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>Advance Deposit</strong></td>
              <td style="padding: 0.75rem 1rem;">1 – 2 months (₹5k–₹15k)</td>
              <td style="padding: 0.75rem 1rem;">1 – 2 months (₹10k–₹25k)</td>
              <td style="padding: 0.75rem 1rem; font-weight: 700;">4 – 10 months (₹35k–₹1.2L)</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem 1rem;"><strong>Food Inclusions</strong></td>
              <td style="padding: 0.75rem 1rem;">Breakfast + Dinner included</td>
              <td style="padding: 0.75rem 1rem;">Optional meal plans</td>
              <td style="padding: 0.75rem 1rem;">Self-cooked / Cook hire</td>
            </tr>
          </table>
        </section>
      </main>
    `;

    writeRoute('/guides/pg-vs-co-living-vs-1bhk-chennai/', createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml, ogType: 'article' }));
    // Alias /guide/pg-vs-co-living-vs-1bhk-chennai/
    writeRoute('/guide/pg-vs-co-living-vs-1bhk-chennai/', createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml, ogType: 'article' }));
  }

  // 5. Locality Pages & Child Intent Sub-Pages
  const childIntents = [
    'bachelors',
    'families',
    'co-living-pg',
    '1-bhk-for-rent',
    '2-bhk-for-rent',
    '3-bhk-for-rent',
    'fully-furnished-flats-for-rent',
    'flats-for-rent-under-20000',
  ];

  for (const locality of LOCALITIES) {
    // 5A. Main Locality Page (/chennai/:locality/)
    {
      const meta = generateSEOMeta({ locality });
      const canonicalUrl = `${DOMAIN}/chennai/${locality.slug}/`;

      const breadcrumbList = [
        { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals/` },
        { '@type': 'ListItem', position: 3, name: meta.h1, item: canonicalUrl }
      ];

      const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: canonicalUrl,
        inLanguage: 'en-IN',
        isPartOf: { '@type': 'WebSite', name: 'Chennai Rents', url: `${DOMAIN}/` }
      };

      const faqSchema = locality.faqs?.length ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: locality.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      } : null;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'BreadcrumbList', itemListElement: breadcrumbList },
          webPageSchema,
          ...(faqSchema ? [faqSchema] : [])
        ]
      };

      // Sister localities links
      const sisterLinksHtml = (locality.nearbyLocalities || []).map(s => `
        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.85rem 1rem;">
          <a href="/chennai/${s.slug}/" style="font-weight: 700; color: #111827; text-decoration: none;">&rarr; ${escapeHtml(s.name)}</a>
          <div style="font-size: 0.82rem; color: #6b7280; margin-top: 0.2rem;">${escapeHtml(s.note)}</div>
        </div>
      `).join('');

      // Sub-intent links
      const subIntentLinksHtml = childIntents.map(intent => `
        <a href="/chennai/${locality.slug}/${intent}/" style="background: #fff; border: 1px solid #e5e7eb; padding: 0.4rem 0.8rem; border-radius: 6px; text-decoration: none; font-size: 0.88rem; color: #374151; font-weight: 600;">
          ${intent.replace(/-/g, ' ')} in ${escapeHtml(locality.name)}
        </a>
      `).join('');

      // FAQs HTML
      const faqsHtml = (locality.faqs || []).map(f => `
        <div style="margin-bottom: 1.25rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem 1.25rem;">
          <h3 style="font-size: 1.05rem; margin: 0 0 0.5rem 0; color: #111827;">${escapeHtml(f.q)}</h3>
          <p style="margin: 0; font-size: 0.92rem; color: #4b5563; line-height: 1.6;">${escapeHtml(f.a)}</p>
        </div>
      `).join('');

      const bodyHtml = `
        <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem;">
          <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
            <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
            <a href="/chennai/rentals/" style="text-decoration: none; color: #374151;">Chennai</a> &rsaquo;
            <span>${escapeHtml(locality.name)}</span>
          </nav>

          <header style="margin-bottom: 2rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <span style="font-size: 0.82rem; font-weight: 800; color: #C8102E; text-transform: uppercase;">
                ${locality.zone === 'south' ? 'South Chennai' : locality.zone === 'west' ? 'West Chennai' : locality.zone === 'central' ? 'Central Chennai' : 'Chennai'}
              </span>
              ${locality.tamilHeading ? `<span style="font-size: 0.85rem; color: #6b7280; font-weight: 600;">&bull; ${escapeHtml(locality.tamilHeading)}</span>` : ''}
            </div>
            <h1 style="font-size: clamp(1.8rem, 4vw, 2.4rem); font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin: 0 0 0.75rem 0;">
              ${escapeHtml(meta.h1)}
            </h1>
            <p style="font-size: 1.1rem; color: #C8102E; font-weight: 600; margin: 0 0 1rem 0;">
              ${escapeHtml(locality.tagline)}
            </p>
            <p style="font-size: 1rem; color: #4b5563; line-height: 1.6; max-width: 900px; margin: 0;">
              ${escapeHtml(locality.description)}
            </p>
          </header>

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 0.5rem;">Search by Segment in ${escapeHtml(locality.name)}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.65rem;">
              ${subIntentLinksHtml}
            </div>
          </section>

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 0.5rem;">Rental Rates in ${escapeHtml(locality.name)}</h2>
            ${buildRentTableHtml(locality)}
          </section>

          <section style="margin-bottom: 2.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1.25rem;">
              <h3 style="margin-top: 0; color: #166534; font-size: 1.15rem;">Water Supply Reality</h3>
              <p style="font-size: 0.92rem; color: #374151; line-height: 1.6; margin: 0;">
                <strong>${escapeHtml(locality.waterReality?.status)}:</strong> ${escapeHtml(locality.waterReality?.detail)}
              </p>
            </div>

            <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 1.25rem;">
              <h3 style="margin-top: 0; color: #9a3412; font-size: 1.15rem;">Flood Safety & Ground Elevation</h3>
              <p style="font-size: 0.92rem; color: #374151; line-height: 1.6; margin: 0;">
                ${escapeHtml(locality.floodCheck?.detail)}
              </p>
            </div>
          </section>

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 0.75rem;">Commute & Connectivity</h2>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.25rem; line-height: 1.7; font-size: 0.95rem; color: #374151;">
              ${locality.commute?.metro ? `<p style="margin: 0 0 0.5rem 0;"><strong>Metro / Train:</strong> ${escapeHtml(locality.commute.metro)}</p>` : ''}
              ${locality.commute?.bus ? `<p style="margin: 0 0 0.5rem 0;"><strong>MTC Bus:</strong> ${escapeHtml(locality.commute.bus)}</p>` : ''}
              ${locality.commute?.road ? `<p style="margin: 0;"><strong>By Road:</strong> ${escapeHtml(locality.commute.road)}</p>` : ''}
            </div>
          </section>

          ${locality.faqs?.length ? `
            <section style="margin-bottom: 2.5rem;">
              <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 1rem;">
                Frequently Asked Questions — Renting in ${escapeHtml(locality.name)}
              </h2>
              ${faqsHtml}
            </section>
          ` : ''}

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.4rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 1rem;">Nearby Localities to Explore</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
              ${sisterLinksHtml}
            </div>
          </section>
        </main>
      `;

      writeRoute(`/chennai/${locality.slug}/`, createFullPage({ title: meta.title, description: meta.description, canonicalUrl, jsonLd, bodyHtml }));
    }

    // 5B. Child Intent Pages (/chennai/:locality/:intent/)
    for (const intent of childIntents) {
      const meta = generateSEOMeta({ locality, intent });
      const canonicalUrl = `${DOMAIN}/chennai/${locality.slug}/${intent}/`;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
              { '@type': 'ListItem', position: 2, name: 'Chennai Rentals', item: `${DOMAIN}/chennai/rentals/` },
              { '@type': 'ListItem', position: 3, name: `Rent in ${locality.name}`, item: `${DOMAIN}/chennai/${locality.slug}/` },
              { '@type': 'ListItem', position: 4, name: meta.h1, item: canonicalUrl }
            ]
          },
          {
            '@type': 'WebPage',
            name: meta.title,
            description: meta.description,
            url: canonicalUrl,
            inLanguage: 'en-IN',
            isPartOf: { '@type': 'WebSite', name: 'Chennai Rents', url: `${DOMAIN}/` }
          }
        ]
      };

      const bodyHtml = `
        <main style="max-width: 1000px; margin: 2rem auto; padding: 0 1rem;">
          <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
            <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
            <a href="/chennai/rentals/" style="text-decoration: none; color: #374151;">Chennai</a> &rsaquo;
            <a href="/chennai/${locality.slug}/" style="text-decoration: none; color: #374151;">${escapeHtml(locality.name)}</a> &rsaquo;
            <span>${escapeHtml(intent.replace(/-/g, ' '))}</span>
          </nav>

          <header style="margin-bottom: 2rem;">
            <span style="font-size: 0.82rem; font-weight: 800; color: #C8102E; text-transform: uppercase;">
              ${escapeHtml(locality.name)} &bull; ${intent.replace(/-/g, ' ').toUpperCase()}
            </span>
            <h1 style="font-size: clamp(1.8rem, 4vw, 2.3rem); font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin: 0.5rem 0 0.75rem 0;">
              ${escapeHtml(meta.h1)}
            </h1>
            <p style="font-size: 1.05rem; color: #4b5563; line-height: 1.6; max-width: 850px; margin: 0 0 1rem 0;">
              ${escapeHtml(meta.description)}
            </p>
            <div style="background: #f9fafb; border-left: 4px solid #C8102E; padding: 0.85rem 1rem; border-radius: 4px; font-size: 0.9rem; color: #4b5563;">
              Looking for general neighbourhood info? View the complete <a href="/chennai/${locality.slug}/" style="font-weight: 700; color: #0056B3;">${escapeHtml(locality.name)} Rent Rates, Water & Commute Guide &rarr;</a>
            </div>
          </header>

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.3rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 0.5rem;">Verified Rental Pricing in ${escapeHtml(locality.name)}</h2>
            ${buildRentTableHtml(locality)}
          </section>

          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.3rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 0.75rem;">Explore Other Localities for ${escapeHtml(intent.replace(/-/g, ' '))}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
              ${LOCALITIES.filter(l => l.slug !== locality.slug).slice(0, 6).map(l => `
                <a href="/chennai/${l.slug}/${intent}/" style="background: #fff; border: 1px solid #e5e7eb; padding: 0.4rem 0.8rem; border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: #374151;">
                  ${escapeHtml(l.name)}
                </a>
              `).join('')}
            </div>
          </section>
        </main>
      `;

      writeRoute(`/chennai/${locality.slug}/${intent}/`, createFullPage({ title: meta.title, description: meta.description, canonicalUrl, jsonLd, bodyHtml }));
    }
  }

  // 6. Post Guides (/guide/:slug/)
  for (const post of POSTS.filter(p => p.type === 'guide')) {
    const title = `${post.title} | Chennai Rents`;
    const description = post.tagline || post.summary;
    const canonicalUrl = `${DOMAIN}/guide/${post.slug}/`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Chennai Rents', item: `${DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Rental Guides', item: `${DOMAIN}/` },
            { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl }
          ]
        },
        {
          '@type': 'Article',
          headline: post.title,
          description,
          author: { '@type': 'Organization', name: 'Chennai Rents Editorial Desk' }
        }
      ]
    };

    const sectionsHtml = (post.guideSections || []).map(s => `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin-bottom: 0.6rem;">${escapeHtml(s.heading)}</h2>
        <div style="font-size: 1rem; color: #374151; line-height: 1.7; white-space: pre-line;">${escapeHtml(s.content)}</div>
      </section>
    `).join('');

    const bodyHtml = `
      <main style="max-width: 900px; margin: 2rem auto; padding: 0 1rem;">
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb" style="font-size: 0.88rem; margin-bottom: 1rem; color: #6b7280;">
          <a href="/" style="text-decoration: none; color: #374151;">Home</a> &rsaquo;
          <span>${escapeHtml(post.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #C8102E; text-transform: uppercase;">Chennai Rental Advice</span>
          <h1 style="font-size: clamp(1.8rem, 4vw, 2.4rem); font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; margin: 0.5rem 0 1rem 0;">
            ${escapeHtml(post.title)}
          </h1>
          <p style="font-size: 1.1rem; color: #4b5563; line-height: 1.6; margin: 0;">
            ${escapeHtml(post.tagline)}
          </p>
        </header>
        ${sectionsHtml}
      </main>
    `;

    writeRoute(`/guide/${post.slug}/`, createFullPage({ title, description, canonicalUrl, jsonLd, bodyHtml, ogType: 'article' }));
  }

  // 7. Dedicated 404 Page (dist/404.html)
  {
    const title = 'Page Not Found (404) | Chennai Rents';
    const description = 'The page you requested could not be found. Explore verified Chennai rental localities and data reports on Chennai Rents.';
    const canonicalUrl = `${DOMAIN}/404.html`;

    const bodyHtml = `
      <main style="max-width: 800px; margin: 4rem auto; text-align: center; padding: 0 1rem;">
        <h1 style="font-size: 3rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #C8102E; margin-bottom: 0.5rem;">404 — Page Not Found</h1>
        <p style="font-size: 1.2rem; color: #4b5563; line-height: 1.6; margin-bottom: 2rem;">
          We could not find the exact page or listing you were searching for. It may have moved or been updated.
        </p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 2rem; margin-bottom: 2rem; text-align: left;">
          <h2 style="font-size: 1.2rem; font-family: 'Plus Jakarta Sans', sans-serif; margin-top: 0;">Popular Localities to Explore:</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1rem;">
            <a href="/chennai/tambaram/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; Rent in Tambaram</a>
            <a href="/chennai/chromepet/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; Rent in Chromepet</a>
            <a href="/chennai/valasaravakkam/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; Rent in Valasaravakkam</a>
            <a href="/chennai/velachery/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; Rent in Velachery</a>
            <a href="/chennai/porur/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; Rent in Porur</a>
            <a href="/data/chennai-rent-report-2026/" style="text-decoration: none; color: #0056B3; font-weight: 600;">&rarr; 2026 Rent Report</a>
          </div>
        </div>
        <a href="/" style="background: #111827; color: #fff; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700;">
          Back to Chennai Rents Home
        </a>
      </main>
    `;

    const full404 = createFullPage({
      title,
      description,
      canonicalUrl,
      robots: 'noindex, follow',
      bodyHtml
    });

    fs.writeFileSync(path.join(DIST_DIR, '404.html'), full404, 'utf8');
    renderedCount++;
  }

  console.log(`✅ Pre-rendering Complete: Successfully generated ${renderedCount} static HTML pages in /dist`);
}

prerender();
