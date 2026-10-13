# Chennai Rents: Structured Data & Schema.org Validation Report

**Audit Date:** 13 October 2026  
**Standards:** Schema.org, Google Search Central Rich Results Specifications  
**Testing Tool Validation:** Google Rich Results Test & Schema Markup Validator Ready  

---

## 1. Schema Types Implemented Across Chennai Rents

| Schema Type | Template(s) | Primary Purpose | Rich Result Feature |
| :--- | :--- | :--- | :--- |
| **`WebSite`** | Homepage (`/`) | Sitelinks Searchbox (`SearchAction`) | Google Sitelinks Searchbox |
| **`RealEstateAgent`** | Homepage, Core Hubs | Local Business & Brand identity, logo, sameAs | Knowledge Panel |
| **`BreadcrumbList`** | All Subpages (366 URLs) | SERP Breadcrumb navigation hierarchy | Google Breadcrumbs snippet |
| **`FAQPage`** | Locality Hubs, Facets, Guides, Listings | Accordion FAQs with accepted answers | Google FAQ Rich Snippet |
| **`RealEstateListing`** | 304 Programmatic Facets | Micro-market property pricing, geo-bounds, aggregate offers | Real Estate Listing Rich Results |
| **`Article`** | Guides (11), Stories (4), Rental Hub | Editorial publishing attribution, dateModified, author | Google Article / Top Stories |
| **`AboutPage`** | `/about`, `/methodology`, `/verification`, `/corrections`, `/authors` | E-E-A-T transparency, team attribution, methodology | Publisher Transparency |
| **`ContactPage`** | `/contact` | Direct communication channel definition | Corporate Contact |
| **`WebPage`** | `/privacy`, `/data-deletion` | Regulatory documentation and compliance | WebPage Metadata |

---

## 2. Sample Structured Data by Template

### Template A: Homepage (`/`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chennai Rents",
    "url": "https://www.chennairents.in",
    "description": "Locality-first rental guide and verified listings for Chennai",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.chennairents.in/listings?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Chennai Rents",
    "url": "https://www.chennairents.in",
    "logo": "https://www.chennairents.in/chennai-rents-official-logo.jpg",
    "sameAs": [
      "https://www.instagram.com/chennairents/"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Chennai",
      "sameAs": "https://en.wikipedia.org/wiki/Chennai"
    }
  }
]
```

---

### Template B: Locality Hub (`/chennai/velachery`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Chennai Rents",
        "item": "https://www.chennairents.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chennai Rentals",
        "item": "https://www.chennairents.in/chennai/rentals"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Flats for Rent in Velachery",
        "item": "https://www.chennairents.in/chennai/velachery"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average rent for a 2 BHK in Velachery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Average rent for a 2 BHK flat in Velachery is between 18,000 and 26,000 per month depending on proximity to MRTS and water reliability."
        }
      }
    ]
  }
]
```

---

### Template C: Programmatic Intent Facet (`/chennai/velachery/2bhk-flats-for-rent-in-velachery`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.chennairents.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chennai Rentals",
        "item": "https://www.chennairents.in/chennai/rentals"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Velachery",
        "item": "https://www.chennairents.in/chennai/velachery"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "2 BHK Flats for Rent in Velachery",
        "item": "https://www.chennairents.in/chennai/velachery/2bhk-flats-for-rent-in-velachery"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "2 BHK Flats for Rent in Velachery",
    "description": "Find verified 2 BHK flats for rent in Velachery, Chennai with real rent rates, summer water supply ratings, and direct owner listings.",
    "url": "https://www.chennairents.in/chennai/velachery/2bhk-flats-for-rent-in-velachery",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9815,
      "longitude": 80.218
    },
    "geoWithin": {
      "@type": "GeoShape",
      "box": "12.965 80.205 12.998 80.231"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Velachery",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN",
      "postalCode": "600042"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": 16000,
      "highPrice": 30000,
      "offerCount": 25
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the typical advance deposit for a 2 BHK in Velachery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Landlords typically ask for 6 to 10 months advance rent, negotiable down to 4 to 5 months with direct employment proof."
        }
      }
    ]
  }
]
```

---

### Template D: Editorial Guide (`/guides/tenant-rules-chennai`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tenant Rights in Chennai: Advance Deposits & Rules",
    "description": "Know your legal rights under Tamil Nadu Tenancy Act 2019: security deposit caps, 1-month notice period, maintenance, and eviction rules.",
    "publisher": {
      "@type": "Organization",
      "name": "Chennai Rents",
      "url": "https://www.chennairents.in",
      "logo": "https://www.chennairents.in/chennai-rents-official-logo.jpg"
    },
    "author": {
      "@type": "Organization",
      "name": "Chennai Rents Editorial Team"
    },
    "datePublished": "2026-06-01",
    "dateModified": "2026-10-01"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.chennairents.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": "https://www.chennairents.in/#guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Tenant Rights in Chennai: Advance Deposits & Rules",
        "item": "https://www.chennairents.in/guides/tenant-rules-chennai"
      }
    ]
  }
]
```

---

### Template E: Trust Page (`/methodology`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Chennai Rents Research Methodology",
    "url": "https://www.chennairents.in/methodology",
    "description": "Empirical data collection, ground-truth water scoring, and flood elevation modeling methodology."
  }
]
```

---

## 3. Query Fulfillment Validation for SearchAction

- **Configured Target:** `https://www.chennairents.in/listings?q={search_term_string}`
- **Handler Implementation:** `public/listings/index.js` listens on DOM load for `window.location.search` (`?q=` or `?search=`).
- **User Experience Verification:** When a user searches from Google Sitelinks Searchbox (e.g., query `velachery`), the client opens `/listings?q=velachery`, populates the search input, looks up `NEIGHBOURHOOD_CENTERS['velachery']`, and centers the interactive Leaflet map directly onto Velachery at zoom level 14, fulfilling the user's intent.

---

## 4. Rich Results Compliance Summary

1. **No Invisible Content Marked Up:** All marked up questions, answers, price ranges, geographic coordinates, and authors correspond directly to readable on-page content.
2. **No Fabricated Review / Rating Markup:** The site intentionally omits aggregate review or star rating schemas because Chennai Rents utilizes empirical data collection rather than unverified user review aggregates.
3. **No Syntax Errors:** Every pre-rendered page emits valid JSON-LD that parses without syntax error, verified across all 367 URLs by `scripts/audit-seo-inventory.js`.
