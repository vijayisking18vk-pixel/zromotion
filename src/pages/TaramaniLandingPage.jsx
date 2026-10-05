import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { TARAMANI_GEO } from '../data/taramaniLandingPages';

const TARAMANI_NEIGHBORS = [
  { name: 'Velachery', slug: 'velachery' },
  { name: 'Adyar', slug: 'adyar' },
  { name: 'Perungudi', slug: 'perungudi' },
  { name: 'Thiruvanmiyur', slug: 'thiruvanmiyur' },
  { name: 'OMR', slug: 'omr' },
];

export default function TaramaniLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={TARAMANI_GEO}
      localityName="Taramani"
      localitySlug="taramani"
      eyebrowBadge="Chennai Premier Tech & Innovation Corridor"
      transitBadge="Taramani MRTS Station & OMR Express"
      transitSnapshot={{
        title: 'Transit Access',
        value: '3 - 6 Mins',
        desc: 'Walk to TIDEL Park & Ramanujan IT City'
      }}
      waterSnapshot={{
        score: '7.5 / 10',
        desc: 'Dependable CMWSSB Metro Water & Borewells'
      }}
      pocketsHeading="Taramani Micro-Market Hubs & Streets"
      pocketsSubheading="Distinguished residential avenues across Taramani:"
      benchmarksHeading="Current Rental Market Benchmarks in Taramani"
      neighborHeading="Adjacent South Chennai Neighborhoods"
      neighborLocalities={TARAMANI_NEIGHBORS}
    />
  );
}
