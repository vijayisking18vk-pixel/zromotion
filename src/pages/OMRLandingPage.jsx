import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { OMR_GEO } from '../data/omrLandingPages';

const OMR_NEIGHBORS = [
  { name: 'Perungudi', slug: 'perungudi' },
  { name: 'Thoraipakkam', slug: 'thoraipakkam' },
  { name: 'Sholinganallur', slug: 'sholinganallur' },
  { name: 'Taramani', slug: 'taramani' },
  { name: 'Medavakkam', slug: 'medavakkam' },
  { name: 'Velachery', slug: 'velachery' },
];

export default function OMRLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={OMR_GEO}
      localityName="OMR"
      localitySlug="omr"
      eyebrowBadge="Chennai IT Expressway Corridor"
      transitBadge="6-Lane IT Expressway & Metro Phase 2"
      transitSnapshot={{
        title: 'Expressway Commute',
        value: '5 - 15 Mins',
        desc: 'To TIDEL, Ascendas & SIPCOT'
      }}
      waterSnapshot={{
        score: '6.0 / 10',
        desc: 'Central RO Plant & Tanker Grid'
      }}
      pocketsHeading="OMR Micro-Market Hubs & Corridors"
      pocketsSubheading="Prominent IT residential hubs and townships along Rajiv Gandhi Salai:"
      benchmarksHeading="Current Rental Market Benchmarks along OMR"
      neighborHeading="Adjacent IT & Coastal Localities"
      neighborLocalities={OMR_NEIGHBORS}
    />
  );
}
