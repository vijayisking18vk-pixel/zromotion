import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const inventoryPath = path.join(ROOT_DIR, 'seo-url-inventory.csv');
const vercelPath = path.join(ROOT_DIR, 'vercel.json');
const outputPath = path.join(ROOT_DIR, 'redirect-and-indexation-plan.csv');

const DOMAIN = 'https://www.chennairents.in';

const inventoryCsv = fs.readFileSync(inventoryPath, 'utf8');
const invLines = inventoryCsv.split('\n').filter(Boolean);
const invHeaders = invLines[0].split(',');

const urlIdx = invHeaders.indexOf('url');
const templateIdx = invHeaders.indexOf('template');
const canonicalIdx = invHeaders.indexOf('canonical');
const sitemapIdx = invHeaders.indexOf('sitemap_file');

const planRows = [];
const planHeaders = [
  'url',
  'current_status',
  'target_status',
  'canonical_target',
  'sitemap_inclusion',
  'indexation_directive',
  'notes'
];
planRows.push(planHeaders.join(','));

// 1. Live Canonical URLs (367 records)
for (let i = 1; i < invLines.length; i++) {
  const line = invLines[i];
  if (!line.trim()) continue;
  
  // Quick parse respecting quotes
  const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
  // Simpler: split on comma while respecting quotes
  let cols = [];
  let inQuotes = false;
  let curr = '';
  for (let c = 0; c < line.length; c++) {
    const char = line[c];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cols.push(curr.trim());
      curr = '';
      continue;
    }
    curr += char;
  }
  cols.push(curr.trim());

  const u = cols[urlIdx]?.replace(/^"|"$/g, '');
  const t = cols[templateIdx]?.replace(/^"|"$/g, '');
  const c = cols[canonicalIdx]?.replace(/^"|"$/g, '');
  const s = cols[sitemapIdx]?.replace(/^"|"$/g, '');

  let note = '';
  if (t === 'homepage') note = 'Core homepage portal with WebSite and RealEstateAgent structured schema';
  else if (t === 'city hub') note = 'City-wide rental hub with verified price ranges and locality links';
  else if (t === 'locality hub') note = 'Primary neighborhood hub with street insights and flood resilience data';
  else if (t === 'locality/intent facet') note = 'Specific BHK, budget, or tenant facet targeting high-intent long-tail searches';
  else if (t === 'guide') note = 'Comprehensive editorial renting guide with FAQ and HowTo schema';
  else if (t === 'story') note = 'Data-backed urban rental market research story';
  else if (t === 'listings') note = 'Interactive crowdsourced rental price map with live locality pins';
  else if (t === 'trust/legal') note = 'E-E-A-T transparency, editorial methodology, corrections, and regulatory compliance';
  else note = 'Indexable resource';

  const row = [
    `"${u}"`,
    '200',
    '200',
    `"${c}"`,
    `"${s}"`,
    '"index, follow"',
    `"${note}"`
  ];
  planRows.push(row.join(','));
}

// 2. Legacy and Clean-URL Redirects from vercel.json
const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const redirects = vercelConfig.redirects || [];

for (const red of redirects) {
  let sourceUrl = red.source.startsWith('http') ? red.source : `${DOMAIN}${red.source}`;
  let destUrl = red.destination.startsWith('http') ? red.destination : `${DOMAIN}${red.destination}`;

  // Describe the redirect reason cleanly
  let note = 'Permanent 301 redirect enforcing clean canonical architecture';
  if (red.source.endsWith('.html')) note = 'Legacy .html extension permanently redirected to clean URL route';
  else if (red.source.includes('author/')) note = 'Author profile canonicalized to consolidated team page';
  else if (red.source.includes('rent-in-')) note = 'Legacy slug syntax migrated to standard /chennai/:locality hierarchy';
  else if (red.source.startsWith('/flats-for-rent-in-')) note = 'Root-level locality search term redirected to structured locality hub';
  else if (red.source.startsWith('/guide/')) note = 'Singular /guide/ prefix consolidated into plural /guides/ directory';

  const row = [
    `"${sourceUrl}"`,
    '301',
    '301',
    `"${destUrl}"`,
    '"none (excluded)"',
    '"noindex, follow"',
    `"${note}"`
  ];
  planRows.push(row.join(','));
}

fs.writeFileSync(outputPath, planRows.join('\n'), 'utf8');
console.log(`Generated redirect-and-indexation-plan.csv with ${planRows.length - 1} records (${invLines.length - 1} live + ${redirects.length} redirects).`);
