import { useFinanceData } from "../../store/selectors"
import { TooltipIcon } from "../ui/TooltipIcon"
import { useAppStore } from "../../store/useAppStore"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

export function DebtSafetyAnalysis() {
  const data = useFinanceData()
  const store = useAppStore()
  if (!data) return null;

  const noi = data.annualData[0]?.netOperatingIncome || 0;
  const loanAmount = store.purchasePrice * (1 - store.downPaymentPct);
  const debtYield = loanAmount > 0 ? noi / loanAmount : 0;
  
  const ltv = store.purchasePrice > 0 ? loanAmount / store.purchasePrice : 0;
  const ltc = (store.purchasePrice + store.rehabCosts) > 0 ? loanAmount / (store.purchasePrice + store.rehabCosts) : 0;

  const monthlyDebtService = (data.annualData[0]?.debtService || 0) / 12;
  const monthlyITI = store.propertyTaxesMonthly + store.insuranceMonthly;
  const cashReserves = (monthlyDebtService + monthlyITI) * 6;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Debt and Safety Analysis</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            DSCR <TooltipIcon content="Debt Service Coverage Ratio (NOI / Debt Service)" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{data.annualData[0]?.dscr.toFixed(2) || '0.00'}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(noi)} / {formatCurrency(data.annualData[0]?.debtService || 0)}</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            Debt Yield <TooltipIcon content="NOI / Total Loan Amount" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(debtYield)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(noi)} / {formatCurrency(loanAmount)}</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            LTV / LTC <TooltipIcon content="Loan-to-Value and Loan-to-Cost ratios" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(ltv)} / {formatPercent(ltc)}</span>
          <span className="text-xs text-slate-400 mt-1">= LTV / LTC</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            Cash Reserves <TooltipIcon content="Recommended 6 months of Principal, Interest, Taxes, and Insurance" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(cashReserves)}</span>
          <span className="text-xs text-slate-400 mt-1">= 6mo of P+I+T+I</span>
        </div>
      </div>
    </div>
  )
}
