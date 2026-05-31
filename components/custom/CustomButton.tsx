"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const customButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      theme: {
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 focus-visible:ring-blue-500",
        emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 focus-visible:ring-emerald-500",
        "emerald-soft": "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 focus-visible:ring-emerald-500",
        "blue-soft": "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 focus-visible:ring-blue-500",
        slate: "bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-md shadow-slate-500/10 hover:shadow-slate-500/20 focus-visible:ring-slate-500",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:text-slate-200",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-xl",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      theme: "blue",
      size: "default",
    },
  }
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, theme, size, isLoading, leftIcon, rightIcon, children, disabled, asChild = false, ...props }, ref) => {
    if (asChild) {
      const Comp = (props as any).as || "button";
      return (
        <Comp
          className={cn(customButtonVariants({ theme, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(customButtonVariants({ theme, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton, customButtonVariants };
