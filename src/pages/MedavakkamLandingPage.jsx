import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { MEDAVAKKAM_GEO } from '../data/medavakkamLandingPages';

const MEDAVAKKAM_NEIGHBORS = [
  { name: 'Velachery', slug: 'velachery' },
  { name: 'Perumbakkam', slug: 'perumbakkam' },
  { name: 'Madipakkam', slug: 'madipakkam' },
  { name: 'Sholinganallur', slug: 'sholinganallur' },
  { name: 'Tambaram', slug: 'tambaram' },
  { name: 'Pallikaranai', slug: 'pallikaranai' },
];

export default function MedavakkamLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={MEDAVAKKAM_GEO}
      localityName="Medavakkam"
      localitySlug="medavakkam"
      eyebrowBadge="South Chennai OMR-Tambaram Link Corridor"
      transitBadge="Metro Phase 2 / Velachery Main Rd"
      transitSnapshot={{
        title: 'Corridor Commute',
        value: '10 - 15 Mins',
        desc: 'ELCOT SEZ & Velachery Rd'
      }}
      waterSnapshot={{
        score: '6.5 / 10',
        desc: 'Borewell + tanker recharge'
      }}
      pocketsHeading="Medavakkam Micro-Market Hubs & Streets"
      pocketsSubheading="Distinct residential avenues across South Chennai:"
      benchmarksHeading="Current Rental Market Benchmarks in Medavakkam"
      neighborHeading="Adjacent South Chennai Localities"
      neighborLocalities={MEDAVAKKAM_NEIGHBORS}
    />
  );
}
