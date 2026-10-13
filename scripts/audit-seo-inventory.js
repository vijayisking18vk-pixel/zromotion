import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const DOMAIN = 'https://www.chennairents.in';

const SITEMAP_FILES = [
  'sitemap-pages.xml',
  'sitemap-localities.xml',
  'sitemap-facets.xml',
  'sitemap-guides.xml',
];

function getTemplate(urlStr) {
  const p = urlStr.replace(DOMAIN, '') || '/';
  if (p === '/') return 'homepage';
  if (p === '/listings') return 'listings';
  if (['/about', '/methodology', '/verification', '/corrections', '/contact', '/privacy', '/data-deletion', '/authors'].includes(p)) {
    return 'trust/legal';
  }
  if (['/chennai/rentals', '/chennai/1-bhk-for-rent', '/chennai/2-bhk-for-rent', '/chennai/3-bhk-for-rent', '/chennai/pg', '/house-for-rent-in-chennai', '/house-rent-in-chennai'].includes(p)) {
    return 'city hub';
  }
  if (p.startsWith('/1-bhk-house') || p.startsWith('/2-bhk-house') || p.startsWith('/3-bhk-house') || p.startsWith('/independent-house') || p.startsWith('/house-for-rent-in-chennai-') || p.startsWith('/individual-house') || p.startsWith('/house-for-rent-in-') || p.startsWith('/bachelor-rentals') || p.startsWith('/family-houses') || p.startsWith('/co-living')) {
    return 'city hub';
  }
  if (p.startsWith('/guides/')) return 'guide';
  if (p.startsWith('/stories/')) return 'story';
  if (p.startsWith('/chennai/')) {
    const parts = p.split('/').filter(Boolean);
    if (parts.length === 2) return 'locality hub';
    if (parts.length === 3) return 'locality/intent facet';
  }
  return 'other';
}

function getFilePathForUrl(urlStr) {
  const relPath = urlStr.replace(DOMAIN, '').replace(/^\//, '');
  if (!relPath) return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, relPath, 'index.html');
}

