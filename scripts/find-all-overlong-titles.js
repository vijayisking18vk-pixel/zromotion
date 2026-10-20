import fs from 'fs';
import path from 'path';

import { LOCALITIES, generateSEOMeta } from '../src/data/localities.js';
import { POSTS } from '../src/data/posts.js';
import { CHENNAI_RENT_HUB_DATA, SUPPORTING_RENTAL_PAGES } from '../src/data/rentalGuideData.js';
import { VELACHERY_PAGES } from '../src/data/velacheryLandingPages.js';
import { VALASARAVAKKAM_PAGES } from '../src/data/valasaravakkamLandingPages.js';
import { ADYAR_PAGES } from '../src/data/adyarLandingPages.js';
import { SHOLINGANALLUR_PAGES } from '../src/data/sholinganallurLandingPages.js';
import { PORUR_PAGES } from '../src/data/porurLandingPages.js';
import { ANNA_NAGAR_PAGES } from '../src/data/annaNagarLandingPages.js';
import { T_NAGAR_PAGES } from '../src/data/tNagarLandingPages.js';
import { NUNGAMBAKKAM_PAGES } from '../src/data/nungambakkamLandingPages.js';
import { MEDAVAKKAM_PAGES } from '../src/data/medavakkamLandingPages.js';
import { OMR_PAGES } from '../src/data/omrLandingPages.js';
import { PERUNGUDI_PAGES } from '../src/data/perungudiLandingPages.js';
import { TAMBARAM_PAGES } from '../src/data/tambaramLandingPages.js';
import { CHROMEPET_PAGES } from '../src/data/chromepetLandingPages.js';
import { TARAMANI_PAGES } from '../src/data/taramaniLandingPages.js';
import { THIRUVANMIYUR_PAGES } from '../src/data/thiruvanmiyurLandingPages.js';
import { THORAIPAKKAM_PAGES } from '../src/data/thoraipakkamLandingPages.js';

const allLocalityPages = [
  { name: 'velachery', pages: VELACHERY_PAGES, file: 'src/data/velacheryLandingPages.js' },
  { name: 'valasaravakkam', pages: VALASARAVAKKAM_PAGES, file: 'src/data/valasaravakkamLandingPages.js' },
  { name: 'adyar', pages: ADYAR_PAGES, file: 'src/data/adyarLandingPages.js' },
  { name: 'sholinganallur', pages: SHOLINGANALLUR_PAGES, file: 'src/data/sholinganallurLandingPages.js' },
  { name: 'porur', pages: PORUR_PAGES, file: 'src/data/porurLandingPages.js' },
  { name: 'annaNagar', pages: ANNA_NAGAR_PAGES, file: 'src/data/annaNagarLandingPages.js' },
  { name: 'tNagar', pages: T_NAGAR_PAGES, file: 'src/data/tNagarLandingPages.js' },
  { name: 'nungambakkam', pages: NUNGAMBAKKAM_PAGES, file: 'src/data/nungambakkamLandingPages.js' },
  { name: 'medavakkam', pages: MEDAVAKKAM_PAGES, file: 'src/data/medavakkamLandingPages.js' },
  { name: 'omr', pages: OMR_PAGES, file: 'src/data/omrLandingPages.js' },
  { name: 'perungudi', pages: PERUNGUDI_PAGES, file: 'src/data/perungudiLandingPages.js' },
  { name: 'tambaram', pages: TAMBARAM_PAGES, file: 'src/data/tambaramLandingPages.js' },
  { name: 'chromepet', pages: CHROMEPET_PAGES, file: 'src/data/chromepetLandingPages.js' },
  { name: 'taramani', pages: TARAMANI_PAGES, file: 'src/data/taramaniLandingPages.js' },
  { name: 'thiruvanmiyur', pages: THIRUVANMIYUR_PAGES, file: 'src/data/thiruvanmiyurLandingPages.js' },
  { name: 'thoraipakkam', pages: THORAIPAKKAM_PAGES, file: 'src/data/thoraipakkamLandingPages.js' },
];

let overlong = [];

// Supporting pages
SUPPORTING_RENTAL_PAGES.forEach(p => {
  if (p.title && p.title.length > 60) {
    overlong.push({ file: 'src/data/rentalGuideData.js', slug: p.slug, title: p.title, len: p.title.length });
  }
});

// Posts
POSTS.forEach(p => {
  if (p.metaTitle && p.metaTitle.length > 60) {
    overlong.push({ file: 'src/data/posts.js', slug: p.slug, title: p.metaTitle, len: p.metaTitle.length });
  }
});

// Locality landing pages
for (const loc of allLocalityPages) {
  for (const p of loc.pages) {
    if (p.metaTitle && p.metaTitle.length > 60) {
      overlong.push({ file: loc.file, slug: p.slug, title: p.metaTitle, len: p.metaTitle.length });
    }
  }
}

// Localities
for (const loc of LOCALITIES) {
  const meta = generateSEOMeta({ locality: loc });
  if (meta.title && meta.title.length > 60) {
    overlong.push({ file: 'src/data/localities.js', slug: loc.slug, title: meta.title, len: meta.title.length });
  }
}

console.log('Total overlong titles found:', overlong.length);
overlong.forEach((o, i) => {
  console.log(`${i+1}. [${o.len}] ${o.file} (${o.slug}): "${o.title}"`);
});
