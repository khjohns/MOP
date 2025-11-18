import { useMemo } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  Building2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MopStatus } from '@/types';

export function ReportTab() {
  const { projectName, mopItems, epdEntries, chemicalEntries, emissionEntries } = useApp();

  const reportData = useMemo(() => {
    const mopStats = {
      total: mopItems.length,
      relevant: mopItems.filter(i => i.status !== MopStatus.NOT_RELEVANT).length,
      completed: mopItems.filter(i => i.status === MopStatus.FERDIG).length,
      inProgress: mopItems.filter(i => i.status === MopStatus.STARTED || i.status === MopStatus.IVARETATT).length,
      notStarted: mopItems.filter(i => i.status === MopStatus.NOT_STARTED).length
    };

    const epdStats = {
      total: epdEntries.length,
      totalEmission: epdEntries.reduce((sum, e) => sum + (e.actualValue * e.quantity), 0),
      withWarnings: epdEntries.filter(e => {
        const hasNumericLimit = e.limitValue !== null && e.limitValue > 0;
        const isOverLimit = hasNumericLimit && (e.actualValue > (e.limitValue as number));
        return isOverLimit || !e.isBestChoice;
      }).length
    };

    const chemStats = {
      total: chemicalEntries.length,
      relevant: chemicalEntries.filter(e => e.isRelevant).length,
      documented: chemicalEntries.filter(e => e.isRelevant && e.documentation).length
    };

    const emissionStats = {
      total: emissionEntries.length
    };

    const isReadyForReport = mopStats.notStarted === 0 && epdStats.withWarnings === 0;

    return { mopStats, epdStats, chemStats, emissionStats, isReadyForReport };
  }, [mopItems, epdEntries, chemicalEntries, emissionEntries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-slate-600" />
              Sluttrapport MOP
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Generer og eksporter miljøoppfølgingsplan for prosjektet
            </p>
          </div>
          <button
            disabled={!reportData.isReadyForReport}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm ${
              reportData.isReadyForReport
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            Generer PDF
          </button>
        </div>
      </div>

      {/* Report Status */}
      <div className={`p-4 rounded-lg border ${reportData.isReadyForReport ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-center gap-2">
          {reportData.isReadyForReport ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Rapporten er klar for generering</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-amber-800">Det er oppgaver som må fullføres før rapporten</span>
            </>
          )}
        </div>
        {!reportData.isReadyForReport && (
          <ul className="mt-2 text-sm text-amber-700 list-disc list-inside">
            {reportData.mopStats.notStarted > 0 && (
              <li>{reportData.mopStats.notStarted} MOP-krav er ikke påbegynt</li>
            )}
            {reportData.epdStats.withWarnings > 0 && (
              <li>{reportData.epdStats.withWarnings} EPD-oppføringer mangler begrunnelse</li>
            )}
          </ul>
        )}
      </div>

      {/* Project Info */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Prosjektinformasjon</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Prosjektnavn</div>
              <div className="font-medium">{projectName}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Rapportdato</div>
              <div className="font-medium">{new Date().toLocaleDateString('nb-NO')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Sammendrag</h3>

        <div className="space-y-4">
          {/* MOP Summary */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">MOP Oppfølging</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-slate-500">Totalt</div>
                <div className="font-bold">{reportData.mopStats.total}</div>
              </div>
              <div>
                <div className="text-slate-500">Fullført</div>
                <div className="font-bold text-green-600">{reportData.mopStats.completed}</div>
              </div>
              <div>
                <div className="text-slate-500">Under arbeid</div>
                <div className="font-bold text-amber-600">{reportData.mopStats.inProgress}</div>
              </div>
              <div>
                <div className="text-slate-500">Ikke påbegynt</div>
                <div className="font-bold text-red-600">{reportData.mopStats.notStarted}</div>
              </div>
            </div>
          </div>

          {/* EPD Summary */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Klimagassregnskap</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-slate-500">Produkter</div>
                <div className="font-bold">{reportData.epdStats.total}</div>
              </div>
              <div>
                <div className="text-slate-500">Total CO2</div>
                <div className="font-bold">{reportData.epdStats.totalEmission.toLocaleString()} kg</div>
              </div>
              <div>
                <div className="text-slate-500">Advarsler</div>
                <div className={`font-bold ${reportData.epdStats.withWarnings > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                  {reportData.epdStats.withWarnings}
                </div>
              </div>
            </div>
          </div>

          {/* Chemicals Summary */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Farlige Stoffer (A20)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-slate-500">Sjekket</div>
                <div className="font-bold">{reportData.chemStats.total}</div>
              </div>
              <div>
                <div className="text-slate-500">Relevante</div>
                <div className="font-bold">{reportData.chemStats.relevant}</div>
              </div>
              <div>
                <div className="text-slate-500">Dokumentert</div>
                <div className="font-bold">{reportData.chemStats.documented}</div>
              </div>
            </div>
          </div>

          {/* Emissions Summary */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Emisjonskrav</h4>
            <div className="text-sm">
              <div className="text-slate-500">Registrerte produkter</div>
              <div className="font-bold">{reportData.emissionStats.total}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Signaturer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-2 border-dashed rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Entreprenør</span>
            </div>
            <input
              type="text"
              placeholder="Navn..."
              className="w-full border rounded p-2 text-sm mb-2"
            />
            <input
              type="date"
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div className="p-4 border-2 border-dashed rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Byggherre</span>
            </div>
            <input
              type="text"
              placeholder="Navn..."
              className="w-full border rounded p-2 text-sm mb-2"
            />
            <input
              type="date"
              className="w-full border rounded p-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
