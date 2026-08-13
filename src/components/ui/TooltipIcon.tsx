import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle } from "lucide-react";

export function TooltipIcon({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const updatePosition = () => {
        if (iconRef.current) {
          const rect = iconRef.current.getBoundingClientRect();
          setCoords({
            top: rect.top,
            left: rect.left + rect.width / 2,
          });
        }
      };

      updatePosition();
      // Listen to scroll events on any scrolling container
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  return (
    <div 
      className="relative inline-flex items-center ml-1.5 translate-y-[-1px]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={iconRef}
    >
      <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors cursor-help ${isOpen ? 'bg-strategy/10 border-strategy/30 text-strategy' : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'}`}>
        <HelpCircle className="h-3 w-3" />
      </div>

      {isOpen && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none w-56 -translate-x-1/2 -translate-y-full pb-2"
          style={{ top: coords.top, left: coords.left }}
        >
          <div className="bg-slate-900 text-white text-xs rounded-xl py-3 px-4 shadow-xl font-normal leading-relaxed break-words whitespace-normal relative">
            {content}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900 absolute left-1/2 -translate-x-1/2 bottom-[-6px]"></div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
