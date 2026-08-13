import { useFinanceData } from "../../store/selectors"
import { Accordion } from "../ui/Accordion"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
}

export function AuditDetail() {
  const data = useFinanceData()

  return (
    <Accordion title="Audit & Detail" open={false}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <p className="text-xs text-slate-500">Pre-Tax IRR</p>
            <p className="font-semibold">{formatPercent(data.irrPreTax)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Modified IRR (MIRR)</p>
            <p className="font-semibold">{formatPercent(data.mirrAfterTax)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Initial Cash Needed</p>
            <p className="font-semibold">{formatCurrency(data.initialCashNeeded)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Cash Invested</p>
            <p className="font-semibold">{formatCurrency(data.totalCashInvested)}</p>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">EGI</th>
                <th className="px-4 py-3 text-right">OpEx</th>
                <th className="px-4 py-3 text-right">NOI</th>
                <th className="px-4 py-3 text-right">Debt Service</th>
                <th className="px-4 py-3 text-right">Pre-Tax CF</th>
                <th className="px-4 py-3 text-right">Tax Impact</th>
                <th className="px-4 py-3 text-right text-strategy font-bold">After-Tax CF</th>
                <th className="px-4 py-3 text-right">CoC %</th>
                <th className="px-4 py-3 text-right">Equity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.annualData.map((row: any) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">{row.year}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(row.effectiveGrossIncome)}</td>
                  <td className="px-4 py-2 text-right text-red-600">-{formatCurrency(row.operatingExpenses)}</td>
                  <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.netOperatingIncome)}</td>
                  <td className="px-4 py-2 text-right text-red-600">-{formatCurrency(row.debtService)}</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(row.preTaxCashFlow)}</td>
                  <td className={`px-4 py-2 text-right ${row.taxImpact > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {row.taxImpact > 0 ? '-' : '+'}{formatCurrency(Math.abs(row.taxImpact))}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-strategy">{formatCurrency(row.afterTaxCashFlow)}</td>
                  <td className="px-4 py-2 text-right">{formatPercent(row.cashOnCashReturn)}</td>
                  <td className="px-4 py-2 text-right text-slate-500">{formatCurrency(row.endOfYearEquity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Accordion>
  )
}
