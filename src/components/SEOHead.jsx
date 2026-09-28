import React, { useEffect } from 'react';
import { INSTAGRAM_URL } from '../config';

/**
 * Dynamic SEO Head Component
 * Injects Google-friendly structured data (Schema.org JSON-LD):
 * - Article Schema
 * - FAQPage Schema (for Google search accordion rich snippets)
 * - BreadcrumbList Schema (for Google breadcrumb URLs)
 * - Dynamic Document Title & Meta Description for maximum search CTR
 * - Pure English metadata for high global and regional search indexing
 */
export default function SEOHead({ title, description, canonicalUrl, faqs = [], type = 'article', breadcrumbs = [] }) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.content = description;
    }

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonicalUrl) {
      canonical.href = canonicalUrl;
    }

    // 4. Inject JSON-LD Schema
    const scriptId = 'chennai-rents-schema';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = [];

    // Article Schema
    if (title && description) {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': type === 'locality' ? 'Article' : 'HowTo',
        'headline': title,
        'description': description,
        'publisher': {
          '@type': 'Organization',
          'name': 'Chennai Rents',
          'url': 'https://chennairents.in',
          'logo': 'https://chennairents.in/chennai-rents-official-logo.jpg',
          'sameAs': [INSTAGRAM_URL]
        },
        'author': {
          '@type': 'Organization',
          'name': 'Chennai Rents Editorial Team'
        },
        'datePublished': '2026-06-01',
        'dateModified': '2026-10-01'
      });
    }

    // BreadcrumbList Schema (for Google SERP breadcrumbs)
    if (breadcrumbs.length > 0) {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.url
        }))
      });
    }

    // FAQPage Schema (Triggers Google Rich Snippet Accordions in Search Results!)
    if (faqs.length > 0) {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      });
    }

    script.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up schema tag when switching pages
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, canonicalUrl, faqs, type, breadcrumbs]);

  return null;
}
