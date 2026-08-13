import type { AppState, AnnualCashFlow, ProjectionResult, LoanType } from '../types';

// Core Financial Mathematics

/**
 * Calculates PMT (Payment) for an amortizing loan.
 */
export function calculatePmt(ratePerPeriod: number, numPeriods: number, presentValue: number): number {
  if (ratePerPeriod === 0) return presentValue / numPeriods;
  return (presentValue * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -numPeriods));
}

/**
 * Calculates the Internal Rate of Return (IRR) using the Newton-Raphson method.
 */
export function calculateIRR(cashFlows: number[], guess: number = 0.1): number {
  if (cashFlows.every(cf => cf === 0)) return 0;
  
  const maxTries = 1000;
  const tolerance = 1e-7;
  let rate = guess;

  for (let i = 0; i < maxTries; i++) {
    let npv = 0;
    let npvDerivative = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      if (t > 0) {
        npvDerivative -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
      }
    }

    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    if (npvDerivative === 0) {
      return 0; // Prevent division by zero
    }

    rate = rate - npv / npvDerivative;
  }
  return 0; // Did not converge
}

/**
 * Calculates the Modified Internal Rate of Return (MIRR).
 */
export function calculateMIRR(cashFlows: number[], financeRate: number, reinvestRate: number): number {
  let positiveCashFlowsFv = 0;
  let negativeCashFlowsPv = 0;
  const n = cashFlows.length - 1;

  for (let t = 0; t < cashFlows.length; t++) {
    if (cashFlows[t] > 0) {
      positiveCashFlowsFv += cashFlows[t] * Math.pow(1 + reinvestRate, n - t);
    } else if (cashFlows[t] < 0) {
      negativeCashFlowsPv += cashFlows[t] / Math.pow(1 + financeRate, t);
    }
  }

  if (negativeCashFlowsPv === 0) return 0;
  
  const mirr = Math.pow(positiveCashFlowsFv / Math.abs(negativeCashFlowsPv), 1 / n) - 1;
  return isNaN(mirr) ? 0 : mirr;
}

export function calculateSp500EquivalentReturn(holdPeriod: number, initialInvestment: number, capitalGainsTaxRate: number, expectedReturn: number) {
  if (initialInvestment <= 0 || holdPeriod <= 0) return { finalValue: 0, totalProfit: 0, annualizedReturn: 0 };
  
  const annualReturnDecimal = expectedReturn / 100;
  const finalValue = initialInvestment * Math.pow(1 + annualReturnDecimal, holdPeriod);

  const preTaxProfit = finalValue - initialInvestment;
  const taxOnProfit = preTaxProfit > 0 ? preTaxProfit * (capitalGainsTaxRate / 100) : 0;
  const afterTaxProfit = preTaxProfit - taxOnProfit;

  const afterTaxFinalValue = initialInvestment + afterTaxProfit;
  const afterTaxTotalRoi = afterTaxProfit / initialInvestment;
  const annualizedReturn = afterTaxTotalRoi > -1 ? Math.pow(1 + afterTaxTotalRoi, 1 / holdPeriod) - 1 : -1;
  
  return { finalValue: afterTaxFinalValue, totalProfit: afterTaxProfit, annualizedReturn };
}

export function calculateMoIC(cashFlows: number[]): number {
  const totalPositiveReturns = cashFlows.reduce((acc, val) => val > 0 ? acc + val : acc, 0);
  const totalNegativeInvestments = cashFlows.reduce((acc, val) => val < 0 ? acc + Math.abs(val) : acc, 0);
  return totalNegativeInvestments > 0 ? totalPositiveReturns / totalNegativeInvestments : 0;
}

/**
 * Calculates loan terms for a specific month
 */
function getMonthlyLoanPayment(
  month: number, 
  loanBal: number, 
  loanType: LoanType, 
  initialRate: number, 
  adjustedRate: number, 
  ioPeriodMonths: number,
  totalLoanMonths: number
): { payment: number, interest: number, principal: number } {
  
  if (loanBal <= 0) return { payment: 0, interest: 0, principal: 0 };

  let currentRate = initialRate;
  
  // Handle ARMs
  if (loanType === 'arm7' && month > 7 * 12) currentRate = adjustedRate;
  if (loanType === 'arm10' && month > 10 * 12) currentRate = adjustedRate;

  const monthlyRate = currentRate / 12;
  const interest = loanBal * monthlyRate;
  
  // Handle IO / Bridge
  if (loanType === 'io') {
    if (month <= ioPeriodMonths) {
      return { payment: interest, interest, principal: 0 };
    } else {
      // Switches to amortizing after IO period over the remaining term
      const remainingMonths = totalLoanMonths - ioPeriodMonths;
      const pmt = calculatePmt(monthlyRate, remainingMonths, loanBal);
      return { payment: pmt, interest, principal: pmt - interest };
    }
  }

  // Standard Amortization (Recalculated in case of ARM rate change)
  const remainingMonths = totalLoanMonths - month + 1; 
  // We approximate the new payment for ARMs by recalculating PMT over remaining term
  const pmt = calculatePmt(monthlyRate, remainingMonths, loanBal);
  return { payment: pmt, interest, principal: pmt - interest };
}

