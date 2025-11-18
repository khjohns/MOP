import { MopItem, MopStatus, EpdEntry, ChemicalCheckEntry, EmissionEntry } from '@/types';

// Example MOP data with various statuses to show progress
export const EXAMPLE_MOP_DATA: MopItem[] = [
  // KLIMAGASSUTSLIPP OG ENERGI
  {
    id: 'klima-1',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Søknadspliktig)',
    description: 'For søknadspliktig hovedombygging: Det skal ved ferdigstilt prosjekt utarbeides et klimagassregnskap for materialer iht. NS 3720 (TEK17).',
    status: MopStatus.FERDIG,
    documentation: 'Klimagassregnskap ferdigstilt 15.03.2024. Total utslipp: 245 kg CO2/m². Rapport vedlagt i prosjektdokumentasjon.',
    projectFollowUp: 'Godkjent av byggherre. Arkivert i BIM-modell.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-2',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Andre tiltak)',
    description: 'For andre tiltak: Det skal rapporteres klimagassutslipp for de 5-10 største innkjøpene.',
    status: MopStatus.FERDIG,
    documentation: 'Rapport for de 8 største innkjøpene ferdigstilt. Se EPD-fanen for detaljer.',
    projectFollowUp: 'Alle produkter har EPD. Totalt utslipp under kravgrense.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-3',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Innhenting av EPDer',
    description: 'Det skal innhentes EPD for alle bygningsprodukter hvor EPD-er er tilgjengelige.',
    status: MopStatus.FERDIG,
    documentation: 'Dokumenteres i fanen "Materialer & EPD"',
    projectFollowUp: 'Alle 12 produktgrupper har gyldig EPD. Se EPD-register.',
    phase: 'Innkjøp'
  },
  {
    id: 'klima-4',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggeplass',
    description: 'Det skal benyttes utslippsfrie (elektriske/hydrogen) anleggsmaskiner og kjøretøy.',
    status: MopStatus.IVARETATT,
    documentation: 'Oversikt over maskiner og energibærere.',
    projectFollowUp: '80% elektriske maskiner på plass. Venter på el-gravemaskin (levering uke 12).',
    phase: 'Utførelse'
  },
  // AVFALLSHÅNDTERING
  {
    id: 'avfall-1',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Avfallsreduksjon',
    description: 'Avfallsreduserende tiltak skal implementeres i prosjekteringen.',
    status: MopStatus.FERDIG,
    documentation: 'Liste over tiltak / Avfallsplan.',
    projectFollowUp: 'Avfallsplan godkjent. Tiltak: prefabrikerte elementer, BIM-koordinering, materiallager.',
    phase: 'Før utførelse'
  },
  {
    id: 'avfall-2',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Sluttrapport for avfall',
    description: 'Sluttrapport som viser faktisk disponering av avfallet (TEK17 § 9-9).',
    status: MopStatus.STARTED,
    documentation: 'Sluttrapport (blankett 5178 / 5179).',
    projectFollowUp: 'Løpende registrering i Avfall+ system. Sluttrapport genereres ved prosjektslutt.',
    phase: 'Etter utførelse'
  },
  {
    id: 'avfall-3',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Kildesorteringsgrad',
    description: 'Kildesorteringsgrad på minst 90 %. Mål om 70 % materialgjenvinning.',
    status: MopStatus.IVARETATT,
    documentation: 'Dokumenteres i sluttrapport.',
    projectFollowUp: 'Aktuell sorteringsgrad: 94%. Materialgjenvinning: 72%. Månedlig oppfølging.',
    phase: 'Utførelse'
  },
  {
    id: 'avfall-4',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Ombruk',
    description: 'Gjennomføre ombrukskartlegging. Egnede materialer skal ombrukes.',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Rapport fra ombrukskartlegging.',
    projectFollowUp: 'Nybygg - ingen eksisterende materialer for ombruk.',
    phase: 'Før utførelse'
  },
  // FARLIGE STOFFER
  {
    id: 'kjemi-1',
    category: 'FARLIGE STOFFER',
    requirement: 'Substitusjonsplikt',
    description: 'Vurdere om farlige stoffer kan erstattes med mindre farlige alternativer.',
    status: MopStatus.FERDIG,
    documentation: 'Vurdering av alternativer skal foreligge.',
    projectFollowUp: 'Substitusjonsanalyse gjennomført. 3 produkter byttet til lavemitterende alternativer.',
    phase: 'Prosjektering'
  },
  {
    id: 'kjemi-2',
    category: 'FARLIGE STOFFER',
    requirement: 'Stoffkartotek',
    description: 'Lovpålagt stoffkartotek skal være tilgjengelig på byggeplass.',
    status: MopStatus.FERDIG,
    documentation: 'Bekreftelse på opprettet stoffkartotek.',
    projectFollowUp: 'Stoffkartotek opprettet i ECOonline. QR-koder på alle kjemikalieskap.',
    phase: 'Utførelse'
  },
  {
    id: 'kjemi-3',
    category: 'FARLIGE STOFFER',
    requirement: 'Sjekkliste A20',
    description: 'Stoffene i sjekklisten (A20) skal unngås. Dokumentasjon skal leveres.',
    status: MopStatus.FERDIG,
    documentation: 'Se fane "Farlige Stoffer" for detaljer.',
    projectFollowUp: 'Alle A20-stoffer dokumentert unngått. Datablader verifisert.',
    phase: 'Innkjøp'
  },
  // YTRE MILJØ
  {
    id: 'ytre-1',
    category: 'YTRE MILJØ',
    requirement: 'Støyende arbeider',
    description: 'Varsling av naboer iht. støyforskrift.',
    status: MopStatus.FERDIG,
    documentation: 'Kopi av nabovarsel.',
    projectFollowUp: 'Nabovarsel sendt 01.02.2024. Ingen klager mottatt.',
    phase: 'Utførelse'
  },
  {
    id: 'ytre-2',
    category: 'YTRE MILJØ',
    requirement: 'Støvflukt',
    description: 'Tiltak for å hindre støvflukt (vanning, feiing).',
    status: MopStatus.IVARETATT,
    documentation: 'Rutiner for renhold.',
    projectFollowUp: 'Daglig feiing av adkomstvei. Vanning ved tørre forhold. HMS-sjekk ukentlig.',
    phase: 'Utførelse'
  }
];

