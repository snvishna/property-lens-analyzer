import { HelpCircle } from "lucide-react"

export function TooltipIcon({ content }: { content: string }) {
  return (
    <div className="group/tooltip relative inline-flex items-center ml-1.5 translate-y-[-1px]">
      <HelpCircle className="h-[14px] w-[14px] text-slate-400 hover:text-slate-600 cursor-help" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 transition-opacity group-hover/tooltip:opacity-100 z-50">
        <div className="bg-slate-900 text-slate-50 text-xs rounded-md py-2 px-3 shadow-lg font-normal leading-relaxed">
          {content}
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900 absolute left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  )
}
