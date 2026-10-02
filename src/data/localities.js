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
      { slug: 'adambakkam', name: 'Adambakkam', note: '10 mins, family residential' },
      { slug: 'pallikaranai', name: 'Pallikaranai', note: '12 mins, affordable south' },
      { slug: 'adyar', name: 'Adyar', note: '15 mins, premium coastal' },
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
      { slug: 'besant-nagar', name: 'Besant Nagar', note: '5 mins, beachside' },
      { slug: 'velachery', name: 'Velachery', note: '15 mins, IT hub' },
      { slug: 'mylapore', name: 'Mylapore', note: '10 mins, heritage' },
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
      { slug: 'kodambakkam', name: 'Kodambakkam', note: '8 mins, cinema belt' },
      { slug: 'mylapore', name: 'Mylapore', note: '10 mins, heritage' },
      { slug: 'anna-nagar', name: 'Anna Nagar', note: '15 mins, planned avenues' },
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
      { slug: 'egmore', name: 'Egmore', note: '10 mins' },
      { slug: 't-nagar', name: 'T. Nagar', note: '10 mins, commercial' },
      { slug: 'anna-nagar', name: 'Anna Nagar', note: '12 mins, planned zone' },
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
    tamilName: 'வலசரவாக்கம்',
    tamilHeading: 'வலசரவாக்கம் வாடகை வீடுகள் (Houses for Rent in Valasaravakkam)',
    zone: 'west',
    pincode: '600087',
    latitude: 13.0509,
    longitude: 80.1833,
    tagline: 'West Chennai residential sweet spot between DLF Porur IT corridor and Vadapalani.',
    description: `Valasaravakkam is West Chennai’s premier residential corridor along Arcot Road, positioned strategically between the DLF Porur IT SEZ and Vadapalani’s entertainment & metro junction. Known for upscale residential avenues like Kesavardhini, Alwarthirunagar, and Chowdry Nagar, it offers rapid access to top hospitals, schools, and upcoming Chennai Metro Phase 2 Line 4 stations.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹8,500–₹13,500', note: 'Independent house portions in Alwarthirunagar & Arcot Road cross streets.' },
      { bhk: '2 BHK', range: '₹14,000–₹21,000', note: 'Builder floors in Venugopal Nagar & Chowdry Nagar.' },
      { bhk: '3 BHK', range: '₹22,000–₹32,000', note: 'Spacious independent residences with covered car parking.' },
      { bhk: 'PG / Co-living', range: '₹5,000–₹9,500', note: 'Shared accommodations for DLF techies & media professionals.' },
    ],
    waterReality: { score: 6.8, status: 'Metro Water on main avenues; summer tanker supplementation', detail: 'Kesavardhini and main Arcot Road avenues receive regular Metro Water. Inner residential colonies supplement with private tankers in peak summer months (₹1,200–₹1,800/tanker).' },
    floodCheck: { risk: 'moderate', detail: 'Elevated layouts near Kesavardhini and Arcot Road remain safe. Low-lying pockets around Alwarthirunagar 1st Main require checking street drainage plinth levels.' },
    commute: {
      metro: 'Upcoming Chennai Metro Line 4 stations at Alwarthirunagar and Valasaravakkam Junction. Vadapalani Metro interchange is 3 km away.',
      bus: 'Direct MTC buses on Arcot Road (Route 25G to Anna Square, 37G to Broadway, 17D to Broadway).',
      road: 'Direct Arcot Road artery; 10-minute drive to DLF Cybercity Porur via Mount–Poonamallee Road; 15 mins to Vadapalani.'
    },
    nearbyItParks: ['DLF Cybercity Porur (10 mins)', 'L&T Infotech (12 mins)', 'RMZ One Paramount (14 mins)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'porur', name: 'Porur', note: 'IT SEZ hub, 5 mins' },
      { slug: 'vadapalani', name: 'Vadapalani', note: 'Metro interchange, 8 mins' },
      { slug: 'virugambakkam', name: 'Virugambakkam', note: 'Quiet residential, 5 mins' },
    ],
    nearbyMetro: [
      { name: 'Alwarthirunagar (Metro Line 4, upcoming)', line: 'Metro Line 4', distanceKm: 1 },
      { name: 'Vadapalani Metro', line: 'Green Line', distanceKm: 3 },
    ],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Valasaravakkam?', a: 'A typical 2 BHK builder floor in Valasaravakkam rents between ₹14,000 and ₹21,000 per month, with a verified median of ₹17,000. Rent varies based on Metro Water availability and distance from Arcot Road.' },
      { q: 'How close is Valasaravakkam to DLF Cybercity Porur?', a: 'Valasaravakkam is approximately 3.5 km from DLF Cybercity Porur, taking just 10 to 12 minutes by two-wheeler or car via Mount-Poonamallee Road.' },
      { q: 'What is the advance deposit norm in Valasaravakkam?', a: 'Standard owner asks range from 6 to 10 months, but most verified tenants successfully negotiate 4 to 6 months with salaried credentials.' },
      { q: 'Will the upcoming Metro Line 4 affect Valasaravakkam rents?', a: 'Yes. With Metro Line 4 stations at Alwarthirunagar and Valasaravakkam connecting directly to Light House and Poonamallee, rental demand and rental yields are appreciating steadily.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Rent in Valasaravakkam, Chennai — Rates, Deposits & Locality Guide',
      description: 'Find flats & houses for rent in Valasaravakkam, Chennai. Verified 1, 2, 3 BHK rents (₹8.5k–₹32k), water scores, DLF commute & deposit guide. Zero brokerage.',
      h1: 'Rent in Valasaravakkam, Chennai — Rates, Deposits & Locality Guide',
    },
  },
  {
    id: 'tambaram',
    slug: 'tambaram',
    name: 'Tambaram',
    tamilName: 'தாம்பரம்',
    tamilHeading: 'தாம்பரம் வாடகை வீடுகள் (Houses for Rent in Tambaram)',
    zone: 'south',
    pincode: '600045',
    latitude: 12.9249,
    longitude: 80.1000,
    tagline: 'South Chennai major transport gateway, railway junction, and affordable residential anchor.',
    description: `Tambaram is South Chennai’s premier transit gateway and residential nerve centre along the GST Road corridor. Divided into East Tambaram (residential, green, home to Madras Christian College) and West Tambaram (bustling commercial hub and transit terminus), it connects seamlessly to MEPZ, Perungalathur, and the OMR corridor via the Tambaram–Velachery Main Road. Renowned for spacious independent houses, family-friendly builder floors, and highly affordable rents compared to central Chennai.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹6,000–₹9,500', note: 'Independent portions in East Tambaram, Camp Road, and Selaiyur.' },
      { bhk: '2 BHK', range: '₹9,500–₹15,000', note: 'Builder flats in Kadaperi, Sanatorium, and GST corridor.' },
      { bhk: '3 BHK', range: '₹15,000–₹23,000', note: 'Gated apartments along Tambaram–Velachery Main Road.' },
      { bhk: 'PG / Co-living', range: '₹4,000–₹8,000', note: 'Student & fresher accommodations near MCC College and Sanatorium.' },
    ],
    waterReality: { score: 7.0, status: 'Good groundwater; municipal supply active in established sectors', detail: 'East Tambaram and Camp Road enjoy stable sweet groundwater. Areas closer to GST road and West Tambaram have consistent municipal water distribution.' },
    floodCheck: { risk: 'moderate', detail: 'Elevated sectors in East Tambaram and Camp Road stay dry. Caution advised on ground floors in Mudichur lowlands and lake-overflow zones.' },
    commute: {
      metro: 'Tambaram Railway Station connects via suburban train to Guindy, Central, and Beach every 5–10 mins. Airport Metro is 15 mins by suburban rail/cab.',
      bus: 'Tambaram MTC Bus Terminus with direct, high-frequency services to Broadway, T. Nagar, CMBT, and OMR. Kilambakkam KCBT bus terminus is just 15 mins south.',
      road: 'Direct access to GST Road (NH 32), Tambaram–Velachery Main Road, and Outer Ring Road (ORR).'
    },
    nearbyItParks: ['MEPZ (Madras Export Processing Zone - 5 mins)', 'Shriram The Gateway SEZ (Perungalathur - 8 mins)', 'Guindy Olympia Tech Park (22 mins via train)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'chromepet', name: 'Chromepet', note: '5 mins north, GST corridor' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '12 mins east, connecting OMR' },
      { slug: 'velachery', name: 'Velachery', note: '20 mins via Velachery Main Rd' },
    ],
    nearbyMetro: [
      { name: 'Tambaram Suburban Railway Station', line: 'South Suburban Line', distanceKm: 0.2 },
      { name: 'Airport Metro Station', line: 'Blue Line', distanceKm: 8 },
    ],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Tambaram?', a: 'A typical 2 BHK flat in Tambaram rents between ₹9,500 and ₹15,000 per month, with a verified median of ₹12,000 based on verified tenant reports. East Tambaram and Selaiyur command slightly higher rents due to better groundwater and peaceful residential layouts.' },
      { q: 'What is the typical advance deposit in Tambaram?', a: 'Landlords traditionally quote 6 to 10 months deposit, but with standard employment proof and direct bank transfer terms, most rental agreements close at 4 to 6 months advance.' },
      { q: 'Is Tambaram suitable for IT professionals and daily commuters?', a: 'Yes. With suburban electric trains running every 5 to 10 minutes to Guindy and Beach, and MEPZ and Shriram The Gateway SEZ right next door, Tambaram is one of Chennai’s most time-efficient and affordable commuter hubs.' },
      { q: 'Are bachelors and students welcome in Tambaram rentals?', a: 'Yes. Due to Madras Christian College (MCC) and the MEPZ IT corridor, East Tambaram, Sanatorium, and Camp Road have hundreds of bachelor-friendly shared apartments and dedicated PGs.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Rent in Tambaram, Chennai — Rates, Deposits & Locality Guide',
      description: 'Find flats & houses for rent in Tambaram, Chennai. Verified 1, 2, 3 BHK rents (₹6k–₹23k), water reports, flood safety, and deposit guide. Direct owner listings.',
      h1: 'Rent in Tambaram, Chennai — Rates, Deposits & Locality Guide',
    },
  },
  {
    id: 'chromepet',
    slug: 'chromepet',
    name: 'Chromepet',
    tamilName: 'குரோம்பேட்டை',
    tamilHeading: 'குரோம்பேட்டை வாடகை வீடுகள் (Houses for Rent in Chromepet)',
    zone: 'south',
    pincode: '600044',
    latitude: 12.9516,
    longitude: 80.1462,
    tagline: 'High-connectivity GST residential hub with suburban rail, retail streets, and MIT campus.',
    description: `Chromepet is a bustling residential and commercial powerhouse in South Chennai along the GST Road corridor. Anchored by the MIT Anna University campus, Chromepet Railway Station, and vibrant shopping streets along Radha Nagar and CLC Works Road, it is a top preference for airport personnel, MEPZ tech workers, and families seeking great schools and medical infrastructure.`,
    rentRanges: [
      { bhk: '1 BHK', range: '₹6,500–₹10,000', note: 'Independent units in Radha Nagar and Station Road.' },
      { bhk: '2 BHK', range: '₹10,500–₹16,500', note: 'Builder flats in Hasthinapuram and New Colony.' },
      { bhk: '3 BHK', range: '₹16,000–₹25,000', note: 'Gated apartments along GST Road and Nemilichery.' },
      { bhk: 'PG / Co-living', range: '₹4,500–₹8,500', note: 'Student & working women PGs near MIT campus.' },
    ],
    waterReality: { score: 7.2, status: 'Palar water distribution + good sweet borewell water', detail: 'Hasthinapuram and Radha Nagar have dependable municipal Palar water connections. Borewell yields remain reliable year-round.' },
    floodCheck: { risk: 'low-moderate', detail: 'Elevated residential layouts in Hasthinapuram and high-ground sectors near GST road stay completely flood-free. Minimal stagnation on lower lake peripheral lanes.' },
    commute: {
      metro: 'Chromepet Suburban Railway Station is centrally located; Chennai Airport Metro station is just 4 km (10 mins) away.',
      bus: 'Frequent MTC bus connectivity along GST road to Guindy, T. Nagar, CMBT, Central, and Tambaram.',
      road: 'Direct access to GST Road (NH 32) and Hasthinapuram Main Road.'
    },
    nearbyItParks: ['MEPZ (5 mins)', 'Shriram The Gateway SEZ (10 mins)', 'Guindy Tech Zone (15 mins via suburban train)'],
    listingCount: { total: 0, '1bhk': 0, '2bhk': 0, '3bhk': 0, pg: 0, furnished: 0 },
    nearbyLocalities: [
      { slug: 'tambaram', name: 'Tambaram', note: '5 mins south, major transit junction' },
      { slug: 'pallavaram', name: 'Pallavaram', note: '3 mins north, airport proximity' },
      { slug: 'medavakkam', name: 'Medavakkam', note: '15 mins east, OMR connector' },
    ],
    nearbyMetro: [
      { name: 'Chromepet Suburban Railway Station', line: 'South Suburban Line', distanceKm: 0.3 },
      { name: 'Chennai International Airport Metro', line: 'Blue Line', distanceKm: 4 },
    ],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Chromepet?', a: 'A standard 2 BHK flat in Chromepet rents between ₹10,500 and ₹16,500 per month, with a verified median of ₹13,000. Properties in Hasthinapuram and Radha Nagar are most popular among families.' },
      { q: 'How is the commute from Chromepet to central Chennai?', a: 'Suburban trains run every 5 to 10 minutes from Chromepet station, reaching Guindy in 16 minutes and Chennai Beach in 38 minutes, completely bypassing GST road rush hour traffic.' },
      { q: 'Is Chromepet safe from flooding during Chennai monsoons?', a: 'Hasthinapuram, New Colony, and elevated sectors near GST road have high natural elevation and drain efficiently. Avoid basement and low-lying storm canal boundaries.' },
      { q: 'What are the advance deposit practices in Chromepet?', a: 'Owners typically request 6 to 10 months deposit, but 4 to 6 months advance is readily accepted for tenants with verified corporate or institutional credentials.' },
    ],
    relatedGuides: [
      { slug: 'advance-deposit-chennai', title: 'Advance Deposit: 10 Months Myth' },
      { slug: 'tenant-rules-chennai', title: 'Rental Agreement & Tenant Rights' },
    ],
    seo: {
      title: 'Rent in Chromepet, Chennai — Rates, Deposits & Locality Guide',
      description: 'Find flats & houses for rent in Chromepet, Chennai. Verified 1, 2, 3 BHK rents (₹6.5k–₹25k), Palar water status, train commute & deposit guide. Zero brokerage.',
      h1: 'Rent in Chromepet, Chennai — Rates, Deposits & Locality Guide',
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
      { slug: 'vadapalani', name: 'Vadapalani', note: '10 mins east, Metro' },
      { slug: 'mogappair', name: 'Mogappair', note: '10 mins north' },
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
      { slug: 'pallikaranai', name: 'Pallikaranai', note: '7 mins' },
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

export function generateSEOMeta({ locality, intent, bhk, propertyType, furnishing, budgetMax, city = 'Chennai' }) {
  const localityName = locality?.name || city;
  const locationStr = locality ? `${localityName}, ${city}` : city;

  // Specific high-intent child page templates
  if (intent === 'bachelors') {
    const h1 = `Bachelor Houses & Flats for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Find bachelor-friendly flats, single room portions, and shared houses for rent in ${locationStr}. Verified rents, relaxed advance deposit norms, and zero brokerage.`
    };
  }

  if (intent === 'families') {
    const h1 = `Family Houses & Flats for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Explore family houses, builder floors, and 2/3 BHK apartments for rent in ${locationStr}. Verified sweet water availability, flood safety check, top school access & direct owner contact.`
    };
  }

  if (intent === 'co-living-pg' || intent === 'pg') {
    const h1 = `PG & Co-Living Spaces in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Find top-rated PGs and co-living spaces for rent in ${locationStr} for men, women, and working professionals. South Indian food, high-speed WiFi, AC, and 1-month deposit.`
    };
  }

  if (intent === '1-bhk-for-rent' || bhk === '1') {
    const h1 = `1 BHK Flats & Houses for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Browse verified 1 BHK flats, studio apartments, and independent portions for rent in ${locationStr}. Real rent rates, low deposit options, direct landlord listings.`
    };
  }

  if (intent === '2-bhk-for-rent' || bhk === '2') {
    const h1 = `2 BHK Flats & Houses for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Find 2 BHK apartments and builder floors for rent in ${locationStr}. Verified rental medians, Metro Water reports, commute guides, no brokerage.`
    };
  }

  if (intent === '3-bhk-for-rent' || bhk === '3') {
    const h1 = `3 BHK Flats & Houses for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Spacious 3 BHK apartments and gated community houses for rent in ${locationStr}. Covered car parking, verified rates, genuine owner contacts.`
    };
  }

  if (intent === 'fully-furnished-flats-for-rent') {
    const h1 = `Fully Furnished Flats for Rent in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Move-in ready fully furnished flats for rent in ${locationStr}. Equipped with AC, fridge, washing machine, and beds. Verified direct owner listings.`
    };
  }

  if (intent === 'flats-for-rent-under-20000') {
    const h1 = `Flats for Rent Under ₹20,000 in ${locationStr}`;
    return {
      h1,
      title: `${h1} | Chennai Rents`,
      description: `Budget-friendly flats and houses for rent under ₹20,000 in ${locationStr}. Verified rental agreements, zero brokerage, transparent tenant reports.`
    };
  }

  // Locality root hub page default: exactly ONE canonical H1 format
  if (locality && !bhk && !propertyType && !furnishing && !budgetMax) {
    const h1 = `Rent in ${localityName}, Chennai — Rates, Deposits & Locality Guide`;
    return {
      h1,
      title: `Rent in ${localityName}, Chennai — Rates, Deposits & Locality Guide`,
      description: `Find flats & houses for rent in ${localityName}, Chennai. Verified 1, 2, 3 BHK rents, Palar/Metro water reports, train & metro commute, and deposit guide. Direct owner listings.`,
    };
  }

  const bhkStr = bhk ? `${BHK_LABELS[bhk] || bhk} ` : '';
  const propStr = propertyType === 'pg' ? 'PG' : 'Flats';
  const furnStr = furnishing ? `${FURNISHING_LABELS[furnishing] || ''} ` : '';
  const budgetStr = budgetMax ? ` Under ${BUDGET_LABELS[budgetMax] || `₹${budgetMax}`}` : '';
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

