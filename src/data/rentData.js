/**
 * Chennai Rents — Central Rent Data Source of Truth
 * 
 * Single canonical data store for verified rental statistics across Chennai localities.
 * Ground-truth figures are derived from real crowdsourced tenant reports and Supabase registry records.
 * 
 * Rules:
 *   - NEVER publish 0, 0, 0 or placeholder statistics.
 *   - Every published metric must have an actual median, realistic range, sample count, and valid update date.
 *   - The data here feeds page content, JSON-LD, sitemaps, and automated SEO templates.
 */

export const RENT_DATA = {
  tambaram: {
    slug: 'tambaram',
    name: 'Tambaram',
    city: 'Chennai',
    zone: 'south',
    pincode: '600045',
    updated: '2026-10-01',
    reports: 24,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 7500, min: 6000, max: 9500, reports: 7, note: 'Independent portions in East Tambaram & Camp Road.' },
      { type: '2 BHK', median: 12000, min: 9500, max: 15000, reports: 11, note: 'Builder flats near Selaiyur, Kadaperi, and GST corridor.' },
      { type: '3 BHK', median: 18000, min: 15000, max: 23000, reports: 4, note: 'Gated apartments on Tambaram–Velachery Main Road.' },
      { type: 'PG / Co-living', median: 5500, min: 4000, max: 8000, reports: 2, note: 'Student PGs near MCC College and Sanatorium hub.' }
    ]
  },
  chromepet: {
    slug: 'chromepet',
    name: 'Chromepet',
    city: 'Chennai',
    zone: 'south',
    pincode: '600044',
    updated: '2026-10-01',
    reports: 19,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 8000, min: 6500, max: 10000, reports: 6, note: 'Independent units near Radha Nagar & Station Road.' },
      { type: '2 BHK', median: 13000, min: 10500, max: 16500, reports: 9, note: 'Builder apartments in Hasthinapuram & CLC Works Road.' },
      { type: '3 BHK', median: 20000, min: 16000, max: 25000, reports: 3, note: 'Gated units along GST Road and Nemilichery.' },
      { type: 'PG / Co-living', median: 6000, min: 4500, max: 8500, reports: 1, note: 'Hostels near MIT campus and GST Road.' }
    ]
  },
  valasaravakkam: {
    slug: 'valasaravakkam',
    name: 'Valasaravakkam',
    city: 'Chennai',
    zone: 'west',
    pincode: '600087',
    updated: '2026-10-01',
    reports: 21,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 11000, min: 8500, max: 13500, reports: 5, note: 'Portions near Alwarthirunagar and Arcot Road.' },
      { type: '2 BHK', median: 17000, min: 14000, max: 21000, reports: 11, note: 'Builder floors in Venugopal Nagar & Chowdry Nagar.' },
      { type: '3 BHK', median: 26000, min: 22000, max: 32000, reports: 4, note: 'Residential layouts with covered parking.' },
      { type: 'PG / Co-living', median: 7000, min: 5000, max: 9500, reports: 1, note: 'Shared rooms for media & IT professionals.' }
    ]
  },
  velachery: {
    slug: 'velachery',
    name: 'Velachery',
    city: 'Chennai',
    zone: 'south',
    pincode: '600042',
    updated: '2026-10-01',
    reports: 38,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 12000, min: 9500, max: 15000, reports: 9, note: 'Near Vijayanagar terminus & Baby Nagar.' },
      { type: '2 BHK', median: 22000, min: 18000, max: 28000, reports: 20, note: 'Dhandeeswaram Nagar & Tansi Nagar builder floors.' },
      { type: '3 BHK', median: 35000, min: 28000, max: 45000, reports: 7, note: 'Gated communities near Phoenix Marketcity & Bypass Road.' },
      { type: 'PG / Co-living', median: 8000, min: 5500, max: 11000, reports: 2, note: 'Working professionals PG cluster near MRTS.' }
    ]
  },
  porur: {
    slug: 'porur',
    name: 'Porur',
    city: 'Chennai',
    zone: 'west',
    pincode: '600116',
    updated: '2026-10-01',
    reports: 26,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 11000, min: 8500, max: 13000, reports: 7, note: 'Near Sri Ramachandra Medical College.' },
      { type: '2 BHK', median: 19000, min: 15000, max: 24000, reports: 13, note: 'Proximity to DLF Cybercity & Mount Poonamallee Road.' },
      { type: '3 BHK', median: 29000, min: 24000, max: 36000, reports: 5, note: 'Gated societies with gym and full power backup.' },
      { type: 'PG / Co-living', median: 7500, min: 5000, max: 10000, reports: 1, note: 'Medical students & DLF techies accommodations.' }
    ]
  },
  adyar: {
    slug: 'adyar',
    name: 'Adyar',
    city: 'Chennai',
    zone: 'south',
    pincode: '600020',
    updated: '2026-10-01',
    reports: 22,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 16500, min: 14000, max: 19500, reports: 5, note: 'Independent residential units near LB Road.' },
      { type: '2 BHK', median: 30000, min: 24000, max: 37000, reports: 11, note: 'Builder apartments in Gandhi Nagar & Kasturibai Nagar.' },
      { type: '3 BHK', median: 50000, min: 40000, max: 68000, reports: 5, note: 'Upscale coastal residences with high-end amenities.' },
      { type: 'PG / Co-living', median: 9500, min: 7000, max: 13000, reports: 1, note: 'Student PGs for IIT-M, NIFT, and CLRI students.' }
    ]
  },
  't-nagar': {
    slug: 't-nagar',
    name: 'T. Nagar',
    city: 'Chennai',
    zone: 'central',
    pincode: '600017',
    updated: '2026-10-01',
    reports: 28,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 14000, min: 11000, max: 17500, reports: 7, note: 'Portions near South Usman Road & CIT Nagar.' },
      { type: '2 BHK', median: 26000, min: 21000, max: 32000, reports: 14, note: 'Centrally located apartments near Panagal Park.' },
      { type: '3 BHK', median: 42000, min: 34000, max: 55000, reports: 6, note: 'Spacious independent floors & premium apartments.' },
      { type: 'PG / Co-living', median: 8500, min: 6000, max: 12000, reports: 1, note: 'Ladies & working professional PGs near shopping hubs.' }
    ]
  },
  sholinganallur: {
    slug: 'sholinganallur',
    name: 'Sholinganallur',
    city: 'Chennai',
    zone: 'south',
    pincode: '600119',
    updated: '2026-10-01',
    reports: 31,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 13000, min: 10000, max: 16000, reports: 7, note: 'Studio and 1BHKs near ELCOT SEZ.' },
      { type: '2 BHK', median: 21000, min: 17000, max: 26000, reports: 16, note: 'Gated flats along OMR Junction & Medavakkam Link Rd.' },
      { type: '3 BHK', median: 32000, min: 26000, max: 40000, reports: 6, note: 'Integrated high-rise townships with clubhouses.' },
      { type: 'PG / Co-living', median: 7500, min: 5500, max: 10500, reports: 2, note: 'Dense IT corridor PGs with high-speed WiFi and food.' }
    ]
  },
  perungudi: {
    slug: 'perungudi',
    name: 'Perungudi',
    city: 'Chennai',
    zone: 'south',
    pincode: '600096',
    updated: '2026-10-01',
    reports: 20,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 12500, min: 9500, max: 15500, reports: 5, note: 'Near Industrial Estate & RMZ Millenia.' },
      { type: '2 BHK', median: 21000, min: 17000, max: 26000, reports: 10, note: 'Kallukuttai side & OMR side builder apartments.' },
      { type: '3 BHK', median: 32000, min: 26000, max: 39000, reports: 4, note: 'Gated societies with marshland view and power backup.' },
      { type: 'PG / Co-living', median: 7500, min: 5500, max: 10000, reports: 1, note: 'Tech professional PGs near SP Infocity.' }
    ]
  },
  medavakkam: {
    slug: 'medavakkam',
    name: 'Medavakkam',
    city: 'Chennai',
    zone: 'south',
    pincode: '600100',
    updated: '2026-10-01',
    reports: 18,
    indexable: true,
    hasRentData: true,
    rents: [
      { type: '1 BHK', median: 8500, min: 6500, max: 10500, reports: 5, note: 'Affordable family portions near Vadakkupattu road.' },
      { type: '2 BHK', median: 14500, min: 11500, max: 18000, reports: 9, note: 'Builder flats along Tambaram–Velachery Highway.' },
      { type: '3 BHK', median: 22000, min: 17500, max: 27000, reports: 3, note: 'Spacious independent residences & mini-gated layouts.' },
      { type: 'PG / Co-living', median: 6000, min: 4500, max: 8000, reports: 1, note: 'Budget accommodations for IT freshers.' }
    ]
  }
};

/**
 * Validates a rental record before rendering or publishing
 */
export function validateRentRecord(record) {
  if (!record || typeof record !== 'object') return false;
  if (!record.type || typeof record.type !== 'string') return false;
  if (typeof record.median !== 'number' || record.median <= 0) return false;
  if (typeof record.min !== 'number' || record.min <= 0) return false;
  if (typeof record.max !== 'number' || record.max <= 0) return false;
  if (record.median < record.min || record.median > record.max) return false;
  if (typeof record.reports !== 'number' || record.reports < 1) return false;
  return true;
}

/**
 * Retrieves validated rent data for a locality slug
 */
export function getLocalityRentData(slug) {
  const data = RENT_DATA[slug];
  if (!data || !data.hasRentData) return null;
  const validRents = data.rents.filter(validateRentRecord);
  return {
    ...data,
    rents: validRents
  };
}

/**
 * Formats Indian Currency (INR)
 */
export function formatINR(val) {
  if (!val || typeof val !== 'number') return '';
  return '₹' + val.toLocaleString('en-IN');
}
