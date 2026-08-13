import { useState } from 'react'
import { useFinanceData } from "../../store/selectors"
import { TooltipIcon } from "../ui/TooltipIcon"
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function formatCurrency(val: number) {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`
  }
  if (Math.abs(val) >= 1000) {
    return `$${(val / 1000).toFixed(0)}k`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val);
}

const METRICS = [
  { id: 'afterTaxCF', label: 'After-Tax CF', type: 'currency', color: '#3b82f6' },
  { id: 'preTaxCF', label: 'Pre-Tax CF', type: 'currency', color: '#60a5fa' },
  { id: 'netOperatingIncome', label: 'NOI', type: 'currency', color: '#10b981' },
  { id: 'propertyValue', label: 'Prop. Value', type: 'currency', color: '#22c55e' },
  { id: 'loanBalance', label: 'Loan Balance', type: 'currency', color: '#94a3b8' },
  { id: 'roe', label: 'Return on Equity (ROE)', type: 'percent', color: '#8b5cf6' },
  { id: 'coc', label: 'Cash-on-Cash', type: 'percent', color: '#c084fc' }
]

export function AnalysisOverTime() {
  const data = useFinanceData()
  const [view, setView] = useState<'table' | 'chart'>('table')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['afterTaxCF', 'propertyValue', 'roe'])
  
  if (!data) return null;

  const toggleMetric = (id: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(id)) return prev.filter(m => m !== id)
      return [...prev, id]
    })
  }

  const chartData = data.annualData.map(d => ({
    year: `Year ${d.year}`,
    afterTaxCF: d.afterTaxCashFlow,
    preTaxCF: d.preTaxCashFlow,
    netOperatingIncome: d.netOperatingIncome,
    propertyValue: d.endOfYearPropertyVal,
    loanBalance: d.endOfYearLoanBal,
    roe: d.returnOnEquity,
    coc: d.cashOnCashReturn
  }));

  const hasCurrency = selectedMetrics.some(m => METRICS.find(x => x.id === m)?.type === 'currency')
  const hasPercent = selectedMetrics.some(m => METRICS.find(x => x.id === m)?.type === 'percent')

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-900">Analysis Over Time</h2>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Table View</span>
          <button 
            onClick={() => setView(view === 'table' ? 'chart' : 'table')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${view === 'chart' ? 'bg-strategy' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${view === 'chart' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className="text-sm font-medium text-slate-500">Chart View</span>
        </div>
      </div>

      {view === 'table' ? (
        <div className="overflow-x-auto custom-scrollbar border border-slate-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Year</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">EGI <TooltipIcon content="Effective Gross Income (Gross Rent - Vacancy + Other Income)" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">OpEx <TooltipIcon content="Total Operating Expenses (Taxes, Insurance, Mgmt, Maint, CapEx reserves)" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">NOI <TooltipIcon content="Net Operating Income (EGI - OpEx)" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Debt <TooltipIcon content="Total Annual Principal + Interest payments" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Pre-Tax CF <TooltipIcon content="Cash Flow before taxes (NOI - Debt Service - Itemized CapEx)" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Tax Impact <TooltipIcon content="Tax Savings from Depreciation, or Taxes owed on profit" /></th>
                <th className="px-4 py-3 text-right text-strategy font-bold whitespace-nowrap">After-Tax CF <TooltipIcon content="Net Cash in your pocket after all expenses and taxes" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">CoC % <TooltipIcon content="Cash-on-Cash Return (After-Tax CF / Total Cash Invested)" /></th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Equity <TooltipIcon content="Total property equity (Property Value - Remaining Loan Balance)" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.annualData.map((row: any) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">{row.year}</td>
                  <td className="px-4 py-2 text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.effectiveGrossIncome)}</td>
                  <td className="px-4 py-2 text-right text-red-600">-{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.operatingExpenses)}</td>
                  <td className="px-4 py-2 text-right font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.netOperatingIncome)}</td>
                  <td className="px-4 py-2 text-right text-red-600">-{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.debtService)}</td>
                  <td className="px-4 py-2 text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.preTaxCashFlow)}</td>
                  <td className={`px-4 py-2 text-right ${row.taxImpact > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {row.taxImpact > 0 ? '-' : '+'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(row.taxImpact))}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-strategy">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.afterTaxCashFlow)}</td>
                  <td className="px-4 py-2 text-right">{formatPercent(row.cashOnCashReturn)}</td>
                  <td className="px-4 py-2 text-right text-slate-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.endOfYearEquity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-slate-500 mr-2 self-center">Select Metrics to Plot:</span>
            {METRICS.map(m => (
              <button
                key={m.id}
                onClick={() => toggleMetric(m.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  selectedMetrics.includes(m.id) 
                    ? 'bg-strategy text-white border-strategy' 
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                
                {hasCurrency && (
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={formatCurrency}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dx={-10}
                    label={{ value: 'Value ($)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12, dy: 30 }}
                  />
                )}
                
                {hasPercent && (
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatPercent}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dx={10}
                    label={{ value: 'Rate (%)', angle: -90, position: 'insideRight', fill: '#64748b', fontSize: 12, dy: 30 }}
                  />
                )}
                
                <Tooltip
                  formatter={(value: any, name: any) => [
                  String(name).includes('Rate') || String(name).includes('Yield') || String(name).includes('Margin') || String(name).includes('Return')
                    ? `${(Number(value) * 100).toFixed(1)}%`
                    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value)),
                  name
                ]}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '8px' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
                
                {selectedMetrics.map(metricId => {
                  const metric = METRICS.find(m => m.id === metricId);
                  if (!metric) return null;
                  return (
                    <Line 
                      key={metric.id}
                      yAxisId={metric.type === 'currency' ? 'left' : 'right'}
                      type="monotone" 
                      dataKey={metric.id} 
                      name={metric.label}
                      stroke={metric.color} 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  )
                })}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
