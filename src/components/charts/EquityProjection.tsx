import { useFinanceData } from "../../store/selectors"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Accordion } from "../ui/Accordion"

function formatCurrency(val: number) {
  if (Math.abs(val) >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(0)}k`;
  return `$${val}`;
}

export function EquityProjection() {
  const data = useFinanceData()

  return (
    <Accordion title="Equity Buildup Over Time" open={false}>
      <div className="h-80 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.annualData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <RechartsTooltip 
              formatter={(val: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="endOfYearLoanBal" name="Loan Balance" stackId="1" stroke="#ef4444" fill="#fecaca" />
            <Area type="monotone" dataKey="endOfYearEquity" name="Equity" stackId="1" stroke="#22c55e" fill="#bbf7d0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Accordion>
  )
}
