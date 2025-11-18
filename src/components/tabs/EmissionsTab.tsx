import {
  Wind,
  CheckCircle2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EMISSION_MATRIX, ALL_EMISSION_LABELS } from '@/data';
import { EmissionEntry } from '@/types';

export function EmissionsTab() {
  const { emissionEntries, updateEmissionEntry, addEmissionEntry } = useApp();

  const handleAddEntry = () => {
    const newEntry: EmissionEntry = {
      id: Date.now().toString(),
      categoryId: EMISSION_MATRIX[0].id,
      productName: '',
      label: '',
      documentation: ''
    };
    addEmissionEntry(newEntry);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Emisjoner til inneluft</h2>
        <p className="text-sm text-slate-500 mb-2">
          Dokumentasjon av lavemitterende materialer iht. NS 16798 / BREEAM Hea 02.
        </p>
        <div className="bg-blue-50 text-blue-800 p-3 rounded text-xs flex gap-2">
          <Wind className="w-4 h-4" />
          Gyldig dok: Sertifisering (se matrise) eller egenerklaring basert pa ISO 16000 test.
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600 border-b text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-1/3">Produktkategori</th>
                <th className="p-4 w-1/3">Produktnavn</th>
                <th className="p-4 w-1/4">Miljomerke / Dok</th>
                <th className="p-4 w-32">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {emissionEntries.map(entry => {
                const category = EMISSION_MATRIX.find(c => c.id === entry.categoryId);
                const isValidLabel = category?.acceptedLabels.includes(entry.label);
                const isCustom = entry.label === "Annen / Egenerklaring";

                return (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 align-top">
                      <select
                        className="w-full bg-white border rounded p-2 text-sm"
                        value={entry.categoryId}
                        onChange={(e) => updateEmissionEntry(entry.id, 'categoryId', e.target.value)}
                      >
                        {EMISSION_MATRIX.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <div className="mt-1 text-xs text-slate-400">
                        Godkjent: {category?.acceptedLabels.join(", ")}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <input
                        type="text"
                        className="w-full border rounded p-2 text-sm"
                        placeholder="Navn..."
                        value={entry.productName}
                        onChange={(e) => updateEmissionEntry(entry.id, 'productName', e.target.value)}
                      />
                    </td>
                    <td className="p-4 align-top">
                      <select
                        className={`w-full border rounded p-2 text-sm ${isValidLabel ? 'bg-green-50 border-green-200 text-green-800' : ''}`}
                        value={entry.label}
                        onChange={(e) => updateEmissionEntry(entry.id, 'label', e.target.value)}
                      >
                        <option value="">- Velg -</option>
                        {ALL_EMISSION_LABELS.map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="w-full mt-2 border-b border-slate-200 text-xs p-1 bg-slate-50"
                        placeholder="Link til bevis..."
                        value={entry.documentation}
                        onChange={(e) => updateEmissionEntry(entry.id, 'documentation', e.target.value)}
                      />
                    </td>
                    <td className="p-4 align-top pt-5">
                      {isValidLabel ? (
                        <div className="text-green-600 text-xs font-bold flex gap-1">
                          <CheckCircle2 className="w-4 h-4" /> OK
                        </div>
                      ) : isCustom ? (
                        <div className="text-blue-600 text-xs font-bold flex gap-1">
                          <Info className="w-4 h-4" /> Manuell
                        </div>
                      ) : entry.label ? (
                        <div className="text-amber-600 text-xs font-bold flex gap-1">
                          <AlertTriangle className="w-4 h-4" /> Avvik?
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-slate-50">
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded hover:bg-blue-50"
          >
            + Legg til produkt
          </button>
        </div>
      </div>
    </div>
  );
}
