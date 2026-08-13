import { useFinanceData } from "../../store/selectors"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"

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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-sm font-medium">After-Tax IRR</p>
            <p className="text-3xl font-bold text-white mt-1">{formatPercent(data.irrAfterTax)}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-sm font-medium">Equity Multiple</p>
            <p className="text-3xl font-bold text-white mt-1">{data.equityMultiple.toFixed(2)}x</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Total After-Tax Profit</p>
            <p className="text-xl font-semibold text-emerald-400">{formatCurrency(data.totalProfitAfterTax)}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Capital Invested</p>
            <p className="text-xl font-semibold">{formatCurrency(data.totalCashInvested)}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Avg. Unlevered Yield</span>
            <span className="font-semibold">{formatPercent(data.unleveredYieldAvg)}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-400">Avg. Cash-on-Cash</span>
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
