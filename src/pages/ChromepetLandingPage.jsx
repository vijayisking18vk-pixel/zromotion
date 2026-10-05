import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { CHROMEPET_GEO } from '../data/chromepetLandingPages';

const CHROMEPET_NEIGHBORS = [
  { name: 'Tambaram', slug: 'tambaram' },
  { name: 'Medavakkam', slug: 'medavakkam' },
  { name: 'Porur', slug: 'porur' },
  { name: 'Velachery', slug: 'velachery' },
  { name: 'OMR', slug: 'omr' },
];

export default function ChromepetLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={CHROMEPET_GEO}
      localityName="Chromepet"
      localitySlug="chromepet"
      eyebrowBadge="South Chennai GST Road & Aviation Corridor"
      transitBadge="Chromepet Suburban Station & GST Highway"
      transitSnapshot={{
        title: 'Transit Access',
        value: '2 - 5 Mins',
        desc: 'To Chromepet Railway Station & GST Road'
      }}
      waterSnapshot={{
        score: '8.0 / 10',
        desc: 'Dependable Groundwater & Municipal Lines'
      }}
      pocketsHeading="Chromepet Micro-Market Hubs & Streets"
      pocketsSubheading="Distinguished residential avenues across Chromepet:"
      benchmarksHeading="Current Rental Market Benchmarks in Chromepet"
      neighborHeading="Adjacent South Chennai Neighborhoods"
      neighborLocalities={CHROMEPET_NEIGHBORS}
    />
  );
}
