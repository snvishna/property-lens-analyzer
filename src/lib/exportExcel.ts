import * as XLSX from 'xlsx';
import type { SavedScenario } from './scenarioManager';
import { calculateProjections } from './financeEngine';

const sanitize = (val: any) => {
  if (typeof val === 'number') {
    if (isNaN(val) || !isFinite(val)) return 0;
  }
  if (val === undefined || val === null) return '';
  return val;
};

export function exportScenariosToExcel(scenarios: SavedScenario[]) {
  if (!scenarios || scenarios.length === 0) return;
  
  const wb = XLSX.utils.book_new();

  scenarios.forEach((scenario, index) => {
    // 1. Calculate projections using the engine
    const data = calculateProjections(scenario.data as any);

    // 2. Build Worksheet Data (AOA)
    const wsData: any[][] = [];

    // Title Row
    wsData.push([`Scenario: ${scenario.name}`].map(sanitize));
    wsData.push([`Date Saved: ${new Date(scenario.timestamp).toLocaleDateString()}`].map(sanitize));
    wsData.push([]); // blank

    // Inputs Summary
    wsData.push(['KEY ASSUMPTIONS', ''].map(sanitize));
    wsData.push(['Purchase Price', scenario.data.purchasePrice].map(sanitize));
    wsData.push(['Rehab Costs', scenario.data.rehabCosts || 0].map(sanitize));
    wsData.push(['Closing Costs', scenario.data.closingCosts].map(sanitize));
    wsData.push(['Gross Monthly Rent', scenario.data.grossMonthlyRent].map(sanitize));
    wsData.push(['Interest Rate', scenario.data.interestRate].map(sanitize));
    wsData.push([]); // blank

    // Executive Summary
    wsData.push(['EXECUTIVE SUMMARY', ''].map(sanitize));
    wsData.push(['After-Tax IRR', data.irrAfterTax].map(sanitize));
    wsData.push(['Equity Multiple', data.equityMultiple].map(sanitize));
    wsData.push(['Total Cash Invested', data.totalCashInvested].map(sanitize));
    wsData.push(['Total After-Tax Profit', data.totalProfitAfterTax].map(sanitize));
    wsData.push([]); // blank

    // 30-Year Cash Flow Statement Header
    wsData.push(['30-YEAR PRO-FORMA CASH FLOW STATEMENT'].map(sanitize));
    wsData.push([
      'Year', 
      'Effective Gross Income', 
      'Operating Expenses', 
      'Net Operating Income', 
      'Debt Service', 
      'Pre-Tax Cash Flow', 
      'Tax Impact', 
      'After-Tax Cash Flow', 
      'Cash-on-Cash Return',
      'End of Year Equity'
    ].map(sanitize));

    // Cash Flow Rows
    data.annualData.forEach(row => {
      wsData.push([
        row.year,
        row.effectiveGrossIncome,
        row.operatingExpenses,
        row.netOperatingIncome,
        row.debtService,
        row.preTaxCashFlow,
        row.taxImpact,
        row.afterTaxCashFlow,
        row.cashOnCashReturn,
        row.endOfYearEquity
      ].map(sanitize));
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Basic Column Widths
    ws['!cols'] = [
      { wch: 20 }, // Year / Title
      { wch: 25 }, // EGI
      { wch: 20 }, // OpEx
      { wch: 20 }, // NOI
      { wch: 20 }, // Debt Service
      { wch: 20 }, // Pre-Tax CF
      { wch: 20 }, // Tax Impact
      { wch: 20 }, // After-Tax CF
      { wch: 20 }, // CoC
      { wch: 20 }  // Equity
    ];

    // Excel tab names cannot exceed 31 chars and must be unique
    let tabName = scenario.name.replace(/[*?:\\/[\]]/g, '').trim().substring(0, 31);
    if (tabName.startsWith("'") || tabName.endsWith("'")) {
      tabName = tabName.replace(/'/g, '');
    }
    if (!tabName) tabName = `Scenario ${index + 1}`;
    
    // Fallback if duplicate names
    if (wb.SheetNames.includes(tabName)) {
      let counter = 1;
      let newTabName = `${tabName.substring(0, 27)} (${counter})`;
      while(wb.SheetNames.includes(newTabName)) {
        counter++;
        newTabName = `${tabName.substring(0, 27)} (${counter})`;
      }
      tabName = newTabName;
    }
    
    // Add sheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, tabName);
  });

  // 3. Trigger Download
  XLSX.writeFile(wb, 'PropertyLens_Scenarios.xlsx');
}
