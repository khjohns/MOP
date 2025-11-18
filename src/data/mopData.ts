import { MopItem, MopStatus } from '@/types';

export const INITIAL_MOP_DATA: MopItem[] = [
  // ==========================================
  // KLIMAGASSUTSLIPP OG ENERGI
  // ==========================================
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
    description: 'Det skal innhentes EPD for alle bygningsprodukter hvor EPD-er er tilgjengelige. EPD-ene skal være produktspesifikk og tredjepartsverifisert. Bygningsprodukter med lave utslippsverdier skal etterstrebes. Valg som er negative for miljøet skal begrunnes.',
    status: MopStatus.RELEVANT,
    documentation: 'Utfylling av arkfane "Materialer & EPD"',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-4',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggvarme og -tørk',
    description: 'Oppvarming og tørk skal gjøres utslippsfritt, for eksempel ved bruk av strøm, fjernvarme eller annen nullutslippsteknologi. Entreprenør skal rapportere på energiforbruk på byggeplass.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumentasjon på forbruk i avtalt mappe.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-5',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Utslippsfri byggeplass',
    description: 'Alle maskiner og utstyr som benyttes på bygge-/anleggsplassen skal være utslippsfrie. Alle maskiner skal være CE-godkjent og registrert i Maskinregisteret.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumentasjon på forbruk i avtalt mappe.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-6',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Transport',
    description: 'Alle kjøretøy skal oppfylle minimum euroklasse 6/VI. All massetransport til/fra byggeplassen skal utføres med utslippsfrie kjøretøy eller biogasskjøretøy. Kjøretøy under 3,5 tonn skal være utslippsfrie, over 3,5 tonn minimum fossilfrie.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumentasjon for transportleveransene i avtalt mappe.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-7',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Biodrivstoff',
    description: 'Biodrivstoff som benyttes skal være dokumentert bærekraftig ut over omsetningskrav. Det skal ikke benyttes biodrivstoff basert på palmeolje eller biprodukter fra palmeoljeproduksjon.',
    status: MopStatus.RELEVANT,
    documentation: 'Gyldig, godkjent dokumentasjon fra drivstoffleverandør.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'klima-8',
    category: 'KLIMAGASSUTSLIPP OG ENERGI',
    requirement: 'Kuldemedier',
    description: 'Ved installasjon av varmepumper skal naturlige kuldemedier benyttes.',
    status: MopStatus.RELEVANT,
    documentation: 'Risikovurdering av kuldemedium. Datablad på varmepumpe-/kjøleinstallasjon.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  // ==========================================
  // MATERIALER OG AVFALL
  // ==========================================
  {
    id: 'material-1',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Miljøkartlegging',
    description: 'For arbeid over 100 m² BRA eller over 10 tonn avfall: Det skal utføres miljøkartlegging av helse- og miljøfarlige stoffer i eksisterende bygg, samt utarbeides miljøsaneringsbeskrivelse (TEK17 § 9-7).',
    status: MopStatus.RELEVANT,
    documentation: 'Miljøsaneringsbeskrivelse med evt. analyserapporter.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-2',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombrukskartlegging',
    description: 'For søknadspliktige tiltak over 100 m² BRA eller over 10 tonn avfall: Det skal kartlegges om bygningsfraksjoner som fjernes er egnet for ombruk. Rapport skal utarbeides iht. TEK17 § 9-7.',
    status: MopStatus.RELEVANT,
    documentation: 'Ombrukskartlegging i LoopFront.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-3',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombruksplan',
    description: 'Ved riving og rehabilitering skal det utarbeides plan for hvilke materialer som kan ombrukes og materialgjenvinnes. Bygget skal demonteres slik at ombruk muliggjøres.',
    status: MopStatus.RELEVANT,
    documentation: 'Oversikt over materialer/komponenter som kan ombrukes.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-4',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Ombruk av komponenter',
    description: 'Minst 2 ulike komponenttyper i prosjektet skal være ombrukte. Det skal undersøkes tilgjengelige ombruk-komponenter på Ombygg Økern og Loopfront.',
    status: MopStatus.RELEVANT,
    documentation: 'Utfylt fane sluttrapportering. Relevant dokumentasjon i FDV.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-5',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Emisjoner til inneluft',
    description: 'Det skal benyttes lavemitterende materialer på alle materialene innenfor dampsperren, i samsvar med NS 16798. Gjelder maling, treprodukter, gulv, himling, isolasjon og lim/fugemasse.',
    status: MopStatus.RELEVANT,
    documentation: 'Dokumentasjon iht. krav i arkfanen "Emisjonskrav". Utskrift fra digitalt stoffkartotek.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-6',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Helse- og miljøfarlige stoffer',
    description: 'Produkter som inneholder stoffer på Miljødirektoratets prioritetsliste og kandidatliste (REACH) skal ikke benyttes. Produkter skal ha komplette sikkerhetsdatablad på norsk.',
    status: MopStatus.RELEVANT,
    documentation: 'Sikkerhetsdatablader. Utskrift fra digitalt stoffkartotek (MAT02-filter i Cobuilder).',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-7',
    category: 'MATERIALER OG AVFALL',
    requirement: 'A20-sjekkliste',
    description: 'Produkter skal ikke inneholde helse- og miljøfarlige stoffer iht. A20-sjekklisten. Stoffene skal unngås for de oppførte bygningsmaterialene og kjemiske produktene.',
    status: MopStatus.RELEVANT,
    documentation: 'Se fane "Farlige Stoffer" for detaljer. Utskrift fra digitalt stoffkartotek.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'material-8',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Treverk',
    description: 'Trevirke og trebaserte produkter skal være produsert av tømmer fra FSC- eller PEFC-sertifisert skog. Tømmer fra regnskog skal ikke benyttes.',
    status: MopStatus.RELEVANT,
    documentation: 'Faktura/følgeseddel med sertifikatnummer.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'material-9',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Plast',
    description: 'Plastemballasje skal minimeres og være minimum gjenvinnbar. Det skal iverksettes tiltak slik at plastavfall ikke kommer på avveie.',
    status: MopStatus.RELEVANT,
    documentation: 'Entreprenørens avvikslogg. Referat verne-/miljørunder.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'material-10',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Avfallsminimering',
    description: 'Avfallsminimering skal være tema fra prosjektering til ferdigstillelse. Det skal utarbeides avfallsplan og liste med avfallsreduserende tiltak.',
    status: MopStatus.RELEVANT,
    documentation: 'Liste over avfallsreduserende tiltak. Avfallsplan.',
    projectFollowUp: '',
    phase: 'Før utførelse'
  },
  {
    id: 'material-11',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Sluttrapport for avfall',
    description: 'Det skal utarbeides sluttrapport som viser faktisk disponering av avfallet, fordelt på avfallstyper og mengder (TEK17 § 9-9).',
    status: MopStatus.RELEVANT,
    documentation: 'Sluttrapport for avfall (blankett 5178/5179). Sluttrapport fra avfallsmottak.',
    projectFollowUp: '',
    phase: 'Utførelse'
  },
  {
    id: 'material-12',
    category: 'MATERIALER OG AVFALL',
    requirement: 'Kildesortering og materialgjenvinning',
    description: 'Kildesorteringsgrad på minst 90 %. Målet skal være 70 % materialgjenvinning.',
    status: MopStatus.RELEVANT,
    documentation: 'Sluttrapport for avfall (blankett 5178/5179).',
    projectFollowUp: '',
    phase: 'Utførelse'
  }
];
