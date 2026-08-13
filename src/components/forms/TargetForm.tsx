import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"

export function TargetForm() {
  const store = useAppStore()

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Investment Targets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormGroup label="Min Cash Flow ($)" htmlFor="targetMinCashFlow" tooltip="Minimum acceptable monthly net cash flow.">
          <Input id="targetMinCashFlow" type="number" value={store.targetMinCashFlow === 0 ? 0 : (store.targetMinCashFlow || '')} onChange={e => store.updateState({ targetMinCashFlow: Number(e.target.value) })} />
        </FormGroup>
        <FormGroup label="Min CoC ROI (%)" htmlFor="targetMinCocRoi" tooltip="Minimum acceptable cash-on-cash return.">
          <Input id="targetMinCocRoi" type="number" step="0.1" value={store.targetMinCocRoi === 0 ? 0 : (store.targetMinCocRoi * 100 || '')} onChange={e => store.updateState({ targetMinCocRoi: Number(e.target.value) / 100 })} />
        </FormGroup>
        <FormGroup label="Min Forced Equity ($)" htmlFor="targetMinForcedEquity" tooltip="Minimum acceptable immediate equity created after renovations.">
          <Input id="targetMinForcedEquity" type="number" value={store.targetMinForcedEquity === 0 ? 0 : (store.targetMinForcedEquity || '')} onChange={e => store.updateState({ targetMinForcedEquity: Number(e.target.value) })} />
        </FormGroup>
      </div>
    </div>
  )
}
