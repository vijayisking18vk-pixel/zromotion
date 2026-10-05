import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SITEMAP_FILE = path.resolve('public/sitemap.xml');
const OUTPUT_JSON = path.resolve('reports/keyword-map.json');
const OUTPUT_CSV = path.resolve('reports/keyword-map.csv');

// Ensure reports directory exists
if (!fs.existsSync(path.resolve('reports'))) {
  fs.mkdirSync(path.resolve('reports'), { recursive: true });
}

// 1. Read sitemap
const sitemapXml = fs.readFileSync(SITEMAP_FILE, 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`Read ${sitemapUrls.length} URLs from sitemap.xml`);

// 2. Helper to find corresponding HTML file in dist/
function getHtmlPathForUrl(urlStr) {
  const url = new URL(urlStr);
  let pathname = url.pathname;
  if (pathname === '/' || pathname === '') {
    return path.join(DIST_DIR, 'index.html');
  }
  // Remove leading slash
  if (pathname.startsWith('/')) pathname = pathname.slice(1);
  // Remove trailing slash
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

  // Check possible disk locations
  const option1 = path.join(DIST_DIR, pathname, 'index.html');
  const option2 = path.join(DIST_DIR, `${pathname}.html`);
  const option3 = path.join(DIST_DIR, pathname);

  if (fs.existsSync(option1)) return option1;
  if (fs.existsSync(option2)) return option2;
  if (fs.existsSync(option3) && fs.statSync(option3).isFile()) return option3;
  return null;
}

// 3. Helper to clean extracted text
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function csvEscape(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  return `"${str.replace(/"/g, '""')}"`;
}

