import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { Button } from "../ui/Button"

export function OperationsForm() {
  const store = useAppStore()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup label="Gross Monthly Rent" htmlFor="grossMonthlyRent" tooltip="Total rent collected before expenses.">
          <Input 
            id="grossMonthlyRent" type="number" 
            value={store.grossMonthlyRent || ''} 
            onChange={e => store.updateState({ grossMonthlyRent: Number(e.target.value) })}
          />
        </FormGroup>
        <FormGroup label="Other Monthly Income" htmlFor="otherMonthlyIncome">
          <Input 
            id="otherMonthlyIncome" type="number" 
            value={store.otherMonthlyIncome || ''} 
            onChange={e => store.updateState({ otherMonthlyIncome: Number(e.target.value) })}
          />
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup label="Property Taxes ($/mo)" htmlFor="propertyTaxesMonthly">
          <Input id="propertyTaxesMonthly" type="number" value={store.propertyTaxesMonthly || ''} onChange={e => store.updateState({ propertyTaxesMonthly: Number(e.target.value) })} />
        </FormGroup>
        <FormGroup label="Insurance ($/mo)" htmlFor="insuranceMonthly">
          <Input id="insuranceMonthly" type="number" value={store.insuranceMonthly || ''} onChange={e => store.updateState({ insuranceMonthly: Number(e.target.value) })} />
        </FormGroup>
        <FormGroup label="HOA ($/mo)" htmlFor="hoaMonthly">
          <Input id="hoaMonthly" type="number" value={store.hoaMonthly || ''} onChange={e => store.updateState({ hoaMonthly: Number(e.target.value) })} />
        </FormGroup>
        <FormGroup label="Other Expenses ($/mo)" htmlFor="otherExpensesMonthly">
          <Input id="otherExpensesMonthly" type="number" value={store.otherExpensesMonthly || ''} onChange={e => store.updateState({ otherExpensesMonthly: Number(e.target.value) })} />
        </FormGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormGroup label="Vacancy (%)" htmlFor="vacancyPct">
          <Input id="vacancyPct" type="number" step="0.01" value={store.vacancyPct * 100 || ''} onChange={e => store.updateState({ vacancyPct: Number(e.target.value) / 100 })} />
        </FormGroup>
        <FormGroup label="Repairs (%)" htmlFor="maintenancePct">
          <Input id="maintenancePct" type="number" step="0.01" value={store.maintenancePct * 100 || ''} onChange={e => store.updateState({ maintenancePct: Number(e.target.value) / 100 })} />
        </FormGroup>
        <FormGroup label="Mgmt. (%)" htmlFor="managementPct">
          <Input id="managementPct" type="number" step="0.01" value={store.managementPct * 100 || ''} onChange={e => store.updateState({ managementPct: Number(e.target.value) / 100 })} />
        </FormGroup>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <FormGroup label="Capital Expenditures (CapEx) (%)" htmlFor="capExPct" tooltip="Savings fund for large, infrequent expenses.">
          <Input id="capExPct" type="number" step="0.01" value={store.capExPct * 100 || ''} onChange={e => store.updateState({ capExPct: Number(e.target.value) / 100 })} disabled={store.useItemizedCapEx} />
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
