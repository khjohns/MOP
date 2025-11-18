import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Leaf, 
  FlaskConical, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Info,
  AlertTriangle,
  CheckCircle2,
  Save,
  FileDown,
  Search,
  Wind,
  ExternalLink,
  Scale
} from 'lucide-react';

// ==========================================
// 1. TYPES & INTERFACES (DATAMODELL)
// ==========================================

export enum MopStatus {
  RELEVANT = "Relevant for oppdraget",
  NOT_RELEVANT = "Ikke relevant for oppdraget",
  NOT_STARTED = "Ikke påbegynt",
  STARTED = "Påbegynt",
  IVARETATT = "Ivaretatt, mangler som bygget dok",
  FERDIG = "Ferdig dokumentert, pkt lukkes"
}

export interface MopItem {
  id: string;
  category: string; 
  requirement: string; 
  description: string; 
  status: MopStatus;
  documentation: string;     // Kolonne E
  projectFollowUp: string;   // Kolonne F
  phase: string;
}

export interface ProductGroupDefinition {
  category: string; 
  name: string;
  unit: string;
  limit: number | null; 
  limitText?: string; 
}

export interface EpdEntry {
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
}

export interface ChemicalCheckItem {
  id: string;
  substance: string;
  materialCategory: string;
  description: string;
}

export interface ChemicalCheckEntry {
  checkItemId: string;
  isRelevant: boolean;
  productName: string;
  documentation: string;
}

export interface EmissionCategory {
  id: string;
  name: string;
  acceptedLabels: string[];
}

export interface EmissionEntry {
  id: string;
  categoryId: string;
  productName: string;
  label: string;
  documentation: string;
}

// ==========================================
// 2. INITIAL DATA & CONSTANTS (SEEDING)
// ==========================================

