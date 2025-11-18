import { MopItem, MopStatus, EpdEntry, ChemicalCheckEntry, EmissionEntry } from '@/types';

// Example MOP data with various statuses to show progress
export const EXAMPLE_MOP_DATA: MopItem[] = [
  // ==========================================
  // KLIMAGASSUTSLIPP OG ENERGI
  // ==========================================
  {
    id: 'klima-1',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Søknadspliktig)',
    description: 'For søknadspliktig hovedombygging: Det skal ved ferdigstilt prosjekt utarbeides et klimagassregnskap for materialer iht. NS 3720 (TEK17).',
    status: MopStatus.FERDIG,
    documentation: 'Klimagassregnskap ferdigstilt 15.03.2024. Total utslipp: 245 kg CO2/m². Rapport vedlagt.',
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
    description: 'Det skal innhentes EPD for alle bygningsprodukter hvor EPD-er er tilgjengelige. EPD-ene skal være produktspesifikk og tredjepartsverifisert.',
    status: MopStatus.FERDIG,
    documentation: 'Utfylling av arkfane "Materialer & EPD"',
    projectFollowUp: 'Alle 12 produktgrupper har gyldig EPD. Se EPD-register.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-4',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggvarme og -tørk',
    description: 'Oppvarming og tørk skal gjøres utslippsfritt, for eksempel ved bruk av strøm, fjernvarme eller annen nullutslippsteknologi.',
    status: MopStatus.FERDIG,
    documentation: 'Dokumentasjon på forbruk i avtalt mappe.',
    projectFollowUp: 'El-basert byggvarme installert. Forbruk: 45 kWh/m². Rapportert månedlig.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-5',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggeplass',
    description: 'Alle maskiner og utstyr som benyttes på bygge-/anleggsplassen skal være utslippsfrie.',
    status: MopStatus.IVARETATT,
    documentation: 'Dokumentasjon på forbruk i avtalt mappe.',
    projectFollowUp: '85% elektriske maskiner. Venter på el-gravemaskin (levering uke 14).',
    phase: 'Utførelse'
  },
  {
    id: 'klima-6',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Transport',
    description: 'Alle kjøretøy skal oppfylle minimum euroklasse 6/VI. All massetransport skal være utslippsfri eller biogass.',
    status: MopStatus.FERDIG,
    documentation: 'Dokumentasjon for transportleveransene i avtalt mappe.',
    projectFollowUp: 'Avtale med Ragn-Sells om el-lastebiler. Volvo FM Electric brukt for all massetransport.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-7',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Biodrivstoff',
    description: 'Biodrivstoff skal være dokumentert bærekraftig. Ikke palmeolje eller biprodukter fra palmeoljeproduksjon.',
    status: MopStatus.FERDIG,
    documentation: 'Gyldig, godkjent dokumentasjon fra drivstoffleverandør.',
    projectFollowUp: 'HVO100 fra Eco-1. Sertifikat for bærekraft vedlagt.',
    phase: 'Utførelse'
  },
  {
    id: 'klima-8',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Kuldemedier',
    description: 'Ved installasjon av varmepumper skal naturlige kuldemedier benyttes.',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Risikovurdering av kuldemedium.',
    projectFollowUp: 'Ingen varmepumpe i prosjektet - kun fjernvarme.',
    phase: 'Før utførelse'
  },
  // ==========================================
  // MATERIALER OG AVFALL
  // ==========================================
  {
    id: 'material-1',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Miljøkartlegging',
    description: 'Det skal utføres miljøkartlegging av helse- og miljøfarlige stoffer i eksisterende bygg (TEK17 § 9-7).',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Miljøsaneringsbeskrivelse med evt. analyserapporter.',
    projectFollowUp: 'Nybygg - ingen eksisterende konstruksjoner å kartlegge.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-2',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombrukskartlegging',
    description: 'Det skal kartlegges om bygningsfraksjoner som fjernes er egnet for ombruk (TEK17 § 9-7).',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Ombrukskartlegging i LoopFront.',
    projectFollowUp: 'Nybygg - ingen fraksjoner å kartlegge.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-3',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombruksplan',
    description: 'Det skal utarbeides plan for hvilke materialer som kan ombrukes og materialgjenvinnes.',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Oversikt over materialer/komponenter som kan ombrukes.',
    projectFollowUp: 'Nybygg - ikke relevant.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-4',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombruk av komponenter',
    description: 'Minst 2 ulike komponenttyper i prosjektet skal være ombrukte.',
    status: MopStatus.FERDIG,
    documentation: 'Utfylt fane sluttrapportering. Relevant dokumentasjon i FDV.',
    projectFollowUp: '1) Ombrukte dører fra Ombygg Økern (24 stk). 2) Ombrukte systemhimlinger fra LoopFront.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-5',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Emisjoner til inneluft',
    description: 'Det skal benyttes lavemitterende materialer på alle materialene innenfor dampsperren (NS 16798).',
    status: MopStatus.FERDIG,
    documentation: 'Dokumentasjon iht. krav i arkfanen "Emisjonskrav".',
    projectFollowUp: 'Alle produkter dokumentert i Cobuilder med HEA02-filter. Se Emisjonskrav-fanen.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-6',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Helse- og miljøfarlige stoffer',
    description: 'Produkter med stoffer på prioritetsliste/REACH skal ikke benyttes. Komplette sikkerhetsdatablad kreves.',
    status: MopStatus.FERDIG,
    documentation: 'Sikkerhetsdatablader. Utskrift fra digitalt stoffkartotek.',
    projectFollowUp: 'Stoffkartotek i Cobuilder med MAT02-filter. 3 substitusjonsvurderinger gjennomført.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-7',
    category: 'MATERIALER OG AVFALL',
    requirement: 'A20-sjekkliste',
    description: 'Produkter skal ikke inneholde helse- og miljøfarlige stoffer iht. A20-sjekklisten.',
    status: MopStatus.FERDIG,
    documentation: 'Se fane "Farlige Stoffer" for detaljer.',
    projectFollowUp: 'Alle 10 stoffgrupper dokumentert. Ingen avvik.',
    phase: 'Utførelse'
  },
  {
    id: 'material-8',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Treverk',
    description: 'Trevirke skal være fra FSC- eller PEFC-sertifisert skog. Ikke regnskog.',
    status: MopStatus.FERDIG,
    documentation: 'Faktura/følgeseddel med sertifikatnummer.',
    projectFollowUp: 'Alt trevirke fra Moelven (PEFC). Sertifikatnr: PEFC/05-22-02.',
    phase: 'Utførelse'
  },
  {
    id: 'material-9',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Plast',
    description: 'Plastemballasje skal minimeres. Tiltak mot plastavfall på avveie.',
    status: MopStatus.IVARETATT,
    documentation: 'Entreprenørens avvikslogg. Referat verne-/miljørunder.',
    projectFollowUp: 'Ukentlig kontroll på miljørunde. 2 mindre avvik håndtert. Gjenvinningsgrad 89%.',
    phase: 'Utførelse'
  },
  {
    id: 'material-10',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Avfallsminimering',
    description: 'Avfallsminimering skal være tema fra prosjektering til ferdigstillelse.',
    status: MopStatus.FERDIG,
    documentation: 'Liste over avfallsreduserende tiltak. Avfallsplan.',
    projectFollowUp: '7 tiltak implementert: prefab, BIM, materiallager, retursystemer, kapping på fabrikk, etc.',
    phase: 'Før utførelse'
  },
  {
    id: 'material-11',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Sluttrapport for avfall',
    description: 'Sluttrapport som viser faktisk disponering av avfallet (TEK17 § 9-9).',
    status: MopStatus.STARTED,
    documentation: 'Sluttrapport for avfall (blankett 5178/5179).',
    projectFollowUp: 'Løpende registrering i Avfall+ system. Sluttrapport genereres ved prosjektslutt.',
    phase: 'Utførelse'
  },
  {
    id: 'material-12',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Kildesortering og materialgjenvinning',
    description: 'Kildesorteringsgrad på minst 90 %. Mål om 70 % materialgjenvinning.',
    status: MopStatus.IVARETATT,
    documentation: 'Sluttrapport for avfall (blankett 5178/5179).',
    projectFollowUp: 'Aktuell sorteringsgrad: 94%. Materialgjenvinning: 73%. Månedlig oppfølging.',
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
