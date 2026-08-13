import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"

export function TaxForm() {
  const store = useAppStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormGroup label="Marginal Tax Rate (%)" htmlFor="marginalTaxRate" tooltip="Your highest state+federal income tax bracket. Used to calculate tax savings from depreciation.">
        <Input id="marginalTaxRate" type="number" step="0.1" value={store.marginalTaxRate * 100 || ''} onChange={e => store.updateState({ marginalTaxRate: Number(e.target.value) / 100 })} />
      </FormGroup>
      
      <FormGroup label="Capital Gains Rate (%)" htmlFor="capitalGainsTaxRate" tooltip="Tax rate applied to the profit when you sell the property (usually 15-20%).">
        <Input id="capitalGainsTaxRate" type="number" step="0.1" value={store.capitalGainsTaxRate * 100 || ''} onChange={e => store.updateState({ capitalGainsTaxRate: Number(e.target.value) / 100 })} />
      </FormGroup>

      <FormGroup label="Depreciation Recapture (%)" htmlFor="depreciationRecaptureRate" tooltip="Tax rate applied to all the depreciation you claimed over the years when you finally sell (capped at 25%).">
        <Input id="depreciationRecaptureRate" type="number" step="0.1" value={store.depreciationRecaptureRate * 100 || ''} onChange={e => store.updateState({ depreciationRecaptureRate: Number(e.target.value) / 100 })} />
      </FormGroup>
      
      <FormGroup label="Land Value (%)" htmlFor="landValuePct" tooltip="Percentage of purchase price attributed to land (Land cannot be depreciated). Typically 10-20%.">
        <Input id="landValuePct" type="number" step="0.1" value={store.landValuePct * 100 || ''} onChange={e => store.updateState({ landValuePct: Number(e.target.value) / 100 })} />
      </FormGroup>
    </div>
  )
}

export function RefinanceForm() {
  const store = useAppStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-700">Enable Refinancing Event (BRRRR Cash-Out)</span>
        <Switch checked={store.enableRefinance} onCheckedChange={c => store.updateState({ enableRefinance: c })} />
      </div>

      {store.enableRefinance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <FormGroup label="Refinance Month" htmlFor="refinanceMonth" tooltip="The month you plan to refinance the property (e.g., month 6 after rehab is finished).">
            <Input id="refinanceMonth" type="number" value={store.refinanceMonth || ''} onChange={e => store.updateState({ refinanceMonth: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="New LTV (%)" htmlFor="refinanceLtvPct" tooltip="The new Loan-to-Value based on the After Repair Value (ARV). Typically 70-75% for cash-out refis.">
            <Input id="refinanceLtvPct" type="number" step="0.1" value={store.refinanceLtvPct * 100 || ''} onChange={e => store.updateState({ refinanceLtvPct: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="New Interest Rate (%)" htmlFor="refinanceInterestRate" tooltip="The interest rate on the new permanent loan.">
            <Input id="refinanceInterestRate" type="number" step="0.1" value={store.refinanceInterestRate * 100 || ''} onChange={e => store.updateState({ refinanceInterestRate: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="Refi Closing Costs ($)" htmlFor="refinanceClosingCosts" tooltip="Fees paid to close the new loan.">
            <Input id="refinanceClosingCosts" type="number" value={store.refinanceClosingCosts || ''} onChange={e => store.updateState({ refinanceClosingCosts: Number(e.target.value) })} />
          </FormGroup>
        </div>
      )}
    </div>
  )
}
