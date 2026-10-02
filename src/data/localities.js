/**
 * Chennai Rents — Locality Data & SEO Engine
 * Single source of truth for all geo-SEO pages.
 *
 * URL patterns generated per locality:
 *   /chennai/:locality
 *   /chennai/:locality/flats-for-rent
 *   /chennai/:locality/1-bhk-for-rent
 *   /chennai/:locality/2-bhk-for-rent
 *   /chennai/:locality/3-bhk-for-rent
 *   /chennai/:locality/pg
 *   /chennai/:locality/fully-furnished-flats-for-rent
 *   /chennai/:locality/flats-for-rent-under-20000
 */

// ─── Zone Taxonomy ───────────────────────────────────────────────────────────
export const ZONES = [
  { id: 'south',   name: 'South Chennai',       slug: 'south-chennai' },
  { id: 'central', name: 'Central Chennai',     slug: 'central-chennai' },
  { id: 'west',    name: 'West Chennai',        slug: 'west-chennai' },
  { id: 'north',   name: 'North Chennai',       slug: 'north-chennai' },
  { id: 'ecr',     name: 'ECR / OMR Corridor',  slug: 'ecr-omr' },
];

// ─── Localities ──────────────────────────────────────────────────────────────
export const LOCALITIES = [
  {
    id: 'velachery',
    slug: 'velachery',
    name: 'Velachery',
    zone: 'south',
    pincode: '600042',
    latitude: 12.9791,
    longitude: 80.2203,
    tagline: 'South Chennai IT residential hub with direct MRTS access.',
    description: `Velachery is Chennai's most sought-after rental neighbourhood for OMR and Guindy techies. Sitting at the junction of Velachery Bypass Road, Vijayanagar and Baby Nagar, it offers a mix of independent houses, builder apartments, and gated communities. The MRTS Velachery station gives direct access to Chennai Beach and Chepauk, while Vijayanagar Bus Terminus connects to OMR, T. Nagar, and Tambaram.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000–₹15,000', note: 'Independent units near Vijayanagar or Baby Nagar.' },
      { bhk: '2 BHK', range: '₹18,000–₹26,000', note: 'Builder apartments in Dhandeeswaram & Tansi Nagar.' },
      { bhk: '3 BHK', range: '₹28,000–₹42,000', note: 'Gated communities near Bypass Road.' },
    ],
    waterReality: { score: 7, status: 'Decent Metro Water in central pockets', detail: 'Dhandeeswaram Nagar and Gandhi Salai have dependable Metro Water. Low-lying interior roads face salty groundwater in summer.' },
    floodCheck: { risk: 'high-caution', detail: 'Avoid ground floors in Baby Nagar, AGS Colony, Ram Nagar South. Safer: Dhandeeswaram Nagar, elevated Bypass Road sectors.' },
    commute: { metro: 'Velachery MRTS (Beach–Chengalpattu line). Phase 2 extension upcoming.', bus: 'Vijayanagar Bus Terminus — direct to OMR, T. Nagar, Central, Tambaram.', road: '5-min drive to Taramani Tidel Park via Taramani Link Road.' },
    nearbyItParks: ['Tidel Park', 'Ascendas ITPK', 'Ramanujan IT City', 'SP Infocity'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'taramani', name: 'Taramani', note: '5 mins, IT park hub' },
      { slug: 'perungudi', name: 'Perungudi', note: '10 mins, OMR corridor' },
      { slug: 'adyar', name: 'Adyar', note: '15 mins, premium coastal' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '12 mins, affordable south' },
    ],
    nearbyMetro: [
      { name: 'Velachery MRTS', line: 'MRTS', distanceKm: 0.5 },
    ],
    faqs: [
      { q: 'Which parts of Velachery are safe from flooding?', a: 'Dhandeeswaram Nagar, elevated portions near Velachery Bypass, and sectors around Phoenix Marketcity generally stay accessible. Always inspect the plinth level.' },
      { q: 'What is the typical advance deposit in Velachery?', a: 'Landlords ask 6–10 months, but with stable employment proof and direct bank transfer offers, most deals close at 4–6 months.' },
      { q: 'Are bachelors allowed to rent in Velachery?', a: 'Yes, especially in builder-floor apartments and gated communities. Some independent house owners on inner temple streets prefer families.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Flats for Rent in Velachery, Chennai | Chennai Rents',
      description: 'Find flats and apartments for rent in Velachery, Chennai. Real rent rates, water reports, flood history. 1, 2, 3 BHK listings. No brokerage.',
      h1: 'Flats for Rent in Velachery, Chennai',
    },
  },
  {
    id: 'taramani',
    slug: 'taramani',
    name: 'Taramani',
    zone: 'south',
    pincode: '600113',
    latitude: 12.9891,
    longitude: 80.2432,
    tagline: 'Prime IT park residential with walkable access to Tidel Park.',
    description: `Taramani is Chennai's most IT-adjacent residential neighbourhood, sitting a short walk or auto ride from Tidel Park, Ascendas ITPK, and Ramanujan IT City. The area offers a dense mix of independent house portions, builder apartments, and a growing PG ecosystem for working professionals.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000–₹14,000', note: 'Independent portions near CSIR Colony.' },
      { bhk: '2 BHK', range: '₹17,000–₹25,000', note: 'Builder floors near CLRI Colony.' },
      { bhk: '3 BHK', range: '₹26,000–₹38,000', note: 'Gated apartments near SRP Tools Road.' },
      { bhk: 'PG/Room', range: '₹5,000–₹9,000/person', note: 'Dense PG cluster for Tidel Park employees.' },
    ],
    waterReality: { score: 7.5, status: 'Good Metro Water supply', detail: 'Main streets have reliable Metro Water. CSIR Colony and SRP Tools area have good infrastructure.' },
    floodCheck: { risk: 'moderate', detail: 'Taramani Link Road stays accessible. Inner residential streets near canals can see temporary waterlogging.' },
    commute: { metro: 'Taramani MRTS on the Beach–Chengalpattu line.', bus: 'Direct MTC buses to T. Nagar, Central, and Velachery.', road: 'Direct Taramani Link Road to Velachery, Perungudi, and OMR.' },
    nearbyItParks: ['Tidel Park (walkable)', 'Ascendas ITPK', 'Ramanujan IT City'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'velachery', name: 'Velachery', note: '5 mins, MRTS hub' },
      { slug: 'perungudi', name: 'Perungudi', note: '8 mins, OMR IT parks' },
      { slug: 'sholinganallur', name: 'Sholinganallur', note: '15 mins, OMR corridor' },
    ],
    nearbyMetro: [{ name: 'Taramani MRTS', line: 'MRTS', distanceKm: 0.3 }],
    faqs: [
      { q: 'Is Taramani suitable for bachelors?', a: 'Yes. Taramani has the densest PG and bachelor-friendly rental ecosystem in South Chennai, driven by demand from Tidel Park and Ascendas employees.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Taramani, Chennai | Chennai Rents',
      description: 'Find 1, 2, 3 BHK flats, PG, and apartments for rent in Taramani, Chennai near Tidel Park and Ascendas. Real rent rates, no brokerage.',
      h1: 'Flats for Rent in Taramani, Chennai',
    },
  },
  {
    id: 'sholinganallur',
    slug: 'sholinganallur',
    name: 'Sholinganallur',
    zone: 'south',
    pincode: '600119',
    latitude: 12.9007,
    longitude: 80.2278,
    tagline: 'OMR IT corridor anchor with large gated townships.',
    description: `Sholinganallur is the residential anchor of the OMR IT corridor, home to large gated communities, tree-lined avenues, and excellent social infrastructure. RMZ Millenia, Tidel Park Phase 2, and multiple tech campuses make this a first-choice neighbourhood for IT professionals and families.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹11,000–₹16,000', note: 'Independent units near 100 Feet Road.' },
      { bhk: '2 BHK', range: '₹20,000–₹30,000', note: 'Gated community apartments.' },
      { bhk: '3 BHK', range: '₹32,000–₹50,000', note: 'Large township units with club facilities.' },
    ],
    waterReality: { score: 7, status: 'Mixed — gated communities have borewells, independent streets rely on tankers', detail: 'Large gated townships maintain independent water supply. Independent pockets on side streets face summer tanker dependency.' },
    floodCheck: { risk: 'moderate', detail: 'Low-lying areas near Sholinganallur lake can waterlog. Elevated gated communities stay dry.' },
    commute: { metro: 'Sholinganallur Metro (Phase 2, upcoming).', bus: 'Frequent MTC on OMR; direct routes to T. Nagar, Tambaram, Central.', road: 'Direct OMR access. 20 mins to Perungudi, 25 mins to Guindy.' },
    nearbyItParks: ['RMZ Millenia', 'Tidel Park Phase 2', 'DLF IT Park', 'SP Infocity'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'perungudi', name: 'Perungudi', note: '10 mins, northern OMR' },
      { slug: 'thoraipakkam', name: 'Thoraipakkam', note: '5 mins, mid-OMR' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '8 mins, affordable south' },
    ],
    nearbyMetro: [{ name: 'Sholinganallur Metro (Phase 2)', line: 'Metro Phase 2', distanceKm: 1 }],
    faqs: [
      { q: 'Are there gated community apartments in Sholinganallur under ₹25,000?', a: 'Yes, but competitive. 2 BHK units in smaller gated communities along inner roads near Medavakkam-Sholinganallur Road can be found in the ₹20,000–₹25,000 range.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Sholinganallur, Chennai | Chennai Rents',
      description: 'Find 1, 2, 3 BHK flats for rent in Sholinganallur, Chennai near OMR IT parks. Real rent rates, no brokerage.',
      h1: 'Flats for Rent in Sholinganallur, Chennai',
    },
  },
  {
    id: 'thoraipakkam',
    slug: 'thoraipakkam',
    name: 'Thoraipakkam',
    zone: 'south',
    pincode: '600097',
    latitude: 12.9322,
    longitude: 80.2297,
    tagline: 'Mid-OMR sweet spot between affordability and IT proximity.',
    description: `Thoraipakkam sits between Perungudi and Sholinganallur on OMR, offering a sweet spot of affordable rents and strong IT park access. Independent house portions, builder flats, and affordable gated communities make it a practical choice for first-time renters.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹9,000–₹14,000', note: 'Independent portions on parallel streets.' },
      { bhk: '2 BHK', range: '₹16,000–₹24,000', note: 'Builder apartments near 100 Feet Bypass.' },
      { bhk: '3 BHK', range: '₹26,000–₹38,000', note: 'Gated community units with parking.' },
    ],
    waterReality: { score: 6.5, status: 'Moderate — main streets OK, inner streets tanker-dependent', detail: 'OMR-facing main road apartments have Metro Water. Interior residential streets rely on tankers in summer.' },
    floodCheck: { risk: 'low-moderate', detail: 'Generally drains well. Some low-lying pockets near old canal face temporary flooding.' },
    commute: { metro: 'Perungudi Metro (Phase 2) 3 km north; Sholinganallur 4 km south.', bus: 'OMR MTC routes frequent. Thoraipakkam junction is a key stop.', road: 'Direct OMR. 15 mins to Perungudi, 10 mins to Sholinganallur.' },
    nearbyItParks: ['Perungudi IT SEZ', 'Sholinganallur tech parks', 'RMZ Millenia'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'perungudi', name: 'Perungudi', note: '7 mins, IT SEZ' },
      { slug: 'sholinganallur', name: 'Sholinganallur', note: '8 mins, OMR anchor' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '10 mins, affordable' },
    ],
    nearbyMetro: [{ name: 'Perungudi Metro (Phase 2)', line: 'Metro Phase 2', distanceKm: 3 }],
    faqs: [
      { q: 'Is Thoraipakkam a good location for IT professionals?', a: 'Yes. Thoraipakkam offers affordable rents with excellent access to OMR IT parks. You get more space per rupee compared to Perungudi or Sholinganallur.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Thoraipakkam, Chennai | Chennai Rents',
      description: 'Find flats for rent in Thoraipakkam, Chennai. 1, 2, 3 BHK apartments near OMR IT corridor. Real rent rates, no brokerage.',
      h1: 'Flats for Rent in Thoraipakkam, Chennai',
    },
  },
  {
    id: 'perungudi',
    slug: 'perungudi',
    name: 'Perungudi',
    zone: 'south',
    pincode: '600096',
    latitude: 12.9604,
    longitude: 80.2434,
    tagline: 'Northern OMR gateway with IT SEZ and residential townships.',
    description: `Perungudi anchors the northern end of the OMR IT corridor. Home to Perungudi TIDCO IT SEZ, Olympia Tech Park, and large residential townships, it offers premium options for senior professionals and families who want OMR convenience without going deep into the corridor.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹11,000–₹17,000', note: 'Compact units near TIDCO back gate.' },
      { bhk: '2 BHK', range: '₹20,000–₹30,000', note: 'Builder and township apartments.' },
      { bhk: '3 BHK', range: '₹32,000–₹50,000', note: 'Premium gated community units.' },
    ],
    waterReality: { score: 7, status: 'Good Metro Water in established sectors', detail: 'Perungudi has well-developed water infrastructure. New residential pockets on OMR side streets can face tanker reliance.' },
    floodCheck: { risk: 'low', detail: 'Perungudi is generally elevated. Established residential areas stay dry during heavy rains.' },
    commute: { metro: 'Perungudi Metro (Phase 2) upcoming.', bus: 'MTC routes on OMR and Perungudi Inner Ring Road.', road: '20 mins to central Chennai via Inner Ring Road.' },
    nearbyItParks: ['Perungudi TIDCO IT SEZ', 'Olympia Tech Park', 'RMZ Millenia (nearby)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'thoraipakkam', name: 'Thoraipakkam', note: '7 mins south' },
      { slug: 'taramani', name: 'Taramani', note: '8 mins west' },
      { slug: 'velachery', name: 'Velachery', note: '10 mins west' },
    ],
    nearbyMetro: [
      { name: 'Perungudi Metro (Phase 2)', line: 'Metro Phase 2', distanceKm: 1 },
      { name: 'Taramani MRTS', line: 'MRTS', distanceKm: 2 },
    ],
    faqs: [
      { q: 'Are there flats near Olympia Tech Park in Perungudi?', a: 'Yes. Several independent house portions and small apartments are within 500m–1km of Olympia Tech Park on Perungudi inner residential streets.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Perungudi, Chennai | Chennai Rents',
      description: 'Find flats for rent in Perungudi, Chennai near OMR IT SEZ. 1, 2, 3 BHK verified listings. Real rent rates, owner contact.',
      h1: 'Flats for Rent in Perungudi, Chennai',
    },
  },
  {
    id: 'adyar',
    slug: 'adyar',
    name: 'Adyar',
    zone: 'south',
    pincode: '600020',
    latitude: 13.0002,
    longitude: 80.2565,
    tagline: 'Premium coastal living with tree-lined avenues and cultural heritage.',
    description: `Adyar is one of Chennai's greenest and most prestigious localities, offering tree-lined boulevards, Besant Nagar beach proximity, and classic South Chennai tranquility. Gandhi Nagar, Shastri Nagar, and Kasturba Nagar are its most sought-after residential pockets.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹14,000–₹20,000', note: 'Rare independent portions in Kasturba Nagar.' },
      { bhk: '2 BHK', range: '₹26,000–₹40,000', note: 'Residential apartments in Shastri Nagar & Gandhi Nagar.' },
      { bhk: '3 BHK', range: '₹45,000–₹75,000+', note: 'Luxury apartments and heritage bungalow floors.' },
    ],
    waterReality: { score: 8.5, status: 'Excellent Metro Water', detail: 'Adyar has some of the cleanest Metro Water piped supplies in the city.' },
    floodCheck: { risk: 'low', detail: 'Most parts of Gandhi Nagar and Shastri Nagar drained cleanly within hours during 2023 rains. River-facing low banks require caution.' },
    commute: { metro: 'Adyar Metro (Phase 2) upcoming at Adyar Depot.', bus: 'Adyar Bus Depot is a major transit interchange for North & South Chennai.', road: 'Direct ECR coastal highway, OMR tech corridor, and Mylapore heritage hub.' },
    nearbyItParks: ['Tidel Park (20 mins)', 'Guindy Industrial Estate (15 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'velachery', name: 'Velachery', note: '15 mins, IT hub' },
      { slug: 'taramani', name: 'Taramani', note: '12 mins, IT park hub' },
      { slug: 't-nagar', name: 'T. Nagar', note: '15 mins, central' },
    ],
    nearbyMetro: [{ name: 'Adyar Metro (Phase 2)', line: 'Metro Phase 2', distanceKm: 1.5 }],
    faqs: [
      { q: 'Are bachelors welcome in Adyar?', a: 'Traditional resident welfare associations are strict about family tenancy. However, independent portions on 2nd floors and newer apartments along LB Road welcome working professionals.' },
      { q: 'What are the typical rent ranges in Adyar for 2 BHK?', a: 'Expect ₹26,000 to ₹40,000 for a standard 2 BHK in Gandhi Nagar or Shastri Nagar. Heritage bungalow floors command even higher rents.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Flats for Rent in Adyar, Chennai | Chennai Rents',
      description: 'Find premium flats and apartments for rent in Adyar, Chennai. 1, 2, 3 BHK listings in Gandhi Nagar, Shastri Nagar. Real rent rates.',
      h1: 'Flats for Rent in Adyar, Chennai',
    },
  },
  {
    id: 't-nagar',
    slug: 't-nagar',
    name: 'T. Nagar',
    zone: 'central',
    pincode: '600017',
    latitude: 13.0390,
    longitude: 80.2352,
    tagline: 'Commercial heart of Chennai with Metro access and vibrant street culture.',
    description: `T. Nagar (Thyagaraya Nagar) is Chennai's retail and commercial heartland, famous for Ranganathan Street and Pondy Bazaar. Its residential pockets — Burkit Road, North Usman Road, Venkatnarayana Road — offer strong Metro connectivity and city-center convenience.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹12,000–₹18,000', note: 'Independent units on residential cross streets.' },
      { bhk: '2 BHK', range: '₹22,000–₹35,000', note: 'Apartments near Mambalam Station.' },
      { bhk: '3 BHK', range: '₹40,000–₹65,000', note: 'Premium apartments near Mambalam Station.' },
    ],
    waterReality: { score: 8, status: 'Good Metro Water with established infrastructure', detail: 'T. Nagar has well-established Metro Water connections across most residential streets.' },
    floodCheck: { risk: 'low', detail: 'Central T. Nagar generally drains well. Low-lying pockets near Mambalam canal require caution.' },
    commute: { metro: 'Mambalam Metro Station on Green Line.', bus: 'T. Nagar Bus Terminus — largest in South India.', road: 'Central location — all city access within 20 mins.' },
    nearbyItParks: ['Guindy Industrial Estate (15 mins)', 'Tidel Park (20 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'nungambakkam', name: 'Nungambakkam', note: '10 mins, premium' },
      { slug: 'anna-nagar', name: 'Anna Nagar', note: '15 mins, planned avenues' },
      { slug: 'valasaravakkam', name: 'Valasaravakkam', note: '15 mins, west Chennai' },
      { slug: 'adyar', name: 'Adyar', note: '15 mins, coastal' },
    ],
    nearbyMetro: [
      { name: 'Mambalam Metro', line: 'Green Line', distanceKm: 0.5 },
      { name: 'T. Nagar Metro', line: 'Green Line', distanceKm: 1 },
    ],
    faqs: [
      { q: 'Is T. Nagar good for residential rental living?', a: 'Yes, the residential pockets behind the commercial strips — particularly Burkit Road and Venkatnarayana Road — are well-established and peaceful. Metro access is excellent.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement Guide' },
    ],
    seo: {
      title: 'Flats for Rent in T. Nagar, Chennai | Chennai Rents',
      description: 'Find flats for rent in T. Nagar, Chennai. 1, 2, 3 BHK apartments near Metro. Real rent rates, no brokerage.',
      h1: 'Flats for Rent in T. Nagar, Chennai',
    },
  },
  {
    id: 'nungambakkam',
    slug: 'nungambakkam',
    name: 'Nungambakkam',
    zone: 'central',
    pincode: '600034',
    latitude: 13.0579,
    longitude: 80.2440,
    tagline: 'Premium tree-lined avenues with consulate proximity and city access.',
    description: `Nungambakkam is one of Chennai's most premium residential addresses, known for tree-lined roads, proximity to consulates, the British Council, and Alliance Française. Large heritage bungalows converted to apartments and premium residential complexes define the area.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹16,000–₹24,000', note: 'Compact units in residential cross streets.' },
      { bhk: '2 BHK', range: '₹30,000–₹50,000', note: 'Premium apartments near Nungambakkam High Road.' },
      { bhk: '3 BHK', range: '₹55,000–₹90,000+', note: 'Heritage bungalow floors and luxury apartments.' },
    ],
    waterReality: { score: 8.5, status: 'Excellent — established Metro Water infrastructure', detail: 'Nungambakkam has excellent Metro Water supply, one of the best in the city.' },
    floodCheck: { risk: 'low', detail: 'Elevated central location. Drains quickly. No significant flood history.' },
    commute: { metro: 'Nungambakkam Metro on Blue Line.', bus: 'Direct MTC buses on Nungambakkam High Road.', road: 'Central — 10 mins to Central Chennai, 20 mins to OMR.' },
    nearbyItParks: ['DLF Cybercity Guindy (20 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 't-nagar', name: 'T. Nagar', note: '10 mins, commercial' },
      { slug: 'anna-nagar', name: 'Anna Nagar', note: '12 mins, planned zone' },
      { slug: 'valasaravakkam', name: 'Valasaravakkam', note: '20 mins, west' },
    ],
    nearbyMetro: [{ name: 'Nungambakkam Metro', line: 'Blue Line', distanceKm: 0.3 }],
    faqs: [
      { q: 'Who typically rents in Nungambakkam?', a: 'Consulate staff, senior executives, expats, and professionals who value central city access, quiet avenues, and prestige addresses.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Nungambakkam, Chennai | Chennai Rents',
      description: 'Find premium flats for rent in Nungambakkam, Chennai. 2, 3 BHK apartments near Metro. Real rent rates for professionals and expats.',
      h1: 'Flats for Rent in Nungambakkam, Chennai',
    },
  },
  {
    id: 'valasaravakkam',
    slug: 'valasaravakkam',
    name: 'Valasaravakkam',
    zone: 'west',
    pincode: '600087',
    latitude: 13.0509,
    longitude: 80.1833,
    tagline: 'West Chennai residential sweet spot between Porur and Vadapalani.',
    description: `Valasaravakkam is the sweet spot between Vadapalani's film-city buzz and Porur's IT corridor. Arcot Road runs through Kesavardhini, Alwarthirunagar, and Choudhary Nagar. Upcoming Metro Line 4 stations will transform connectivity significantly.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹8,500–₹13,000', note: 'Single working pros. Mostly independent house portions.' },
      { bhk: '2 BHK', range: '₹15,000–₹22,000', note: 'Standard residential apartments near Kesavardhini.' },
      { bhk: '3 BHK', range: '₹24,000–₹35,000', note: 'Spacious builder floors with covered car parking.' },
      { bhk: 'Bachelors', range: '₹5,000–₹8,000/person', note: 'Shared 2/3 BHK units.' },
    ],
    waterReality: { score: 6.5, status: 'Moderate — summer tanker reliance', detail: 'Main avenues have Metro Water. Interior streets rely on private tankers in peak summer (₹1,200–₹1,800 per load).' },
    floodCheck: { risk: 'moderate', detail: 'During Cyclone Michaung (Dec 2023), water stagnation occurred around Alwarthirunagar 1st Main. Elevated plots near Kesavardhini stayed dry.' },
    commute: { metro: 'Upcoming Metro Line 4 stations at Alwarthirunagar and Valasaravakkam Junction.', bus: 'Direct MTC buses to Anna Square, Broadway, T. Nagar.', road: '10-min drive to Porur DLF Cybercity via Mount-Poonamallee Road.' },
    nearbyItParks: ['DLF Cybercity Porur (10 mins)', 'L&T Infotech (12 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'porur', name: 'Porur', note: 'IT SEZ hub, 5 mins' },
      { slug: 't-nagar', name: 'T. Nagar', note: 'Central shopping, 15 mins' },
      { slug: 'nungambakkam', name: 'Nungambakkam', note: '20 mins, consulate belt' },
    ],
    nearbyMetro: [
      { name: 'Alwarthirunagar (Metro Line 4, upcoming)', line: 'Metro Line 4', distanceKm: 1 },
      { name: 'Vadapalani Metro', line: 'Green Line', distanceKm: 3 },
    ],
    faqs: [
      { q: 'How much advance deposit do landlords ask in Valasaravakkam?', a: 'Landlords traditionally ask 6–10 months. With employment proof and ECS payment offer, most deals close at 4–6 months.' },
      { q: 'Are bachelors allowed to rent in Valasaravakkam?', a: 'Yes, especially near Porur link roads and Alwarthirunagar. Some traditional house owners on inner temple streets prefer families.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Flats for Rent in Valasaravakkam, Chennai | Chennai Rents',
      description: 'Find flats for rent in Valasaravakkam, Chennai. 1, 2, 3 BHK listings near Porur IT corridor. Real rent rates, water reports, no brokerage.',
      h1: 'Flats for Rent in Valasaravakkam, Chennai',
    },
  },
  {
    id: 'porur',
    slug: 'porur',
    name: 'Porur',
    zone: 'west',
    pincode: '600116',
    latitude: 13.0360,
    longitude: 80.1572,
    tagline: 'West Chennai IT hub anchoring DLF Cybercity and L&T Tech Park.',
    description: `Porur is West Chennai's IT employment anchor, home to DLF Cybercity, L&T Technology Services, and several tech campuses. Porur lake adds a green dimension to the neighbourhood.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹9,000–₹14,000', note: 'Compact apartments near IT park back gates.' },
      { bhk: '2 BHK', range: '₹16,000–₹25,000', note: 'Builder apartments on Arcot Road cross streets.' },
      { bhk: '3 BHK', range: '₹26,000–₹38,000', note: 'Large apartments near DLF Cybercity.' },
    ],
    waterReality: { score: 6.5, status: 'Moderate — borewell essential in summer', detail: 'Main roads have Metro Water. Interior residential streets supplement with private tankers in summer.' },
    floodCheck: { risk: 'moderate', detail: 'Porur lake overflow affects adjacent low-lying streets during heavy rains. Elevated apartments above 1st floor are generally safe.' },
    commute: { metro: 'Upcoming Metro Line 4 (Poonamallee–Lighthouse) stations.', bus: 'Frequent MTC on Arcot Road and Mount-Poonamallee Road.', road: '5-min drive to DLF Cybercity, 10 mins to Vadapalani.' },
    nearbyItParks: ['DLF Cybercity', 'L&T Technology Services', 'Mars Telecom'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'valasaravakkam', name: 'Valasaravakkam', note: '5 mins east' },
      { slug: 'anna-nagar', name: 'Anna Nagar', note: '15 mins north-east' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '20 mins south' },
    ],
    nearbyMetro: [
      { name: 'Porur Metro (Line 4, upcoming)', line: 'Metro Line 4', distanceKm: 1 },
      { name: 'Vadapalani Metro', line: 'Green Line', distanceKm: 4 },
    ],
    faqs: [
      { q: 'Are there apartments near DLF Cybercity in Porur under ₹20,000?', a: 'Yes. 1 BHK and compact 2 BHK units on inner streets near Karambakkam Road and Arcot Road cross streets can be found in the ₹14,000–₹20,000 range.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Porur, Chennai | Chennai Rents',
      description: 'Find flats for rent in Porur, Chennai near DLF Cybercity. 1, 2, 3 BHK apartments. Real rent rates, no brokerage.',
      h1: 'Flats for Rent in Porur, Chennai',
    },
  },
  {
    id: 'medavakkam',
    slug: 'medavakkam',
    name: 'Medavakkam',
    zone: 'south',
    pincode: '600100',
    latitude: 12.9209,
    longitude: 80.1934,
    tagline: 'Affordable south Chennai with rapid growth and infrastructure.',
    description: `Medavakkam is one of South Chennai's fastest-growing residential corridors, offering affordable rents with good connectivity to OMR IT parks, Pallikaranai, and Velachery. Popular with budget-conscious families and working professionals.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹7,500–₹12,000', note: 'Compact independent units near main road.' },
      { bhk: '2 BHK', range: '₹13,000–₹20,000', note: 'Standard apartments in Medavakkam Colony.' },
      { bhk: '3 BHK', range: '₹20,000–₹30,000', note: 'Builder-floor units with parking.' },
    ],
    waterReality: { score: 6, status: 'Moderate — Metro Water alternate days, tanker supplemented', detail: 'Medavakkam faces water scarcity in peak summer. Ask specifically about daily Metro Water connection.' },
    floodCheck: { risk: 'moderate-high', detail: 'Low-lying areas near Medavakkam lake and Perumbakkam face waterlogging. Prefer 1st floor or above in lake-adjacent streets.' },
    commute: { metro: 'Nearest Metro Phase 2 stations planned at Sholinganallur and Pallikaranai.', bus: 'Direct MTC routes to Velachery, OMR, and Tambaram.', road: '15 mins to Sholinganallur OMR, 10 mins to Velachery Bypass.' },
    nearbyItParks: ['OMR IT Parks (via Sholinganallur, 15 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'sholinganallur', name: 'Sholinganallur', note: '10 mins, OMR hub' },
      { slug: 'perungudi', name: 'Perungudi', note: '12 mins, OMR tech corridor' },
      { slug: 'velachery', name: 'Velachery', note: '15 mins, MRTS access' },
    ],
    nearbyMetro: [{ name: 'Sholinganallur Metro (Phase 2)', line: 'Metro Phase 2', distanceKm: 5 }],
    faqs: [
      { q: 'Is Medavakkam a good option if I work in OMR?', a: 'Yes, especially if budget is a priority. You get significantly more space per rupee compared to Velachery or Sholinganallur, with 15–20 min commute to most OMR IT parks.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Medavakkam, Chennai | Chennai Rents',
      description: 'Find affordable 1, 2, 3 BHK flats for rent in Medavakkam, Chennai. Real rent rates, water reports, and no brokerage listings.',
      h1: 'Flats for Rent in Medavakkam, Chennai',
    },
  },
  {
    id: 'anna-nagar',
    slug: 'anna-nagar',
    name: 'Anna Nagar',
    zone: 'central',
    pincode: '600040',
    latitude: 13.0850,
    longitude: 80.2101,
    tagline: 'Premier planned residential avenues with Tower Park and Metro access.',
    description: `Anna Nagar is one of Chennai's premier master-planned residential neighbourhoods, famous for its wide tree-lined avenues, landmark Anna Nagar Tower Park, high-ranking schools, and vibrant food culture along 2nd Avenue. The neighbourhood features dedicated underground Metro stations on the Green Line (Anna Nagar East and Anna Nagar Tower) connecting directly to Chennai Central and the airport.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹12,000–₹18,000', note: 'Compact builder floors in Western sectors or Shanthi Colony cross streets.' },
      { bhk: '2 BHK', range: '₹22,000–₹32,000', note: 'Standard residential apartments near 2nd Avenue and Shanthi Colony.' },
      { bhk: '3 BHK', range: '₹40,000–₹65,000+', note: 'Premium gated societies and luxury builder floors near Tower Park.' },
    ],
    waterReality: { score: 8.0, status: 'Excellent Metro Water supply', detail: 'Anna Nagar has robust CMWSSB pipeline coverage and deep municipal water infrastructure with high pressure.' },
    floodCheck: { risk: 'low', detail: 'Master-planned grid layout with well-maintained storm water drains. The elevated avenues drain rapidly after heavy monsoon showers.' },
    commute: { metro: 'Anna Nagar East & Anna Nagar Tower Metro stations on Green Line.', bus: 'Anna Nagar Bus Depot — comprehensive MTC connectivity across Chennai.', road: 'Direct access to Inner Ring Road, Poonamallee High Road, and Koyambedu CMBT.' },
    nearbyItParks: ['Ambattur Industrial Estate (10 mins)', 'DLF Cybercity Porur (20 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'nungambakkam', name: 'Nungambakkam', note: '12 mins, consulate hub' },
      { slug: 't-nagar', name: 'T. Nagar', note: '15 mins, retail & commercial' },
      { slug: 'valasaravakkam', name: 'Valasaravakkam', note: '15 mins, west Chennai' },
      { slug: 'porur', name: 'Porur', note: '20 mins, IT corridor' },
    ],
    nearbyMetro: [{ name: 'Anna Nagar Tower Metro', line: 'Green Line', distanceKm: 0.4 }],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Anna Nagar?', a: 'Stand-alone 2 BHK apartments in Anna Nagar range from ₹22,000 to ₹32,000 per month depending on whether it is in East, West, or near Shanthi Colony.' },
      { q: 'Is Anna Nagar safe from waterlogging during monsoons?', a: 'Yes. Anna Nagar has an engineered grid drainage system that reliably prevents prolonged water stagnation, making it one of the safest residential zones in North-Central Chennai.' },
    ],
    relatedGuides: [{ slug: 'advance-deposit-chennai', title: 'Advance Deposit Norms' }],
    seo: {
      title: 'Flats for Rent in Anna Nagar, Chennai | Chennai Rents',
      description: 'Find flats and apartments for rent in Anna Nagar, Chennai. Real rent rates, water reports, flood history. 1, 2, 3 BHK listings. No brokerage.',
      h1: 'Flats for Rent in Anna Nagar, Chennai',
    },
  },
];

