import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-sm transition-all duration-300",
            "hover:border-slate-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strategy/20 focus-visible:border-strategy",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500/50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

