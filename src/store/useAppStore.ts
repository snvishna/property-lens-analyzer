import { create } from 'zustand';
import type { AppState } from '../types';
import { compressState, decompressState } from '../lib/urlState';

const defaultState: AppState = {
  strategy: 'cashflow',
  holdPeriodYears: 10,
  
  fredApiKey: '',
  alphaVantageApiKey: '',
  useLiveApis: false,
  
  purchasePrice: 500000,
  rehabCosts: 50000,
  closingCosts: 15000,
  arv: 650000,
  
  loanType: 'fixed30',
  downPaymentPct: 0.20,
  interestRate: 0.065,
  adjustedInterestRate: 0.08,
  ioPeriodMonths: 24,
  
  grossMonthlyRent: 4000,
  otherMonthlyIncome: 0,
  annualRentGrowthPct: 0.03,
  
  propertyTaxesMonthly: 500,
  insuranceMonthly: 150,
  hoaMonthly: 0,
  otherExpensesMonthly: 100,
  vacancyPct: 0.05,
  maintenancePct: 0.05,
  managementPct: 0.08,
  annualExpenseGrowthPct: 0.02,
  
  capExPct: 0.05,
  useItemizedCapEx: false,
  itemizedCapEx: [],
  
  marginalTaxRate: 0.24,
  capitalGainsTaxRate: 0.15,
  depreciationRecaptureRate: 0.25,
  landValuePct: 0.20,
  
  enableRefinance: false,
  refinanceMonth: 24,
  refinanceLtvPct: 0.75,
  refinanceInterestRate: 0.065,
  refinanceLoanType: 'fixed30',
  refinanceClosingCosts: 5000,
  
  saleCostPct: 0.06,
  annualAppreciationPct: 0.03,
  
  sp500ExpectedReturnPct: 0.08,
};

const urlParams = new URLSearchParams(window.location.search);
const dataParam = urlParams.get('data');
const initialState = dataParam ? { ...defaultState, ...decompressState(dataParam) } : defaultState;

interface AppStore extends AppState {
  updateState: (updates: Partial<AppState>) => void;
  resetState: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  updateState: (updates) => {
    set((state) => {
      const newState = { ...state, ...updates };
      // Only serialize the actual state properties, not the functions
      const stateToSerialize = { ...newState };
      delete (stateToSerialize as any).updateState;
      delete (stateToSerialize as any).resetState;
      
      const compressed = compressState(stateToSerialize);
      const url = new URL(window.location.href);
      url.searchParams.set('data', compressed);
      window.history.replaceState({}, '', url.toString());
      return newState;
    });
  },
  resetState: () => {
    set(defaultState);
    const url = new URL(window.location.href);
    url.searchParams.delete('data');
    window.history.replaceState({}, '', url.toString());
  }
}));
