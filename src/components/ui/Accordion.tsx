import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronRight } from "lucide-react"

export interface AccordionProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: React.ReactNode;
}

const Accordion = React.forwardRef<HTMLDetailsElement, AccordionProps>(
  ({ className, title, children, open = true, ...props }, ref) => {
    return (
      <details 
        ref={ref}
        className={cn(
          "group rounded-xl border border-slate-200 bg-white shadow-sm transition-colors open:bg-slate-50/50 open:border-slate-300", 
          className
        )}
        open={open}
        {...props}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-slate-800 transition-colors hover:text-slate-900 [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronRight className="h-5 w-5 text-slate-500 transition-transform duration-200 group-open:rotate-90" />
        </summary>
        <div className="px-5 pb-5 pt-0">
          {children}
        </div>
      </details>
    )
  }
)
Accordion.displayName = "Accordion"

export { Accordion }
