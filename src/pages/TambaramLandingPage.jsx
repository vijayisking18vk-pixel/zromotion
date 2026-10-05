import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { TAMBARAM_GEO } from '../data/tambaramLandingPages';

const TAMBARAM_NEIGHBORS = [
  { name: 'Chromepet', slug: 'chromepet' },
  { name: 'Medavakkam', slug: 'medavakkam' },
  { name: 'Velachery', slug: 'velachery' },
  { name: 'Porur', slug: 'porur' },
  { name: 'OMR', slug: 'omr' },
];

export default function TambaramLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={TAMBARAM_GEO}
      localityName="Tambaram"
      localitySlug="tambaram"
      eyebrowBadge="South Chennai Transit & Education Gateway"
      transitBadge="Suburban Rail Junction & GST Road"
      transitSnapshot={{
        title: 'Transit Access',
        value: '2 - 5 Mins',
        desc: 'To Tambaram Railway & Bus Terminus'
      }}
      waterSnapshot={{
        score: '7.5 / 10',
        desc: 'Rich Groundwater & Selaiyur Aquifer'
      }}
      pocketsHeading="Tambaram Micro-Market Hubs & Streets"
      pocketsSubheading="Distinguished residential avenues across Tambaram East & West:"
      benchmarksHeading="Current Rental Market Benchmarks in Tambaram"
      neighborHeading="Adjacent South Chennai Neighborhoods"
      neighborLocalities={TAMBARAM_NEIGHBORS}
    />
  );
}
