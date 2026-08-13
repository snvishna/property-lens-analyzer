import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"

export function PurchaseForm() {
  const store = useAppStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormGroup 
        label="Purchase Price ($)" 
        htmlFor="purchasePrice"
        tooltip="The total price you are paying for the property."
        className="md:col-span-2"
      >
        <Input 
          id="purchasePrice" 
          type="number" 
          value={store.purchasePrice || ''} 
          onChange={e => store.updateState({ purchasePrice: Number(e.target.value) })}
        />
      </FormGroup>

      <FormGroup 
        label="Rehab Costs ($)" 
        htmlFor="rehabCosts"
        tooltip="Total cost of initial repairs to get the property rent-ready."
      >
        <Input 
          id="rehabCosts" 
          type="number" 
          value={store.rehabCosts || ''} 
          onChange={e => store.updateState({ rehabCosts: Number(e.target.value) })}
        />
      </FormGroup>

      <FormGroup 
        label="Closing Costs ($)" 
        htmlFor="closingCosts"
        tooltip="One-time fees paid to close the deal (2-5% typical)."
      >
        <Input 
          id="closingCosts" 
          type="number" 
          value={store.closingCosts || ''} 
          onChange={e => store.updateState({ closingCosts: Number(e.target.value) })}
        />
      </FormGroup>

      <FormGroup 
        label="After Repair Value (ARV)" 
        htmlFor="arv"
        tooltip="Estimated market value after all renovations."
        className="md:col-span-2"
      >
        <Input 
          id="arv" 
          type="number" 
          value={store.arv || ''} 
          onChange={e => store.updateState({ arv: Number(e.target.value) })}
        />
      </FormGroup>
    </div>
  )
}
