import * as React from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
}

export function FormField({ name, label, required, className, ...props }: FormFieldProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        {...props}
        className={`block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
          error
            ? "border-red-400 dark:border-red-600"
            : "border-slate-200 dark:border-slate-800"
        } ${className ?? ""}`}
      />
      {error && (
        <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  required?: boolean;
}

export function FormTextarea({ name, label, required, className, ...props }: FormTextareaProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...register(name)}
        {...props}
        className={`block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
          error
            ? "border-red-400 dark:border-red-600"
            : "border-slate-200 dark:border-slate-800"
        } ${className ?? ""}`}
      />
      {error && (
        <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormSelect({ name, label, required, className, children, ...props }: FormSelectProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name)}
        {...props}
        className={`block w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer ${
          error
            ? "border-red-400 dark:border-red-600"
            : "border-slate-200 dark:border-slate-800"
        } ${className ?? ""}`}
      >
        {children}
      </select>
      {error && (
        <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
