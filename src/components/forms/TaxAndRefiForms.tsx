import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"

export function TaxForm() {
  const store = useAppStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormGroup label="Marginal Tax Rate (%)" htmlFor="marginalTaxRate">
        <Input id="marginalTaxRate" type="number" step="0.1" value={store.marginalTaxRate * 100 || ''} onChange={e => store.updateState({ marginalTaxRate: Number(e.target.value) / 100 })} />
      </FormGroup>
      
      <FormGroup label="Capital Gains Rate (%)" htmlFor="capitalGainsTaxRate">
        <Input id="capitalGainsTaxRate" type="number" step="0.1" value={store.capitalGainsTaxRate * 100 || ''} onChange={e => store.updateState({ capitalGainsTaxRate: Number(e.target.value) / 100 })} />
      </FormGroup>

      <FormGroup label="Depreciation Recapture (%)" htmlFor="depreciationRecaptureRate">
        <Input id="depreciationRecaptureRate" type="number" step="0.1" value={store.depreciationRecaptureRate * 100 || ''} onChange={e => store.updateState({ depreciationRecaptureRate: Number(e.target.value) / 100 })} />
      </FormGroup>
      
      <FormGroup label="Land Value (%)" htmlFor="landValuePct" tooltip="Percentage of purchase price attributed to land (cannot be depreciated).">
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
          <FormGroup label="Refinance Month" htmlFor="refinanceMonth">
            <Input id="refinanceMonth" type="number" value={store.refinanceMonth || ''} onChange={e => store.updateState({ refinanceMonth: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="New LTV (%)" htmlFor="refinanceLtvPct">
            <Input id="refinanceLtvPct" type="number" step="0.1" value={store.refinanceLtvPct * 100 || ''} onChange={e => store.updateState({ refinanceLtvPct: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="New Interest Rate (%)" htmlFor="refinanceInterestRate">
            <Input id="refinanceInterestRate" type="number" step="0.1" value={store.refinanceInterestRate * 100 || ''} onChange={e => store.updateState({ refinanceInterestRate: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="Refi Closing Costs ($)" htmlFor="refinanceClosingCosts">
            <Input id="refinanceClosingCosts" type="number" value={store.refinanceClosingCosts || ''} onChange={e => store.updateState({ refinanceClosingCosts: Number(e.target.value) })} />
          </FormGroup>
        </div>
      )}
    </div>
  )
}
