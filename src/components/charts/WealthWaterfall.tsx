import { useFinanceData } from "../../store/selectors"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts'
import { Accordion } from "../ui/Accordion"
import { TooltipIcon } from "../ui/TooltipIcon"

function formatCurrency(val: number) {
  if (Math.abs(val) >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(0)}k`;
  return `$${val}`;
}

export function WealthWaterfall() {
  const data = useFinanceData()
  
  // Calculate waterfall components
  const initialEquity = data.initialCashNeeded;
  let totalCashFlow = 0;
  let totalPrincipalPaid = 0;
  
  data.annualData.forEach((yr: any) => {
    totalCashFlow += yr.afterTaxCashFlow;
    totalPrincipalPaid += yr.principalPaid;
  });
  
  // Use exact numbers from the engine
  const chartData = [
    { name: 'Initial Cash', value: initialEquity, fill: '#64748b' },
    { name: 'Cash Flow', value: totalCashFlow, fill: '#1565C0' },
    { name: 'Loan Paydown', value: totalPrincipalPaid, fill: '#2E7D32' },
    // A simplified appreciation bucket for visual purposes
    { name: 'Final Equity', value: data.annualData[data.annualData.length - 1]?.endOfYearEquity || 0, fill: '#6A1B9A' }
  ]

  return (
    <Accordion 
      title={
        <div className="flex items-center gap-2">
          Wealth Projection (Returns)
          <TooltipIcon content="Visual breakdown of how your wealth is generated: Initial Equity, accumulated Cash Flow, and accumulated Loan Paydown over the entire holding period." />
        </div>
      } 
      open={true}
    >
      <div className="h-80 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <RechartsTooltip 
              formatter={(val: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Accordion>
  )
}
