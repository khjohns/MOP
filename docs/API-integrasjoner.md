# API-integrasjoner for MOP

> Sist oppdatert: Januar 2025

Dette dokumentet beskriver anbefalte API-integrasjoner for MOP (Miljøoppfølgingsplan) applikasjonen, med vurdering av tilgjengelighet, prising og egnethet.

## Innholdsfortegnelse

- [Kritiske API-er (Fase 1)](#kritiske-api-er-fase-1)
- [Produkt- og validerings-API (Fase 2)](#produkt--og-validerings-api-fase-2)
- [Byggeplass og logistikk-API (Fremtidig)](#byggeplass-og-logistikk-api-fremtidig)
- [Prioritert implementeringsrekkefølge](#prioritert-implementeringsrekkefølge)

---

## Kritiske API-er (Fase 1)

### 1. Catenda API (tidligere Bimsync)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpen dokumentasjon |
| **Prising** | Betalt (krever Catenda Hub-lisens per prosjekt) |
| **API-type** | REST v2 + OpenCDE-compliant BCF API |
| **Dokumentasjon** | https://developers.catenda.com/ |

**Styrker:**
- Meget godt dokumentert med OAuth2-autentisering
- Støtter IFC-standard
- BCF for avvikshåndtering
- Robust API testet siden 2012

**Svakheter:**
- Krever betalt lisens
- Prising "per prosjekt" (må forespørres)
- Ingen gratis tier

**Egnethet for MOP:** ⭐⭐⭐⭐⭐
Kritisk integrasjon for GUID-kobling og mengdeuttak fra BIM-modeller.

**Bruksområde i MOP:**
- Hente elementer fra IFC-modell med GUID, klassifikasjon og mengder
- Koble materialer i klimagassregnskapet til BIM-elementer
- BCF-integrasjon for avviksrapportering (fremtidig)

---

### 2. EPD-Norge / ECO Portal API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Gratis, åpen API |
| **Prising** | Gratis (EPD-data er fritt tilgjengelig) |
| **API-type** | REST (via ECO Platform soda4LCA) |
| **Dokumentasjon** | https://www.eco-platform.org/eco-portal-api-register.html |

**Styrker:**
- 5 700+ norske EPD-er via EPD-Norge
- 9 000+ EPD-er via EPD-Global
- Gratis og åpen tilgang
- ISO-verifisert data (EN 15804)
- Maskinlesbart ILCD-format

**Svakheter:**
- Kun EPD-data (ikke full LCA-motor)
- Krever tolkning av EN 15804-format
- Noe datakvalitetsproblemer (ryddes opp per juli 2025)

**Egnethet for MOP:** ⭐⭐⭐⭐⭐
Perfekt for norske forhold - gratis og omfattende.

**Bruksområde i MOP:**
- Automatisk oppslag av CO2-verdier (A1-A3) for produkter
- Validering av EPD-dokumentasjon
- Lenking til originale EPD-dokumenter

---

### 3. One Click LCA API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | API-tilgang må forespørres (api@oneclicklca.com) |
| **Prising** | Betalt, del av lisensavtale (Designer/Expert/Enterprise) |
| **API-type** | REST |
| **Dokumentasjon** | Begrenset offentlig tilgjengelig |

**Styrker:**
- Verdens største LCA-database (500 000+ datapunkter)
- 140+ standarder inkludert norske (NS 3720)
- AI-powered beregninger
- 80+ sertifiseringer støttet (BREEAM, LEED, etc.)

**Svakheter:**
- API-dokumentasjon ikke offentlig
- Krever Enterprise-lisens for API-tilgang
- Dyrt for små prosjekter

**Egnethet for MOP:** ⭐⭐⭐⭐
Høy verdi men kostbar - vurder om dere trenger full API eller kan bruke manuell eksport.

**Bruksområde i MOP:**
- Fullverdig LCA-beregning (alle livssyklusfaser)
- Generiske data når EPD ikke finnes
- BREEAM/LEED-rapportering

---

## Produkt- og validerings-API (Fase 2)

### 4. Cobuilder API (Define + Products)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpen dokumentasjon |
| **Prising** | Betalt (krever Cobuilder Supply/Collaborate-lisens) |
| **API-type** | REST + GraphQL (Define API) |
| **Dokumentasjon** | https://developer.cobuilder.com/ |

**Styrker:**
- Norsk standard (EN ISO 23387)
- BREEAM-filtrering
- GTIN/SPN-kobling
- Digital Product Passport (DPP) støtte

**Svakheter:**
- Krever betalt lisens
- Demo gir kun 10 første resultater

**Egnethet for MOP:** ⭐⭐⭐⭐
Meget relevant for As-Built-validering.

**Bruksområde i MOP:**
- Validering av produktdata mot standarder
- A20-sjekkliste (farlige stoffer)
- Emisjonsmerke-validering

---

### 5. NOBB Export API (Byggtjeneste)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Swagger-dokumentasjon tilgjengelig |
| **Prising** | Betalt (kontakt salg@byggtjeneste.no) |
| **API-type** | REST med Basic Auth |
| **Dokumentasjon** | https://export.byggtjeneste.no/swagger/ |

**Styrker:**
- ~3 millioner produkter
- 900+ leverandører
- GTIN-kobling
- Norsk bransjestandard
- 100% dekning av byggevarehandelen

**Svakheter:**
- API-tilgang må kjøpes separat
- Rate limiting
- Miljødata (EPD) er begrenset

**Egnethet for MOP:** ⭐⭐⭐
Nyttig for produktvalidering, men EPD-Norge dekker miljødata bedre.

**Bruksområde i MOP:**
- Produktoppslag og validering
- Kobling mot innkjøpssystemer
- Tekniske spesifikasjoner

---

### 6. Speckle (Open Source alternativ)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpen kildekode (Apache 2.0 / MIT) |
| **Prising** | Gratis (cloud/self-hosted) |
| **API-type** | GraphQL + Webhooks |
| **Dokumentasjon** | https://docs.speckle.systems/ |

**Styrker:**
- Helt gratis og open source
- Python/C#/.NET SDKs
- Revit/Rhino/Grasshopper-connectors
- GraphQL for granulær datahenting

**Svakheter:**
- Krever egen server-oppsett for produksjon
- Læringskurve
- Mindre utbredt enn Catenda i Norge

**Egnethet for MOP:** ⭐⭐⭐
Godt alternativ hvis Catenda API blir for begrenset.

---

## Byggeplass og logistikk-API (Fremtidig)

### 7. Ditio API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Ikke offentlig dokumentert |
| **Prising** | SaaS-plattform (kontakt required) |
| **Funksjoner** | GPS-tracking, massetransport, maskintimer, drivstofforbruk |

**Vurdering:**
- Markedsledende i Norge (Skanska, Peab)
- Ingen offentlig API-dokumentasjon funnet
- Relevant for A4-A5 dokumentasjon

**Egnethet for MOP:** ⭐⭐⭐ (Usikker API-tilgang)

---

### 8. SmartDok API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | API nevnt i dokumentasjon |
| **Prising** | Betalt (inkludert i SmartDok-lisens) |
| **API-type** | REST (Visma-integrasjon) |

**Vurdering:**
- Mann- og maskintimer
- HMS-dokumentasjon
- Primært timeregistrering, mindre fokus på miljødata

**Egnethet for MOP:** ⭐⭐

---

### 9. Avfallshåndtering (Norsk Gjenvinning / Ragn-Sells)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Ingen offentlig API |
| **Prising** | Kundeportal gratis for kunder |

**Vurdering:**
- Kun manuelle rapporter/Excel-eksport
- Relevant for avfallsdokumentasjon, men manuell prosess

**Egnethet for MOP:** ⭐⭐

---

## Prioritert implementeringsrekkefølge

### Fase 1: MVP (Anbefalt start)

```
1. EPD-Norge/ECO Portal API  →  Gratis, norsk, 9000+ EPD-er
2. Catenda API               →  BIM-integrasjon (eksisterende lisens)
```

### Fase 2: Utvidet funksjonalitet

```
3. Cobuilder API             →  Produktvalidering, A20-sjekkliste
4. NOBB API                  →  Produktoppslag (hvis behov)
```

### Fase 3: Fullverdig løsning

```
5. One Click LCA API         →  Full LCA-beregning
6. Ditio/SmartDok            →  A4-A5 data (hvis API tilgjengelig)
```

---

## Teknisk arkitektur

Se [Arkitektur-dataflyt.md](./Arkitektur-dataflyt.md) for detaljert beskrivelse av hvordan API-integrasjonene bør implementeres.

## Dekningsgrad

Se [API-dekningsgrad.md](./API-dekningsgrad.md) for detaljert analyse av datadekning per API og produktkategori.
