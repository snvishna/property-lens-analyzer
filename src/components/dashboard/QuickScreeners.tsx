import { useFinanceData } from "../../store/selectors"
import { TooltipIcon } from "../ui/TooltipIcon"
import { useAppStore } from "../../store/useAppStore"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

export function QuickScreeners() {
  const data = useFinanceData()
  const store = useAppStore()
  if (!data) return null;

  const monthlyRent = store.grossMonthlyRent + store.otherMonthlyIncome;
  const annualRent = monthlyRent * 12;
  const onePercentRule = store.purchasePrice > 0 ? monthlyRent / store.purchasePrice : 0;
  
  const firstYearOpex = data.annualData[0]?.operatingExpenses || 0;
  const fiftyPercentRule = annualRent > 0 ? firstYearOpex / annualRent : 0;
  
  const grm = annualRent > 0 ? store.purchasePrice / annualRent : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Screeners & Rules of Thumb</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            1% Rule <TooltipIcon content="Monthly Rent / Purchase Price. Target is > 1%." />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(onePercentRule)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(monthlyRent)} / {formatCurrency(store.purchasePrice)}</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            50% Rule <TooltipIcon content="Total Operating Expenses / Gross Income. Target is < 50%." />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(fiftyPercentRule)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(firstYearOpex)} / {formatCurrency(annualRent)}</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            GRM <TooltipIcon content="Gross Rent Multiplier (Purchase Price / Annual Rent)" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{grm.toFixed(2)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(store.purchasePrice)} / {formatCurrency(annualRent)}</span>
        </div>
      </div>
    </div>
  )
}
