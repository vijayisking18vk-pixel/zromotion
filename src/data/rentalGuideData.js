/**
 * Chennai Rents — Rental Guide & Content Engine Data
 * Single source of truth for Chennai Rental Hub, Supporting Guides, and Editorial Attribution.
 */

export const AUTHOR_INFO = {
  name: 'R Vijayrajkumar',
  slug: 'vijayrajkumar',
  role: 'Founder & Lead Editorial Reviewer, Chennai Rents',
  website: 'https://www.vijayrajkumar.in',
  location: 'Chennai, Tamil Nadu, India',
  bio: 'Chennai native, urban researcher, and founder of Chennai Rents. Dedicated to bringing ground-truth transparency to home seekers and tenants across Chennai through verified locality rent benchmarks, tap-water reality, flood history, and direct owner connections.',
  socialProfiles: [
    'https://www.vijayrajkumar.in',
    'https://www.instagram.com/chennairents',
  ],
  editorialPolicy: 'All rental rates, water supply evaluations, and flood checks are crowdsourced and reviewed by local neighborhood contributors. We do not accept paid placements to inflate locality ratings or fabricate listings.',
};

export const CHENNAI_RENT_HUB_DATA = {
  slug: 'house-for-rent-in-chennai',
  title: 'Houses for Rent in Chennai: Locality, Budget & BHK Guide | Chennai Rents',
  h1: 'Houses for Rent in Chennai: Find by BHK, Budget and Locality',
  targetKeyword: 'house for rents in Chennai',
  naturalKeywords: ['houses for rent in Chennai', 'house for rent in Chennai', 'rental homes in Chennai'],
  metaDescription: 'Find houses for rent in Chennai. Practical guide covering 1-3 BHK flats, independent houses, budgets from ₹5,000 to ₹30,000+, water checks, and no-broker owner listings.',
  canonicalUrl: 'https://www.chennairents.in/house-for-rent-in-chennai',
  lastReviewed: 'October 2026',
  editor: AUTHOR_INFO,
  directAnswer: 'Chennai offers rental homes across diverse budgets and preferences, ranging from compact 1 BHK portions and modern 2 BHK apartments to independent houses, PGs, and co-living spaces. Monthly rents typically range from ₹7,000 for suburban portions to ₹45,000+ for premium city apartments. Start by choosing your preferred locality and commute corridor, verify summer water arrangements, and connect directly with property owners.',
  
  budgets: [
    {
      budget: 'Under ₹5,000',
      slug: 'house-for-rent-in-chennai-under-5000',
      label: 'House for rent in Chennai below 5000',
      description: 'At this budget, availability is limited. Expect single rooms, shared PG accommodations, 1 RK independent portions in peripheral suburbs (Guduvanchery, Avadi, Tiruvottiyur), or older units. Verify common bathroom access, electricity sub-meters, and commute feasibility before visiting.',
      typicalAreas: ['Guduvanchery', 'Avadi', 'Puzhal', 'Tiruvottiyur'],
    },
    {
      budget: 'Under ₹7,000',
      slug: 'house-for-rent-in-chennai-under-7000',
      label: 'House for rent in Chennai below 7000',
      description: 'Realistic for compact 1 RK or modest 1 BHK independent portions in developing outer rings such as Medavakkam, Chromepet, Ambattur, and Tambaram interior pockets. Ideal for solo workers and college students seeking independent living.',
      typicalAreas: ['Medavakkam', 'Chromepet', 'Ambattur', 'Tambaram'],
    },
    {
      budget: 'Under ₹8,000',
      slug: 'individual-house-for-rent-in-chennai-under-8000',
      label: 'Individual house for rent in Chennai below 8000',
      description: 'Enables 1 BHK ground-floor portions or terrace rooms in standalone residential layouts. Good availability in Poonamallee, Kundrathur, Madipakkam interior roads, and Pallavaram.',
      typicalAreas: ['Madipakkam', 'Poonamallee', 'Kundrathur', 'Pallavaram'],
    },
    {
      budget: 'Under ₹10,000',
      slug: 'house-for-rent-in-chennai-under-10000',
      label: 'House for rent in Chennai below 10000',
      description: 'A major sweet spot for single professionals and couples. Unlocks decent 1 BHK apartments or independent portions in Velachery interior roads, Porur, Valasaravakkam, and Perungudi bypass lanes.',
      typicalAreas: ['Velachery', 'Porur', 'Valasaravakkam', 'Perungudi'],
    },
  ],

  bhkTypes: [
    {
      type: '1 BHK',
      slug: '1-bhk-house-for-rent-in-chennai',
      range: '₹8,000 – ₹16,000',
      description: 'Best for single professionals, IT freshers, and young couples. Most common as builder floor portions or 1st/2nd floor extensions in residential layouts. High inventory in Velachery, Thoraipakkam, and Porur.',
    },
    {
      type: '2 BHK',
      slug: '2-bhk-house-for-rent-in-chennai',
      range: '₹16,000 – ₹32,000',
      description: 'The standard choice for small families and shared bachelor accommodations. Unlocks standalone apartment blocks and mid-sized gated communities with lift and parking.',
    },
    {
      type: '3 BHK & Luxury',
      slug: '3-bhk-house-for-rent-in-chennai',
      range: '₹30,000 – ₹70,000+',
      description: 'Large apartments and premium township residences with full club amenities, 24/7 security, and power backup. Prominent in Adyar, Anna Nagar, T. Nagar, and Sholinganallur gated townships.',
    },
    {
      type: 'Independent Houses',
      slug: 'independent-house-for-rent-in-chennai',
      range: '₹12,000 – ₹55,000',
      description: 'Stand-alone houses or dedicated floor portions offering private terraces, car porches, and no monthly association maintenance charges. Popular in Valasaravakkam, Madipakkam, and Chromepet.',
    },
  ],

  tenantTypes: [
    {
      title: 'For Families',
      slug: 'family-houses-for-rent-in-chennai',
      icon: 'family',
      summary: 'Focus on 2/3 BHK units near reputed schools, daily vegetable markets, and reliable metro water supply. Resident Welfare Associations (RWAs) in Anna Nagar, Adyar, and Valasaravakkam offer quiet, secure family living.',
    },
    {
      title: 'For Bachelors & Single Professionals',
      slug: 'bachelor-rentals-in-chennai',
      icon: 'bachelor',
      summary: 'Look for builder floors and OMR apartments with transparent bachelor policies. Taramani, Velachery, Perungudi, and Porur have the highest concentration of bachelor-welcoming homes close to major tech campuses.',
    },
    {
      title: 'Co-Living & PG Living',
      slug: 'co-living-in-chennai',
      icon: 'coliving',
      summary: 'Turnkey living with furnished rooms, high-speed Wi-Fi, housekeeping, and meal options. Low security deposit (usually 1–2 months) compared to traditional 6-10 month rental advances.',
    },
  ],

  howToRentWithoutBrokers: {
    heading: 'How to Rent Without Brokers in Chennai',
    summary: 'Traditional brokerage in Chennai costs 1 month rent from both owner and tenant. Chennai Rents helps you connect directly with genuine property owners through crowdsourced listings and Instagram video reels.',
    tips: [
      'Look for verified owner contact badges and direct phone/WhatsApp connections.',
      'Always request a physical property walkthrough before transferring any advance or token amount.',
      'Check electricity consumer number (TANGEDCO) on bills to verify the genuine owner/door number.',
      'Negotiate the advance deposit politely: the old 10-month norm is flexible down to 4–6 months with steady employment proof.',
      'Insist on a written 11-month rental agreement outlining the security deposit refund timeline and maintenance responsibilities.',
    ],
  },

  marketplaceComparison: {
    heading: 'Chennai Rents vs Marketplace Searches: What to Verify',
    summary: 'Many house hunters search classified platforms like OLX or general property portals for Chennai rentals. While classified sites list many properties, users frequently encounter duplicate posts, outdated listings, or unauthorized brokers posing as owners.',
    safetyGuidelines: [
      'Beware of fake owner listings asking for token advances via UPI to "courier keys" or hold the flat, since legitimate owners will always meet you at the property.',
      'Verify water supply (Chennai Metro Water vs private tanker) directly with neighboring tenants, as classified descriptions often exaggerate water quality.',
      'Check whether the monthly rent includes building maintenance or if common water tanker bills are shared separately.',
      'Cross-check the locality pin on our Chennai Rents interactive map to see real crowdsourced street conditions and flood history.',
    ],
  },

  tenantChecklist: [
    { step: 1, title: 'Establish Total Monthly Outflow', text: 'Account for base rent, maintenance fees, electricity sub-meter rates, and shared summer water tanker costs.' },
    { step: 2, title: 'Map Commute & Transit Access', text: 'Verify distance to MTC bus terminals, MRTS/Metro stations, and peak-hour traffic bottlenecks.' },
    { step: 3, title: 'Inspect Tap Water & Sump Quality', text: 'Taste/smell the tap water; check if the property has a dedicated Metro Water connection or relies entirely on borewell.' },
    { step: 4, title: 'Check Flood Plinth Levels', text: 'Look at the road elevation and ask neighbors how the street drained during 2015 and Cyclone Michaung (2023).' },
    { step: 5, title: 'Clarify Occupancy Rules', text: 'Confirm visitor policies, vehicle parking slots (car vs two-wheeler), and cooking preferences in advance.' },
    { step: 6, title: 'Document Advance Deposit & Notice', text: 'Aim for 4–6 months advance deposit and secure a clear 1-month notice period clause in writing.' },
    { step: 7, title: 'Never Transfer Token Advance Sight Unseen', text: 'Only pay a token booking amount directly to the verified property owner after visiting and checking ID proof.' },
  ],

  faqs: [
    {
      q: 'What is the average rent for a 2 BHK house in Chennai?',
      a: 'A standard 2 BHK apartment in residential neighborhoods like Velachery, Porur, or Medavakkam rents for ₹16,000 to ₹25,000 per month. In prime areas like Adyar, Anna Nagar, or T. Nagar, 2 BHK rents range from ₹26,000 to ₹40,000+ depending on amenities and age of construction.',
    },
    {
      q: 'Is the 10-month advance deposit mandatory in Chennai?',
      a: 'No. While Chennai landlords traditionally ask for 10 months security deposit, it is not legally mandated. With proof of steady employment and direct bank transfers, most agreements close between 4 to 6 months advance. PGs and co-living spaces typically ask for just 1–2 months.',
    },
    {
      q: 'Can bachelors easily find rental homes in Chennai?',
      a: 'Yes, but availability varies by area. Standalone houses in traditional family streets may restrict bachelors, but IT corridor localities (Velachery, Taramani, Perungudi, Sholinganallur, and Porur) have abundant bachelor-friendly builder apartments and shared flats.',
    },
    {
      q: 'Which localities in Chennai have the best water supply?',
      a: 'Central and established South Chennai areas like Adyar, Besant Nagar, and parts of Anna Nagar have dependable Chennai Metro Water connections. Low-lying outer suburbs often rely on private water tankers during summer months.',
    },
    {
      q: 'How can I rent a house in Chennai without paying brokerage fees?',
      a: 'Use Chennai Rents to browse verified owner listings and Instagram home reels. Avoid middleman listing aggregator sites that mask owner contacts behind broker numbers. Always speak directly with the landlord before visiting.',
    },
  ],
};