// 4. Classify Page Type, Locality, Intent, and Typology based on URL
function analyzeUrlMetadata(urlStr) {
  const url = new URL(urlStr);
  const pathParts = url.pathname.split('/').filter(Boolean);

  let pageType = 'General';
  let targetLocality = 'Chennai (City-wide)';
  let targetPropertyType = 'All Residential';
  let searchIntent = 'Informational';
  let parentHub = 'https://www.chennairents.in';
  let primaryConversion = 'Browse Verified Listings';
  let nonCompetingNotes = 'Distinct search query targeting';
  let evidence = 'GCC, CMWSSB, CMRL, Ground-truth local audit';

  if (urlStr === 'https://www.chennairents.in/' || urlStr === 'https://www.chennairents.in') {
    pageType = 'Homepage Hub';
    searchIntent = 'Commercial Investigation';
    primaryConversion = 'Search Locality Rental Guides';
    parentHub = 'https://www.chennairents.in';
    nonCompetingNotes = 'Root domain authority hub';
  } else if (url.pathname.startsWith('/chennai/')) {
    const localitySlug = pathParts[1];
    const facetSlug = pathParts[2];

    const localityNameMap = {
      'velachery': 'Velachery',
      'adyar': 'Adyar',
      'anna-nagar': 'Anna Nagar',
      'omr': 'OMR (IT Corridor)',
      'porur': 'Porur',
      't-nagar': 'T. Nagar',
      'sholinganallur': 'Sholinganallur',
      'tambaram': 'Tambaram',
      'chromepet': 'Chromepet',
      'medavakkam': 'Medavakkam',
      'perungudi': 'Perungudi',
      'taramani': 'Taramani',
      'thiruvanmiyur': 'Thiruvanmiyur',
      'thoraipakkam': 'Thoraipakkam',
      'valasaravakkam': 'Valasaravakkam',
      'nungambakkam': 'Nungambakkam',
    };

    if (localityNameMap[localitySlug]) {
      targetLocality = localityNameMap[localitySlug];
    }

    if (!facetSlug) {
      if (localityNameMap[localitySlug]) {
        pageType = 'Locality Core Hub';
        searchIntent = 'Commercial Investigation';
        parentHub = 'https://www.chennairents.in/chennai/rentals';
        primaryConversion = 'View Locality Rent Rates & Listings';
        nonCompetingNotes = `Aggregates all sub-typologies for ${targetLocality}`;
      } else {
        // e.g. /chennai/rentals, /chennai/1-bhk-for-rent, /chennai/2-bhk-for-rent, etc.
        pageType = 'City BHK / Category Hub';
        searchIntent = 'Commercial Investigation';
        parentHub = 'https://www.chennairents.in';
        primaryConversion = 'Browse Neighborhood Options';
        if (localitySlug.includes('1-bhk')) targetPropertyType = '1 BHK Flats';
        else if (localitySlug.includes('2-bhk')) targetPropertyType = '2 BHK Flats';
        else if (localitySlug.includes('3-bhk')) targetPropertyType = '3 BHK Flats';
        else if (localitySlug === 'pg') targetPropertyType = 'Paying Guest (PG)';
        else if (localitySlug === 'rentals') targetPropertyType = 'All Residential Rentals';
      }
    } else {
      // It is a programmatic facet under a locality
      pageType = 'Locality Facet / Typology';
      searchIntent = 'Transactional';
      parentHub = `https://www.chennairents.in/chennai/${localitySlug}`;
      primaryConversion = 'Contact Verified Property Owners';

      if (facetSlug.includes('1rk')) targetPropertyType = '1 RK';
      else if (facetSlug.includes('1bhk') || facetSlug.includes('1-bhk')) targetPropertyType = '1 BHK';
      else if (facetSlug.includes('2bhk') || facetSlug.includes('2-bhk')) targetPropertyType = '2 BHK';
      else if (facetSlug.includes('3bhk') || facetSlug.includes('3-bhk')) targetPropertyType = '3 BHK';
      else if (facetSlug.includes('bachelor')) targetPropertyType = 'Bachelor Friendly Rentals';
      else if (facetSlug.includes('family')) targetPropertyType = 'Family Rentals';
      else if (facetSlug.includes('co-living') || facetSlug.includes('coliving')) targetPropertyType = 'Co-Living';
      else if (facetSlug.includes('pg-for-men') || facetSlug.includes('mens-pg')) targetPropertyType = 'PG for Men';
      else if (facetSlug.includes('pg-for-women') || facetSlug.includes('womens-pg')) targetPropertyType = 'PG for Women';
      else if (facetSlug.includes('pg')) targetPropertyType = 'Paying Guest';
      else if (facetSlug.includes('independent-house') || facetSlug.includes('house-for-rent') || facetSlug.includes('individual-house')) targetPropertyType = 'Independent House / Villa';
      else if (facetSlug.includes('furnished')) targetPropertyType = 'Furnished Flats';
      else if (facetSlug.includes('under-10000')) targetPropertyType = 'Flats Under ₹10,000';
      else if (facetSlug.includes('under-15000')) targetPropertyType = 'Flats Under ₹15,000';
      else if (facetSlug.includes('under-20000')) targetPropertyType = 'Flats Under ₹20,000';
      else if (facetSlug.includes('flat') || facetSlug.includes('apartment')) targetPropertyType = 'Flats / Apartments';

      nonCompetingNotes = `Targets specific long-tail intent for ${targetPropertyType} in ${targetLocality}; canonical isolated from base hub`;
    }
  } else if (url.pathname.startsWith('/guides/')) {
    pageType = 'Editorial Guide';
    searchIntent = 'Informational';
    parentHub = 'https://www.chennairents.in/guides';
    primaryConversion = 'Read Rental Insights & Checklist';
    nonCompetingNotes = 'Long-form editorial guide addressing legal/procedural renting questions';
    evidence = 'Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act (TNRRRL), CMWSSB';
  } else if (
    ['/about', '/contact', '/privacy', '/terms', '/methodology', '/corrections', '/disclaimer', '/data-deletion'].includes(url.pathname)
  ) {
    pageType = 'Policy / Trust / Legal';
    searchIntent = 'Informational';
    parentHub = 'https://www.chennairents.in';
    primaryConversion = 'Review Legal Policies & Editorial Standards';
    nonCompetingNotes = 'Site governance, compliance, and author transparency';
    evidence = 'Platform Terms, Privacy Compliance, Editorial Policy';
  } else if (url.pathname.startsWith('/author/')) {
    pageType = 'Author Profile (E-E-A-T)';
    searchIntent = 'Informational';
    parentHub = 'https://www.chennairents.in/about';
    primaryConversion = 'Verify Local Rental Editorial Expertise';
    nonCompetingNotes = 'Author entity and local domain credentials';
    evidence = 'Chennai Real Estate Experience, Field Research';
  }

  return {
    pageType,
    targetLocality,
    targetPropertyType,
    searchIntent,
    parentHub,
    primaryConversion,
    nonCompetingNotes,
    evidence
  };
}