// ─── Lookup Helpers ──────────────────────────────────────────────────────────
export const LOCALITY_MAP = Object.fromEntries(LOCALITIES.map(l => [l.slug, l]));
export function getLocalityBySlug(slug) { return LOCALITY_MAP[slug] || null; }
export function getLocalitiesByZone(zoneId) { return LOCALITIES.filter(l => l.zone === zoneId); }
export function getPopularLocalities(limit = 6) { return LOCALITIES.slice(0, limit); }

// ─── SEO Metadata Generator ──────────────────────────────────────────────────
const BHK_LABELS = { '1': '1 BHK', '2': '2 BHK', '3': '3 BHK', '1rk': '1 RK' };
const FURNISHING_LABELS = {
  'fully-furnished': 'Fully Furnished',
  'semi-furnished': 'Semi Furnished',
  'unfurnished': 'Unfurnished',
};
const BUDGET_LABELS = { 10000: '₹10,000', 15000: '₹15,000', 20000: '₹20,000', 25000: '₹25,000', 30000: '₹30,000' };

export function parseIntent(intent) {
  if (!intent) return {};
  if (intent === '1-bhk-for-rent') return { bhk: '1', key: '1bhk' };
  if (intent === '2-bhk-for-rent') return { bhk: '2', key: '2bhk' };
  if (intent === '3-bhk-for-rent') return { bhk: '3', key: '3bhk' };
  if (intent === 'pg') return { propertyType: 'pg', key: 'pg' };
  if (intent === 'fully-furnished-flats-for-rent') return { furnishing: 'fully-furnished', key: 'furnished' };
  if (intent === 'flats-for-rent-under-20000') return { budgetMax: 20000, key: 'budget' };
  if (intent === 'flats-for-rent') return { key: 'flats' };
  return { key: intent };
}

