import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { THIRUVANMIYUR_GEO } from '../data/thiruvanmiyurLandingPages';

const THIRUVANMIYUR_NEIGHBORS = [
  { name: 'Adyar', slug: 'adyar' },
  { name: 'Taramani', slug: 'taramani' },
  { name: 'Perungudi', slug: 'perungudi' },
  { name: 'Velachery', slug: 'velachery' },
  { name: 'OMR', slug: 'omr' },
];

export default function ThiruvanmiyurLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={THIRUVANMIYUR_GEO}
      localityName="Thiruvanmiyur"
      localitySlug="thiruvanmiyur"
      eyebrowBadge="Coastal Chennai Gateway & ECR Hub"
      transitBadge="Thiruvanmiyur MRTS & Beach Promenades"
      transitSnapshot={{
        title: 'Transit Access',
        value: '3 - 5 Mins',
        desc: 'To TIDEL Park & MRTS Station'
      }}
      waterSnapshot={{
        score: '8.5 / 10',
        desc: 'Strong Metro Water & Coastal Sand Aquifers'
      }}
      pocketsHeading="Thiruvanmiyur Micro-Market Hubs & Streets"
      pocketsSubheading="Distinguished residential avenues across Thiruvanmiyur:"
      benchmarksHeading="Current Rental Market Benchmarks in Thiruvanmiyur"
      neighborHeading="Adjacent Coastal & South Chennai Neighborhoods"
      neighborLocalities={THIRUVANMIYUR_NEIGHBORS}
    />
  );
}
