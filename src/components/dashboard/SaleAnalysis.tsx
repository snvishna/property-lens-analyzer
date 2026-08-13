import { useFinanceData } from '../../store/selectors'
import { TooltipIcon } from '../ui/TooltipIcon'
import { useAppStore } from '../../store/useAppStore'

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
}

export function SaleAnalysis() {
  const data = useFinanceData()
  const store = useAppStore()
  if (!data || data.annualData.length === 0) return null;

  const lastYear = data.annualData[data.annualData.length - 1];
  const holdYears = store.holdPeriodYears;

  const salePrice = lastYear.endOfYearPropertyVal;
  const sellingCosts = salePrice * store.saleCostPct;
  const loanPayoff = lastYear.endOfYearLoanBal;
  
  const rehabCosts = store.useItemizedRehab 
    ? store.itemizedRehab.reduce((acc, item) => acc + item.cost, 0)
    : store.rehabCosts;

  const cumulativeDepreciation = data.annualData.reduce((sum, d) => sum + d.depreciation, 0);
  const adjustedBasis = store.purchasePrice + rehabCosts - cumulativeDepreciation;
  const totalGain = salePrice - sellingCosts - adjustedBasis;
  
  const recaptureGain = Math.min(cumulativeDepreciation, totalGain > 0 ? totalGain : 0);
  const capitalGain = Math.max(0, totalGain - recaptureGain);
  
  const recaptureTax = recaptureGain * store.depreciationRecaptureRate;
  const cgTax = capitalGain * store.capitalGainsTaxRate;
  const totalTax = recaptureTax + cgTax;
  
  const netCashFromSale = salePrice - sellingCosts - loanPayoff - totalTax;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Sale Analysis (End of Year {holdYears})</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600">Future Sale Price</span>
          <span className="font-bold text-slate-900">{formatCurrency(salePrice)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Less: Selling Costs ({(store.saleCostPct * 100).toFixed(0)}%)</span>
          <span className="font-medium text-red-500">-{formatCurrency(sellingCosts)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Less: Loan Payoff</span>
          <span className="font-medium text-red-500">-{formatCurrency(loanPayoff)}</span>
        </div>
        
        <div className="flex justify-between items-start text-sm">
          <div>
            <span className="text-slate-500 block mb-1">Less: Total Tax on Sale</span>
            <div className="pl-4 border-l-2 border-slate-100 space-y-1">
              <div className="text-xs text-slate-400">Depreciation Recapture Tax</div>
              <div className="text-xs text-slate-400">Capital Gains Tax</div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium text-red-500 block mb-1">-{formatCurrency(totalTax)}</span>
            <div className="space-y-1">
              <div className="text-xs text-slate-400">-{formatCurrency(recaptureTax)}</div>
              <div className="text-xs text-slate-400">-{formatCurrency(cgTax)}</div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <span className="font-bold text-slate-900">Net Cash from Sale</span>
          <span className="font-bold text-slate-900 text-lg">{formatCurrency(netCashFromSale)}</span>
        </div>

        <div className="pt-6 border-t-4 border-slate-50 flex justify-between items-center text-sm">
          <span className="text-slate-600 flex items-center gap-1">
            Total Capital Invested <TooltipIcon content="Total cash deployed over the life of the investment" />
          </span>
          <span className="font-bold text-slate-900">-{formatCurrency(data.totalCashInvested)}</span>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <span className="text-lg">📊</span> True Net Profit
              <TooltipIcon content="Total profit after all expenses, debt, and taxes" />
            </span>
            <span className="font-bold text-green-600 text-2xl">{formatCurrency(data.totalProfitAfterTax)}</span>
          </div>
          <div className="text-right text-xs text-slate-400">
            Total: {formatPercent((data.totalProfitAfterTax / data.totalCashInvested))} ({(data.irrAfterTax * 100).toFixed(1)}% annualized)
          </div>
        </div>
      </div>
    </div>
  )
}
