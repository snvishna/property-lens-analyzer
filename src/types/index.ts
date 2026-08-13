export type StrategyType = 'cashflow' | 'valueadd' | 'appreciation';
export type LoanType = 'fixed30' | 'fixed15' | 'arm10' | 'arm7' | 'io'; // io = Interest-Only / Bridge

export interface CapExItem {
  id: string;
  description: string;
  cost: number;
  year: number;
}

export interface AppState {
  // Global Settings
  strategy: StrategyType;
  holdPeriodYears: number;

  // BYOK API Settings
  fredApiKey: string;
  alphaVantageApiKey: string;
  useLiveApis: boolean;

  // Purchase & Rehab
  // Property Profile
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;

  purchasePrice: number;
  arv: number;
  closingCosts: number;
  
  // Target Metrics
  targetMinCashFlow: number;
  targetMinCocRoi: number;
  targetMinForcedEquity: number;
  
  // Rehab
  rehabCosts: number;
  useItemizedRehab: boolean;
  itemizedRehab: { id: string; name: string; cost: number }[];

  // Debt Structuring
  loanType: LoanType;
  downPaymentPct: number;
  interestRate: number; // Fixed or Initial Rate
  adjustedInterestRate: number; // For ARMs
  ioPeriodMonths: number; // For IO/Bridge loans

  // Income
  grossMonthlyRent: number;
  otherMonthlyIncome: number;
  annualRentGrowthPct: number;

  // Expenses
  propertyTaxesMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  
  // Utilities
  useItemizedUtilities: boolean;
  utilitiesMonthly: number;
  waterSewerMonthly: number;
  garbageMonthly: number;
  gasMonthly: number;
  electricMonthly: number;
  
  otherExpensesMonthly: number;
  vacancyPct: number;
  maintenancePct: number;
  managementPct: number;
  annualExpenseGrowthPct: number;
  
  // CapEx
  capExPct: number;
  useItemizedCapEx: boolean;
  itemizedCapEx: CapExItem[];

  // Tax & Depreciation
  marginalTaxRate: number;
  capitalGainsTaxRate: number;
  depreciationRecaptureRate: number;
  landValuePct: number;
  
  // Refinancing Event (BRRRR)
  enableRefinance: boolean;
  refinanceMonth: number;
  refinanceLtvPct: number;
  refinanceInterestRate: number;
  refinanceLoanType: LoanType;
  refinanceClosingCosts: number;

  // Sales Assumptions
  saleCostPct: number;
  annualAppreciationPct: number;

  // Opportunity Cost
  sp500ExpectedReturnPct: number;
}

export interface AnnualCashFlow {
  year: number;
  grossPotentialRent: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  interestPaid: number;
  principalPaid: number;
  capEx: number;
  preTaxCashFlow: number;
  depreciation: number;
  taxableIncome: number;
  taxImpact: number; // Tax saved (negative) or tax paid (positive)
  afterTaxCashFlow: number;
  endOfYearPropertyVal: number;
  endOfYearLoanBal: number;
  endOfYearEquity: number;
  cashOnCashReturn: number;
  returnOnEquity: number;
  dscr: number;
  debtYield: number;
  
  // Sale Event Details (if sold this year)
  saleProceedsPreTax?: number;
  depreciationRecaptureTax?: number;
  capitalGainsTax?: number;
  saleProceedsAfterTax?: number;
}

export interface ProjectionResult {
  monthlyData: any[]; // Kept for detailed table export if needed
  annualData: AnnualCashFlow[];
  
  // Headline Metrics
  initialCashNeeded: number;
  totalCashInvested: number; // Initial + negative cash flows
  irrPreTax: number;
  irrAfterTax: number;
  mirrAfterTax: number;
  equityMultiple: number;
  totalProfitAfterTax: number;
  unleveredYieldAvg: number;
  leveredYieldAvg: number; // Cash on Cash
}
