import { ProductGroupDefinition, EpdEntry } from '@/types';

export const PRODUCT_GROUPS: ProductGroupDefinition[] = [
  // RÅBYGG
  { category: "RÅBYGG", name: "Plasstøpt betong (inkl. påstøp)", unit: "kg CO2/m3", limit: null, limitText: "Iht. NB37 Lavkarbon A" },
  { category: "RÅBYGG", name: "Prefabrikert betong", unit: "kg CO2/m3", limit: null, limitText: "Iht. NB37 Lavkarbon A" },
  { category: "RÅBYGG", name: "Armeringsjern", unit: "kg CO2/kg", limit: 0.37 },
  { category: "RÅBYGG", name: "Konstruksjonsstål", unit: "kg CO2/kg", limit: 1.00 },
  { category: "RÅBYGG", name: "Massivtre", unit: "kg CO2/m3", limit: 95.00 },
  { category: "RÅBYGG", name: "Limtre", unit: "kg CO2/m3", limit: 80.00 },
  // ISOLASJON
  { category: "ISOLASJON", name: "Glassull (densitet <28)", unit: "kg CO2/R=1", limit: 0.80 },
  { category: "ISOLASJON", name: "Steinull (densitet <80)", unit: "kg CO2/R=1", limit: 1.10 },
  { category: "ISOLASJON", name: "XPS (trykklasse 300)", unit: "kg CO2/R=1", limit: 2.60 },
  { category: "ISOLASJON", name: "EPS (trykklasse 80)", unit: "kg CO2/R=1", limit: 1.50 },
  { category: "ISOLASJON", name: "PIR/PUR", unit: "kg CO2/R=1", limit: 3.50 },
  // GULV
  { category: "GULV", name: "Parkett", unit: "kg CO2/m2", limit: 5.50 },
  { category: "GULV", name: "Vinyl", unit: "kg CO2/m2", limit: 6.10 },
  { category: "GULV", name: "Linoleum", unit: "kg CO2/m2", limit: 4.50 },
  { category: "GULV", name: "Avrettingsmasse", unit: "kg CO2/kg", limit: 0.18 },
  { category: "GULV", name: "Keramiske fliser", unit: "kg CO2/m2", limit: 15.00 },
  // VEGG/HIMLING
  { category: "VEGG/HIMLING", name: "Gipsplater", unit: "kg CO2/m2", limit: 3.00 },
  { category: "VEGG/HIMLING", name: "Maling (2 strøk)", unit: "kg CO2/m2", limit: 0.40 },
  { category: "VEGG/HIMLING", name: "Systemhimling", unit: "kg CO2/m2", limit: 2.50 },
  { category: "VEGG/HIMLING", name: "Akustikkplater", unit: "kg CO2/m2", limit: 4.00 },
  // FASADE
  { category: "FASADE", name: "Kledningsbord (tre)", unit: "kg CO2/m2", limit: 2.00 },
  { category: "FASADE", name: "Teglstein", unit: "kg CO2/m2", limit: 28.00 },
  { category: "FASADE", name: "Glass (3-lags)", unit: "kg CO2/m2", limit: 35.00 },
  { category: "FASADE", name: "Aluminium kledning", unit: "kg CO2/m2", limit: 12.00 },
  // TAK
  { category: "TAK", name: "Takstein (betong)", unit: "kg CO2/m2", limit: 18.00 },
  { category: "TAK", name: "Takpapp/membran", unit: "kg CO2/m2", limit: 5.00 },
  { category: "TAK", name: "Metalltak (stål)", unit: "kg CO2/m2", limit: 8.00 },
  // DØRER/VINDUER
  { category: "DØRER/VINDUER", name: "Vinduer (tre/alu)", unit: "kg CO2/m2", limit: 65.00 },
  { category: "DØRER/VINDUER", name: "Dører (tre)", unit: "kg CO2/stk", limit: 45.00 },
  // TEKNISKE INSTALLASJONER
  { category: "TEKNISK", name: "Ventilasjonskanaler", unit: "kg CO2/kg", limit: 2.50 },
  { category: "TEKNISK", name: "Rør (kobber)", unit: "kg CO2/kg", limit: 2.80 },
  { category: "TEKNISK", name: "Kabler", unit: "kg CO2/m", limit: 0.50 },
];

export const INITIAL_EPD_ENTRIES: EpdEntry[] = [
  {
    id: '1',
    productGroup: 'Armeringsjern',
    productName: 'Norsk Stål B500NC',
    limitValue: 0.37,
    actualValue: 0.35,
    unit: 'kg CO2/kg',
    quantity: 5000,
    isBestChoice: true,
    justification: ''
  }
];
