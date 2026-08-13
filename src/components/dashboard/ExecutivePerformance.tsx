import { useFinanceData } from "../../store/selectors"
import { useAppStore } from "../../store/useAppStore"
import { CheckCircle, XCircle } from 'lucide-react'
import { TooltipIcon } from "../ui/TooltipIcon"
import { formatCurrency, formatPercent } from "../../lib/utils"

export function ExecutivePerformance() {
  const data = useFinanceData()
  const store = useAppStore()
  if (!data) return null;

  const preTaxCF = data.annualData[0]?.preTaxCashFlow || 0;
  const monthlyCF = preTaxCF / 12;
  const coc = data.annualData[0]?.cashOnCashReturn || 0;
  const egi = data.annualData[0]?.effectiveGrossIncome || 0;
  const opex = data.annualData[0]?.operatingExpenses || 0;
  const ds = data.annualData[0]?.debtService || 0;
  
  const rehabCosts = store.useItemizedRehab 
    ? store.itemizedRehab.reduce((acc, item) => acc + item.cost, 0)
    : store.rehabCosts;
    
  const forcedEquity = store.arv - (store.purchasePrice + rehabCosts);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Executive Performance</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">Year 1 / Full Period</span>
          <span className="text-slate-500">Pre-Tax / After-Tax</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-2 flex items-center gap-1">
            Monthly Cash Flow <span className="font-bold text-slate-700">Pre-Tax</span> <TooltipIcon content="Year 1 Pre-Tax Cash Flow / 12" />
          </span>
          <span className={`text-3xl font-bold ${monthlyCF >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {formatCurrency(monthlyCF)}
          </span>
          <span className="text-xs text-slate-400 mt-2">= {formatCurrency(egi / 12)} - {formatCurrency((opex + ds) / 12)}</span>
        </div>

        <div className="border border-slate-200 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-slate-500 text-sm font-medium mb-2 flex items-center gap-1">
            Cash-on-Cash ROI <span className="font-bold text-slate-700">Pre-Tax</span> <TooltipIcon content="Year 1 Pre-Tax Cash Flow / Total Cash Invested" />
          </span>
          <span className={`text-3xl font-bold ${coc >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {formatPercent(coc)}
          </span>
          <span className="text-xs text-slate-400 mt-2">= {formatCurrency(preTaxCF)} / {formatCurrency(data.totalCashInvested)}</span>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-inner">
        <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
          <div>
            <h3 className="font-semibold text-slate-800">Property Viability Checklist</h3>
            <p className="text-xs text-slate-500">Compares Year 1 pre-tax results to your criteria.</p>
          </div>
          <span className={`px-3 py-1 rounded-md font-bold text-sm ${monthlyCF >= store.targetMinCashFlow && forcedEquity >= store.targetMinForcedEquity && coc >= store.targetMinCocRoi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {monthlyCF >= store.targetMinCashFlow && forcedEquity >= store.targetMinForcedEquity && coc >= store.targetMinCocRoi ? 'GO' : 'NO-GO'}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {forcedEquity >= store.targetMinForcedEquity ? <CheckCircle className="text-green-500 w-5 h-5" /> : <XCircle className="text-red-500 w-5 h-5" />}
              <span className="text-sm font-medium text-slate-700">Forced Equity {'>='} {formatCurrency(store.targetMinForcedEquity)}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{formatCurrency(forcedEquity)}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {monthlyCF >= store.targetMinCashFlow ? <CheckCircle className="text-green-500 w-5 h-5" /> : <XCircle className="text-red-500 w-5 h-5" />}
              <span className="text-sm font-medium text-slate-700">Monthly Cash Flow {'>='} {formatCurrency(store.targetMinCashFlow)}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{formatCurrency(monthlyCF)}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {coc >= store.targetMinCocRoi ? <CheckCircle className="text-green-500 w-5 h-5" /> : <XCircle className="text-red-500 w-5 h-5" />}
              <span className="text-sm font-medium text-slate-700">CoC ROI {'>='} {formatPercent(store.targetMinCocRoi)}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{formatPercent(coc)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
