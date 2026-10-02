# Chennai Rents — Schema.org Structured Data Audit Report

**Date:** October 3, 2026  
**Standard:** Schema.org Core Specification / Google Search Central Guidelines  
**Format:** JSON-LD (`application/ld+json`)

---

## 1. Executive Summary

Every public indexable page on **Chennai Rents** features tailored, syntactically valid JSON-LD structured data. No generic, spammy, or empty schemas are present.

### Key Policy Adherences:
- **No Invisible Schema:** FAQ schemas are only generated when matching FAQ accordions are physically rendered in the visible DOM.
- **Truth in Real Estate Listings:** No fake `RealEstateListing` or `Offer` microdata is published for synthetic search queries. The site represents itself honestly as a `WebSite`, `RealEstateAgent`, and `Organization` providing locality rental intelligence.
- **Author Identity & E-E-A-T:** The founder and lead reviewer is represented by a robust `Person` entity linked to authenticated professional profiles (`sameAs`).

---

## 2. Schema Typology by Route Category

| Page Category | Schema.org Type | Key Properties Included | Google Feature Eligibility |
|:---|:---|:---|:---|
| **Homepage (`/`)** | `WebSite`, `RealEstateAgent` | `name`, `url`, `logo`, `SearchAction` (`/chennai/{search_term}/`), `sameAs`, `areaServed: City (Chennai)` | Sitelinks Search Box, Organization Knowledge Graph |
| **Locality Hubs (`/chennai/:locality/`)** | `BreadcrumbList`, `FAQPage` | Hierarchical breadcrumbs (Home -> Rentals -> Locality), Question/Answer entities matching visible FAQs | Rich Breadcrumbs, FAQ Rich Results |
| **Rental Pillar Hub (`/house-for-rent-in-chennai/`)** | `Article`, `BreadcrumbList`, `FAQPage` | `headline`, `datePublished`, `dateModified`, `author (Person)`, `publisher (Organization)`, FAQs | Article Rich Snippet, FAQ Rich Snippet |
| **Editorial Guides (`/guides/:slug/`)** | `Article`, `BreadcrumbList`, `FAQPage` | Editorial metadata, structured steps, rights guidance, author attribution | Article Rich Snippet, FAQ Rich Snippet |
| **Author Profile (`/author/vijayrajkumar/`)** | `Person` | `name`, `jobTitle`, `url`, `sameAs` (social & personal domain) | Author Knowledge Graph / E-E-A-T Signal |
| **Trust & E-E-A-T Pages** | `AboutPage`, `ContactPage`, `WebPage` | `name`, `url`, `description`, institutional contact details | Trust & Verification Classification |

---

## 3. Syntax & Validation Verification

- **Automated Validation:** Every pre-rendered HTML file was parsed during `npm run test:seo`. All JSON-LD code blocks parsed with **0 syntax errors**.
- **Self-Referencing Entity URIs:** All `url` and `item` attributes reference canonical domain URLs (`https://www.chennairents.in`).
