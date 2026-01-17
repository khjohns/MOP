# API-integrasjoner for MOP

> Sist oppdatert: Januar 2025

Dette dokumentet beskriver anbefalte API-integrasjoner for MOP (Miljøoppfølgingsplan) applikasjonen, med vurdering av tilgjengelighet, prising og egnethet.

## Innholdsfortegnelse

- [Kritiske API-er (Fase 1)](#kritiske-api-er-fase-1)
- [Produkt- og validerings-API (Fase 2)](#produkt--og-validerings-api-fase-2)
- [Byggeplass og logistikk-API (Fremtidig)](#byggeplass-og-logistikk-api-fremtidig)
- [Offentlige datakilder](#offentlige-datakilder)
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

Catenda er kritisk for MOP fordi klimagassregnskapet krever nøyaktige mengder per materiale. Manuell mengdeberegning er tidkrevende og feilutsatt – BIM-modellen inneholder allerede denne informasjonen strukturert med GUID-referanser. Ved å koble MOP-poster direkte til BIM-elementer får man:
- **Sporbarhet:** Hver CO2-verdi kan spores tilbake til konkret element i modellen
- **Konsistens:** Mengder oppdateres automatisk når modellen endres
- **Revisjonshåndtering:** Kan sammenligne klimagassregnskap på tvers av modellversjoner
- **Oslobygg-krav:** Byggherre krever ofte GUID-referanser i miljødokumentasjon

Catenda er markedsledende i Norge og allerede i bruk hos mange av aktørene som skal levere MOP (Statsbygg, kommuner, større entreprenører).

**Bruksområde i MOP:**
- **Materialer & EPD-tab:** Importere elementer med mengder (m³ betong, kg stål, m² isolasjon) direkte fra IFC-modell
- **Automatisk gruppering:** NS 3451-klassifikasjon i IFC mappes til MOPs 32 produktgrupper
- **Avvikshåndtering (Fase 2):** BCF-issues kan kobles til MOP-krav som ikke er oppfylt, med 3D-visualisering av problemområder

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

EPD-Norge er ryggraden i MOPs klimagassregnskap. Hele poenget med MOP er å dokumentere faktisk miljøpåvirkning – og EPD-er er den eneste ISO-verifiserte kilden til produktspesifikke CO2-verdier. Uten EPD-data blir klimagassregnskapet kun estimater.

Hvorfor EPD-Norge fremfor andre kilder:
- **Norsk energimiks:** Norsk strøm er ~98% fornybar vs. europeisk snitt ~40%. En EPD fra norsk produsent gir vesentlig lavere CO2-verdier enn europeisk snitt – og dette reflekterer faktisk påvirkning.
- **Gratis tilgang:** Ingen lisensbetaling gjør det mulig å bygge selvbetjent løsning uten løpende kostnader.
- **Compliance:** TEK17 og NS 3720 (klimagassberegninger) refererer til EPD-er som dokumentasjonskilde.
- **Vekst:** Med støtteordning for nye EPD-er øker dekningsgraden kontinuerlig.

ECO Portal fungerer som fallback for importerte produkter som ikke har norsk EPD.

**Bruksområde i MOP:**
- **Materialer & EPD-tab:** Automatisk søk og oppslag av GWP-verdier (A1-A3) basert på produktnavn/GTIN
- **Validering:** Sjekke at EPD fortsatt er gyldig (utløpsdato)
- **Dokumentasjon:** Direktelenke til PDF-versjon av EPD for revisjon og sluttrapport
- **Beregning:** Hente deklarert enhet for korrekt omregning (kg CO2-eq per m³, per kg, etc.)

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

One Click LCA løser et kritisk problem: Hva gjør vi når produktet ikke har EPD? For tekniske installasjoner (ventilasjon, VVS, elektrisk) er EPD-dekningen kun 20-40%. Uten generiske data vil disse produktgruppene stå tomme i klimagassregnskapet.

Hvorfor One Click LCA er relevant:
- **Generiske data:** 500 000+ datasett dekker produktkategorier der EPD mangler. Bransjesnitt er bedre enn ingenting.
- **NS 3720-compliance:** One Click LCA støtter norsk standard for klimagassberegninger, inkludert alle livssyklusfaser (A1-A5, B1-B7, C1-C4, D).
- **Sertifisering:** Hvis prosjektet skal BREEAM-NOR- eller LEED-sertifiseres, er One Click LCA ofte allerede i bruk og kan gjenbrukes.
- **Kvalitetssikring:** AI-drevne beregninger reduserer risiko for feil i komplekse LCA-beregninger.

Kostnad er hovedbarrieren. For mindre prosjekter kan manuell eksport fra One Click LCA (uten API) være tilstrekkelig.

**Bruksområde i MOP:**
- **Fallback for EPD:** Når EPD-Norge og ECO Portal ikke har treff, hent generisk bransjedata med tydelig merking
- **Fullstendig LCA (Fase 3):** Utvide fra kun A1-A3 til hele livssyklusen inkludert transport (A4), bygging (A5) og avhending (C1-C4)
- **Rapportering:** Eksport til BREEAM-format for sertifiseringsprosjekter

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

Cobuilder er spesielt relevant for MOPs "Farlige stoffer"-tab (A20-sjekklisten) og "Emisjonskrav"-tab. Disse modulene handler ikke om CO2, men om helse og inneklima – og krever validering av kjemisk innhold og sertifiseringer.

Hvorfor Cobuilder er relevant:
- **A20-sjekkliste:** MOP skal dokumentere fravær av 10 kategorier farlige stoffer (ftalater, bromerte flammehemmere, etc.). Cobuilder har strukturert data om kjemisk innhold fra sikkerhetsdatablader.
- **Digital Product Passport (DPP):** EU-krav om digital produktpass kommer i 2027. Cobuilder er ledende på dette i Norden og vil bli stadig mer relevant.
- **BREEAM-filtrering:** Kan filtrere produkter etter BREEAM-krav, nyttig for sertifiseringsprosjekter.
- **Norsk standard:** Basert på EN ISO 23387, som er referansen for produktdata i norsk byggebransje.

**Bruksområde i MOP:**
- **Farlige stoffer-tab:** Automatisk validering av produkter mot A20-listen ved å sjekke kjemisk innhold
- **Emisjonskrav-tab:** Verifisere at produkter har riktig emisjonsmerke (Svanemerket, M1, EC1, etc.) for sin kategori
- **Dokumentasjon:** Koble til sikkerhetsdatablad (SDS) og sertifikater for sluttrapport
- **Compliance-sjekk:** Varsle hvis produkt inneholder stoff på kandidatlisten (REACH)

---

### 5. NOBB Export API (Byggtjeneste)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Swagger-dokumentasjon tilgjengelig |
| **Prising** | Betalt (kontakt salg@byggtjeneste.no) |
| **API-type** | REST med Basic Auth |
| **Dokumentasjon** | https://export.byggtjeneste.no/swagger/index.html |

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

NOBB er Norges definitive produktregister for byggevarer med ~3 millioner produkter. For MOP er det imidlertid en sekundær kilde fordi NOBB fokuserer på logistikk og handel, ikke miljødata.

Hvorfor NOBB likevel er relevant:
- **GTIN-kobling:** Når entreprenør scanner strekkode på byggeplassen, kan NOBB-oppslag identifisere produktet og trigge EPD-søk.
- **Produktvalidering:** Verifisere at riktig produkt faktisk ble levert (As-Built vs. As-Designed).
- **Integrasjon med innkjøp:** Mange entreprenører bruker NOBB-koblede innkjøpssystemer. Data kan flyte direkte inn i MOP.
- **100% dekning:** Alle produkter som selges via byggevarehandelen i Norge finnes i NOBB.

Hovedbegrensningen er at miljødata (EPD) er svakt representert i NOBB – her er EPD-Norge den primære kilden.

**Bruksområde i MOP:**
- **Produktidentifikasjon:** Slå opp produktnavn og leverandør basert på GTIN/strekkode fra byggeplass
- **Kobling til EPD:** Bruke NOBB-produktnavn som søketerm mot EPD-Norge for å finne miljødata
- **Mengdekontroll:** Sammenligne bestilt mengde (fra innkjøpssystem) mot mengde i klimagassregnskap
- **Tekniske spesifikasjoner:** Hente egenskaper som U-verdi, densitet etc. for produkter uten full EPD

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

Speckle er et open source-alternativ til Catenda for BIM-dataflyt. For MOP er det relevant i spesifikke scenarioer:

Når Speckle kan være aktuelt:
- **Kostnad:** Gratis og self-hosted, eliminerer lisenskostnader for mindre prosjekter eller startups.
- **Fleksibilitet:** GraphQL-API gir mer granulær kontroll over hvilke data som hentes, nyttig for optimalisering.
- **Revit/Rhino-fokus:** Hvis prosjektet bruker disse verktøyene fremfor tradisjonell IFC-flyt, har Speckle tettere integrasjon.
- **Egne servere:** For prosjekter med strenge datasikkerhetskrav kan self-hosting være påkrevd.

Hovedbegrensningen er at Catenda er de facto standard i offentlig sektor i Norge. Speckle krever mer teknisk kompetanse å sette opp og vedlikeholde.

**Bruksområde i MOP:**
- **Alternativ BIM-import:** Samme funksjonalitet som Catenda – hente elementer med mengder og klassifikasjon
- **Webhook-drevet oppdatering:** Automatisk varsling når modell oppdateres, kan trigge re-beregning av klimagassregnskap
- **Parametrisk data:** Hente Grasshopper/Dynamo-genererte mengder for komplekse geometrier

---

## Byggeplass og logistikk-API (Fremtidig)

### 7. Ditio API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Ikke offentlig dokumentert |
| **Prising** | SaaS-plattform (kontakt required) |
| **Funksjoner** | GPS-tracking, massetransport, maskintimer, drivstofforbruk |

**Egnethet for MOP:** ⭐⭐⭐ (Usikker API-tilgang)

Ditio er svært relevant for MOP fordi de dekker transportfasen (A4) og byggeprosessen (A5) – livssyklusfaser som tradisjonelt er vanskelige å dokumentere. NS 3720 krever beregning av A4-A5, men data er ofte mangelvare.

Hvorfor Ditio er interessant:
- **GPS-sporing:** Nøyaktige transportavstander for massetransport og materialleveranser erstatter grove anslag.
- **Drivstofforbruk:** Faktisk dieselforbruk for anleggsmaskiner gir presise A5-beregninger.
- **Markedsledende:** Skanska, Peab og andre store entreprenører bruker allerede Ditio, så data finnes.
- **Massebalanse:** Dokumentasjon av flyttede masser (utgraving, fylling) påvirker klimagassregnskapet betydelig for infrastrukturprosjekter.

Hovedutfordringen er manglende offentlig API – integrasjon krever partnerskap med Ditio.

**Bruksområde i MOP:**
- **A4 Transport:** Importere faktiske transportkilometer for materialleveranser til byggeplass
- **A5 Byggeprosess:** Hente drivstofforbruk for anleggsmaskiner og beregne CO2-utslipp
- **Massetransport:** Dokumentere transport av jord, stein og andre masser (særlig relevant for infrastruktur)
- **Revisjonsspor:** Historiske data med GPS-koordinater gir etterprøvbar dokumentasjon

---

### 8. SmartDok API

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | API nevnt i dokumentasjon |
| **Prising** | Betalt (inkludert i SmartDok-lisens) |
| **API-type** | REST (Visma-integrasjon) |

**Egnethet for MOP:** ⭐⭐

SmartDok er primært et verktøy for timeregistrering og HMS, ikke miljødata. For MOP er relevansen begrenset, men det finnes noen bruksområder:

Hvorfor SmartDok har lavere prioritet:
- **Indirekte data:** Mann- og maskintimer kan brukes til å estimere energiforbruk, men krever konverteringsfaktorer som introduserer usikkerhet.
- **Overlapp:** Ditio dekker maskindata bedre med GPS og direkte drivstofforbruk.
- **Fokus:** SmartDok er optimalisert for økonomi og HMS, ikke miljørapportering.

Kan likevel være nyttig hvis:
- Prosjektet allerede bruker SmartDok og ikke har Ditio
- Man trenger å estimere A5-utslipp basert på arbeidstimer per maskintype

**Bruksområde i MOP:**
- **A5 Estimering:** Bruke maskintimer multiplisert med typisk forbruk per maskintype som fallback når Ditio ikke er tilgjengelig
- **Ressursplanlegging:** Korrelere bemanning mot fremdrift i MOP-oppfølging

---

### 9. Avfallshåndtering (Norsk Gjenvinning / Ragn-Sells)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Ingen offentlig API |
| **Prising** | Kundeportal gratis for kunder |

**Egnethet for MOP:** ⭐⭐

Avfallshåndtering er absolutt relevant for MOP – avfallsminimering og sorteringsgrad er ofte eksplisitte krav i miljøoppfølgingsplaner. Problemet er mangel på API – data må hentes manuelt.

Hvorfor avfallsdata er viktig for MOP:
- **C1-C4 Avhending:** Livssyklusfasene for avfall (riving, transport, deponi/gjenvinning) krever dokumentasjon av avfallsmengder.
- **Sorteringsgrad:** MOP-krav spesifiserer ofte mål om 70-90% sorteringsgrad. Uten data kan ikke compliance dokumenteres.
- **Gjenvinning vs. deponi:** CO2-utslipp varierer betydelig mellom gjenvinning og deponi – dette påvirker totalregnskapet.
- **TEK17-krav:** Krav om avfallsplan og dokumentasjon av faktisk avfallsmengde.

Uten API må data importeres via:
- Excel-eksport fra kundeportal (manuelt arbeid)
- PDF-rapporter som må tolkes
- Eventuelt fremtidig API-partnerskap

**Bruksområde i MOP:**
- **Avfallsdokumentasjon:** Registrere avfallsmengder per fraksjon (betong, tre, metall, restavfall, etc.)
- **Sorteringsgrad:** Beregne og dokumentere faktisk sorteringsgrad mot MOP-krav
- **C3-C4 beregning:** Konvertere avfallsmengder til CO2-utslipp basert på behandlingsmetode (gjenvinning gir kreditt, deponi gir utslipp)
- **Sluttrapport:** Inkludere avfallsstatistikk som del av miljødokumentasjon

---

## Offentlige datakilder

Norske offentlige etater tilbyr verdifulle datakilder som kan berike MOP med kontekstdata, utslippsfaktorer og geografisk informasjon. Disse er ofte gratis og har høy datakvalitet.

### 10. Kartverket

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpne API-er (geonorge.no) |
| **Prising** | Gratis for de fleste tjenester |
| **API-type** | REST, WMS, WFS, WMTS |
| **Dokumentasjon** | https://kartkatalog.geonorge.no/ |

**Tilgjengelige tjenester:**
- **Matrikkelen API:** Eiendoms- og bygningsdata (krever tilgang)
- **Høydedata/DTM:** Terrengmodeller for masseberegning
- **Ruteplanlegger:** Kjøreavstander og reisetid
- **Stedsnavn og adresser:** Geokoding av lokasjoner
- **Arealressurskart (AR5):** Arealbruk og naturtyper

**Egnethet for MOP:** ⭐⭐⭐⭐

Kartverket er kritisk for normalisering og transportberegninger i MOP. Klimagassregnskap rapporteres ofte som kg CO2/m² BRA – dette krever nøyaktige arealdata. I tillegg er transportavstander (A4) avhengig av geografiske beregninger.

Hvorfor Kartverket er relevant:
- **Normalisering:** Tomteareal og BRA fra Matrikkelen gir grunnlag for å beregne kg CO2 per m² – nøkkeltall for benchmarking mot kravverdier.
- **A4 Transportberegning:** Ruteplanlegger-API kan beregne faktisk kjøreavstand fra leverandør til byggeplass, ikke bare luftlinje.
- **Massebalanse:** Høydedata (DTM) kombinert med prosjektert terreng gir volum for utgraving/fylling – viktig for infrastrukturprosjekter.
- **Stedfesting:** Alle MOP-prosjekter bør ha geografisk referanse for aggregering og rapportering på kommunenivå.

**Bruksområde i MOP:**
- **Prosjektopprettelse:** Automatisk hente tomteareal og adresse basert på gnr/bnr eller koordinater
- **Materialer & EPD-tab:** Normalisere klimagassregnskap til kg CO2/m² BRA for sammenligning mot grenseverdier
- **A4 Transport:** Beregne kjøreavstand fra leverandøradresse til byggeplassadresse via ruteplanlegger
- **Masseberegning:** Estimere volum for grunnarbeid basert på terrengmodell (infrastrukturprosjekter)
- **Sluttrapport:** Inkludere kartutsnitt med prosjektlokasjon

---

### 11. Statistisk sentralbyrå (SSB)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpen API |
| **Prising** | Gratis |
| **API-type** | REST (JSON-stat) |
| **Dokumentasjon** | https://www.ssb.no/omssb/tjenester-og-verktoy/api |

**Relevante datasett:**
- Utslipp til luft (klimagasser per næring)
- Energibruk i bygninger
- Byggekostnadsindeks
- Avfallsstatistikk

**Egnethet for MOP:** ⭐⭐⭐⭐

SSB er den autoritative kilden for nasjonale utslippsfaktorer og statistikk. Når prosjektspesifikke data mangler, er SSB-snitt det beste alternativet for estimering.

Hvorfor SSB er relevant:
- **Utslippsfaktorer:** Gjennomsnittlige CO2-utslipp per kWh strøm, per liter diesel, per tonn avfall etc. – brukes når produktspesifikk EPD mangler.
- **Benchmarking:** Sammenligne prosjektets klimagassregnskap mot nasjonalt snitt for bygningstypen.
- **Tidsserier:** Historiske data viser utvikling og kan brukes for prognoser.
- **Offisiell kilde:** SSB-data er akseptert som dokumentasjon i offentlige prosjekter.

**Bruksområde i MOP:**
- **Fallback-faktorer:** Når EPD mangler, bruk SSB-gjennomsnitt for materialkategori med tydelig merking
- **Energiberegning:** Utslippsfaktor for norsk strømmiks (oppdateres årlig)
- **Transportutslipp:** CO2 per tonnkilometer for ulike transportmidler (lastebil, båt, tog)
- **Rapportering:** Sammenligne prosjektresultat mot nasjonale referanseverdier

---

### 12. Miljødirektoratet

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpne data og API-er |
| **Prising** | Gratis |
| **API-type** | REST, nedlastbare datasett |
| **Dokumentasjon** | https://data.miljodirektoratet.no/data-og-produkter/ |

**Relevante tjenester:**
- Klimagassregnskap for Norge (NIR)
- Utslippsfaktorer for ulike kilder
- Avfallsplan-veileder
- Produktforskriften (farlige stoffer)

**Egnethet for MOP:** ⭐⭐⭐⭐⭐

Miljødirektoratet er den faglige autoriteten for klimagassberegninger i Norge. Deres metodikk og utslippsfaktorer er referansen for offentlige prosjekter og regulatoriske krav.

Hvorfor Miljødirektoratet er kritisk:
- **Offisielle utslippsfaktorer:** NIR (National Inventory Report) inneholder Norges offisielle utslippsfaktorer – disse bør brukes for A4 (transport) og A5 (byggeplass).
- **Metodikk:** Veiledere for klimagassberegning sikrer at MOP følger akseptert praksis.
- **Farlige stoffer:** Produktforskriften definerer hvilke stoffer som er forbudt/regulert – grunnlag for A20-sjekklisten.
- **Avfallshåndtering:** Retningslinjer for avfallsplan og sorteringsgrad.

**Bruksområde i MOP:**
- **A4-A5 utslippsfaktorer:** Offisielle faktorer for diesel, bensin, elektrisitet på byggeplass
- **Farlige stoffer-tab:** Referanse til Produktforskriften for regulerte stoffer
- **Avfallsberegning:** Utslippsfaktorer for deponi vs. gjenvinning (C3-C4)
- **Metodikk-referanse:** Lenke til offisielle veiledere i sluttrapport for å dokumentere beregningsmetode
- **Compliance:** Sjekke at beregninger følger myndighetskrav

---

### 13. Norges vassdrags- og energidirektorat (NVE)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpne data |
| **Prising** | Gratis |
| **API-type** | REST, WMS |
| **Dokumentasjon** | https://www.nve.no/energi/energisystem/kraftproduksjon/ |

**Relevante datasett:**
- Strømmiks og opprinnelsesgarantier
- Energimerkeordningen for bygninger
- Kraftpriser (historisk)

**Egnethet for MOP:** ⭐⭐⭐

NVE er relevant for energirelaterte beregninger i MOP, særlig for B6 (energibruk i drift) dersom dette inkluderes i scope.

Hvorfor NVE er relevant:
- **Strømmiks:** Norsk produksjonsmiks vs. nordisk forbruksmiks vs. europeisk miks – valget påvirker CO2-beregningen vesentlig.
- **Opprinnelsesgarantier:** Hvis bygget kjøper opprinnelsesgarantier kan utslippsfaktor reduseres til ~0.
- **Energimerke:** Kobling til energimerkeordningen for eksisterende bygg ved rehabilitering.

**Bruksområde i MOP:**
- **B6 Energiberegning:** Utslippsfaktor for elektrisitet basert på valgt strømmiks-metodikk
- **Rehabiliteringsprosjekter:** Hente energimerke for eksisterende bygg som baseline
- **Dokumentasjon:** Referanse til opprinnelsesgarantier hvis aktuelt

---

### 14. Direktoratet for byggkvalitet (DiBK)

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Åpne data, noe API |
| **Prising** | Gratis |
| **Dokumentasjon** | https://www.dibk.no/ |

**Relevante tjenester:**
- TEK17 forskrift og veiledning
- Sentral godkjenning (søk)
- Byggteknisk forskrift

**Egnethet for MOP:** ⭐⭐⭐

DiBK forvalter byggereglene som setter rammene for MOP-krav. TEK17 refererer til klimagassberegninger og materialvalg.

Hvorfor DiBK er relevant:
- **TEK17-krav:** Forskriften stiller krav til dokumentasjon av byggevarer og miljøegenskaper.
- **Sentral godkjenning:** Validere at entreprenører/rådgivere har nødvendig kompetanse.
- **Produktdokumentasjon:** Krav til CE-merking og ytelseserklæringer.

**Bruksområde i MOP:**
- **Kravgrunnlag:** Referanse til TEK17-paragrafer som hjemler MOP-krav
- **Validering:** Sjekk av sentral godkjenning for aktører i prosjektet
- **Sluttrapport:** Dokumentere at løsninger tilfredsstiller forskriftskrav

---

### 15. SINTEF Byggforsk / SINTEF Certification

| Egenskap | Verdi |
|----------|-------|
| **Tilgjengelighet** | Delvis åpent (TG-søk gratis) |
| **Prising** | Byggforsk-abonnement for full tilgang |
| **Dokumentasjon** | https://www.sintefcertification.no/ |

**Relevante tjenester:**
- Teknisk Godkjenning (TG) database
- Byggforsk kunnskapssystem
- Produktsertifisering

**Egnethet for MOP:** ⭐⭐⭐

SINTEF Byggforsk er relevant for produktvalidering, særlig for produkter som ikke har EPD men har Teknisk Godkjenning.

Hvorfor SINTEF er relevant:
- **Teknisk Godkjenning:** TG-dokumenter inneholder ofte miljøinformasjon og kan brukes som sekundærkilde.
- **Byggforsk-anvisninger:** Beste praksis for materialvalg og konstruksjonsløsninger.
- **Produktoversikt:** Søkbar database over godkjente produkter.

**Bruksområde i MOP:**
- **Produktvalidering:** Sjekk om produkt har TG som dokumenterer egnethet
- **Fallback-dokumentasjon:** Bruke TG-data når EPD mangler
- **Kvalitetssikring:** Referanse til Byggforsk-anvisninger for konstruksjonsløsninger

---

## Prioritert implementeringsrekkefølge

### Fase 1: MVP (Anbefalt start)

```
1. EPD-Norge/ECO Portal API  →  Gratis, norsk, 9000+ EPD-er
2. Catenda API               →  BIM-integrasjon (eksisterende lisens)
3. Kartverket                →  Arealdata for normalisering (kg CO2/m²)
4. Miljødirektoratet         →  Offisielle utslippsfaktorer (A4-A5)
```

### Fase 2: Utvidet funksjonalitet

```
5. Cobuilder API             →  Produktvalidering, A20-sjekkliste
6. NOBB API                  →  Produktoppslag (hvis behov)
7. SSB                       →  Fallback-faktorer, benchmarking
```

### Fase 3: Fullverdig løsning

```
8. One Click LCA API         →  Full LCA-beregning
9. Ditio/SmartDok            →  A4-A5 data (hvis API tilgjengelig)
10. NVE/DiBK/SINTEF          →  Støttedata ved behov
```

---

## Teknisk arkitektur

Se [Arkitektur-dataflyt.md](./Arkitektur-dataflyt.md) for detaljert beskrivelse av hvordan API-integrasjonene bør implementeres.

## Dekningsgrad

Se [API-dekningsgrad.md](./API-dekningsgrad.md) for detaljert analyse av datadekning per API og produktkategori.