// --- MOP Krav (Fullstendig liste basert på CSV) ---
const INITIAL_MOP_DATA: MopItem[] = [
  // KLIMA
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
  // AVFALL
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

// --- EPD Produktgrupper (Full liste fra CSV) ---
const PRODUCT_GROUPS_FULL: ProductGroupDefinition[] = [
  { category: "RÅBYGG", name: "Plasstøpt betong (inkl. påstøp)", unit: "kg CO2/m3", limit: null, limitText: "Iht. NB37 Lavkarbon A" },
  { category: "RÅBYGG", name: "Prefabrikert betong", unit: "kg CO2/m3", limit: null, limitText: "Iht. NB37 Lavkarbon A" },
  { category: "RÅBYGG", name: "Armeringsjern", unit: "kg CO2/kg", limit: 0.37 },
  { category: "RÅBYGG", name: "Konstruksjonsstål", unit: "kg CO2/kg", limit: 1.00 },
  { category: "RÅBYGG", name: "Massivtre", unit: "kg CO2/m3", limit: 95.00 },
  { category: "RÅBYGG", name: "Limtre", unit: "kg CO2/m3", limit: 80.00 },
  { category: "ISOLASJON", name: "Glassull (densitet <28)", unit: "kg CO2/R=1", limit: 0.80 },
  { category: "ISOLASJON", name: "Steinull (densitet <80)", unit: "kg CO2/R=1", limit: 1.10 },
  { category: "ISOLASJON", name: "XPS (trykklasse 300)", unit: "kg CO2/R=1", limit: 2.60 },
  { category: "GULV", name: "Parkett", unit: "kg CO2/m2", limit: 5.50 },
  { category: "GULV", name: "Vinyl", unit: "kg CO2/m2", limit: 6.10 },
  { category: "GULV", name: "Avrettingsmasse", unit: "kg CO2/kg", limit: 0.18 },
  { category: "VEGG/HIMLING", name: "Gipsplater", unit: "kg CO2/m2", limit: 3.00 },
  { category: "VEGG/HIMLING", name: "Maling (2 strøk)", unit: "kg CO2/m2", limit: 0.40 },
  { category: "VEGG/HIMLING", name: "Systemhimling", unit: "kg CO2/m2", limit: 2.50 },
  { category: "FASADE", name: "Kledningsbord (tre)", unit: "kg CO2/m2", limit: 2.00 },
  { category: "FASADE", name: "Teglstein", unit: "kg CO2/m2", limit: 28.00 },
  { category: "FASADE", name: "Glass (3-lags)", unit: "kg CO2/m2", limit: 35.00 },
];

// --- A20 Sjekkliste (Data fra CSV) ---
const CHEMICAL_CHECKLIST_DATA: ChemicalCheckItem[] = [
  { id: 'a20-1', substance: 'Bromerte flammehemmere (HBCD, TBBPA)', materialCategory: 'Isolasjon (XPS, EPS), cellegummi, takbelegg, fugemasse', description: 'Skal unngås.' },
  { id: 'a20-2', substance: 'Ftalater (DEHP, DBP, BBP, DIBP)', materialCategory: 'Gulvbelegg (vinyl), tapet, fugemasse, lim', description: 'Mykgjørere i plast.' },
  { id: 'a20-3', substance: 'Klorparafiner (korte og mellomkjedede)', materialCategory: 'Fugemasse, maling, lim, plastprodukter', description: 'Grenseverdi 0,1%.' },
  { id: 'a20-4', substance: 'Bisfenol A (BPA)', materialCategory: 'Epoksyprodukter (lim, fugemasse, gulvbelegg)', description: 'Skal unngås i produkter som herder på byggeplass.' },
  { id: 'a20-5', substance: 'Tinnorganiske forbindelser', materialCategory: 'Gulvbelegg, plastprodukter, silikonfugemasse', description: 'Katalysator/stabilisator i plast.' },
  { id: 'a20-6', substance: 'Krom (Cr) og Arsen (As)', materialCategory: 'Trykkimpregnert trevirke', description: 'Skal ikke forekomme i trevirke.' },
  { id: 'a20-7', substance: 'Siloksaner (D4/D5)', materialCategory: 'Fugemasse, maling, renholdsprodukter', description: 'Miljøgift.' },
];

// --- Emisjonskrav Matrise (Basert på NS 16798 / CSV) ---
const EMISSION_MATRIX: EmissionCategory[] = [
  { 
    id: 'cat-paint', 
    name: 'Innendørs maling og overflatebehandling', 
    acceptedLabels: ['M1', 'Svanemerket', 'EU-Ecolabel', 'Indoor Air Comfort Gold', 'EC1 Plus'] 
  },
  { 
    id: 'cat-wood', 
    name: 'Trebaserte produkter (inkl. tregulv)', 
    acceptedLabels: ['M1', 'Svanemerket', 'Indoor Air Comfort Gold', 'German Blue Angel'] 
  },
  { 
    id: 'cat-floor', 
    name: 'Gulvmaterialer (inkl. avretting)', 
    acceptedLabels: ['M1', 'EC1 Plus', 'EC1', 'Svanemerket', 'Indoor Air Comfort Gold', 'GUT'] 
  },
  { 
    id: 'cat-sealant', 
    name: 'Lim og tetningsmidler (innendørs)', 
    acceptedLabels: ['M1', 'EC1 Plus', 'EC1', 'Svanemerket', 'Indoor Air Comfort Gold'] 
  },
  { 
    id: 'cat-ceiling', 
    name: 'Himling, vegg og akustikkplater', 
    acceptedLabels: ['M1', 'Svanemerket', 'Indoor Air Comfort Gold', 'German Blue Angel'] 
  }
];

const ALL_LABELS = [
  "M1", "EC1 Plus", "EC1", "EC2", "Svanemerket", "EU-Ecolabel", 
  "Indoor Air Comfort Gold", "GUT", "German Blue Angel", "Sinus (Sintef)", "Annen / Egenerklæring"
];

// ==========================================
// 3. COMPONENTS
// ==========================================

// --- Common Components ---
const StatusBadge = ({ status }: { status: MopStatus }) => {
  const colors = {
    [MopStatus.RELEVANT]: "bg-blue-50 text-blue-700 border-blue-200",
    [MopStatus.NOT_RELEVANT]: "bg-gray-100 text-gray-400 border-gray-200",
    [MopStatus.NOT_STARTED]: "bg-red-50 text-red-700 border-red-200",
    [MopStatus.STARTED]: "bg-amber-50 text-amber-700 border-amber-200",
    [MopStatus.IVARETATT]: "bg-purple-50 text-purple-700 border-purple-200",
    [MopStatus.FERDIG]: "bg-green-50 text-green-700 border-green-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${colors[status]}`}>{status}</span>;
};

// --- TAB 1: MOP Table (Core) ---
const MopTable = () => {
  const [items, setItems] = useState<MopItem[]>(INITIAL_MOP_DATA);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => items.filter(i => i.requirement.toLowerCase().includes(filter.toLowerCase())), [items, filter]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, MopItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const updateItem = (id: string, field: keyof MopItem, value: any) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Søk i krav..." 
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {Object.entries(groupedItems).map(([category, groupItems]) => (
        <div key={category} className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b font-bold text-slate-800 flex items-center gap-2">
             <ClipboardList className="w-5 h-5 text-blue-600" />
             {category}
          </div>
          <div className="divide-y">
            {groupItems.map(item => (
              <div key={item.id} className={`group transition-all ${expandedId === item.id ? 'bg-blue-50/30 ring-1 ring-blue-100' : 'hover:bg-slate-50'}`}>
                <div 
                  className="p-4 flex items-start gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="mt-1 text-slate-400">
                    {expandedId === item.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm">{item.requirement}</div>
                    <span className="text-xs text-slate-500 mt-1 inline-block bg-white border px-2 py-0.5 rounded">Fase: {item.phase}</span>
                  </div>
                  <div className="hidden sm:block"><StatusBadge status={item.status} /></div>
                </div>
                
                {expandedId === item.id && (
                  <div className="px-4 pb-6 pl-4 md:pl-12 border-t bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                      <div className="lg:col-span-4 space-y-5">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-slate-700">
                          <h4 className="text-xs uppercase tracking-wider text-blue-800 font-bold mb-2 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Beskrivelse
                          </h4>
                          <p className="leading-relaxed">{item.description}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Endre Status</label>
                          <select 
                            className="w-full p-2.5 border rounded-lg text-sm bg-white shadow-sm"
                            value={item.status}
                            onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                          >
                            {Object.values(MopStatus).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">Dokumentasjon (Kolonne E)</label>
                          <textarea 
                            className="w-full p-3 border rounded-lg text-sm h-32 shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={item.documentation}
                            onChange={(e) => updateItem(item.id, 'documentation', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">Prosjektets oppfølging (Kolonne F)</label>
                          <textarea 
                            className="w-full p-3 border rounded-lg text-sm h-32 shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={item.projectFollowUp}
                            onChange={(e) => updateItem(item.id, 'projectFollowUp', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- TAB 2: EPD Calculator ---
const EpdCalculator = () => {
  const [entries, setEntries] = useState<EpdEntry[]>([
    { 
      id: '1', 
      productGroup: 'Armeringsjern', 
      productName: 'Norsk Stål B500NC', 
      limitValue: 0.37, 
      actualValue: 0.35, 
      unit: 'kg CO2/kg', 
      quantity: 5000,
      isBestChoice: true,
      justification: '' 
    }
  ]);

  const groupedOptions = useMemo(() => {
    const groups: Record<string, ProductGroupDefinition[]> = {};
    PRODUCT_GROUPS_FULL.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, []);

  const addEntry = () => {
    const group = PRODUCT_GROUPS_FULL[0];
    const newEntry: EpdEntry = {
      id: Date.now().toString(),
      productGroup: group.name,
      productName: '',
      limitValue: group.limit,
      limitText: group.limitText,
      actualValue: 0,
      unit: group.unit,
      quantity: 0,
      isBestChoice: true, 
      justification: ''
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: string, field: keyof EpdEntry, value: any) => {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e;
      if (field === 'productGroup') {
        const group = PRODUCT_GROUPS_FULL.find(g => g.name === value);
        return { 
          ...e, 
          productGroup: value, 
          limitValue: group?.limit || null, 
          limitText: group?.limitText, 
          unit: group?.unit || '' 
        };
      }
      return { ...e, [field]: value };
    }));
  };

  const totalEmission = entries.reduce((sum, e) => sum + (e.actualValue * e.quantity), 0);

  return (
    <div className="space-y-6">
       <div className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Klimagassregnskap</h2>
            <p className="text-sm text-slate-500">A1-A3 utslipp. Tredjeparts EPD kreves.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase font-bold">Sum</div>
            <div className="text-2xl font-bold text-slate-900">{totalEmission.toLocaleString()} kg CO2</div>
          </div>
       </div>

       <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-600 border-b text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-1/5">Produktgruppe</th>
                <th className="p-4 w-1/5">Produktnavn (EPD)</th>
                <th className="p-4 text-right w-20">Mengde</th>
                <th className="p-4 text-right w-24">Grense</th>
                <th className="p-4 text-right w-20">Faktisk</th>
                <th className="p-4 text-center w-24">Best?</th>
                <th className="p-4 w-24">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {entries.map(entry => {
                const hasNumericLimit = entry.limitValue !== null && entry.limitValue > 0;
                const isOverLimit = hasNumericLimit && (entry.actualValue > (entry.limitValue as number));
                const needsJustification = isOverLimit || !entry.isBestChoice;

                return (
                  <React.Fragment key={entry.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 align-top">
                          <select 
                            className="w-full bg-white border rounded p-2 text-sm"
                            value={entry.productGroup}
                            onChange={(e) => updateEntry(entry.id, 'productGroup', e.target.value)}
                          >
                            {Object.entries(groupedOptions).map(([grp, opts]) => (
                              <optgroup key={grp} label={grp}>
                                {opts.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
                              </optgroup>
                            ))}
                          </select>
                          <div className="text-xs text-slate-400 mt-1 pl-1">Enhet: {entry.unit}</div>
                      </td>
                      <td className="p-4 align-top">
                          <input type="text" className="w-full border rounded p-2 text-sm" value={entry.productName} onChange={(e) => updateEntry(entry.id, 'productName', e.target.value)} />
                      </td>
                      <td className="p-4 align-top text-right">
                          <input type="number" className="w-full text-right border rounded p-2 text-sm" value={entry.quantity} onChange={(e) => updateEntry(entry.id, 'quantity', Number(e.target.value))} />
                      </td>
                      <td className="p-4 align-top text-right pt-4 text-slate-500">
                          {entry.limitText || entry.limitValue}
                      </td>
                      <td className="p-4 align-top text-right">
                          <input type="number" className={`w-full text-right border rounded p-2 text-sm ${isOverLimit ? 'border-red-300 bg-red-50 font-bold text-red-700' : ''}`} value={entry.actualValue} onChange={(e) => updateEntry(entry.id, 'actualValue', Number(e.target.value))} />
                      </td>
                      <td className="p-4 align-top text-center">
                          <div className="flex justify-center bg-slate-100 p-1 rounded-lg inline-flex">
                            <button onClick={() => updateEntry(entry.id, 'isBestChoice', true)} className={`px-2 py-1 rounded text-xs font-bold ${entry.isBestChoice ? 'bg-white shadow text-green-700' : 'text-slate-400'}`}>JA</button>
                            <button onClick={() => updateEntry(entry.id, 'isBestChoice', false)} className={`px-2 py-1 rounded text-xs font-bold ${!entry.isBestChoice ? 'bg-white shadow text-amber-700' : 'text-slate-400'}`}>NEI</button>
                          </div>
                      </td>
                      <td className="p-4 align-top pt-4">
                          {needsJustification ? <span className="text-amber-600 font-bold text-xs flex gap-1"><AlertTriangle className="w-3 h-3" /> Sjekk</span> : <span className="text-green-600 font-bold text-xs flex gap-1"><CheckCircle2 className="w-3 h-3" /> OK</span>}
                      </td>
                    </tr>
                    {needsJustification && (
                      <tr className="bg-amber-50/50 border-b border-amber-100">
                        <td colSpan={7} className="px-4 py-3">
                          <div className="flex gap-3">
                            <Scale className="w-5 h-5 text-amber-500 mt-2" />
                            <div className="flex-1">
                               <label className="text-xs font-bold text-amber-800 uppercase">Begrunnelse for valg (Påkrevd)</label>
                               <textarea className="w-full border border-amber-200 rounded p-2 text-sm mt-1 focus:ring-amber-500 focus:border-amber-500" placeholder="Hvorfor ble dette valgt til tross for høyere utslipp?" value={entry.justification} onChange={(e) => updateEntry(entry.id, 'justification', e.target.value)} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-slate-50">
          <button onClick={addEntry} className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded hover:bg-blue-50">+ Legg til linje</button>
        </div>
       </div>
    </div>
  );
};

// --- TAB 3: CHEMICALS (Sjekkliste A20) ---
const ChemicalsTab = () => {
  const [checklist, setChecklist] = useState<ChemicalCheckEntry[]>(() => 
    CHEMICAL_CHECKLIST_DATA.map(item => ({
      checkItemId: item.id,
      isRelevant: true, // Default to relevant 
      productName: '',
      documentation: ''
    }))
  );

  const updateEntry = (id: string, field: keyof ChemicalCheckEntry, value: any) => {
    setChecklist(prev => prev.map(item => item.checkItemId === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
         <h2 className="text-lg font-bold text-slate-900 mb-1">Farlige Stoffer - Sjekkliste A20</h2>
         <p className="text-sm text-slate-500">Disse stoffene skal unngås. Dokumenter fravær for relevante produkter.</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-600 border-b text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-1/4">Stoff / Kjemikalie</th>
                <th className="p-4 w-1/4">Relevante Materialer</th>
                <th className="p-4 w-32 text-center">I bruk?</th>
                <th className="p-4 w-1/4">Produktnavn</th>
                <th className="p-4 w-1/4">Link til Datablad</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {CHEMICAL_CHECKLIST_DATA.map((item) => {
                const entry = checklist.find(e => e.checkItemId === item.id)!;
                
                return (
                  <tr key={item.id} className={`transition-colors ${entry.isRelevant ? 'hover:bg-slate-50' : 'bg-slate-50/50 text-slate-400'}`}>
                    <td className="p-4 align-top">
                      <div className={`font-medium ${entry.isRelevant ? 'text-slate-900' : 'text-slate-500'}`}>{item.substance}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.description}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {item.materialCategory.split(', ').map((cat, idx) => (
                           <span key={idx} className={`text-xs px-2 py-1 rounded border ${entry.isRelevant ? 'bg-white border-slate-200' : 'bg-transparent border-slate-100'}`}>{cat}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-top text-center">
                       <button onClick={() => updateEntry(item.id, 'isRelevant', !entry.isRelevant)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${entry.isRelevant ? 'bg-blue-600' : 'bg-slate-200'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${entry.isRelevant ? 'translate-x-6' : 'translate-x-1'}`}/>
                       </button>
                       <div className="text-[10px] font-medium mt-1 uppercase text-slate-400">{entry.isRelevant ? 'Ja' : 'Nei'}</div>
                    </td>
                    <td className="p-4 align-top">
                      {entry.isRelevant ? (
                        <input type="text" className="w-full border rounded p-2 text-sm" placeholder="Produktnavn..." value={entry.productName} onChange={(e) => updateEntry(item.id, 'productName', e.target.value)} />
                      ) : <span className="italic text-xs text-slate-300">Ikke relevant</span>}
                    </td>
                    <td className="p-4 align-top">
                       {entry.isRelevant ? (
                        <div className="relative">
                           <ExternalLink className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                           <input type="text" className={`w-full border rounded p-2 text-sm pr-8 ${!entry.documentation && entry.productName ? 'border-amber-300 bg-amber-50' : ''}`} placeholder="URL..." value={entry.documentation} onChange={(e) => updateEntry(item.id, 'documentation', e.target.value)} />
                        </div>
                      ) : <span className="flex items-center gap-1 text-slate-300 text-xs"><CheckCircle2 className="w-3 h-3" /> Kvittert ut</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- TAB 4: EMISSIONS (Inneklima) ---
const EmissionsTab = () => {
  const [entries, setEntries] = useState<EmissionEntry[]>([
    { id: '1', categoryId: 'cat-paint', productName: 'Jotun Lady', label: 'Svanemerket', documentation: '' }
  ]);

  const addEntry = () => {
    setEntries([...entries, { 
      id: Date.now().toString(), 
      categoryId: EMISSION_MATRIX[0].id, 
      productName: '', 
      label: '', 
      documentation: '' 
    }]);
  };

  const updateEntry = (id: string, field: keyof EmissionEntry, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Emisjoner til inneluft</h2>
        <p className="text-sm text-slate-500 mb-2">Dokumentasjon av lavemitterende materialer iht. NS 16798 / BREEAM Hea 02.</p>
        <div className="bg-blue-50 text-blue-800 p-3 rounded text-xs flex gap-2">
           <Wind className="w-4 h-4" /> 
           Gyldig dok: Sertifisering (se matrise) eller egenerklæring basert på ISO 16000 test.
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600 border-b text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-1/3">Produktkategori</th>
                <th className="p-4 w-1/3">Produktnavn</th>
                <th className="p-4 w-1/4">Miljømerke / Dok</th>
                <th className="p-4 w-32">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {entries.map(entry => {
                const category = EMISSION_MATRIX.find(c => c.id === entry.categoryId);
                const isValidLabel = category?.acceptedLabels.includes(entry.label);
                const isCustom = entry.label === "Annen / Egenerklæring";
                
                return (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 align-top">
                       <select className="w-full bg-white border rounded p-2 text-sm" value={entry.categoryId} onChange={(e) => updateEntry(entry.id, 'categoryId', e.target.value)}>
                         {EMISSION_MATRIX.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                       </select>
                       <div className="mt-1 text-xs text-slate-400">Godkjent: {category?.acceptedLabels.join(", ")}</div>
                    </td>
                    <td className="p-4 align-top">
                       <input type="text" className="w-full border rounded p-2 text-sm" placeholder="Navn..." value={entry.productName} onChange={(e) => updateEntry(entry.id, 'productName', e.target.value)} />
                    </td>
                    <td className="p-4 align-top">
                       <select className={`w-full border rounded p-2 text-sm ${isValidLabel ? 'bg-green-50 border-green-200 text-green-800' : ''}`} value={entry.label} onChange={(e) => updateEntry(entry.id, 'label', e.target.value)}>
                         <option value="">- Velg -</option>
                         {ALL_LABELS.map(l => <option key={l} value={l}>{l}</option>)}
                       </select>
                       <input type="text" className="w-full mt-2 border-b border-slate-200 text-xs p-1 bg-slate-50" placeholder="Link til bevis..." value={entry.documentation} onChange={(e) => updateEntry(entry.id, 'documentation', e.target.value)} />
                    </td>
                    <td className="p-4 align-top pt-5">
                       {isValidLabel ? 
                         <div className="text-green-600 text-xs font-bold flex gap-1"><CheckCircle2 className="w-4 h-4"/> OK</div> : 
                         (isCustom ? <div className="text-blue-600 text-xs font-bold flex gap-1"><Info className="w-4 h-4"/> Manuell</div> : 
                         (entry.label ? <div className="text-amber-600 text-xs font-bold flex gap-1"><AlertTriangle className="w-4 h-4"/> Avvik?</div> : <span className="text-slate-300">-</span>))
                       }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-slate-50">
           <button onClick={addEntry} className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded hover:bg-blue-50">+ Legg til produkt</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('mop');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-100">
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight">Digital MOP</h1>
              <div className="text-xs text-slate-500 font-medium">Prosjekt: Nytt Kontorbygg Oslo</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">
              <FileDown className="w-4 h-4" /> Eksport
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm">
              <Save className="w-4 h-4" /> Lagre
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex overflow-x-auto no-scrollbar space-x-1 mb-8 border-b border-slate-200">
          {[
            { id: 'dashboard', label: 'Oversikt', icon: LayoutDashboard },
            { id: 'mop', label: 'MOP Oppfølging', icon: ClipboardList },
            { id: 'epd', label: 'Materialer & EPD', icon: Leaf },
            { id: 'chem', label: 'Farlige Stoffer', icon: FlaskConical },
            { id: 'emissions', label: 'Emisjonskrav', icon: Wind },
            { id: 'report', label: 'Sluttrapport', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-green-600 text-green-800 bg-green-50/60 rounded-t-md' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-green-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'dashboard' && <div className="p-12 text-center border-2 border-dashed rounded-xl text-slate-400">Dashboard med KPIer og fremdriftsindikatorer kommer her.</div>}
          {activeTab === 'mop' && <MopTable />}
          {activeTab === 'epd' && <EpdCalculator />}
          {activeTab === 'chem' && <ChemicalsTab />}
          {activeTab === 'emissions' && <EmissionsTab />}
          {activeTab === 'report' && <div className="p-12 text-center border-2 border-dashed rounded-xl text-slate-400">Funksjonalitet for signering og PDF-generering kommer her.</div>}
        </div>
      </main>
    </div>
  );
}