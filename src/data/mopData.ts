import { MopItem, MopStatus } from '@/types';

export const INITIAL_MOP_DATA: MopItem[] = [
  // KLIMAGASSUTSLIPP OG ENERGI
  {
    id: 'klima-1',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Søknadspliktig)',
    description: 'For søknadspliktig hovedombygging: Det skal ved ferdigstilt prosjekt utarbeides et klimagassregnskap for materialer iht. NS 3720 (TEK17).',
    status: MopStatus.RELEVANT,
    documentation: 'Rapport med klimagassregnskap for materialer.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-2',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Andre tiltak)',
    description: 'For andre tiltak: Det skal rapporteres klimagassutslipp for de 5-10 største innkjøpene.',
    status: MopStatus.RELEVANT,
    documentation: 'Rapportering i egnet format etter nærmere avtale.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-3',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Innhenting av EPDer',
    description: 'Det skal innhentes EPD for alle bygningsprodukter hvor EPD-er er tilgjengelige.',
    status: MopStatus.STARTED,
    documentation: 'Dokumenteres i fanen "Materialer & EPD"',
    projectFollowUp: '',
    phase: 'Innkjøp'
  },
  {
    id: 'klima-4',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggeplass',
    description: 'Det skal benyttes utslippsfrie (elektriske/hydrogen) anleggsmaskiner og kjøretøy.',
    status: MopStatus.RELEVANT,
    documentation: 'Oversikt over maskiner og energibærere.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  // AVFALLSHÅNDTERING
  {
    id: 'avfall-1',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Avfallsreduksjon',
    description: 'Avfallsreduserende tiltak skal implementeres i prosjekteringen.',
    status: MopStatus.RELEVANT,
    documentation: 'Liste over tiltak / Avfallsplan.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'avfall-2',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Sluttrapport for avfall',
    description: 'Sluttrapport som viser faktisk disponering av avfallet (TEK17 § 9-9).',
    status: MopStatus.NOT_STARTED,
    documentation: 'Sluttrapport (blankett 5178 / 5179).',
    projectFollowUp: '',
    phase: 'Etter utførelse'
  },
  {
    id: 'avfall-3',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Kildesorteringsgrad',
    description: 'Kildesorteringsgrad på minst 90 %. Mål om 70 % materialgjenvinning.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumenteres i sluttrapport.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'avfall-4',
    category: 'AVFALLSHÅNDTERING',
    requirement: 'Ombruk',
    description: 'Gjennomføre ombrukskartlegging. Egnede materialer skal ombrukes.',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Rapport fra ombrukskartlegging.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  // FARLIGE STOFFER
  {
    id: 'kjemi-1',
    category: 'FARLIGE STOFFER',
    requirement: 'Substitusjonsplikt',
    description: 'Vurdere om farlige stoffer kan erstattes med mindre farlige alternativer.',
    status: MopStatus.RELEVANT,
    documentation: 'Vurdering av alternativer skal foreligge.',
    projectFollowUp: '',
    phase: 'Prosjektering'
  },
  {
    id: 'kjemi-2',
    category: 'FARLIGE STOFFER',
    requirement: 'Stoffkartotek',
    description: 'Lovpålagt stoffkartotek skal være tilgjengelig på byggeplass.',
    status: MopStatus.RELEVANT,
    documentation: 'Bekreftelse på opprettet stoffkartotek.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'kjemi-3',
    category: 'FARLIGE STOFFER',
    requirement: 'Sjekkliste A20',
    description: 'Stoffene i sjekklisten (A20) skal unngås. Dokumentasjon skal leveres.',
    status: MopStatus.STARTED,
    documentation: 'Se fane "Farlige Stoffer" for detaljer.',
    projectFollowUp: '',
    phase: 'Innkjøp'
  },
  // YTRE MILJØ
  {
    id: 'ytre-1',
    category: 'YTRE MILJØ',
    requirement: 'Støyende arbeider',
    description: 'Varsling av naboer iht. støyforskrift.',
    status: MopStatus.RELEVANT,
    documentation: 'Kopi av nabovarsel.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'ytre-2',
    category: 'YTRE MILJØ',
    requirement: 'Støvflukt',
    description: 'Tiltak for å hindre støvflukt (vanning, feiing).',
    status: MopStatus.RELEVANT,
    documentation: 'Rutiner for renhold.',
    projectFollowUp: '',
    phase: 'Utførelse'
  }
];
