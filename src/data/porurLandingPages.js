/**
 * Porur Programmatic SEO Landing Pages Master Repository
 * Production-ready content repository with granular street-level dynamics,
 * landlord negotiation guidance, flood & water analysis, utility benchmarks,
 * and structured metadata schemas.
 *
 * NOTE: All em dashes (U+2014) and en dashes (U+2013) are strictly replaced with standard hyphens (-)
 * to ensure 100% compliance with scripts/check-emdash.js.
 */

export const PORUR_GEO = {
  name: 'Porur',
  city: 'Chennai',
  pincode: '600116',
  latitude: 13.0360,
  longitude: 80.1572,
  geoBoundingBox: {
    north: 13.0550,
    south: 13.0150,
    east: 80.1800,
    west: 80.1350,
  },
};

export const PORUR_PAGES = [
  {
    slug: 'flats-for-rent-in-porur',
    intent: 'flats-for-rent-in-porur',
    pageType: 'Core Hub',
    category: 'typology',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-rent-in-porur',
    targetPrimaryKeywords: ['flats for rent in porur', 'apartments for rent porur chennai'],
    secondaryKeywords: ['apartments for rent porur', 'house rent porur', 'flats near dlf cybercity', 'west chennai rental flats'],
    metaTitle: 'Flats for Rent in Porur Chennai | 1RK to 3BHK Rentals',
    metaDescription: 'Explore verified flats for rent in Porur, Chennai. Filter by gated communities and builder floors near DLF Cybercity, L&T Infotech, and Ramachandra Hospital.',
    h1: 'Flats for Rent in Porur, Chennai',
    bhk: 'all',
    priceRange: { min: 5500, max: 48000, display: '₹11,000 - ₹45,000' },
    depositNorm: '4 - 6 months',
    leadParagraph: 'Porur is West Chennai\'s prime commercial powerhouse and educational hub. Located along the Mount-Poonamallee High Road, it bridges the manufacturing corridors of Sriperumbudur and Oragadam with inner Chennai\'s transit junctions. Fueled by DLF Cybercity (housing over 70,000 tech employees), L&T Infotech, Commerzone, and Sri Ramachandra Institute of Higher Education and Research (SRMC), Porur generates massive, year-round rental demand across medical students, doctors, and software consultants.',
    neighborhoodPockets: [
      { name: 'Mugalivakkam & Manapakkam Borders', detail: 'Primary tech commuter residential belt with immediate walking/feeder access to DLF Cybercity back gates and L&T campuses.' },
      { name: 'Madanandapuram & Vigneshwara Nagar', detail: 'Rapidly emerging, quiet residential layouts featuring modern builder floors, broader roads, and sweet groundwater.' },
      { name: 'Lakshmi Nagar & Porur Gardens', detail: 'Established, leafy residential enclaves with reputed CBSE schools, local temples, and peaceful family communities.' },
      { name: 'Karambakkam & Kundrathur Link Road', detail: 'Budget-friendly zone offering affordable 1RK, 1BHK, and shared bachelor homes with direct bus connections.' }
    ],
    marketSnapshot: [
      { type: '1RK Studio Rooms', rent: '₹5,500 - ₹8,500/month', deposit: '3-5 months' },
      { type: '1BHK Builder Floors', rent: '₹10,500 - ₹15,500/month', deposit: '3-5 months' },
      { type: '2BHK Standard Apartments', rent: '₹17,000 - ₹26,000/month', deposit: '4-6 months' },
      { type: '3BHK Gated Communities', rent: '₹28,000 - ₹48,000+/month', deposit: '6-8 months' },
    ],
    maintenanceNote: 'Average Maintenance Cost: ₹1,000 to ₹3,000/month in standalone builder floors; ₹2.5 to ₹4.0 per sq.ft in integrated gated societies.',
    monsoonReadiness: 'Porur benefits from strong natural groundwater percolation recharged by Porur Lake. Elevated sectors across Lakshmi Nagar, Madanandapuram, and Porur Gardens stay accessible and dry during heavy monsoon spells. Low-lying plots immediately adjacent to historic lake drainage channels require plinth verification.',
    faqs: [
      {
        q: 'What is the average rent for a 2BHK flat in Porur?',
        a: 'A standard 2BHK apartment in Porur ranges between ₹17,000 and ₹26,000 per month depending on society amenities, parking facilities, and proximity to Mount-Poonamallee Road.'
      },
      {
        q: 'How is the potable water situation in Porur?',
        a: 'Porur boasts dependable groundwater backed by the Porur Lake catchment basin, which keeps residential borewells productive year-round and reduces reliance on private water tankers.'
      },
      {
        q: 'What is the commute time to DLF Cybercity from central Porur?',
        a: 'DLF Cybercity is situated within a 5 to 10 minute drive or quick shared-auto ride from most residential streets in Porur, Karambakkam, and Mugalivakkam.'
      }
    ],
    lateralLinks: [
      { label: '1 BHK Flats', slug: '1bhk-flats-for-rent-in-porur' },
      { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-porur' },
      { label: '3 BHK Flats', slug: '3bhk-flats-for-rent-in-porur' },
      { label: 'Flats for Bachelors', slug: 'flats-for-bachelors-in-porur' },
      { label: 'Flats for Family', slug: 'flats-for-family-in-porur' },
      { label: 'Under ₹20,000', slug: 'flats-for-rent-under-20000-in-porur' }
    ]
  },
  {
    slug: '1rk-for-rent-in-porur',
    intent: '1rk-for-rent-in-porur',
    pageType: 'Compact Solo',
    category: 'typology',
    canonical: 'https://www.chennairents.in/chennai/porur/1rk-for-rent-in-porur',
    targetPrimaryKeywords: ['1rk for rent in porur', 'studio room rent porur'],
    secondaryKeywords: ['studio room porur', '1rk room rent porur', '1rk near dlf cybercity'],
    metaTitle: '1RK for Rent in Porur Chennai | Studio Rooms',
    metaDescription: 'Find independent 1RK studio rooms for rent in Porur. Budget-friendly rent, attached bathrooms, private entries, and quick access to DLF Cybercity.',
    h1: '1RK Studio Rooms for Rent in Porur',
    bhk: '1rk',
    priceRange: { min: 5500, max: 8500, display: '₹5,500 - ₹8,500' },
    depositNorm: '3 - 5 months',
    leadParagraph: 'A 1RK unit in Porur offers independent personal living for medical interns, nursing staff at SRMC, and entry-level IT developers at DLF. Ranging from 200 to 350 sq.ft, these self-sufficient units provide essential privacy and utility independence.',
    keyAdvantages: [
      { title: 'Independent Personal Living', desc: 'Private entry, attached bathroom, and total freedom from strict hostel or paying guest curfews.' },
      { title: 'Cooking Counter with Sink', desc: 'Built-in granite cooking platform allowing home cooking, slashing everyday meal expenses.' },
      { title: 'Dedicated Sub-metering', desc: 'Pay transparently for your personal power consumption on standard domestic electricity slabs.' }
    ],
    primeNeighborhoods: 'Top locations include Lakshmi Nagar, Karambakkam, and Madanandapuram inner residential avenues.',
    financials: [
      { label: 'Typical Monthly Rent', value: '₹5,500 to ₹8,500 per month' },
      { label: 'Security Deposit', value: '3 to 5 months rent' },
      { label: 'Maintenance Cost', value: '₹200 to ₹400/month' },
      { label: 'Lock-in Period', value: '6 months standard' }
    ],
    faqs: [
      {
        q: 'What is the deposit requirement for 1RK studio rooms in Porur?',
        a: 'Landlords generally request 3 to 5 months of rent advance, making it budget-friendly for interns and new job joiners.'
      },
      {
        q: 'Are 1RK rooms walkable from Sri Ramachandra Hospital (SRMC)?',
        a: 'Yes, numerous 1RK rooms along Porur Junction, Karambakkam, and Mount-Poonamallee feeder streets are within 5 to 10 minutes walk from SRMC.'
      },
      {
        q: 'Can two friends share a 1RK room in Porur?',
        a: 'Yes, dual sharing is commonly permitted, bringing individual monthly rent down to around ₹3,000 to ₹4,500.'
      }
    ],
    lateralLinks: [
      { label: '1 BHK Flats', slug: '1bhk-flats-for-rent-in-porur' },
      { label: 'Flats for Bachelors', slug: 'flats-for-bachelors-in-porur' },
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' },
      { label: 'Under ₹10,000', slug: 'flats-for-rent-under-10000-in-porur' }
    ]
  },
  {
    slug: '1bhk-flats-for-rent-in-porur',
    intent: '1bhk-flats-for-rent-in-porur',
    pageType: 'Solo / Couple',
    category: 'typology',
    canonical: 'https://www.chennairents.in/chennai/porur/1bhk-flats-for-rent-in-porur',
    targetPrimaryKeywords: ['1bhk flats for rent in porur', '1 bedroom flat porur'],
    secondaryKeywords: ['one bhk house rent porur', '1 bhk flat dlf cybercity', '1bhk near srmc porur'],
    metaTitle: '1BHK Flats for Rent in Porur Chennai | Verified Units',
    metaDescription: 'Browse verified 1BHK rental apartments in Porur. Independent builder floors and society flats near DLF IT Park, Mount-Poonamallee Road, and SRMC.',
    h1: '1BHK Flats for Rent in Porur, Chennai',
    bhk: '1bhk',
    priceRange: { min: 10500, max: 15500, display: '₹10,500 - ₹15,500' },
    depositNorm: '4 - 6 months',
    leadParagraph: 'A 1BHK flat in Porur provides between 450 and 620 sq.ft of practical living space, offering separate bedroom, living, and kitchen quarters. It is the leading typology for young IT couples, healthcare professionals, and solo remote engineers.',
    featuresList: [
      { title: 'Practical Living Area', desc: '480 to 600 sq.ft average super built-up area featuring dedicated living hall, separate kitchen, and private balcony.' },
      { title: 'Top Sub-localities', desc: 'Vigneshwara Nagar, Mugalivakkam border, Sakthi Nagar, and Lakshmi Nagar.' },
      { title: 'Common Amenities', desc: 'Covered bike parking, dependable borewell water supply, separate power meters, and elevator access in modern blocks.' }
    ],
    faqs: [
      {
        q: 'What is the standard rent for a 1BHK apartment in Porur?',
        a: 'Monthly rent for 1BHK flats in Porur ranges from ₹10,500 to ₹15,500 depending on location, building age, and furnishing.'
      },
      {
        q: 'Is car parking available with 1BHK flats in Porur?',
        a: 'Dedicated two-wheeler parking is standard. For compact cars, check availability directly as builder floors typically reserve car slots for 2BHK and 3BHK tenants.'
      },
      {
        q: 'How far are these 1BHK flats from DLF Cybercity?',
        a: 'Flats located in Mugalivakkam and Vigneshwara Nagar are situated within a 5-minute commute to DLF Cybercity.'
      }
    ],
    lateralLinks: [
      { label: '1RK Studios', slug: '1rk-for-rent-in-porur' },
      { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-porur' },
      { label: '1 BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-porur' },
      { label: 'Furnished Flats', slug: 'furnished-flats-for-rent-in-porur' },
      { label: 'Under ₹15,000', slug: 'flats-for-rent-under-15000-in-porur' }
    ]
  },
  {
    slug: '2bhk-flats-for-rent-in-porur',
    intent: '2bhk-flats-for-rent-in-porur',
    pageType: 'Core Demand',
    category: 'typology',
    canonical: 'https://www.chennairents.in/chennai/porur/2bhk-flats-for-rent-in-porur',
    targetPrimaryKeywords: ['2bhk flats for rent in porur', '2 bedroom flats porur'],
    secondaryKeywords: ['2 bhk flat rent in porur', '2 bedroom apartment porur', 'gated community 2bhk porur'],
    metaTitle: '2BHK Flats for Rent in Porur Chennai | Gated & Standalone',
    metaDescription: 'Rent verified 2BHK flats in Porur, Chennai. Quality builder floors and gated societies in Mugalivakkam, Madanandapuram, and near Porur Junction.',
    h1: '2BHK Flats for Rent in Porur, Chennai',
    bhk: '2bhk',
    priceRange: { min: 17000, max: 26000, display: '₹17,000 - ₹26,000' },
    depositNorm: '5 - 6 months',
    leadParagraph: 'The 2BHK configuration is Porur\'s core rental market. Sized between 850 and 1,150 sq.ft, these units suit both small families requiring proximity to reputed schools and corporate colleagues splitting living costs near DLF.',
    neighborhoodPockets: [
      { name: 'Madanandapuram & Vigneshwara Nagar', detail: 'Rapidly emerging layouts with modern builder floors, broader cross-streets, and quiet residential ambiance.' },
      { name: 'Lakshmi Nagar & Porur Gardens', detail: 'Central residential enclaves with reputed CBSE schools, local temples, and established family societies.' },
      { name: 'Mugalivakkam Main Road', detail: 'Favored by tech employees wanting to walk or take a 3-minute bike ride to DLF Cybercity gates.' }
    ],
    featuresList: [
      { title: 'Monthly Maintenance', desc: '₹1,000 to ₹3,000/month depending on standalone vs society facilities.' },
      { title: 'Infrastructure Highlights', desc: 'Dedicated car parking bays, lift access, reliable borewell supply, and easy connectivity to the Chennai Bypass.' },
      { title: 'Dimensions', desc: '850 to 1,150 sq.ft super built-up area with two full bathrooms and separate utility balcony.' }
    ],
    faqs: [
      {
        q: 'What is the rent for a 2BHK apartment in Porur?',
        a: 'Standalone builder floors rent for ₹17,000 to ₹21,000, while premium gated societies and newer complexes rent for ₹22,000 to ₹26,000 per month.'
      },
      {
        q: 'Are 2BHK flats in Porur equipped with car parking?',
        a: 'Yes, dedicated covered or open stilt car parking is standard with 2BHK apartments across both builder floors and societies.'
      },
      {
        q: 'Can roommates rent a 2BHK in Porur?',
        a: 'Yes, many landlords welcome corporate roommates working at DLF Cybercity or medical postgraduate residents from SRMC.'
      }
    ],
    lateralLinks: [
      { label: '3 BHK Flats', slug: '3bhk-flats-for-rent-in-porur' },
      { label: '2 BHK for Bachelors', slug: '2bhk-flats-for-bachelors-in-porur' },
      { label: '2 BHK for Family', slug: '2bhk-flats-for-family-in-porur' },
      { label: 'Under ₹20,000', slug: 'flats-for-rent-under-20000-in-porur' }
    ]
  },
  {
    slug: '3bhk-flats-for-rent-in-porur',
    intent: '3bhk-flats-for-rent-in-porur',
    pageType: 'Large Family',
    category: 'typology',
    canonical: 'https://www.chennairents.in/chennai/porur/3bhk-flats-for-rent-in-porur',
    targetPrimaryKeywords: ['3bhk flats for rent in porur', 'luxury apartments porur'],
    secondaryKeywords: ['3 bedroom luxury flat porur', '3bhk society flat porur', 'appaswamy trellis porur rent'],
    metaTitle: '3BHK Flats for Rent in Porur Chennai | Gated Communities',
    metaDescription: 'Discover luxury 3BHK rental apartments in Porur. Gated communities with power backup, 2 covered car parking bays, clubhouse, and security.',
    h1: '3BHK Flats for Rent in Porur, Chennai',
    bhk: '3bhk',
    priceRange: { min: 28000, max: 48000, display: '₹28,000 - ₹48,000+' },
    depositNorm: '6 - 10 months',
    leadParagraph: 'Built for expanding families, corporate senior staff, and doctors at SRMC, 3BHK apartments in Porur span 1,300 to 1,900+ sq.ft. Developments like Appaswamy Trellis, Casagrand complexes, and TVS Emerald projects lead this segment.',
    featuresList: [
      { title: 'Prominent Communities', desc: 'Appaswamy Trellis, Prestige Bella Vista (Iyyappanthangal/Porur border), TVS Emerald, and Casagrand complexes.' },
      { title: 'Resort-Style Amenities', desc: '100% DG power backup, dual covered car parking, gymnasium, swimming pool, and 24/7 manned security.' },
      { title: 'Generous Space', desc: '1,300 to 1,900+ sq.ft with spacious living rooms, 3 full bathrooms, modular kitchens, and balconies overlooking greenery.' }
    ],
    faqs: [
      {
        q: 'What is the rent expectation for 3BHK flats in Porur gated townships?',
        a: 'Township 3BHK flats rent between ₹28,000 and ₹42,000 per month, while fully furnished or luxury penthouse units range up to ₹48,000+.'
      },
      {
        q: 'Do 3BHK flats in Porur offer dual car parking slots?',
        a: 'Yes, most major developments including Appaswamy Trellis and Prestige Bella Vista provide two reserved covered car parking bays.'
      },
      {
        q: 'What are the typical society maintenance charges?',
        a: 'Maintenance charges in gated townships typically range from ₹3,500 to ₹6,500 per month covering 100% power backup, pool, gym, and groundskeeping.'
      }
    ],
    lateralLinks: [
      { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-porur' },
      { label: '3 BHK for Family', slug: '3bhk-flats-for-family-in-porur' },
      { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-porur' },
      { label: 'Furnished Flats', slug: 'furnished-flats-for-rent-in-porur' }
    ]
  },
  {
    slug: '1bhk-flats-for-bachelors-in-porur',
    intent: '1bhk-flats-for-bachelors-in-porur',
    pageType: 'Bachelor Solo',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/1bhk-flats-for-bachelors-in-porur',
    targetPrimaryKeywords: ['1bhk flats for bachelors in porur', 'bachelor 1bhk porur'],
    secondaryKeywords: ['bachelor friendly 1bhk porur', 'bachelor flat dlf porur', '1bhk near l&t tech park'],
    metaTitle: '1BHK Flats for Bachelors in Porur | Near DLF Cybercity',
    metaDescription: 'Find bachelor-friendly 1BHK flats for rent in Porur. Flexible landlords, late-shift friendly policies, and 5-minute transit to DLF Cybercity.',
    h1: '1BHK Flats for Bachelors in Porur',
    bhk: '1bhk',
    priceRange: { min: 10000, max: 14500, display: '₹10,000 - ₹14,500' },
    depositNorm: '3 - 5 months',
    leadParagraph: 'Finding bachelor housing near tech corridors can often be hindered by rigid housing restrictions. This curated inventory targets verified bachelor-welcoming owners across Porur who understand rotational IT shifts.',
    keyAdvantages: [
      { title: 'Zero Shift Friction', desc: 'Landlords accommodate night shifts, emergency hospital duties, and odd work timings without moral policing.' },
      { title: 'Rapid Commute to DLF & SRMC', desc: 'Under 10 minutes to DLF Cybercity, L&T Infotech, Commerzone, and Sri Ramachandra Hospital.' },
      { title: 'Clear Tenancy Terms', desc: 'Fair security deposits (3 to 5 months) with separate power meters and reserved bike parking.' }
    ],
    faqs: [
      {
        q: 'Do owners allow bachelors on rotational night shifts in Porur?',
        a: 'Yes, our verified bachelor listings are hosted by owners who fully understand IT shifts and medical duty rotations.'
      },
      {
        q: 'What is the required security deposit for bachelors?',
        a: 'The deposit is typically 3 to 5 months of rent, considerably lower than traditional family demands.'
      },
      {
        q: 'Can two bachelor friends share a 1BHK in Porur?',
        a: 'Yes, dual sharing is common, cutting monthly per-person costs to approximately ₹5,000 to ₹7,000.'
      }
    ],
    lateralLinks: [
      { label: '2 BHK for Bachelors', slug: '2bhk-flats-for-bachelors-in-porur' },
      { label: 'Bachelor Flats Hub', slug: 'flats-for-bachelors-in-porur' },
      { label: '1RK Studios', slug: '1rk-for-rent-in-porur' },
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' }
    ]
  },
  {
    slug: '2bhk-flats-for-bachelors-in-porur',
    intent: '2bhk-flats-for-bachelors-in-porur',
    pageType: 'Bachelor Shared',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/2bhk-flats-for-bachelors-in-porur',
    targetPrimaryKeywords: ['2bhk flats for bachelors in porur', 'shared flat bachelors porur'],
    secondaryKeywords: ['flat sharing bachelors porur', '2bhk for roommates porur', 'bachelor flat near dlf cybercity'],
    metaTitle: '2BHK Flats for Bachelors in Porur | Share & Save Rent',
    metaDescription: 'Rent verified 2BHK flats for bachelors in Porur. Split rent with colleagues near DLF, L&T, and Mount-Poonamallee Road with zero travel stress.',
    h1: '2BHK Flats for Bachelors in Porur',
    bhk: '2bhk',
    priceRange: { min: 16500, max: 24000, display: '₹16,500 - ₹24,000' },
    depositNorm: '4 - 6 months',
    leadParagraph: 'Sharing a 2BHK flat among colleagues or medical postgraduate residents drastically cuts monthly expenses while ensuring private bedrooms and personal autonomy.',
    financials: [
      { label: 'Total Monthly Rent', value: '₹16,500 to ₹24,000 per month' },
      { label: 'Per-Person Split', value: '₹4,500 to ₹8,000 per person' },
      { label: 'Security Deposit', value: '4 to 6 months split among flatmates' },
      { label: 'Tenant Replacement Clause', value: 'Permitted with 30-day notice without deposit dispute' }
    ],
    primeNeighborhoods: 'Top roommate pockets include Mugalivakkam Main Road, Madanandapuram, and Kundrathur Main Road link.',
    faqs: [
      {
        q: 'What is the per-person monthly expenditure in a shared 2BHK?',
        a: 'Splitting rent, maintenance, and internet among 3 roommates averages ₹6,000 to ₹8,500 per month each.'
      },
      {
        q: 'Can roommates replace a departing member without breaking the lease?',
        a: 'Yes, rental agreements include a tenant replacement addendum permitting smooth substitution with landlord consent.'
      },
      {
        q: 'Are cooking privileges and cylinder connections supported?',
        a: 'Yes, complete kitchen autonomy with gas or induction connections is standard.'
      }
    ],
    lateralLinks: [
      { label: '1 BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-porur' },
      { label: 'Bachelor Flats Hub', slug: 'flats-for-bachelors-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' },
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' }
    ]
  },
  {
    slug: '2bhk-flats-for-family-in-porur',
    intent: '2bhk-flats-for-family-in-porur',
    pageType: 'Family Mid-size',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/2bhk-flats-for-family-in-porur',
    targetPrimaryKeywords: ['2bhk flats for family in porur', 'family apartments porur'],
    secondaryKeywords: ['family flats porur', 'safe flats for family porur', '2bhk family flats near psbb millennium'],
    metaTitle: '2BHK Flats for Family in Porur | Safe Residential Pockets',
    metaDescription: 'Safe and peaceful 2BHK family flats for rent in Porur. Close to PSBB Millennium, Pon Vidyashram, hospitals, and quiet layout streets.',
    h1: '2BHK Flats for Family in Porur, Chennai',
    bhk: '2bhk',
    priceRange: { min: 17500, max: 25000, display: '₹17,500 - ₹25,000' },
    depositNorm: '5 - 6 months',
    leadParagraph: 'Porur provides complete family infrastructure: peaceful residential colonies, premier schools, multi-specialty medical institutions, and organized shopping centers.',
    featuresList: [
      { title: 'Top Schooling Access', desc: 'Short bus ride or walkable access to The PSBB Millennium School, Pon Vidyashram, and St. John\'s Residential.' },
      { title: 'Premier Healthcare', desc: 'Immediate proximity to Sri Ramachandra Medical Centre (SRMC) and MIOT International Hospital.' },
      { title: 'Peaceful Family Enclaves', desc: 'Porur Gardens, Lakshmi Nagar, Vigneshwara Nagar, and Madanandapuram.' }
    ],
    faqs: [
      {
        q: 'Which residential areas in Porur are most recommended for families?',
        a: 'Porur Gardens, Lakshmi Nagar, and Madanandapuram are widely favored for their quiet avenue streets, active RWAs, and family atmosphere.'
      },
      {
        q: 'What schools are nearby in Porur?',
        a: 'The PSBB Millennium School, Pon Vidyashram, Swamy\'s School, and St. John\'s Residential School are easily reachable.'
      },
      {
        q: 'Is municipal drinking water available in family societies?',
        a: 'Most family buildings combine clean CMWSSB pipeline water connections with sweet borewell water.'
      }
    ],
    lateralLinks: [
      { label: '3 BHK for Family', slug: '3bhk-flats-for-family-in-porur' },
      { label: 'Family Flats Hub', slug: 'flats-for-family-in-porur' },
      { label: '2 BHK Standard', slug: '2bhk-flats-for-rent-in-porur' },
      { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-porur' }
    ]
  },
  {
    slug: '3bhk-flats-for-family-in-porur',
    intent: '3bhk-flats-for-family-in-porur',
    pageType: 'Family Expansive',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/3bhk-flats-for-family-in-porur',
    targetPrimaryKeywords: ['3bhk flats for family in porur', 'spacious family homes porur'],
    secondaryKeywords: ['3bhk gated family apartment porur', 'luxury family flat porur', 'gated family township porur'],
    metaTitle: '3BHK Flats for Family in Porur | Gated Societies & Parking',
    metaDescription: 'Explore large 3BHK family flats in Porur. Gated communities with round-the-clock security, backup power, parks, and parking.',
    h1: '3BHK Flats for Family in Porur, Chennai',
    bhk: '3bhk',
    priceRange: { min: 28000, max: 45000, display: '₹28,000 - ₹45,000' },
    depositNorm: '6 - 10 months',
    leadParagraph: 'A 3BHK family apartment in Porur delivers generous living areas, separate utility balconies, and three bedrooms, ideal for joint families or households supporting senior parents.',
    featuresList: [
      { title: 'Community Recreation', desc: 'Dedicated children\'s play zones, senior walking tracks, swimming pool, clubhouse, and landscaped gardens.' },
      { title: 'Security & Backup', desc: '24/7 security with CCTV monitoring, dual elevators per block, and 100% DG power backup.' },
      { title: 'Transit Advantage', desc: 'Fast 10-minute access to the Chennai Bypass and Outer Ring Road for smooth weekend intercity travel.' }
    ],
    faqs: [
      {
        q: 'What is the rent for a 3BHK family apartment in a Porur society?',
        a: 'Standard 3BHK family apartments rent between ₹28,000 and ₹45,000 per month depending on society scale and furnishings.'
      },
      {
        q: 'Are gated townships pet-friendly in Porur?',
        a: 'Yes, most large gated townships like Prestige Bella Vista and Appaswamy Trellis have designated walking trails and pet-welcoming guidelines.'
      },
      {
        q: 'How is senior citizen accessibility in 3BHK societies?',
        a: 'Societies offer step-free ramp access, stretcher-capable elevators, and quiet walking parks separated from driveway traffic.'
      }
    ],
    lateralLinks: [
      { label: '2 BHK for Family', slug: '2bhk-flats-for-family-in-porur' },
      { label: 'Family Flats Hub', slug: 'flats-for-family-in-porur' },
      { label: '3 BHK Standard', slug: '3bhk-flats-for-rent-in-porur' },
      { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-porur' }
    ]
  },
  {
    slug: 'flats-for-bachelors-in-porur',
    intent: 'flats-for-bachelors-in-porur',
    pageType: 'Bachelor Umbrella',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-bachelors-in-porur',
    targetPrimaryKeywords: ['flats for bachelors in porur', 'bachelor accommodation porur'],
    secondaryKeywords: ['bachelor rooms porur', 'bachelor accommodation porur dlf', 'bachelor flats near srmc'],
    metaTitle: 'Flats for Bachelors in Porur | 100% Bachelor Verified',
    metaDescription: 'Explore bachelor flats for rent in Porur across 1RK, 1BHK, 2BHK, and 3BHK layouts. No intrusive rules, fair deposits, and instant move-ins.',
    h1: 'Bachelor Flats for Rent in Porur',
    bhk: 'all',
    priceRange: { min: 6000, max: 28000, display: '₹6,000 - ₹28,000' },
    depositNorm: '3 - 6 months',
    leadParagraph: 'This aggregate portal eliminates the friction of bachelor flat-hunting in West Chennai. All listings belong to owners who explicitly accept corporate bachelor groups, tech associates, and medical interns.',
    marketSnapshot: [
      { type: '1RK Studios', rent: '₹5,500 - ₹8,500/month', deposit: '3-4 months' },
      { type: '1BHK Bachelor Units', rent: '₹10,000 - ₹14,500/month', deposit: '4-5 months' },
      { type: '2BHK Shared Flats (per person)', rent: '₹4,500 - ₹8,000/month', deposit: '3-5 months split' },
      { type: '3BHK Shared Flats (per person)', rent: '₹6,500 - ₹10,000/month', deposit: '4-6 months split' }
    ],
    faqs: [
      {
        q: 'Why rent a bachelor flat in Porur through ChennaiRents?',
        a: 'We list verified direct owner properties that explicitly welcome bachelors, eliminating broker fees and moral policing.'
      },
      {
        q: 'What is the transit advantage for bachelors living in Porur?',
        a: 'Immediate connectivity to Mount-Poonamallee bus bays, DLF company shuttle drop points, and shared auto stands.'
      },
      {
        q: 'Are visitors permitted in bachelor apartments in Porur?',
        a: 'Yes, independent builder floors offer complete personal privacy within basic society decorum.'
      }
    ],
    lateralLinks: [
      { label: '1 BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-porur' },
      { label: '2 BHK for Bachelors', slug: '2bhk-flats-for-bachelors-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' },
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' }
    ]
  },
  {
    slug: 'flats-for-family-in-porur',
    intent: 'flats-for-family-in-porur',
    pageType: 'Family Umbrella',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-family-in-porur',
    targetPrimaryKeywords: ['flats for family in porur', 'family apartments porur'],
    secondaryKeywords: ['family houses for rent porur', 'family builder floors porur', 'gated family flats porur'],
    metaTitle: 'Family Flats for Rent in Porur | Peaceful Living',
    metaDescription: 'Rent verified family apartments in Porur. Sweet groundwater, broad layout roads, reputable CBSE schools, and community living.',
    h1: 'Family Flats for Rent in Porur, Chennai',
    bhk: 'all',
    priceRange: { min: 17000, max: 42000, display: '₹17,000 - ₹42,000' },
    depositNorm: '5 - 8 months',
    leadParagraph: 'Focusing strictly on residential tranquility, these family properties offer child-safe environments, active resident welfare associations, and proximity to daily conveniences.',
    featuresList: [
      { title: 'Available Inventory', desc: 'Semi-furnished 2BHK, 2.5BHK, and 3BHK builder floors and gated societies.' },
      { title: 'Sweet Groundwater', desc: 'Exceptional groundwater table recharged by Porur Lake, keeping borewells functional across dry summer months.' },
      { title: 'Community Living', desc: 'Active Resident Welfare Associations (RWAs), wide 30-to-40-foot layout roads, and reliable stormwater drain connections.' }
    ],
    faqs: [
      {
        q: 'What is the rental bracket for family homes in Porur?',
        a: 'Family 2BHK flats range from ₹17,000 to ₹25,000, while 3BHK units range from ₹28,000 to ₹42,000 per month.'
      },
      {
        q: 'How good is the water quality in family residential pockets?',
        a: 'Groundwater in Porur is naturally sweet and plentiful, requiring only standard domestic RO filtration for drinking.'
      },
      {
        q: 'Are local markets and supermarkets within walking distance?',
        a: 'Yes, everyday markets, Nilgiris, Reliance Fresh, and specialized organic outlets are densely clustered along Arcot Road and Mount-Poonamallee Road.'
      }
    ],
    lateralLinks: [
      { label: '2 BHK for Family', slug: '2bhk-flats-for-family-in-porur' },
      { label: '3 BHK for Family', slug: '3bhk-flats-for-family-in-porur' },
      { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-porur' },
      { label: 'Furnished Flats', slug: 'furnished-flats-for-rent-in-porur' }
    ]
  },
  {
    slug: 'co-living-in-porur',
    intent: 'co-living-in-porur',
    pageType: 'Managed Stays',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/co-living-in-porur',
    targetPrimaryKeywords: ['co living in porur', 'coliving spaces porur'],
    secondaryKeywords: ['coliving space porur', 'fully managed rooms porur', 'managed co-living near dlf'],
    metaTitle: 'Co-Living Spaces in Porur | Managed Modern Stays',
    metaDescription: 'Modern co-living accommodations in Porur. High-speed Wi-Fi, daily housekeeping, food options, and free listing and follow up near DLF Cybercity.',
    h1: 'Co-Living Spaces in Porur, Chennai',
    bhk: 'pg',
    priceRange: { min: 6500, max: 22000, display: '₹6,500 - ₹22,000' },
    depositNorm: '1 - 2 months',
    leadParagraph: 'Co-living spaces provide a seamless move-in experience for corporate professionals working at DLF Cybercity or medical postgraduates at Ramachandra.',
    tariffDetails: [
      { sharing: 'Triple Sharing', tariff: '₹6,500 - ₹8,500 / bed / month', desc: 'Economical option for junior software associates and trainees.' },
      { sharing: 'Double Sharing', tariff: '₹9,500 - ₹13,000 / bed / month', desc: 'Balanced option with attached bath, AC, and dedicated wardrobe.' },
      { sharing: 'Private Studio', tariff: '₹16,000 - ₹22,000 / month', desc: 'Full personal autonomy with dedicated workspace, smart TV, and balcony.' }
    ],
    amenitiesIncluded: [
      'High-speed optical fiber internet (200+ Mbps)',
      'Bi-weekly thorough room cleaning and linen changes',
      'Smart laundry machines and iron stations',
      'Biometric main door entry with CCTV monitoring',
      'Community breakout workspace and cafeteria'
    ],
    faqs: [
      {
        q: 'What is included in the monthly co-living fee in Porur?',
        a: 'The all-inclusive fee covers rent, high-speed Wi-Fi, housekeeping, water, maintenance, and common area amenities.'
      },
      {
        q: 'Is there a long lock-in period for co-living in Porur?',
        a: 'No, most facilities operate on flexible 1 to 3 month agreements with a simple 30-day move-out notice.'
      },
      {
        q: 'Are co-living spaces close to DLF IT Park?',
        a: 'Yes, major co-living operators have properties located within 500m to 1.5 km of DLF Cybercity gates in Mugalivakkam and Porur.'
      }
    ],
    lateralLinks: [
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' },
      { label: 'PG for Women', slug: 'pg-for-women-in-porur' },
      { label: '1RK Studios', slug: '1rk-for-rent-in-porur' },
      { label: 'Flats for Bachelors', slug: 'flats-for-bachelors-in-porur' }
    ]
  },
  {
    slug: 'pg-for-men-in-porur',
    intent: 'pg-for-men-in-porur',
    pageType: 'Gents PG',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/pg-for-men-in-porur',
    targetPrimaryKeywords: ['pg for men in porur', 'gents pg in porur'],
    secondaryKeywords: ['gents hostel porur', 'mens pg near dlf cybercity', 'mens pg near srmc porur'],
    metaTitle: 'PG for Men in Porur Chennai | Food, AC & WiFi Included',
    metaDescription: 'Top gents PG and hostels in Porur near DLF Cybercity and Ramachandra Hospital. South Indian food, AC rooms, and bike parking.',
    h1: 'PG for Men in Porur, Chennai',
    bhk: 'pg',
    priceRange: { min: 5500, max: 11000, display: '₹5,500 - ₹11,000' },
    depositNorm: '1 - 2 months',
    leadParagraph: 'Positioned conveniently for male professionals working at DLF, Commerzone, or nearby industrial hubs, these PGs handle daily food, maintenance, and utility bills under one predictable fee.',
    featuresList: [
      { title: 'Predictable Monthly Rates', desc: '₹5,500 to ₹11,000 per month depending on AC/non-AC and sharing configurations.' },
      { title: 'Standard Package', desc: '3 home-style meals daily, RO purified drinking water, hot water geysers, CCTV security, and dedicated bike parking.' },
      { title: 'Top Localities', desc: 'Near Porur Junction, Mugalivakkam, and Mount-Poonamallee Road.' }
    ],
    faqs: [
      {
        q: 'What meals are served in gents PGs in Porur?',
        a: 'Three daily meals are typically served, consisting of authentic South Indian breakfasts, packed office lunches, and dinners, with special non-veg menus on Sundays.'
      },
      {
        q: 'What is the advance deposit required for men\'s PGs?',
        a: 'Usually 1 to 2 months of monthly rent (₹5,000 to ₹10,000), refundable upon departure with 15 to 30 days notice.'
      },
      {
        q: 'Is bike parking provided?',
        a: 'Yes, designated covered two-wheeler parking is standard across all verified PGs.'
      }
    ],
    lateralLinks: [
      { label: 'PG for Women', slug: 'pg-for-women-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' },
      { label: '1RK Studios', slug: '1rk-for-rent-in-porur' },
      { label: 'Flats for Bachelors', slug: 'flats-for-bachelors-in-porur' }
    ]
  },
  {
    slug: 'pg-for-women-in-porur',
    intent: 'pg-for-women-in-porur',
    pageType: 'Ladies PG',
    category: 'demographic',
    canonical: 'https://www.chennairents.in/chennai/porur/pg-for-women-in-porur',
    targetPrimaryKeywords: ['pg for women in porur', 'ladies hostel porur'],
    secondaryKeywords: ['ladies hostel porur', 'safe womens pg porur', 'womens pg near ramachandra hospital'],
    metaTitle: 'Safe PG for Women in Porur | Secure Ladies Hostels',
    metaDescription: 'Safe, verified ladies PGs and women\'s hostels in Porur. Biometric security, resident warden, home-style food, AC, and Wi-Fi near SRMC and DLF.',
    h1: 'Safe PG for Women in Porur, Chennai',
    bhk: 'pg',
    priceRange: { min: 6000, max: 12000, display: '₹6,000 - ₹12,000' },
    depositNorm: '1 - 2 months',
    leadParagraph: 'Porur is widely recognized for its safe, accessible residential environment. Our selected ladies\' PGs provide a secure, comfortable setting for female engineers, doctors, and students.',
    featuresList: [
      { title: 'Strict Safety Protocols', desc: '24/7 on-site female wardens, biometric gate entry, digital visitor logging, and full CCTV coverage across common areas.' },
      { title: 'Prime Location Benefits', desc: 'Well-lit access routes to MTC bus stops along Mount-Poonamallee Road, daily grocery outlets, and clinics.' },
      { title: 'Transparent Pricing', desc: '₹6,000 to ₹12,000 per month covering AC/non-AC rooms, 3 hygienic meals, and high-speed Wi-Fi.' }
    ],
    faqs: [
      {
        q: 'How secure are women\'s hostels in Porur?',
        a: 'Properties feature round-the-clock female wardens, biometric door locks, comprehensive CCTV in common areas, and strict visitor verification.'
      },
      {
        q: 'Are medical duty and night shift timings accommodated?',
        a: 'Yes, hostels near Sri Ramachandra Hospital (SRMC) and DLF accommodate night shift rotations upon submitting official duty letters.'
      },
      {
        q: 'Is home-style food provided?',
        a: 'Yes, hygienic home-cooked vegetarian and non-vegetarian meals with filtered drinking water are served daily.'
      }
    ],
    lateralLinks: [
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' },
      { label: '1BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-porur' },
      { label: 'Flats for Bachelors', slug: 'flats-for-bachelors-in-porur' }
    ]
  },
  {
    slug: 'independent-houses-for-rent-in-porur',
    intent: 'independent-houses-for-rent-in-porur',
    pageType: 'Private Living',
    category: 'furnishing',
    canonical: 'https://www.chennairents.in/chennai/porur/independent-houses-for-rent-in-porur',
    targetPrimaryKeywords: ['independent houses for rent in porur', 'individual house rent porur'],
    secondaryKeywords: ['individual house rent porur', 'villa rent porur', 'independent duplex house porur'],
    metaTitle: 'Independent Houses for Rent in Porur | Private Villas',
    metaDescription: 'Discover independent houses and private bungalows for rent in Porur. Enjoy private car porches, exclusive terraces, and quiet gardens.',
    h1: 'Independent Houses for Rent in Porur',
    bhk: 'independent',
    priceRange: { min: 20000, max: 55000, display: '₹20,000 - ₹55,000+' },
    depositNorm: '6 - 10 months',
    leadParagraph: 'For tenants seeking complete privacy without shared walls or apartment association rules, Porur offers a substantial inventory of standalone houses and independent bungalow floors.',
    featuresList: [
      { title: 'Prime Localities', desc: 'Porur Gardens, Madanandapuram, and Vigneshwara Nagar.' },
      { title: 'Typical Rent Range', desc: '₹20,000 to ₹55,000+ per month (2BHK ground floors to expansive 4BHK duplex houses).' },
      { title: 'Ideal Match', desc: 'Families needing private ground-floor garden space, covered multi-car parking, or pet-friendly living setups.' }
    ],
    faqs: [
      {
        q: 'Can pet owners rent independent houses in Porur?',
        a: 'Yes, standalone houses with gated compounds and private yards are ideal for pet owners.'
      },
      {
        q: 'What is the parking capacity of independent houses in Porur?',
        a: 'Most independent homes feature dedicated private car porches accommodating 1 to 2 four-wheelers plus additional two-wheelers.'
      },
      {
        q: 'How is water managed in independent houses?',
        a: 'Standalone homes have private deep borewells with overhead tanks and sumps, benefitting from Porur\'s healthy water table.'
      }
    ],
    lateralLinks: [
      { label: '3 BHK Flats', slug: '3bhk-flats-for-rent-in-porur' },
      { label: '3 BHK for Family', slug: '3bhk-flats-for-family-in-porur' },
      { label: 'Furnished Flats', slug: 'furnished-flats-for-rent-in-porur' },
      { label: 'Flats for Family', slug: 'flats-for-family-in-porur' }
    ]
  },
  {
    slug: 'furnished-flats-for-rent-in-porur',
    intent: 'furnished-flats-for-rent-in-porur',
    pageType: 'Turnkey Flat',
    category: 'furnishing',
    canonical: 'https://www.chennairents.in/chennai/porur/furnished-flats-for-rent-in-porur',
    targetPrimaryKeywords: ['furnished flats for rent in porur', 'fully furnished apartment porur'],
    secondaryKeywords: ['fully furnished flat porur', 'furnished 2bhk rent porur', 'furnished flats near dlf cybercity'],
    metaTitle: 'Fully Furnished Flats for Rent in Porur | Turnkey Stays',
    metaDescription: 'Move-in ready furnished flats for rent in Porur. Fitted with ACs, modular kitchens, beds, sofas, TV, and premium home appliances near DLF.',
    h1: 'Furnished Flats for Rent in Porur',
    bhk: 'all',
    priceRange: { min: 20000, max: 45000, display: '₹20,000 - ₹45,000' },
    depositNorm: '5 - 8 months',
    leadParagraph: 'Eliminate the hassle of moving heavy appliances and buying furniture. These furnished apartments are ready for immediate occupancy with full household fittings.',
    includedChecklist: [
      'Inverter ACs installed in bedrooms and living hall',
      'Double-door frost-free refrigerator and microwave oven',
      'Fully automatic front-loading or top-loading washing machine',
      'Gas stove, chimney, and modular kitchen storage units',
      'Living room sofa set, center table, and LED television',
      'Wardrobe-fitted beds with premium mattresses'
    ],
    faqs: [
      {
        q: 'What appliances are included in furnished flats in Porur?',
        a: 'Standard fittings include split ACs, refrigerator, washing machine, LED TV, modular gas kitchen, and bedroom furniture.'
      },
      {
        q: 'How much higher is rent for furnished vs unfurnished flats in Porur?',
        a: 'Furnished flats typically cost ₹4,000 to ₹7,000 more per month than standard unfurnished builder units.'
      },
      {
        q: 'Is an inventory check conducted before move-in?',
        a: 'Yes, a comprehensive appliance and furniture inventory list is verified and signed by both parties at lease commencement.'
      }
    ],
    lateralLinks: [
      { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-porur' },
      { label: '3 BHK Flats', slug: '3bhk-flats-for-rent-in-porur' },
      { label: 'Independent Houses', slug: 'independent-houses-for-rent-in-porur' },
      { label: 'Co-Living Spaces', slug: 'co-living-in-porur' }
    ]
  },
  {
    slug: 'flats-for-rent-under-10000-in-porur',
    intent: 'flats-for-rent-under-10000-in-porur',
    pageType: 'Budget Floor',
    category: 'budget',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-rent-under-10000-in-porur',
    targetPrimaryKeywords: ['flats for rent under 10000 in porur', 'budget flats porur'],
    secondaryKeywords: ['rooms under 10k porur', 'budget rentals porur', '1rk under 10000 porur'],
    metaTitle: 'Flats for Rent Under ₹10,000 in Porur | Budget Homes',
    metaDescription: 'Find affordable flats and compact 1RK/1BHK homes for rent under ₹10,000 in Porur. Low deposits and easy bus connectivity to DLF.',
    h1: 'Flats for Rent Under ₹10,000 in Porur',
    bhk: '1rk',
    priceRange: { min: 5500, max: 10000, display: '₹5,500 - ₹10,000' },
    depositNorm: '3 - 5 months',
    leadParagraph: 'Porur offers solid value for renters on a strict ₹10,000 budget, particularly in mature residential pockets featuring well-kept standalone houses.',
    featuresList: [
      { title: 'Typical Typologies', desc: 'Spacious 1RK units, compact 1BHK builder floors (350-450 sq.ft), or terrace penthouse units.' },
      { title: 'Top Value Pockets', desc: 'Inner pockets of Karambakkam, Madanandapuram, and Kundrathur Road borders.' },
      { title: 'Cost Advantage', desc: 'Negligible maintenance fees (₹200 to ₹400/month) and separate electrical meters on standard domestic slabs.' }
    ],
    faqs: [
      {
        q: 'Can I find a 1BHK flat in Porur under ₹10,000?',
        a: 'Yes, compact 1BHK builder units (350-450 sq.ft) on interior roads in Karambakkam and Kundrathur Road rent for ₹8,500 to ₹10,000.'
      },
      {
        q: 'What deposit is needed for rentals under ₹10,000 in Porur?',
        a: 'Most landlords ask for 3 to 5 months of rent advance (₹25,000 to ₹50,000).'
      },
      {
        q: 'How is the bus connectivity from budget pockets?',
        a: 'MTC buses and share autos run regularly along Mount-Poonamallee Road, providing direct access to DLF and Guindy.'
      }
    ],
    lateralLinks: [
      { label: 'Under ₹15,000', slug: 'flats-for-rent-under-15000-in-porur' },
      { label: 'Under ₹20,000', slug: 'flats-for-rent-under-20000-in-porur' },
      { label: '1RK Studios', slug: '1rk-for-rent-in-porur' },
      { label: 'PG for Men', slug: 'pg-for-men-in-porur' }
    ]
  },
  {
    slug: 'flats-for-rent-under-15000-in-porur',
    intent: 'flats-for-rent-under-15000-in-porur',
    pageType: 'Mid-Budget',
    category: 'budget',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-rent-under-15000-in-porur',
    targetPrimaryKeywords: ['flats for rent under 15000 in porur', '1bhk 2bhk under 15k porur'],
    secondaryKeywords: ['1bhk under 15000 porur', '2bhk under 15k porur', 'budget apartments porur'],
    metaTitle: 'Flats for Rent Under ₹15,000 in Porur | 1BHK & 2BHK',
    metaDescription: 'Discover rental apartments under ₹15,000 in Porur. Quality 1BHK flats and budget-friendly 2BHK builder floors near Mount-Poonamallee Road.',
    h1: 'Flats for Rent Under ₹15,000 in Porur',
    bhk: '1bhk',
    priceRange: { min: 10000, max: 15000, display: '₹10,000 - ₹15,000' },
    depositNorm: '4 - 6 months',
    leadParagraph: 'The ₹10,000 to ₹15,000 rental segment represents a major volume driver in West Chennai. In Porur, this budget secures modern 1BHK flats or older-stock 2BHK builder floors.',
    featuresList: [
      { title: 'Inventory Profile', desc: 'Full-sized 1BHK apartments (550+ sq.ft) with separate utility balconies, or practical 2BHK units (750-850 sq.ft) in standalone buildings.' },
      { title: 'Top Localities', desc: 'Mugalivakkam, Madanandapuram, and Lakshmi Nagar inner avenues.' },
      { title: 'Key Features', desc: 'Covered two-wheeler parking, reliable borewell supply, and good cross-ventilation.' }
    ],
    faqs: [
      {
        q: 'What types of apartments can I rent under ₹15,000 in Porur?',
        a: 'You can secure spacious 1BHK flats (550+ sq.ft) or compact older 2BHK builder floors in Madanandapuram and Mugalivakkam.'
      },
      {
        q: 'Are these apartments suitable for small families?',
        a: 'Yes, 1BHK and compact 2BHK units in this tier are well suited for couples or small families.'
      },
      {
        q: 'Is borewell water included in this rental bracket?',
        a: 'Yes, continuous sweet borewell water is typically bundled into the rent or covered by nominal maintenance.'
      }
    ],
    lateralLinks: [
      { label: 'Under ₹10,000', slug: 'flats-for-rent-under-10000-in-porur' },
      { label: 'Under ₹20,000', slug: 'flats-for-rent-under-20000-in-porur' },
      { label: '1 BHK Flats', slug: '1bhk-flats-for-rent-in-porur' },
      { label: '1 BHK for Bachelors', slug: '1bhk-flats-for-bachelors-in-porur' }
    ]
  },
  {
    slug: 'flats-for-rent-under-20000-in-porur',
    intent: 'flats-for-rent-under-20000-in-porur',
    pageType: 'Prime Budget',
    category: 'budget',
    canonical: 'https://www.chennairents.in/chennai/porur/flats-for-rent-under-20000-in-porur',
    targetPrimaryKeywords: ['flats for rent under 20000 in porur', '2bhk under 20000 porur'],
    secondaryKeywords: ['2bhk under 20000 porur', 'flats in porur under 20k', 'semi furnished 2bhk porur'],
    metaTitle: 'Flats for Rent Under ₹20,000 in Porur | Prime 2BHKs',
    metaDescription: 'Browse rental apartments under ₹20,000 in Porur. Modern 2BHK flats with reserved car parking, lift, and modular kitchens near DLF IT Park.',
    h1: 'Flats for Rent Under ₹20,000 in Porur',
    bhk: '2bhk',
    priceRange: { min: 16000, max: 20000, display: '₹16,000 - ₹20,000' },
    depositNorm: '5 - 6 months',
    leadParagraph: 'A monthly budget of ₹16,000 to ₹20,000 unlocks quality 2BHK builder floors and boutique society flats in Porur.',
    featuresList: [
      { title: 'Available Stock', desc: 'Semi-furnished 2BHK apartments (850-1,100 sq.ft) with modular woodwork, fitted wardrobes, and lofts.' },
      { title: 'Prime Neighborhoods', desc: 'Porur Gardens, Lakshmi Nagar, and Mugalivakkam.' },
      { title: 'Value Profile', desc: 'Wide 30-foot approach roads, dedicated stilt car parking, quick 10-minute access to DLF Cybercity, and peaceful residential surroundings.' }
    ],
    faqs: [
      {
        q: 'Can I get a semi-furnished 2BHK with car parking under ₹20,000 in Porur?',
        a: 'Yes, numerous 2BHK builder floors in Porur Gardens, Lakshmi Nagar, and Mugalivakkam include reserved stilt car parking for ₹17,000 to ₹20,000.'
      },
      {
        q: 'How far are these 2BHK flats from DLF Cybercity?',
        a: 'Most are within a 5 to 10 minute drive or bike ride to DLF Cybercity.'
      },
      {
        q: 'What is the deposit norm for a ₹20,000 flat in Porur?',
        a: 'Landlords traditionally ask for 5 to 6 months of rent (₹1,00,000 to ₹1,20,000), which can be negotiated with corporate proof.'
      }
    ],
    lateralLinks: [
      { label: 'Under ₹15,000', slug: 'flats-for-rent-under-15000-in-porur' },
      { label: '2 BHK Flats', slug: '2bhk-flats-for-rent-in-porur' },
      { label: '2 BHK for Family', slug: '2bhk-flats-for-family-in-porur' },
      { label: '2 BHK for Bachelors', slug: '2bhk-flats-for-bachelors-in-porur' }
    ]
  }
];

export const PORUR_PAGES_MAP = Object.fromEntries(
  PORUR_PAGES.map((page) => [page.slug, page])
);