export function generateSEOMeta({ locality, intent, bhk, propertyType, furnishing, budgetMax, city = 'Chennai' }) {
  const parsed = parseIntent(intent);
  const activeBhk = bhk || parsed.bhk;
  const activeProp = propertyType || parsed.propertyType;
  const activeFurn = furnishing || parsed.furnishing;
  const activeBudget = budgetMax || parsed.budgetMax;

  const localityName = locality?.name || city;
  const bhkStr = activeBhk ? `${BHK_LABELS[activeBhk] || activeBhk} ` : '';
  const propStr = activeProp === 'pg' ? 'PG' : 'Flats';
  const furnStr = activeFurn ? `${FURNISHING_LABELS[activeFurn] || ''} ` : '';
  const budgetStr = activeBudget ? ` Under ${BUDGET_LABELS[activeBudget] || `₹${activeBudget}`}` : '';
  const locationStr = locality ? `${localityName}, ${city}` : city;
  const h1 = `${bhkStr}${furnStr}${propStr} for Rent in ${locationStr}${budgetStr}`;
  return {
    h1,
    title: `${h1} | Chennai Rents`,
    description: `Find ${bhkStr.toLowerCase().trim()} ${furnStr.toLowerCase().trim()} ${propStr.toLowerCase()} for rent in ${locationStr}${budgetStr}. Real rent rates, water reports, flood check, owner contact. No brokerage.`.replace(/\s+/g, ' ').trim(),
  };
}

