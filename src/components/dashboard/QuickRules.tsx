import { useAppStore } from "../../store/useAppStore"
import { useFinanceData } from "../../store/selectors"
import { Accordion } from "../ui/Accordion"

function formatPercent(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

export function QuickRules() {
  const store = useAppStore()
  const data = useFinanceData()

  // Calculate retail rules
  const grossMonthlyRent = store.grossMonthlyRent + store.otherMonthlyIncome;
  const purchasePrice = store.purchasePrice;
  const onePercentRule = (grossMonthlyRent / purchasePrice) || 0;
  
  const grm = purchasePrice / (grossMonthlyRent * 12) || 0;
  const fiftyPercentRuleOpEx = (grossMonthlyRent * 0.5);
  const actualYear1OpEx = data.annualData[0]?.operatingExpenses / 12 || 0;

  return (
    <Accordion title="Quick Rules of Thumb (Retail Metrics)" open={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 font-medium">1% Rule</p>
          <p className={`text-lg font-bold ${onePercentRule >= 0.01 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {formatPercent(onePercentRule)}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Target: &gt; 1%</p>
        </div>
        
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 font-medium">Gross Rent Multiplier</p>
          <p className={`text-lg font-bold ${grm < 10 && grm > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {grm.toFixed(2)}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Target: &lt; 10</p>
        </div>
        
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 font-medium">50% Rule Est. vs Actual</p>
          <p className="text-lg font-bold text-slate-800">
            ${Math.round(actualYear1OpEx)} <span className="text-sm font-normal text-slate-500">vs ${Math.round(fiftyPercentRuleOpEx)}</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Target: Actual &lt; 50% Rule</p>
        </div>
      </div>
    </Accordion>
  )
}
