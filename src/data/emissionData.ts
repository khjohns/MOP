import { EmissionCategory, EmissionEntry } from '@/types';

export const EMISSION_MATRIX: EmissionCategory[] = [
  {
    id: 'cat-paint',
    name: 'Innendors maling og overflatebehandling',
    acceptedLabels: ['M1', 'Svanemerket', 'EU-Ecolabel', 'Indoor Air Comfort Gold', 'EC1 Plus']
  },
  {
    id: 'cat-wood',
    name: 'Trebaserte produkter (inkl. tregulv)',
    acceptedLabels: ['M1', 'Svanemerket', 'Indoor Air Comfort Gold', 'German Blue Angel']
  },
  {
    id: 'cat-floor',
    name: 'Gulvmaterialer (inkl. avretting)',
    acceptedLabels: ['M1', 'EC1 Plus', 'EC1', 'Svanemerket', 'Indoor Air Comfort Gold', 'GUT']
  },
  {
    id: 'cat-sealant',
    name: 'Lim og tetningsmidler (innendors)',
    acceptedLabels: ['M1', 'EC1 Plus', 'EC1', 'Svanemerket', 'Indoor Air Comfort Gold']
  },
  {
    id: 'cat-ceiling',
    name: 'Himling, vegg og akustikkplater',
    acceptedLabels: ['M1', 'Svanemerket', 'Indoor Air Comfort Gold', 'German Blue Angel']
  },
  {
    id: 'cat-insulation',
    name: 'Isolasjonsprodukter (innendors)',
    acceptedLabels: ['M1', 'Eurofins Gold', 'Indoor Air Comfort Gold']
  },
  {
    id: 'cat-carpet',
    name: 'Tekstile gulvbelegg',
    acceptedLabels: ['M1', 'GUT', 'Svanemerket', 'EU-Ecolabel']
  }
];

export const ALL_EMISSION_LABELS = [
  "M1",
  "EC1 Plus",
  "EC1",
  "EC2",
  "Svanemerket",
  "EU-Ecolabel",
  "Indoor Air Comfort Gold",
  "GUT",
  "German Blue Angel",
  "Eurofins Gold",
  "Sinus (Sintef)",
  "Annen / Egenerklaring"
];

export const INITIAL_EMISSION_ENTRIES: EmissionEntry[] = [
  {
    id: '1',
    categoryId: 'cat-paint',
    productName: 'Jotun Lady',
    label: 'Svanemerket',
    documentation: ''
  }
];
