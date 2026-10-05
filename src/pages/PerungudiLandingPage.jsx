import React from 'react';
import ProgrammaticLandingView from '../components/ProgrammaticLandingView';
import { PERUNGUDI_GEO } from '../data/perungudiLandingPages';

const PERUNGUDI_NEIGHBORS = [
  { name: 'OMR', slug: 'omr' },
  { name: 'Thoraipakkam', slug: 'thoraipakkam' },
  { name: 'Taramani', slug: 'taramani' },
  { name: 'Velachery', slug: 'velachery' },
  { name: 'Adyar', slug: 'adyar' },
  { name: 'Sholinganallur', slug: 'sholinganallur' },
];

export default function PerungudiLandingPage({ data }) {
  return (
    <ProgrammaticLandingView
      data={data}
      geo={PERUNGUDI_GEO}
      localityName="Perungudi"
      localitySlug="perungudi"
      eyebrowBadge="Northern OMR Gateway & IT SEZ"
      transitBadge="Perungudi MRTS & OMR Expressway"
      transitSnapshot={{
        title: 'Tech Hub Commute',
        value: '2 - 7 Mins',
        desc: 'To WTC, SP Infocity & Millenia'
      }}
      waterSnapshot={{
        score: '7.0 / 10',
        desc: 'Municipal CMWSSB & Sweet Borewell'
      }}
      pocketsHeading="Perungudi Micro-Market Hubs & Enclaves"
      pocketsSubheading="Distinguished residential colonies and avenues across Perungudi:"
      benchmarksHeading="Current Rental Market Benchmarks in Perungudi"
      neighborHeading="Adjacent Central & IT Corridors"
      neighborLocalities={PERUNGUDI_NEIGHBORS}
    />
  );
}