/**
 * Main Projection Engine
 */
export function calculateProjections(state: AppState): ProjectionResult {
  const months = state.holdPeriodYears * 12;
  
  const rehabCosts = state.useItemizedRehab 
    ? state.itemizedRehab.reduce((acc, item) => acc + item.cost, 0)
    : state.rehabCosts;

  // Initial Capital
  const loanAmount = state.purchasePrice * (1 - state.downPaymentPct);
  const initialCashNeeded = (state.purchasePrice * state.downPaymentPct) + rehabCosts + state.closingCosts;
  
  let currentLoanBal = loanAmount;
  let currentPropertyValue = state.arv || state.purchasePrice; // If ARV is 0, use PP
  let currentLoanType = state.loanType;
  let currentInterestRate = state.interestRate;
  let currentTotalLoanMonths = (state.loanType === 'fixed15') ? 15 * 12 : 30 * 12;
  
  // Determine useful life for depreciation (Residential = 27.5 years)
  const usefulLifeYears = 27.5;
  const depreciableBasis = state.purchasePrice * (1 - state.landValuePct) + rehabCosts;
  const annualDepreciation = depreciableBasis / usefulLifeYears;

  const annualData: AnnualCashFlow[] = [];
  const monthlyData: any[] = [];
  const amortizationSchedule: any[] = [];
  
  // Trackers
  let cumulativeDepreciation = 0;
  let totalCashInvested = initialCashNeeded;
  let cumulativeAfterTaxCF = 0;
  const preTaxCashFlows: number[] = [-initialCashNeeded];
  const afterTaxCashFlows: number[] = [-initialCashNeeded];
  
  // Annual Accumulators
  let yearGPR = 0;
  let yearVacancy = 0;
  let yearOpEx = 0;
  let yearInterest = 0;
  let yearPrincipal = 0;
  let yearCapEx = 0;
  
  for (let m = 1; m <= months; m++) {
    const yearIndex = Math.ceil(m / 12);
    
    // Growth adjustments
    const expGrowthFactor = Math.pow(1 + state.annualExpenseGrowthPct, yearIndex - 1);
    
    // Income
    const baseGPR = state.grossMonthlyRent * Math.pow(1 + state.annualRentGrowthPct, yearIndex - 1);
    const baseOther = state.otherMonthlyIncome * Math.pow(1 + state.annualRentGrowthPct, yearIndex - 1);
    const monthlyGPR = baseGPR + baseOther;
    const monthlyVacancy = monthlyGPR * state.vacancyPct;
    
    // Expenses
    const utilitiesCost = state.useItemizedUtilities
      ? (state.waterSewerMonthly + state.garbageMonthly + state.gasMonthly + state.electricMonthly)
      : state.utilitiesMonthly;
      
    const propTaxes = state.propertyTaxesMonthly * expGrowthFactor;
    const insurance = state.insuranceMonthly * expGrowthFactor;
    const hoa = state.hoaMonthly * expGrowthFactor;
    const otherFixed = (utilitiesCost + state.otherExpensesMonthly) * expGrowthFactor;
      
    const fixedMonthlyOpEx = propTaxes + insurance + hoa + otherFixed;
    const repairs = monthlyGPR * state.maintenancePct;
    const management = monthlyGPR * state.managementPct;
    const varMonthlyOpEx = repairs + management;
    const monthlyOpEx = fixedMonthlyOpEx + varMonthlyOpEx;
    
    // monthlyNOI calculation omitted since it's not strictly needed monthly, only annually
    
    // CapEx
    let monthlyCapEx = 0;
    if (!state.useItemizedCapEx) {
      monthlyCapEx = monthlyGPR * state.capExPct;
    } else {
      // Check if this month is the last month of a year that has an itemized CapEx
      if (m % 12 === 0) {
        const item = state.itemizedCapEx.find(c => c.year === yearIndex);
        if (item) monthlyCapEx = item.cost;
      }
    }
    
    // Refinance Event Check
    let isRefiMonth = false;
    let refiProceeds = 0;
    if (state.enableRefinance && state.refinanceMonth === m) {
      isRefiMonth = true;
      const newLoanAmount = currentPropertyValue * state.refinanceLtvPct;
      refiProceeds = newLoanAmount - currentLoanBal - state.refinanceClosingCosts;
      
      // Update Loan Terms
      currentLoanBal = newLoanAmount;
      currentLoanType = state.refinanceLoanType;
      currentInterestRate = state.refinanceInterestRate;
      currentTotalLoanMonths = (currentLoanType === 'fixed15') ? 15 * 12 : 30 * 12;
      
      // Cash flows (tax-free capital event)
      if (refiProceeds > 0) {
        preTaxCashFlows[0] -= refiProceeds; // Effectively lowers initial cash needed for IRR purposes
        afterTaxCashFlows[0] -= refiProceeds;
      } else if (refiProceeds < 0) {
        totalCashInvested += Math.abs(refiProceeds);
      }
    }
    
    const { interest, principal } = getMonthlyLoanPayment(
      isRefiMonth ? 1 : m, // Reset month to 1 if we just refi'd
      currentLoanBal, 
      currentLoanType, 
      currentInterestRate, 
      state.adjustedInterestRate, 
      state.ioPeriodMonths, 
      currentTotalLoanMonths
    );
    
    currentLoanBal -= principal;
    if (currentLoanBal < 0) currentLoanBal = 0;
    
    amortizationSchedule.push({
      month: m,
      principal,
      interest,
      endingBalance: currentLoanBal
    });
    
    // Property Value appreciation (monthly compounded for the tracking)
    // Wait, original calculates property value annually. We'll interpolate monthly or just step it.
    const monthPropertyValue = currentPropertyValue * Math.pow((1 + state.annualAppreciationPct), (m % 12 === 0 ? 1 : (m % 12) / 12));
    
    const monthNOI = monthlyGPR - monthlyVacancy - monthlyOpEx;
    const monthPreTaxCF = monthNOI - (interest + principal) - monthlyCapEx;
    
    // Monthly Tax estimation
    const monthDepreciation = annualDepreciation / 12;
    const monthTaxableIncome = monthNOI - interest - monthDepreciation;
    const monthTaxImpact = monthTaxableIncome * state.marginalTaxRate;
    const monthAfterTaxCF = monthPreTaxCF - monthTaxImpact;
    
    cumulativeAfterTaxCF += monthAfterTaxCF;
    
    const monthEquity = monthPropertyValue - currentLoanBal;
    
    monthlyData.push({
      month: m,
      grossScheduledRent: baseGPR,
      otherIncome: baseOther,
      vacancyLoss: monthlyVacancy,
      effectiveGrossIncome: monthlyGPR - monthlyVacancy,
      propTaxes,
      insurance,
      repairs,
      management,
      hoa,
      otherFixedExpenses: otherFixed,
      totalOpEx: monthlyOpEx,
      noi: monthNOI,
      debtService: interest + principal,
      capEx: monthlyCapEx,
      cashFlowBeforeTax: monthPreTaxCF,
      taxImpact: monthTaxImpact,
      cashFlowAfterTax: monthAfterTaxCF,
      propertyValue: monthPropertyValue,
      endingLoanBalance: currentLoanBal,
      totalEquity: monthEquity,
      cumulativeAfterTaxCF: cumulativeAfterTaxCF,
      dscr: (interest + principal) > 0 ? (monthNOI / (interest + principal)) : 0,
      roe: monthEquity > 0 ? (monthAfterTaxCF * 12 / monthEquity) : 0,
    });
    
    // Accumulate for the year
    yearGPR += monthlyGPR;
    yearVacancy += monthlyVacancy;
    yearOpEx += monthlyOpEx;
    yearInterest += interest;
    yearPrincipal += principal;
    yearCapEx += monthlyCapEx;
    
    // End of Year calculations
    if (m % 12 === 0) {
      // Property Value appreciation
      currentPropertyValue *= (1 + state.annualAppreciationPct);
      
      const yearNOI = yearGPR - yearVacancy - yearOpEx;
      const yearDebtService = yearInterest + yearPrincipal;
      const preTaxCF = yearNOI - yearDebtService - yearCapEx;
      
      // Tax Calculation
      const yearDepreciation = Math.min(annualDepreciation, depreciableBasis - cumulativeDepreciation);
      cumulativeDepreciation += yearDepreciation;
      
      const taxableIncome = yearNOI - yearInterest - yearDepreciation;
      const taxImpact = taxableIncome * state.marginalTaxRate; // positive means tax paid, negative means tax saved
      const afterTaxCF = preTaxCF - taxImpact;
      
      // Handle negative cash flows
      if (afterTaxCF < 0) {
        totalCashInvested += Math.abs(afterTaxCF);
      }
      
      preTaxCashFlows.push(preTaxCF);
      afterTaxCashFlows.push(afterTaxCF);
      
      const currentEquity = currentPropertyValue - currentLoanBal;
      const coc = initialCashNeeded > 0 ? (preTaxCF / initialCashNeeded) : 0;
      const roe = currentEquity > 0 ? (afterTaxCF / currentEquity) : 0;
      
      // Sale Logic if this is the final year
      let saleProceedsPreTax = 0;
      let saleProceedsAfterTax = 0;
      if (m === months) {
        const salePrice = currentPropertyValue;
        const closingCostsAtSale = salePrice * state.saleCostPct;
        saleProceedsPreTax = salePrice - closingCostsAtSale - currentLoanBal;
        
        // Taxes at sale
        const adjustedBasis = state.purchasePrice + rehabCosts - cumulativeDepreciation;
        const totalGain = salePrice - closingCostsAtSale - adjustedBasis;
        
        // Gain is split into depreciation recapture and capital gains
        const recaptureGain = Math.min(cumulativeDepreciation, totalGain > 0 ? totalGain : 0);
        const capitalGain = Math.max(0, totalGain - recaptureGain);
        
        const recaptureTax = recaptureGain * state.depreciationRecaptureRate;
        const cgTax = capitalGain * state.capitalGainsTaxRate;
        
        saleProceedsAfterTax = saleProceedsPreTax - recaptureTax - cgTax;
        
        // Add sale proceeds to final year cash flows
        preTaxCashFlows[preTaxCashFlows.length - 1] += saleProceedsPreTax;
        afterTaxCashFlows[afterTaxCashFlows.length - 1] += saleProceedsAfterTax;
      }
      
      annualData.push({
        year: yearIndex,
        grossPotentialRent: yearGPR,
        vacancyLoss: yearVacancy,
        effectiveGrossIncome: yearGPR - yearVacancy,
        operatingExpenses: yearOpEx,
        netOperatingIncome: yearNOI,
        debtService: yearDebtService,
        interestPaid: yearInterest,
        principalPaid: yearPrincipal,
        capEx: yearCapEx,
        preTaxCashFlow: preTaxCF,
        depreciation: yearDepreciation,
        taxableIncome,
        taxImpact,
        afterTaxCashFlow: afterTaxCF,
        endOfYearPropertyVal: currentPropertyValue,
        endOfYearLoanBal: currentLoanBal,
        endOfYearEquity: currentEquity,
        cashOnCashReturn: coc,
        returnOnEquity: roe,
        dscr: yearDebtService > 0 ? (yearNOI / yearDebtService) : 0,
        debtYield: currentLoanBal > 0 ? (yearNOI / currentLoanBal) : 0,
      });
      
      // Reset annual accumulators
      yearGPR = 0;
      yearVacancy = 0;
      yearOpEx = 0;
      yearInterest = 0;
      yearPrincipal = 0;
      yearCapEx = 0;
    }
  }
  
  const irrPreTax = calculateIRR(preTaxCashFlows);
  const irrAfterTax = calculateIRR(afterTaxCashFlows);
  
  // MIRR assumptions: Finance rate = interest rate, Reinvest rate = S&P500
  const mirrAfterTax = calculateMIRR(afterTaxCashFlows, state.interestRate, state.sp500ExpectedReturnPct);
  
  // Equity Multiple = (Total Cash Returns) / Total Cash Invested
  const totalPositiveReturns = afterTaxCashFlows.reduce((acc, val) => val > 0 ? acc + val : acc, 0);
  const totalNegativeInvestments = afterTaxCashFlows.reduce((acc, val) => val < 0 ? acc + Math.abs(val) : acc, 0);
  const equityMultiple = totalNegativeInvestments > 0 ? totalPositiveReturns / totalNegativeInvestments : 0;
  
  const totalProfitAfterTax = afterTaxCashFlows.reduce((a,b) => a + b, 0);
  
  // Unlevered Yield = NOI / Purchase Price
  const unleveredYieldAvg = annualData.reduce((acc, yr) => acc + (yr.netOperatingIncome / state.purchasePrice), 0) / state.holdPeriodYears;
  const leveredYieldAvg = annualData.reduce((acc, yr) => acc + yr.cashOnCashReturn, 0) / state.holdPeriodYears;

  return {
    monthlyData,
    annualData,
    amortizationSchedule,
    initialCashNeeded,
    totalCashInvested,
    irrPreTax,
    irrAfterTax,
    mirrAfterTax,
    equityMultiple,
    totalProfitAfterTax,
    unleveredYieldAvg,
    leveredYieldAvg
  };
}