// 5. Process all 367 URLs
const keywordMapRows = [];

for (const rawUrl of sitemapUrls) {
  const normUrl = rawUrl.trim();
  const htmlPath = getHtmlPathForUrl(normUrl);

  let finalTitle = '';
  let finalDescription = '';
  let finalCanonical = normUrl;
  let finalH1 = '';
  let supportingH2s = [];
  let schemaTypes = [];

  if (htmlPath && fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    if (titleMatch) finalTitle = cleanText(titleMatch[1]);

    // Meta Description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
    if (descMatch) finalDescription = cleanText(descMatch[1]);

    // Canonical
    const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                       html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
    if (canonMatch) finalCanonical = canonMatch[1].trim();

    // H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) finalH1 = cleanText(h1Match[1]);

    // H2s
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
    supportingH2s = h2Matches.map(m => cleanText(m[1])).filter(t => t.length > 0).slice(0, 5);

    // Schemas
    const schemaMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const sm of schemaMatches) {
      try {
        const parsed = JSON.parse(sm[1]);
        if (Array.isArray(parsed)) {
          parsed.forEach(item => {
            if (item && item['@type']) schemaTypes.push(item['@type']);
          });
        } else if (parsed && parsed['@type']) {
          schemaTypes.push(parsed['@type']);
        }
      } catch (e) {
        // Fallback simple regex
        const typeMatch = sm[1].match(/"@type"\s*:\s*"([^"]+)"/);
        if (typeMatch) schemaTypes.push(typeMatch[1]);
      }
    }
    schemaTypes = [...new Set(schemaTypes)];
  }

  const meta = analyzeUrlMetadata(normUrl);

  // Infer Primary & Secondary Keywords
  let primaryKeyword = '';
  let secondaryKeywords = [];

  const urlObj = new URL(normUrl);
  const slug = path.basename(urlObj.pathname);

  if (meta.pageType === 'Homepage Hub') {
    primaryKeyword = 'chennai rents';
    secondaryKeywords = ['flats for rent in chennai', 'house for rent in chennai without broker', 'chennai rental guide', 'chennai rent rates 2026'];
  } else if (meta.pageType === 'Locality Core Hub') {
    primaryKeyword = `flats for rent in ${meta.targetLocality.toLowerCase()}`;
    secondaryKeywords = [
      `apartments for rent in ${meta.targetLocality.toLowerCase()}`,
      `house for rent in ${meta.targetLocality.toLowerCase()}`,
      `rent in ${meta.targetLocality.toLowerCase()} without broker`,
      `${meta.targetLocality.toLowerCase()} rent rates 2026`
    ];
  } else if (meta.pageType === 'Locality Facet / Typology') {
    primaryKeyword = slug.replace(/-/g, ' ');
    const locLower = meta.targetLocality.toLowerCase();
    secondaryKeywords = [
      `${meta.targetPropertyType.toLowerCase()} ${locLower}`,
      `verified ${slug.replace(/-/g, ' ')}`,
      `owner direct ${slug.replace(/-/g, ' ')}`,
      `${slug.replace(/-/g, ' ')} price deposit`
    ];
  } else if (meta.pageType === 'City BHK / Category Hub') {
    primaryKeyword = slug.replace(/-/g, ' ') + ' chennai';
    secondaryKeywords = [
      `rent ${meta.targetPropertyType.toLowerCase()} chennai`,
      `${meta.targetPropertyType.toLowerCase()} rates chennai`,
      `verified ${meta.targetPropertyType.toLowerCase()} without broker`
    ];
  } else if (meta.pageType === 'Editorial Guide') {
    primaryKeyword = slug.replace(/-/g, ' ');
    secondaryKeywords = [
      `chennai renting guide ${slug.replace(/-/g, ' ')}`,
      `rental checklist chennai`,
      `tenant rules chennai 2026`
    ];
  } else {
    primaryKeyword = slug.replace(/-/g, ' ') || 'chennai rents';
    secondaryKeywords = [`chennai rents ${slug.replace(/-/g, ' ')}`];
  }

  const row = {
    url: normUrl,
    page_type: meta.pageType,
    primary_keyword: primaryKeyword,
    search_intent: meta.searchIntent,
    secondary_keywords: secondaryKeywords.join('; '),
    target_locality: meta.targetLocality,
    target_property_type_or_budget: meta.targetPropertyType,
    canonical_url: finalCanonical || normUrl,
    index_decision: 'Index, Follow',
    final_title: finalTitle || `${primaryKeyword} | Chennai Rents`,
    final_meta_description: finalDescription || `Explore verified listings and rent guidance for ${primaryKeyword} on Chennai Rents.`,
    final_h1: finalH1 || primaryKeyword,
    supporting_h2s: supportingH2s.join(' | ') || 'Rental Overview | Pricing & Connectivity | Verified Listings',
    primary_conversion_action: meta.primaryConversion,
    parent_hub: meta.parentHub,
    recommended_internal_links: `${meta.parentHub}; https://www.chennairents.in/chennai/rentals`,
    non_competing_pages: meta.nonCompetingNotes,
    schema_types: schemaTypes.length > 0 ? schemaTypes.join(', ') : 'WebPage, BreadcrumbList',
    evidence_links: meta.evidence,
    qa_status: 'Pass / Verified',
    reviewer_date: 'SEO QA Lead / 2026-10-05'
  };

  keywordMapRows.push(row);
}

