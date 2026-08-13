import { useFinanceData } from "../../store/selectors"
import { MetricCard } from "./MetricCard"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

export function ExecutiveSummary() {
  const data = useFinanceData()
  
  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Executive Summary</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="After-Tax IRR"
            value={formatPercent(data.irrAfterTax)}
            status={data.irrAfterTax > 0.12 ? 'success' : data.irrAfterTax > 0.08 ? 'neutral' : 'warning'}
            formula={
              <span>
                Based on Newton-Raphson approximation of all 30 years of cash flow and net equity at sale.
              </span>
            }
            explanation="The Internal Rate of Return (IRR) is your true annualized return, accounting for the time value of money. This is the ultimate metric for comparing real estate against the stock market."
          />
          <MetricCard
            title="Equity Multiple"
            value={`${data.equityMultiple.toFixed(2)}x`}
            status={data.equityMultiple >= 2.0 ? 'success' : 'neutral'}
            formula={
              <span>
                <span className="text-slate-500">Total Cash In + Total Profit:</span> {formatCurrency(data.totalProfitAfterTax + data.totalCashInvested)} <br/>
                <span className="text-slate-500">÷ Total Cash Invested:</span> {formatCurrency(data.totalCashInvested)} <br/>
                <span className="text-slate-500">=</span> {data.equityMultiple.toFixed(2)}x
              </span>
            }
            explanation="How much your initial capital multiplies over the holding period. A 2.0x multiple means you doubled your money."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Total After-Tax Profit"
            value={formatCurrency(data.totalProfitAfterTax)}
            status="success"
            explanation="The absolute dollar amount of profit you take home after all expenses, debt service, and taxes."
          />
          <MetricCard
            title="Total Capital Invested"
            value={formatCurrency(data.totalCashInvested)}
            status="neutral"
            explanation="Your total out-of-pocket cash (Down Payment + Closing Costs + Rehab + CapEx over holding period)."
          />
        </div>
        
        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Avg. Unlevered Yield (Cap Rate)</span>
            <span className="font-semibold text-slate-900">{formatPercent(data.unleveredYieldAvg)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-600">Avg. Cash-on-Cash Return</span>
            <span className="font-semibold text-slate-900">{formatPercent(data.leveredYieldAvg)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-600">Year 1 DSCR</span>
            <span className="font-semibold text-slate-900">{data.annualData[0]?.dscr.toFixed(2) || '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
