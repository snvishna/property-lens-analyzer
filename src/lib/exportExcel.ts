import * as XLSX from 'xlsx';
import type { SavedScenario } from './scenarioManager';
import { calculateProjections, calculateSp500EquivalentReturn, calculateMoIC, calculateIRR } from './financeEngine';
import type { AppState } from '../types';

const XlsxStyler = {
  styles: {
      header1: { font: { bold: true, sz: 16 }, fill: { fgColor: { rgb: "DDEBF7" } }, alignment: { vertical: "center", horizontal: "center" } },
      header2: { font: { bold: true, sz: 13 }, fill: { fgColor: { rgb: "F2F2F2" } } },
      bold: { font: { bold: true } },
      right: { alignment: { horizontal: "right" } },
      currency: { numFmt: "$#,##0", alignment: { horizontal: "right" } },
      currencyCents: { numFmt: "$#,##0.00", alignment: { horizontal: "right" } },
      percent: { numFmt: "0.00%", alignment: { horizontal: "right" } },
      number: { numFmt: "#,##0", alignment: { horizontal: "right" } },
      number2dec: { numFmt: "0.00", alignment: { horizontal: "right" } },
      redFont: { font: { color: { rgb: "9C0006" } } },
  },
  merge(...styleKeys: string[]) {
      return styleKeys.reduce((acc, key) => ({ ...acc, ...(this.styles as any)[key] }), {});
  },
  cell(value: any, styleKeys: string[] = []) {
      const s = this.merge(...styleKeys);
      if (typeof value === 'number') {
          if (isNaN(value) || !isFinite(value)) return { t: 'n', v: 0, s };
          return { t: 'n', v: value, s };
      }
      if (value === undefined || value === null) return { t: 's', v: '', s };
      return { t: 's', v: String(value), s };
  }
};

