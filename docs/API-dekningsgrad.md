# API Dekningsgrad - Analyse

> Sist oppdatert: Januar 2025

Dette dokumentet analyserer dekningsgraden for de sentrale miljø-API-ene relevant for MOP-applikasjonen.

## Innholdsfortegnelse

- [Database-statistikk](#database-statistikk)
- [Dekningsgrad per produktkategori](#dekningsgrad-per-produktkategori)
- [Geografisk relevans](#geografisk-relevans)
- [Anbefalinger for MOP](#anbefalinger-for-mop)

---

## Database-statistikk

### ECO Portal (Europa-wide EPD-hub)

| Kilde | Antall EPD-er | Dato | Merknad |
|-------|---------------|------|---------|
| International EPD System | 12 749 | Juli 2025 | 86% er byggeprodukter |
| IBU (Tyskland) | 2 565 | Juli 2025 | Tysk fokus |
| INIES (Frankrike) | 6 324 | Des 2024 | Største nasjonale hub i Europa |
| **Totalt ECO Portal** | **~20 000+** | 2025 | Aggregert fra alle operatører |

**Kilde:** [ECO Platform Facts & Figures](https://www.eco-platform.org/epd-facts-figures.html)

---

### EPD-Norge / EPD-Global

| Database | Antall EPD-er | Antall bedrifter | Merknad |
|----------|---------------|------------------|---------|
| EPD-Norge (nasjonalt) | ~5 700 | 500+ | Norske EPD-er |
| EPD-Global (internasjonalt) | ~9 000 | 650+ | Inkluderer internasjonale |

**Årlig vekst:** Sterk - støtteordning for nye EPD-er fortsetter i 2025.

**Kilde:** [EPD-Norge](https://www.epd-norge.no/), [EPD-Global](https://www.epd-global.com/)

---

### NOBB (Norsk Byggevarebase)

| Metrikk | Verdi |
|---------|-------|
| Totalt produkter | ~3 millioner (aktive + inaktive) |
| Leverandører | 900+ |
| Dekningsgrad | ~100% av byggevarehandelen |
| Innhold | Logistikk, priser, tekniske spek, noe miljødata |

**Merk:** NOBB har komplett produktdekning, men **miljødata (EPD) er begrenset**. Styrken er varedata, ikke klimagassdata.

**Kilde:** [Byggtjeneste - NOBB](https://byggtjeneste.no/norsk-byggevarebase/)

---

### One Click LCA

| Metrikk | Verdi |
|---------|-------|
| Totale LCA-datasett | 500 000+ |
| Nye datasett 2025 | 20 000+ (løpende) |
| Landdekning | 170+ land |
| Standarder støttet | 80+ (BREEAM, LEED, NS 3720, etc.) |

**2025-oppdateringer:**
- Mai 2025: +1 400 industridatasett, +218 generiske
- August 2025: +5 503 industridatasett
- September 2025: +3 014 EPD-er, +3 067 DEFRA-datasett
- Oktober 2025: +12 370 datasett (11 508 EPD-er, 862 generiske)

**Kilde:** [One Click LCA Help](https://help.oneclicklca.com/)

---

### Cobuilder

| Metrikk | Verdi |
|---------|-------|
| Totale produkter | Ikke offentliggjort |
| Fokus | Produktpass (DPP), standardisert data |
| Standard | EN ISO 23387 |
| Ansatte | 120+ (Oslo + Bulgaria) |

**Merk:** Cobuilder fokuserer på datastruktur og compliance, ikke volumstatistikk.

**Kilde:** [Cobuilder](https://cobuilder.com/)

---

## Dekningsgrad per produktkategori

Estimert EPD-dekning for norske byggeprodukter basert på bransjeerfaring:

| Produktkategori | EPD-dekning | Status | Kommentar |
|-----------------|-------------|--------|-----------|
| **Betong/sement** | 85-95% | 🟢 God | Godt dekket, mange norske produsenter (Norcem, etc.) |
| **Stål/armeringsjern** | 90%+ | 🟢 God | Celsa, SSAB, Norsk Stål har EPD-er |
| **Isolasjon** | 80-90% | 🟢 God | Rockwool, Glava, Paroc, Hunton |
| **Treverk/limtre** | 60-70% | 🟡 Middels | Varierer, mange mindre produsenter |
| **Gips/plater** | 85%+ | 🟢 God | Gyproc, Norgips har EPD-er |
| **Vinduer/dører** | 50-60% | 🟡 Middels | Mange norske produsenter mangler |
| **Tekniske installasjoner** | 20-40% | 🔴 Svak | Svakest dekning, mange importvarer |
| **Maling/overflate** | 50-70% | 🟡 Middels | Jotun, Nordsjö har EPD-er |
| **Gulvbelegg** | 60-70% | 🟡 Middels | Varierende |
| **Fasadematerialer** | 70-80% | 🟢 God | Flere store produsenter |
| **Taktekning** | 60-70% | 🟡 Middels | Varierende |
| **Lim/fugemasse** | 40-50% | 🟡 Middels | Begrenset |

### Mapping til MOP produktgrupper

MOP-applikasjonen har 32 produktgrupper fordelt på 9 kategorier:

```
RÅBYGG (8 grupper)
├── Betong, prefab         🟢 85%+
├── Betong, plasstøpt      🟢 85%+
├── Armeringsjern          🟢 90%+
├── Konstruksjonsstål      🟢 90%+
├── Massivtre/CLT          🟡 70%
├── Limtre                 🟢 80%
├── Leca/lettklinker       🟢 85%
└── Tegl/murstein          🟡 60%

ISOLASJON (4 grupper)
├── Mineralull             🟢 90%
├── EPS/XPS                🟢 85%
├── Trefiber               🟡 70%
└── PIR/PUR                🟡 65%

GULV (3 grupper)
├── Parkett                🟡 60%
├── Vinyl/linoleum         🟡 65%
└── Fliser                 🟡 55%

VEGG/HIMLING (4 grupper)
├── Gipsplater             🟢 90%
├── Himlingsplater         🟢 80%
├── Innervegger            🟡 70%
└── Akustikkplater         🟢 80%

FASADE (3 grupper)
├── Fasadeplater           🟡 70%
├── Fasadekledning         🟡 65%
└── Solavskjerming         🔴 40%

TAK (2 grupper)
├── Taktekning             🟡 65%
└── Takfolie               🟡 60%

DØRER/VINDUER (3 grupper)
├── Vinduer                🟡 55%
├── Ytterdører             🟡 50%
└── Innerdører             🟡 50%

TEKNISK (5 grupper)
├── Ventilasjon            🔴 30%
├── Rør/VVS                🔴 35%
├── Elektrisk              🔴 25%
├── Heis                   🔴 20%
└── Solenergianlegg        🟡 50%
```

---

## Geografisk relevans

### Hvorfor norske EPD-er er viktigere

EPD-verdier varierer betydelig mellom land på grunn av:

1. **Energimiks** - Norsk strøm er ~98% fornybar vs. europeisk snitt ~40%
2. **Transportavstander** - Lokalprodusert vs. importert
3. **Produksjonsmetoder** - Varierer mellom fabrikker

| Faktor | Norge | Europa (snitt) | Påvirkning |
|--------|-------|----------------|------------|
| Strøm CO2-intensitet | ~20 g/kWh | ~300 g/kWh | Stor for energikrevende prod. |
| Transportavstand | Kort | Varierende | Middels |
| Materialkilder | Lokale | Varierende | Varierende |

**Anbefaling:** Prioriter alltid EPD-Norge over ECO Portal for norske prosjekter.

---

## Anbefalinger for MOP

### Prioritert søkerekkefølge for EPD-oppslag

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRIORITERT SØKEREKKEFØLGE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. EPD-Norge API (digi.epd-norge.no)                          │
│     └── Norske EPD-er, gratis, best relevans                   │
│     └── Forventet treff: 70-80% av produkter                   │
│                                                                 │
│  2. ECO Portal API (fallback)                                  │
│     └── Europeiske EPD-er hvis norsk ikke finnes               │
│     └── Forventet treff: +10-15% av produkter                  │
│                                                                 │
│  3. One Click LCA generiske data                               │
│     └── Hvis ingen EPD finnes, bruk bransjesnitt               │
│     └── Dekker: 95%+ av produktkategorier                      │
│                                                                 │
│  4. Manuell input (fallback)                                   │
│     └── Bruker legger inn verdi manuelt                        │
│     └── Merknad: "Generisk verdi" / "Manuelt oppgitt"          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Forventet dekningsgrad med anbefalt stack

| Datakilde | Forventet dekning | Kumulativ |
|-----------|-------------------|-----------|
| EPD-Norge | 70-80% | 70-80% |
| + ECO Portal | +10-15% | 80-90% |
| + One Click LCA generisk | +8-15% | 95-98% |
| + Manuell | +2-5% | ~100% |

### Håndtering av manglende data

For produkter uten EPD, implementer følgende strategi:

1. **Vis varsel** til bruker om manglende EPD
2. **Foreslå generisk verdi** fra bransjedata (med tydelig merking)
3. **Tillat manuell overstyring** med krav om begrunnelse
4. **Logg datakilde** for sporbarhet i rapport

```typescript
interface EpdEntry {
  // ... eksisterende felter
  dataSource: 'epd-norge' | 'eco-portal' | 'oneclicklca-generic' | 'manual';
  dataSourceConfidence: 'verified' | 'generic' | 'estimated';
  dataSourceNote?: string;
}
```

---

## Kilder

- [ECO Platform - EPD Facts & Figures](https://www.eco-platform.org/epd-facts-figures.html)
- [EPD Guide - Construction EPD Database Landscape](https://epd.guide/epd-data-hubs-explained/the-construction-epd-database-landscape-explained)
- [EPD-Norge](https://www.epd-norge.no/)
- [EPD-Global](https://www.epd-global.com/)
- [NOBB - Norsk Byggevarebase](https://byggtjeneste.no/norsk-byggevarebase/)
- [One Click LCA - Generic Data Updates 2025](https://help.oneclicklca.com/en/articles/275986-one-click-lca-generic-data-updates-2025)
- [Cobuilder](https://cobuilder.com/)
- [ECO Portal API](https://www.eco-platform.org/eco-portal-api-register.html)
