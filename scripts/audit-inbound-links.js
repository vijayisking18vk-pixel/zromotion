import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

// Read sitemap.xml to get all 367 URLs
const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
const sitemapUrls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`Total URLs in sitemap.xml: ${sitemapUrls.length}`);

// Normalize URL helper
function normalizeUrl(url) {
  if (!url) return '';
  let u = url.trim();
  if (u.startsWith('http://www.chennairents.in')) {
    u = u.replace('http://', 'https://');
  }
  if (u.startsWith('https://chennairents.in')) {
    u = u.replace('https://chennairents.in', 'https://www.chennairents.in');
  }
  if (u.startsWith('/')) {
    u = 'https://www.chennairents.in' + u;
  }
  // Strip trailing slash except for root domain
  if (u !== 'https://www.chennairents.in/' && u.endsWith('/')) {
    u = u.slice(0, -1);
  }
  return u;
}

// Normalized sitemap URLs map
const sitemapNormMap = new Map();
sitemapUrls.forEach(raw => {
  const norm = normalizeUrl(raw);
  sitemapNormMap.set(norm, raw);
});

// Scan all pre-rendered HTML files in dist
const inboundLinks = new Map();
sitemapNormMap.forEach((raw, norm) => {
  inboundLinks.set(norm, new Set());
});

function scanHtmlFiles(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanHtmlFiles(full);
    } else if (entry.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      
      // Determine source URL of this HTML file
      let rel = path.relative(DIST_DIR, full).replace(/\\/g, '/');
      let sourceUrl = 'https://www.chennairents.in/';
      if (rel !== 'index.html' && rel !== '404.html') {
        let route = rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
        sourceUrl = `https://www.chennairents.in/${route}`;
      }
      const sourceNorm = normalizeUrl(sourceUrl);

      // Find all hrefs
      const hrefMatches = [...html.matchAll(/href=["']([^"']+)["']/g)];
      for (const m of hrefMatches) {
        const href = m[1];
        if (
          href.startsWith('/') ||
          href.startsWith('https://www.chennairents.in') ||
          href.startsWith('https://chennairents.in')
        ) {
          if (
            !href.startsWith('/assets') &&
            !href.startsWith('/images') &&
            !href.includes('.xml') &&
            !href.includes('.png') &&
            !href.includes('.jpg') &&
            !href.includes('.webp') &&
            !href.includes('.svg') &&
            !href.includes('#')
          ) {
            const targetNorm = normalizeUrl(href);
            if (inboundLinks.has(targetNorm) && targetNorm !== sourceNorm) {
              inboundLinks.get(targetNorm).add(sourceNorm);
            }
          }
        }
      }
    }
  }
}

scanHtmlFiles(DIST_DIR);

console.log('--- INBOUND LINK AUDIT RESULTS ---');
const zeroInbound = [];
const lowInbound = [];

inboundLinks.forEach((sources, target) => {
  if (sources.size === 0) {
    zeroInbound.push(target);
  } else if (sources.size < 3) {
    lowInbound.push({ target, count: sources.size });
  }
});

console.log(`Pages with 0 inbound internal links: ${zeroInbound.length}`);
zeroInbound.forEach(u => console.log('  [0 links] ' + u));

console.log(`\nPages with 1-2 inbound links: ${lowInbound.length}`);
lowInbound.slice(0, 10).forEach(item => console.log(`  [${item.count} links] ${item.target}`));
