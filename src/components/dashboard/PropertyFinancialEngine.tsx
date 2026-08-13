import { useFinanceData } from "../../store/selectors"
import { useAppStore } from "../../store/useAppStore"
import { formatCurrency, formatPercent } from "../../lib/utils"
import { TooltipIcon } from "../ui/TooltipIcon"

export function PropertyFinancialEngine() {
  const data = useFinanceData()
  const store = useAppStore()

  const rehabCosts = store.useItemizedRehab 
    ? store.itemizedRehab.reduce((acc, item) => acc + item.cost, 0)
    : store.rehabCosts;

  if (!data) return null;

  const forcedEquity = store.arv - (store.purchasePrice + rehabCosts);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Property Financial Engine</h2>
      <p className="text-sm text-slate-500 mb-6">Core metrics that define the asset's unleveraged profitability and growth potential. Priorities are highlighted based on the selected strategy.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="border border-strategy bg-strategy-alpha rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-1">
            Total Cash Needed <TooltipIcon content="Down Payment + Closing Costs + Rehab" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(data.totalCashInvested)}</span>
          <span className="text-xs text-slate-400 mt-1">= DP + Closing + Rehab</span>
        </div>

        <div className="border border-strategy bg-strategy-alpha rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-1">
            NOI (Annual) <TooltipIcon content="Net Operating Income in Year 1" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(data.annualData[0]?.netOperatingIncome || 0)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(data.annualData[0]?.effectiveGrossIncome || 0)} - {formatCurrency(data.annualData[0]?.operatingExpenses || 0)}</span>
        </div>

        <div className="border border-strategy bg-strategy-alpha rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-1">
            Cap Rate <TooltipIcon content="Year 1 NOI / Purchase Price" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(data.unleveredYieldAvg)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(data.annualData[0]?.netOperatingIncome || 0)} / {formatCurrency(store.purchasePrice)}</span>
        </div>

        <div className="border border-strategy bg-strategy-alpha rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-1">
            Avg. Annual ROE <TooltipIcon content="Average Return on Equity over holding period" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatPercent(data.leveredYieldAvg)}</span>
          <span className="text-xs text-slate-400 mt-1">= Avg. After-Tax CF / Equity</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-1 flex items-center justify-center">
            Forced Equity <TooltipIcon content="ARV - (Purchase Price + Rehab)" />
          </span>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(forcedEquity)}</span>
          <span className="text-xs text-slate-400 mt-1">= {formatCurrency(store.arv)} - {formatCurrency(store.purchasePrice + store.rehabCosts)}</span>
        </div>
      </div>
    </div>
  )
}
