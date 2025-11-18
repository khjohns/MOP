import {
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CHEMICAL_CHECKLIST_DATA } from '@/data';

export function ChemicalsTab() {
  const { chemicalEntries, updateChemicalEntry } = useApp();

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
                const entry = chemicalEntries.find(e => e.checkItemId === item.id);
                if (!entry) return null;

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${entry.isRelevant ? 'hover:bg-slate-50' : 'bg-slate-50/50 text-slate-400'}`}
                  >
                    <td className="p-4 align-top">
                      <div className={`font-medium ${entry.isRelevant ? 'text-slate-900' : 'text-slate-500'}`}>
                        {item.substance}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{item.description}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {item.materialCategory.split(', ').map((cat, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded border ${entry.isRelevant ? 'bg-white border-slate-200' : 'bg-transparent border-slate-100'}`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-top text-center">
                      <button
                        onClick={() => updateChemicalEntry(item.id, 'isRelevant', !entry.isRelevant)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${entry.isRelevant ? 'bg-blue-600' : 'bg-slate-200'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${entry.isRelevant ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                      <div className="text-[10px] font-medium mt-1 uppercase text-slate-400">
                        {entry.isRelevant ? 'Ja' : 'Nei'}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      {entry.isRelevant ? (
                        <input
                          type="text"
                          className="w-full border rounded p-2 text-sm"
                          placeholder="Produktnavn..."
                          value={entry.productName}
                          onChange={(e) => updateChemicalEntry(item.id, 'productName', e.target.value)}
                        />
                      ) : (
                        <span className="italic text-xs text-slate-300">Ikke relevant</span>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      {entry.isRelevant ? (
                        <div className="relative">
                          <ExternalLink className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            className={`w-full border rounded p-2 text-sm pr-8 ${!entry.documentation && entry.productName ? 'border-amber-300 bg-amber-50' : ''}`}
                            placeholder="URL..."
                            value={entry.documentation}
                            onChange={(e) => updateChemicalEntry(item.id, 'documentation', e.target.value)}
                          />
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-300 text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Kvittert ut
                        </span>
                      )}
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
}
