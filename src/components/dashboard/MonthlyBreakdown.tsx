import { useState } from 'react'
import { useFinanceData } from '../../store/selectors'
import { useAppStore } from '../../store/useAppStore'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

const COLORS = [
  '#4a90e2', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c', '#a0522d', '#7f8c8d', '#34495e'
];

export function MonthlyBreakdown() {
  const data = useFinanceData()
  const store = useAppStore()
  const [view, setView] = useState<'Expenses' | 'Income'>('Expenses')

  if (!data) return null;

  const monthlyRent = store.grossMonthlyRent;
  const otherIncome = store.otherMonthlyIncome;
  
  const incomeData = [
    { name: 'Gross Rent', value: monthlyRent },
    { name: 'Other Income', value: otherIncome }
  ].filter(d => d.value > 0);

  const totalIncome = monthlyRent + otherIncome;

  const pAndI = (data.annualData[0]?.debtService || 0) / 12;
  const taxes = (data.annualData[0]?.propertyTaxes || 0) / 12;
  const management = (data.annualData[0]?.managementFees || 0) / 12;
  const vacancy = (data.annualData[0]?.vacancyLoss || 0) / 12;
  const maintenance = (data.annualData[0]?.maintenance || 0) / 12;
  const capex = (data.annualData[0]?.capitalExpenditures || 0) / 12;
  const insurance = (data.annualData[0]?.insurance || 0) / 12;
  const hoa = (data.annualData[0]?.hoa || 0) / 12;
  const utilities = (data.annualData[0]?.utilities || 0) / 12;
  const otherExp = (data.annualData[0]?.otherExpenses || 0) / 12;

  const expenseDataRaw = [
    { name: 'P&I', value: pAndI },
    { name: 'Taxes', value: taxes },
    { name: 'Management', value: management },
    { name: 'Vacancy', value: vacancy },
    { name: 'Maintenance', value: maintenance },
    { name: 'CapEx', value: capex },
    { name: 'Insurance', value: insurance },
    { name: 'Utilities', value: utilities },
    { name: 'Other', value: otherExp },
    { name: 'HOA', value: hoa },
  ];

  const totalExpenses = expenseDataRaw.reduce((sum, item) => sum + item.value, 0);
  
  // Sort expenses descending for better legend/chart flow
  const expenseData = [...expenseDataRaw].sort((a, b) => b.value - a.value);

  const currentData = view === 'Expenses' ? expenseData : incomeData;
  const currentTotal = view === 'Expenses' ? totalExpenses : totalIncome;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900">Monthly Breakdown</h2>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setView('Expenses')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === 'Expenses' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Expenses
            </button>
            <button 
              onClick={() => setView('Income')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${view === 'Income' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Income
            </button>
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          {formatCurrency(currentTotal)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-3">
          {currentData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="font-medium text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{formatCurrency(item.value)}</span>
                <span className="text-slate-400 text-xs w-10 text-right">
                  {currentTotal > 0 ? ((item.value / currentTotal) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
