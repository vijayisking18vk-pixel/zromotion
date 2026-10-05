/**
 * Chennai Rents — Automated Technical SEO Test Suite
 *
 * Verifies:
 * 1. Pre-rendered HTML exists for all critical pages
 * 2. Exact metadata presence (<title>, <meta description>, canonical, robots)
 * 3. Exact JSON-LD structured data presence & valid JSON syntax
 * 4. Full pre-rendered DOM tree inside <div id="root"> (no empty shells!)
 * 5. Sitemaps & robots.txt integrity
 * 6. Vercel 301 permanent redirect rules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
import { VELACHERY_PAGES } from '../src/data/velacheryLandingPages.js';
import { VALASARAVAKKAM_PAGES } from '../src/data/valasaravakkamLandingPages.js';
import { ADYAR_PAGES } from '../src/data/adyarLandingPages.js';
import { SHOLINGANALLUR_PAGES } from '../src/data/sholinganallurLandingPages.js';
import { PORUR_PAGES } from '../src/data/porurLandingPages.js';
import { ANNA_NAGAR_PAGES } from '../src/data/annaNagarLandingPages.js';
import { T_NAGAR_PAGES } from '../src/data/tNagarLandingPages.js';
import { NUNGAMBAKKAM_PAGES } from '../src/data/nungambakkamLandingPages.js';
import { MEDAVAKKAM_PAGES } from '../src/data/medavakkamLandingPages.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function runTests() {
  console.log('====================================================');
  console.log('🧪 Running Chennai Rents SEO Test Suite');
  console.log('====================================================\n');

  // Test 1: Check dist directory
  console.log('📁 Test Group 1: Pre-rendered Build Artifacts');
  assert(fs.existsSync(DIST_DIR), 'dist directory exists');

  const testPages = [
    { name: 'Homepage', file: path.join(DIST_DIR, 'index.html'), expectedTitle: 'Chennai Rents', expectedCanonical: 'https://www.chennairents.in/' },
    { name: 'About Page', file: path.join(DIST_DIR, 'about', 'index.html'), expectedTitle: 'About Chennai Rents', expectedCanonical: 'https://www.chennairents.in/about' },
    { name: 'Methodology Page', file: path.join(DIST_DIR, 'methodology', 'index.html'), expectedTitle: 'Research Methodology', expectedCanonical: 'https://www.chennairents.in/methodology' },
    { name: 'Verification Policy', file: path.join(DIST_DIR, 'verification', 'index.html'), expectedTitle: 'Listing Verification', expectedCanonical: 'https://www.chennairents.in/verification' },
    { name: 'Corrections Policy', file: path.join(DIST_DIR, 'corrections', 'index.html'), expectedTitle: 'Editorial Corrections', expectedCanonical: 'https://www.chennairents.in/corrections' },
    { name: 'Contact Page', file: path.join(DIST_DIR, 'contact', 'index.html'), expectedTitle: 'Contact Editorial', expectedCanonical: 'https://www.chennairents.in/contact' },
    { name: 'Privacy Policy', file: path.join(DIST_DIR, 'privacy', 'index.html'), expectedTitle: 'Privacy Policy', expectedCanonical: 'https://www.chennairents.in/privacy' },
    { name: 'Data Deletion Request', file: path.join(DIST_DIR, 'data-deletion', 'index.html'), expectedTitle: 'Data Deletion', expectedCanonical: 'https://www.chennairents.in/data-deletion' },
    { name: 'Houses for Rent Pillar Hub', file: path.join(DIST_DIR, 'house-for-rent-in-chennai', 'index.html'), expectedTitle: 'Houses for Rent in Chennai', expectedCanonical: 'https://www.chennairents.in/house-for-rent-in-chennai', expectedBacklink: 'https://www.vijayrajkumar.in' },
    { name: 'House Rent in Chennai Page', file: path.join(DIST_DIR, 'house-rent-in-chennai', 'index.html'), expectedTitle: 'House Rent in Chennai', expectedCanonical: 'https://www.chennairents.in/house-rent-in-chennai', expectedBacklink: 'https://www.vijayrajkumar.in' },
    { name: 'Author Page (R Vijayrajkumar)', file: path.join(DIST_DIR, 'author', 'vijayrajkumar', 'index.html'), expectedTitle: 'R Vijayrajkumar', expectedCanonical: 'https://www.chennairents.in/author/vijayrajkumar', expectedBacklink: 'https://www.vijayrajkumar.in' },
    { name: '1 BHK Houses Guide', file: path.join(DIST_DIR, '1-bhk-house-for-rent-in-chennai', 'index.html'), expectedTitle: '1 BHK Houses for Rent in Chennai', expectedCanonical: 'https://www.chennairents.in/1-bhk-house-for-rent-in-chennai' },
    { name: '3 BHK Houses Guide', file: path.join(DIST_DIR, '3-bhk-house-for-rent-in-chennai', 'index.html'), expectedTitle: '3 BHK Houses for Rent in Chennai', expectedCanonical: 'https://www.chennairents.in/3-bhk-house-for-rent-in-chennai' },
    { name: 'Chennai Hub', file: path.join(DIST_DIR, 'chennai', 'rentals', 'index.html'), expectedTitle: 'Flats & Houses for Rent in Chennai', expectedCanonical: 'https://www.chennairents.in/chennai/rentals' },
    { name: 'Adyar Locality (/chennai/adyar)', file: path.join(DIST_DIR, 'chennai', 'adyar', 'index.html'), expectedTitle: 'Adyar', expectedCanonical: 'https://www.chennairents.in/chennai/adyar', expectedBacklink: 'https://www.vijayrajkumar.in' },
    { name: 'Velachery Locality (/chennai/velachery)', file: path.join(DIST_DIR, 'chennai', 'velachery', 'index.html'), expectedTitle: 'Velachery', expectedCanonical: 'https://www.chennairents.in/chennai/velachery' },
    { name: 'Anna Nagar Locality (/chennai/anna-nagar)', file: path.join(DIST_DIR, 'chennai', 'anna-nagar', 'index.html'), expectedTitle: 'Anna Nagar', expectedCanonical: 'https://www.chennairents.in/chennai/anna-nagar' },
    { name: 'OMR Locality (/chennai/omr)', file: path.join(DIST_DIR, 'chennai', 'omr', 'index.html'), expectedTitle: 'OMR', expectedCanonical: 'https://www.chennairents.in/chennai/omr' },
    { name: 'Tambaram Locality (/chennai/tambaram)', file: path.join(DIST_DIR, 'chennai', 'tambaram', 'index.html'), expectedTitle: 'Tambaram', expectedCanonical: 'https://www.chennairents.in/chennai/tambaram' },
    { name: 'Velachery 1-BHK', file: path.join(DIST_DIR, 'chennai', 'velachery', '1-bhk-for-rent', 'index.html'), expectedTitle: '1 BHK', expectedCanonical: 'https://www.chennairents.in/chennai/velachery/1-bhk-for-rent' },
    { name: 'Advance Deposit Guide', file: path.join(DIST_DIR, 'guides', 'advance-deposit-chennai', 'index.html'), expectedTitle: 'Advance Deposit', expectedCanonical: 'https://www.chennairents.in/guides/advance-deposit-chennai' },
    { name: 'Rental Advance Checklist Guide', file: path.join(DIST_DIR, 'guides', 'checklist-rental-advance', 'index.html'), expectedTitle: 'Checklist', expectedCanonical: 'https://www.chennairents.in/guides/checklist-rental-advance' },
    { name: 'How to Write Rental Listing Guide', file: path.join(DIST_DIR, 'guides', 'how-to-write-rental-listing', 'index.html'), expectedTitle: 'Rental Listing', expectedCanonical: 'https://www.chennairents.in/guides/how-to-write-rental-listing' },
    { name: 'How to Negotiate Rent Guide', file: path.join(DIST_DIR, 'guides', 'how-to-negotiate-rent', 'index.html'), expectedTitle: 'Negotiate Rent', expectedCanonical: 'https://www.chennairents.in/guides/how-to-negotiate-rent' },
    { name: 'Data Story (Gated vs Standalone)', file: path.join(DIST_DIR, 'stories', 'gated-vs-standalone', 'index.html'), expectedTitle: 'Gated vs Standalone', expectedCanonical: 'https://www.chennairents.in/stories/gated-vs-standalone' },
    { name: '404 Page', file: path.join(DIST_DIR, '404.html'), expectedTitle: '404: Page Not Found', expectedRobots: 'noindex, nofollow' },
  ];

  testPages.forEach((page) => {
    console.log(`\n📄 Verifying Page: ${page.name}`);
    assert(fs.existsSync(page.file), `File exists: ${path.relative(ROOT_DIR, page.file)}`);

    if (fs.existsSync(page.file)) {
      const content = fs.readFileSync(page.file, 'utf8');

      // Title
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      assert(titleMatch && titleMatch[1].length > 0, `<title> tag exists and is non-empty (${titleMatch ? titleMatch[1] : 'NONE'})`);
      if (page.expectedTitle) {
        const decodedTitle = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
        assert(decodedTitle.includes(page.expectedTitle), `Title contains "${page.expectedTitle}"`);
      }

      // Backlink check
      if (page.expectedBacklink) {
        assert(content.includes(page.expectedBacklink), `Page contains verified author backlink to ${page.expectedBacklink}`);
      }

      // Meta Description
      const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/i);
      assert(descMatch && descMatch[1].length > 20, `<meta description> exists and has meaningful length (${descMatch ? descMatch[1].length : 0} chars)`);

      // Canonical
      if (page.expectedCanonical) {
        const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/i);
        assert(canonicalMatch && canonicalMatch[1] === page.expectedCanonical, `Canonical URL is exact: ${page.expectedCanonical}`);
      }

      // Robots
      const robotsMatch = content.match(/<meta\s+name="robots"\s+content="(.*?)"\s*\/?>/i);
      assert(robotsMatch && robotsMatch[1].length > 0, `<meta name="robots"> exists (${robotsMatch ? robotsMatch[1] : 'NONE'})`);
      if (page.expectedRobots) {
        assert(robotsMatch && robotsMatch[1] === page.expectedRobots, `Robots directive is "${page.expectedRobots}"`);
      }

      // Pre-rendered DOM Check
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into <div id="root"> (${rootMatch ? rootMatch[1].length : 0} bytes of pre-rendered HTML)`);
      assert(content.includes('<header') && content.includes('<footer'), 'Semantic <header> and <footer> rendered inside page');

      // Structured Data
      if (page.name !== '404 Page') {
        const schemaMatches = content.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
        assert(schemaMatches && schemaMatches.length > 0, `Schema.org JSON-LD found (${schemaMatches ? schemaMatches.length : 0} block(s))`);
        if (schemaMatches) {
          schemaMatches.forEach((tag, idx) => {
            const rawJson = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
            try {
              JSON.parse(rawJson);
              assert(true, `JSON-LD block ${idx + 1} parses as valid JSON`);
            } catch (jsonErr) {
              assert(false, `JSON-LD block ${idx + 1} failed to parse: ${jsonErr.message}`);
            }
          });
        }
      }
    }
  });

  // Test Group 1b: Velachery 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1b: Velachery Programmatic SEO Cluster (19 Slugs)');
  VELACHERY_PAGES.forEach((vp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'velachery', vp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Velachery [${vp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(vp.canonical), `Canonical URL exact for ${vp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${vp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${vp.slug}`);
    }
  });

  // Test Group 1c: Valasaravakkam 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1c: Valasaravakkam Programmatic SEO Cluster (19 Slugs)');
  VALASARAVAKKAM_PAGES.forEach((vp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'valasaravakkam', vp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Valasaravakkam [${vp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(vp.canonical), `Canonical URL exact for ${vp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${vp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${vp.slug}`);
    }
  });

  // Test Group 1d: Adyar 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1d: Adyar Programmatic SEO Cluster (19 Slugs)');
  ADYAR_PAGES.forEach((ap) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'adyar', ap.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Adyar [${ap.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(ap.canonical), `Canonical URL exact for ${ap.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${ap.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${ap.slug}`);
    }
  });

  // Test Group 1e: Sholinganallur 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1e: Sholinganallur Programmatic SEO Cluster (19 Slugs)');
  SHOLINGANALLUR_PAGES.forEach((sp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'sholinganallur', sp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Sholinganallur [${sp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(sp.canonical), `Canonical URL exact for ${sp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${sp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${sp.slug}`);
    }
  });

  // Test Group 1f: Porur 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1f: Porur Programmatic SEO Cluster (19 Slugs)');
  PORUR_PAGES.forEach((pp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'porur', pp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Porur [${pp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(pp.canonical), `Canonical URL exact for ${pp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${pp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${pp.slug}`);
    }
  });

  // Test Group 1g: Anna Nagar 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1g: Anna Nagar Programmatic SEO Cluster (19 Slugs)');
  ANNA_NAGAR_PAGES.forEach((anp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'anna-nagar', anp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Anna Nagar [${anp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(anp.canonical), `Canonical URL exact for ${anp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${anp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${anp.slug}`);
    }
  });

  // Test Group 1h: T. Nagar 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1h: T. Nagar Programmatic SEO Cluster (19 Slugs)');
  T_NAGAR_PAGES.forEach((tnp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 't-nagar', tnp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `T. Nagar [${tnp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(tnp.canonical), `Canonical URL exact for ${tnp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${tnp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${tnp.slug}`);
    }
  });

  // Test Group 1i: Nungambakkam 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1i: Nungambakkam Programmatic SEO Cluster (19 Slugs)');
  NUNGAMBAKKAM_PAGES.forEach((nbp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'nungambakkam', nbp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Nungambakkam [${nbp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(nbp.canonical), `Canonical URL exact for ${nbp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${nbp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${nbp.slug}`);
    }
  });

  // Test Group 1j: Medavakkam 19 Programmatic Landing Pages
  console.log('\n🏙️ Test Group 1j: Medavakkam Programmatic SEO Cluster (19 Slugs)');
  MEDAVAKKAM_PAGES.forEach((mdp) => {
    const pageFile = path.join(DIST_DIR, 'chennai', 'medavakkam', mdp.slug, 'index.html');
    assert(fs.existsSync(pageFile), `Medavakkam [${mdp.slug}] pre-rendered HTML exists`);
    if (fs.existsSync(pageFile)) {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert(content.includes(mdp.canonical), `Canonical URL exact for ${mdp.slug}`);
      assert(content.includes('RealEstateListing') || content.includes('BreadcrumbList'), `JSON-LD Schema present for ${mdp.slug}`);
      const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
      assert(rootMatch && rootMatch[1].trim().length > 500, `DOM pre-rendered into root for ${mdp.slug}`);
    }
  });

  // Test Group 2: Sitemaps & robots.txt
  console.log('\n🗺️ Test Group 2: Sitemaps and Crawl Control');
  const sitemaps = [
    'sitemap-index.xml',
    'sitemap-pages.xml',
    'sitemap-localities.xml',
    'sitemap-facets.xml',
    'sitemap-guides.xml',
    'sitemap.xml',
  ];

  sitemaps.forEach((sm) => {
    const smPath = path.join(PUBLIC_DIR, sm);
    assert(fs.existsSync(smPath), `${sm} exists in public/`);
    if (fs.existsSync(smPath)) {
      const xml = fs.readFileSync(smPath, 'utf8');
      assert(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'), `${sm} has valid XML declaration`);
      assert(xml.includes('https://www.chennairents.in/'), `${sm} references canonical domain`);
    }
  });

  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt exists');
  if (fs.existsSync(robotsPath)) {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf8');
    assert(robotsTxt.includes('Sitemap: https://www.chennairents.in/sitemap-index.xml'), 'robots.txt points to sitemap index');
    assert(robotsTxt.includes('User-agent: *'), 'robots.txt has wildcard user-agent rule');
  }

  // Test Group 3: Vercel configuration
  console.log('\n⚙️ Test Group 3: Vercel Production Configuration');
  const vercelPath = path.join(ROOT_DIR, 'vercel.json');
  assert(fs.existsSync(vercelPath), 'vercel.json exists');
  if (fs.existsSync(vercelPath)) {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    assert(vercelConfig.cleanUrls === true, 'vercel.json has cleanUrls enabled');
    assert(vercelConfig.trailingSlash === false, 'vercel.json has trailingSlash: false (canonical consistency)');
    assert(Array.isArray(vercelConfig.redirects) && vercelConfig.redirects.length >= 11, `vercel.json defines ${vercelConfig.redirects?.length || 0} permanent 301 redirects`);
    assert(vercelConfig.redirects.every((r) => r.permanent === true), 'All redirects are HTTP 301 permanent');
    assert(Array.isArray(vercelConfig.headers) && vercelConfig.headers.length >= 2, 'vercel.json defines Cache-Control and security headers');
  }

  // Final Summary
  console.log('\n====================================================');
  console.log(`📊 Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  if (failedTests > 0) {
    console.error(`❌ ${failedTests} Tests Failed`);
    process.exit(1);
  } else {
    console.log('🎉 ALL TECHNICAL SEO TESTS PASSED WITH 100% SUCCESS!');
    console.log('====================================================');
  }
}

runTests();
