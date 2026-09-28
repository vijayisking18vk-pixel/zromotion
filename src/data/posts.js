/**
 * Chennai Rents : Locality and Rental Guide Content Data
 *
 * Grounded in authentic Chennai neighborhood realities:
 * - Real rent figures by BHK
 * - Water reality (Metro Water vs Private Tankers)
 * - Flood check (2015 / 2023 Michaung rainfall notes)
 * - Food spots, commute, schools, hospitals
 * - Reels array with click-to-load metadata
 * - Pure English copy optimized for high Google search ranking
 */

export const POSTS = [
  // ── 1. VALASARAVAKKAM (Locality) ──
  {
    slug: 'rent-in-valasaravakkam',
    type: 'locality',
    title: 'Rent in Valasaravakkam, Chennai: Rents, Areas & Local Guide',
    subheading: 'Your Practical West Chennai Neighborhood Rental Guide',
    tagline: 'Arcot Road buzz, upcoming Metro line, and quiet residential cross-streets. Here is what renting in Valasaravakkam really looks like.',
    badge: 'West Chennai Hub',
    badgeType: 'stamp-yellow',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
    summary: 'Valasaravakkam is a sweet spot between Vadapalani’s film-city buzz and Porur’s IT corridor. Rent ranges from ₹10,000 for a compact 1 BHK to ₹32,000+ for a spacious 3 BHK apartment.',
    
    // Locality Metrics
    rentRanges: [
      { bhk: '1 BHK', range: '₹8,500 - ₹13,000', note: 'Single working pros & newly-weds. Mostly independent house portions.' },
      { bhk: '2 BHK', range: '₹15,000 - ₹22,000', note: 'Standard residential apartments near Kesavardhini or Alwarthirunagar.' },
      { bhk: '3 BHK', range: '₹24,000 - ₹35,000', note: 'Spacious builder floors with covered car parking and lift.' },
      { bhk: 'Bachelors', range: '₹5,000 - ₹8,000 / person', note: 'Shared 2/3 BHK units common among DLF IT employees.' }
    ],

    waterReality: {
      score: '6.5 / 10',
      status: 'Moderate (Summer Tanker Reliance)',
      detail: 'Main avenues have Chennai Metro Water lines (borewell + sump). During peak summer (May-July), interior streets between Arcot Road and Choudhary Nagar rely on private tanker supply (around ₹1,200 - ₹1,800 per load shared among flats).'
    },

    floodCheck: {
      status: 'Moderate Risk in low-lying pockets',
      detail: 'During Cyclone Michaung (Dec 2023), water stagnation occurred around Alwarthirunagar 1st Main and low-lying canals near Porur lake overflow. Always choose 1st floor or above if renting in low-lying side streets. Elevated plots near Kesavardhini stayed dry.'
    },

    commute: {
      metro: 'Upcoming Metro Line 4 (Poonamallee to Lighthouse) has stations planned at Alwarthirunagar and Valasaravakkam Junction.',
      bus: 'Direct MTC buses on Arcot Road (Route 25G to Anna Square, 37G to Broadway, 17D to Broadway).',
      road: 'Direct 10-min drive to Porur DLF Cybercity via Mount-Poonamallee Road; 15 mins to Vadapalani Vijaya Forum Mall.'
    },

    amenities: {
      schools: ['PSBB Millennium (nearby Gerugambakkam)', 'La Chatelaine Junior College', 'Devi Academy', 'St. John’s Matriculation'],
      hospitals: ['Annai Multi Speciality Hospital', 'MIOT International (10 mins away)', 'Vijaya Hospital (Vadapalani)'],
      markets: ['Kesavardhini Daily Vegetable Market', 'Nilgiris Arcot Road', 'Fresh fish stalls near Porur toll']
    },

    foodSpots: [
      'Kaaraikudi Chettinad Mess (Arcot Road)',
      'Sri Krishna Sweets & Snacks',
      'Hot Chips Valasaravakkam branch',
      'Night Thattukada parotta stalls near Kesavardhini bus stop'
    ],

    whoItSuits: 'Ideal for techies working in Porur DLF / L&T Infotech, media and cinema professionals working in Vadapalani / Kodambakkam, and families looking for established schools without South Chennai prices.',

    // Embedded Instagram Reels of Vacant Homes in Valasaravakkam
    reels: [
      {
        id: 'valas-1',
        title: 'Spacious 2 BHK on Arcot Road Cross Street',
        bhk: '2 BHK',
        locality: 'Valasaravakkam',
        url: 'https://www.instagram.com/reel/DdbmprOsxmq/',
        poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
      },
      {
        id: 'valas-2',
        title: 'Independent 1st Floor 3 BHK with Car Park',
        bhk: '3 BHK',
        locality: 'Kesavardhini, Valasaravakkam',
        url: 'https://www.instagram.com/reel/Ddi7YGRuzdg/',
        poster: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      }
    ],

    faqs: [
      {
        q: 'How much advance deposit do landlords ask in Valasaravakkam?',
        a: 'Landlords traditionally ask for 6 to 10 months rent. However, with honest negotiation, most 2 BHK deals close at 4 to 6 months advance. Never pay more than 5 months advance without a registered agreement.'
      },
      {
        q: 'Are bachelors allowed to rent in Valasaravakkam?',
        a: 'Yes, especially towards Porur link roads and Alwarthirunagar side. Some traditional house owners on inner temple streets prefer families, but independent builder floors are bachelor-friendly.'
      },
      {
        q: 'What is the EB tariff for rental houses here?',
        a: 'Ensure you have a separate TANGEDCO meter. The Tamil Nadu government provides 100 units free per billing cycle. Do not accept a flat ₹10 or ₹12 per unit rate unless it is a commercial sub-meter.'
      }
    ],

    nearbyAreas: [
      { name: 'Porur', slug: 'rent-in-porur', note: 'IT SEZ hub, 5 mins away' },
      { name: 'Ramapuram', slug: 'rent-in-ramapuram', note: 'SRM University & DLF backgate' },
      { name: 'Vadapalani', slug: 'rent-in-vadapalani', note: 'Metro interchange & cinema hub' },
      { name: 'Virugambakkam', slug: 'rent-in-virugambakkam', note: 'Adjoining residential quiet streets' }
    ],

    relatedGuides: [
      { title: 'The 10-Month Advance Myth in Chennai', slug: 'advance-deposit-chennai' },
      { title: 'Chennai Rental Agreement & Tenant Rights', slug: 'tenant-rules-chennai' }
    ]
  },

  // ── 2. ADVANCE DEPOSIT IN CHENNAI (Guide) ──
  {
    slug: 'advance-deposit-chennai',
    type: 'guide',
    title: 'Advance Deposit in Chennai: 10 Months Norm, Negotiation & Your Rights',
    subheading: 'The Truth About the 10-Month Security Deposit in Chennai',
    tagline: 'Why Chennai landlords ask for 10 months advance, how to negotiate it down to 4-6 months without losing the house, and how to protect your refund.',
    badge: 'Crucial Tenant Guide',
    badgeType: 'stamp-red',
    readTime: '7 min read',
    updatedDate: 'October 2026',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    summary: 'The biggest shock for anyone moving to Chennai from Bangalore, Hyderabad, or Mumbai is the advance deposit. While landlords start the conversation at 10 months, almost nobody actually pays 10 months anymore.',

    guideSections: [
      {
        heading: '1. Why do Chennai landlords ask for 10 months?',
        content: `In Chennai, the "10-month advance" is a cultural tradition that dates back several decades when rental litigation took years. Landlords considered 10 months as an emergency buffer in case a tenant defaulted or vanished.

However, in 2026, the average rent for a 2 BHK in areas like Velachery, Adyar, or Valasaravakkam is ₹20,000 to ₹35,000. Paying 10 months means locking up ₹2,00,000 to ₹3,50,000 in liquid cash with zero interest! That is an unfair burden on working families and young professionals.`
      },
      {
        heading: '2. What the Law Actually Says (Tamil Nadu Tenancy Act)',
        content: `Under the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act (TNRRRL Act), the law strictly caps the security deposit at a maximum of three times the monthly rent for residential properties! 

While informal market practice still pushes for more, knowing the legal ground gives you tremendous leverage when sitting across the dining table with the owner.`
      },
      {
        heading: '3. How to Negotiate Down to 4 to 6 Months (Step-by-Step)',
        content: `Here is the exact script used by smart Chennai tenants:
1. Show your employment stability: Offer your corporate ID (IT company, bank, hospital) or last 2 salary slips upfront. Landlords ask for high deposits because they fear non-payment.
2. Offer automated ECS / standing instruction: Tell the owner: "Sir/Madam, my rent will be credited on the 1st of every month automatically via bank transfer."
3. The Counter-Offer: "Sir, 10 months at ₹22,000 is ₹2.2 Lakhs. My company relocation limit is ₹1,00,000 (roughly 4.5 months). I can transfer the token amount today if we can close at ₹1.1 Lakhs."
4. In 8 out of 10 cases, genuine owners will settle between 4 and 6 months.`
      },
      {
        heading: '4. The Painting & Maintenance Trap When Vacating',
        content: `Another Chennai custom is deducting "one month rent for painting" when vacating. 

Local Chennai Tip:
- If you stay for less than 11 months, insist on a pro-rata painting deduction or agree to repaint it yourself.
- Clearly write in clause 7 of the agreement: "Deduction for painting upon vacating shall not exceed ₹10,000 or actual bills with GST invoice, whichever is lower."
- Take timestamped photos and video of walls, taps, switchboards, and tiles the day you move in. Send it to the owner on WhatsApp as an acknowledged record.`
      },
      {
        heading: '5. Pre-Deposit House-Hunting Checklist',
        content: `Before parting with even ₹5,000 token advance, check these 5 things:
- TANGEDCO Electricity Card: Check the consumer number online. Verify there are no accumulated arrears or commercial penalty fines from the previous tenant.
- Water Source: Ask whether Metro Water is available daily or alternate days. Test the tap pressure in all bathrooms.
- Monsoon Seepage: Check ceiling corners and bedroom skirting boards for damp patches or fresh paint over water marks.
- Two-Wheeler & Car Parking: Clarify whether car parking is covered, dedicated, or first-come first-served on the street.
- Notice Period: Ensure notice period is mutual (1 month or 2 months) with no forfeiture penalties if notice is properly served.`
      }
    ],

    // Reel embeds highlighting affordable advance homes
    reels: [
      {
        id: 'dep-1',
        title: '3 BHK in Sholinganallur with 4-Month Advance',
        bhk: '3 BHK',
        locality: 'OMR IT Corridor',
        url: 'https://www.instagram.com/reel/DdrXzwtCUSj/',
        poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
      }
    ],

    faqs: [
      {
        q: 'Is token advance refundable if I cancel before signing the agreement?',
        a: 'If you cancel for personal reasons, Chennai owners typically deduct 50% or keep the token. However, if you discover structural defects, water scarcity, or if the landlord changes the agreed terms, you are entitled to a 100% refund. Always pay token advance via UPI with the note "Token for rental agreement subject to terms".'
      },
      {
        q: 'Do I have to pay brokerage if I find a home via Instagram?',
        a: 'No! Homes posted on Chennai Rents Instagram reels are direct owner connections or zero-brokerage verified leads. There are no brokerage charges.'
      }
    ],

    nearbyAreas: [
      { name: 'Valasaravakkam', slug: 'rent-in-valasaravakkam', note: 'Rent rates & water guide' },
      { name: 'Velachery', slug: 'rent-in-velachery', note: 'IT hub rental analysis' }
    ],

    relatedGuides: [
      { title: 'Rental Agreement & Tenant Rights in Chennai', slug: 'tenant-rules-chennai' }
    ]
  },

  // ── 3. VELACHERY (Locality Post) ──
  {
    slug: 'rent-in-velachery',
    type: 'locality',
    title: 'Rent in Velachery, Chennai: Localities, Rents & Flood Reality',
    subheading: 'South Chennai IT Residential Hub & Flood Ground Reality',
    tagline: 'The ultimate IT residential hub. Proximity to OMR, Phoenix Marketcity, and MRTS, with honest advice on flood-safe pockets.',
    badge: 'South Chennai Hub',
    badgeType: 'stamp-yellow',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    coverImage: 'https://images.unsplash.com/photo-1542665952-14513db15293?w=1200&q=80',
    summary: 'Velachery is Chennai’s most sought-after rental neighborhood for OMR and Guindy techies. Rents range from ₹11,000 for a 1 BHK to ₹38,000 for a luxury gated community 3 BHK.',

    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000 - ₹15,000', note: 'Independent units near Vijayanagar or Baby Nagar.' },
      { bhk: '2 BHK', range: '₹18,000 - ₹26,000', note: 'Standard apartments in Dhandeeswaram & Tansi Nagar.' },
      { bhk: '3 BHK', range: '₹28,000 - ₹42,000', note: 'Gated communities with gym & power backup near Bypass Road.' }
    ],

    waterReality: {
      score: '7 / 10',
      status: 'Decent Metro Water in central pockets',
      detail: 'Dhandeeswaram Nagar and Gandhi Salai have dependable Chennai Metro Water connections. Low-lying interior roads occasionally experience salty groundwater during summer.'
    },

    floodCheck: {
      status: 'High Caution required in specific streets',
      detail: 'Velachery is historically prone to waterlogging due to the lake catchment. Avoid ground floors in Baby Nagar, AGS Colony, and Ram Nagar South. Stick to elevated sectors like Dhandeeswaram Nagar, Seethapathy Nagar, or 1st floor and above.'
    },

    commute: {
      metro: 'Velachery MRTS station links to Beach & Chepauk; upcoming Metro Phase 2 extension connects to St. Thomas Mount.',
      bus: 'Vijayanagar Bus Terminus connects directly to OMR, T. Nagar, Central, and Tambaram.',
      road: 'Direct 5-minute commute to Taramani Tidel Park and Ascendas via Taramani Link Road.'
    },

    amenities: {
      schools: ['DAV Public School', 'The Guru Nanak College', 'San Academy', 'St. Britto’s Academy'],
      hospitals: ['Prashanth Super Speciality Hospital', 'Dr. Kamakshi Memorial Hospital (Pallikaranai link)'],
      markets: ['Bypass Road Supermarkets', 'Vijayanagar vegetable market', 'Grand Square & Phoenix Marketcity']
    },

    foodSpots: [
      'Geetham Veg Restaurant (Velachery Bypass)',
      'Coal Barbecues & Zaitoon',
      'Salem RR Biriyani',
      'The vibrant tea stalls opposite Guru Nanak College'
    ],

    whoItSuits: 'Prime choice for tech professionals working in Tidel Park, Ascendas, Ramanujan IT City, and OMR. Excellent social life with shopping malls and theatres around.',

    reels: [
      {
        id: 'vela-1',
        title: 'Furnished 2 BHK in Dhandeeswaram Nagar',
        bhk: '2 BHK',
        locality: 'Velachery',
        url: 'https://www.instagram.com/reel/DdbmprOsxmq/',
        poster: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      }
    ],

    faqs: [
      {
        q: 'Which parts of Velachery do not flood during heavy rains?',
        a: 'Dhandeeswaram Nagar, elevated portions of Velachery Bypass, and main roads near Phoenix Marketcity generally remain accessible. Always inspect the plinth level of the building before finalizing.'
      }
    ],

    nearbyAreas: [
      { name: 'Adyar', slug: 'rent-in-adyar', note: '15 mins towards beach' },
      { name: 'OMR', slug: 'rent-in-omr', note: 'IT expressway' }
    ],

    relatedGuides: [
      { title: 'The 10-Month Advance Myth in Chennai', slug: 'advance-deposit-chennai' }
    ]
  },

  // ── 4. ADYAR (Locality Post) ──
  {
    slug: 'rent-in-adyar',
    type: 'locality',
    title: 'Rent in Adyar, Chennai: Greenery, Beach Proximity & Premium Rents',
    subheading: 'Coastal Greenery, Quiet Avenues & Premium Residential Living',
    tagline: 'Tree-lined boulevards, Besant Nagar beach down the road, and classic South Chennai peace. High quality of living at a premium price.',
    badge: 'Premium Coastal Hub',
    badgeType: 'stamp-green',
    readTime: '5 min read',
    updatedDate: 'October 2026',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    summary: 'Adyar is one of Chennai’s greenest and most prestigious localities. With Gandhi Nagar, Shastri Nagar, and Kasturba Nagar, rent commands a premium but delivers unmatched tranquility.',

    rentRanges: [
      { bhk: '1 BHK', range: '₹14,000 - ₹20,000', note: 'Rare independent portions in Kasturba Nagar.' },
      { bhk: '2 BHK', range: '₹26,000 - ₹40,000', note: 'Standard residential apartments in Shastri Nagar & Gandhi Nagar.' },
      { bhk: '3 BHK', range: '₹45,000 - ₹75,000+', note: 'Luxury apartments and heritage bungalow floors with leafy balconies.' }
    ],

    waterReality: {
      score: '8.5 / 10',
      status: 'Excellent Metro Water',
      detail: 'Adyar boasts some of the cleanest Metro Water piped supplies in the city. Good groundwater table due to proximity to the Adyar river and coast.'
    },

    floodCheck: {
      status: 'Low to Moderate (Elevated avenues)',
      detail: 'Most parts of Gandhi Nagar and Shastri Nagar drained cleanly within hours during 2023 rains. River-facing low banks require routine caution.'
    },

    commute: {
      metro: 'Upcoming Metro Phase 2 station at Adyar Depot.',
      bus: 'Adyar Bus Depot is a major transit interchange connecting North & South Chennai.',
      road: 'Direct connection to ECR coastal highway, OMR tech corridor, and Mylapore heritage hub.'
    },

    amenities: {
      schools: ['The School KFI (nearby)', 'St. Patrick’s AIHSS', 'Bala Vidya Mandir', 'Shishya School'],
      hospitals: ['Fortis Malar Hospital', 'Adyar Cancer Institute', 'Dr. A. Ramachandran’s Diabetes Hospitals'],
      markets: ['Adyar Ananda Bhavan circle shops', 'Shastri Nagar organic grocery stores', 'Besant Nagar fish market']
    },

    foodSpots: [
      'Original Adyar Ananda Bhavan (A2B)',
      'Amadora Gourmet Ice Cream',
      'The Beach Walk cafes on Elliot’s Beach',
      'Murugan Idli Shop'
    ],

    whoItSuits: 'Senior executives, doctors, consulate staff, creative professionals, and families who place high value on air quality, morning walks, and proximity to the sea.',

    reels: [
      {
        id: 'adyar-1',
        title: 'Leafy 3 BHK in Shastri Nagar near Beach',
        bhk: '3 BHK',
        locality: 'Adyar',
        url: 'https://www.instagram.com/reel/Ddi7YGRuzdg/',
        poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
      }
    ],

    faqs: [
      {
        q: 'Is it hard to find bachelor rentals in Adyar?',
        a: 'Yes, traditional resident welfare associations in Adyar are strict about family tenancy. However, independent portions on 2nd floors and newer apartments along LB Road welcome working professionals.'
      }
    ],

    nearbyAreas: [
      { name: 'Besant Nagar', slug: 'rent-in-besant-nagar', note: 'Beach living' },
      { name: 'Velachery', slug: 'rent-in-velachery', note: 'Affordable alternate' }
    ],

    relatedGuides: [
      { title: 'Advance Deposit Norms in Chennai', slug: 'advance-deposit-chennai' }
    ]
  },

  // ── 5. TENANT RULES & RENTAL AGREEMENT (Guide) ──
  {
    slug: 'tenant-rules-chennai',
    type: 'guide',
    title: 'Rental Agreement & Tenant Rules in Chennai: What You Must Sign & What to Refuse',
    subheading: 'What to Sign & What to Refuse in a Chennai Lease',
    tagline: 'The difference between 11-month non-registered agreements and legally binding registrations, maintenance fee traps, and notice period rights.',
    badge: 'Legal Checklist',
    badgeType: 'stamp-blue',
    readTime: '6 min read',
    updatedDate: 'October 2026',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80',
    summary: 'Signing a rental agreement in Chennai is often treated like a formality on a ₹100 stamp paper. Here are the 5 clauses you must review before signing.',

    guideSections: [
      {
        heading: '1. The 11-Month Convention vs Stamp Paper Duty',
        content: `Almost all residential leases in Chennai are executed for 11 months. Why? Under the Indian Registration Act, any lease exceeding 11 months mandatorily requires registration with the sub-registrar office, attracting stamp duty and registration charges. An 11-month agreement on a ₹100 or ₹200 non-judicial stamp paper is standard and legal.`
      },
      {
        heading: '2. Notice Period & Lock-in Clauses',
        content: `Never agree to a one-sided lock-in clause where you cannot vacate for 6 months but the owner can ask you to leave at any time. Ensure that:
- The notice period is reciprocal (e.g. 1 month from either party).
- If the owner sells the building, you must be given at least 2 full months to locate alternate accommodation.`
      },
      {
        heading: '3. Annual Rent Escalation Norms',
        content: `In Chennai, the customary annual rent hike is 5% to 7% upon renewal after 11 months. If a landlord demands a 10% or 15% increase, you have the right to negotiate based on prevailing locality rent trends.`
      },
      {
        heading: '4. Major vs Minor Maintenance Responsibilities',
        content: `The agreement must clearly delineate who pays for what:
- Landlord: Roof leakage, structural seepage, deep plumbing issues, motor pump replacement, rewiring.
- Tenant: Tap washers, bulb replacements, minor drain clogs, regular AC servicing.`
      }
    ],

    reels: [],

    faqs: [
      {
        q: 'Does an 11-month agreement hold validity in Chennai rent courts?',
        a: 'Yes, an agreement printed on stamp paper and signed by both parties along with two witnesses is a valid legal contract recognized in civil proceedings.'
      }
    ],

    nearbyAreas: [
      { name: 'Valasaravakkam', slug: 'rent-in-valasaravakkam', note: 'Sample locality' }
    ],

    relatedGuides: [
      { title: 'Advance Deposit in Chennai: 10 Months vs Reality', slug: 'advance-deposit-chennai' }
    ]
  }
];

export const LOCALITY_POSTS = POSTS.filter(p => p.type === 'locality');
export const GUIDE_POSTS = POSTS.filter(p => p.type === 'guide');

export function getPostBySlug(slug) {
  return POSTS.find(p => p.slug === slug);
}
