import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { LOCALITIES } from './src/data/localities.js';
import { POSTS } from './src/data/posts.js';
import { RENT_DATA } from './src/data/rentData.js';

const DOMAIN = 'https://chennairents.in';

// Programmatic intent facets supported for each locality
const LOCALITY_FACETS = [
  'bachelors',
  'families',
  'co-living-pg',
  '1-bhk-for-rent',
  '2-bhk-for-rent',
  '3-bhk-for-rent',
  'fully-furnished-flats-for-rent',
  'flats-for-rent-under-20000',
];

/**
 * Builds an XML urlset block without deprecated priority/changefreq tags
 */
function buildUrlsetXml(entries) {
  const urlEntries = entries
    .map(
      ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

/**
 * Builds a master XML sitemapindex block
 */
function buildSitemapIndexXml(sitemaps, lastmod) {
  const sitemapEntries = sitemaps
    .map(
      (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>
`;
}

function generateSitemaps() {
  const defaultDate = '2026-10-01';
  const publicDir = path.resolve(__dirname, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Core pages, city hubs & static listings apps (All canonical with trailing slash)
  const pageEntries = [
    { loc: `${DOMAIN}/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/about/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/chennai/rentals/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/chennai/1-bhk-for-rent/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/chennai/2-bhk-for-rent/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/chennai/3-bhk-for-rent/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/chennai/pg/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/data/chennai-rent-report-2026/`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/listings/index.html`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/listings/listings.html`, lastmod: '2026-10-01' },
    { loc: `${DOMAIN}/listings/list-property.html`, lastmod: '2026-10-01' },
  ];

  // 2. Locality hub pages (/chennai/:locality/) with actual data updated dates
  const localityEntries = LOCALITIES.map((loc) => {
    const data = RENT_DATA[loc.slug];
    const lastmod = data?.updated || defaultDate;
    return {
      loc: `${DOMAIN}/chennai/${loc.slug}/`,
      lastmod,
    };
  });

  // 3. Programmatic facet / intent pages (/chennai/:locality/:facet/)
  const facetEntries = [];
  LOCALITIES.forEach((loc) => {
    const data = RENT_DATA[loc.slug];
    const lastmod = data?.updated || defaultDate;
    LOCALITY_FACETS.forEach((facet) => {
      facetEntries.push({
        loc: `${DOMAIN}/chennai/${loc.slug}/${facet}/`,
        lastmod,
      });
    });
  });

  // 4. Authentic editorial guide posts (/guide/:slug/ and dedicated guides)
  const guideEntries = [
    { loc: `${DOMAIN}/guides/pg-vs-co-living-vs-1bhk-chennai/`, lastmod: '2026-10-01' },
    ...POSTS.filter((post) => post.type === 'guide').map((post) => ({
      loc: `${DOMAIN}/guide/${post.slug}/`,
      lastmod: '2026-10-01',
    }))
  ];

  // Write individual child sitemaps
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-pages.xml'),
    buildUrlsetXml(pageEntries),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-localities.xml'),
    buildUrlsetXml(localityEntries),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-facets.xml'),
    buildUrlsetXml(facetEntries),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-guides.xml'),
    buildUrlsetXml(guideEntries),
    'utf8'
  );

  // 5. Write Master Sitemap Index (sitemap-index.xml)
  const childSitemaps = [
    `${DOMAIN}/sitemap-pages.xml`,
    `${DOMAIN}/sitemap-localities.xml`,
    `${DOMAIN}/sitemap-facets.xml`,
    `${DOMAIN}/sitemap-guides.xml`,
  ];
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-index.xml'),
    buildSitemapIndexXml(childSitemaps, defaultDate),
    'utf8'
  );

  // 6. Write Full Aggregate Sitemap (sitemap.xml) for 100% Google Search Console compatibility
  const allEntries = [...pageEntries, ...localityEntries, ...facetEntries, ...guideEntries];
  fs.writeFileSync(
    path.join(publicDir, 'sitemap.xml'),
    buildUrlsetXml(allEntries),
    'utf8'
  );

  console.log('----------------------------------------------------');
  console.log('🚀 SEO Sitemap Generation Complete (100% Trailing Slash & Canonical):');
  console.log(`  - sitemap-pages.xml      : ${pageEntries.length} URLs`);
  console.log(`  - sitemap-localities.xml : ${localityEntries.length} URLs`);
  console.log(`  - sitemap-facets.xml     : ${facetEntries.length} URLs`);
  console.log(`  - sitemap-guides.xml     : ${guideEntries.length} URLs`);
  console.log(`  - sitemap-index.xml      : ${childSitemaps.length} Sitemaps referenced`);
  console.log(`  - sitemap.xml (master)   : ${allEntries.length} Total URLs`);
  console.log('----------------------------------------------------');
}

generateSitemaps();
