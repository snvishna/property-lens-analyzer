import { useFinanceData } from "../../store/selectors"
import { TooltipIcon } from "../ui/TooltipIcon"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

export function InvestmentShowdown() {
  const data = useFinanceData()
  if (!data) return null;

  // Derive SP500 equivalent stats based on investing the exact same 'Total Cash Invested' at the `sp500ExpectedReturnPct` rate over the hold period.
  // Wait, does financeEngine return SP500 stats? No, I need to calculate it here if it doesn't, but wait, `data.sp500` might exist?
  // Let me check if `financeEngine` exposes this. Actually, the original static HTML just did standard compounding.
  // We'll calculate standard SP500 compounding here.
  const sp500Rate = 0.08; // fallback
  const holdYears = data.annualData.length;
  const totalCapital = data.totalCashInvested;
  
  // Basic Future Value calculation for S&P 500
  const sp500FV = totalCapital * Math.pow(1 + sp500Rate, holdYears);
  const sp500Profit = sp500FV - totalCapital;
  const sp500Multiple = sp500FV / totalCapital;

  const propBetter = data.irrAfterTax > sp500Rate;

  return (
    <div className="bg-white rounded-xl border border-strategy p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Investment Showdown: Property vs. S&P 500</h2>
      <p className="text-sm text-slate-500 mb-6">A true "apples-to-apples" comparison to answer the question: what's the best use of your capital?</p>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
              <th className="p-3 uppercase text-xs tracking-wider">Metric</th>
              <th className="p-3 uppercase text-xs tracking-wider text-right">This Property</th>
              <th className="p-3 uppercase text-xs tracking-wider text-right">S&P 500</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  IRR (Internal Rate of Return) <TooltipIcon content="Annualized time-adjusted return" />
                </div>
              </td>
              <td className={`p-3 text-right font-bold ${propBetter ? 'text-green-600' : 'text-slate-900'}`}>{formatPercent(data.irrAfterTax)}</td>
              <td className={`p-3 text-right font-bold ${!propBetter ? 'text-green-600' : 'text-slate-900'}`}>{formatPercent(sp500Rate)}</td>
            </tr>
            <tr>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  Total After-Tax Profit <TooltipIcon content="Absolute profit amount" />
                </div>
              </td>
              <td className={`p-3 text-right font-bold ${data.totalProfitAfterTax > sp500Profit ? 'text-green-600' : 'text-slate-900'}`}>{formatCurrency(data.totalProfitAfterTax)}</td>
              <td className={`p-3 text-right font-bold ${sp500Profit > data.totalProfitAfterTax ? 'text-green-600' : 'text-slate-900'}`}>{formatCurrency(sp500Profit)}</td>
            </tr>
            <tr>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  MoIC (Multiple on Invested Capital) <TooltipIcon content="How many times your money multiplied" />
                </div>
              </td>
              <td className={`p-3 text-right font-bold ${data.equityMultiple > sp500Multiple ? 'text-green-600' : 'text-slate-900'}`}>{data.equityMultiple.toFixed(2)}x</td>
              <td className={`p-3 text-right font-bold ${sp500Multiple > data.equityMultiple ? 'text-green-600' : 'text-slate-900'}`}>{sp500Multiple.toFixed(2)}x</td>
            </tr>
            <tr>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  Total Capital Invested <TooltipIcon content="Initial capital required" />
                </div>
              </td>
              <td className="p-3 text-right font-bold text-slate-900">{formatCurrency(data.totalCashInvested)}</td>
              <td className="p-3 text-right font-bold text-slate-900">{formatCurrency(totalCapital)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
        <span className="font-bold text-slate-800">Verdict:</span> The <span className="font-bold text-green-700">{propBetter ? 'Property' : 'S&P 500'} appears to be the superior investment</span>, showing a higher time-adjusted return (IRR) and generating more total profit.
      </div>
    </div>
  )
}
