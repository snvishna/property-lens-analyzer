import * as React from "react"
import { cn } from "../../lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <label className={cn("inline-flex items-center cursor-pointer", className)}>
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onCheckedChange(e.target.checked)} 
          ref={ref}
          {...props}
        />
        <div className={cn(
          "relative w-11 h-6 rounded-full transition-colors",
          checked ? "bg-strategy" : "bg-slate-200"
        )}>
          <div className={cn(
            "absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform",
            checked ? "translate-x-full" : "translate-x-0"
          )} />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
