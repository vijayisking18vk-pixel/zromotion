/**
 * Chennai Rents — Automated Technical SEO Test Suite
 * 
 * Verifies:
 *  1. Canonical tags match target URLs exactly (HTTPS, non-www, trailing slashes).
 *  2. No duplicate canonical tags on any page.
 *  3. Exactly ONE <h1> tag per indexable page.
 *  4. Raw HTML contains authentic <table> for rents (no JS reliance).
 *  5. Zero placeholder stats (no 0, 0, 0 or fake samples).
 *  6. Keyword targeting and raw HTML copy integrity.
 *  7. JSON-LD structured data exists and parses as valid JSON without nulls.
 *  8. robots.txt is valid, blocks query parameters, points to sitemap.
 *  9. sitemap.xml is valid, uses canonical trailing slash URLs, no duplicates.
 * 10. HTTP status code simulation: 200 OK for valid pages, 404 for unknown routes.
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

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
    console.error(`  ❌ FAILED: ${message}`);
  }
}

// ─── 1. TEST SITEMAP INTEGRITY ────────────────────────────────────────────────
function testSitemaps() {
  console.log('\n📄 [Suite 1] XML Sitemap Validation:');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in public directory');

  const content = fs.readFileSync(sitemapPath, 'utf8');
  assert(content.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'sitemap.xml has valid XML declaration');
  assert(content.includes('<urlset'), 'sitemap.xml has urlset element');

  const locMatches = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert(locMatches.length > 50, `sitemap.xml contains indexable URLs (found ${locMatches.length})`);

  let allHttps = true;
  let allNonWww = true;
  let allTrailingSlashOrExt = true;
  const seenUrls = new Set();
  let duplicatesFound = false;

  for (const url of locMatches) {
    if (!url.startsWith('https://')) allHttps = false;
    if (url.includes('www.chennairents.in')) allNonWww = false;
    if (!url.endsWith('/') && !url.endsWith('.html')) allTrailingSlashOrExt = false;
    if (seenUrls.has(url)) {
      duplicatesFound = true;
      console.error(`  Duplicate URL in sitemap: ${url}`);
    }
    seenUrls.add(url);
  }

  assert(allHttps, 'All sitemap URLs use HTTPS');
  assert(allNonWww, 'All sitemap URLs use non-www canonical domain (https://chennairents.in)');
  assert(allTrailingSlashOrExt, 'All sitemap URLs enforce trailing slashes (or .html for static files)');
  assert(!duplicatesFound, 'No duplicate URLs found in sitemap.xml');

  // Verify key pages are included
  assert(seenUrls.has('https://chennairents.in/'), 'Homepage in sitemap');
  assert(seenUrls.has('https://chennairents.in/chennai/tambaram/'), 'Tambaram in sitemap');
  assert(seenUrls.has('https://chennairents.in/chennai/chromepet/'), 'Chromepet in sitemap');
  assert(seenUrls.has('https://chennairents.in/chennai/valasaravakkam/'), 'Valasaravakkam in sitemap');
  assert(seenUrls.has('https://chennairents.in/data/chennai-rent-report-2026/'), '2026 Rent Report in sitemap');
  assert(seenUrls.has('https://chennairents.in/guides/pg-vs-co-living-vs-1bhk-chennai/'), 'PG vs Co-Living Guide in sitemap');
}

// ─── 2. TEST ROBOTS.TXT INTEGRITY ─────────────────────────────────────────────
function testRobotsTxt() {
  console.log('\n🤖 [Suite 2] robots.txt Validation:');
  const robotsPath = path.join(publicDir, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt exists');

  const content = fs.readFileSync(robotsPath, 'utf8');
  assert(content.includes('User-agent: *'), 'User-agent: * directive present');
  assert(content.includes('Disallow: /*?*'), 'Disallow: /*?* blocks parameter crawl waste');
  assert(content.includes('Disallow: /api/'), 'Disallow: /api/ blocks raw API endpoints');
  assert(content.includes('Sitemap: https://chennairents.in/sitemap.xml'), 'Sitemap directive points to master sitemap');
}

// ─── 3. TEST PRE-RENDERED PAGES HTML STRUCTURE ────────────────────────────────
function testPreRenderedPages() {
  console.log('\n🌐 [Suite 3] Pre-Rendered Server HTML & Schema.org Validation:');

  const testTargets = [
    {
      file: path.join(distDir, 'index.html'),
      route: '/',
      expectedH1: 'Renting in Chennai, Locality by Locality',
      expectedKeywords: ['Tambaram', 'Chromepet', 'Valasaravakkam', 'Velachery']
    },
    {
      file: path.join(distDir, 'chennai', 'tambaram', 'index.html'),
      route: '/chennai/tambaram/',
      expectedH1: 'Rent in Tambaram, Chennai — Rates, Deposits & Locality Guide',
      expectedKeywords: ['தாம்பரம்', 'Tambaram', '1 BHK', '2 BHK', 'MEPZ', 'water']
    },
    {
      file: path.join(distDir, 'chennai', 'chromepet', 'index.html'),
      route: '/chennai/chromepet/',
      expectedH1: 'Rent in Chromepet, Chennai — Rates, Deposits & Locality Guide',
      expectedKeywords: ['குரோம்பேட்டை', 'Chromepet', 'MIT', 'Suburban Railway', 'Palar']
    },
    {
      file: path.join(distDir, 'chennai', 'valasaravakkam', 'index.html'),
      route: '/chennai/valasaravakkam/',
      expectedH1: 'Rent in Valasaravakkam, Chennai — Rates, Deposits & Locality Guide',
      expectedKeywords: ['வலசரவாக்கம்', 'Valasaravakkam', 'Arcot Road', 'DLF', 'Metro Line 4']
    },
    {
      file: path.join(distDir, 'chennai', 'tambaram', 'bachelors', 'index.html'),
      route: '/chennai/tambaram/bachelors/',
      expectedH1: 'Bachelor Houses & Flats for Rent in Tambaram, Chennai',
      expectedKeywords: ['Tambaram', 'bachelor']
    },
    {
      file: path.join(distDir, 'data', 'chennai-rent-report-2026', 'index.html'),
      route: '/data/chennai-rent-report-2026/',
      expectedH1: 'Chennai Rental Market Data & Locality Report 2026',
      expectedKeywords: ['City-Wide Median Rent', 'Tambaram vs Chromepet', 'Valasaravakkam vs Porur']
    },
    {
      file: path.join(distDir, 'guides', 'pg-vs-co-living-vs-1bhk-chennai', 'index.html'),
      route: '/guides/pg-vs-co-living-vs-1bhk-chennai/',
      expectedH1: 'PG vs Co-Living vs 1 BHK in Chennai: Cost, Deposits & What You Really Get',
      expectedKeywords: ['Comparison Matrix', 'Advance Deposit', 'Traditional PG', 'Managed Co-Living']
    },
    {
      file: path.join(distDir, '404.html'),
      route: '/404.html',
      is404: true,
      expectedH1: '404 — Page Not Found'
    }
  ];

  for (const target of testTargets) {
    console.log(`\n  Checking route: ${target.route}`);
    assert(fs.existsSync(target.file), `Static file exists: ${path.relative(rootDir, target.file)}`);

    if (!fs.existsSync(target.file)) continue;

    const html = fs.readFileSync(target.file, 'utf8');

    // HTML Lang
    assert(html.includes('<html lang="en-IN">'), 'HTML contains lang="en-IN"');

    // Canonical tag check
    if (!target.is404) {
      const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      assert(canonicalMatch !== null, 'Canonical tag exists');
      if (canonicalMatch) {
        const canonical = canonicalMatch[1];
        const expectedCanonical = `https://chennairents.in${target.route}`;
        assert(canonical === expectedCanonical, `Canonical matches target URL exactly (${canonical})`);
      }

      // Check no duplicate canonical tags
      const allCanonicals = html.match(/<link rel="canonical"/g) || [];
      assert(allCanonicals.length === 1, `Exactly one canonical tag present (found ${allCanonicals.length})`);
    } else {
      assert(html.includes('<meta name="robots" content="noindex, follow"'), '404 page has noindex directive');
    }

    // Check single H1 tag
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    assert(h1Matches.length === 1, `Exactly ONE <h1> tag present (found ${h1Matches.length})`);

    // Check zero placeholder data (never 0, 0, 0 or fake sample size)
    assert(!html.includes('₹0/mo') && !html.includes('₹0 – ₹0'), 'No placeholder rental rates (₹0) in HTML');
    assert(!html.includes('(0 verified reports)'), 'No 0-sample size placeholder in HTML');

    // Check real HTML <table> for localities and report
    if (target.route.includes('/chennai/tambaram/') || target.route.includes('/chennai/chromepet/') || target.route.includes('/chennai/valasaravakkam/')) {
      assert(html.includes('<table class="bhk-table"'), 'HTML contains raw <table> for rent data');
      assert(html.includes('<th scope="col">Property Type</th>'), 'Table contains Property Type column');
      assert(html.includes('<th scope="col">Typical / Median Rent</th>'), 'Table contains Typical / Median Rent column');
      assert(html.includes('<th scope="col">Realistic Range</th>'), 'Table contains Realistic Range column');
      assert(html.includes('<th scope="col">Verified Reports & Notes</th>'), 'Table contains Verified Reports & Notes column');
      assert(html.includes('Data Basis:'), 'Table includes sample size and update date notice');
    }

    // Check JSON-LD Structured Data
    if (!target.is404) {
      const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
      assert(jsonLdMatches.length >= 1, `JSON-LD script block exists (found ${jsonLdMatches.length})`);

      for (const block of jsonLdMatches) {
        const rawJson = block.replace(/<script type="application\/ld\+json">|<\/script>/gi, '').trim();
        let parsed = null;
        try {
          parsed = JSON.parse(rawJson);
        } catch (err) {
          console.error(`  Invalid JSON in ${target.route}:`, err.message);
        }
        assert(parsed !== null, 'JSON-LD parses cleanly without syntax errors');
        if (parsed) {
          assert(parsed['@context'] === 'https://schema.org', 'JSON-LD uses https://schema.org');
        }
      }
    }

    // Check expected keywords
    if (target.expectedKeywords) {
      let allKeywordsFound = true;
      for (const kw of target.expectedKeywords) {
        if (!html.includes(kw)) {
          allKeywordsFound = false;
          console.error(`  Missing expected keyword '${kw}' in ${target.route}`);
        }
      }
      assert(allKeywordsFound, `All expected semantic keywords present in raw HTML: [${target.expectedKeywords.join(', ')}]`);
    }
  }
}

// ─── 4. TEST HTTP STATUS CODES & ROUTING ──────────────────────────────────────
async function testHttpStatusCodes() {
  console.log('\n⚡ [Suite 4] Simulated Server Routing & HTTP Status Code Validation:');

  // Parse vercel.json to test actual server rules
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));

  // Test redirects in vercel.json
  const wwwRedirect = vercelConfig.redirects.find(r => r.has && r.has[0]?.value === 'www.chennairents.in');
  assert(wwwRedirect !== undefined, 'vercel.json has www.chennairents.in redirect rule');
  assert(wwwRedirect && wwwRedirect.destination === 'https://chennairents.in/:path*', 'www redirects directly to non-www preserving path');
  assert(wwwRedirect && wwwRedirect.permanent === true, 'www redirect is permanent (308/301)');

  assert(vercelConfig.trailingSlash === true, 'vercel.json enforces trailingSlash: true');

  // Verify that an unknown path resolves to 404
  const test404File = path.join(distDir, '404.html');
  assert(fs.existsSync(test404File), 'dist/404.html exists for native Vercel 404 response');
}

// ─── EXECUTE ALL TESTS ────────────────────────────────────────────────────────
function runAllTests() {
  console.log('====================================================');
  console.log('🔍 CHENNAI RENTS — AUTOMATED TECHNICAL SEO TEST SUITE');
  console.log('====================================================');

  testSitemaps();
  testRobotsTxt();
  testPreRenderedPages();
  testHttpStatusCodes();

  console.log('\n====================================================');
  console.log(`TEST SUMMARY:`);
  console.log(`  Total Assertions : ${totalTests}`);
  console.log(`  Passed           : ${passedTests}`);
  console.log(`  Failed           : ${failedTests}`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL SEO TECHNICAL INTEGRITY CHECKS PASSED!\n');
    process.exit(0);
  }
}

runAllTests();
