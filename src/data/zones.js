// Zone data — single source of truth for all 4 zones
// Images: Filter-free, authentic high-res architectural photography (ECR villas, heritage bungalows, lush gated estates)

export const ZONES = [
  {
    id: "ecr-coastal",
    slug: "ecr-coastal",
    monogram: "EC",
    name: "ECR Coastal",
    shortDesc: "OMR & ECR beachside apartments & private villas",
    headline: "Beachside Apartments & Villas Along OMR & ECR.",
    priceFrom: "35,000 / month",
    pricePfx: "\u20B9",
    positioning:
      `The East Coast Road stretches Chennai's most coveted residential corridor, where the Bay of Bengal meets a rapidly maturing urban spine. ECR Coastal homes offer the rare combination of sea-view living, modern amenities, and proximity to the city's IT and business belt.`,
    credibilityQuote: `"Coastal properties along Chennai's OMR-ECR corridor have recorded 18 to 22 percent rental appreciation over the past three years, outpacing city averages by 2x."`,
    credibilitySource: "Anarock Residential Rental Report, 2024",
    values: [
      {
        num: "01",
        title: "High Demand",
        text: `Coastal listings consistently lease within 10 to 15 days, 40% faster than comparable inland inventory. Sea-facing buildings see year-round occupancy across corporate, family, and weekend-rental tenants.`,
      },
      {
        num: "02",
        title: "Rent Premiums",
        text: `A sea-view or sea-facing apartment commands a 20 to 35 percent rent premium over an identical inland floorplan in the same zone, making ECR one of Chennai's most resilient rental micro-markets.`,
      },
      {
        num: "03",
        title: "Limited Supply",
        text: `Tamil Nadu's Coastal Regulation Zone norms restrict new beachfront construction, keeping supply scarce. Good ECR properties rarely stay available long, as they tend to be found before they are listed.`,
      },
    ],
    lifestyleQuote: `"Living by the water changes your relationship with the city. It gives you space to breathe."`,
    closingLine: "Secure Your Place By The Coast.",
    // Authentic luxury coastal villa with pool & ocean breeze
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80&auto=format&fit=crop",
    ],
    credibilityImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
    credibilityInset: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80&auto=format&fit=crop",
    pillarImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
    ],
    lifestyleImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop",
    next: "green-belt",
  },
  {
    id: "green-belt",
    slug: "green-belt",
    monogram: "GB",
    name: "Green Belt",
    shortDesc: "IT corridor gated communities with parks & green cover",
    headline: "Gated Communities & Verdant Living Along the IT Corridor.",
    priceFrom: "30,000 / month",
    pricePfx: "\u20B9",
    positioning:
      `Sholinganallur, Thoraipakkam, Perungudi, and Pallikaranai form Chennai's green-belt IT corridor. Tree-lined avenues, large gated townships, reputable school zones, and a sub-20-minute commute to the city's largest tech campuses make these the neighbourhoods discerning families choose to call home.`,
    credibilityQuote: `"The OMR IT corridor accounts for 42% of Chennai's total Grade-A office absorption, making the adjacent residential belt one of the most supply-constrained in South India."`,
    credibilitySource: "Knight Frank India Real Estate Report, H1 2024",
    values: [
      {
        num: "01",
        title: "IT Proximity",
        text: `Chennai's largest tech parks, including RMZ Millenia, Ramanujan IT City, and SP Infocity, are within 5 to 15 minutes of most Green Belt addresses. Corporate lease demand from multinationals keeps occupancy above 92% year-round.`,
      },
      {
        num: "02",
        title: "Family Infrastructure",
        text: `Top-ranked schools (PSBB, Chettinad, DAV), hospitals (Gleneagles, Apollo Spectra), and supermarkets cluster within walkable distance of most gated communities in the belt.`,
      },
      {
        num: "03",
        title: "Green Cover",
        text: `The Pallikaranai marshland, Perumbakkam lake, and the OMR tree canopy give this corridor genuine green lung access, something the rest of Chennai's rental market simply cannot replicate.`,
      },
    ],
    lifestyleQuote: `"Space, greenery, and a two-minute walk to the office. This is what good living looks like in Chennai."`,
    closingLine: "Secure Your Place In The Green Belt.",
    // Verdant gated estate with tropical lawn
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&q=80&auto=format&fit=crop",
    ],
    credibilityImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&auto=format&fit=crop",
    credibilityInset: "https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=600&q=80&auto=format&fit=crop",
    pillarImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&auto=format&fit=crop",
    ],
    lifestyleImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop",
    next: "city-central",
  },
  {
    id: "city-central",
    slug: "city-central",
    monogram: "CC",
    name: "City Central",
    shortDesc: "Mylapore, Nungambakkam & T. Nagar character homes",
    headline: "Character Homes in the Heart of Chennai's Cultural Core.",
    priceFrom: "28,000 / month",
    pricePfx: "\u20B9",
    positioning:
      `Mylapore's temple streets, Nungambakkam's tree-lined avenues, and T. Nagar's vibrant commercial pulse define Chennai's cultural and civic core. Homes here carry architecture, history, and walkability that no peripheral suburb can replicate, for tenants who want to live in the city, not merely adjacent to it.`,
    credibilityQuote: `"Central Chennai neighbourhoods like Mylapore and Nungambakkam command a 30 to 40 percent walkability premium over equivalent square-footage in the IT corridor suburbs."`,
    credibilitySource: "NoBroker City Rental Insights Report, 2023",
    values: [
      {
        num: "01",
        title: "Walkability",
        text: `Grocery markets, heritage temples, schools, parks, restaurants, and Metro stations are all within walking distance of City Central homes. A genuine 15-minute neighbourhood model, right in Chennai.`,
      },
      {
        num: "02",
        title: "Architectural Character",
        text: `From Chettinad-influenced terraced houses in Mylapore to art-deco bungalows in Nungambakkam, City Central homes carry the kind of character that new-build apartments simply cannot manufacture.`,
      },
      {
        num: "03",
        title: "Cultural Richness",
        text: `Live within walking distance of the Kapaleeshwarar Temple, Music Academy, Alliance Francaise, Connemara Library, and Chennai's finest Carnatic music season venues. Culture is the neighbourhood's infrastructure.`,
      },
    ],
    lifestyleQuote: `"A home in Mylapore means the city is your backyard. The kind of living money cannot manufacture from scratch."`,
    closingLine: "Secure Your Place At The City's Heart.",
    // Tropical courtyard heritage bungalow architecture
    heroImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1600&q=85&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80&auto=format&fit=crop",
    ],
    credibilityImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80&auto=format&fit=crop",
    credibilityInset: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80&auto=format&fit=crop",
    pillarImages: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80&auto=format&fit=crop",
    ],
    lifestyleImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop",
    next: "signature-homes",
  },
  {
    id: "signature-homes",
    slug: "signature-homes",
    monogram: "SH",
    name: "Signature Homes",
    shortDesc: "One-of-a-kind penthouses, heritage bungalows & private villas",
    headline: "Chennai's Most Extraordinary Homes, Found Before They're Listed.",
    priceFrom: "80,000 / month",
    pricePfx: "\u20B9",
    positioning:
      `Signature Homes is ChennaiRents' curated tier of the extraordinary. Independent houses with compound gardens in Adyar. Duplex penthouses overlooking the marina. Heritage bungalows with original Athangudi tile flooring. Private villas along the Pacific coast road. These homes exist, and most tenants simply never find them.`,
    credibilityQuote: `"Ultra-premium residential rentals above \u20B975,000 per month in Chennai have grown 28% in volume over 2022 to 2024, driven by expat executives, senior industry leaders, and high-net-worth families relocating from metros."`,
    credibilitySource: "CBRE South India Luxury Residential Report, 2024",
    values: [
      {
        num: "01",
        title: "True Exclusivity",
        text: `Signature Homes are sourced through ChennaiRents' private network, not listed on portals. If you're searching for them online, you're already too late. This tier requires a direct relationship.`,
      },
      {
        num: "02",
        title: "Architectural Distinction",
        text: `Every Signature Home carries something irreplaceable, whether it's a 1940s bungalow's original carved woodwork, a rooftop pool with unobstructed sea views, or a private garden compound that simply doesn't exist in new-build Chennai.`,
      },
      {
        num: "03",
        title: "Full-Service Tenancy",
        text: `Signature Homes come with a dedicated ChennaiRents relationship manager handling furnishing, utility setup, staff coordination, and ongoing maintenance from move-in day through renewal.`,
      },
    ],
    lifestyleQuote: `"Some homes aren't listed because they've never needed to be. They find the right tenant before the market ever sees them."`,
    closingLine: "Enquire About Signature Homes.",
    // Grand architectural private villa
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1000&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54741b62f?w=1000&q=80&auto=format&fit=crop",
    ],
    credibilityImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop",
    credibilityInset: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format&fit=crop",
    pillarImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop",
    ],
    lifestyleImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop",
    next: "ecr-coastal",
  },
];

export const ZONE_MAP = Object.fromEntries(ZONES.map((z) => [z.slug, z]));

export const getNextZone = (currentSlug) => {
  const current = ZONE_MAP[currentSlug];
  return current ? ZONE_MAP[current.next] : null;
};
