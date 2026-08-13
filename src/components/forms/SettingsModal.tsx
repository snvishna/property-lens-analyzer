import { useAppStore } from "../../store/useAppStore"
import { FormGroup } from "./FormGroup"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { Button } from "../ui/Button"

export function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const store = useAppStore()

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 overflow-hidden">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Settings & Data Sources</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Use Live APIs (BYOK)</span>
            <Switch checked={store.useLiveApis} onCheckedChange={c => store.updateState({ useLiveApis: c })} />
          </div>
          
          {store.useLiveApis ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Provide your own API keys to fetch live financial data. Keys are stored locally in your browser.</p>
              <FormGroup label="FRED API Key" htmlFor="fredApiKey">
                <Input type="password" id="fredApiKey" value={store.fredApiKey} onChange={e => store.updateState({ fredApiKey: e.target.value })} />
              </FormGroup>
              <FormGroup label="Alpha Vantage API Key" htmlFor="alphaVantageApiKey">
                <Input type="password" id="alphaVantageApiKey" value={store.alphaVantageApiKey} onChange={e => store.updateState({ alphaVantageApiKey: e.target.value })} />
              </FormGroup>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Hardcoded Fallbacks</p>
              <FormGroup label="S&P 500 Expected Return (%)" htmlFor="sp500ExpectedReturnPct">
                <Input type="number" step="0.1" id="sp500ExpectedReturnPct" value={store.sp500ExpectedReturnPct * 100} onChange={e => store.updateState({ sp500ExpectedReturnPct: Number(e.target.value)/100 })} />
              </FormGroup>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button variant="default" onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  )
}
