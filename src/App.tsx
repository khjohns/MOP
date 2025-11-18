import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Leaf,
  FlaskConical,
  FileText,
  Save,
  FileDown,
  Wind
} from 'lucide-react';
import { AppProvider, useApp } from '@/context/AppContext';
import {
  Dashboard,
  MopTable,
  EpdCalculator,
  ChemicalsTab,
  EmissionsTab,
  ReportTab
} from '@/components/tabs';
import { TabId } from '@/types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const { projectName } = useApp();

  const tabs = [
    { id: 'dashboard' as TabId, label: 'Oversikt', icon: LayoutDashboard },
    { id: 'mop' as TabId, label: 'MOP Oppfolging', icon: ClipboardList },
    { id: 'epd' as TabId, label: 'Materialer & EPD', icon: Leaf },
    { id: 'chem' as TabId, label: 'Farlige Stoffer', icon: FlaskConical },
    { id: 'emissions' as TabId, label: 'Emisjonskrav', icon: Wind },
    { id: 'report' as TabId, label: 'Sluttrapport', icon: FileText },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save triggered');
    alert('Lagring implementeres med backend-integrasjon');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export triggered');
    alert('Eksport implementeres med backend-integrasjon');
  };

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
              <div className="text-xs text-slate-500 font-medium">Prosjekt: {projectName}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <FileDown className="w-4 h-4" /> Eksport
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm"
            >
              <Save className="w-4 h-4" /> Lagre
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex overflow-x-auto no-scrollbar space-x-1 mb-8 border-b border-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-800 bg-green-50/60 rounded-t-md'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-green-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="animate-in">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'mop' && <MopTable />}
          {activeTab === 'epd' && <EpdCalculator />}
          {activeTab === 'chem' && <ChemicalsTab />}
          {activeTab === 'emissions' && <EmissionsTab />}
          {activeTab === 'report' && <ReportTab />}
        </div>
      </main>

      <footer className="border-t bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Digital MOP v1.0 - Miljooppfolgingsplan for byggprosjekter
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