export function exportScenariosToExcel(scenarios: SavedScenario[]) {
  if (!scenarios || scenarios.length === 0) return;
  
  const wb = XLSX.utils.book_new();

  scenarios.forEach((scenario, index) => {
    const state = scenario.data as AppState;
    const results = calculateProjections(state);
    const S = XlsxStyler;
    
    const finalYear = results.annualData.length > 0 ? results.annualData[results.annualData.length - 1] : {} as any;
    
    let data: any[][] = [];
    let merges: any[] = [];
    let row = 0;

    const addRow = (rowData: any[]) => { data.push(rowData); row++; };
    const skipRow = (count = 1) => { for(let i=0; i<count; i++) { data.push([]); row++; }};
    
    // --- SECTION 1: TITLE & EXECUTIVE SUMMARY ---
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: 8 } });
    addRow([S.cell(`Analysis Report: ${scenario.name}`, ['header1'])]);
    skipRow();
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: 8 } });
    addRow([S.cell('Executive Summary: Investment Showdown', ['header2'])]);

    const sp500Results = calculateSp500EquivalentReturn(state.holdPeriodYears, results.initialCashNeeded, state.capitalGainsTaxRate, state.sp500ExpectedReturnPct);
    
    const totalDepreciation = results.annualData.reduce((acc, y) => acc + y.depreciation, 0);
    const saleProceeds = finalYear.endOfYearPropertyVal - (finalYear.endOfYearPropertyVal * state.saleCostPct / 100) - finalYear.endOfYearLoanBal;
    const rehabCosts = state.useItemizedRehab ? state.itemizedRehab.reduce((acc, item) => acc + item.cost, 0) : state.rehabCosts;
    const capitalGain = finalYear.endOfYearPropertyVal - (finalYear.endOfYearPropertyVal * state.saleCostPct / 100) - state.purchasePrice;
    const depreciationRecapture = Math.min(Math.max(0, capitalGain), totalDepreciation);
    const appreciationGain = capitalGain - depreciationRecapture;
    const taxOnSale = (depreciationRecapture * state.depreciationRecaptureRate/100) + (appreciationGain > 0 ? appreciationGain * state.capitalGainsTaxRate/100 : 0);
    
    const finalCashflow = finalYear.afterTaxCashFlow + saleProceeds - taxOnSale;
    const propertyCashFlows = [-results.initialCashNeeded, ...results.annualData.slice(0, -1).map(p => p.afterTaxCashFlow), finalCashflow];
    const propertyIRR = calculateIRR(propertyCashFlows) || 0;
    const sp500CashFlows = [-results.initialCashNeeded, ...Array(state.holdPeriodYears - 1).fill(0), sp500Results.finalValue];
    const sp500IRR = calculateIRR(sp500CashFlows) || 0;

    addRow([S.cell('Metric', ['bold']), S.cell('This Property', ['bold', 'right']), S.cell('S&P 500', ['bold', 'right'])]);
    addRow([S.cell('IRR (Internal Rate of Return)'), S.cell(propertyIRR, ['percent']), S.cell(sp500IRR, ['percent'])]);
    addRow([S.cell('Total After-Tax Profit'), S.cell(results.totalProfitAfterTax, ['currency']), S.cell(sp500Results.totalProfit, ['currency'])]);
    addRow([S.cell('MoIC (Multiple on Invested Capital)'), S.cell(calculateMoIC(propertyCashFlows), ['number2dec']), S.cell(calculateMoIC(sp500CashFlows), ['number2dec'])]);
    skipRow(2);

    // --- SECTION 2: ASSUMPTIONS & DETAILED SALE ANALYSIS ---
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: 3 } });
    merges.push({ s: { r: row, c: 5 }, e: { r: row, c: 8 } });
    addRow([S.cell('Inputs & Assumptions', ['header2']), null, null, null, null, S.cell(`Sale Analysis (End of Year ${state.holdPeriodYears})`, ['header2'])]);

    const inputs = [
        ['Purchase Price', S.cell(state.purchasePrice, ['currency'])], ['Down Payment', S.cell(state.downPaymentPct, ['percent'])],
        ['Rehab Costs', S.cell(rehabCosts, ['currency'])], ['Interest Rate', S.cell(state.interestRate / 100, ['percent'])],
        ['Closing Costs', S.cell(state.closingCosts, ['currency'])], ['Gross Monthly Rent', S.cell(state.grossMonthlyRent, ['currency'])],
        ['Value Growth %', S.cell(state.annualAppreciationPct, ['percent'])], ['Vacancy %', S.cell(state.vacancyPct, ['percent'])],
        ['Income Growth %', S.cell(state.annualRentGrowthPct, ['percent'])], ['Repairs %', S.cell(state.maintenancePct, ['percent'])],
        ['Expense Growth %', S.cell(state.annualExpenseGrowthPct, ['percent'])], ['Marginal Tax Rate %', S.cell(state.marginalTaxRate, ['percent'])],
        ['Selling Costs %', S.cell(state.saleCostPct, ['percent'])], ['Capital Gains Rate %', S.cell(state.capitalGainsTaxRate, ['percent'])],
        ['Land Value %', S.cell(state.landValuePct, ['percent'])],
    ];

    const saleAnalysis = [
        ['Future Sale Price', S.cell(finalYear.endOfYearPropertyVal || 0, ['currency'])],
        ['Less: Selling Costs', S.cell(-((finalYear.endOfYearPropertyVal || 0) * state.saleCostPct), ['currency', 'redFont'])],
        ['Less: Loan Payoff', S.cell(-(finalYear.endOfYearLoanBal || 0), ['currency', 'redFont'])],
        ['Less: Tax on Sale', S.cell(-taxOnSale, ['currency', 'redFont'])],
        ['  Depreciation Recapture Tax', S.cell(-(depreciationRecapture * state.depreciationRecaptureRate), ['currency', 'redFont'])],
        ['  Capital Gains Tax', S.cell(-(appreciationGain > 0 ? appreciationGain * state.capitalGainsTaxRate : 0), ['currency', 'redFont'])],
        [],
        ['Net Cash From Sale', S.cell(saleProceeds - taxOnSale, ['currency', 'bold'])],
        ['+ Cumulative After-Tax CF', S.cell(finalYear.afterTaxCashFlow || 0, ['currency'])], // approximation
        ['- Total Capital Invested', S.cell(-results.initialCashNeeded, ['currency', 'redFont'])],
        [],
        ['Total Net Profit', S.cell(results.totalProfitAfterTax, ['currency', 'bold'])],
    ];

    for (let i = 0; i < Math.max(Math.ceil(inputs.length / 2), saleAnalysis.length); i++) {
        const i1 = i * 2;
        const i2 = i1 + 1;
        const saleRow = saleAnalysis[i] || [];
        addRow([
            S.cell(inputs[i1]?.[0]), inputs[i1]?.[1], S.cell(inputs[i2]?.[0]), inputs[i2]?.[1],
            null, // Spacer column
            S.cell(saleRow[0]), null, S.cell(saleRow[1])
        ]);
        merges.push({ s: { r: row - 1, c: 6 }, e: { r: row - 1, c: 7 } });
    }
    skipRow(2);

    // --- SECTION 3: ANNUAL PROJECTIONS ---
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: 12 } });
    addRow([S.cell('Annual Projections', ['header2'])]);
    const projHeaders = ['Year', 'Value', 'Equity', 'Loan Balance', 'NOI', 'Pre-Tax CF', 'Depreciation', 'Tax Impact', 'After-Tax CF', 'ROE', 'DSCR', 'Yield'];
    addRow(projHeaders.map(h => S.cell(h, ['bold', 'right'])));
    
    results.annualData.forEach(p => {
        const isNegativeCF = p.afterTaxCashFlow < 0;
        addRow([
            S.cell(p.year, ['number']), S.cell(p.endOfYearPropertyVal, ['currency']), S.cell(p.endOfYearEquity, ['currency']), S.cell(p.endOfYearLoanBal, ['currency']),
            S.cell(p.netOperatingIncome, ['currency']), S.cell(p.preTaxCashFlow, ['currency']), S.cell(p.depreciation, ['currency']), S.cell(p.taxImpact, p.taxImpact > 0 ? ['currency', 'redFont'] : ['currency']),
            S.cell(p.afterTaxCashFlow, isNegativeCF ? ['currency', 'bold', 'redFont'] : ['currency', 'bold']), 
            S.cell(p.returnOnEquity, ['percent']), S.cell(p.dscr, ['number2dec']), S.cell(p.cashOnCashReturn, ['percent', 'bold'])
        ]);
    });
    skipRow(2);

    // --- SECTION 4: DETAILED MONTHLY CASH FLOW ---
    const maxMonthsToShow = Math.min(360, state.holdPeriodYears * 12);
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: maxMonthsToShow + 1 } });
    addRow([S.cell('Detailed Monthly Cash Flow (Hold Period)', ['header2'])]);
    
    const monthlyHeaders = ["Metric"];
    for (let i = 1; i <= maxMonthsToShow; i++) { monthlyHeaders.push(`M${i}`); }
    data.push(monthlyHeaders.map(h => S.cell(h, ['bold', 'right']))); row++;
    
    const metricRows = [
        "INCOME",
        { label: "Gross Scheduled Rent", key: "grossScheduledRent", style: ["currency"] },
        { label: "Other Income", key: "otherIncome", style: ["currency"] },
        { label: "Less: Vacancy Loss", key: "vacancyLoss", style: ["currency", "redFont"] },
        { label: "Effective Gross Income", key: "effectiveGrossIncome", style: ["currency", "bold"] },
        "OPERATING EXPENSES",
        { label: "Property Taxes", key: "propTaxes", style: ["currency"] },
        { label: "Insurance", key: "insurance", style: ["currency"] },
        { label: "Repairs & Maintenance", key: "repairs", style: ["currency"] },
        { label: "Property Management", key: "management", style: ["currency"] },
        { label: "HOA Fees", key: "hoa", style: ["currency"] },
        { label: "Other Expenses", key: "otherFixedExpenses", style: ["currency"] },
        { label: "Total Operating Expenses", key: "totalOpEx", style: ["currency", "bold", "redFont"] },
        "PROFITABILITY & DEBT",
        { label: "Net Operating Income (NOI)", key: "noi", style: ["currency", "bold"] },
        { label: "Less: Debt Service (P&I)", key: "debtService", style: ["currency", "redFont"] },
        { label: "Less: Capital Expenditures", key: "capEx", style: ["currency", "redFont"] },
        { label: "Cash Flow Before Tax", key: "cashFlowBeforeTax", style: ["currency", "bold"] },
        "AFTER-TAX ANALYSIS",
        { label: "Less: Tax Impact / (Shield)", key: "taxImpact", style: ["currency", "redFont"] },
        { label: "Cash Flow After Tax", key: "cashFlowAfterTax", style: ["currency", "bold"] },
        "BALANCE SHEET",
        { label: "Property Value", key: "propertyValue", style: ["currency"] },
        { label: "Ending Loan Balance", key: "endingLoanBalance", style: ["currency"] },
        { label: "Total Equity", key: "totalEquity", style: ["currency", "bold"] },
        "KPIS & CUMULATIVE",
        { label: "Cumulative After-Tax CF", key: "cumulativeAfterTaxCF", style: ["currency", "bold"] },
        { label: "Debt Service Coverage Ratio (DSCR)", key: "dscr", style: ["number2dec"] },
        { label: "Return on Equity (ROE %)", key: "roe", style: ["percent"] },
    ];

    metricRows.forEach(metric => {
        if (typeof metric === 'string') {
            const headerRow = [S.cell(metric, ['bold'])];
            merges.push({ s: { r: row, c: 0 }, e: { r: row, c: maxMonthsToShow + 1 } });
            data.push(headerRow); row++;
            return;
        }
        
        const rowData = [S.cell(`  ${metric.label}`)];
        for (let i = 0; i < maxMonthsToShow; i++) {
            const val = (results.monthlyData[i] as any)[metric.key];
            if (!isFinite(val) || val === undefined) {
                rowData.push(S.cell('N/A', ['right']));
                continue;
            }
            const isNegative = val < 0;
            let finalStyle = metric.style;
            if (isNegative && (metric.style.includes('currency') || metric.style.includes('currencyCents'))) {
                finalStyle = [...metric.style, 'redFont'];
            }
            rowData.push(S.cell(val, finalStyle));
        }
        data.push(rowData); row++;
    });
    skipRow(2);

    // --- SECTION 5: LOAN AMORTIZATION SCHEDULE ---
    merges.push({ s: { r: row, c: 0 }, e: { r: row, c: 4 } });
    addRow([S.cell('Loan Amortization Schedule', ['header2'])]);
    addRow(['Payment #', 'Principal', 'Interest', 'Ending Balance'].map(h => S.cell(h, ['bold', 'right'])));
    results.amortizationSchedule.slice(0, maxMonthsToShow).forEach(p => {
        addRow([ S.cell(p.month, ['number']), S.cell(p.principal, ['currencyCents']), S.cell(p.interest, ['currencyCents']), S.cell(p.endingBalance, ['currencyCents']) ]);
    });

    // Create worksheet
    const ws: any = {};
    let maxCols = 0;
    data.forEach((rData, r) => {
        if (rData.length > maxCols) maxCols = rData.length;
        rData.forEach((cell, c) => {
            if (cell === null || cell === undefined) return;
            const cellRef = XLSX.utils.encode_cell({ r, c });
            ws[cellRef] = cell;
        });
    });
    
    const range = { s: { c: 0, r: 0 }, e: { c: maxCols - 1, r: data.length - 1 } };
    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!merges'] = merges;
    ws['!cols'] = [ {wch:28}, {wch:15}, {wch:28}, {wch:15}, {wch:5}, {wch:25}, {wch:15}, {wch:15}, {wch:15} ];
    ws['!freeze'] = { xSplit: "1", ySplit: "3", topLeftCell: "B4", activePane: "bottomRight" };

    // Excel tab names cannot exceed 31 chars and must be unique
    let tabName = scenario.name.replace(/[*?:\\/[\]]/g, '').trim().substring(0, 31);
    if (tabName.startsWith("'") || tabName.endsWith("'")) tabName = tabName.replace(/'/g, '');
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
    
    XLSX.utils.book_append_sheet(wb, ws, tabName);
  });

  XLSX.writeFile(wb, 'PropertyLens_Scenarios.xlsx');
}
