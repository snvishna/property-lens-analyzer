import * as React from 'react'
import { StrategySelector } from './components/forms/StrategySelector'
import { PurchaseForm } from './components/forms/PurchaseForm'
import { DebtForm } from './components/forms/DebtForm'
import { OperationsForm } from './components/forms/OperationsForm'
import { TaxForm, RefinanceForm } from './components/forms/TaxAndRefiForms'
import { InvestmentShowdown } from './components/dashboard/InvestmentShowdown'
import { ExecutivePerformance } from './components/dashboard/ExecutivePerformance'
import { QuickScreeners } from './components/dashboard/QuickScreeners'
import { PropertyFinancialEngine } from './components/dashboard/PropertyFinancialEngine'
import { DebtSafetyAnalysis } from './components/dashboard/DebtSafetyAnalysis'
import { MonthlyBreakdown } from './components/dashboard/MonthlyBreakdown'
import { DebtAmortization } from './components/dashboard/DebtAmortization'
import { SaleAnalysis } from './components/dashboard/SaleAnalysis'
import { AnalysisOverTime } from './components/dashboard/AnalysisOverTime'
import { WealthWaterfall } from './components/charts/WealthWaterfall'
import { EquityProjection } from './components/charts/EquityProjection'
import { SettingsModal } from './components/forms/SettingsModal'
import { ScenariosModal } from './components/forms/ScenariosModal'
import { useAppStore } from './store/useAppStore'
import { Settings, RefreshCw, Bookmark } from 'lucide-react'
import { Accordion } from './components/ui/Accordion'

function App() {
  const strategy = useAppStore(state => state.strategy)
  const resetState = useAppStore(state => state.resetState)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [isScenariosOpen, setIsScenariosOpen] = React.useState(false)

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all inputs to defaults?')) {
      resetState();
    }
  }

  return (
    <div className={`lg:h-screen lg:overflow-hidden min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans theme-${strategy}`}>
      <header className="flex-shrink-0 bg-white border-b z-10 border-slate-200 shadow-sm relative">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                PL
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">PropertyLens</h1>
                <p className="text-slate-500 text-sm leading-tight">The Professional Real Estate Investment Analyzer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsScenariosOpen(true)}
                className="p-2 rounded-full text-slate-500 hover:text-strategy hover:bg-strategy/10 transition-colors flex items-center gap-1.5 font-medium text-sm"
                title="Manage Scenarios"
              >
                <Bookmark className="w-5 h-5" />
                <span className="hidden sm:inline">Scenarios</span>
              </button>
              <button 
                onClick={handleReset}
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Reset All Inputs"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Settings & API Keys"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 lg:min-h-0 container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 py-6 lg:py-0">
        
        {/* Left Column: Inputs */}
        <section className="lg:w-5/12 lg:h-full lg:overflow-y-auto custom-scrollbar lg:py-6 lg:pr-4 space-y-6">
          <Accordion title="Investment Strategy" open={true}>
            <StrategySelector />
          </Accordion>

          <Accordion title="Purchase & Loan" open={true}>
            <div className="space-y-6">
              <PurchaseForm />
              <div className="border-t border-slate-200 pt-6">
                <DebtForm />
              </div>
            </div>
          </Accordion>

          <Accordion title="Income & Expenses">
            <OperationsForm />
          </Accordion>

          <Accordion title="Tax & Depreciation">
            <TaxForm />
          </Accordion>

          <Accordion title="Refinancing (BRRRR Cash-Out)">
            <RefinanceForm />
          </Accordion>
        </section>

        {/* Right Column: Outputs */}
        <section className="lg:w-7/12 lg:h-full lg:overflow-y-auto custom-scrollbar lg:py-6 lg:pr-4 space-y-6">
          <InvestmentShowdown />
          <ExecutivePerformance />
          <QuickScreeners />
          <PropertyFinancialEngine />
          <MonthlyBreakdown />
          <DebtSafetyAnalysis />
          <DebtAmortization />
          <WealthWaterfall />
          <EquityProjection />
          <SaleAnalysis />
          <AnalysisOverTime />
        </section>
        
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      <ScenariosModal 
        isOpen={isScenariosOpen}
        onClose={() => setIsScenariosOpen(false)}
      />
    </div>
  )
}

export default App
