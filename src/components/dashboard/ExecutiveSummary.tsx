import { useFinanceData } from "../../store/selectors"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { MetricCard } from "./MetricCard"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(val);
}

export function ExecutiveSummary() {
  const data = useFinanceData()

  return (
    <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-strategy opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span>Investment Showdown</span>
          <span className="text-sm font-normal text-slate-300">vs S&P 500</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
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
                <span className="text-slate-400">Total Cash In + Total Profit:</span> {formatCurrency(data.totalProfitAfterTax + data.totalCashInvested)} <br/>
                <span className="text-slate-400">÷ Total Cash Invested:</span> {formatCurrency(data.totalCashInvested)} <br/>
                <span className="text-slate-400">=</span> {data.equityMultiple.toFixed(2)}x
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
        
        <div className="pt-4 border-t border-slate-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Avg. Unlevered Yield (Cap Rate)</span>
            <span className="font-semibold">{formatPercent(data.unleveredYieldAvg)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-400">Avg. Cash-on-Cash Return</span>
            <span className="font-semibold">{formatPercent(data.leveredYieldAvg)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-400">Year 1 DSCR</span>
            <span className="font-semibold">{data.annualData[0]?.dscr.toFixed(2) || '0.00'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