// Example EPD entries showing different products and scenarios
export const EXAMPLE_EPD_ENTRIES: EpdEntry[] = [
  {
    id: '1',
    productGroup: 'Armeringsjern',
    productName: 'Celsa Stål B500NC',
    limitValue: 0.37,
    actualValue: 0.32,
    unit: 'kg CO2/kg',
    quantity: 45000,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '2',
    productGroup: 'Konstruksjonsstål',
    productName: 'SSAB Zero Steel',
    limitValue: 1.00,
    actualValue: 0.85,
    unit: 'kg CO2/kg',
    quantity: 12000,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '3',
    productGroup: 'Plasstøpt betong (inkl. påstøp)',
    productName: 'Unicon Lavkarbon Plus',
    limitValue: null,
    limitText: 'Iht. NB37 Lavkarbon A',
    actualValue: 180,
    unit: 'kg CO2/m3',
    quantity: 2500,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '4',
    productGroup: 'Steinull (densitet <80)',
    productName: 'Rockwool Flexibatts',
    limitValue: 1.10,
    actualValue: 0.95,
    unit: 'kg CO2/R=1',
    quantity: 3200,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '5',
    productGroup: 'Gipsplater',
    productName: 'Gyproc GN13',
    limitValue: 3.00,
    actualValue: 2.40,
    unit: 'kg CO2/m2',
    quantity: 8500,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '6',
    productGroup: 'Vinduer (tre/alu)',
    productName: 'NorDan N-Tech Passiv',
    limitValue: 65.00,
    actualValue: 52.00,
    unit: 'kg CO2/m2',
    quantity: 450,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '7',
    productGroup: 'Parkett',
    productName: 'Boen Plank Eik',
    limitValue: 5.50,
    actualValue: 4.20,
    unit: 'kg CO2/m2',
    quantity: 2800,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '8',
    productGroup: 'Maling (2 strøk)',
    productName: 'Jotun Lady Pure Color',
    limitValue: 0.40,
    actualValue: 0.28,
    unit: 'kg CO2/m2',
    quantity: 12000,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '9',
    productGroup: 'Systemhimling',
    productName: 'Ecophon Focus Lp',
    limitValue: 2.50,
    actualValue: 2.80,
    unit: 'kg CO2/m2',
    quantity: 1500,
    isBestChoice: false,
    justification: 'Valgt pga. bedre akustiske egenskaper (Klasse A). Alternativet med lavere utslipp hadde kun Klasse C absorpsjon.'
  },
  {
    id: '10',
    productGroup: 'XPS (trykklasse 300)',
    productName: 'Sundolitt XPS 300',
    limitValue: 2.60,
    actualValue: 2.45,
    unit: 'kg CO2/R=1',
    quantity: 800,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '11',
    productGroup: 'Dører (tre)',
    productName: 'Swedoor Stable Massiv',
    limitValue: 45.00,
    actualValue: 38.00,
    unit: 'kg CO2/stk',
    quantity: 85,
    isBestChoice: true,
    justification: ''
  },
  {
    id: '12',
    productGroup: 'Rør (kobber)',
    productName: 'Cupori 110 Medical',
    limitValue: 2.80,
    actualValue: 2.65,
    unit: 'kg CO2/kg',
    quantity: 1200,
    isBestChoice: true,
    justification: ''
  }
];

