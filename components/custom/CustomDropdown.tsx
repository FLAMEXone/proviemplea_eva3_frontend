"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { InlineDropdownMenuContent } from "@/components/custom/inline-dropdown-menu";

export interface DropdownOption {
  label: string;
  subLabel?: string;
  href: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  triggerText: string;
  options: DropdownOption[];
}

export function CustomDropdown({ triggerText, options }: CustomDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md shadow-blue-500/10 rounded-xl flex items-center gap-1.5 px-4 py-2 text-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
      >
        {triggerText}
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <InlineDropdownMenuContent 
        align="end" 
        className="w-52 rounded-2xl border border-slate-200/60 bg-white p-2 shadow-xl dark:border-slate-800/80 dark:bg-slate-950 z-[9999] opacity-100 pointer-events-auto block duration-150"
      >
        {options.map((opt, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link 
              href={opt.href}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer outline-none ${i > 0 ? "mt-1" : ""}`}
            >
              {opt.icon && opt.icon}
              <div>
                <span className="block font-bold">{opt.label}</span>
                {opt.subLabel && (
                  <span className="block text-[9px] text-slate-400 font-normal mt-0.5">
                    {opt.subLabel}
                  </span>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </InlineDropdownMenuContent>
    </DropdownMenu>
  );
}
