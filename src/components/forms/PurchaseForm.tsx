import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

export function PurchaseForm() {
  const store = useAppStore()
  
  const [newRehabName, setNewRehabName] = useState("")
  const [newRehabCost, setNewRehabCost] = useState("")

  const handleAddItem = () => {
    if (!newRehabName || !newRehabCost) return;
    const newItem = {
      id: Math.random().toString(36).substring(7),
      name: newRehabName,
      cost: Number(newRehabCost)
    }
    store.updateState({ itemizedRehab: [...store.itemizedRehab, newItem] })
    setNewRehabName("")
    setNewRehabCost("")
  }

  const handleRemoveItem = (id: string) => {
    store.updateState({ itemizedRehab: store.itemizedRehab.filter(item => item.id !== id) })
  }

  return (
    <div className="space-y-8">
      {/* Property Profile */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Property Profile</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormGroup label="Bedrooms" htmlFor="bedrooms" tooltip="Number of bedrooms">
            <Input id="bedrooms" type="number" value={store.bedrooms || ''} onChange={e => store.updateState({ bedrooms: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Bathrooms" htmlFor="bathrooms" tooltip="Number of bathrooms">
            <Input id="bathrooms" type="number" step="0.5" value={store.bathrooms || ''} onChange={e => store.updateState({ bathrooms: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Square Feet" htmlFor="squareFeet" tooltip="Total interior square footage">
            <Input id="squareFeet" type="number" value={store.squareFeet || ''} onChange={e => store.updateState({ squareFeet: Number(e.target.value) })} />
          </FormGroup>
          <FormGroup label="Year Built" htmlFor="yearBuilt" tooltip="The year the property was originally constructed">
            <Input id="yearBuilt" type="number" value={store.yearBuilt || ''} onChange={e => store.updateState({ yearBuilt: Number(e.target.value) })} />
          </FormGroup>
        </div>
      </section>

      {/* Purchase Details */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Purchase Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Purchase Price ($)" htmlFor="purchasePrice" tooltip="The total agreed-upon price to acquire the property." className="md:col-span-2">
            <Input id="purchasePrice" type="number" value={store.purchasePrice || ''} onChange={e => store.updateState({ purchasePrice: Number(e.target.value) })} />
          </FormGroup>
          
          <FormGroup label="Closing Costs ($)" htmlFor="closingCosts" tooltip="One-time fees paid at closing (e.g., title insurance, origination fees, appraisal). Usually 2-5% of purchase price.">
            <Input id="closingCosts" type="number" value={store.closingCosts || ''} onChange={e => store.updateState({ closingCosts: Number(e.target.value) })} />
          </FormGroup>

          <FormGroup label="After Repair Value (ARV)" htmlFor="arv" tooltip="Estimated market value after all renovations.">
            <Input id="arv" type="number" value={store.arv || ''} onChange={e => store.updateState({ arv: Number(e.target.value) })} />
          </FormGroup>
        </div>
      </section>

      {/* Rehab Budget */}
      <section>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Rehab Budget</h3>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={store.useItemizedRehab} onChange={e => store.updateState({ useItemizedRehab: e.target.checked })} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${store.useItemizedRehab ? 'bg-strategy' : 'bg-slate-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${store.useItemizedRehab ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-slate-700">Itemize Rehab</span>
          </label>
        </div>

        {!store.useItemizedRehab ? (
          <FormGroup label="Lump Sum Rehab Budget ($)" htmlFor="rehabCosts" tooltip="Total estimated cost of renovations and repairs needed to achieve the ARV.">
            <Input id="rehabCosts" type="number" value={store.rehabCosts || ''} onChange={e => store.updateState({ rehabCosts: Number(e.target.value) })} />
          </FormGroup>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex gap-2 mb-4">
                <Input placeholder="e.g. Roof, Kitchen, Paint" value={newRehabName} onChange={e => setNewRehabName(e.target.value)} className="flex-1" />
                <Input type="number" placeholder="Cost ($)" value={newRehabCost} onChange={e => setNewRehabCost(e.target.value)} className="w-32" />
                <button onClick={handleAddItem} className="px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-2">
                {store.itemizedRehab.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-white p-2 border rounded text-sm">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">${item.cost.toLocaleString()}</span>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </li>
                ))}
                {store.itemizedRehab.length === 0 && (
                  <li className="text-slate-500 text-sm italic">No items added yet.</li>
                )}
              </ul>
              {store.itemizedRehab.length > 0 && (
                <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                  <span>Total Itemized Rehab:</span>
                  <span>${store.itemizedRehab.reduce((acc, item) => acc + item.cost, 0).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
