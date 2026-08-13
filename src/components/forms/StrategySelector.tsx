import { useAppStore } from "../../store/useAppStore"
import type { StrategyType } from "../../types"

const strategies = [
  { id: 'cashflow', name: 'Cash Flow', desc: 'Maximize immediate monthly income.', emoji: '💰' },
  { id: 'valueadd', name: 'Value-Add (BRRRR)', desc: 'Force appreciation through renovations.', emoji: '🏦' },
  { id: 'appreciation', name: 'Appreciation', desc: 'Long-term wealth growth in high-demand markets.', emoji: '📈' }
]

export function StrategySelector() {
  const { strategy, setInvestmentStrategy } = useAppStore();

  const handleSelect = (s: StrategyType) => {
    setInvestmentStrategy(s)
    
    const root = document.documentElement;
    if (s === 'cashflow') {
      root.style.setProperty('--strategy-color', '#3b82f6');
      root.style.setProperty('--strategy-color-alpha', 'rgba(59, 130, 246, 0.15)');
    } else if (s === 'valueadd') {
      root.style.setProperty('--strategy-color', '#10b981');
      root.style.setProperty('--strategy-color-alpha', 'rgba(16, 185, 129, 0.15)');
    } else {
      root.style.setProperty('--strategy-color', '#8b5cf6');
      root.style.setProperty('--strategy-color-alpha', 'rgba(139, 92, 246, 0.15)');
    }
  }

  return (
    <div className="space-y-3">
      {strategies.map(s => {
        const isSelected = strategy === s.id;
        return (
          <label 
            key={s.id} 
            className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white ${
              isSelected 
                ? 'border-2 border-strategy shadow-sm' 
                : 'border border-slate-200 hover:border-slate-300 hover:shadow-sm'
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
