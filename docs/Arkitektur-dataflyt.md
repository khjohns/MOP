# Arkitektur og Dataflyt

> Sist oppdatert: Januar 2025

Dette dokumentet beskriver anbefalt arkitektur og dataflyt for API-integrasjoner i MOP-applikasjonen.

## Innholdsfortegnelse

- [Overordnet arkitektur](#overordnet-arkitektur)
- [Integrasjonskart per app-seksjon](#integrasjonskart-per-app-seksjon)
- [Detaljert dataflyt](#detaljert-dataflyt)
- [Foreslått mappestruktur](#foreslått-mappestruktur)
- [Implementeringsdetaljer](#implementeringsdetaljer)

---

## Overordnet arkitektur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EKSTERNE API-ER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   CATENDA   │  │ EPD-NORGE   │  │ ECO PORTAL  │  │ ONE CLICK   │        │
│  │    API      │  │    API      │  │    API      │  │  LCA API    │        │
│  │  (BIM/IFC)  │  │  (Norske)   │  │  (Europa)   │  │  (Global)   │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                   │                                         │
├───────────────────────────────────┼─────────────────────────────────────────┤
│                      OFFENTLIGE DATAKILDER                                  │
├───────────────────────────────────┼─────────────────────────────────────────┤
│                                   │                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ KARTVERKET  │  │MILJØDIR.    │  │    SSB      │  │    NVE      │        │
│  │             │  │             │  │             │  │             │        │
│  │ • Matrikkel │  │ • NIR       │  │ • Utslipps- │  │ • Strømmiks │        │
│  │ • Rute-     │  │ • Utslipps- │  │   faktorer  │  │ • Energi-   │        │
│  │   planlegger│  │   faktorer  │  │ • Benchmark │  │   merke     │        │
│  │ • Høydedata │  │ • Produkt-  │  │ • Avfall    │  │             │        │
│  │             │  │   forskrift │  │             │  │             │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                   │                                         │
│                                   ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        API SERVICE LAYER                            │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │   │
│  │  │ catenda   │  │ epdNorge  │  │ ecoPortal │  │ oneClick  │        │   │
│  │  │ Service   │  │ Service   │  │ Service   │  │ Service   │        │   │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │   │
│  │  │kartverket │  │ miljødir  │  │   ssb     │  │   nve     │        │   │
│  │  │ Service   │  │ Service   │  │ Service   │  │ Service   │        │   │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                         │
│                                   ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         ADAPTER LAYER                               │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │  bimToEpd     │  │  epdLookup    │  │ chemicalCheck │           │   │
│  │  │  Adapter      │  │  Adapter      │  │ Adapter       │           │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘           │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │ transportCalc │  │ normalization │  │ emissionFactor│           │   │
│  │  │ Adapter (A4)  │  │ Adapter       │  │ Adapter       │           │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                         │
│                                   ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          CACHE LAYER                                │   │
│  │  ┌───────────────────────────────────────────────────────────┐     │   │
│  │  │  LocalStorage / IndexedDB Cache                           │     │   │
│  │  │  - EPD-oppslag (TTL: 24 timer)                            │     │   │
│  │  │  - Produktgrupper (TTL: 7 dager)                          │     │   │
│  │  │  - BIM-elementer (per prosjekt)                           │     │   │
│  │  │  - Utslippsfaktorer (TTL: 30 dager)                       │     │   │
│  │  │  - Arealdata (TTL: 90 dager)                              │     │   │
│  │  └───────────────────────────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                         │
└───────────────────────────────────┼─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MOP FRONTEND                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      AppContext (State)                             │   │
│  │  ├── projectInfo: ProjectInfo        # Areal, lokasjon fra Kartv.  │   │
│  │  ├── mopItems: MopItem[]                                            │   │
│  │  ├── epdEntries: EpdEntry[]                                         │   │
│  │  ├── chemicalEntries: ChemicalCheckEntry[]                          │   │
│  │  ├── emissionEntries: EmissionEntry[]                               │   │
│  │  └── emissionFactors: EmissionFactors   # Fra Miljødir./SSB        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                   │                                         │
│         ┌─────────────────────────┼─────────────────────────┐              │
│         │                         │                         │              │
│         ▼                         ▼                         ▼              │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐      │
│  │  Dashboard  │           │ EpdCalc     │           │ Chemicals   │      │
│  │  (Oversikt) │           │ (Materialer)│           │ (A20-liste) │      │
│  └─────────────┘           └─────────────┘           └─────────────┘      │
│                                                                             │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐      │
│  │  MopTable   │           │ Emissions   │           │  Report     │      │
│  │  (Oppfølg.) │           │ (Emisjoner) │           │ (Rapport)   │      │
│  └─────────────┘           └─────────────┘           └─────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Integrasjonskart per app-seksjon

### Tab-oversikt med API-koblinger

| Tab | Komponent | Primær API | Sekundær API | Offentlige kilder | Funksjon |
|-----|-----------|------------|--------------|-------------------|----------|
| **Dashboard** | `Dashboard.tsx` | Ingen | - | Kartverket (normalisering) | Aggregerer data, kg CO2/m² |
| **MOP Oppfølging** | `MopTable.tsx` | Catenda BCF* | - | - | Avviksrapportering |
| **Materialer & EPD** | `EpdCalculator.tsx` | EPD-Norge | ECO Portal, Catenda | Miljødir. (A4-A5), SSB (fallback) | Klimagassregnskap |
| **Farlige Stoffer** | `ChemicalsTab.tsx` | Cobuilder* | NOBB* | Miljødir. (Produktforskrift) | A20-sjekkliste |
| **Emisjonskrav** | `EmissionsTab.tsx` | Cobuilder* | - | - | Merkevalidering |
| **Sluttrapport** | `ReportTab.tsx` | Ingen | - | Kartverket (kartutsnitt) | PDF-generering |

*Fase 2 integrasjon

### Detaljert integrasjonskart

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MOP APPLIKASJON                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         1. DASHBOARD (Oversikt)                       │  │
│  │                                                                       │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │  │
│  │  │ MOP Status      │  │ CO2 Totaler     │  │ Compliance %    │       │  │
│  │  │ (aggregert)     │  │ (fra EPD-tab)   │  │ (beregnet)      │       │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘       │  │
│  │                                                                       │  │
│  │  API: Ingen direkte - kun intern dataflyt                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              2. MOP OPPFØLGING (20 krav)                              │  │
│  │                                                                       │  │
│  │  Fase 1: Ingen API (manuell oppfølging)                              │  │
│  │  Fase 2: Catenda BCF API for avvikshåndtering                        │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────┐     │  │
│  │  │  BCF Issue ←→ MopItem mapping                               │     │  │
│  │  │  - Issue title → requirement                                │     │  │
│  │  │  - Issue status → MopStatus                                 │     │  │
│  │  │  - Issue comments → documentation/projectFollowUp           │     │  │
│  │  └─────────────────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              3. MATERIALER & EPD (EpdCalculator)                      │  │
│  │                                                                       │  │
│  │   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐            │  │
│  │   │  CATENDA    │────▶│  PRODUKT-   │────▶│ EPD-NORGE   │            │  │
│  │   │    API      │     │   VALG      │     │    API      │            │  │
│  │   │             │     │             │     │             │            │  │
│  │   │ • IFC GUID  │     │ • Dropdown  │     │ • CO2 A1-A3 │            │  │
│  │   │ • Mengder   │     │ • 32 grupper│     │ • EPD-link  │            │  │
│  │   │ • Material  │     │ • Enhet     │     │ • Verifisert│            │  │
│  │   └─────────────┘     └─────────────┘     └─────────────┘            │  │
│  │         │                    │                    │                   │  │
│  │         │                    │                    │                   │  │
│  │         │              ┌─────┴─────┐              │                   │  │
│  │         │              │  FALLBACK │              │                   │  │
│  │         │              └─────┬─────┘              │                   │  │
│  │         │                    │                    │                   │  │
│  │         │                    ▼                    │                   │  │
│  │         │            ┌─────────────┐             │                   │  │
│  │         │            │ ECO PORTAL  │             │                   │  │
│  │         │            │    API      │             │                   │  │
│  │         │            │ (Europeisk) │             │                   │  │
│  │         │            └─────────────┘             │                   │  │
│  │         │                    │                    │                   │  │
│  │         ▼                    ▼                    ▼                   │  │
│  │   ┌─────────────────────────────────────────────────────────────┐    │  │
│  │   │                    KLIMAGASSREGNSKAP                        │    │  │
│  │   │  Produkt │ Mengde │ Grense │ Faktisk │ Best? │ Datakilde   │    │  │
│  │   └─────────────────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              4. FARLIGE STOFFER (ChemicalsTab)                        │  │
│  │                                                                       │  │
│  │  Fase 1: Statisk A20-liste (10 stoff-kategorier)                     │  │
│  │  Fase 2: Cobuilder API for produktvalidering                         │  │
│  │                                                                       │  │
│  │   ┌─────────────┐     ┌─────────────┐                                │  │
│  │   │  COBUILDER  │────▶│ PRODUKT-    │                                │  │
│  │   │    API      │     │ SØKEFELT    │                                │  │
│  │   │             │     │             │                                │  │
│  │   │ • Kjemisk   │     │ • Auto-     │                                │  │
│  │   │   innhold   │     │   complete  │                                │  │
│  │   │ • SDS-link  │     │ • Validering│                                │  │
│  │   └─────────────┘     └─────────────┘                                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              5. EMISJONSKRAV (EmissionsTab)                           │  │
│  │                                                                       │  │
│  │  Fase 1: Statisk liste (11 godkjente merkeordninger)                 │  │
│  │  Fase 2: Cobuilder API for sertifiseringsvalidering                  │  │
│  │                                                                       │  │
│  │  7 kategorier × 11 merker = matrise for validering                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              6. SLUTTRAPPORT (ReportTab)                              │  │
│  │                                                                       │  │
│  │  API: Ingen direkte                                                  │  │
│  │  Funksjon: Aggregerer data fra alle moduler → PDF                    │  │
│  │                                                                       │  │
│  │  Implementering: Client-side (jsPDF) eller serverless function       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detaljert dataflyt

### Fase 1: EPD-oppslag (Materialer-tab)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EPD-OPPSLAG DATAFLYT                                    │
└─────────────────────────────────────────────────────────────────────────────┘

     BRUKER                    FRONTEND                      API-LAG
       │                          │                            │
       │  1. Velger produktgruppe │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │  2. Skriver produktnavn  │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  3. Klikker "Søk EPD"      │
       │                          │───────────────────────────▶│
       │                          │                            │
       │                          │                            │  4. Sjekk cache
       │                          │                            │─────────┐
       │                          │                            │         │
       │                          │                            │◀────────┘
       │                          │                            │
       │                          │                            │  5. Hvis ikke i cache:
       │                          │                            │     EPD-Norge API
       │                          │                            │─────────┐
       │                          │                            │         │
       │                          │                            │◀────────┘
       │                          │                            │
       │                          │                            │  6. Hvis ingen treff:
       │                          │                            │     ECO Portal API
       │                          │                            │─────────┐
       │                          │                            │         │
       │                          │                            │◀────────┘
       │                          │                            │
       │                          │  7. Returner EPD-data      │
       │                          │◀───────────────────────────│
       │                          │                            │
       │  8. Vis resultater       │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
       │  9. Velger EPD           │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  10. Oppdater EpdEntry     │
       │                          │  - actualValue = CO2       │
       │                          │  - epdId = EPD-ID          │
       │                          │  - epdUrl = link           │
       │                          │  - dataSource = 'epd-norge'│
       │                          │                            │
       │  11. UI oppdatert        │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
```

### Fase 1: BIM-import (fra Catenda)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     BIM-IMPORT DATAFLYT                                     │
└─────────────────────────────────────────────────────────────────────────────┘

     BRUKER                    FRONTEND                    CATENDA API
       │                          │                            │
       │  1. Klikker "Hent fra BIM"                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  2. Hent prosjekt-ID       │
       │                          │───────────────────────────▶│
       │                          │                            │
       │                          │  3. Liste over modeller    │
       │                          │◀───────────────────────────│
       │                          │                            │
       │  4. Velger modell/revisjon                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  5. Hent elementer         │
       │                          │  (klassifikasjon, mengder) │
       │                          │───────────────────────────▶│
       │                          │                            │
       │                          │  6. IFC-elementer          │
       │                          │◀───────────────────────────│
       │                          │                            │
       │  7. Vis elementer        │                            │
       │  (gruppert per type)     │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
       │  8. Velger elementer     │                            │
       │  for import              │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  9. Transformer til        │
       │                          │  EpdEntry[] via adapter    │
       │                          │  - productGroup fra NS3451 │
       │                          │  - quantity fra IFC        │
       │                          │  - catendaGuid fra element │
       │                          │                            │
       │  10. Nye rader i tabell  │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
```

### Fase 1: A4 Transportberegning (med Kartverket)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 A4 TRANSPORTBEREGNING DATAFLYT                              │
└─────────────────────────────────────────────────────────────────────────────┘

     BRUKER                    FRONTEND                    OFFENTLIGE API
       │                          │                            │
       │  1. Legger inn leverandør│                            │
       │  (navn/adresse)          │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  2. Geokod adresse         │
       │                          │───────────────────────────▶│ KARTVERKET
       │                          │                            │ (adresse-API)
       │                          │  3. Koordinater            │
       │                          │◀───────────────────────────│
       │                          │                            │
       │                          │  4. Beregn rute til        │
       │                          │  byggeplass                │
       │                          │───────────────────────────▶│ KARTVERKET
       │                          │                            │ (ruteplan)
       │                          │  5. Avstand (km) + tid     │
       │                          │◀───────────────────────────│
       │                          │                            │
       │                          │  6. Hent utslippsfaktor    │
       │                          │───────────────────────────▶│ MILJØDIR.
       │                          │                            │ (NIR-data)
       │                          │  7. kg CO2/tonnkm          │
       │                          │◀───────────────────────────│
       │                          │                            │
       │                          │  8. Beregn A4-utslipp:     │
       │                          │  mengde(tonn) × avstand(km)│
       │                          │  × faktor(kg CO2/tonnkm)   │
       │                          │                            │
       │  9. Vis A4-resultat      │                            │
       │  per material            │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
```

### Fase 1: Normalisering (kg CO2/m²)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 NORMALISERING DATAFLYT                                      │
└─────────────────────────────────────────────────────────────────────────────┘

     BRUKER                    FRONTEND                    KARTVERKET
       │                          │                            │
       │  1. Oppgir gnr/bnr       │                            │
       │  eller adresse           │                            │
       │─────────────────────────▶│                            │
       │                          │                            │
       │                          │  2. Slå opp i Matrikkelen  │
       │                          │───────────────────────────▶│
       │                          │                            │
       │                          │  3. Bygningsdata           │
       │                          │  - BRA (bruksareal)        │
       │                          │  - Bygningstype            │
       │                          │  - Kommune                 │
       │                          │◀───────────────────────────│
       │                          │                            │
       │  4. Vis prosjektinfo     │                            │
       │  (kan overskrives)       │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
       │                          │  5. Dashboard beregner:    │
       │                          │  Total CO2 / BRA =         │
       │                          │  kg CO2/m²                 │
       │                          │                            │
       │  6. Dashboard viser      │                            │
       │  kg CO2/m² vs grense     │                            │
       │◀─────────────────────────│                            │
       │                          │                            │
```

---

## Foreslått mappestruktur

```
src/
├── main.tsx
├── App.tsx
├── index.css
│
├── components/
│   ├── tabs/
│   │   ├── Dashboard.tsx
│   │   ├── MopTable.tsx
│   │   ├── EpdCalculator.tsx      # Legg til: BIM-import, EPD-søk
│   │   ├── ChemicalsTab.tsx
│   │   ├── EmissionsTab.tsx
│   │   └── ReportTab.tsx
│   │
│   ├── common/
│   │   ├── StatusBadge.tsx
│   │   └── index.ts
│   │
│   └── modals/                     # NY: Modal-komponenter
│       ├── BimImportModal.tsx      # Velg elementer fra Catenda
│       ├── EpdSearchModal.tsx      # Søk og velg EPD
│       └── index.ts
│
├── context/
│   └── AppContext.tsx
│
├── types/
│   └── index.ts                    # Utvid med API-relaterte typer
│
├── data/
│   ├── mopData.ts
│   ├── epdData.ts
│   ├── chemicalData.ts
│   ├── emissionData.ts
│   ├── exampleData.ts
│   └── index.ts
│
├── services/                       # NY: API-tjenestelag
│   ├── api/
│   │   ├── catenda.ts              # Catenda API-klient
│   │   ├── epdNorge.ts             # EPD-Norge API-klient
│   │   ├── ecoPortal.ts            # ECO Portal API-klient
│   │   ├── cobuilder.ts            # Cobuilder API-klient (Fase 2)
│   │   ├── kartverket.ts           # Kartverket API (matrikkel, rute)
│   │   ├── miljodirektoratet.ts    # Miljødirektoratet (utslippsfaktorer)
│   │   ├── ssb.ts                  # SSB API (statistikk, fallback)
│   │   ├── nve.ts                  # NVE API (strømmiks)
│   │   ├── types.ts                # API response types
│   │   └── index.ts
│   │
│   ├── adapters/
│   │   ├── bimToEpd.ts             # IFC element → EpdEntry
│   │   ├── epdLookup.ts            # EPD søk → EpdEntry
│   │   ├── chemicalCheck.ts        # Produkt → ChemicalEntry
│   │   ├── transportCalc.ts        # A4 transportberegning med Kartverket
│   │   ├── normalization.ts        # kg CO2 → kg CO2/m² via Kartverket
│   │   ├── emissionFactors.ts      # Hent faktorer fra Miljødir./SSB
│   │   └── index.ts
│   │
│   └── cache/
│       ├── epdCache.ts             # LocalStorage cache for EPD
│       ├── bimCache.ts             # IndexedDB cache for BIM
│       ├── factorCache.ts          # Cache for utslippsfaktorer (TTL: 30d)
│       ├── geoCache.ts             # Cache for arealdata (TTL: 90d)
│       └── index.ts
│
├── hooks/                          # NY: Custom hooks
│   ├── useEpdSearch.ts             # Hook for EPD-oppslag
│   ├── useBimImport.ts             # Hook for BIM-import
│   └── index.ts
│
└── utils/                          # NY: Hjelpefunksjoner
    ├── co2Calculations.ts          # CO2-beregninger
    ├── validators.ts               # Inputvalidering
    └── index.ts
```

---

## Implementeringsdetaljer

### Utvidet EpdEntry interface

```typescript
// types/index.ts

export interface EpdEntry {
  // Eksisterende felter
  id: string;
  productGroup: string;
  productName: string;
  limitValue: number | null;
  limitText?: string;
  actualValue: number;
  unit: string;
  quantity: number;
  isBestChoice: boolean;
  justification: string;

  // NYE felter for API-integrasjon
  catendaGuid?: string;           // Kobling til BIM-element
  epdId?: string;                 // EPD-Norge/ECO Portal EPD-ID
  epdUrl?: string;                // Link til EPD-dokument
  dataSource: EpdDataSource;      // Hvor kommer data fra
  dataSourceConfidence: DataConfidence;
  dataSourceNote?: string;        // Fritekst merknad
  lastSynced?: Date;              // Sist hentet fra API
}

export type EpdDataSource =
  | 'manual'
  | 'catenda'
  | 'epd-norge'
  | 'eco-portal'
  | 'oneclicklca-generic'
  | 'ssb-generic'           // SSB bransjesnitt
  | 'miljodirektoratet';    // Offisielle utslippsfaktorer

export type DataConfidence =
  | 'verified'    // Produkt-spesifikk EPD
  | 'generic'     // Bransjesnitt (SSB, One Click LCA)
  | 'official'    // Offisiell kilde (Miljødirektoratet)
  | 'estimated';  // Manuelt estimat

// Ny type for prosjektinformasjon fra Kartverket
export interface ProjectInfo {
  gnr: string;
  bnr: string;
  address: string;
  municipality: string;
  municipalityCode: string;
  coordinates: { lat: number; lng: number };
  totalArea: number;           // m² tomt
  bra: number;                 // m² BRA (bruksareal)
  dataSource: 'kartverket' | 'manual';
  lastUpdated: Date;
}

// Ny type for utslippsfaktorer
export interface EmissionFactors {
  // Transport (A4)
  transportDiesel: number;     // kg CO2/liter
  transportPerTonKm: number;   // kg CO2/tonnkm

  // Byggeplass (A5)
  dieselConstruction: number;  // kg CO2/liter
  electricityNorway: number;   // kg CO2/kWh

  // Avfall (C3-C4)
  wasteToLandfill: number;     // kg CO2/tonn
  wasteToRecycling: number;    // kg CO2/tonn (ofte negativ = kreditt)

  source: 'miljodirektoratet' | 'ssb';
  validFrom: Date;
  validUntil: Date;
}
```

### API Service eksempel (EPD-Norge)

```typescript
// services/api/epdNorge.ts

const EPD_NORGE_BASE_URL = 'https://data.epd-norge.no';

export interface EpdSearchResult {
  epdId: string;
  name: string;
  manufacturer: string;
  gwp: number;           // kg CO2-eq per declared unit
  declaredUnit: string;  // f.eks. "1 kg", "1 m3"
  validUntil: string;
  pdfUrl: string;
}

export async function searchEpd(query: string): Promise<EpdSearchResult[]> {
  const response = await fetch(
    `${EPD_NORGE_BASE_URL}/api/epd/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`EPD-Norge API error: ${response.status}`);
  }

  const data = await response.json();
  return data.results.map(transformEpdResult);
}

export async function getEpdById(epdId: string): Promise<EpdSearchResult> {
  const response = await fetch(
    `${EPD_NORGE_BASE_URL}/api/epd/${epdId}`
  );

  if (!response.ok) {
    throw new Error(`EPD not found: ${epdId}`);
  }

  return transformEpdResult(await response.json());
}

function transformEpdResult(raw: any): EpdSearchResult {
  return {
    epdId: raw.uuid,
    name: raw.name,
    manufacturer: raw.manufacturer?.name || 'Ukjent',
    gwp: extractGwp(raw.lcaResults),
    declaredUnit: raw.declaredUnit,
    validUntil: raw.validUntil,
    pdfUrl: raw.pdfUrl
  };
}

function extractGwp(lcaResults: any): number {
  // Hent GWP for A1-A3 (produksjonsfasen)
  const a1a3 = lcaResults?.find((r: any) => r.module === 'A1-A3');
  return a1a3?.gwp || 0;
}
```

### Cache-implementasjon

```typescript
// services/cache/epdCache.ts

const CACHE_KEY = 'mop_epd_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 timer

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function getCachedEpd(query: string): EpdSearchResult[] | null {
  const cache = localStorage.getItem(CACHE_KEY);
  if (!cache) return null;

  const parsed = JSON.parse(cache) as Record<string, CacheEntry<EpdSearchResult[]>>;
  const entry = parsed[query];

  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    // Utløpt - slett og returner null
    delete parsed[query];
    localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    return null;
  }

  return entry.data;
}

export function setCachedEpd(query: string, results: EpdSearchResult[]): void {
  const cache = localStorage.getItem(CACHE_KEY);
  const parsed = cache ? JSON.parse(cache) : {};

  parsed[query] = {
    data: results,
    timestamp: Date.now()
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
}
```

### Custom Hook for EPD-søk

```typescript
// hooks/useEpdSearch.ts

import { useState, useCallback } from 'react';
import { searchEpd, EpdSearchResult } from '../services/api/epdNorge';
import { searchEcoPortal } from '../services/api/ecoPortal';
import { getCachedEpd, setCachedEpd } from '../services/cache/epdCache';

interface UseEpdSearchResult {
  results: EpdSearchResult[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  source: 'epd-norge' | 'eco-portal' | null;
}

export function useEpdSearch(): UseEpdSearchResult {
  const [results, setResults] = useState<EpdSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'epd-norge' | 'eco-portal' | null>(null);

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sjekk cache
      const cached = getCachedEpd(query);
      if (cached && cached.length > 0) {
        setResults(cached);
        setSource('epd-norge');
        return;
      }

      // 2. Prøv EPD-Norge først
      const norgeResults = await searchEpd(query);
      if (norgeResults.length > 0) {
        setCachedEpd(query, norgeResults);
        setResults(norgeResults);
        setSource('epd-norge');
        return;
      }

      // 3. Fallback til ECO Portal
      const ecoResults = await searchEcoPortal(query);
      setResults(ecoResults);
      setSource(ecoResults.length > 0 ? 'eco-portal' : null);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ukjent feil');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, error, search, source };
}
```

---

## Neste steg

1. **Fase 1 implementering:**
   - Opprett `services/` mappestruktur
   - Implementer EPD-Norge API-klient
   - Legg til EPD-søk i EpdCalculator
   - Implementer caching

2. **Fase 2 implementering:**
   - Catenda API-integrasjon
   - BIM-import modal
   - Cobuilder API for validering

Se [API-integrasjoner.md](./API-integrasjoner.md) for fullstendig API-oversikt.
