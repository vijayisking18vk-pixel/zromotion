import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { NUNGAMBAKKAM_GEO } from '../data/nungambakkamLandingPages';

const NUNGAMBAKKAM_NEIGHBORS = [
  { name: 'T. Nagar', slug: 't-nagar' },
  { name: 'Chetpet', slug: 'chetpet' },
  { name: 'Egmore', slug: 'egmore' },
  { name: 'Alwarpet', slug: 'alwarpet' },
  { name: 'Gopalapuram', slug: 'gopalapuram' },
  { name: 'Kilpauk', slug: 'kilpauk' },
];

export default function NungambakkamLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={NUNGAMBAKKAM_GEO}
      localityName="Nungambakkam"
      localitySlug="nungambakkam"
      eyebrowBadge="Central Chennai Premium Diplomatic & Cultural Zone"
      transitBadge="Suburban Railway & Metro Phase 2"
      transitSnapshot={{
        title: 'Commute & Access',
        value: '5 - 10 Mins',
        desc: 'Suburban / Gemini / Sterling Rd'
      }}
      waterSnapshot={{
        score: '7.5 / 10',
        desc: 'Established Metro Water grid'
      }}
      pocketsHeading="Nungambakkam Micro-Market Hubs & Avenues"
      pocketsSubheading="Distinct residential avenues across Central-West Chennai:"
      benchmarksHeading="Current Rental Market Benchmarks in Nungambakkam"
      neighborHeading="Adjacent Central Chennai Localities"
      neighborLocalities={NUNGAMBAKKAM_NEIGHBORS}
    />
  );
}