function runAudit() {
  const inventory = [];
  const sitemapUrlMap = new Map();

  for (const sm of SITEMAP_FILES) {
    const smPath = path.join(PUBLIC_DIR, sm);
    if (!fs.existsSync(smPath)) continue;
    const content = fs.readFileSync(smPath, 'utf8');
    const locs = (content.match(/<loc>(.*?)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, '').trim());
    locs.forEach(u => sitemapUrlMap.set(u, sm));
  }

  console.log(`Loaded ${sitemapUrlMap.size} URLs across sitemaps.`);

  let overlongTitles = 0;
  let overlongDesc = 0;
  let shortDesc = 0;
  let missingOg = 0;
  let missingTwitter = 0;
  let missingH1 = 0;
  let multipleH1 = 0;
  let lowWordCount = 0;

  for (const [urlStr, sitemapFile] of sitemapUrlMap.entries()) {
    const template = getTemplate(urlStr);
    const filePath = getFilePathForUrl(urlStr);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      console.warn(`File missing for URL: ${urlStr} (${filePath})`);
      inventory.push({
        url: urlStr,
        template,
        status: 404,
        final_url: urlStr,
        canonical: 'MISSING',
        title: 'MISSING',
        title_length: 0,
        description: 'MISSING',
        description_length: 0,
        robots: 'MISSING',
        h1_count: 0,
        word_count: 0,
        jsonld_types: '[]',
        og_complete: false,
        twitter_complete: false,
        sitemap_file: sitemapFile,
        recommended_index_action: 'noindex',
        reason: 'Prerendered file does not exist',
      });
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Canonical
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || html.match(/<link\s+href="([^"]+)"\s+rel="canonical"/i);
    const canonical = canonMatch ? canonMatch[1] : '';

    // Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const title_length = title.length;
    if (title_length > 65) overlongTitles++;

    // Meta Description
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    const description = descMatch ? descMatch[1].trim() : '';
    const description_length = description.length;
    if (description_length > 160) overlongDesc++;
    if (description_length < 120) shortDesc++;

    // Robots
    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="robots"/i);
    const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';

    // H1
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h1_count = h1Matches.length;
    if (h1_count === 0) missingH1++;
    if (h1_count > 1) multipleH1++;

    // Words
    const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const word_count = textOnly ? textOnly.split(/\s+/).length : 0;
    if (word_count < 300) lowWordCount++;

    // JSON-LD types
    const jsonLdMatches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    const typesSet = new Set();
    for (const jm of jsonLdMatches) {
      const jsonContent = jm.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      try {
        const parsed = JSON.parse(jsonContent);
        const extractTypes = (obj) => {
          if (!obj) return;
          if (Array.isArray(obj)) {
            obj.forEach(extractTypes);
          } else if (typeof obj === 'object') {
            if (obj['@type']) {
              if (Array.isArray(obj['@type'])) obj['@type'].forEach(t => typesSet.add(t));
              else typesSet.add(obj['@type']);
            }
            if (obj['@graph'] && Array.isArray(obj['@graph'])) {
              obj['@graph'].forEach(extractTypes);
            }
          }
        };
        extractTypes(parsed);
      } catch (err) {
        // syntax error
        typesSet.add('SYNTAX_ERROR');
      }
    }
    const jsonld_types = JSON.stringify(Array.from(typesSet));

    // OpenGraph
    const hasOgTitle = /<meta\s+(?:property|name)="og:title"/i.test(html);
    const hasOgDesc = /<meta\s+(?:property|name)="og:description"/i.test(html);
    const hasOgUrl = /<meta\s+(?:property|name)="og:url"/i.test(html);
    const hasOgImage = /<meta\s+(?:property|name)="og:image"/i.test(html);
    const og_complete = hasOgTitle && hasOgDesc && hasOgUrl && hasOgImage;
    if (!og_complete) missingOg++;

    // Twitter
    const hasTwCard = /<meta\s+(?:name|property)="twitter:card"/i.test(html);
    const hasTwTitle = /<meta\s+(?:name|property)="twitter:title"/i.test(html);
    const hasTwDesc = /<meta\s+(?:name|property)="twitter:description"/i.test(html);
    const hasTwImage = /<meta\s+(?:name|property)="twitter:image"/i.test(html);
    const twitter_complete = hasTwCard && hasTwTitle && hasTwDesc && hasTwImage;
    if (!twitter_complete) missingTwitter++;

    // Default action & reason
    let recommended_index_action = 'index';
    let reason = 'High-value search landing page with verified data and distinct intent';

    inventory.push({
      url: urlStr,
      template,
      status: 200,
      final_url: urlStr,
      canonical,
      title,
      title_length,
      description,
      description_length,
      robots,
      h1_count,
      word_count,
      jsonld_types,
      og_complete,
      twitter_complete,
      sitemap_file: sitemapFile,
      recommended_index_action,
      reason,
    });
  }

  console.log('\n--- BASELINE AUDIT SUMMARY ---');
  console.log(`Total URLs Audited: ${inventory.length}`);
  console.log(`Overlong Titles (> 65 chars): ${overlongTitles}`);
  console.log(`Overlong Descriptions (> 160 chars): ${overlongDesc}`);
  console.log(`Short Descriptions (< 120 chars): ${shortDesc}`);
  console.log(`Missing OG Complete: ${missingOg}`);
  console.log(`Missing Twitter Complete: ${missingTwitter}`);
  console.log(`Missing H1: ${missingH1}`);
  console.log(`Multiple H1s: ${multipleH1}`);
  console.log(`Low Word Count (< 300 words): ${lowWordCount}`);

  console.log('\n--- OVERLONG TITLES (> 65 chars) ---');
  inventory.filter(i => i.title_length > 65).forEach(i => {
    console.log(`[${i.title_length}] ${i.url} => "${i.title}"`);
  });

  console.log('\n--- OVERLONG DESCRIPTIONS (> 160 chars) ---');
  inventory.filter(i => i.description_length > 160).forEach(i => {
    console.log(`[${i.description_length}] ${i.url} => "${i.description}"`);
  });

  console.log('\n--- SHORT DESCRIPTIONS (< 120 chars) ---');
  inventory.filter(i => i.description_length < 120).forEach(i => {
    console.log(`[${i.description_length}] ${i.url} => "${i.description}"`);
  });

  console.log('\n--- MISSING OG / TWITTER ---');
  inventory.filter(i => !i.og_complete || !i.twitter_complete).forEach(i => {
    console.log(`${i.url} => OG: ${i.og_complete}, Twitter: ${i.twitter_complete}`);
  });

  // Write out interim CSV
  const csvHeaders = [
    'url', 'template', 'status', 'final_url', 'canonical', 'title', 'title_length',
    'description', 'description_length', 'robots', 'h1_count', 'word_count',
    'jsonld_types', 'og_complete', 'twitter_complete', 'sitemap_file',
    'recommended_index_action', 'reason'
  ];

  const csvRows = [csvHeaders.join(',')];
  for (const item of inventory) {
    const row = csvHeaders.map(h => {
      let val = String(item[h] ?? '');
      val = val.replace(/"/g, '""');
      if (val.includes(',') || val.includes('\n') || val.includes('"')) {
        return `"${val}"`;
      }
      return val;
    });
    csvRows.push(row.join(','));
  }

  fs.writeFileSync(path.join(ROOT_DIR, 'seo-url-inventory.csv'), csvRows.join('\n'), 'utf8');
  console.log(`\nWritten seo-url-inventory.csv with ${inventory.length} records.`);
}

runAudit();
