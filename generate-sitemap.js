import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import locality data, posts, and rental content data
import { LOCALITIES, shouldIndexPage, parseIntent } from './src/data/localities.js';
import { POSTS } from './src/data/posts.js';
import { SUPPORTING_RENTAL_PAGES } from './src/data/rentalGuideData.js';
import { VELACHERY_PAGES } from './src/data/velacheryLandingPages.js';
import { VALASARAVAKKAM_PAGES } from './src/data/valasaravakkamLandingPages.js';
import { ADYAR_PAGES } from './src/data/adyarLandingPages.js';
import { SHOLINGANALLUR_PAGES } from './src/data/sholinganallurLandingPages.js';
import { PORUR_PAGES } from './src/data/porurLandingPages.js';
import { ANNA_NAGAR_PAGES } from './src/data/annaNagarLandingPages.js';
import { T_NAGAR_PAGES } from './src/data/tNagarLandingPages.js';
import { NUNGAMBAKKAM_PAGES } from './src/data/nungambakkamLandingPages.js';
import { MEDAVAKKAM_PAGES } from './src/data/medavakkamLandingPages.js';
import { OMR_PAGES } from './src/data/omrLandingPages.js';
import { PERUNGUDI_PAGES } from './src/data/perungudiLandingPages.js';
import { TAMBARAM_PAGES } from './src/data/tambaramLandingPages.js';

const DOMAIN = 'https://www.chennairents.in';

// Programmatic intent facets supported for each locality
const LOCALITY_FACETS = [
  'flats-for-rent',
  '1-bhk-for-rent',
  '2-bhk-for-rent',
  '3-bhk-for-rent',
  'pg',
  'fully-furnished-flats-for-rent',
  'flats-for-rent-under-20000',
];

/**
 * Formats date into ISO 8601 YYYY-MM-DD format (Google Search recommended)
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Builds an XML urlset block without deprecated priority/changefreq tags
 */
