import { useAppStore } from "../../store/useAppStore"
import type { StrategyType } from "../../types"

const strategies = [
  { id: 'cashflow', name: 'Cash Flow', desc: 'Maximize immediate monthly income.', emoji: '💰' },
  { id: 'valueadd', name: 'Value-Add (BRRRR)', desc: 'Force appreciation through renovations.', emoji: '🏦' },
  { id: 'appreciation', name: 'Appreciation', desc: 'Long-term wealth growth in high-demand markets.', emoji: '📈' }
]

export function StrategySelector() {
  const store = useAppStore()

  const handleSelect = (s: StrategyType) => {
    store.updateState({ strategy: s })
    
    // Update CSS variables for theme
    const root = document.documentElement;
    if (s === 'cashflow') {
      root.style.setProperty('--strategy-color', '#1565C0');
      root.style.setProperty('--strategy-color-alpha', 'rgba(21, 101, 192, 0.1)');
    } else if (s === 'valueadd') {
      root.style.setProperty('--strategy-color', '#2E7D32');
      root.style.setProperty('--strategy-color-alpha', 'rgba(46, 125, 50, 0.1)');
    } else {
      root.style.setProperty('--strategy-color', '#6A1B9A');
      root.style.setProperty('--strategy-color-alpha', 'rgba(106, 27, 154, 0.1)');
    }
  }

  return (
    <div className="space-y-3">
      {strategies.map(s => {
        const isSelected = store.strategy === s.id;
        return (
          <label 
            key={s.id} 
            className={`group flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              isSelected ? 'border-strategy bg-strategy/5 ring-1 ring-strategy' : 'border-slate-200 hover:border-strategy hover:bg-slate-50'
            }`}
            onClick={() => handleSelect(s.id as StrategyType)}
          >
            <input type="radio" name="strategy" className="sr-only" checked={isSelected} readOnly />
            <div className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mr-4 ${isSelected ? 'bg-strategy text-white' : 'bg-slate-200'}`}>
                {s.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{s.name}</h3>
                <p className="text-sm text-slate-600 mt-0.5">{s.desc}</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-strategy' : 'border-slate-300'}`}>
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-strategy" />}
            </div>
          </label>
        )
      })}
    </div>
  )
}