// Example chemical entries - most set to not relevant, some with documentation
export const EXAMPLE_CHEMICAL_ENTRIES: ChemicalCheckEntry[] = [
  {
    checkItemId: 'a20-1',
    isRelevant: true,
    productName: 'Sundolitt XPS 300',
    documentation: 'https://example.com/datablad/sundolitt-xps-300.pdf'
  },
  {
    checkItemId: 'a20-2',
    isRelevant: true,
    productName: 'Tarkett iQ Natural',
    documentation: 'https://example.com/datablad/tarkett-iq-natural.pdf'
  },
  {
    checkItemId: 'a20-3',
    isRelevant: false,
    productName: '',
    documentation: ''
  },
  {
    checkItemId: 'a20-4',
    isRelevant: true,
    productName: 'Mapei Kerapoxy Design',
    documentation: 'https://example.com/datablad/mapei-kerapoxy.pdf'
  },
  {
    checkItemId: 'a20-5',
    isRelevant: false,
    productName: '',
    documentation: ''
  },
  {
    checkItemId: 'a20-6',
    isRelevant: false,
    productName: '',
    documentation: ''
  },
  {
    checkItemId: 'a20-7',
    isRelevant: true,
    productName: 'Sika Sikaflex PRO-3',
    documentation: 'https://example.com/datablad/sikaflex-pro3.pdf'
  },
  {
    checkItemId: 'a20-8',
    isRelevant: false,
    productName: '',
    documentation: ''
  },
  {
    checkItemId: 'a20-9',
    isRelevant: true,
    productName: 'Huntsman MDI Foam',
    documentation: 'https://example.com/datablad/huntsman-mdi.pdf'
  },
  {
    checkItemId: 'a20-10',
    isRelevant: false,
    productName: '',
    documentation: ''
  }
];

// Example emission entries with various labels
export const EXAMPLE_EMISSION_ENTRIES: EmissionEntry[] = [
  {
    id: '1',
    categoryId: 'cat-paint',
    productName: 'Jotun Lady Pure Color',
    label: 'Svanemerket',
    documentation: 'https://example.com/sertifikat/jotun-lady.pdf'
  },
  {
    id: '2',
    categoryId: 'cat-wood',
    productName: 'Boen Plank Eik',
    label: 'M1',
    documentation: 'https://example.com/sertifikat/boen-plank.pdf'
  },
  {
    id: '3',
    categoryId: 'cat-floor',
    productName: 'Tarkett iQ Natural',
    label: 'Indoor Air Comfort Gold',
    documentation: 'https://example.com/sertifikat/tarkett-iq.pdf'
  },
  {
    id: '4',
    categoryId: 'cat-sealant',
    productName: 'Mapei Ultrabond Eco',
    label: 'EC1 Plus',
    documentation: 'https://example.com/sertifikat/mapei-eco.pdf'
  },
  {
    id: '5',
    categoryId: 'cat-ceiling',
    productName: 'Ecophon Focus Lp',
    label: 'M1',
    documentation: 'https://example.com/sertifikat/ecophon-focus.pdf'
  },
  {
    id: '6',
    categoryId: 'cat-insulation',
    productName: 'Rockwool Flexibatts',
    label: 'Eurofins Gold',
    documentation: 'https://example.com/sertifikat/rockwool-flex.pdf'
  },
  {
    id: '7',
    categoryId: 'cat-floor',
    productName: 'Weber Finspa',
    label: 'EC1',
    documentation: 'https://example.com/sertifikat/weber-finspa.pdf'
  },
  {
    id: '8',
    categoryId: 'cat-sealant',
    productName: 'Sika Sikaflex PRO-3',
    label: 'Indoor Air Comfort Gold',
    documentation: 'https://example.com/sertifikat/sikaflex-pro3.pdf'
  }
];
