import { MopItem, MopStatus } from '@/types';

export const INITIAL_MOP_DATA: MopItem[] = [
  // KLIMAGASSUTSLIPP OG ENERGI
  {
    id: 'klima-1',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Soknadspliktig)',
    description: 'For soknadspliktig hovedombygging: Det skal ved ferdigstilt prosjekt utarbeides et klimagassregnskap for materialer iht. NS 3720 (TEK17).',
    status: MopStatus.RELEVANT,
    documentation: 'Rapport med klimagassregnskap for materialer.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  {
    id: 'klima-2',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Klimagassutslipp fra materialer (Andre tiltak)',
    description: 'For andre tiltak: Det skal rapporteres klimagassutslipp for de 5-10 storste innkjopene.',
    status: MopStatus.RELEVANT,
    documentation: 'Rapportering i egnet format etter narmere avtale.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  {
    id: 'klima-3',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Innhenting av EPDer',
    description: 'Det skal innhentes EPD for alle bygningsprodukter hvor EPD-er er tilgjengelige.',
    status: MopStatus.STARTED,
    documentation: 'Dokumenteres i fanen "Materialer & EPD"',
    projectFollowUp: '',
    phase: 'Innkjop'
  },
  {
    id: 'klima-4',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggeplass',
    description: 'Det skal benyttes utslippsfrie (elektriske/hydrogen) anleggsmaskiner og kjoretoy.',
    status: MopStatus.RELEVANT,
    documentation: 'Oversikt over maskiner og energibarere.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  // AVFALLSHANDTERING
  {
    id: 'avfall-1',
    category: 'AVFALLSHANDTERING',
    requirement: 'Avfallsreduksjon',
    description: 'Avfallsreduserende tiltak skal implementeres i prosjekteringen.',
    status: MopStatus.RELEVANT,
    documentation: 'Liste over tiltak / Avfallsplan.',
    projectFollowUp: '',
    phase: 'For utforelse'
  },
  {
    id: 'avfall-2',
    category: 'AVFALLSHANDTERING',
    requirement: 'Sluttrapport for avfall',
    description: 'Sluttrapport som viser faktisk disponering av avfallet (TEK17 ss 9-9).',
    status: MopStatus.NOT_STARTED,
    documentation: 'Sluttrapport (blankett 5178 / 5179).',
    projectFollowUp: '',
    phase: 'Etter utforelse'
  },
  {
    id: 'avfall-3',
    category: 'AVFALLSHANDTERING',
    requirement: 'Kildesorteringsgrad',
    description: 'Kildesorteringsgrad pa minst 90 %. Mal om 70 % materialgjenvinning.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumenteres i sluttrapport.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  {
    id: 'avfall-4',
    category: 'AVFALLSHANDTERING',
    requirement: 'Ombruk',
    description: 'Gjennomfore ombrukskartlegging. Egnede materialer skal ombrukes.',
    status: MopStatus.NOT_RELEVANT,
    documentation: 'Rapport fra ombrukskartlegging.',
    projectFollowUp: '',
    phase: 'For utforelse'
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
    description: 'Lovpalagtistoffkartotek skal vare tilgjengelig pa byggeplass.',
    status: MopStatus.RELEVANT,
    documentation: 'Bekreftelse pa opprettet stoffkartotek.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  {
    id: 'kjemi-3',
    category: 'FARLIGE STOFFER',
    requirement: 'Sjekkliste A20',
    description: 'Stoffene i sjekklisten (A20) skal ungaas. Dokumentasjon skal leveres.',
    status: MopStatus.STARTED,
    documentation: 'Se fane "Farlige Stoffer" for detaljer.',
    projectFollowUp: '',
    phase: 'Innkjop'
  },
  // YTRE MILJO
  {
    id: 'ytre-1',
    category: 'YTRE MILJO',
    requirement: 'Stoyende arbeider',
    description: 'Varsling av naboer iht. stoyforskrift.',
    status: MopStatus.RELEVANT,
    documentation: 'Kopi av nabovarsel.',
    projectFollowUp: '',
    phase: 'Utforelse'
  },
  {
    id: 'ytre-2',
    category: 'YTRE MILJO',
    requirement: 'Stovflukt',
    description: 'Tiltak for a hindre stovflukt (vanning, feiing).',
    status: MopStatus.RELEVANT,
    documentation: 'Rutiner for renhold.',
    projectFollowUp: '',
    phase: 'Utforelse'
  }
];
