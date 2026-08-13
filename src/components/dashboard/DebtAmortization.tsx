import { useFinanceData } from '../../store/selectors'
import { TooltipIcon } from '../ui/TooltipIcon'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function formatCurrency(val: number) {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`
  }
  if (val >= 1000) {
    return `$${(val / 1000).toFixed(0)}k`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

export function DebtAmortization() {
  const data = useFinanceData()
  if (!data) return null;

  // We want to plot Loan Balance vs Equity up to Year 10 (or whatever hold period is)
  const chartData = data.annualData.map(d => ({
    year: `Year ${d.year}`,
    loanBalance: d.endOfYearLoanBal,
    equity: d.endOfYearEquity,
    propertyValue: d.endOfYearPropertyVal
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Debt & Amortization <TooltipIcon content="Visualizes how your loan pays down while your equity grows over time." />
        </h2>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dx={-10}
              label={{ value: 'Total Property Value ($)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12, dy: 60 }}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value)),
                name === 'loanBalance' ? 'Loan Balance' : 'Equity'
              ]}
              labelStyle={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '8px' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="square"
              formatter={(value) => <span className="text-slate-600 text-sm ml-1">{value === 'loanBalance' ? 'Loan Balance' : 'Equity'}</span>}
            />
            
            {/* The stacked area chart to show them summing up to Property Value */}
            <Area 
              type="monotone" 
              dataKey="loanBalance" 
              stackId="1" 
              stroke="#94a3b8" 
              fill="#cbd5e1" 
              fillOpacity={0.8}
            />
            <Area 
              type="monotone" 
              dataKey="equity" 
              stackId="1" 
              stroke="#22c55e" 
              fill="#86efac" 
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
