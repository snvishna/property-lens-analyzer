import { create } from 'zustand';
import type { AppState } from '../types';
import { compressState, decompressState } from '../lib/urlState';
import { debounce } from '../lib/utils';

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

const getHashData = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#data=')) {
    return hash.substring(6);
  }
  return null;
}

const dataParam = getHashData();
const initialState = dataParam ? { ...defaultState, ...decompressState(dataParam) } : defaultState;

const syncToUrl = debounce((state: AppState) => {
  const stateToSerialize = { ...state };
  delete (stateToSerialize as any).updateState;
  delete (stateToSerialize as any).resetState;
  
  const compressed = compressState(stateToSerialize);
  window.history.replaceState(null, '', `#data=${compressed}`);
}, 500);

interface AppStore extends AppState {
  updateState: (updates: Partial<AppState>) => void;
  resetState: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  updateState: (updates) => {
    set((state) => {
      const newState = { ...state, ...updates };
      syncToUrl(newState);
      return newState;
    });
  },
  resetState: () => {
    set(defaultState);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}));
