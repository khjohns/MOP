import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  MopItem,
  EpdEntry,
  ChemicalCheckEntry,
  EmissionEntry,
  MopStatus
} from '@/types';
import {
  INITIAL_MOP_DATA,
  INITIAL_EPD_ENTRIES,
  createInitialChemicalEntries,
  INITIAL_EMISSION_ENTRIES,
  EXAMPLE_MOP_DATA,
  EXAMPLE_EPD_ENTRIES,
  EXAMPLE_CHEMICAL_ENTRIES,
  EXAMPLE_EMISSION_ENTRIES
} from '@/data';

interface AppContextType {
  // State
  projectName: string;
  mopItems: MopItem[];
  epdEntries: EpdEntry[];
  chemicalEntries: ChemicalCheckEntry[];
  emissionEntries: EmissionEntry[];

  // Setters
  setProjectName: (name: string) => void;
  setMopItems: React.Dispatch<React.SetStateAction<MopItem[]>>;
  setEpdEntries: React.Dispatch<React.SetStateAction<EpdEntry[]>>;
  setChemicalEntries: React.Dispatch<React.SetStateAction<ChemicalCheckEntry[]>>;
  setEmissionEntries: React.Dispatch<React.SetStateAction<EmissionEntry[]>>;

  // Helper functions
  updateMopItem: (id: string, field: keyof MopItem, value: unknown) => void;
  updateEpdEntry: (id: string, field: keyof EpdEntry, value: unknown) => void;
  updateChemicalEntry: (id: string, field: keyof ChemicalCheckEntry, value: unknown) => void;
  updateEmissionEntry: (id: string, field: keyof EmissionEntry, value: unknown) => void;
  addEpdEntry: (entry: EpdEntry) => void;
  addEmissionEntry: (entry: EmissionEntry) => void;

  // Statistics
  getMopStats: () => { total: number; completed: number; notRelevant: number };

  // Data management
  fillWithExample: () => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectName, setProjectName] = useState('Nytt Kontorbygg Oslo');
  const [mopItems, setMopItems] = useState<MopItem[]>(INITIAL_MOP_DATA);
  const [epdEntries, setEpdEntries] = useState<EpdEntry[]>(INITIAL_EPD_ENTRIES);
  const [chemicalEntries, setChemicalEntries] = useState<ChemicalCheckEntry[]>(createInitialChemicalEntries());
  const [emissionEntries, setEmissionEntries] = useState<EmissionEntry[]>(INITIAL_EMISSION_ENTRIES);

  const updateMopItem = (id: string, field: keyof MopItem, value: unknown) => {
    setMopItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value, updatedAt: new Date() } : item
    ));
  };

  const updateEpdEntry = (id: string, field: keyof EpdEntry, value: unknown) => {
    setEpdEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const updateChemicalEntry = (id: string, field: keyof ChemicalCheckEntry, value: unknown) => {
    setChemicalEntries(prev => prev.map(entry =>
      entry.checkItemId === id ? { ...entry, [field]: value } : entry
    ));
  };

  const updateEmissionEntry = (id: string, field: keyof EmissionEntry, value: unknown) => {
    setEmissionEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addEpdEntry = (entry: EpdEntry) => {
    setEpdEntries(prev => [...prev, entry]);
  };

  const addEmissionEntry = (entry: EmissionEntry) => {
    setEmissionEntries(prev => [...prev, entry]);
  };

  const getMopStats = () => {
    const total = mopItems.length;
    const completed = mopItems.filter(item => item.status === MopStatus.FERDIG).length;
    const notRelevant = mopItems.filter(item => item.status === MopStatus.NOT_RELEVANT).length;
    return { total, completed, notRelevant };
  };

  const fillWithExample = () => {
    setProjectName('Nytt Kontorbygg Oslo');
    setMopItems(EXAMPLE_MOP_DATA);
    setEpdEntries(EXAMPLE_EPD_ENTRIES);
    setChemicalEntries(EXAMPLE_CHEMICAL_ENTRIES);
    setEmissionEntries(EXAMPLE_EMISSION_ENTRIES);
  };

  const resetData = () => {
    setProjectName('Nytt Prosjekt');
    setMopItems(INITIAL_MOP_DATA);
    setEpdEntries(INITIAL_EPD_ENTRIES);
    setChemicalEntries(createInitialChemicalEntries());
    setEmissionEntries(INITIAL_EMISSION_ENTRIES);
  };

  return (
    <AppContext.Provider value={{
      projectName,
      mopItems,
      epdEntries,
      chemicalEntries,
      emissionEntries,
      setProjectName,
      setMopItems,
      setEpdEntries,
      setChemicalEntries,
      setEmissionEntries,
      updateMopItem,
      updateEpdEntry,
      updateChemicalEntry,
      updateEmissionEntry,
      addEpdEntry,
      addEmissionEntry,
      getMopStats,
      fillWithExample,
      resetData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
