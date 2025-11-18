import { useState, useMemo } from 'react';
import {
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Info,
  Search
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/common';
import { MopStatus, MopItem } from '@/types';

export function MopTable() {
  const { mopItems, updateMopItem } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() =>
    mopItems.filter(i =>
      i.requirement.toLowerCase().includes(filter.toLowerCase()) ||
      i.category.toLowerCase().includes(filter.toLowerCase())
    ),
    [mopItems, filter]
  );

  const groupedItems = useMemo(() => {
    const groups: Record<string, MopItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Sok i krav..."
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
              <div
                key={item.id}
                className={`group transition-all ${expandedId === item.id ? 'bg-blue-50/30 ring-1 ring-blue-100' : 'hover:bg-slate-50'}`}
              >
                <div
                  className="p-4 flex items-start gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="mt-1 text-slate-400">
                    {expandedId === item.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm">{item.requirement}</div>
                    <span className="text-xs text-slate-500 mt-1 inline-block bg-white border px-2 py-0.5 rounded">
                      Fase: {item.phase}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                {expandedId === item.id && (
                  <div className="px-4 pb-6 pl-4 md:pl-12 border-t bg-white animate-in">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                      <div className="lg:col-span-4 space-y-5">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-slate-700">
                          <h4 className="text-xs uppercase tracking-wider text-blue-800 font-bold mb-2 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Beskrivelse
                          </h4>
                          <p className="leading-relaxed">{item.description}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">
                            Endre Status
                          </label>
                          <select
                            className="w-full p-2.5 border rounded-lg text-sm bg-white shadow-sm"
                            value={item.status}
                            onChange={(e) => updateMopItem(item.id, 'status', e.target.value as MopStatus)}
                          >
                            {Object.values(MopStatus).map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Dokumentasjon (Kolonne E)
                          </label>
                          <textarea
                            className="w-full p-3 border rounded-lg text-sm h-32 shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={item.documentation}
                            onChange={(e) => updateMopItem(item.id, 'documentation', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Prosjektets oppfolging (Kolonne F)
                          </label>
                          <textarea
                            className="w-full p-3 border rounded-lg text-sm h-32 shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={item.projectFollowUp}
                            onChange={(e) => updateMopItem(item.id, 'projectFollowUp', e.target.value)}
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
}