// ─── Redirect Map (old URLs → new) ──────────────────────────────────────────
export const LEGACY_REDIRECTS = {
  '/rent-in-velachery': '/chennai/velachery/',
  '/rent-in-adyar': '/chennai/adyar/',
  '/rent-in-valasaravakkam': '/chennai/valasaravakkam/',
  '/rent-in-tambaram': '/chennai/tambaram/',
  '/rent-in-chromepet': '/chennai/chromepet/',
  '/rent-in-omr': '/chennai/perungudi/',
  '/rent-in-porur': '/chennai/porur/',
  '/rent-in-sholinganallur': '/chennai/sholinganallur/',
  '/rent-in-taramani': '/chennai/taramani/',
  '/advance-deposit-chennai': '/guide/advance-deposit-chennai/',
  '/tenant-rules-chennai': '/guide/tenant-rules-chennai/',
};

// ─── City Hub Config ─────────────────────────────────────────────────────────
export const CITY_HUB = {
  city: 'Chennai',
  slug: 'chennai',
  topLocalities: ['tambaram', 'chromepet', 'valasaravakkam', 'velachery', 'sholinganallur', 'adyar', 'taramani', 'perungudi', 't-nagar', 'porur', 'thoraipakkam', 'medavakkam'],
  bhkHubs: [
    { bhk: '1', label: '1 BHK Flats for Rent in Chennai', slug: '1-bhk-for-rent' },
    { bhk: '2', label: '2 BHK Flats for Rent in Chennai', slug: '2-bhk-for-rent' },
    { bhk: '3', label: '3 BHK Flats for Rent in Chennai', slug: '3-bhk-for-rent' },
  ],
};
