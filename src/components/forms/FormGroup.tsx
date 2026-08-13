import * as React from "react"
import { Label } from "../ui/Label"
import { TooltipIcon } from "../ui/TooltipIcon"

export interface FormGroupProps {
  label: string
  tooltip?: string
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export function FormGroup({ label, tooltip, htmlFor, children, className }: FormGroupProps) {
  return (
    <div className={`flex flex-col h-full ${className || ''}`}>
      <div className="flex items-start justify-between mb-1.5 gap-2">
        <Label htmlFor={htmlFor} className="leading-tight flex-1 break-words whitespace-normal">{label}</Label>
        {tooltip && <div className="shrink-0 mt-0.5"><TooltipIcon content={tooltip} /></div>}
      </div>
      <div className="mt-auto">
        {children}
      </div>
    </div>
  )
}
