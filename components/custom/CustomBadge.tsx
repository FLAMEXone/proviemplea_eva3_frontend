import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const customBadgeVariants = cva(
  "inline-flex items-center gap-1.5 shadow-none border font-bold transition-colors",
  {
    variants: {
      color: {
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50",
        blue: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50",
        slate: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
        amber: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50",
        rose: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50",
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50",
        primary: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30",
        "glass-blue": "bg-blue-500/10 text-blue-300 border-blue-400/30",
        "glass-emerald": "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
      },
      size: {
        sm: "px-2 py-0.5 text-[9px] rounded-full [&>svg]:w-3 [&>svg]:h-3",
        md: "px-2.5 py-1 text-xs rounded-full [&>svg]:w-3.5 [&>svg]:h-3.5",
        lg: "px-3 py-1.5 text-sm rounded-full [&>svg]:w-4 [&>svg]:h-4",
      },
      animate: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      color: "slate",
      size: "md",
      animate: "none",
    },
  }
);

interface CustomBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Badge>, "color">,
    VariantProps<typeof customBadgeVariants> {
  icon?: React.ReactNode;
  text: string;
}

export function CustomBadge({
  color,
  size,
  animate,
  icon,
  text,
  className,
  ...props
}: CustomBadgeProps) {
  return (
    <Badge
      className={cn(customBadgeVariants({ color, size, animate }), className)}
      variant="outline"
      {...props}
    >
      {icon}
      {text}
    </Badge>
  );
}
