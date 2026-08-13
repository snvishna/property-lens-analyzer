import { useAppStore } from "../../store/useAppStore"
import { useFinanceData } from "../../store/selectors"
import { Accordion } from "../ui/Accordion"
import { MetricCard } from "./MetricCard"

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

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
        <MetricCard
          title="1% Rule"
          value={formatPercent(onePercentRule)}
          status={onePercentRule >= 0.01 ? 'success' : 'warning'}
          target="> 1%"
          formula={
            <span>
              <span className="text-slate-400">Monthly Rent:</span> {formatCurrency(grossMonthlyRent)} <br/>
              <span className="text-slate-400">÷ Purchase Price:</span> {formatCurrency(purchasePrice)} <br/>
              <span className="text-slate-400">=</span> {formatPercent(onePercentRule)}
            </span>
          }
          explanation="The 1% Rule states that a property's monthly rent should be at least 1% of its total purchase price. It's a quick way to screen for cash flow potential, though not an absolute rule."
        />
        
        <MetricCard
          title="Gross Rent Multiplier"
          value={grm.toFixed(2)}
          status={grm < 10 && grm > 0 ? 'success' : 'warning'}
          target="< 10"
          formula={
            <span>
              <span className="text-slate-400">Purchase Price:</span> {formatCurrency(purchasePrice)} <br/>
              <span className="text-slate-400">÷ Annual Gross Rent:</span> {formatCurrency(grossMonthlyRent * 12)} <br/>
              <span className="text-slate-400">=</span> {grm.toFixed(2)}
            </span>
          }
          explanation="The GRM measures the ratio of the price of a real estate investment to its annual rental income before accounting for expenses. A lower GRM indicates a better deal, typically aiming for under 10."
        />
        
        <MetricCard
          title="50% Rule Est. vs Actual"
          value={`$${Math.round(actualYear1OpEx)}`}
          subtitle={`vs $${Math.round(fiftyPercentRuleOpEx)}`}
          status={actualYear1OpEx < fiftyPercentRuleOpEx ? 'success' : 'neutral'}
          target="Actual OpEx < 50% Rule Est"
          formula={
            <span>
              <span className="text-slate-400">50% Rule:</span> {formatCurrency(grossMonthlyRent)} × 0.5 = {formatCurrency(fiftyPercentRuleOpEx)} <br/>
              <span className="text-slate-400">Your Actual Est:</span> {formatCurrency(actualYear1OpEx)}
            </span>
          }
          explanation="The 50% Rule assumes half your rental income will go to operating expenses (not including mortgage). We compare your itemized expenses against this rule to see if your estimates are realistic or overly optimistic."
        />
      </div>
    </Accordion>
  )
}
