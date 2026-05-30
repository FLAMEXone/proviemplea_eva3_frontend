"use client";

import * as React from "react";
import { ShieldCheck, User, Mail } from "lucide-react";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";

interface EmpresaCardProps {
  empresa: IEmpresa;
}

export default function EmpresaCard({ empresa }: EmpresaCardProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold shrink-0">
          {empresa.nombre_empresa.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50 shadow-none">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Validado
          </span>
          {empresa.id.includes("mock") && (
            <span className="mt-1 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50">
              En Memoria
            </span>
          )}
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-4 leading-tight">
        {empresa.nombre_empresa}
      </h3>
      <p className="font-mono text-[10px] text-slate-400 mt-0.5">RUT: {empresa.rut_empresa}</p>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-[10px] text-slate-500 dark:text-slate-400">
        <div>
          <span className="block font-semibold text-slate-400 dark:text-slate-500">Rubro</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{empresa.rubro || "General"}</span>
        </div>
        <div>
          <span className="block font-semibold text-slate-400 dark:text-slate-500">Tipo de Alianza</span>
          <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">{empresa.tipo_empresa.replace("-", " ")}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-[9px] space-y-1.5 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate"><strong>Representante:</strong> {empresa.contacto_nombre}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate"><strong>Email:</strong> {empresa.contacto_email}</span>
        </div>
      </div>
    </div>
  );
}
