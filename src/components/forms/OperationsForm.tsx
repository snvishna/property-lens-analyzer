import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { Button } from "../ui/Button"

export function OperationsForm() {
  const store = useAppStore()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Income</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Gross Monthly Rent ($)" htmlFor="grossMonthlyRent" tooltip="Total expected monthly rental income from all units when fully occupied.">
            <Input id="grossMonthlyRent" type="number" value={store.grossMonthlyRent || ''} onChange={e => store.updateState({ grossMonthlyRent: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Other Monthly Income ($)" htmlFor="otherMonthlyIncome" tooltip="Additional income from parking, laundry, pet fees, or storage.">
            <Input id="otherMonthlyIncome" type="number" value={store.otherMonthlyIncome || ''} onChange={e => store.updateState({ otherMonthlyIncome: Number(e.target.value) })} />
          </FormGroup>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Operating Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Monthly Property Taxes ($)" htmlFor="propertyTaxesMonthly" tooltip="Estimated monthly real estate taxes.">
            <Input id="propertyTaxesMonthly" type="number" value={store.propertyTaxesMonthly || ''} onChange={e => store.updateState({ propertyTaxesMonthly: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Monthly Insurance ($)" htmlFor="insuranceMonthly" tooltip="Estimated monthly cost of landlord insurance (hazard, liability, etc).">
            <Input id="insuranceMonthly" type="number" value={store.insuranceMonthly || ''} onChange={e => store.updateState({ insuranceMonthly: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Monthly HOA ($)" htmlFor="hoaMonthly" tooltip="Monthly Homeowners Association fees, if applicable.">
            <Input id="hoaMonthly" type="number" value={store.hoaMonthly || ''} onChange={e => store.updateState({ hoaMonthly: Number(e.target.value) })} />
          </FormGroup>
          
          {/* Utilities */}
          <div className="md:col-span-2 mt-2 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Utilities</h4>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={store.useItemizedUtilities} onChange={e => store.updateState({ useItemizedUtilities: e.target.checked })} />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${store.useItemizedUtilities ? 'bg-strategy' : 'bg-slate-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${store.useItemizedUtilities ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-slate-700">Itemize Utilities</span>
              </label>
            </div>
            
            {!store.useItemizedUtilities ? (
              <FormGroup label="Monthly Utilities ($/mo)" htmlFor="utilitiesMonthly" tooltip="Total estimated monthly cost for all utilities (water, garbage, gas, electric).">
                <Input id="utilitiesMonthly" type="number" value={store.utilitiesMonthly || ''} onChange={e => store.updateState({ utilitiesMonthly: Number(e.target.value) })} />
              </FormGroup>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Water/Sewer ($/mo)" htmlFor="waterSewerMonthly" tooltip="Average monthly cost for water and sewer utilities.">
                  <Input id="waterSewerMonthly" type="number" value={store.waterSewerMonthly || ''} onChange={e => store.updateState({ waterSewerMonthly: Number(e.target.value) })} />
                </FormGroup>
                <FormGroup label="Garbage ($/mo)" htmlFor="garbageMonthly" tooltip="Average monthly cost for trash collection.">
                  <Input id="garbageMonthly" type="number" value={store.garbageMonthly || ''} onChange={e => store.updateState({ garbageMonthly: Number(e.target.value) })} />
                </FormGroup>
                <FormGroup label="Gas ($/mo)" htmlFor="gasMonthly" tooltip="Average monthly cost for gas.">
                  <Input id="gasMonthly" type="number" value={store.gasMonthly || ''} onChange={e => store.updateState({ gasMonthly: Number(e.target.value) })} />
                </FormGroup>
                <FormGroup label="Electric ($/mo)" htmlFor="electricMonthly" tooltip="Average monthly cost for electricity.">
                  <Input id="electricMonthly" type="number" value={store.electricMonthly || ''} onChange={e => store.updateState({ electricMonthly: Number(e.target.value) })} />
                </FormGroup>
              </div>
            )}
          </div>
          
          <FormGroup label="Other Monthly Expenses ($)" htmlFor="otherExpensesMonthly" tooltip="Any other fixed monthly operating expenses.">
            <Input id="otherExpensesMonthly" type="number" value={store.otherExpensesMonthly || ''} onChange={e => store.updateState({ otherExpensesMonthly: Number(e.target.value) })} />
          </FormGroup>

          <FormGroup label="Vacancy Rate (%)" htmlFor="vacancyPct" tooltip="Expected percentage of gross income lost due to empty units or turnover. Typically 5-10%.">
            <Input id="vacancyPct" type="number" step="0.1" value={store.vacancyPct * 100 || ''} onChange={e => store.updateState({ vacancyPct: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="Management Fee (%)" htmlFor="managementPct" tooltip="Percentage of collected gross income paid to a property management company. Typically 8-12%.">
            <Input id="managementPct" type="number" step="0.1" value={store.managementPct * 100 || ''} onChange={e => store.updateState({ managementPct: Number(e.target.value) / 100 })} />
          </FormGroup>
          <FormGroup label="Maintenance (%)" htmlFor="maintenancePct" tooltip="Percentage of gross income set aside for routine repairs and upkeep. Typically 5-10%.">
            <Input id="maintenancePct" type="number" step="0.1" value={store.maintenancePct * 100 || ''} onChange={e => store.updateState({ maintenancePct: Number(e.target.value) / 100 })} />
          </FormGroup>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <FormGroup label="Capital Expenditures (CapEx) (%)" htmlFor="capExPct" tooltip="Percentage of gross income reserved for major replacements (roof, HVAC, appliances). Typically 5-10%.">
          <Input id="capExPct" type="number" step="0.1" value={store.capExPct * 100 || ''} onChange={e => store.updateState({ capExPct: Number(e.target.value) / 100 })} disabled={store.useItemizedCapEx} />
        </FormGroup>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-medium text-slate-700">Itemize Large Expenses Instead?</span>
          <Switch checked={store.useItemizedCapEx} onCheckedChange={c => store.updateState({ useItemizedCapEx: c })} />
        </div>

        {store.useItemizedCapEx && (
          <div className="mt-4 space-y-2">
            {store.itemizedCapEx.map((item, i) => (
              <div key={item.id} className="flex gap-2 items-center">
                <Input value={item.description} onChange={e => {
                  const newItems = [...store.itemizedCapEx];
                  newItems[i].description = e.target.value;
                  store.updateState({ itemizedCapEx: newItems });
                }} placeholder="Description" />
                <Input type="number" value={item.cost || ''} onChange={e => {
                  const newItems = [...store.itemizedCapEx];
                  newItems[i].cost = Number(e.target.value);
                  store.updateState({ itemizedCapEx: newItems });
                }} placeholder="Cost ($)" className="w-24" />
                <Input type="number" value={item.year || ''} onChange={e => {
                  const newItems = [...store.itemizedCapEx];
                  newItems[i].year = Number(e.target.value);
                  store.updateState({ itemizedCapEx: newItems });
                }} placeholder="Year" className="w-20" />
                <Button variant="ghost" size="icon" onClick={() => {
                  store.updateState({ itemizedCapEx: store.itemizedCapEx.filter(x => x.id !== item.id) });
                }}>✕</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => {
              store.updateState({ itemizedCapEx: [...store.itemizedCapEx, { id: Date.now().toString(), description: '', cost: 0, year: 1 }] });
            }}>+ Add Expense</Button>
          </div>
        )}
      </div>
    </div>
  )
}
