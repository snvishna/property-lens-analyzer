import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

export interface AccordionProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: React.ReactNode;
}

const Accordion = React.forwardRef<HTMLDetailsElement, AccordionProps>(
  ({ className, title, children, open = true, ...props }, ref) => {
    return (
      <details 
        ref={ref}
        className={cn(
          "group border border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden", 
          className
        )}
        open={open}
        {...props}
      >
        <summary className="flex items-center justify-between p-5 lg:p-6 text-lg font-semibold text-slate-800 cursor-pointer list-none select-none active:scale-[0.99] transition-transform">
          {title}
          <div className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300 transform group-open:rotate-180">
            <ChevronDown className="w-5 h-5" />
          </div>
        </summary>
        <div className="p-5 lg:p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      </details>
    )
  }
)
Accordion.displayName = "Accordion"

export { Accordion }