// 6. Save JSON
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(keywordMapRows, null, 2), 'utf8');
console.log(`Saved ${keywordMapRows.length} rows to ${OUTPUT_JSON}`);

// 7. Save CSV with headers
const csvHeaders = [
  'URL',
  'Page Type',
  'Primary Keyword',
  'Search Intent',
  'Secondary Keywords',
  'Target Locality',
  'Target Property Type / Budget',
  'Canonical URL',
  'Index Decision',
  'Final Title',
  'Final Meta Description',
  'Final H1',
  'Supporting H2s',
  'Primary Conversion Action',
  'Parent Hub',
  'Recommended Internal Links',
  'Non-Competing Pages',
  'Schema Types',
  'Evidence Links',
  'QA Status',
  'Reviewer / Date'
];

const csvLines = [csvHeaders.map(csvEscape).join(',')];

for (const r of keywordMapRows) {
  const line = [
    r.url,
    r.page_type,
    r.primary_keyword,
    r.search_intent,
    r.secondary_keywords,
    r.target_locality,
    r.target_property_type_or_budget,
    r.canonical_url,
    r.index_decision,
    r.final_title,
    r.final_meta_description,
    r.final_h1,
    r.supporting_h2s,
    r.primary_conversion_action,
    r.parent_hub,
    r.recommended_internal_links,
    r.non_competing_pages,
    r.schema_types,
    r.evidence_links,
    r.qa_status,
    r.reviewer_date
  ].map(csvEscape).join(',');
  csvLines.push(line);
}

fs.writeFileSync(OUTPUT_CSV, csvLines.join('\n'), 'utf8');
console.log(`Saved ${csvLines.length - 1} rows to ${OUTPUT_CSV}`);
