import * as React from "react"
import { Label } from "../ui/Label"
import { TooltipIcon } from "../ui/TooltipIcon"

interface FormGroupProps {
  label: string;
  tooltip?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ label, tooltip, htmlFor, children, className }: FormGroupProps) {
  return (
    <div className={`space-y-1.5 ${className || ''}`}>
      <div className="flex items-center">
        <Label htmlFor={htmlFor}>{label}</Label>
        {tooltip && <TooltipIcon content={tooltip} />}
      </div>
      {children}
    </div>
  )
}