function buildUrlsetXml(urls, lastmod) {
  if (!urls.length) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Dynamic facets are added as listings meet index threshold: https://www.chennairents.in/ -->
</urlset>
`;
  }
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
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
  const lastmod = getTodayDate();
  const publicDir = path.resolve(__dirname, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Core pages, city hubs & listings map application
  const pageUrls = [
    `${DOMAIN}/`,
    `${DOMAIN}/about`,
    `${DOMAIN}/methodology`,
    `${DOMAIN}/verification`,
    `${DOMAIN}/corrections`,
    `${DOMAIN}/contact`,
    `${DOMAIN}/privacy`,
    `${DOMAIN}/data-deletion`,
    `${DOMAIN}/listings`,
    `${DOMAIN}/chennai/rentals`,
    `${DOMAIN}/chennai/1-bhk-for-rent`,
    `${DOMAIN}/chennai/2-bhk-for-rent`,
    `${DOMAIN}/chennai/3-bhk-for-rent`,
    `${DOMAIN}/chennai/pg`,
    `${DOMAIN}/house-for-rent-in-chennai`,
    `${DOMAIN}/author/vijayrajkumar`,
    ...SUPPORTING_RENTAL_PAGES.map((p) => `${DOMAIN}/${p.slug}`),
  ];

  // 2. Locality hub pages (Canonical URL: /chennai/:locality)
  const localityUrls = [];
  LOCALITIES.forEach((loc) => {
    localityUrls.push(`${DOMAIN}/chennai/${loc.slug}`);
  });

  // 3. Programmatic facet pages (/chennai/:locality/:facet) - ONLY indexable URLs (>= threshold)
  const facetUrls = [];
  LOCALITIES.forEach((loc) => {
    LOCALITY_FACETS.forEach((facet) => {
      const parsed = parseIntent(facet);
      const pageType = parsed.key || 'locality';
      const count = loc.listingCount?.[pageType] ?? loc.listingCount?.total ?? 0;
      if (shouldIndexPage(pageType, count)) {
        facetUrls.push(`${DOMAIN}/chennai/${loc.slug}/${facet}`);
      }
    });
  });

  // 3b. Velachery Programmatic SEO Landing Pages (19 long-form micro-markets)
  VELACHERY_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3c. Valasaravakkam Programmatic SEO Landing Pages (19 long-form micro-markets)
  VALASARAVAKKAM_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3d. Adyar Programmatic SEO Landing Pages (19 long-form micro-markets)
  ADYAR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3e. Sholinganallur Programmatic SEO Landing Pages (19 long-form micro-markets)
  SHOLINGANALLUR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3f. Porur Programmatic SEO Landing Pages (19 long-form micro-markets)
  PORUR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3g. Anna Nagar Programmatic SEO Landing Pages (19 long-form micro-markets)
  ANNA_NAGAR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3h. T. Nagar Programmatic SEO Landing Pages (19 long-form micro-markets)
  T_NAGAR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3i. Nungambakkam Programmatic SEO Landing Pages (19 long-form micro-markets)
  NUNGAMBAKKAM_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3j. Medavakkam Programmatic SEO Landing Pages (19 long-form micro-markets)
  MEDAVAKKAM_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3k. OMR Programmatic SEO Landing Pages (19 long-form micro-markets)
  OMR_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3l. Perungudi Programmatic SEO Landing Pages (19 long-form micro-markets)
  PERUNGUDI_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 3m. Tambaram Programmatic SEO Landing Pages (19 long-form micro-markets)
  TAMBARAM_PAGES.forEach((page) => {
    facetUrls.push(page.canonical);
  });

  // 4. Authentic editorial guide posts (/guides/:slug) and data stories (/stories/:slug)
  const guideUrls = [
    ...POSTS.filter((post) => post.type === 'guide').map(
      (post) => `${DOMAIN}/guides/${post.slug}`
    ),
    ...POSTS.filter((post) => post.type === 'story').map(
      (post) => `${DOMAIN}/stories/${post.slug}`
    ),
  ];

  // Write individual child sitemaps
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-pages.xml'),
    buildUrlsetXml(pageUrls, lastmod),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-localities.xml'),
    buildUrlsetXml(localityUrls, lastmod),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-facets.xml'),
    buildUrlsetXml(facetUrls, lastmod),
    'utf8'
  );
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-guides.xml'),
    buildUrlsetXml(guideUrls, lastmod),
    'utf8'
  );

  // 5. Write Master Sitemap Index (sitemap-index.xml)
  const childSitemaps = [
    `${DOMAIN}/sitemap-pages.xml`,
    `${DOMAIN}/sitemap-localities.xml`,
    ...(facetUrls.length > 0 ? [`${DOMAIN}/sitemap-facets.xml`] : []),
    `${DOMAIN}/sitemap-guides.xml`,
  ];
  fs.writeFileSync(
    path.join(publicDir, 'sitemap-index.xml'),
    buildSitemapIndexXml(childSitemaps, lastmod),
    'utf8'
  );

  // 6. Write Full Aggregate Sitemap (sitemap.xml) with ONLY 100% indexable URLs
  const allUrls = [...pageUrls, ...localityUrls, ...facetUrls, ...guideUrls];
  fs.writeFileSync(
    path.join(publicDir, 'sitemap.xml'),
    buildUrlsetXml(allUrls, lastmod),
    'utf8'
  );

  console.log('----------------------------------------------------');
  console.log('🚀 SEO Sitemap Generation Complete:');
  console.log(`  - sitemap-pages.xml      : ${pageUrls.length} URLs`);
  console.log(`  - sitemap-localities.xml : ${localityUrls.length} URLs`);
  console.log(`  - sitemap-facets.xml     : ${facetUrls.length} URLs`);
  console.log(`  - sitemap-guides.xml     : ${guideUrls.length} URLs`);
  console.log(`  - sitemap-index.xml      : ${childSitemaps.length} Sitemaps referenced`);
  console.log(`  - sitemap.xml (fallback) : ${allUrls.length} Total URLs`);
  console.log('----------------------------------------------------');
}

generateSitemaps();
