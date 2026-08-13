import * as React from 'react'
import { HelpCircle, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

interface MetricCardProps {
  title: string;
  value: string | React.ReactNode;
  subtitle?: string;
  target?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  formula?: React.ReactNode;
  explanation?: React.ReactNode;
}

export function MetricCard({ title, value, subtitle, target, status = 'neutral', formula, explanation }: MetricCardProps) {
  const [expanded, setExpanded] = React.useState(false)

  // We can just rely on basic tailwind for this version, but ExecutiveSummary is dark!
  // I will add a 'dark' theme option to MetricCard if used inside ExecutiveSummary, or remove the dark mode from Executive Summary since standard MetricCard uses light classes.
  // Actually, I'll pass a 'theme' prop. Wait, simpler to just modify the borderColors.
  
  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-900/20',
    warning: 'border-amber-200 bg-amber-50/30 dark:border-amber-900/50 dark:bg-amber-900/20',
    danger: 'border-red-200 bg-red-50/30 dark:border-red-900/50 dark:bg-red-900/20',
    neutral: 'border-slate-200 bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/50'
  }

  const statusColors = {
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    neutral: 'text-slate-800 dark:text-slate-100'
  }

  return (
    <div className={cn("p-4 rounded-lg border transition-all", borderColors[status])}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-slate-500 font-medium">{title}</p>
          <p className={cn("text-xl font-bold mt-0.5", statusColors[status])}>
            {value}
            {subtitle && <span className="text-sm font-normal text-slate-500 ml-2">{subtitle}</span>}
          </p>
          {target && <p className="text-[10px] text-slate-400 mt-1">Target: {target}</p>}
        </div>
        
        {(formula || explanation) && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
            title="How is this calculated?"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
          </button>
        )}
      </div>

      {expanded && (formula || explanation) && (
        <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {formula && (
            <div className="font-mono bg-white p-2 rounded border border-slate-200">
              {formula}
            </div>
          )}
          {explanation && (
            <p className="leading-relaxed">{explanation}</p>
          )}
        </div>
      )}
    </div>
  )
}
