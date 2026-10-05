import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { T_NAGAR_GEO } from '../data/tNagarLandingPages';

const T_NAGAR_NEIGHBORS = [
  { name: 'Nungambakkam', slug: 'nungambakkam' },
  { name: 'Kodambakkam', slug: 'kodambakkam' },
  { name: 'West Mambalam', slug: 'west-mambalam' },
  { name: 'Alwarpet', slug: 'alwarpet' },
  { name: 'Saidapet', slug: 'saidapet' },
  { name: 'Teynampet', slug: 'teynampet' },
];

export default function TNagarLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={T_NAGAR_GEO}
      localityName="T. Nagar"
      localitySlug="t-nagar"
      eyebrowBadge="Central Chennai Commercial & Residential Hub"
      transitBadge="Metro Blue Line / Mambalam Suburban"
      transitSnapshot={{
        title: 'Commute & Transit',
        value: '1 - 5 Mins',
        desc: 'Mambalam & AG-DMS Metro'
      }}
      waterSnapshot={{
        score: '7.0 / 10',
        desc: 'Metro Water piped network'
      }}
      pocketsHeading="T. Nagar Micro-Market Hubs & Streets"
      pocketsSubheading="Distinct residential avenues across Central Chennai:"
      benchmarksHeading="Current Rental Market Benchmarks in T. Nagar"
      neighborHeading="Adjacent Central Chennai Localities"
      neighborLocalities={T_NAGAR_NEIGHBORS}
    />
  );
}
