import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { THORAIPAKKAM_GEO } from '../data/thoraipakkamLandingPages';

const THORAIPAKKAM_NEIGHBORS = [
  { name: 'Perungudi', slug: 'perungudi' },
  { name: 'Sholinganallur', slug: 'sholinganallur' },
  { name: 'Taramani', slug: 'taramani' },
  { name: 'Velachery', slug: 'velachery' },
  { name: 'OMR', slug: 'omr' },
];

export default function ThoraipakkamLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={THORAIPAKKAM_GEO}
      localityName="Thoraipakkam"
      localitySlug="thoraipakkam"
      eyebrowBadge="Mid-OMR Corridor & 200 Feet Radial Junction"
      transitBadge="200 Feet Radial Road & OMR Expressway"
      transitSnapshot={{
        title: 'Transit Access',
        value: '3 - 8 Mins',
        desc: 'To ASV Suntech Park & Radial Road'
      }}
      waterSnapshot={{
        score: '7.0 / 10',
        desc: 'Deep Borewell Grids & RO Distribution'
      }}
      pocketsHeading="Thoraipakkam Micro-Market Hubs & Streets"
      pocketsSubheading="Distinguished residential avenues across Thoraipakkam:"
      benchmarksHeading="Current Rental Market Benchmarks in Thoraipakkam"
      neighborHeading="Adjacent South Chennai Neighborhoods"
      neighborLocalities={THORAIPAKKAM_NEIGHBORS}
    />
  );
}
