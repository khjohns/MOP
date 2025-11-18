// ==========================================
// ENUMS
// ==========================================

export enum MopStatus {
  RELEVANT = "Relevant for oppdraget",
  NOT_RELEVANT = "Ikke relevant for oppdraget",
  NOT_STARTED = "Ikke pabegynt",
  STARTED = "Pabegynt",
  IVARETATT = "Ivaretatt, mangler som bygget dok",
  FERDIG = "Ferdig dokumentert, pkt lukkes"
}

// ==========================================
// MOP INTERFACES
// ==========================================

export interface MopItem {
  id: string;
  category: string;
  requirement: string;
  description: string;
  status: MopStatus;
  documentation: string;
  projectFollowUp: string;
  phase: string;
  updatedAt?: Date;
}

// ==========================================
// EPD INTERFACES
// ==========================================

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

// ==========================================
// CHEMICAL INTERFACES
// ==========================================

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

// ==========================================
// EMISSION INTERFACES
// ==========================================

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
// APP STATE INTERFACE
// ==========================================

export interface AppState {
  mopItems: MopItem[];
  epdEntries: EpdEntry[];
  chemicalEntries: ChemicalCheckEntry[];
  emissionEntries: EmissionEntry[];
  projectName: string;
}

export type TabId = 'dashboard' | 'mop' | 'epd' | 'chem' | 'emissions' | 'report';
