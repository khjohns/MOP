import { useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MopStatus } from '@/types';

export function Dashboard() {
  const { mopItems, epdEntries, chemicalEntries, emissionEntries } = useApp();

  const mopStats = useMemo(() => {
    const total = mopItems.length;
    const relevant = mopItems.filter(i => i.status !== MopStatus.NOT_RELEVANT).length;
    const completed = mopItems.filter(i => i.status === MopStatus.FERDIG).length;
    const inProgress = mopItems.filter(i => i.status === MopStatus.STARTED || i.status === MopStatus.IVARETATT).length;
    const notStarted = mopItems.filter(i => i.status === MopStatus.NOT_STARTED).length;
    const percentage = relevant > 0 ? Math.round((completed / relevant) * 100) : 0;
    return { total, relevant, completed, inProgress, notStarted, percentage };
  }, [mopItems]);

  const epdStats = useMemo(() => {
    const total = epdEntries.length;
    const withWarnings = epdEntries.filter(e => {
      const hasNumericLimit = e.limitValue !== null && e.limitValue > 0;
      const isOverLimit = hasNumericLimit && (e.actualValue > (e.limitValue as number));
      return isOverLimit || !e.isBestChoice;
    }).length;
    const totalEmission = epdEntries.reduce((sum, e) => sum + (e.actualValue * e.quantity), 0);
    return { total, withWarnings, totalEmission };
  }, [epdEntries]);

  const chemStats = useMemo(() => {
    const total = chemicalEntries.length;
    const relevant = chemicalEntries.filter(e => e.isRelevant).length;
    const documented = chemicalEntries.filter(e => e.isRelevant && e.documentation).length;
    return { total, relevant, documented };
  }, [chemicalEntries]);

  const emissionStats = useMemo(() => {
    const total = emissionEntries.length;
    return { total };
  }, [emissionEntries]);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Prosjektstatus</h2>
            <p className="text-sm text-slate-500">Oversikt over MOP-fremdrift</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{mopStats.percentage}%</div>
            <div className="text-xs text-slate-500">Fullført</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${mopStats.percentage}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {mopStats.completed} av {mopStats.relevant} relevante krav er fullført
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MOP Status */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-semibold text-slate-700">Fullførte krav</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{mopStats.completed}</div>
          <div className="text-xs text-slate-500 mt-1">av {mopStats.relevant} relevante</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-semibold text-slate-700">Under arbeid</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{mopStats.inProgress}</div>
          <div className="text-xs text-slate-500 mt-1">påbegynt eller ivaretatt</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-semibold text-slate-700">Ikke påbegynt</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{mopStats.notStarted}</div>
          <div className="text-xs text-slate-500 mt-1">krever oppmerksomhet</div>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-slate-700">CO2 Utslipp</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{epdStats.totalEmission.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">kg CO2 totalt (A1-A3)</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* EPD Overview */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Materialer & EPD
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Registrerte produkter</span>
              <span className="font-medium">{epdStats.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Med advarsler</span>
              <span className={`font-medium ${epdStats.withWarnings > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                {epdStats.withWarnings}
              </span>
            </div>
          </div>
        </div>

        {/* Chemicals Overview */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-3">Farlige Stoffer (A20)</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Relevante sjekker</span>
              <span className="font-medium">{chemStats.relevant}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Dokumentert</span>
              <span className={`font-medium ${chemStats.documented < chemStats.relevant ? 'text-amber-600' : 'text-green-600'}`}>
                {chemStats.documented}
              </span>
            </div>
          </div>
        </div>

        {/* Emissions Overview */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-3">Emisjonskrav</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Registrerte produkter</span>
              <span className="font-medium">{emissionStats.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Fremdrift per kategori</h3>
        <div className="space-y-3">
          {Object.entries(
            mopItems.reduce((acc, item) => {
              if (!acc[item.category]) {
                acc[item.category] = { total: 0, completed: 0 };
              }
              if (item.status !== MopStatus.NOT_RELEVANT) {
                acc[item.category].total++;
                if (item.status === MopStatus.FERDIG) {
                  acc[item.category].completed++;
                }
              }
              return acc;
            }, {} as Record<string, { total: number; completed: number }>)
          ).map(([category, stats]) => {
            const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{category}</span>
                  <span className="text-slate-500">{stats.completed}/{stats.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
