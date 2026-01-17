# MOP Dokumentasjon

Teknisk dokumentasjon for MOP (Miljøoppfølgingsplan) applikasjonen.

## Innhold

| Dokument | Beskrivelse |
|----------|-------------|
| [API-integrasjoner.md](./API-integrasjoner.md) | Oversikt over anbefalte API-er med vurdering av tilgjengelighet, prising og egnethet |
| [API-dekningsgrad.md](./API-dekningsgrad.md) | Analyse av datadekning per API og produktkategori |
| [Arkitektur-dataflyt.md](./Arkitektur-dataflyt.md) | Anbefalt arkitektur, dataflyt og implementeringsdetaljer |

## Hurtigreferanse

### Anbefalte API-er (Fase 1)

| API | Formål | Pris | Prioritet |
|-----|--------|------|-----------|
| EPD-Norge | Norske EPD-er, CO2-data | Gratis | Kritisk |
| ECO Portal | Europeiske EPD-er (fallback) | Gratis | Kritisk |
| Catenda | BIM/IFC-modeller | Betalt | Kritisk |

### Estimert EPD-dekning

- **Råbygg (betong, stål):** 85-95%
- **Isolasjon:** 80-90%
- **Tekniske installasjoner:** 20-40%
- **Totalt med fallback:** ~95%

### Mappestruktur for integrasjoner

```
src/
├── services/
│   ├── api/          # API-klienter
│   ├── adapters/     # Data-transformasjon
│   └── cache/        # Lokal caching
├── hooks/            # Custom React hooks
└── utils/            # Hjelpefunksjoner
```

## Sist oppdatert

Januar 2025
