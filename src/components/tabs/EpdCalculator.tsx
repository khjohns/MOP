import { useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Scale
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PRODUCT_GROUPS } from '@/data';
import { EpdEntry } from '@/types';

export function EpdCalculator() {
  const { epdEntries, updateEpdEntry, addEpdEntry } = useApp();

  const groupedOptions = useMemo(() => {
    const groups: Record<string, typeof PRODUCT_GROUPS> = {};
    PRODUCT_GROUPS.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, []);

  const handleAddEntry = () => {
    const group = PRODUCT_GROUPS[0];
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
    addEpdEntry(newEntry);
  };

  const handleProductGroupChange = (id: string, value: string) => {
    const group = PRODUCT_GROUPS.find(g => g.name === value);
    if (group) {
      updateEpdEntry(id, 'productGroup', value);
      updateEpdEntry(id, 'limitValue', group.limit);
      updateEpdEntry(id, 'limitText', group.limitText);
      updateEpdEntry(id, 'unit', group.unit);
    }
  };

  const totalEmission = epdEntries.reduce((sum, e) => sum + (e.actualValue * e.quantity), 0);

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
              {epdEntries.map(entry => {
                const hasNumericLimit = entry.limitValue !== null && entry.limitValue > 0;
                const isOverLimit = hasNumericLimit && (entry.actualValue > (entry.limitValue as number));
                const needsJustification = isOverLimit || !entry.isBestChoice;

                return (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 align-top">
                      <select
                        className="w-full bg-white border rounded p-2 text-sm"
                        value={entry.productGroup}
                        onChange={(e) => handleProductGroupChange(entry.id, e.target.value)}
                      >
                        {Object.entries(groupedOptions).map(([grp, opts]) => (
                          <optgroup key={grp} label={grp}>
                            {opts.map(o => (
                              <option key={o.name} value={o.name}>{o.name}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="text-xs text-slate-400 mt-1 pl-1">Enhet: {entry.unit}</div>
                    </td>
                    <td className="p-4 align-top">
                      <input
                        type="text"
                        className="w-full border rounded p-2 text-sm"
                        value={entry.productName}
                        onChange={(e) => updateEpdEntry(entry.id, 'productName', e.target.value)}
                        placeholder="Produktnavn..."
                      />
                    </td>
                    <td className="p-4 align-top text-right">
                      <input
                        type="number"
                        className="w-full text-right border rounded p-2 text-sm"
                        value={entry.quantity}
                        onChange={(e) => updateEpdEntry(entry.id, 'quantity', Number(e.target.value))}
                      />
                    </td>
                    <td className="p-4 align-top text-right pt-4 text-slate-500">
                      {entry.limitText || entry.limitValue}
                    </td>
                    <td className="p-4 align-top text-right">
                      <input
                        type="number"
                        step="0.01"
                        className={`w-full text-right border rounded p-2 text-sm ${isOverLimit ? 'border-red-300 bg-red-50 font-bold text-red-700' : ''}`}
                        value={entry.actualValue}
                        onChange={(e) => updateEpdEntry(entry.id, 'actualValue', Number(e.target.value))}
                      />
                    </td>
                    <td className="p-4 align-top text-center">
                      <div className="flex justify-center bg-slate-100 p-1 rounded-lg">
                        <button
                          onClick={() => updateEpdEntry(entry.id, 'isBestChoice', true)}
                          className={`px-2 py-1 rounded text-xs font-bold ${entry.isBestChoice ? 'bg-white shadow text-green-700' : 'text-slate-400'}`}
                        >
                          JA
                        </button>
                        <button
                          onClick={() => updateEpdEntry(entry.id, 'isBestChoice', false)}
                          className={`px-2 py-1 rounded text-xs font-bold ${!entry.isBestChoice ? 'bg-white shadow text-amber-700' : 'text-slate-400'}`}
                        >
                          NEI
                        </button>
                      </div>
                    </td>
                    <td className="p-4 align-top pt-4">
                      {needsJustification ? (
                        <span className="text-amber-600 font-bold text-xs flex gap-1">
                          <AlertTriangle className="w-3 h-3" /> Sjekk
                        </span>
                      ) : (
                        <span className="text-green-600 font-bold text-xs flex gap-1">
                          <CheckCircle2 className="w-3 h-3" /> OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Justification rows */}
          {epdEntries.map(entry => {
            const hasNumericLimit = entry.limitValue !== null && entry.limitValue > 0;
            const isOverLimit = hasNumericLimit && (entry.actualValue > (entry.limitValue as number));
            const needsJustification = isOverLimit || !entry.isBestChoice;

            if (!needsJustification) return null;

            return (
              <div key={`${entry.id}-justification`} className="bg-amber-50/50 border-b border-amber-100 px-4 py-3">
                <div className="flex gap-3">
                  <Scale className="w-5 h-5 text-amber-500 mt-2" />
                  <div className="flex-1">
                    <label className="text-xs font-bold text-amber-800 uppercase">
                      Begrunnelse for valg - {entry.productName || entry.productGroup} (Pakrevd)
                    </label>
                    <textarea
                      className="w-full border border-amber-200 rounded p-2 text-sm mt-1 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Hvorfor ble dette valgt til tross for høyere utslipp?"
                      value={entry.justification}
                      onChange={(e) => updateEpdEntry(entry.id, 'justification', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t bg-slate-50">
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded hover:bg-blue-50"
          >
            + Legg til linje
          </button>
        </div>
      </div>
    </div>
  );
}