// ─── Indexing Rules ──────────────────────────────────────────────────────────
const INDEXING_THRESHOLDS = { locality: 0, flats: 3, '1bhk': 2, '2bhk': 2, '3bhk': 2, pg: 2, furnished: 2, budget: 2 };
export function shouldIndexPage(pageType, listingCount) {
  return listingCount >= (INDEXING_THRESHOLDS[pageType] ?? 3);
}
export function getIndexingDirective(pageType, listingCount) {
  return shouldIndexPage(pageType, listingCount) ? 'index, follow' : 'noindex, follow';
}

// ─── Redirect Map (old URLs → new canonicals) ──────────────────────────────
export const LEGACY_REDIRECTS = {
  // Legacy /rent-in-* paths
  '/rent-in-velachery': '/chennai/velachery/',
  '/rent-in-adyar': '/chennai/adyar/',
  '/rent-in-valasaravakkam': '/chennai/valasaravakkam/',
  '/rent-in-omr': '/chennai/perungudi/',
  '/rent-in-porur': '/chennai/porur/',
  '/rent-in-sholinganallur': '/chennai/sholinganallur/',
  '/rent-in-taramani': '/chennai/taramani/',
  '/rent-in-medavakkam': '/chennai/medavakkam/',
  '/rent-in-nungambakkam': '/chennai/nungambakkam/',
  '/rent-in-t-nagar': '/chennai/t-nagar/',
  '/rent-in-thoraipakkam': '/chennai/thoraipakkam/',
  '/rent-in-perungudi': '/chennai/perungudi/',
  '/rent-in-anna-nagar': '/chennai/anna-nagar/',

  // Confirmed 404 links to be resolved
  '/flats-for-rent-in-adambakkam-chennai': '/chennai/velachery/',
  '/flats-for-rent-in-besant-nagar-chennai': '/chennai/adyar/',
  '/flats-for-rent-in-egmore-chennai': '/chennai/rentals/',
  '/flats-for-rent-in-kodambakkam-chennai': '/chennai/t-nagar/',
  '/flats-for-rent-in-mogappair-chennai': '/chennai/anna-nagar/',
  '/flats-for-rent-in-mylapore-chennai': '/chennai/adyar/',
  '/flats-for-rent-in-pallikaranai-chennai': '/chennai/medavakkam/',
  '/flats-for-rent-in-vadapalani-chennai': '/chennai/valasaravakkam/',
  '/flats-for-rent-in-virugambakkam-chennai': '/chennai/valasaravakkam/',
  '/rent/rent-in-valasaravakkam': '/chennai/valasaravakkam/',
  '/rent/rent-in-velachery': '/chennai/velachery/',

  // Locality canonical unification (/flats-for-rent-in-:locality-chennai -> /chennai/:locality/)
  '/flats-for-rent-in-velachery-chennai': '/chennai/velachery/',
  '/flats-for-rent-in-taramani-chennai': '/chennai/taramani/',
  '/flats-for-rent-in-sholinganallur-chennai': '/chennai/sholinganallur/',
  '/flats-for-rent-in-thoraipakkam-chennai': '/chennai/thoraipakkam/',
  '/flats-for-rent-in-perungudi-chennai': '/chennai/perungudi/',
  '/flats-for-rent-in-adyar-chennai': '/chennai/adyar/',
  '/flats-for-rent-in-t-nagar-chennai': '/chennai/t-nagar/',
  '/flats-for-rent-in-nungambakkam-chennai': '/chennai/nungambakkam/',
  '/flats-for-rent-in-valasaravakkam-chennai': '/chennai/valasaravakkam/',
  '/flats-for-rent-in-porur-chennai': '/chennai/porur/',
  '/flats-for-rent-in-medavakkam-chennai': '/chennai/medavakkam/',
  '/flats-for-rent-in-anna-nagar-chennai': '/chennai/anna-nagar/',

  // Guides canonical unification (/guide/:slug -> /guides/:slug/)
  '/guide/advance-deposit-chennai': '/guides/advance-deposit-chennai/',
  '/guide/tenant-rules-chennai': '/guides/tenant-rules-chennai/',
  '/advance-deposit-chennai': '/guides/advance-deposit-chennai/',
  '/tenant-rules-chennai': '/guides/tenant-rules-chennai/',

  // HTML extensions redirection
  '/contact.html': '/contact/',
  '/privacy.html': '/privacy/',
};

// ─── City Hub Config ─────────────────────────────────────────────────────────
export const CITY_HUB = {
  city: 'Chennai',
  slug: 'chennai',
  topLocalities: ['velachery','sholinganallur','adyar','valasaravakkam','taramani','perungudi','t-nagar','porur','thoraipakkam','medavakkam','anna-nagar'],
  bhkHubs: [
    { bhk: '1', label: '1 BHK Flats for Rent in Chennai', slug: '1-bhk-for-rent' },
    { bhk: '2', label: '2 BHK Flats for Rent in Chennai', slug: '2-bhk-for-rent' },
    { bhk: '3', label: '3 BHK Flats for Rent in Chennai', slug: '3-bhk-for-rent' },
  ],
};
