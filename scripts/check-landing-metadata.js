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

const allClusters = [
  { name: 'velachery', pages: VELACHERY_PAGES },
  { name: 'valasaravakkam', pages: VALASARAVAKKAM_PAGES },
  { name: 'adyar', pages: ADYAR_PAGES },
  { name: 'sholinganallur', pages: SHOLINGANALLUR_PAGES },
  { name: 'porur', pages: PORUR_PAGES },
  { name: 'anna-nagar', pages: ANNA_NAGAR_PAGES },
  { name: 't-nagar', pages: T_NAGAR_PAGES },
  { name: 'nungambakkam', pages: NUNGAMBAKKAM_PAGES },
  { name: 'medavakkam', pages: MEDAVAKKAM_PAGES },
  { name: 'omr', pages: OMR_PAGES },
  { name: 'perungudi', pages: PERUNGUDI_PAGES },
  { name: 'tambaram', pages: TAMBARAM_PAGES },
  { name: 'chromepet', pages: CHROMEPET_PAGES },
  { name: 'taramani', pages: TARAMANI_PAGES },
  { name: 'thiruvanmiyur', pages: THIRUVANMIYUR_PAGES },
  { name: 'thoraipakkam', pages: THORAIPAKKAM_PAGES },
];

console.log('--- Checking Programmatic Landing Pages Metadata ---');
let overlongTitles = 0;
let overlongDesc = 0;
let shortDesc = 0;

allClusters.forEach(cluster => {
  cluster.pages.forEach(p => {
    const tlen = p.metaTitle?.length || 0;
    const dlen = p.metaDescription?.length || 0;
    if (tlen > 65) {
      overlongTitles++;
      console.log(`[TITLE ${tlen}] ${cluster.name} / ${p.slug} => "${p.metaTitle}"`);
    }
    if (dlen > 160) {
      overlongDesc++;
      console.log(`[DESC >160: ${dlen}] ${cluster.name} / ${p.slug} => "${p.metaDescription}"`);
    }
    if (dlen < 120) {
      shortDesc++;
      console.log(`[DESC <120: ${dlen}] ${cluster.name} / ${p.slug} => "${p.metaDescription}"`);
    }
  });
});

console.log(`\nResults: ${overlongTitles} overlong titles, ${overlongDesc} overlong descriptions, ${shortDesc} short descriptions.`);