export const SUPPORTING_RENTAL_PAGES = [
  {
    slug: 'house-rent-in-chennai',
    title: 'House Rent in Chennai: Verified Rates, Localities & Budgets | Chennai Rents',
    h1: 'House Rent in Chennai: Verified Rates, Localities & Budgets',
    description: 'Find verified house rent in Chennai across all budgets. Explore 1-3 BHK flats, independent houses, realistic locality rents, water ratings, and direct owner connections.',
    priceRange: '₹7,000 – ₹45,000+ / month',
    recommendedLocalities: ['velachery', 'adyar', 'anna-nagar', 'porur', 'omr', 'medavakkam', 'valasaravakkam'],
  },
  {
    slug: '1-bhk-house-for-rent-in-chennai',
    title: '1 BHK Houses for Rent in Chennai: Prices & Localities | Chennai Rents',
    h1: '1 BHK Houses for Rent in Chennai',
    bhk: '1',
    description: 'Explore verified 1 BHK houses and flats for rent in Chennai. Typical rent benchmarks, bachelor vs family suitability, water reality, and top localities.',
    priceRange: '₹8,000 – ₹16,000 / month',
    recommendedLocalities: ['velachery', 'thoraipakkam', 'porur', 'medavakkam', 'taramani'],
  },
  {
    slug: '2-bhk-house-for-rent-in-chennai',
    title: '2 BHK Houses for Rent in Chennai: Rates & Top Neighborhoods | Chennai Rents',
    h1: '2 BHK Houses for Rent in Chennai',
    bhk: '2',
    description: 'Find 2 BHK apartments and independent houses for rent in Chennai. Neighborhood price comparisons, parking norms, and verified direct owner listings.',
    priceRange: '₹16,000 – ₹32,000 / month',
    recommendedLocalities: ['velachery', 'adyar', 'valasaravakkam', 'porur', 'sholinganallur', 'perungudi'],
  },
  {
    slug: '3-bhk-house-for-rent-in-chennai',
    title: '3 BHK Houses for Rent in Chennai: Luxury, Gated & Family Flats | Chennai Rents',
    h1: '3 BHK Houses for Rent in Chennai',
    bhk: '3',
    description: 'Find 3 BHK flats and spacious houses for rent in Chennai. Gated community amenities, parking spaces, and verified direct owner listings across top localities.',
    priceRange: '₹30,000 – ₹70,000+ / month',
    recommendedLocalities: ['adyar', 'anna-nagar', 't-nagar', 'sholinganallur', 'velachery'],
  },
  {
    slug: 'independent-house-for-rent-in-chennai',
    title: 'Independent Houses for Rent in Chennai: Standalone Homes & Portions | Chennai Rents',
    h1: 'Independent Houses for Rent in Chennai',
    propertyType: 'independent',
    description: 'Discover independent houses and private floor portions for rent in Chennai. Enjoy private parking, terrace access, and zero monthly apartment maintenance fees.',
    priceRange: '₹12,000 – ₹50,000 / month',
    recommendedLocalities: ['valasaravakkam', 'adyar', 'porur', 'medavakkam', 'velachery'],
  },
  {
    slug: 'house-for-rent-in-chennai-under-10000',
    title: 'House for Rent in Chennai Below 10000: Real Options & Localities | Chennai Rents',
    h1: 'House for Rent in Chennai Below ₹10,000',
    budgetMax: 10000,
    description: 'Looking for a rental house in Chennai under ₹10,000? Check realistic 1 BHK portions and compact flats in Porur, Medavakkam, Chromepet, and suburban belts.',
    priceRange: '₹7,000 – ₹10,000 / month',
    recommendedLocalities: ['medavakkam', 'porur', 'thoraipakkam', 'valasaravakkam'],
  },
  {
    slug: 'house-for-rent-in-chennai-under-7000',
    title: 'House for Rent in Chennai Below 7000: Budget Rental Guide | Chennai Rents',
    h1: 'House for Rent in Chennai Below ₹7,000',
    budgetMax: 7000,
    description: 'Realistic guide to finding homes in Chennai under ₹7,000. Compact 1 RKs, student rooms, and suburban independent portions with transparent utility checks.',
    priceRange: '₹5,000 – ₹7,000 / month',
    recommendedLocalities: ['medavakkam', 'chromepet', 'tambaram', 'ambattur'],
  },
  {
    slug: 'house-for-rent-in-chennai-under-5000',
    title: 'Rent House in Chennai Below 5000: Honest Suburban & Room Guide | Chennai Rents',
    h1: 'House for Rent in Chennai Below ₹5,000',
    budgetMax: 5000,
    description: 'Honest facts about renting in Chennai below ₹5,000. Shared rooms, bachelor PGs, and suburban portions in Avadi, Guduvanchery, and outer transit rings.',
    priceRange: '₹3,500 – ₹5,000 / month',
    recommendedLocalities: ['guduvanchery', 'avadi', 'tambaram'],
  },
  {
    slug: 'individual-house-for-rent-in-chennai-under-8000',
    title: 'Individual House for Rent in Chennai Below 8000 | Chennai Rents',
    h1: 'Individual House for Rent in Chennai Below ₹8,000',
    budgetMax: 8000,
    description: 'Find affordable individual house portions for rent in Chennai under ₹8,000. Ground floor portions, terrace rooms, and quiet residential cross-streets.',
    priceRange: '₹6,000 – ₹8,000 / month',
    recommendedLocalities: ['medavakkam', 'porur', 'kundrathur', 'madipakkam'],
  },
  {
    slug: 'house-for-rent-in-chennai-without-brokers',
    title: 'House for Rent in Chennai Without Brokers: 100% Direct Owner Homes | Chennai Rents',
    h1: 'House for Rent in Chennai Without Brokers',
    description: 'Skip real estate agent commissions. How to connect directly with genuine Chennai home owners, verify documents, and negotiate rental advances safely.',
    priceRange: 'All budgets (Zero Brokerage)',
    recommendedLocalities: ['velachery', 'adyar', 'porur', 't-nagar', 'sholinganallur', 'valasaravakkam'],
  },
  {
    slug: 'bachelor-rentals-in-chennai',
    title: 'Bachelor House for Rent in Chennai: Welcoming Flats & Rooms | Chennai Rents',
    h1: 'Bachelor House for Rent in Chennai',
    tenantType: 'bachelor',
    description: 'Find bachelor-friendly rental homes in Chennai. Avoid society restrictions with verified flats, shared apartments, and independent portions near IT parks.',
    priceRange: '₹6,000 – ₹20,000 / person',
    recommendedLocalities: ['taramani', 'velachery', 'perungudi', 'thoraipakkam', 'porur'],
  },
  {
    slug: 'family-houses-for-rent-in-chennai',
    title: 'Family Houses for Rent in Chennai: Peaceful & Secure Residential Flats | Chennai Rents',
    h1: 'Family Houses for Rent in Chennai',
    tenantType: 'family',
    description: 'Peaceful residential homes for families in Chennai. Focus on top schools, 24/7 security, metro water supply, car parking, and active community welfare.',
    priceRange: '₹18,000 – ₹55,000 / month',
    recommendedLocalities: ['adyar', 'valasaravakkam', 't-nagar', 'nungambakkam', 'velachery'],
  },
  {
    slug: 'co-living-in-chennai',
    title: 'Co-Living Spaces in Chennai: Fully Furnished Rooms & Low Deposit | Chennai Rents',
    h1: 'Co-Living Spaces in Chennai',
    tenantType: 'coliving',
    description: 'Compare co-living spaces and premium PGs in Chennai. Fully furnished rooms with Wi-Fi, food, housekeeping, and minimal 1–2 month security advance.',
    priceRange: '₹8,000 – ₹22,000 / month',
    recommendedLocalities: ['taramani', 'perungudi', 'sholinganallur', 'velachery', 'adyar'],
  },
  {
    slug: 'house-for-rent-in-anna-nagar-chennai',
    title: 'House for Rent in Anna Nagar, Chennai: Premium West Hub Rentals | Chennai Rents',
    h1: 'House for Rent in Anna Nagar, Chennai',
    locality: 'anna-nagar',
    description: 'Explore rental houses in Anna Nagar, Chennai. Tree-lined avenues, excellent Metro connectivity, top schools, and premium 2 & 3 BHK apartments.',
    priceRange: '₹22,000 – ₹65,000+ / month',
    recommendedLocalities: ['valasaravakkam', 'nungambakkam', 'porur'],
  },
  {
    slug: 'house-for-rent-in-porur-chennai',
    title: 'House for Rent in Porur, Chennai: DLF IT Park Hub & West Living | Chennai Rents',
    h1: 'House for Rent in Porur, Chennai',
    locality: 'porur',
    description: 'Find houses for rent in Porur, Chennai. 5-minute access to DLF Cybercity and L&T Infotech, affordable 1-3 BHK flats, and upcoming Metro line.',
    priceRange: '₹9,000 – ₹28,000 / month',
    recommendedLocalities: ['valasaravakkam', 'medavakkam', 'velachery'],
  },
  {
    slug: 'house-for-rent-in-t-nagar-chennai',
    title: 'House for Rent in T. Nagar, Chennai: Central Shopping Hub Rentals | Chennai Rents',
    h1: 'House for Rent in T. Nagar, Chennai',
    locality: 't-nagar',
    description: 'Find houses for rent in T. Nagar, Chennai. Central connectivity, suburban trains at Mambalam, and quiet residential cross-streets behind Usman Road.',
    priceRange: '₹18,000 – ₹45,000+ / month',
    recommendedLocalities: ['nungambakkam', 'adyar', 'valasaravakkam'],
  },
];
