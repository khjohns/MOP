import { ChemicalCheckItem, ChemicalCheckEntry } from '@/types';

export const CHEMICAL_CHECKLIST_DATA: ChemicalCheckItem[] = [
  {
    id: 'a20-1',
    substance: 'Bromerte flammehemmere (HBCD, TBBPA)',
    materialCategory: 'Isolasjon (XPS, EPS), cellegummi, takbelegg, fugemasse',
    description: 'Skal ungaas. Persistente organiske miljogifter.'
  },
  {
    id: 'a20-2',
    substance: 'Ftalater (DEHP, DBP, BBP, DIBP)',
    materialCategory: 'Gulvbelegg (vinyl), tapet, fugemasse, lim',
    description: 'Mykgjorere i plast. Hormonforstyrrende.'
  },
  {
    id: 'a20-3',
    substance: 'Klorparafiner (korte og mellomkjedede)',
    materialCategory: 'Fugemasse, maling, lim, plastprodukter',
    description: 'Grenseverdi 0,1%. Miljogift.'
  },
  {
    id: 'a20-4',
    substance: 'Bisfenol A (BPA)',
    materialCategory: 'Epoksyprodukter (lim, fugemasse, gulvbelegg)',
    description: 'Skal ungaas i produkter som herder pa byggeplass. Hormonforstyrrende.'
  },
  {
    id: 'a20-5',
    substance: 'Tinnorganiske forbindelser',
    materialCategory: 'Gulvbelegg, plastprodukter, silikonfugemasse',
    description: 'Katalysator/stabilisator i plast. Miljogift.'
  },
  {
    id: 'a20-6',
    substance: 'Krom (Cr) og Arsen (As)',
    materialCategory: 'Trykkimpregnert trevirke',
    description: 'Skal ikke forekomme i trevirke. Kreftfremkallende.'
  },
  {
    id: 'a20-7',
    substance: 'Siloksaner (D4/D5)',
    materialCategory: 'Fugemasse, maling, renholdsprodukter',
    description: 'Miljogift. Bioakkumulerende.'
  },
  {
    id: 'a20-8',
    substance: 'Fluorerte forbindelser (PFAS)',
    materialCategory: 'Impregnering, maling, belegninger',
    description: 'Persistent, bioakkumulerende. Skal ungaas.'
  },
  {
    id: 'a20-9',
    substance: 'Isocyanater (MDI, TDI)',
    materialCategory: 'PUR-skum, lim, lakk',
    description: 'Allergifremkallende. Krever spesielle vernetiltak.'
  },
  {
    id: 'a20-10',
    substance: 'Bly og blyforbindelser',
    materialCategory: 'Maling, loddetinn, PVC-produkter',
    description: 'Tungmetall. Skal ikke brukes i nybygg.'
  }
];

export const createInitialChemicalEntries = (): ChemicalCheckEntry[] => {
  return CHEMICAL_CHECKLIST_DATA.map(item => ({
    checkItemId: item.id,
    isRelevant: true,
    productName: '',
    documentation: ''
  }));
};
