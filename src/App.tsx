import { useState } from 'react'
import { Settings } from 'lucide-react'
import { StrategySelector } from './components/forms/StrategySelector'
import { PurchaseForm } from './components/forms/PurchaseForm'
import { DebtForm } from './components/forms/DebtForm'
import { OperationsForm } from './components/forms/OperationsForm'
import { TaxForm, RefinanceForm } from './components/forms/TaxAndRefiForms'
import { SettingsModal } from './components/forms/SettingsModal'
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary'
import { QuickRules } from './components/dashboard/QuickRules'
import { AuditDetail } from './components/dashboard/AuditDetail'
import { WealthWaterfall } from './components/charts/WealthWaterfall'
import { EquityProjection } from './components/charts/EquityProjection'
import { Accordion } from './components/ui/Accordion'

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b z-10 border-slate-200 sticky top-0">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xl text-yellow-500">Lens</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">PropertyLens</h1>
                <p className="text-slate-500 text-sm leading-tight">Institutional Real Estate Analyzer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Settings & BYOK"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Inputs */}
        <section className="lg:w-5/12 space-y-6">
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
        <section className="lg:w-7/12 space-y-6">
          <ExecutiveSummary />
          <QuickRules />
          <WealthWaterfall />
          <EquityProjection />
          <AuditDetail />
        </section>
        
      </main>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default App
