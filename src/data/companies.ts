import type { Company } from '../types';
import { rnd, formatRevenue } from '../utils/helpers';

export const INDUSTRIES = [
  'Technology','Finance','Healthcare','Retail','Energy',
  'Automotive','Media','Food & Beverage','Pharmaceuticals','Manufacturing'
];

export const LOCATIONS = [
  'San Francisco, CA','New York, NY','Austin, TX','Seattle, WA','Boston, MA',
  'Chicago, IL','Los Angeles, CA','Denver, CO','Atlanta, GA','Miami, FL',
  'London, UK','Tokyo, Japan','Berlin, Germany','Toronto, Canada'
];

export const STATUSES = ['Public', 'Private', 'Acquired'];

const seeds = [
  {name:'Veritas Systems',industry:'Technology',ticker:'VTS'},
  {name:'Apex Financial',industry:'Finance',ticker:'APX'},
  {name:'NovaCare Health',industry:'Healthcare',ticker:'NCH'},
  {name:'GridVolt Energy',industry:'Energy',ticker:'GVE'},
  {name:'Quantum Retail',industry:'Retail',ticker:'QRT'},
  {name:'Stellar Motors',industry:'Automotive',ticker:'STM'},
  {name:'Meridian Media',industry:'Media',ticker:'MMD'},
  {name:'FreshWave Foods',industry:'Food & Beverage',ticker:'FWF'},
  {name:'Luminary Pharma',industry:'Pharmaceuticals',ticker:'LMP'},
  {name:'CoreForge Mfg',industry:'Manufacturing',ticker:'CFM'},
  {name:'Skybridge Tech',industry:'Technology',ticker:'SBT'},
  {name:'Pinnacle Bank',industry:'Finance',ticker:'PNB'},
  {name:'OrthoGen Health',industry:'Healthcare',ticker:'OGH'},
  {name:'SolarPeak Energy',industry:'Energy',ticker:'SPE'},
  {name:'TrendVault Retail',industry:'Retail',ticker:'TVR'},
  {name:'Nexus Auto',industry:'Automotive',ticker:'NXA'},
  {name:'Pulse Networks',industry:'Technology',ticker:'PNW'},
  {name:'Capital Reserve',industry:'Finance',ticker:'CRV'},
  {name:'LifePath Medical',industry:'Healthcare',ticker:'LPM'},
  {name:'EcoFlux Energy',industry:'Energy',ticker:'EFX'},
  {name:'Atlas Commerce',industry:'Retail',ticker:'ATC'},
  {name:'SwiftDrive Motors',industry:'Automotive',ticker:'SDM'},
  {name:'Horizon Media',industry:'Media',ticker:'HZM'},
  {name:'GreenHarvest Foods',industry:'Food & Beverage',ticker:'GHF'},
  {name:'BioNex Pharma',industry:'Pharmaceuticals',ticker:'BNP'},
  {name:'IronCraft Manufacturing',industry:'Manufacturing',ticker:'ICM'},
  {name:'DataSphere Inc',industry:'Technology',ticker:'DSI'},
  {name:'Valor Trust',industry:'Finance',ticker:'VLT'},
  {name:'Centurion Health',industry:'Healthcare',ticker:'CTH'},
  {name:'TorchLight Energy',industry:'Energy',ticker:'TLE'},
  {name:'Embark Digital',industry:'Technology',ticker:'EMD'},
  {name:'Westfield Equity',industry:'Finance',ticker:'WFE'},
  {name:'Clearpath Logistics',industry:'Manufacturing',ticker:'CPL'},
  {name:'Vivid Screens',industry:'Media',ticker:'VVS'},
  {name:'BlueSky Pharma',industry:'Pharmaceuticals',ticker:'BSP'},
  {name:'NatureBite Foods',industry:'Food & Beverage',ticker:'NBF'},
  {name:'ProDrive Auto',industry:'Automotive',ticker:'PDA'},
  {name:'UrbanNest Retail',industry:'Retail',ticker:'UNR'},
  {name:'Fortis Systems',industry:'Technology',ticker:'FTS'},
  {name:'Redwood Capital',industry:'Finance',ticker:'RWC'},
  {name:'Omnimed Health',industry:'Healthcare',ticker:'OMH'},
  {name:'Brightfield Energy',industry:'Energy',ticker:'BFE'},
  {name:'Cosmo Ventures',industry:'Technology',ticker:'CSV'},
  {name:'Presidio Finance',industry:'Finance',ticker:'PRF'},
  {name:'Clarity Pharma',industry:'Pharmaceuticals',ticker:'CLP'},
  {name:'Nimbus Cloud',industry:'Technology',ticker:'NMB'},
  {name:'Ascent Media',industry:'Media',ticker:'ASM'},
  {name:'TerraFarm Foods',industry:'Food & Beverage',ticker:'TFF'},
  {name:'VanguardX Auto',industry:'Automotive',ticker:'VGX'},
  {name:'Goldsmith Retail',industry:'Retail',ticker:'GSR'},
];

const CEOs = ['Smith','Chen','Patel','Garcia','Johnson','Williams','Lee','Brown'];

export const COMPANIES: Company[] = seeds.map((s, i) => {
  const rev = rnd(50, 50000) * 1e6;
  return {
    id: i + 1,
    ...s,
    location: LOCATIONS[i % LOCATIONS.length],
    status: STATUSES[i % 3] as Company['status'],
    founded: rnd(1970, 2020),
    employees: rnd(50, 80000),
    revenue: rev,
    revenueStr: formatRevenue(rev),
    ceo: `CEO ${String.fromCharCode(65 + i % 26)}. ${CEOs[i % 8]}`,
    website: `www.${s.name.replace(/\s+/g, '').toLowerCase()}.com`,
    rating: (3.2 + Math.random() * 1.7).toFixed(1),
  };
});